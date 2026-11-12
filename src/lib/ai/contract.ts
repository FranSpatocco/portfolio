import type { Project } from "@/data/projects";

// Contrato de /api/ask que también usa el navegador. Sin dependencias de
// runtime (ni Zod): el componente del hero no tiene que descargarlas.

export const ASK_MAX_LENGTH = 280;
export const ASK_LANGS = ["es", "en"] as const;

// Secciones del sitio que puede citar una respuesta, además de los proyectos
export const SECTION_SOURCES = ["about", "stack", "availability"] as const;

export type SourceId = Project["slug"] | (typeof SECTION_SOURCES)[number];

export type AskAnswer = { answer: string; sources: SourceId[] };
export type AskErrorCode = "invalid" | "rate_limited" | "unavailable";
export type AskError = { error: AskErrorCode };
