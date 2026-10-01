import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const items = ["landing", "apps", "performance"] as const;

export default function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[75rem] px-5 pt-24 md:px-8 md:pt-36"
    >
      <Reveal className="border border-border bg-surface p-6 md:p-14">
        <span className="label text-accent">[03]</span>
        <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-end md:gap-16">
          <h2
            id="services-title"
            className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="leading-relaxed text-muted md:text-lg">{t("body")}</p>
        </div>
        <ul className="mt-8 grid border-t border-l border-border md:mt-10 md:grid-cols-3">
          {items.map((key, i) => (
            <li
              key={key}
              className="flex flex-col gap-6 border-r border-b border-border p-5 md:gap-8 md:p-6"
            >
              <span className="label text-[0.6875rem]">
                S-{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-medium">{t(`items.${key}`)}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group mt-8 inline-flex h-13 items-center gap-2.5 bg-accent px-6 font-semibold text-accent-fg transition-colors hover:bg-accent-hover md:mt-10"
        >
          {t("cta")}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
