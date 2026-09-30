import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectCode, projects } from "@/data/projects";
import ProjectCapture from "./ProjectCapture";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const t = useTranslations("projects");
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p !== featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-[75rem] px-5 pt-18 md:px-8 md:pt-28"
    >
      <Reveal>
        <SectionHeading
          id="projects-title"
          index={1}
          title={t("title")}
          ruled
          aside={<p className="text-muted">{t("subtitle")}</p>}
        />
      </Reveal>

      {/* Ficha destacada */}
      <Reveal>
        <article className="group mt-8 grid border border-border bg-surface transition-colors hover:border-accent md:mt-10 md:grid-cols-[1.25fr_1fr]">
          <ProjectCapture
            project={featured}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="relative h-50 border-b border-border md:h-auto md:min-h-95 md:border-r md:border-b-0"
          />
          <div className="flex flex-col gap-4 p-5.5 md:gap-4.5 md:p-9">
            <div className="flex items-center gap-3">
              <span className="label text-accent">{projectCode(featured.slug)}</span>
              <span className="label border border-accent px-2 py-1 text-accent">
                {t("featured")}
              </span>
            </div>
            <h3 className="text-[1.625rem] font-semibold tracking-[-0.02em] md:text-[2.125rem]">
              {t(`items.${featured.slug}.title`)}
            </h3>
            <p className="leading-relaxed text-muted">
              {t(`items.${featured.slug}.summary`)}
            </p>
            <dl className="mt-1 border-t border-border text-sm">
              <div className="grid grid-cols-[6.875rem_1fr] gap-2 border-b border-border py-2.5">
                <dt className="label text-[0.6875rem]">{t("stack")}</dt>
                <dd>{featured.stack.join(" · ")}</dd>
              </div>
              <div className="grid grid-cols-[6.875rem_1fr] gap-2 border-b border-border py-2.5">
                <dt className="label text-[0.6875rem]">{t("statusLabel")}</dt>
                <dd>{t(`status.${featured.status}`)}</dd>
              </div>
            </dl>
            <Link
              href={`/projects/${featured.slug}`}
              className="mt-auto flex min-h-11 items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {t("caseStudy")}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </div>
        </article>
      </Reveal>

      {/* Resto de proyectos como filas; en desktop, la captura aparece al pasar el mouse */}
      <Reveal className="mt-8 border-t border-fg md:mt-12">
        <ul>
          {others.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex flex-col gap-2 border-b border-border py-5.5 transition-colors md:grid md:grid-cols-[6rem_1fr_1.3fr_10.5rem] md:items-center md:gap-6 md:px-6 md:py-8 md:hover:bg-surface md:focus-visible:bg-surface"
              >
                <span className="label text-accent">{projectCode(project.slug)}</span>
                <span className="text-[1.375rem] font-semibold tracking-[-0.02em] transition-colors md:text-[1.625rem] md:group-hover:text-accent">
                  {t(`items.${project.slug}.title`)}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted">
                  {t(`items.${project.slug}.summary`)}
                </span>
                <span className="hidden justify-self-end font-semibold transition-colors group-hover:text-accent md:block">
                  {t("viewCase")} <span aria-hidden="true">→</span>
                </span>
                <ProjectCapture
                  project={project}
                  sizes="300px"
                  decorative
                  className="pointer-events-none absolute -top-40 left-24 hidden h-47 w-75 translate-y-2 border border-accent bg-surface opacity-0 shadow-[0_24px_48px_-20px_var(--shadow)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
