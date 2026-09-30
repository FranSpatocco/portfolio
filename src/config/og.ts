import type { Locale } from "@/i18n/routing";

// Imagen para compartir (LinkedIn, WhatsApp...) generada con `npm run og`.
// Cada página que define su propio openGraph tiene que incluirla: Next
// reemplaza el objeto openGraph del layout en vez de combinarlo.
export const ogImage = (locale: Locale, alt: string) => ({
  url: `/og/og-${locale}.png`,
  width: 1200,
  height: 630,
  alt,
});
