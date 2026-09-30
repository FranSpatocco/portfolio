// Datos personales y links. Los marcados con TODO están pendientes (ver PRD).
export const site = {
  name: "Franco Spatocco",
  // TODO: dominio propio. Se puede sobreescribir con NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "fspatocco02@gmail.com",
  linkedin: "https://www.linkedin.com/in/franco-spatocco-0a7161163/",
  github: "https://github.com/FranSpatocco",
  // ID del form de Formspree (https://formspree.io). Ej: "xyzabcd"
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
  cv: {
    es: "/cv/cv-es.pdf",
    en: "/cv/cv-en.pdf",
  },
} as const;
