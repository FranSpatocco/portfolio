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
  // false = cargado pero no publicado: queda fuera del build (sin página,
  // sin card, sin sitemap). Ver bitácora, "Landing de cliente oculta".
  published?: boolean;
};

const allProjects: Project[] = [
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
    // Producto real en trámite de patente: no se muestra hasta que quien
    // lleva el trámite confirme que se puede publicar.
    published: false,
  },
];

// Sólo los publicados: todo el sitio (lista, casos de estudio,
// generateStaticParams, sitemap, "siguiente proyecto") usa esta lista, así
// un proyecto oculto no se genera en absoluto. Nada de ocultarlo con CSS:
// lo que se despliega es público aunque no se vea.
export const projects = allProjects.filter((p) => p.published !== false);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

// Código de ficha técnica: P-01, P-02...
export const projectCode = (slug: Project["slug"]) =>
  `P-${String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}`;
