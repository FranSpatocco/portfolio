# Portfolio — Franco Spatocco

Portfolio personal bilingüe (ES/EN) de un desarrollador frontend: proyectos con caso de estudio, servicios, CV descargable y formulario de contacto, en un diseño de tarjetas ("bento") con modo claro y oscuro.

**En vivo:** https://franco-spatocco.vercel.app

[![Portada del portfolio con la grilla de tarjetas](docs/screenshot.webp)](https://franco-spatocco.vercel.app)

## Qué incluye

- **Grilla bento** en la portada, con una cinta de texto animada en CSS puro (se frena con `prefers-reduced-motion`).
- **Casos de estudio** por proyecto (problema, decisiones y resultado), generados estáticos por idioma.
- **Español e inglés** con rutas `/es` y `/en`, `hreflang`, sitemap e imágenes para compartir por idioma.
- **Modo claro y oscuro** con tokens de color, igual de trabajados los dos.
- **CV en PDF** (ES/EN) generado desde los mismos datos del sitio.
- **Formulario de contacto** con Formspree, sin backend.
- **Accesibilidad y performance:** HTML semántico, contraste AA, foco visible, navegación por teclado; Lighthouse 90+ en mobile.
- **Seguridad:** cabeceras HTTP (CSP, X-Frame-Options y compañía) configuradas en `next.config.ts`.

## Stack

Next.js 16 (App Router, SSG) · React 19 · TypeScript · Tailwind CSS v4 · next-intl · GSAP · Formspree · Vercel

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3000
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (todas las rutas estáticas) |
| `npm run lint` | ESLint |
| `npm run og` | Genera las imágenes para compartir (`public/og/`) |
| `npm run cv` | Genera el CV en PDF (`public/cv/`) |

Contexto del proyecto y convenciones: `CLAUDE.md`. Requisitos: `PRD-portfolio.md`. Registro técnico: `bitacora.txt`.
