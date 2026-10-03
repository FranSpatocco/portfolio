import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Política de contenido. 'unsafe-inline' en scripts es necesario en un sitio
// estático: Next inyecta scripts inline para hidratar y el del tema evita el
// flash; un nonce obligaría a renderizar cada página por request (sin SSG).
// No hay contenido de usuarios en el HTML, así que el riesgo de XSS es bajo;
// lo que sí cierra esta política: iframes ajenos, plugins, <base> y envíos de
// formularios o fetch a dominios que no sean Formspree.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  // Sólo en producción: el modo dev de Next usa eval y la CSP lo bloquearía
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
