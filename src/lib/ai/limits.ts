import "server-only";
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

// Topes de uso del asistente. Cada pregunta libre llama a Claude y cuesta
// plata, así que hay un tope por visitante y otro global, por día.
// Los contadores viven en Upstash Redis (Marketplace de Vercel): en
// serverless la memoria del proceso no se comparte entre instancias.
// Sin Redis en producción el asistente se apaga (falla cerrado); en
// desarrollo se usa un contador en memoria.

export const IP_DAILY_LIMIT = Number(process.env.AI_IP_DAILY_LIMIT ?? 8);
export const GLOBAL_DAILY_CAP = Number(process.env.AI_GLOBAL_DAILY_CAP ?? 150);

const DAY_SECONDS = 60 * 60 * 25;

export type LimitResult = "ok" | "visitor_limit" | "global_limit";

export type Limiter = {
  /** Descuenta un uso del visitante y del total del día, si ambos topes lo permiten. */
  take(visitor: string, day: string): Promise<LimitResult>;
};

const ipKey = (visitor: string, day: string) => `ask:ip:${visitor}:${day}`;
const globalKey = (day: string) => `ask:global:${day}`;

// Un solo viaje a Redis y atómico: mira los dos topes y suma a los dos sólo
// si ambos permiten. Así un visitante que ya pasó su tope no gasta el tope
// global, y el TTL nunca queda sin fijar. Devuelve 0 = ok, 1 = tope del
// visitante, 2 = tope global.
const TAKE_SCRIPT = `
local ip = tonumber(redis.call('GET', KEYS[1]) or '0')
if ip >= tonumber(ARGV[1]) then return 1 end
local g = tonumber(redis.call('GET', KEYS[2]) or '0')
if g >= tonumber(ARGV[2]) then return 2 end
if redis.call('INCR', KEYS[1]) == 1 then redis.call('EXPIRE', KEYS[1], ARGV[3]) end
if redis.call('INCR', KEYS[2]) == 1 then redis.call('EXPIRE', KEYS[2], ARGV[3]) end
return 0
`;

const RESULTS: LimitResult[] = ["ok", "visitor_limit", "global_limit"];

export function redisLimiter(script: { exec(keys: string[], args: string[]): Promise<unknown> }): Limiter {
  return {
    async take(visitor, day) {
      const code = await script.exec(
        [ipKey(visitor, day), globalKey(day)],
        [String(IP_DAILY_LIMIT), String(GLOBAL_DAILY_CAP), String(DAY_SECONDS)],
      );
      const result = typeof code === "number" ? RESULTS[code] : undefined;
      // Una respuesta inesperada se trata como error, no como permiso
      if (!result) throw new Error(`Respuesta inesperada de Redis: ${String(code)}`);
      return result;
    },
  };
}

export function memoryLimiter(): Limiter {
  const counts = new Map<string, number>();
  return {
    async take(visitor, day) {
      const ip = ipKey(visitor, day);
      const total = globalKey(day);
      if ((counts.get(ip) ?? 0) >= IP_DAILY_LIMIT) return "visitor_limit";
      if ((counts.get(total) ?? 0) >= GLOBAL_DAILY_CAP) return "global_limit";
      counts.set(ip, (counts.get(ip) ?? 0) + 1);
      counts.set(total, (counts.get(total) ?? 0) + 1);
      return "ok";
    },
  };
}

function redisFromEnv(): Redis | null {
  // El Marketplace de Vercel expone las variables con el prefijo KV_ o UPSTASH_
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const globalForLimiter = globalThis as unknown as { askLimiter?: Limiter | null };

/** El limitador a usar, o null si no hay dónde contar (producción sin Redis). */
export function getLimiter(): Limiter | null {
  if (globalForLimiter.askLimiter === undefined) {
    const redis = redisFromEnv();
    if (redis) globalForLimiter.askLimiter = redisLimiter(redis.createScript(TAKE_SCRIPT));
    else if (process.env.NODE_ENV !== "production") globalForLimiter.askLimiter = memoryLimiter();
    else globalForLimiter.askLimiter = null;
  }
  return globalForLimiter.askLimiter;
}

/** Día en UTC, para las claves diarias. */
export const dayKey = (date = new Date()) => date.toISOString().slice(0, 10);

/** Segundos hasta que empieza el próximo día UTC (para Retry-After). */
export const secondsUntilNextDay = (date = new Date()) =>
  Math.max(1, Math.ceil((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1) - date.getTime()) / 1000));

/** La IP no se guarda tal cual: sólo un hash corto para poder contar. */
export function visitorKey(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

/** Descuenta un uso del visitante y del total diario. */
export function consumeAsk(limiter: Limiter, ip: string, day = dayKey()): Promise<LimitResult> {
  return limiter.take(visitorKey(ip), day);
}
