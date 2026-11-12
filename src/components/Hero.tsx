import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { featuredStack } from "@/data/stack";
import AskPortfolio from "./AskPortfolio";
import CardCaption from "./CardCaption";
import { Download, GitHub, LinkedIn } from "./icons";

// Frente de la home: el nombre como tipografía, el asistente como gesto
// principal y, debajo, cuatro tarjetas que resumen las secciones.
// Sin animación de entrada: todo esto está above the fold (LCP).
export default function Hero() {
  const t = useTranslations("hero");
  const tb = useTranslations("bento");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [first, ...rest] = site.name.split(" ");
  const cover = projects.find((p) => p.featured && p.image) ?? projects.find((p) => p.image);

  // Cada perfil es un link externo; el CV es una descarga
  const profiles = [
    { key: "github", href: site.github, label: tc("channels.github"), Icon: GitHub },
    { key: "linkedin", href: site.linkedin, label: tc("channels.linkedin"), Icon: LinkedIn },
  ] as const;

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-[75rem] px-4 pt-24 md:px-6 md:pt-36"
    >
      <div className="mx-auto flex max-w-[55rem] flex-col items-center gap-4 text-center md:gap-5">
        <p className="label font-mono">{t("role")}</p>
        <h1
          id="hero-title"
          className="text-[3.5rem] leading-none font-semibold tracking-[-0.045em] text-balance sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]"
        >
          {first}
          <br className="sm:hidden" /> {rest.join(" ")}.
        </h1>
        <p className="max-w-[35rem] text-lg leading-relaxed text-balance text-muted md:text-[1.3125rem]">
          {t("tagline")}
        </p>
      </div>

      <AskPortfolio />

      <div className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-5">
        {/* Sobre mí */}
        <a
          href="#about"
          data-source="about"
          className="card card-link flex min-h-47.5 flex-col p-4 md:min-h-62.5 md:p-6"
        >
          <span className="flex flex-1 flex-col items-center justify-center gap-1.5 pb-4">
            <span className="text-[2.25rem] font-semibold tracking-[-0.04em] md:text-[2.75rem]">
              {tb.raw("aboutMark")}
            </span>
            <span className="label hidden text-center font-mono md:block">{tb("aboutBadge")}</span>
          </span>
          <CardCaption label={tb("aboutLabel")} title={tb("aboutTitle")} arrow arrowClassName="hidden md:grid" />
        </a>

        {/* Proyectos */}
        <a
          href="#projects"
          data-source={cover?.slug}
          className="card card-link flex min-h-47.5 flex-col overflow-hidden p-4 md:min-h-62.5 md:p-6"
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

        {/* Stack */}
        <section
          aria-labelledby="stack-title"
          data-source="stack"
          className="card col-span-2 flex flex-col gap-4 p-5 md:col-span-1 md:min-h-62.5 md:justify-between md:p-6"
        >
          <ul className="flex flex-1 flex-wrap content-center gap-2 text-[0.8125rem] font-medium">
            {featuredStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border-strong bg-raised px-3 py-2"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1">
            <span className="label font-mono">{tb("stackLabel")}</span>
            <h2
              id="stack-title"
              className="text-[1.1875rem] font-semibold tracking-[-0.01em] md:text-[1.375rem]"
            >
              {tb("stackTitle")}
            </h2>
          </div>
        </section>

        {/* Perfiles y CV: los canales de contacto, por eso citan "disponibilidad" */}
        <section
          aria-labelledby="profiles-title"
          data-source="availability"
          className="card col-span-2 flex items-center justify-between gap-4 p-5 md:col-span-1 md:min-h-62.5 md:flex-col md:items-stretch md:justify-between md:p-6"
        >
          <div className="flex flex-col gap-1 md:order-2">
            <span className="label font-mono">{tb("profilesLabel")}</span>
            <h2
              id="profiles-title"
              className="text-[1.1875rem] font-semibold tracking-[-0.01em] md:text-[1.375rem]"
            >
              {tb("profilesTitle")}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:order-1 md:flex-1 md:rounded-[1.25rem] md:border md:border-line md:bg-inset">
            {profiles.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-13 place-items-center rounded-full border border-border-strong bg-raised transition-colors hover:border-accent hover:text-accent md:size-14"
              >
                <Icon className="size-6" strokeWidth={1.6} />
              </a>
            ))}
            <a
              href={site.cv[locale]}
              download
              aria-label={tn("cv")}
              className="grid size-13 place-items-center rounded-full border border-border-strong bg-raised transition-colors hover:border-accent hover:text-accent md:size-14"
            >
              <Download className="size-5" strokeWidth={1.6} />
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
