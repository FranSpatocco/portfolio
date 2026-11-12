import { describe, expect, it, vi } from "vitest";
import {
  consumeAsk,
  GLOBAL_DAILY_CAP,
  IP_DAILY_LIMIT,
  memoryLimiter,
  redisLimiter,
  secondsUntilNextDay,
  visitorKey,
} from "./limits";

describe("memoryLimiter", () => {
  it("frena a un visitante al superar su tope diario", async () => {
    const l = memoryLimiter();
    for (let i = 0; i < IP_DAILY_LIMIT; i++) {
      expect(await consumeAsk(l, "198.51.100.1", "2026-11-12")).toBe("ok");
    }
    expect(await consumeAsk(l, "198.51.100.1", "2026-11-12")).toBe("visitor_limit");
    // otro visitante sigue pudiendo preguntar
    expect(await consumeAsk(l, "198.51.100.2", "2026-11-12")).toBe("ok");
  });

  it("el tope diario vuelve a empezar al día siguiente", async () => {
    const l = memoryLimiter();
    for (let i = 0; i <= IP_DAILY_LIMIT; i++) await consumeAsk(l, "198.51.100.1", "2026-11-12");
    expect(await consumeAsk(l, "198.51.100.1", "2026-11-13")).toBe("ok");
  });

  it("aplica el tope global entre todos los visitantes", async () => {
    const l = memoryLimiter();
    for (let i = 0; i < GLOBAL_DAILY_CAP; i++) {
      expect(await consumeAsk(l, `192.0.2.${i}`, "2026-11-12")).toBe("ok");
    }
    expect(await consumeAsk(l, "192.0.2.250", "2026-11-12")).toBe("global_limit");
  });

  it("un visitante que ya pasó su tope no gasta el tope global", async () => {
    const l = memoryLimiter();
    for (let i = 0; i < IP_DAILY_LIMIT; i++) await consumeAsk(l, "198.51.100.1", "2026-11-12");
    // Muchos intentos rechazados no deben acercar el tope global
    for (let i = 0; i < GLOBAL_DAILY_CAP * 2; i++) await consumeAsk(l, "198.51.100.1", "2026-11-12");
    for (let i = 0; i < GLOBAL_DAILY_CAP - IP_DAILY_LIMIT; i++) {
      expect(await consumeAsk(l, `192.0.2.${i}`, "2026-11-12")).toBe("ok");
    }
  });
});

describe("redisLimiter", () => {
  const run = (code: unknown) => {
    const exec = vi.fn().mockResolvedValue(code);
    return { exec, limiter: redisLimiter({ exec }) };
  };

  it("traduce los códigos del script", async () => {
    expect(await run(0).limiter.take("v", "2026-11-12")).toBe("ok");
    expect(await run(1).limiter.take("v", "2026-11-12")).toBe("visitor_limit");
    expect(await run(2).limiter.take("v", "2026-11-12")).toBe("global_limit");
  });

  it("manda las dos claves del día en un solo viaje", async () => {
    const { exec, limiter } = run(0);
    await limiter.take("abc", "2026-11-12");
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][0]).toEqual(["ask:ip:abc:2026-11-12", "ask:global:2026-11-12"]);
  });

  it("una respuesta inesperada es un error, no un permiso", async () => {
    await expect(run(7).limiter.take("v", "d")).rejects.toThrow();
    await expect(run(null).limiter.take("v", "d")).rejects.toThrow();
  });
});

describe("visitorKey", () => {
  it("no guarda la IP y es estable", () => {
    const key = visitorKey("203.0.113.7");
    expect(key).not.toContain("203");
    expect(key).toBe(visitorKey("203.0.113.7"));
    expect(key).not.toBe(visitorKey("203.0.113.8"));
  });
});

describe("secondsUntilNextDay", () => {
  it("cuenta hasta la medianoche UTC", () => {
    expect(secondsUntilNextDay(new Date("2026-11-12T23:59:00Z"))).toBe(60);
    expect(secondsUntilNextDay(new Date("2026-11-12T00:00:00Z"))).toBe(86400);
  });
});
