// Contenido del CV en ES y EN. Todo dato pendiente va como TODO("...")
// y aparece resaltado en el borrador; mientras quede alguno, el script
// no publica los PDF en public/cv/.
export const TODO = (text) => ({ todo: text });

const contact = {
  email: "fspatocco02@gmail.com",
  linkedin: {
    href: "https://www.linkedin.com/in/franco-spatocco/",
    text: "linkedin.com/in/franco-spatocco",
  },
  github: { href: "https://github.com/FranSpatocco", text: "github.com/FranSpatocco" },
  site: { href: "https://franco-spatocco.vercel.app", text: "franco-spatocco.vercel.app" },
};

export const cv = {
  es: {
    lang: "es",
    name: "Franco Spatocco",
    role: "Desarrollador Frontend + IA · React, TypeScript, Next.js",
    location: "Mar del Plata, Argentina · Remoto (UTC-3)",
    phone: "+54 9 223 687 8118",
    contact,
    sections: {
      profile: "Perfil",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Educación",
      skills: "Aptitudes",
      languages: "Idiomas",
      courses: "Cursos",
    },
    profile:
      "Analista de Sistemas que desarrolla apps web con IA integrada. Armo proyectos de punta a punta, del diseño al deploy, y trabajo todos los días con herramientas agénticas (Claude Code con servidores MCP y archivos de contexto del proyecto), entendiendo cada línea que subo. Hoy estoy sumando Python y RAG para crecer hacia AI Engineering.",
    projects: [
      {
        name: "Grano & Co. — panel de gestión con IA para una cafetería",
        meta: "2026",
        links: [
          { href: "https://grano-co-dashboard.vercel.app", text: "demo" },
          { href: "https://github.com/FranSpatocco/grano-co-dashboard", text: "código" },
        ],
        stack: "Next.js, TypeScript, Firebase, API de Claude",
        bullets: [
          "Panel que unifica ventas, stock y pedidos, con alertas de stock bajo y mapa de horas pico.",
          "Resumen semanal generado con la API de Claude desde el servidor, con validación de la respuesta (Zod), caché, límites de uso y un plan B por reglas si la IA falla.",
          "Hecho con Claude Code (CLAUDE.md, servidores MCP como context7) y Playwright para verificar en el navegador.",
          "Tests con Vitest, CSP, 100 de accesibilidad en Lighthouse; CI con GitHub Actions y deploy en Vercel.",
        ],
      },
      {
        name: "Laufen — app de running",
        meta: "2026",
        links: [
          { href: "https://laufen-app.web.app", text: "demo" },
          { href: "https://github.com/FranSpatocco/laufen", text: "código" },
        ],
        stack: "Flutter, Firebase",
        bullets: [
          "App para Android y web: mapa en vivo, parciales por km, intervalos y récords personales; se puede usar sin registrarse.",
        ],
      },
      {
        name: "Portfolio personal",
        meta: "2026",
        links: [contact.site, { href: "https://github.com/FranSpatocco/portfolio", text: "código" }],
        stack: "Next.js, TypeScript, Tailwind CSS, API de Claude",
        bullets: [
          "Sitio bilingüe (ES/EN) estático, con SEO técnico y deploy continuo, y un asistente con IA (API de Claude, salida validada con Zod, topes en Redis) que responde sobre mi perfil citando fuentes, a menos de US$ 0,001 por respuesta.",
        ],
      },
    ],
    experience: [
      {
        role: "Desarrollador Frontend freelance",
        org: "Proyectos independientes, remoto",
        meta: "Ago 2026 – Actualidad",
        bullets: [
          "Diseño y desarrollo apps web y mobile completas, desde la interfaz hasta el deploy (Grano & Co., Laufen, portfolio).",
        ],
      },
      {
        pdf: false, // el CV en español muestra sólo la experiencia más reciente
        role: "Encargado de depósito",
        org: "Zoom Bazar, Mar del Plata",
        meta: "Oct 2025 – Jul 2026",
        bullets: ["Reorganicé el depósito y el circuito de reposición para agilizar el trabajo del equipo."],
      },
    ],
    education: [
      {
        title: "Analista de Sistemas",
        org: "Instituto Superior de la Empresa, HILET",
        meta: "2024",
      },
      {
        title: "Tecnicatura Superior en Mantenimiento Industrial",
        org: "ISFP N° 196",
        meta: "2025 – en curso",
      },
      { title: "Claude Academy: Claude Code 101", org: "", meta: "" },
    ],
    skills: [
      {
        label: "IA",
        value:
          "API de Claude, Claude Code, MCP, ingeniería de prompts, validación de salidas estructuradas (Zod), desarrollo asistido por IA.",
      },
      {
        label: "Frontend",
        value: "JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS, GSAP, accesibilidad (WCAG).",
      },
      {
        label: "Backend y herramientas",
        value:
          "Node.js, integración de APIs REST, Firebase, Flutter, Git, GitHub Actions, Vercel, Vitest, Playwright.",
      },
    ],
    languages: [
      { label: "Español", value: "Nativo" },
      { label: "Inglés", value: "Intermedio (B1 certificado)" },
    ],
    courses: [],
  },

  en: {
    lang: "en",
    name: "Franco Spatocco",
    role: "Front-End Developer · Applied AI · React, TypeScript, Next.js",
    location: "Mar del Plata, Argentina · Remote (UTC-3)",
    phone: "+54 9 223 687 8118",
    contact,
    sections: {
      profile: "Profile",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      courses: "Courses",
    },
    profile:
      "Systems Analyst building web apps with integrated AI. I ship projects end to end, from design to deploy, and use agentic tools (Claude Code with MCP servers and project context files) every day as part of my workflow, while understanding every line I commit. Currently adding Python and RAG to grow toward AI engineering.",
    projects: [
      {
        name: "Grano & Co. — AI-powered coffee shop dashboard",
        meta: "2026",
        links: [
          { href: "https://grano-co-dashboard.vercel.app", text: "demo" },
          { href: "https://github.com/FranSpatocco/grano-co-dashboard", text: "source" },
        ],
        stack: "Next.js, TypeScript, Firebase, Claude API",
        bullets: [
          "Dashboard that unifies sales, stock and orders, with low-stock alerts and a peak-hours map.",
          "Weekly AI summary generated server-side with the Claude API: output validated with Zod, caching, usage limits and a rule-based fallback if the model fails.",
          "Built with Claude Code (CLAUDE.md, MCP servers like context7) and Playwright for browser checks.",
          "Vitest tests, CSP, 100 Lighthouse accessibility; CI with GitHub Actions, deployed on Vercel.",
        ],
      },
      {
        name: "Laufen — running app",
        meta: "2026",
        links: [
          { href: "https://laufen-app.web.app", text: "demo" },
          { href: "https://github.com/FranSpatocco/laufen", text: "source" },
        ],
        stack: "Flutter, Firebase",
        bullets: [
          "Running app for Android and web: live map, per-km splits, intervals and personal records; usable without signing up.",
        ],
      },
      {
        name: "Personal portfolio",
        meta: "2026",
        links: [contact.site, { href: "https://github.com/FranSpatocco/portfolio", text: "source" }],
        stack: "Next.js, TypeScript, Tailwind CSS, Claude API",
        bullets: [
          "Bilingual (ES/EN) static site with technical SEO and continuous deploy, plus an AI assistant (Claude API, Zod-validated output, Redis usage caps) that answers about my profile citing sources, at under US$ 0.001 per answer.",
        ],
      },
    ],
    experience: [
      {
        role: "Freelance Front-End Developer",
        org: "Independent projects, remote",
        meta: "Aug 2026 – Present",
        bullets: [
          "Design and build complete web and mobile apps, from the interface to deploy (Grano & Co., Laufen, portfolio).",
        ],
      },
      {
        role: "Warehouse Lead",
        org: "Zoom Bazar, Mar del Plata",
        meta: "Oct 2025 – Jul 2026",
        bullets: ["Reorganized the warehouse and restocking flow to speed up the team's daily work."],
      },
    ],
    education: [
      {
        title: "Systems Analyst",
        org: "Instituto Superior de la Empresa, HILET",
        meta: "2024",
      },
      {
        title: "Higher Technical Degree in Industrial Maintenance",
        org: "ISFP N° 196",
        meta: "2025 – ongoing",
      },
      { title: "Claude Academy: Claude Code 101", org: "", meta: "" },
    ],
    skills: [
      {
        label: "AI",
        value:
          "Claude API, Claude Code, MCP, prompt engineering, structured output validation (Zod), AI-assisted development.",
      },
      {
        label: "Front-end",
        value: "JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS, GSAP, accessibility (WCAG).",
      },
      {
        label: "Back-end & tools",
        value: "Node.js, REST API integration, Firebase, Flutter, Git, GitHub Actions, Vercel, Vitest, Playwright.",
      },
    ],
    languages: [
      { label: "Spanish", value: "Native" },
      { label: "English", value: "Intermediate (B1 certified)" },
    ],
    courses: [],
  },
};
