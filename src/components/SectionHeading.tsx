import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  title: string;
  aside?: ReactNode;
};

// Encabezado de sección: rótulo chico sobre el título, aside a la derecha
export default function SectionHeading({ id, label, title, aside }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="label">{label}</span>
        <h2
          id={id}
          className="text-4xl leading-none font-semibold tracking-[-0.035em] md:text-5xl"
        >
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
