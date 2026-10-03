import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projectCode, projects } from "@/data/projects";
import { ArrowUpRight } from "./icons";
import ProjectCapture from "./ProjectCapture";
import ProjectLinks from "./ProjectLinks";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-[75rem] px-4 pt-24 md:px-6 md:pt-32"
    >
      <Reveal>
        <SectionHeading
          id="projects-title"
          label={t("label")}
          title={t("title")}
          aside={<p className="max-w-[22.5rem] text-muted">{t("subtitle")}</p>}
        />
      </Reveal>

      <Reveal stagger className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="card card-link flex flex-col gap-5 p-3 pb-6 md:gap-6 md:p-4 md:pb-7"
          >
            <ProjectCapture
              project={project}
              sizes="(min-width: 1200px) 560px, (min-width: 768px) 46vw, 100vw"
              className="relative aspect-[16/10] rounded-[0.875rem] border border-border md:rounded-[1.125rem]"
            />
            <div className="flex flex-1 flex-col gap-3 px-2 md:gap-3.5 md:px-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label">{projectCode(project.slug)}</span>
                {project.featured && (
                  <span className="label rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-fg">
                    {t("featured")}
                  </span>
                )}
                <span className="label rounded-full border border-border-strong px-2.5 py-1 text-muted">
                  {t(`status.${project.status}`)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.025em] md:text-[1.75rem]">
                {t(`items.${project.slug}.title`)}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {t(`items.${project.slug}.summary`)}
              </p>
              <p className="text-[0.8125rem] text-subtle">{project.stack.join(" · ")}</p>
              <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex h-11 items-center gap-2 rounded-full bg-fg px-4.5 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
                >
                  {t("caseStudy")}
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </Link>
                <ProjectLinks project={project} />
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
