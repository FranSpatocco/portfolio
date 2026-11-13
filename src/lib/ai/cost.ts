// Costo en dólares de una llamada a Claude, calculado con los tokens que
// informa la API (response.usage) y la lista de precios publicada por
// Anthropic. Se muestra en la tarjeta de respuesta.

type Rates = { input: number; cacheWrite: number; cacheRead: number; output: number };

// USD por millón de tokens, para prompts de hasta 100.000 tokens (el del
// asistente ronda los 3.000). Fuente: platform.claude.com/docs → Pricing.
// Sólo se listan modelos con precio verificado: si AI_MODEL apunta a otro, no
// se muestra costo en vez de mostrar uno inventado.
const RATES: Record<string, Rates> = {
  "claude-haiku-5-5": { input: 0.1, cacheWrite: 0.125, cacheRead: 0.01, output: 0.5 },
};

// Los tokens de razonamiento ya vienen dentro de output_tokens
export type Usage = {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
};

/** Costo en USD, o undefined si no hay precio verificado para el modelo. */
export function costUsd(model: string, usage: Usage | undefined): number | undefined {
  const rates = RATES[model];
  if (!rates || !usage) return undefined;
  const n = (v: number | null | undefined) => v ?? 0;
  return (
    (n(usage.input_tokens) * rates.input +
      n(usage.cache_creation_input_tokens) * rates.cacheWrite +
      n(usage.cache_read_input_tokens) * rates.cacheRead +
      n(usage.output_tokens) * rates.output) /
    1_000_000
  );
}
