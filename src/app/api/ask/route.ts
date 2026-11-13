import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { AiIncompleteError, AiRefusalError, aiEnabled, askClaude } from "@/lib/ai/ask";
import type { AskAnswer, AskError } from "@/lib/ai/contract";
import { answerFromFaq } from "@/lib/ai/faq";
import { consumeAsk, getLimiter, secondsUntilNextDay } from "@/lib/ai/limits";
import { askRequestSchema } from "@/lib/ai/schema";

// Preguntas libres al portfolio, respondidas por Claude con lo que publica
// el sitio. Es la única ruta dinámica: el resto sigue siendo estático.
// Topes: por visitante y global, por día (ver lib/ai/limits.ts).

// Si Claude tarda, mejor cortar: el cliente ya espera como máximo 30 s
export const maxDuration = 30;

// Una pregunta válida pesa ~350 bytes (280 caracteres + el JSON)
const MAX_BODY_BYTES = 2048;

const noStore = { "Cache-Control": "no-store" };

function fail(status: number, body: AskError, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { ...noStore, ...headers } });
}

/** IP del cliente según Vercel (el primer valor de x-forwarded-for). */
function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

/** Los navegadores mandan Origin en los POST: si es de otro sitio, se rechaza. */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

/** Lee el cuerpo como JSON sin pasar del tamaño máximo. */
async function readBody(req: NextRequest): Promise<unknown | "too_large"> {
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return "too_large";
  const text = await req.text().catch(() => "");
  if (text.length > MAX_BODY_BYTES) return "too_large";
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail(403, { error: "invalid" });

  const body = await readBody(req);
  if (body === "too_large") return fail(413, { error: "invalid" });
  const parsed = askRequestSchema.safeParse(body);
  if (!parsed.success) return fail(400, { error: "invalid" });

  // Las preguntas más comunes tienen respuesta fija: no cuestan nada, no gastan
  // los topes y siguen funcionando aunque falte la clave o Redis
  const fixed = answerFromFaq(parsed.data.q, parsed.data.lang);
  if (fixed) return Response.json(fixed, { headers: noStore });

  // Sin clave o sin dónde contar, el asistente se apaga: no se llama a Claude a ciegas
  const limiter = getLimiter();
  if (!aiEnabled || !limiter) return fail(503, { error: "unavailable" });

  try {
    const limit = await consumeAsk(limiter, clientIp(req));
    if (limit !== "ok") {
      return fail(429, { error: "rate_limited" }, { "Retry-After": String(secondsUntilNextDay()) });
    }
  } catch (e) {
    console.error("Error en los topes de uso:", e instanceof Error ? e.message : e);
    return fail(503, { error: "unavailable" });
  }

  try {
    const result: AskAnswer = await askClaude(parsed.data);
    return Response.json(result, { headers: noStore });
  } catch (e) {
    const expected =
      e instanceof AiRefusalError ||
      e instanceof AiIncompleteError ||
      e instanceof Anthropic.APIError ||
      e instanceof z.ZodError;
    if (!expected) throw e;
    console.error("Error al responder con Claude:", e.message);
    return fail(502, { error: "unavailable" });
  }
}
