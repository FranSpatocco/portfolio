"use client";

import { useTranslations } from "next-intl";
import { Moon, Sun } from "./icons";

export default function ThemeToggle({ className = "grid size-11" }: { className?: string }) {
  const t = useTranslations("theme");

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Sin acceso a storage (modo privado): el cambio vale sólo esta visita
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggle")}
      title={t("toggle")}
      className={`cursor-pointer place-items-center rounded-full border border-border-strong text-muted transition-colors hover:border-fg hover:text-fg ${className}`}
    >
      {/* Luna en claro, sol en oscuro: se resuelve con CSS, sin estado */}
      <Moon className="size-[1.125rem] dark:hidden" />
      <Sun className="hidden size-[1.125rem] dark:block" />
    </button>
  );
}
