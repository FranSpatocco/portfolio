import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { buildKnowledge } from "./knowledge";
import { SOURCE_IDS } from "./schema";

describe("buildKnowledge", () => {
  for (const lang of ["es", "en"] as const) {
    it(`incluye una fuente por cada id citable (${lang})`, () => {
      const text = buildKnowledge(lang);
      for (const id of SOURCE_IDS) expect(text).toContain(`<source id="${id}"`);
    });
  }

  it("es determinista: el prompt caching depende de eso", () => {
    expect(buildKnowledge("es")).toBe(buildKnowledge("es"));
  });

  it("no filtra proyectos sin publicar ni el teléfono", () => {
    const text = buildKnowledge("es");
    expect(text).not.toContain("gsap-landing");
    expect(text).not.toContain("223 687");
  });

  it("trae el stack de cada proyecto publicado", () => {
    const text = buildKnowledge("en");
    for (const p of projects) expect(text).toContain(p.stack[0]);
  });
});
