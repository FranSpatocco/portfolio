"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { navSections } from "@/config/nav";
import { site } from "@/config/site";
import { ArrowUpRight, Download } from "./icons";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Escape cierra y devuelve el foco al botón
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Un clic fuera del panel y del botón lo cierra
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    // Si se agranda la ventana a desktop, el menú deja de tener sentido
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("closeMenu") : t("menu")}
        className={`grid size-11 place-items-center rounded-full border transition-colors ${
          open ? "border-accent text-accent" : "border-border-strong text-fg"
        }`}
      >
        <svg
          className="size-[1.125rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!open}
        className="card absolute inset-x-3 top-18 px-5 pt-2 pb-5 shadow-[0_32px_48px_-24px_var(--shadow)] md:inset-x-6 md:top-22"
      >
        <nav aria-label={t("menu")}>
          <ul className="flex flex-col">
            {navSections.map((id) => (
              <li key={id} className="border-b border-line last:border-b-0">
                <Link
                  href={`/#${id}`}
                  onClick={close}
                  className="flex min-h-15 items-center justify-between text-[1.375rem] font-medium transition-colors hover:text-accent"
                >
                  {t(id)}
                  <ArrowUpRight className="size-5 text-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 flex gap-2.5">
          <a
            href={site.cv[locale]}
            download
            onClick={close}
            className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            <Download className="size-4" />
            {t("cv")}
          </a>
          <ThemeToggle className="grid size-13" />
        </div>
      </div>
    </div>
  );
}
