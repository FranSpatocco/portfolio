@AGENTS.md

# Portfolio personal — contexto para Claude Code

Portfolio de Frontend Developer (React + TypeScript) para conseguir trabajo remoto y vender servicios freelance. El sitio en sí es un proyecto demostrativo. Requisitos completos en `PRD-portfolio.md`.

## Stack
- Next.js 16 (App Router) + TypeScript, generado estático (SSG), deploy en Vercel
- Tailwind CSS v4 (config en `src/app/globals.css`, sin `tailwind.config`)
- next-intl 4 con rutas `/es` y `/en` (default `es`)
- GSAP + `@gsap/react` para animaciones
- Formspree para el formulario de contacto (sin backend)

## Estructura
- `src/app/[locale]/` — layout raíz, home y `projects/[slug]` (caso de estudio)
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO con `hreflang`
- `src/proxy.ts` — middleware de next-intl (en Next 16 `middleware` se llama `proxy`)
- `src/i18n/` — `routing.ts`, `request.ts`, `navigation.ts` (usar su `Link`, no el de `next/link`)
- `src/components/` — secciones de la home + `Reveal` (animaciones), `BlueprintDiagram` (gesto del hero), `CornerTicks`, `SectionHeading`, `ProjectCapture`, `ThemeToggle`, `LocaleSwitcher`, `MobileMenu`
- `src/config/nav.ts` — secciones del menú (compartidas por el header y el menú mobile)
- `src/config/site.ts` — nombre, URLs, links, CV, ID de Formspree
- `src/data/projects.ts` — datos no traducibles de los proyectos (stack, links, imagen)
- `messages/es.json` y `messages/en.json` — todos los textos

## Reglas
- **Nada de texto hardcodeado en componentes.** Todo texto nuevo va en `messages/es.json` y `messages/en.json` a la vez, con las mismas claves.
- Cada página nueva con segmentos dinámicos: `generateStaticParams` para que siga siendo estática, y `generateMetadata` con `alternates.languages`. El idioma se lee con `next/root-params` en `src/i18n/request.ts`: **no usar `setRequestLocale`** (es el método legacy).
- Para documentación de librerías usar el MCP de Context7; para probar en navegador, `playwright-cli`.
- Colores sólo con los tokens (`bg`, `surface`, `fg`, `muted`, `subtle`, `border`, `line`, `accent`, `accent-hover`, `accent-fg`); el modo oscuro se resuelve redefiniendo las variables en `.dark`. Rótulos técnicos con la clase `.label`; capturas faltantes con `.hatch`.
- Animaciones sólo a través de `Reveal` o `gsap.matchMedia` con `(prefers-reduced-motion: no-preference)`. No animar la opacidad del contenido above the fold (afecta el LCP).
- Imágenes con `next/image` y `alt` traducido.
- Accesibilidad: HTML semántico, contraste AA, foco visible, navegación por teclado.
- Mobile-first. Objetivo Lighthouse 95+ en las cuatro métricas.
- Next 16 tiene cambios respecto a versiones anteriores: ante la duda, leer `node_modules/next/dist/docs/`.
- **Bitácora:** cada tecnología, decisión o problema resuelto se registra en `bitacora.txt` en el momento, con el formato del encabezado del archivo.

## Dirección visual
**Criterio: "tryhard, pero sin escándalo".** El esfuerzo va a la ejecución, no al ruido:
- Detalle obsesivo: espaciados y alineaciones exactas, jerarquía tipográfica cuidada, estados de hover/foco/activo pulidos en cada elemento interactivo, modo claro y oscuro igual de trabajados, mobile tan cuidado como desktop.
- Microinteracciones sutiles y con propósito; performance impecable (Lighthouse 95+).
- **Un solo gesto memorable por diseño**, bien hecho. El resto, sobrio.
- Nada de efectos que tapen el contenido, cursores custom, textos que se escriben solos ni frases grandilocuentes. Textos honestos, en el tono del "Sobre mí".
- **Sin 3D por ahora.**

**Dirección elegida: "Plano técnico"** (diseño en https://claude.ai/artifact/9uy3tF1Zzb5pSS2bnZmLPy, página "Plano técnico v2"):
- Tipografías: Space Grotesk (títulos y texto) + JetBrains Mono **sólo** para etiquetas y datos (REF-00, P-01, [01], rótulos de fichas).
- Oscuro: bg `#0E1116`, surface `#11151B`, fg `#E6E8EB`, muted `#A3ABB8`, subtle `#7A8290`, border `#2A323D`, line `#1F2630`, accent `#FF6B1A` con texto `#0E1116` encima.
- Claro: bg `#F4F1EA`, surface `#FBFAF6`, fg `#16191D`, muted `#4F5661`, subtle `#5F6672`, border `#D6D0C4`, line `#E3DED3`, accent `#C2410C` con texto blanco encima.
- Fondo: grilla tenue de 48px (oscuro `#12171D`, claro azul plano al 6%). Esquinas sin redondear.
- Gesto principal: diagrama SVG Diseño → Código → Deploy que se dibuja al cargar. Secundario: captura flotante al pasar el mouse por las filas de proyectos.

## Deploy
- Vercel, conectado a github.com/FranSpatocco/portfolio: cada push a `main` publica en https://franco-spatocco.vercel.app

## Comandos
- `npm run dev` — desarrollo en http://localhost:3000
- `npm run build` — build de producción (verificar que todas las rutas salgan como SSG ●)
- `npm run lint`
- `npm run og` — genera las imágenes para compartir (`public/og/og-{es,en}.png`, 1200×630) desde `og/build-og.mjs`. Toda página con `openGraph` propio debe incluir `ogImage()` de `src/config/og.ts`.
- `npm run cv` — genera el CV (ES/EN) desde `cv/cv-data.mjs`. Con datos `TODO(...)` pendientes deja borradores en `cv/out/`; sin pendientes publica `public/cv/cv-{es,en}.pdf`. Requiere `playwright-cli` global.

## Variables de entorno (`.env.local`, ver `.env.example`)
- `NEXT_PUBLIC_SITE_URL` — opcional, sólo con dominio propio; por defecto https://franco-spatocco.vercel.app (canonical, sitemap, Open Graph)
- `NEXT_PUBLIC_FORMSPREE_ID` — opcional; por defecto el form del portfolio (`xqpajwje`, los mensajes llegan a fspatocco02@gmail.com)

## Pendientes (del PRD)
- README de perfil de GitHub: publicado en github.com/FranSpatocco/FranSpatocco (fuente en `docs/github-profile/README.md`); actualizar la sección Proyectos cuando se publiquen
- Textos de los casos de estudio (marcados "(Completar)" / "(TODO)") → `messages/*.json`
- CV: completar los `TODO(...)` de `cv/cv-data.mjs` (Franco los carga en `datos-cv.txt` del Escritorio) y correr `npm run cv`
- Capturas de proyectos → `public/projects/` + campo `image` en `src/data/projects.ts`; demo y repo en `demoUrl` / `repoUrl`
- Revisión de seguridad con `/security-review` (requiere inicializar git y tener cambios para comparar)
