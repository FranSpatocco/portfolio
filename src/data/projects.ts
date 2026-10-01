// Datos no traducibles de cada proyecto. Los textos (título, resumen,
// caso de estudio) viven en messages/{es,en}.json bajo projects.items.<slug>.
export type Project = {
  slug: "ai-dashboard" | "laufen" | "gsap-landing";
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
    stack: ["Next.js", "React", "TypeScript", "Firebase", "Claude API", "TanStack Query", "Zod"],
    status: "live",
    demoUrl: "https://grano-co-dashboard.vercel.app",
    repoUrl: "https://github.com/FranSpatocco/grano-co-dashboard",
    image: "/projects/ai-dashboard/overview.webp",
    featured: true,
  },
  {
    slug: "laufen",
    stack: ["Flutter", "Dart", "Firebase", "flutter_map", "GPS", "Android", "Web"],
    status: "live",
    demoUrl: "https://laufen-app.web.app",
    repoUrl: "https://github.com/FranSpatocco/laufen",
    image: "/projects/laufen/overview.webp",
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
