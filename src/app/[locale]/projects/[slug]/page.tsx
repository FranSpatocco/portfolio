import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, projectCode, projects } from "@/data/projects";
import { site } from "@/config/site";
import CornerTicks from "@/components/CornerTicks";
import ProjectCapture from "@/components/ProjectCapture";
import ProjectLinks from "@/components/ProjectLinks";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects.items" });
  const title = `${t(`${project.slug}.title`)} · ${site.name}`;
  const description = t(`${project.slug}.summary`);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/projects/${slug}`]),
      ),
    },
    openGraph: { title, description, url: `/${locale}/projects/${slug}` },
  };
}

const sections = ["problem", "decisions", "result"] as const;

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const tp = await getTranslations(`projects.items.${project.slug}`);
  const tl = await getTranslations("projects");

  const code = projectCode(project.slug);
  const title = tp("title");
  // El siguiente proyecto cierra el recorrido en círculo
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const specs = [
    { label: tl("stack"), value: project.stack.join(" · ") },
    { label: t("roleLabel"), value: t("role") },
    { label: tl("statusLabel"), value: tl(`status.${project.status}`) },
  ];

  return (
    <article className="mx-auto max-w-[75rem] px-5 pt-24 md:px-8 md:pt-34">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
      >
        <span aria-hidden="true">←</span> {t("back")}
      </Link>

      <Reveal trigger="load">
        <header className="mt-6 grid gap-10 border-b border-line pb-10 md:mt-10 md:grid-cols-[7fr_5fr] md:items-end md:gap-16 md:pb-12">
          <div className="flex flex-col gap-4 md:gap-5">
            <p className="label text-accent">{t("label", { code })}</p>
            <h1 className="text-5xl leading-[0.95] font-semibold tracking-[-0.035em] md:text-[5rem]">
              {title}
            </h1>
            <p className="max-w-[40rem] text-lg leading-relaxed text-muted md:text-xl">
              {tp("summary")}
            </p>
          </div>
          <dl className="border-t border-border text-[0.9375rem]">
            {specs.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[6.875rem_1fr] gap-2 border-b border-border py-3"
              >
                <dt className="label pt-0.5 text-[0.6875rem]">{s.label}</dt>
                <dd className="leading-normal">{s.value}</dd>
              </div>
            ))}
            <div className="grid min-h-12 grid-cols-[6.875rem_1fr] items-center gap-2 border-b border-border">
              <dt className="label text-[0.6875rem]">{t("linksLabel")}</dt>
              <dd>
                <ProjectLinks project={project} />
              </dd>
            </div>
          </dl>
        </header>
      </Reveal>

      <Reveal>
        <figure className="relative mt-10 border border-border md:mt-14">
          <CornerTicks />
          <ProjectCapture
            project={project}
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="relative h-60 md:h-130"
          />
          <figcaption className="label border-t border-border px-4 py-3.5 text-[0.6875rem] md:px-5">
            {t("figure", { title })}
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-16 md:mt-22">
        {sections.map((key, i) => (
          <Reveal key={key}>
            <section
              className={`grid gap-4 border-t border-line py-8 md:grid-cols-[4fr_8fr] md:gap-16 md:py-10 ${
                i === sections.length - 1 ? "border-b" : ""
              }`}
            >
              <h2 className="flex flex-col gap-2.5 text-2xl font-semibold tracking-[-0.02em] md:text-[1.75rem]">
                <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                {t(key)}
              </h2>
              <p className="text-base leading-[1.7] text-muted md:text-lg">{tp(key)}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <Link
        href={`/projects/${next.slug}`}
        className="group mt-12 flex items-center justify-between gap-6 border border-border bg-surface p-6 transition-colors hover:border-accent md:mt-16 md:p-8"
      >
        <span className="flex flex-col gap-2">
          <span className="label text-[0.6875rem]">
            {t("next", { code: projectCode(next.slug) })}
          </span>
          <span className="text-xl font-semibold tracking-[-0.02em] md:text-[1.75rem]">
            {tl(`items.${next.slug}.title`)}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-2xl text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none md:text-[1.75rem]"
        >
          →
        </span>
      </Link>
    </article>
  );
}
