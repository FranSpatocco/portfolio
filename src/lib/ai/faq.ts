import "server-only";
import type { AskAnswer } from "./contract";
import { faq, type FaqEntry } from "./faq.data";
import type { AskRequest } from "./schema";

// Reconoce las preguntas más comunes de un recruiter y las responde con un
// texto fijo, sin llamar a la API. Es conservador a propósito: sólo responde
// si la pregunta es corta y encaja con UNA sola entrada del banco; si encaja
// con varias o con ninguna, la responde Claude.

const MAX_CHARS = 110;
const MAX_WORDS = 14;

/** Minúsculas, sin tildes ni signos, con espacios simples. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Una forma es una frase: sus palabras (unidas con "+") tienen que aparecer
 * seguidas y en orden; la última puede ser sólo el comienzo de una palabra
 * ("empez" reconoce "empezar").
 */
function hasPhrase(haystack: string, form: string): boolean {
  return haystack.includes(` ${form.replaceAll("+", " ")}`);
}

function matches(haystack: string, keys: readonly string[]): boolean {
  return keys.some((form) => hasPhrase(haystack, form));
}

/** Entradas del banco que reconocen la pregunta (normalmente 0 o 1). */
export function findFaq(question: string, lang: AskRequest["lang"]): FaqEntry[] {
  const text = normalize(question);
  if (question.length > MAX_CHARS || text.split(" ").length > MAX_WORDS) return [];
  const haystack = ` ${text}`;
  return faq.filter((entry) => matches(haystack, entry[lang].k));
}

/** La respuesta del banco, o null si la pregunta tiene que ir a Claude. */
export function answerFromFaq(question: string, lang: AskRequest["lang"]): AskAnswer | null {
  const found = findFaq(question, lang);
  if (found.length !== 1) return null;
  const entry = found[0];
  return { answer: entry[lang].a, sources: [...entry.sources], origin: "faq", costUsd: 0 };
}
