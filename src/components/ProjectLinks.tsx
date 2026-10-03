import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { ArrowUpRight } from "./icons";

type Props = { project: Project; className?: string; linkClassName?: string };

const pill =
  "flex h-11 items-center gap-1.5 rounded-full border border-border-strong px-4 text-sm font-medium transition-colors hover:border-fg";

// Links a demo y repo; mientras no existan, "Próximamente"
export default function ProjectLinks({ project, className = "", linkClassName = pill }: Props) {
  const t = useTranslations("projects");
  const title = useTranslations("projects.items")(`${project.slug}.title`);

  const links = [
    { href: project.demoUrl, label: t("demo") },
    { href: project.repoUrl, label: t("repo") },
  ].filter((l) => l.href);

  if (links.length === 0) {
    return <span className={`text-sm text-muted ${className}`}>{t("comingSoon")}</span>;
  }

  return (
    <>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label}: ${title}`}
          className={`${linkClassName} ${className}`}
        >
          {l.label}
          <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </>
  );
}
