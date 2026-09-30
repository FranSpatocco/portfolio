import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { navSections } from "@/config/nav";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

// Iniciales para la marca del header: "Franco Spatocco" → "FS"
const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .join("");

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[75rem] items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold tracking-[-0.01em] md:text-lg"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center border-[1.5px] border-accent font-mono text-[0.6875rem] font-medium text-accent md:size-[2.125rem] md:text-xs"
          >
            {initials}
          </span>
          {site.name}
        </Link>

        <nav aria-label={t("mainNav")} className="hidden md:block">
          <ul className="flex gap-9 text-[0.9375rem]">
            {navSections.map((id) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {t(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle className="hidden size-11 md:grid" />
          <a
            href={site.cv[locale]}
            download
            className="hidden h-11 items-center bg-accent px-[1.125rem] text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover md:flex"
          >
            {t("cv")}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
