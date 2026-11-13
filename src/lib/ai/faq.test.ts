import { describe, expect, it } from "vitest";
import { faq } from "./faq.data";
import { answerFromFaq, findFaq, normalize } from "./faq";
import { SOURCE_IDS } from "./schema";

const LANGS = ["es", "en"] as const;

describe("banco de preguntas frecuentes", () => {
  it("tiene 75 preguntas con id único", () => {
    expect(faq).toHaveLength(75);
    expect(new Set(faq.map((e) => e.id)).size).toBe(75);
  });

  it.each(LANGS)("cada pregunta (%s) se reconoce a sí misma y a ninguna otra", (lang) => {
    const problems: string[] = [];
    for (const entry of faq) {
      const found = findFaq(entry[lang].q, lang).map((e) => e.id);
      if (found.join() !== entry.id) problems.push(`${entry[lang].q} → [${found.join(", ")}]`);
    }
    expect(problems).toEqual([]);
  });

  it("las respuestas son cortas, distintas y citan fuentes válidas", () => {
    for (const entry of faq) {
      expect(entry.sources.length).toBeGreaterThan(0);
      for (const source of entry.sources) expect(SOURCE_IDS).toContain(source);
      for (const lang of LANGS) {
        const { a, k } = entry[lang];
        expect(a.length, entry.id).toBeGreaterThan(40);
        expect(a.length, entry.id).toBeLessThanOrEqual(420);
        expect(k.length, entry.id).toBeGreaterThan(0);
      }
      expect(entry.es.a).not.toBe(entry.en.a);
    }
  });

  it("no promete cifras que el sitio no publica", () => {
    // Las únicas cifras del banco son las que ya muestra el sitio
    const text = faq.map((e) => `${e.es.a} ${e.en.a}`).join(" ");
    expect(text).not.toMatch(/\bUSD\b|\bU\$S\b|\bcentavos?\b|\bcents?\b/i);
  });
});

describe("answerFromFaq", () => {
  it("responde en el idioma pedido y marca el origen", () => {
    const es = answerFromFaq("¿Cuánto cuesta cada pregunta al asistente?", "es");
    const en = answerFromFaq("How much does each question to the assistant cost?", "en");
    expect(es?.origin).toBe("faq");
    expect(es?.answer).toMatch(/costo cero/);
    expect(en?.answer).toMatch(/zero cost/);
  });

  it("ignora mayúsculas, tildes y signos", () => {
    expect(answerFromFaq("QUE ESTUDIO??", "es")?.answer).toMatch(/Analista de Sistemas/);
  });

  it("devuelve null si no reconoce la pregunta", () => {
    expect(answerFromFaq("¿Cuál es su color favorito?", "es")).toBeNull();
    expect(answerFromFaq("What is his favourite color?", "en")).toBeNull();
  });

  it("devuelve null si la pregunta encaja con más de una entrada", () => {
    expect(answerFromFaq("¿Sabe React y Flutter?", "es")).toBeNull();
  });

  it("devuelve null si la pregunta es larga: va a Claude", () => {
    const long = "¿Podrías contarme con detalle y en varias partes cómo trabaja con React en proyectos grandes?";
    expect(answerFromFaq(long, "es")).toBeNull();
    expect(answerFromFaq(`${"react ".repeat(30)}`, "es")).toBeNull();
  });

  it("no usa las claves del otro idioma", () => {
    expect(answerFromFaq("Does he know salary", "es")).toBeNull();
  });
});

describe("normalize", () => {
  it("saca tildes, eñes y signos", () => {
    expect(normalize("¿Cuántos años de experiencia?")).toBe("cuantos anos de experiencia");
  });
});
