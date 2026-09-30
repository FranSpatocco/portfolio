"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const target = routing.locales.find((l) => l !== locale)!;

  return (
    <Link
      // Mantiene la página actual (incluido el slug) al cambiar de idioma
      href={{ pathname, params } as never}
      locale={target}
      hrefLang={target}
      aria-label={t("switchTo", { language: t(target) })}
      className="grid size-11 place-items-center border border-border font-mono text-xs text-fg uppercase transition-colors hover:border-fg"
    >
      {target}
    </Link>
  );
}
