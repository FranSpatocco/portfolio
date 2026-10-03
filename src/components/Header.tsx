import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { navSections } from "@/config/nav";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";
import Monogram from "./Monogram";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[75rem] items-center justify-between gap-4 px-4 md:h-22 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold tracking-[-0.01em] md:text-[1.0625rem]"
        >
          <Monogram className="size-8.5 rounded-[0.6875rem] text-[0.8125rem] md:size-9 md:rounded-xl md:text-sm" />
          {site.name}
        </Link>

        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex gap-1 text-[0.9375rem]">
            {navSections.map((id) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="flex h-11 items-center rounded-full px-3.5 text-muted transition-colors hover:bg-raised hover:text-fg"
                >
                  {t(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle className="hidden size-11 lg:grid" />
          <Link
            href="/#contact"
            className="hidden h-11 items-center rounded-full bg-raised px-5 text-[0.9375rem] font-medium transition-colors hover:bg-accent hover:text-accent-fg lg:flex"
          >
            {t("talk")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
