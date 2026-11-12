import { z } from "zod";
import { projects } from "@/data/projects";
import {
  ASK_LANGS,
  ASK_MAX_LENGTH,
  SECTION_SOURCES,
  type AskAnswer,
  type SourceId,
} from "./contract";

// Validación (Zod) de /api/ask. Sólo para el servidor y los tests: lo que
// también necesita el navegador está en contract.ts.

// Fuentes que puede citar una respuesta: los proyectos publicados más las
// secciones del sitio. Cada una enciende su tarjeta en la página.
export const SOURCE_IDS: [SourceId, ...SourceId[]] = [
  ...SECTION_SOURCES,
  ...projects.map((p) => p.slug),
];

export const askRequestSchema = z.object({
  q: z.string().trim().min(2).max(ASK_MAX_LENGTH),
  lang: z.enum(ASK_LANGS),
});
export type AskRequest = z.infer<typeof askRequestSchema>;

// Lo que le pedimos a Claude: respuesta corta y fuentes de una lista cerrada
export const modelAnswerSchema = z.object({
  answer: z.string(),
  sources: z.array(z.enum(SOURCE_IDS)),
});

const MAX_ANSWER_LENGTH = 900;
const MAX_SOURCES = 3;

/** Limpia lo que devolvió el modelo: largo acotado, fuentes únicas y conocidas. */
export function sanitizeAnswer(raw: z.infer<typeof modelAnswerSchema>): AskAnswer {
  const answer = raw.answer.trim().slice(0, MAX_ANSWER_LENGTH);
  const known = new Set<string>(SOURCE_IDS);
  const sources = [...new Set(raw.sources)].filter((s) => known.has(s)).slice(0, MAX_SOURCES);
  return { answer, sources };
}
