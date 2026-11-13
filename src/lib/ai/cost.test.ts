import { describe, expect, it } from "vitest";
import { costUsd } from "./cost";

describe("costUsd", () => {
  it("suma entrada, caché y salida con los precios de Haiku 5.5", () => {
    // 200 de entrada ($0.10), 3.000 leídos de caché ($0.01) y 150 de salida ($0.50) por millón
    const cost = costUsd("claude-haiku-5-5", {
      input_tokens: 200,
      cache_read_input_tokens: 3000,
      output_tokens: 150,
    });
    expect(cost).toBeCloseTo((200 * 0.1 + 3000 * 0.01 + 150 * 0.5) / 1e6, 10);
  });

  it("cobra la escritura de caché más que la entrada normal", () => {
    const write = costUsd("claude-haiku-5-5", { cache_creation_input_tokens: 3000 });
    const plain = costUsd("claude-haiku-5-5", { input_tokens: 3000 });
    expect(write).toBeGreaterThan(plain ?? 0);
  });

  it("una pregunta típica (caché leída) cuesta menos de una milésima de dólar", () => {
    const cost = costUsd("claude-haiku-5-5", {
      input_tokens: 150,
      cache_read_input_tokens: 3500,
      output_tokens: 250,
    });
    expect(cost).toBeLessThan(0.001);
  });

  it("no inventa costo si el modelo no tiene precio verificado o falta el uso", () => {
    expect(costUsd("otro-modelo", { input_tokens: 10 })).toBeUndefined();
    expect(costUsd("claude-haiku-5-5", undefined)).toBeUndefined();
  });
});
