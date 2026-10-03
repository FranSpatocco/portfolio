import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, projectCode, projects } from "@/data/projects";
import { site } from "@/config/site";
import { ogImage } from "@/config/og";
import { ArrowLeft, ArrowRight } from "@/components/icons";
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
  const tm = await getTranslations({ locale, namespace: "meta" });
  const title = `${t(`${project.slug}.title`)} · ${site.name}`;
  const description = t(`${project.slug}.summary`);
  const image = ogImage(locale as Locale, tm("ogAlt"));

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/projects/${slug}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/${slug}`,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

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

  const sectionTitle = "text-2xl font-semibold tracking-[-0.02em] md:text-[1.625rem]";
  const sectionText = "text-base leading-[1.7] text-muted md:text-[1.0625rem]";
  const step = (n: number) => (
    <span
      aria-hidden="true"
      className="grid size-10 place-items-center rounded-xl border border-border-strong bg-raised text-sm font-semibold text-accent"
    >
      {String(n).padStart(2, "0")}
    </span>
  );

  return (
    <article className="mx-auto max-w-[75rem] px-4 pt-22 md:px-6 md:pt-30">
      <Link
        href="/#projects"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-4.5 text-[0.9375rem] font-medium text-muted transition-colors hover:border-fg hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <Reveal trigger="load" className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:gap-6 lg:grid-cols-12">
        <header className="card flex flex-col justify-end gap-4 p-6 md:min-h-75 md:p-9 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label">{t("label", { code })}</span>
            {project.featured && (
              <span className="label rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-fg">
                {tl("featured")}
              </span>
            )}
          </div>
          <h1 className="text-[2.5rem] leading-none font-semibold tracking-[-0.04em] md:text-[3.5rem]">
            {title}
          </h1>
          <p className="max-w-[40rem] text-[1.0625rem] leading-relaxed text-muted">
            {tp("summary")}
          </p>
        </header>

        <dl className="card grid grid-cols-2 content-start gap-2.5 p-2.5 md:p-3 lg:col-span-4">
          <div className="flex flex-col justify-between gap-2 rounded-[1.125rem] border border-line bg-inset p-4">
            <dt className="label text-[0.6875rem]">{t("roleLabel")}</dt>
            <dd className="text-[0.9375rem] font-medium">{t("role")}</dd>
          </div>
          <div className="flex flex-col justify-between gap-2 rounded-[1.125rem] border border-line bg-inset p-4">
            <dt className="label text-[0.6875rem]">{tl("statusLabel")}</dt>
            <dd className="flex items-center gap-2 text-[0.9375rem] font-medium">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {tl(`status.${project.status}`)}
            </dd>
          </div>
          <div className="col-span-2 flex flex-col gap-2 rounded-[1.125rem] border border-line bg-inset p-4">
            <dt className="label text-[0.6875rem]">{tl("stack")}</dt>
            <dd className="text-sm leading-relaxed text-muted">{project.stack.join(" · ")}</dd>
          </div>
          <div className="col-span-2">
            <dt className="sr-only">{t("linksLabel")}</dt>
            <dd className="grid grid-cols-2 gap-2.5">
              <ProjectLinks
                project={project}
                linkClassName="flex h-12 items-center justify-center gap-1.5 rounded-full border border-border-strong text-sm font-semibold transition-colors hover:border-fg first:border-accent first:bg-accent first:text-accent-fg first:hover:border-accent-hover first:hover:bg-accent-hover"
              />
            </dd>
          </div>
        </dl>
      </Reveal>

      <Reveal className="card mt-4 p-2.5 md:mt-6 md:p-4">
        <ProjectCapture
          project={project}
          priority
          sizes="(min-width: 1200px) 1150px, 100vw"
          className="relative aspect-[16/10] rounded-[1.125rem] border border-border"
        />
      </Reveal>

      <Reveal className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        <section className="card flex flex-col gap-3.5 p-6 md:p-8">
          {step(1)}
          <h2 className={`mt-1.5 ${sectionTitle}`}>{t("problem")}</h2>
          <p className={sectionText}>{tp("problem")}</p>
        </section>
        <section className="card flex flex-col gap-3.5 p-6 md:p-8">
          {step(3)}
          <h2 className={`mt-1.5 ${sectionTitle}`}>{t("result")}</h2>
          <p className={sectionText}>{tp("result")}</p>
        </section>
        <section className="card grid gap-3.5 p-6 md:col-span-2 md:grid-cols-[1fr_2fr] md:gap-8 md:p-8">
          <div className="flex flex-col gap-3.5">
            {step(2)}
            <h2 className={`mt-1.5 ${sectionTitle}`}>{t("decisions")}</h2>
          </div>
          <p className={sectionText}>{tp("decisions")}</p>
        </section>
      </Reveal>

      <Link
        href={`/projects/${next.slug}`}
        className="card card-link mt-10 flex items-center justify-between gap-4 p-3 pr-5 md:mt-14 md:gap-6 md:p-4 md:pr-8"
      >
        <span className="flex items-center gap-4 md:gap-6">
          <ProjectCapture
            project={next}
            decorative
            sizes="180px"
            className="relative aspect-[16/10] w-24 shrink-0 rounded-xl border border-border md:w-45 md:rounded-[0.875rem]"
          />
          <span className="flex flex-col gap-1.5">
            <span className="label text-[0.6875rem]">
              {t("next", { code: projectCode(next.slug) })}
            </span>
            <span className="text-lg font-semibold tracking-[-0.02em] md:text-[1.75rem]">
              {tl(`items.${next.slug}.title`)}
            </span>
          </span>
        </span>
        <span
          aria-hidden="true"
          className="arrow grid size-11 shrink-0 place-items-center rounded-full border border-border-strong md:size-14"
        >
          <ArrowRight className="size-5" />
        </span>
      </Link>
    </article>
  );
}
