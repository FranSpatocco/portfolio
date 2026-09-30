// Datos no traducibles de cada proyecto. Los textos (título, resumen,
// caso de estudio) viven en messages/{es,en}.json bajo projects.items.<slug>.
export type Project = {
  slug: "ai-dashboard" | "pwa-capacitor" | "gsap-landing";
  stack: string[];
  status: "inDevelopment" | "live";
  demoUrl?: string;
  repoUrl?: string;
  // Ruta en /public. Si falta, la card muestra un placeholder.
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-dashboard",
    stack: ["React", "TypeScript", "Next.js", "Firebase", "Claude API"],
    status: "inDevelopment",
    featured: true,
  },
  {
    slug: "pwa-capacitor",
    stack: ["React", "TypeScript", "PWA", "i18n", "Capacitor", "Android"],
    status: "inDevelopment",
  },
  {
    slug: "gsap-landing",
    stack: ["Next.js", "Tailwind CSS", "GSAP", "Lighthouse 95+"],
    status: "inDevelopment",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

// Código de ficha técnica: P-01, P-02...
export const projectCode = (slug: Project["slug"]) =>
  `P-${String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}`;
