"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { chips, sectionHref } from "@/data/ask";
import { projectCode, projects } from "@/data/projects";
import {
  ASK_MAX_LENGTH,
  type AskErrorCode,
  type SourceId,
} from "@/lib/ai/contract";
import { ArrowRight } from "./icons";

type ChipKey = (typeof chips)[number]["key"];

type View =
  | { kind: "idle" }
  | { kind: "loading"; q: string }
  | { kind: "answer"; q: string; answer: string; sources: SourceId[]; origin: "site" | "ai"; chip?: ChipKey }
  | { kind: "error"; q: string; code: AskErrorCode | "network" };

const TIMEOUT_MS = 30_000;

const isSection = (id: SourceId): id is keyof typeof sectionHref => id in sectionHref;

const sourceLink =
  "flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent";

// El gesto del diseño: una barra de comandos que responde sobre Franco con
// lo que publica el sitio y cita sus fuentes. Los chips responden con textos
// fijos (sin API); la pregunta libre pasa por /api/ask. Al citar un proyecto
// o una sección, su tarjeta se enciende en la página (data-source / data-cited).
export default function AskPortfolio() {
  const t = useTranslations("ask");
  const tp = useTranslations("projects");
  const locale = useLocale();
  const inputId = useId();
  const [view, setView] = useState<View>({ kind: "idle" });
  const [text, setText] = useState("");
  const pending = useRef<AbortController | null>(null);
  const output = useRef<HTMLDivElement>(null);

  // Enciende las tarjetas citadas y apaga las demás
  useEffect(() => {
    const cited = new Set<string>(view.kind === "answer" ? view.sources : []);
    const cards = document.querySelectorAll<HTMLElement>("[data-source]");
    for (const card of cards) {
      if (cited.has(card.dataset.source ?? "")) card.dataset.cited = "true";
      else delete card.dataset.cited;
    }
    return () => {
      for (const card of cards) delete card.dataset.cited;
    };
  }, [view]);

  useEffect(() => () => pending.current?.abort(), []);

  // Al responder, baja lo justo para que la respuesta quede a la vista: si no,
  // en pantallas chicas parece que no pasó nada. No se mueve si ya se ve entera.
  useEffect(() => {
    if (view.kind !== "answer" && view.kind !== "error") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    output.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }, [view]);

  const busy = view.kind === "loading";
  const activeChip = view.kind === "answer" ? view.chip : undefined;

  function pickChip(key: ChipKey, sources: readonly SourceId[]) {
    pending.current?.abort();
    setView({
      kind: "answer",
      q: t(`chips.${key}.q`),
      answer: t(`chips.${key}.a`),
      sources: [...sources],
      origin: "site",
      chip: key,
    });
  }

  async function ask(q: string) {
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setView({ kind: "loading", q });
    // Timeout manual: AbortSignal.any / .timeout no existen en Safari < 17.4
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, TIMEOUT_MS);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q, lang: locale }),
        signal: controller.signal,
      });
      const data: unknown = await res.json().catch(() => null);
      const body = data as {
        answer?: unknown;
        sources?: unknown;
        origin?: unknown;
        error?: AskErrorCode;
      } | null;
      if (!res.ok || typeof body?.answer !== "string") {
        setView({ kind: "error", q, code: body?.error ?? "unavailable" });
        return;
      }
      const sources = Array.isArray(body.sources) ? (body.sources as SourceId[]) : [];
      setView({
        kind: "answer",
        q,
        answer: body.answer,
        sources,
        origin: body.origin === "faq" ? "site" : "ai",
      });
      setText("");
    } catch (e) {
      // Una pregunta nueva cancela la anterior: no es un error
      if (!timedOut && e instanceof DOMException && e.name === "AbortError") return;
      setView({ kind: "error", q, code: "network" });
    } finally {
      clearTimeout(timer);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = text.trim();
    if (q.length < 2 || busy) return;
    void ask(q);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Escape") return;
    pending.current?.abort();
    setText("");
    setView({ kind: "idle" });
  }

  return (
    <section
      aria-label={t("label")}
      className="mx-auto mt-10 flex max-w-[55rem] flex-col gap-4 md:mt-12 md:gap-5"
    >
      <form onSubmit={onSubmit}>
        <label htmlFor={inputId} className="sr-only">
          {t("inputLabel")}
        </label>
        <div className="flex items-center gap-2 rounded-full border border-border-strong bg-[linear-gradient(180deg,var(--surface),var(--surface-to))] py-1.5 pr-1.5 pl-5 shadow-[0_18px_48px_-18px_var(--shadow)] transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40 md:gap-3 md:py-2.5 md:pr-2.5 md:pl-7">
          <span aria-hidden="true" className="font-mono text-lg text-accent md:text-xl">
            &gt;
          </span>
          <input
            id={inputId}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={ASK_MAX_LENGTH}
            autoComplete="off"
            enterKeyHint="send"
            placeholder={t("placeholder")}
            className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none! placeholder:text-subtle md:h-14 md:text-[1.1875rem]"
          />
          <span
            aria-hidden="true"
            className="hidden h-7 items-center rounded-full bg-raised px-2.5 font-mono text-[0.6875rem] font-medium tracking-wide text-muted sm:flex"
          >
            {t("badgeAi")}
          </span>
          <button
            type="submit"
            disabled={busy || text.trim().length < 2}
            aria-label={t("send")}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-40 md:size-14"
          >
            <ArrowRight className="size-5 md:size-5.5" strokeWidth={2} />
          </button>
        </div>
      </form>

      <ul aria-label={t("chipsLabel")} className="flex flex-wrap justify-center gap-2 md:gap-2.5">
        {chips.map(({ key, sources }) => {
          const active = activeChip === key;
          return (
            <li key={key}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => pickChip(key, sources)}
                className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors hover:border-accent md:px-5 ${
                  active ? "border-accent bg-raised" : "border-border-strong"
                }`}
              >
                {t(`chips.${key}.q`)}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Salida: alto reservado para que la respuesta no mueva lo que está debajo */}
      <div
        ref={output}
        aria-live="polite"
        className="card flex min-h-52 scroll-mb-6 flex-col justify-center gap-4 p-5.5 md:min-h-60 md:p-8"
      >
        {view.kind === "idle" && <p className="text-center text-muted">{t("idle")}</p>}

        {view.kind === "loading" && (
          <>
            <p className="font-mono text-[0.8125rem] break-words text-subtle">&gt; {view.q}</p>
            <p className="text-muted motion-safe:animate-pulse">{t("thinking")}</p>
          </>
        )}

        {view.kind === "error" && (
          <>
            <p className="font-mono text-[0.8125rem] break-words text-subtle">&gt; {view.q}</p>
            <p>{t(`errors.${view.code}`)}</p>
          </>
        )}

        {view.kind === "answer" && (
          <>
            <p className="font-mono text-[0.8125rem] break-words text-subtle">&gt; {view.q}</p>
            <p className="text-[1.0625rem] leading-relaxed md:text-xl md:leading-relaxed">{view.answer}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-4 md:pt-5">
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
                {view.origin === "ai" ? t("badgeAi") : t("badgeSite")}
              </span>
              {view.sources.length > 0 && (
                <>
                  <span className="label font-mono">{t("sourcesLabel")}</span>
                  <ul className="flex flex-wrap gap-2">
                    {view.sources.map((id) => (
                      <li key={id}>
                        {isSection(id) ? (
                          <a href={sectionHref[id]} className={sourceLink}>
                            {t(`sources.${id}`)}
                          </a>
                        ) : (
                          projects.some((p) => p.slug === id) && (
                            <Link href={`/projects/${id}`} className={sourceLink}>
                              <span className="font-mono text-subtle">{projectCode(id)}</span>
                              {tp(`items.${id}.title`)}
                            </Link>
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <p className="text-center font-mono text-[0.6875rem] leading-snug text-subtle">{t("disclaimer")}</p>
    </section>
  );
}
