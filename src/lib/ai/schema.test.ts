import { describe, expect, it } from "vitest";
import { ASK_MAX_LENGTH } from "./contract";
import { askRequestSchema, modelAnswerSchema, sanitizeAnswer, SOURCE_IDS } from "./schema";

describe("askRequestSchema", () => {
  it("acepta una pregunta válida y recorta los espacios", () => {
    const r = askRequestSchema.parse({ q: "  ¿Qué stack usa?  ", lang: "es" });
    expect(r.q).toBe("¿Qué stack usa?");
  });

  it("rechaza preguntas vacías, demasiado largas o con idioma desconocido", () => {
    expect(askRequestSchema.safeParse({ q: " ", lang: "es" }).success).toBe(false);
    expect(askRequestSchema.safeParse({ q: "a".repeat(ASK_MAX_LENGTH + 1), lang: "es" }).success).toBe(false);
    expect(askRequestSchema.safeParse({ q: "hola", lang: "fr" }).success).toBe(false);
    expect(askRequestSchema.safeParse({ q: 42, lang: "es" }).success).toBe(false);
  });

  it("acepta el largo máximo exacto", () => {
    expect(askRequestSchema.safeParse({ q: "a".repeat(ASK_MAX_LENGTH), lang: "en" }).success).toBe(true);
  });
});

describe("modelAnswerSchema", () => {
  it("sólo admite fuentes de la lista cerrada", () => {
    expect(modelAnswerSchema.safeParse({ answer: "ok", sources: ["about"] }).success).toBe(true);
    expect(modelAnswerSchema.safeParse({ answer: "ok", sources: ["salary"] }).success).toBe(false);
  });

  it("no incluye proyectos sin publicar", () => {
    expect(SOURCE_IDS).not.toContain("gsap-landing");
    expect(SOURCE_IDS).toContain("ai-dashboard");
  });
});

describe("sanitizeAnswer", () => {
  it("quita fuentes repetidas y deja a lo sumo 3", () => {
    const r = sanitizeAnswer({
      answer: "texto",
      sources: ["about", "about", "stack", "availability", "ai-dashboard"],
    });
    expect(r.sources).toEqual(["about", "stack", "availability"]);
  });

  it("recorta la respuesta y los espacios", () => {
    const r = sanitizeAnswer({ answer: `  ${"x".repeat(2000)}  `, sources: [] });
    expect(r.answer).toHaveLength(900);
    expect(r.answer.startsWith(" ")).toBe(false);
  });
});
