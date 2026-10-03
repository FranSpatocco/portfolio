import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { featuredStack } from "@/data/stack";
import CardCaption from "./CardCaption";
import { ArrowUpRight, Download, Gauge, GitHub, Layout, LinkedIn, Phone } from "./icons";

const marquee = ["role", "stack", "mode"] as const;
const services = [
  { key: "landing", Icon: Layout },
  { key: "apps", Icon: Phone },
  { key: "performance", Icon: Gauge },
] as const;

// Home en grilla bento: cada tarjeta resume una sección y lleva a ella.
// Sin animación de entrada: todo esto está above the fold (LCP).
export default function Hero() {
  const t = useTranslations("hero");
  const tb = useTranslations("bento");
  const tn = useTranslations("nav");
  const ts = useTranslations("services");
  const tc = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [first, ...rest] = site.name.split(" ");
  const cover = projects.find((p) => p.featured && p.image) ?? projects.find((p) => p.image);

  const facts = [
    { value: String(projects.length).padStart(2, "0"), key: "projects" },
    { value: routing.locales.join("/").toUpperCase(), key: "languages" },
    { value: "100", key: "a11y" },
  ] as const;

  const profiles = [
    { key: "github", href: site.github, Icon: GitHub },
    { key: "linkedin", href: site.linkedin, Icon: LinkedIn },
  ] as const;

  // La cinta se repite dos veces para que el loop de -50% no tenga cortes
  const half = [...marquee, ...marquee];

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-[75rem] px-4 pt-22 md:px-6 md:pt-32"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-2 md:gap-6 lg:grid-cols-12">
        {/* Presentación */}
        <div className="card flex flex-col gap-6 p-5.5 sm:flex-row sm:items-center sm:gap-8 md:col-span-2 md:p-9 lg:col-span-6">
          <div
            aria-hidden="true"
            className="grid h-55 shrink-0 place-items-center rounded-[1.25rem] bg-accent text-accent-fg sm:size-50"
          >
            <span className="text-[6.5rem] leading-none font-bold tracking-[-0.06em] sm:text-[5.75rem]">
              FS
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="label">{t("role")}</p>
            <h1
              id="hero-title"
              className="text-[2.375rem] leading-[1.02] font-semibold tracking-[-0.035em] md:text-[2.75rem]"
            >
              {first}
              <br className="hidden sm:block" /> {rest.join(" ")}.
            </h1>
            <p className="leading-relaxed text-muted">{t("tagline")}</p>
            <div className="mt-2 flex flex-wrap gap-2.5">
              <a
                href="#projects"
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-4 font-semibold whitespace-nowrap sm:px-5 text-accent-fg transition-colors hover:bg-accent-hover sm:flex-none"
              >
                {t("ctaProjects")}
              </a>
              <a
                href={site.cv[locale]}
                download
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border-strong px-4 font-medium whitespace-nowrap sm:px-5 transition-colors hover:border-fg sm:flex-none"
              >
                <Download className="size-4" />
                {tn("cv")}
              </a>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 md:col-span-2 md:gap-6 lg:col-span-6">
          {/* Cinta: el texto se lee completo en el sr-only, la animación es decorativa */}
          <div className="card flex h-13 shrink-0 items-center overflow-hidden rounded-full md:h-14">
            <p className="sr-only">{t("marqueeLabel")}</p>
            <div aria-hidden="true" className="marquee-track flex shrink-0">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {half.map((key, i) => (
                    <span
                      key={i}
                      className="label flex items-center gap-6 pr-6 whitespace-nowrap md:gap-7 md:pr-7 md:text-[0.8125rem]"
                    >
                      <span>
                        {t.rich(`marquee.${key}`, {
                          b: (chunk) => <b className="font-semibold text-fg">{chunk}</b>,
                        })}
                      </span>
                      <span className="size-1.5 rounded-full bg-accent" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4 md:gap-6">
            <a
              href="#about"
              className="card card-link flex min-h-48 flex-col p-4.5 md:min-h-65 md:p-6"
            >
              <span className="flex flex-1 flex-col items-center justify-center gap-1.5 pb-4">
                <span className="text-[2.125rem] font-semibold tracking-[-0.04em] md:text-[2.5rem]">
                  {tb("aboutInitials")}
                </span>
                <span className="label hidden text-center md:block">{tb("aboutBadge")}</span>
              </span>
              <CardCaption label={tb("aboutLabel")} title={tb("aboutTitle")} arrow arrowClassName="hidden md:grid" />
            </a>
            <a
              href="#projects"
              className="card card-link flex min-h-48 flex-col overflow-hidden p-4.5 md:min-h-65 md:p-6"
            >
              <span className="flex flex-1 items-center justify-center pb-4">
                {cover?.image && (
                  <span className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border-strong md:w-[86%]">
                    <Image src={cover.image} alt="" fill sizes="240px" className="object-cover" />
                  </span>
                )}
              </span>
              <CardCaption label={tb("projectsLabel")} title={tb("projectsTitle")} arrow arrowClassName="hidden md:grid" />
            </a>
          </div>
        </div>

        {/* Stack */}
        <section
          aria-labelledby="stack-title"
          className="card flex flex-col p-5 md:min-h-65 md:p-6 lg:col-span-3"
        >
          <ul className="flex flex-1 flex-wrap content-center gap-2 pb-5 text-[0.8125rem] font-medium">
            {featuredStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border-strong bg-raised px-3 py-2"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span className="label">{tb("stackLabel")}</span>
          <h2
            id="stack-title"
            className="mt-1 text-[1.1875rem] font-semibold tracking-[-0.01em] md:text-[1.375rem]"
          >
            {tb("stackTitle")}
          </h2>
        </section>

        {/* Servicios */}
        <a
          href="#services"
          className="card card-link flex flex-col p-5 md:col-span-2 md:min-h-65 md:p-6 lg:col-span-6"
        >
          <span className="grid flex-1 grid-cols-3 items-center gap-3 pb-5">
            {services.map(({ key, Icon }) => (
              <span key={key} className="flex flex-col items-center gap-3 text-center">
                <span className="grid size-14 place-items-center rounded-[1.125rem] border border-border-strong bg-raised md:size-16 md:rounded-[1.25rem]">
                  <Icon className="size-6 md:size-6.5" strokeWidth={1.6} />
                </span>
                <span className="text-xs leading-snug text-muted md:text-[0.8125rem]">
                  {ts(`items.${key}`)}
                </span>
              </span>
            ))}
          </span>
          <CardCaption label={tb("servicesLabel")} title={tb("servicesTitle")} arrow />
        </a>

        {/* Perfiles */}
        <section
          aria-labelledby="profiles-title"
          className="card flex flex-col p-5 md:min-h-65 md:p-6 lg:col-span-3"
        >
          <div className="mb-5 flex flex-1 items-center justify-center gap-4 rounded-[1.25rem] border border-line bg-inset py-6">
            {profiles.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tc(`channels.${key}`)}
                className="grid size-18 place-items-center rounded-full border border-border-strong bg-raised transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-6.5" strokeWidth={1.6} />
              </a>
            ))}
          </div>
          <span className="label">{tb("profilesLabel")}</span>
          <h2
            id="profiles-title"
            className="mt-1 text-[1.1875rem] font-semibold tracking-[-0.01em] md:text-[1.375rem]"
          >
            {tb("profilesTitle")}
          </h2>
        </section>

        {/* Datos: sólo cifras verificables */}
        <section
          aria-label={tb("factsLabel")}
          className="card grid grid-cols-3 gap-2.5 p-2.5 md:col-span-2 md:gap-4 md:p-4 lg:col-span-6"
        >
          {facts.map((f) => (
            <div
              key={f.key}
              className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-inset px-1.5 py-4.5 text-center md:min-h-40 md:gap-2 md:rounded-[1.25rem] md:p-5"
            >
              <span className="text-[1.75rem] font-semibold tracking-[-0.04em] md:text-[2.75rem]">
                {f.value}
              </span>
              <span className="label text-[0.625rem] leading-snug md:text-xs">
                {tb(`facts.${f.key}`)}
              </span>
            </div>
          ))}
        </section>

        {/* Contacto */}
        <a
          href="#contact"
          className="card card-link flex flex-col justify-between gap-7 p-6 md:col-span-2 md:p-8 lg:col-span-6"
        >
          <span className="label">{tb("contactLabel")}</span>
          <span className="flex items-end justify-between gap-4">
            <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.04em] md:text-[3.25rem]">
              {tb("together")}
              <br />
              <span className="text-accent">{tb("togetherAccent")}</span>
            </span>
            <span
              aria-hidden="true"
              className="arrow grid size-13 shrink-0 place-items-center rounded-full border border-border-strong md:size-14"
            >
              <ArrowUpRight className="size-5" />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
