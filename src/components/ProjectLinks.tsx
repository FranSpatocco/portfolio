import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";

type Props = { project: Project; className?: string };

// Links a demo y repo; mientras no existan, "Próximamente"
export default function ProjectLinks({ project, className = "" }: Props) {
  const t = useTranslations("projects");
  const title = useTranslations("projects.items")(`${project.slug}.title`);

  const links = [
    { href: project.demoUrl, label: t("demo") },
    { href: project.repoUrl, label: t("repo") },
  ].filter((l) => l.href);

  if (links.length === 0) {
    return <span className={`text-muted ${className}`}>{t("comingSoon")}</span>;
  }

  return (
    <span className={`flex gap-6 font-semibold ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label}: ${title}`}
          className="text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
        >
          {l.label} ↗
        </a>
      ))}
    </span>
  );
}
