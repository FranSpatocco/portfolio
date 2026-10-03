import { site } from "@/config/site";

// Iniciales de la marca: "Franco Spatocco" → "FS"
const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .join("");

// Marca del header y del footer. Decorativa: el nombre va al lado o en el link
export default function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center bg-accent font-bold text-accent-fg ${className}`}
    >
      {initials}
    </span>
  );
}
