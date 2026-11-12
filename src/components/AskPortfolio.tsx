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

type View =
  | { kind: "idle" }
  | { kind: "loading"; q: string }
  | { kind: "answer"; q: string; answer: string; sources: SourceId[]; origin: "site" | "ai" }
  | { kind: "error"; q: string; code: AskErrorCode | "network" };

const TIMEOUT_MS = 30_000;

const isSection = (id: SourceId): id is keyof typeof sectionHref => id in sectionHref;

// El gesto del diseño: un asistente que responde sobre Franco con lo que
// publica el sitio y cita sus fuentes. Los chips responden con textos fijos
// (sin API); la pregunta libre pasa por /api/ask. Al citar un proyecto o una
// sección, su tarjeta se enciende en la página (data-source / data-cited).
export default function AskPortfolio() {
  const t = useTranslations("ask");
  const tp = useTranslations("projects");
  const locale = useLocale();
  const inputId = useId();
  const [view, setView] = useState<View>({ kind: "idle" });
  const [text, setText] = useState("");
  const pending = useRef<AbortController | null>(null);

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

  const busy = view.kind === "loading";

  function pickChip(key: (typeof chips)[number]["key"], sources: readonly SourceId[]) {
    pending.current?.abort();
    setView({
      kind: "answer",
      q: t(`chips.${key}.q`),
      answer: t(`chips.${key}.a`),
      sources: [...sources],
      origin: "site",
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
      const body = data as { answer?: unknown; sources?: unknown; error?: AskErrorCode } | null;
      if (!res.ok || typeof body?.answer !== "string") {
        setView({ kind: "error", q, code: body?.error ?? "unavailable" });
        return;
      }
      const sources = Array.isArray(body.sources) ? (body.sources as SourceId[]) : [];
      setView({ kind: "answer", q, answer: body.answer, sources, origin: "ai" });
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
      aria-labelledby="ask-title"
      className="card flex flex-col gap-5 p-5.5 md:col-span-2 md:p-8 lg:col-span-7"
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="label">{t("label")}</span>
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-wide text-accent-fg">
            {t("badgeAi")}
          </span>
        </div>
        <h2
          id="ask-title"
          className="text-[1.625rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[2.125rem]"
        >
          {t("title")}
        </h2>
      </div>

      <ul aria-label={t("chipsLabel")} className="flex flex-wrap gap-2">
        {chips.map(({ key, sources }) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => pickChip(key, sources)}
              className="min-h-11 rounded-full border border-border-strong bg-raised px-4 text-left text-[0.8125rem] font-medium transition-colors hover:border-accent"
            >
              {t(`chips.${key}.q`)}
            </button>
          </li>
        ))}
      </ul>

      {/* Salida: alto reservado para que la respuesta no mueva el resto de la página */}
      <div
        aria-live="polite"
        className="flex min-h-96 flex-col justify-center gap-3 rounded-[1.25rem] border border-line bg-inset p-4.5 md:min-h-80 md:p-5.5"
      >
        {view.kind === "idle" && <p className="text-muted">{t("idle")}</p>}

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
            <p className="text-[1.0625rem] leading-relaxed">{view.answer}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wide text-muted">
                {view.origin === "ai" ? t("badgeAi") : t("badgeSite")}
              </span>
              {view.sources.length > 0 && (
                <>
                  <span className="label">{t("sourcesLabel")}</span>
                  <ul className="flex flex-wrap gap-2">
                    {view.sources.map((id) => (
                      <li key={id}>
                        {isSection(id) ? (
                          <a
                            href={sectionHref[id]}
                            className="rounded-full border border-border-strong px-3 py-1.5 text-[0.8125rem] font-medium transition-colors hover:border-accent hover:text-accent"
                          >
                            {t(`sources.${id}`)}
                          </a>
                        ) : (
                          projects.some((p) => p.slug === id) && (
                            <Link
                              href={`/projects/${id}`}
                              className="rounded-full border border-border-strong px-3 py-1.5 text-[0.8125rem] font-medium transition-colors hover:border-accent hover:text-accent"
                            >
                              <span className="font-mono text-subtle">{projectCode(id)}</span>{" "}
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

      <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
        <label htmlFor={inputId} className="sr-only">
          {t("inputLabel")}
        </label>
        <div className="flex items-center gap-2 rounded-full border border-border-strong bg-inset py-1.5 pr-1.5 pl-5 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40">
          <span aria-hidden="true" className="font-mono text-accent">
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
            className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none! placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={busy || text.trim().length < 2}
            aria-label={t("send")}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-40"
          >
            <ArrowRight className="size-5" strokeWidth={2} />
          </button>
        </div>
        <p className="font-mono text-[0.6875rem] leading-snug text-subtle">{t("disclaimer")}</p>
      </form>
    </section>
  );
}
