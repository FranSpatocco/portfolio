import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const askClaude = vi.fn();
const consumeAsk = vi.fn();
const getLimiter = vi.fn();

vi.mock("@/lib/ai/ask", () => ({
  aiEnabled: true,
  askClaude: (...a: unknown[]) => askClaude(...a),
  AiRefusalError: class AiRefusalError extends Error {},
  AiIncompleteError: class AiIncompleteError extends Error {},
}));
vi.mock("@/lib/ai/limits", () => ({
  getLimiter: () => getLimiter(),
  consumeAsk: (...a: unknown[]) => consumeAsk(...a),
  secondsUntilNextDay: () => 3600,
}));

import { POST } from "./route";

function request(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost:3000/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// Una pregunta que el banco de preguntas frecuentes no reconoce: va a Claude
const valid = { q: "¿Cuál es el color favorito de Franco?", lang: "es" };

beforeEach(() => {
  askClaude.mockReset();
  consumeAsk.mockReset().mockResolvedValue("ok");
  getLimiter.mockReset().mockReturnValue({});
});

describe("POST /api/ask", () => {
  it("responde 400 si el cuerpo no es válido", async () => {
    expect((await POST(request("no es json"))).status).toBe(400);
    expect((await POST(request({ q: "", lang: "es" }))).status).toBe(400);
    expect(askClaude).not.toHaveBeenCalled();
  });

  it("rechaza cuerpos demasiado grandes con 413 sin llamar a Claude", async () => {
    const big = JSON.stringify({ q: "a".repeat(5000), lang: "es" });
    const res = await POST(request(big));
    expect(res.status).toBe(413);
    expect(askClaude).not.toHaveBeenCalled();
  });

  it("rechaza pedidos que vienen de otro sitio", async () => {
    const res = await POST(request(valid, { Origin: "https://otro-sitio.example" }));
    expect(res.status).toBe(403);
    expect(askClaude).not.toHaveBeenCalled();
  });

  it("falla cerrado si no hay dónde contar los usos", async () => {
    getLimiter.mockReturnValue(null);
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
    expect(askClaude).not.toHaveBeenCalled();
  });

  it("responde 429 al pasar el tope y no llama a Claude", async () => {
    consumeAsk.mockResolvedValue("visitor_limit");
    const res = await POST(request(valid));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("3600");
    expect(await res.json()).toEqual({ error: "rate_limited" });
    expect(askClaude).not.toHaveBeenCalled();
  });

  it("devuelve la respuesta del modelo", async () => {
    askClaude.mockResolvedValue({ answer: "React y TypeScript.", sources: ["stack"] });
    const res = await POST(request(valid, { Origin: "http://localhost:3000" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect(await res.json()).toEqual({ answer: "React y TypeScript.", sources: ["stack"] });
  });

  it("si Claude falla responde 502 sin exponer el error", async () => {
    const { AiRefusalError } = await import("@/lib/ai/ask");
    askClaude.mockRejectedValue(new AiRefusalError("rechazado"));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "unavailable" });
  });

  it("responde las preguntas frecuentes sin llamar a Claude ni gastar topes", async () => {
    const res = await POST(request({ q: "¿Cuánto cuesta cada pregunta al asistente?", lang: "es" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.origin).toBe("faq");
    expect(body.answer).toMatch(/costo cero/);
    expect(askClaude).not.toHaveBeenCalled();
    expect(consumeAsk).not.toHaveBeenCalled();
  });

  it("las preguntas frecuentes siguen andando aunque falte Redis", async () => {
    getLimiter.mockReturnValue(null);
    const res = await POST(request({ q: "Is he available to work?", lang: "en" }));
    expect(res.status).toBe(200);
    expect((await res.json()).origin).toBe("faq");
  });
});
