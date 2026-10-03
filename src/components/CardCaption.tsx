import type { ElementType } from "react";
import { ArrowUpRight } from "./icons";

type Props = {
  label: string;
  title: string;
  // Etiqueta del título: h2 en tarjetas de contenido, span dentro de links
  as?: ElementType;
  // Flecha circular: sólo en tarjetas que son links
  arrow?: boolean;
  // Para ocultar la flecha en tarjetas angostas (mitad de ancho en mobile)
  arrowClassName?: string;
  className?: string;
};

// Pie de tarjeta bento: rótulo, título y la flecha que se rellena al hover
export default function CardCaption({
  label,
  title,
  as: Title = "span",
  arrow,
  arrowClassName = "grid",
  className = "",
}: Props) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="flex flex-col gap-1">
        <span className="label">{label}</span>
        <Title className="text-[1.1875rem] font-semibold tracking-[-0.01em] md:text-[1.375rem]">
          {title}
        </Title>
      </div>
      {arrow && (
        <span
          aria-hidden="true"
          className={`arrow size-11 shrink-0 place-items-center rounded-full border border-border-strong ${arrowClassName}`}
        >
          <ArrowUpRight className="size-[1.125rem]" />
        </span>
      )}
    </div>
  );
}
