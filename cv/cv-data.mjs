// Contenido del CV en ES y EN. Todo dato pendiente va como TODO("...")
// y aparece resaltado en el borrador; mientras quede alguno, el script
// no publica los PDF en public/cv/.
export const TODO = (text) => ({ todo: text });

const contact = {
  email: "fspatocco02@gmail.com",
  linkedin: {
    href: "https://www.linkedin.com/in/franco-spatocco-0a7161163/",
    text: "linkedin.com/in/franco-spatocco",
  },
  github: { href: "https://github.com/FranSpatocco", text: "github.com/FranSpatocco" },
  site: { href: "https://franco-spatocco.vercel.app", text: "franco-spatocco.vercel.app" },
};

const skills = {
  frontend: "HTML, CSS, JavaScript, TypeScript, React, Next.js",
  styling: "Tailwind CSS, GSAP, diseño responsive, modo claro/oscuro",
  quality: "Accesibilidad web (WCAG), SEO técnico, Core Web Vitals, Playwright",
  tools: "Git, GitHub, Vercel, next-intl, Firebase, PWA, Capacitor, Claude Code",
};

export const cv = {
  es: {
    lang: "es",
    name: "Franco Spatocco",
    role: "Frontend Developer · React · TypeScript",
    location: "Mar del Plata, Buenos Aires, Argentina",
    phone: "+54 9 223 687 8118",
    contact,
    sections: {
      profile: "Perfil",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Formación",
      skills: "Habilidades técnicas",
      languages: "Idiomas",
      courses: "Cursos",
    },
    profile:
      "Analista de Sistemas enfocado en desarrollo frontend con React, TypeScript y Next.js. Construyo interfaces rápidas, accesibles y fáciles de mantener, del diseño al deploy. Curso la Tecnicatura Superior en Mantenimiento Industrial: me interesa el cruce entre software, automatización e Industria 4.0. Busco mi primera experiencia en IT, remota o presencial en Mar del Plata.",
    projects: [
      {
        name: "Portfolio personal",
        meta: "2026",
        links: [contact.site, { href: "https://github.com/FranSpatocco/portfolio", text: "código" }],
        bullets: [
          "Sitio bilingüe (ES/EN) con Next.js 16, TypeScript, Tailwind CSS v4 y next-intl (rutas por idioma, hreflang, sitemap), generado estático y publicado en Vercel con deploy continuo desde GitHub.",
          "Diseño propio con tokens para modo claro y oscuro; animaciones GSAP que respetan el movimiento reducido.",
          "Accesibilidad (teclado, contraste AA, HTML semántico) verificada con pruebas en navegador con Playwright.",
        ],
      },
      {
        name: "Dashboard con IA",
        meta: "En desarrollo",
        stack: "React · TypeScript · Next.js · Firebase · API de Claude",
        bullets: [
          "Resúmenes e insights con la API de Claude desde una API Route, sin exponer la API key en el frontend.",
        ],
      },
      {
        name: "PWA bilingüe en Android",
        meta: "En desarrollo",
        stack: "React · TypeScript · PWA · i18n · Capacitor",
        bullets: ["Progressive Web App con i18n llevada a Android con Capacitor, reutilizando el mismo código."],
      },
      {
        name: "Landing para cliente",
        meta: "En desarrollo",
        stack: "Next.js · Tailwind CSS · GSAP",
        bullets: ["Landing con animaciones GSAP pensada como servicio freelance, con objetivo de Lighthouse 95+."],
      },
    ],
    experience: [
      {
        role: "Repositor y ventas",
        org: "Bazar",
        meta: "10/2025 – 07/2026",
        bullets: [
          "Atención al cliente y ventas en mostrador, con manejo de caja.",
          "Reposición de mercadería y tareas administrativas con el paquete Office.",
        ],
      },
    ],
    education: [
      {
        title: "Analista de Sistemas",
        org: "Instituto Superior de la Empresa (HILET)",
        meta: "2024",
      },
      {
        title: "Tecnicatura Superior en Mantenimiento Industrial",
        org: "Instituto Superior de Formación Profesional N.º 196",
        meta: "2025 – en curso",
      },
    ],
    skills: [
      { label: "Frontend", value: skills.frontend },
      { label: "Estilos y animación", value: skills.styling },
      { label: "Calidad", value: skills.quality },
      { label: "Herramientas", value: skills.tools },
    ],
    languages: [
      { label: "Español", value: "Nativo" },
      { label: "Inglés", value: "Intermedio (lectura fluida de documentación técnica)" },
    ],
    courses: [],
  },

  en: {
    lang: "en",
    name: "Franco Spatocco",
    role: "Frontend Developer · React · TypeScript",
    location: "Mar del Plata, Buenos Aires, Argentina",
    phone: "+54 9 223 687 8118",
    contact,
    sections: {
      profile: "Profile",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      skills: "Technical skills",
      languages: "Languages",
      courses: "Courses",
    },
    profile:
      "Systems Analyst focused on frontend development with React, TypeScript and Next.js. I build fast, accessible and maintainable interfaces, from design to deploy. Currently studying Industrial Maintenance, drawn to where software meets automation and Industry 4.0. Looking for my first tech role, remote or on-site in Mar del Plata.",
    projects: [
      {
        name: "Personal portfolio",
        meta: "2026",
        links: [contact.site, { href: "https://github.com/FranSpatocco/portfolio", text: "source" }],
        bullets: [
          "Bilingual (ES/EN) site built with Next.js 16, TypeScript, Tailwind CSS v4 and next-intl (localized routes, hreflang, sitemap), statically generated and deployed on Vercel with continuous deployment from GitHub.",
          "Custom design with a token system for light and dark mode; GSAP animations that respect reduced-motion preferences.",
          "Accessibility (keyboard navigation, AA contrast, semantic HTML) verified with browser tests using Playwright.",
        ],
      },
      {
        name: "AI Dashboard",
        meta: "In development",
        stack: "React · TypeScript · Next.js · Firebase · Claude API",
        bullets: ["Summaries and insights generated with the Claude API from an API Route, keeping the API key off the frontend."],
      },
      {
        name: "Bilingual PWA on Android",
        meta: "In development",
        stack: "React · TypeScript · PWA · i18n · Capacitor",
        bullets: ["Progressive Web App with i18n shipped to Android with Capacitor, reusing the same codebase."],
      },
      {
        name: "Client landing page",
        meta: "In development",
        stack: "Next.js · Tailwind CSS · GSAP",
        bullets: ["Landing page with GSAP animations built as a freelance showcase, targeting Lighthouse 95+."],
      },
    ],
    experience: [
      {
        role: "Sales and stock assistant",
        org: "Housewares store",
        meta: "10/2025 – 07/2026",
        bullets: [
          "Customer service and counter sales, including cash register handling.",
          "Stock replenishment and administrative tasks using Microsoft Office.",
        ],
      },
    ],
    education: [
      {
        title: "Systems Analyst",
        org: "Instituto Superior de la Empresa (HILET)",
        meta: "2024",
      },
      {
        title: "Industrial Maintenance technical degree",
        org: "Instituto Superior de Formación Profesional N.º 196",
        meta: "2025 – in progress",
      },
    ],
    skills: [
      { label: "Frontend", value: skills.frontend },
      { label: "Styling & motion", value: "Tailwind CSS, GSAP, responsive design, light/dark mode" },
      { label: "Quality", value: "Web accessibility (WCAG), technical SEO, Core Web Vitals, Playwright" },
      { label: "Tools", value: skills.tools },
    ],
    languages: [
      { label: "Spanish", value: "Native" },
      { label: "English", value: "Intermediate (fluent reading of technical documentation)" },
    ],
    courses: [],
  },
};
