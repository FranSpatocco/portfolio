import { useTranslations } from "next-intl";
import { ArrowUpRight, Gauge, Layout, Phone } from "./icons";
import Reveal from "./Reveal";

const items = [
  { key: "landing", Icon: Layout },
  { key: "apps", Icon: Phone },
  { key: "performance", Icon: Gauge },
] as const;

export default function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[75rem] px-4 pt-24 md:px-6 md:pt-32"
    >
      <Reveal className="card p-6 md:p-12">
        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-16">
          <div className="flex flex-col gap-2">
            <span className="label">{t("label")}</span>
            <h2
              id="services-title"
              className="text-4xl leading-[1.05] font-semibold tracking-[-0.035em] md:text-5xl"
            >
              {t("title")}
            </h2>
          </div>
          <p className="leading-relaxed text-muted md:text-lg">{t("body")}</p>
        </div>
        <ul className="mt-8 grid gap-2.5 md:mt-10 md:grid-cols-3 md:gap-4">
          {items.map(({ key, Icon }) => (
            <li
              key={key}
              className="flex items-center gap-4 rounded-[1.25rem] border border-line bg-inset p-4 md:flex-col md:items-start md:gap-8 md:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border-strong bg-raised md:size-14">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="text-[1.0625rem] font-medium md:text-lg">{t(`items.${key}`)}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-fg transition-colors hover:bg-accent-hover md:mt-10"
        >
          {t("cta")}
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </a>
      </Reveal>
    </section>
  );
}
