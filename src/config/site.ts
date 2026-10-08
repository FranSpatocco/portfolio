// Datos personales y links. Los marcados con TODO están pendientes (ver PRD).
export const site = {
  name: "Franco Spatocco",
  // Dirección pública en Vercel. Si hay dominio propio, NEXT_PUBLIC_SITE_URL la reemplaza
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://franco-spatocco.vercel.app",
  email: "fspatocco02@gmail.com",
  linkedin: "https://www.linkedin.com/in/franco-spatocco/",
  github: "https://github.com/FranSpatocco",
  // Form de Formspree (https://formspree.io/f/<id>). No es secreto: el id
  // queda visible en el HTML. La variable permite usar otro form en pruebas
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "xqpajwje",
  cv: {
    es: "/cv/cv-es.pdf",
    en: "/cv/cv-en.pdf",
  },
} as const;
