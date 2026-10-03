import type { SVGProps } from "react";

// Íconos de trazo (24×24, currentColor). Siempre decorativos: el texto o el
// aria-label del elemento que los contiene es el que nombra la acción.
type Props = SVGProps<SVGSVGElement>;

function Icon({ children, strokeWidth = 1.8, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: Props) => (
  <Icon {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Icon>
);

export const ArrowRight = (p: Props) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowLeft = (p: Props) => (
  <Icon {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);

export const Download = (p: Props) => (
  <Icon {...p}>
    <path d="M12 4v12M6 10l6 6 6-6M5 20h14" />
  </Icon>
);

export const Layout = (p: Props) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 13h5M8 16h8" />
  </Icon>
);

export const Phone = (p: Props) => (
  <Icon {...p}>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </Icon>
);

export const Gauge = (p: Props) => (
  <Icon {...p}>
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="M12 18l4-6" />
    <circle cx="12" cy="18" r="1.4" />
  </Icon>
);

export const GitHub = (p: Props) => (
  <Icon {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);

export const LinkedIn = (p: Props) => (
  <Icon {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

export const Mail = (p: Props) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);

export const Sun = (p: Props) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Icon>
);

export const Moon = (p: Props) => (
  <Icon {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Icon>
);
