import { useLocale, useTranslations } from "next-intl";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import BlueprintDiagram from "./BlueprintDiagram";
import Reveal from "./Reveal";

const specs = ["stack", "base", "mode", "status"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const tn = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [first, ...rest] = site.name.split(" ");

  return (
    <>
      <section className="mx-auto grid max-w-[75rem] items-center gap-12 px-5 pt-32 pb-12 md:grid-cols-[7fr_5fr] md:gap-16 md:px-8 md:pt-48 md:pb-22">
        <Reveal trigger="load" stagger className="flex flex-col gap-5 md:gap-7">
          <p className="label text-accent">{t("label")}</p>
          <h1 className="text-[3.5rem] leading-[0.92] font-semibold tracking-[-0.035em] md:text-8xl">
            {first}
            <br />
            {rest.join(" ")}
          </h1>
          <p className="text-[1.1875rem] font-medium tracking-[-0.01em] md:text-2xl">
            {t("role")}
          </p>
          <p className="max-w-[34rem] text-base leading-relaxed text-muted md:text-lg">
            {t("tagline")}
          </p>
          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 md:mt-2">
            <a
              href="#projects"
              className="group flex h-13 items-center justify-center gap-2.5 bg-accent px-6 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              {t("ctaProjects")}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
            <a
              href="#contact"
              className="flex h-13 items-center justify-center border border-border px-6 font-medium transition-colors hover:border-fg"
            >
              {t("ctaContact")}
            </a>
            <a
              href={site.cv[locale]}
              download
              className="hidden h-13 items-center px-4 text-muted underline-offset-4 transition-colors hover:text-fg hover:underline sm:flex"
            >
              {tn("cv")}
            </a>
          </div>
        </Reveal>

        <BlueprintDiagram />
      </section>

      <div className="mx-auto max-w-[75rem] px-5 md:px-8">
      <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4 md:border-b">
        {specs.map((key, i) => (
          <div
            key={key}
            className={`border-b border-line py-4 md:border-b-0 md:py-6 ${
              i % 2 === 0 ? "border-r pr-3" : "pl-3"
            } md:px-6 md:first:pl-0 ${i < 3 ? "md:border-r" : "md:border-r-0"}`}
          >
            <dt className="label text-[0.6875rem]">{t(`specs.${key}Label`)}</dt>
            <dd className="mt-2 flex items-center gap-2 text-[0.9375rem] md:text-base">
              {key === "status" && (
                <span aria-hidden="true" className="size-2 bg-accent" />
              )}
              {t(`specs.${key}`)}
            </dd>
          </div>
        ))}
      </dl>
      </div>
    </>
  );
}
