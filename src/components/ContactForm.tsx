"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-border bg-bg px-3.5 text-base text-fg outline-none transition-colors hover:border-subtle focus-visible:border-accent focus-visible:shadow-[inset_0_0_0_1px_var(--accent)]";

const boxClass = "border border-border bg-surface p-5 md:p-10";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  if (!site.formspreeId) {
    return (
      <div className={`${boxClass} flex items-center`}>
        <p className="text-muted">{t("notConfigured")}</p>
      </div>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className={`${boxClass} flex flex-col gap-5`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={`${inputClass} h-12`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${inputClass} h-12`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y py-3.5`}
        />
      </div>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === "success" && t("success")}
          {status === "error" && t("error")}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-13 cursor-pointer items-center justify-center gap-2.5 bg-accent px-7 font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("send")}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
