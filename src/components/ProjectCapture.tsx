import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  sizes: string;
  className?: string;
  priority?: boolean;
  // Dentro de un link que ya nombra el proyecto: la imagen no se anuncia
  decorative?: boolean;
};

// Captura del proyecto, o un rayado de plano mientras no exista
export default function ProjectCapture({
  project,
  sizes,
  className = "relative",
  priority,
  decorative,
}: Props) {
  const t = useTranslations("projects");

  return (
    <div className={`overflow-hidden ${className}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={decorative ? "" : t(`items.${project.slug}.title`)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="hatch label absolute inset-0 grid place-items-center text-[0.6875rem] md:text-xs"
        >
          {t("capture")}
        </div>
      )}
    </div>
  );
}
