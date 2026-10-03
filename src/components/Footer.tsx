import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/config/site";
import { navSections } from "@/config/nav";
import Monogram from "./Monogram";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="mx-auto mt-28 w-full max-w-[75rem] px-4 md:mt-36 md:px-6">
      <div className="flex flex-col items-center gap-6 border-t border-line py-12 text-center md:py-14">
        <Monogram className="size-11 rounded-[0.875rem] text-base" />
        <nav aria-label={tn("mainNav")}>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {navSections.map((id) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className="label inline-flex min-h-11 items-center text-[0.8125rem] transition-colors hover:text-fg"
                >
                  {tn(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-subtle">
          {t("rights", { year: new Date().getFullYear(), name: site.name })}
        </p>
      </div>
    </footer>
  );
}
