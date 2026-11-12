import type { SourceId } from "@/lib/ai/contract";

// Preguntas sugeridas del asistente. Las respuestas están escritas en
// messages/{es,en}.json (ask.chips.<key>) y no llaman a la API: son
// instantáneas y gratis. Cada una declara las fuentes que cita.
export const chips = [
  { key: "claude", sources: ["ai-dashboard"] },
  { key: "stack", sources: ["stack"] },
  { key: "availability", sources: ["availability"] },
  { key: "laufen", sources: ["laufen"] },
] as const satisfies readonly { key: string; sources: readonly SourceId[] }[];

// A dónde lleva cada fuente que no es un proyecto
export const sectionHref = {
  about: "#about",
  stack: "#about",
  availability: "#contact",
} as const;
