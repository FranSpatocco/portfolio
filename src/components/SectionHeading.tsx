import type { ReactNode } from "react";

type Props = {
  id: string;
  index: number;
  title: string;
  aside?: ReactNode;
  // Con borde inferior y el aside a la derecha (ej.: Proyectos)
  ruled?: boolean;
};

// Encabezado de sección con índice de plano: [01] Proyectos
export default function SectionHeading({ id, index, title, aside, ruled }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${
        ruled ? "border-b border-line pb-8" : ""
      }`}
    >
      <div className="flex flex-col gap-3">
        <span className="label text-accent">
          [{String(index).padStart(2, "0")}]
        </span>
        <h2
          id={id}
          className="text-4xl leading-none font-semibold tracking-[-0.03em] md:text-[3.5rem]"
        >
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
