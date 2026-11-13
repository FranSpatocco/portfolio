@AGENTS.md

# Portfolio personal — contexto para Claude Code

Portfolio de Frontend Developer (React + TypeScript) para conseguir trabajo remoto y vender servicios freelance. El sitio en sí es un proyecto demostrativo. Requisitos completos en `PRD-portfolio.md`.

## Stack
- Next.js 16 (App Router) + TypeScript, generado estático (SSG), deploy en Vercel
- Tailwind CSS v4 (config en `src/app/globals.css`, sin `tailwind.config`)
- next-intl 4 con rutas `/es` y `/en` (default `es`)
- GSAP + `@gsap/react` para animaciones
- Formspree para el formulario de contacto
- Una sola ruta dinámica, `src/app/api/ask/route.ts`, para el asistente con IA (API de Claude + Zod + Upstash Redis para los topes); el resto de las rutas sigue siendo SSG

## Estructura
- `src/app/[locale]/` — layout raíz, home y `projects/[slug]` (caso de estudio)
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO con `hreflang`
- `src/proxy.ts` — middleware de next-intl (en Next 16 `middleware` se llama `proxy`)
- `src/i18n/` — `routing.ts`, `request.ts`, `navigation.ts` (usar su `Link`, no el de `next/link`)
- `src/components/` — `Hero` (frente de la home: nombre en tipografía, asistente y 4 tarjetas) y las secciones + `Reveal` (animaciones), `AskPortfolio` (asistente del hero, client), `Spotlight` (brillo que sigue al cursor), `CardCaption` (pie de tarjeta con flecha), `Monogram`, `icons.tsx` (íconos de trazo), `SectionHeading`, `ProjectCapture`, `ProjectLinks`, `ThemeToggle`, `LocaleSwitcher`, `MobileMenu`
- `src/config/nav.ts` — secciones del menú (compartidas por el header y el menú mobile)
- `src/config/site.ts` — nombre, URLs, links, CV, ID de Formspree
- `src/data/projects.ts` — datos no traducibles de los proyectos (stack, links, imagen)
- `src/data/stack.ts` — tecnologías (lista completa para "Sobre mí" y las principales para la tarjeta Stack)
- `messages/es.json` y `messages/en.json` — todos los textos

## Reglas
- **Nada de texto hardcodeado en componentes.** Todo texto nuevo va en `messages/es.json` y `messages/en.json` a la vez, con las mismas claves.
- Cada página nueva con segmentos dinámicos: `generateStaticParams` para que siga siendo estática, y `generateMetadata` con `alternates.languages`. El idioma se lee con `next/root-params` en `src/i18n/request.ts`: **no usar `setRequestLocale`** (es el método legacy).
- Para documentación de librerías usar el MCP de Context7; para probar en navegador, `playwright-cli`.
- Colores sólo con los tokens (`bg`, `surface`, `inset`, `raised`, `fg`, `muted`, `subtle`, `border`, `border-strong`, `line`, `accent`, `accent-hover`, `accent-fg`); el modo oscuro se resuelve redefiniendo las variables en `.dark`. Tarjetas con la clase `.card` (y `.card-link` si son clickeables, con la flecha `.arrow`); rótulos con `.label`; capturas faltantes con `.hatch`.
- Grillas: siempre con columnas explícitas (`grid-cols-1` en mobile), si no un texto largo ensancha la página.
- Animaciones (lo que desplaza o transforma) sólo a través de `Reveal` o `gsap.matchMedia` con `(prefers-reduced-motion: no-preference)`. El hero no se anima con opacidad (está above the fold, afecta el LCP).
- Cualquier cifra que se muestre tiene que ser verificable (ej. accesibilidad 100 en Lighthouse). Desde el 12/11/2026 el hero ya no tiene tarjeta "Datos", cinta ni monograma animado.
- Imágenes con `next/image` y `alt` traducido.
- Accesibilidad: HTML semántico, contraste AA, foco visible, navegación por teclado.
- Mobile-first. Objetivo Lighthouse 95+ en las cuatro métricas.
- Seguridad: las cabeceras (CSP, X-Frame-Options, etc.) están en `next.config.ts`. Un servicio externo nuevo (analytics, otro form) hay que sumarlo a la CSP o el navegador lo bloquea.
- Next 16 tiene cambios respecto a versiones anteriores: ante la duda, leer `node_modules/next/dist/docs/`.
- **Bitácora:** cada tecnología, decisión o problema resuelto se registra en `bitacora.txt` en el momento, con el formato del encabezado del archivo.

## Dirección visual
**Criterio: "tryhard, pero sin escándalo".** El esfuerzo va a la ejecución, no al ruido:
- Detalle obsesivo: espaciados y alineaciones exactas, jerarquía tipográfica cuidada, estados de hover/foco/activo pulidos en cada elemento interactivo, modo claro y oscuro igual de trabajados, mobile tan cuidado como desktop.
- Microinteracciones sutiles y con propósito; performance impecable (Lighthouse 95+).
- **Un solo gesto memorable por diseño**, bien hecho. El resto, sobrio.
- Nada de efectos que tapen el contenido, cursores custom, textos que se escriben solos ni frases grandilocuentes. Textos honestos, en el tono del "Sobre mí".
- **Sin 3D por ahora.**

**Dirección elegida: "Bento"** (reemplazó a "Plano técnico" el 02/10/2026; diseño en https://claude.ai/artifact/9uy3tF1Zzb5pSS2bnZmLPy, página "Bento (estilo Gridx)"). Inspirada en la plantilla Gridx de Envato, pero con código propio:
- Tipografía: Geist (una sola familia). Rótulos en mayúscula con tracking (`.label`).
- Oscuro: bg `#0D0D0E`, tarjeta `#19191C`→`#141416`, inset `#111113`, raised `#202024`, fg `#F2F2F3`, muted `#A6A6AD`, subtle `#8B8B93`, border `#242427`, border-strong `#2E2E33`, accent `#7B8CFF` con texto `#0D0D0E` encima.
- Claro: bg `#F3F3F1`, tarjeta `#FFFFFF`→`#FBFBFA`, inset `#F6F6F4`, raised `#F0F0EE`, fg `#141416`, muted `#55555C`, subtle `#66666E`, border `#E2E2DF`, border-strong `#D2D2CE`, accent `#4352D6` con texto blanco encima.
- Tarjetas con radio de 28px, botones en píldora. Sin foto: el monograma "FS" ocupa su lugar.
- Gesto principal (desde el 14/10/2026, por sugerencia del profesor de sumar algo que llame la atención): **spotlight** — un brillo del acento sigue al cursor y enciende el borde de las tarjetas cercanas (`Spotlight.tsx` + `.spotlight .card` en `globals.css`; sólo con mouse; se mantiene con movimiento reducido porque no desplaza nada, sólo ilumina). Al cargar, el monograma "FS" del hero se dibuja con un trazo, se rellena y late una vez (`.mono-draw`, CSS puro). Secundarios: la cinta de texto del hero y las tarjetas clickeables que se elevan con la flecha rellena con el acento.

## Deploy
- Vercel, conectado a github.com/FranSpatocco/portfolio: cada push a `main` publica en https://franco-spatocco.vercel.app

## Comandos
- `npm run dev` — desarrollo en http://localhost:3000
- `npm run build` — build de producción (verificar que todas las rutas salgan como SSG ●)
- `npm run lint`
- `npm run typecheck` · `npm test` (Vitest, sólo `src/**/*.test.ts`)
- `npm run og` — genera las imágenes para compartir (`public/og/og-{es,en}.png`, 1200×630) desde `og/build-og.mjs`. Toda página con `openGraph` propio debe incluir `ogImage()` de `src/config/og.ts`.
- `npm run cv` — genera el CV (ES/EN) desde `cv/cv-data.mjs`. Con datos `TODO(...)` pendientes deja borradores en `cv/out/`; sin pendientes publica `public/cv/cv-{es,en}.pdf`. Requiere `playwright-cli` global.

## Asistente con IA ("Preguntale al portfolio")
- Gesto principal desde el 12/11/2026 (reemplaza al spotlight como protagonista; el spotlight se mantiene). Vive en el hero: `AskPortfolio.tsx` (client) + `src/app/api/ask/route.ts` + `src/lib/ai/` (`knowledge` arma el contexto desde `messages/`, `projects.ts`, `stack.ts` y `cv/cv-data.mjs`: no hay copia a mano; `ask` llama a Claude; `limits` cuenta los usos; `contract` es lo único que viaja al navegador, sin Zod; `schema` valida en el servidor).
- Las preguntas sugeridas (`src/data/ask.ts` + `ask.chips.*` en `messages/`) responden con texto fijo, sin API. Sólo la pregunta libre usa Claude (`claude-haiku-5-5` por defecto, `AI_MODEL` para cambiarlo).
- Reglas: responde sólo con el contenido del sitio y cita fuentes (`data-source` / `data-cited` enciende la tarjeta citada); **sin efecto máquina de escribir ni streaming** (la respuesta aparece completa; al llegar, la pantalla baja lo justo para mostrarla); no inventar cifras ni experiencia. Si cambia el contenido del sitio, el asistente lo toma solo; si se agrega un proyecto o sección citable, sumarlo a `SECTION_SOURCES` / `projects` y poner `data-source` en su tarjeta.
- Banco de 75 preguntas frecuentes de un recruiter (`src/lib/ai/faq.data.ts`, ES y EN; `faq.ts` las reconoce): se responden con texto fijo desde la ruta, **antes** de los topes y de Claude, así que no cuestan nada, no gastan el cupo diario y siguen andando sin clave o sin Redis. Sólo responde si la pregunta es corta y encaja con UNA entrada; si encaja con varias o con ninguna, va a Claude. Cada respuesta sale de lo que publica el sitio; si el sitio no dice algo (sueldo, años de experiencia) la respuesta lo aclara. Al sumar una entrada, `faq.test.ts` exige que su pregunta se reconozca a sí misma y a ninguna otra.
- Falla cerrado: en producción sin `ANTHROPIC_API_KEY` o sin Redis, `/api/ask` responde 503 y quedan los chips. La CSP no cambia (`connect-src 'self'` alcanza; Claude se llama sólo desde el servidor).
- El hero no se anima con opacidad (LCP); el área de respuesta reserva alto para no mover la página.

## Variables de entorno (`.env.local`, ver `.env.example`)
- `NEXT_PUBLIC_SITE_URL` — opcional, sólo con dominio propio; por defecto https://franco-spatocco.vercel.app (canonical, sitemap, Open Graph)
- `NEXT_PUBLIC_FORMSPREE_ID` — opcional; por defecto el form del portfolio (`xqpajwje`, los mensajes llegan a fspatocco02@gmail.com)
- `ANTHROPIC_API_KEY` (y `ANTHROPIC_WORKSPACE_ID` si la clave lo pide), `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (o `KV_REST_API_*` del Marketplace), `AI_GLOBAL_DAILY_CAP` (150), `AI_IP_DAILY_LIMIT` (8), `AI_MODEL` — del asistente; sólo servidor, cargar en Vercel con `--sensitive`

## Integrar un proyecto terminado
Los 3 proyectos se desarrollan en carpetas y repos aparte (el Dashboard con IA y Laufen —app de running en Flutter, que reemplazó a la PWA con Capacitor— en otras sesiones de Claude Code). Al integrar uno:
1. **Datos** en `src/data/projects.ts`: `demoUrl`, `repoUrl`, `status: "live"` y `stack` real.
2. **Capturas** en `public/projects/<slug>/` (webp, ~1600px de ancho) y el campo `image` del proyecto. La primera es la de la card y del caso de estudio.
3. **Caso de estudio** en `messages/es.json` y `messages/en.json` (`projects.items.<slug>`): `summary`, `problem`, `decisions`, `result`, reemplazando los "(Completar)" / "(TODO)". Tomar el material de la bitácora y del README de ese proyecto; no inventar métricas.
4. **CV**: actualizar el proyecto en `cv/cv-data.mjs` (quitar "En desarrollo", agregar link) y correr `npm run cv`.
5. **Perfil de GitHub**: actualizar `docs/github-profile/README.md` y subirlo (repo FranSpatocco/FranSpatocco).
6. `npm run build`, revisar con `playwright-cli` y registrar la integración en `bitacora.txt`.

## Pendientes (del PRD)
- README de perfil de GitHub: publicado en github.com/FranSpatocco/FranSpatocco (fuente en `docs/github-profile/`, con las capturas en `assets/`); al sumar un proyecto, agregarlo con su captura
- Textos de los casos de estudio (marcados "(Completar)" / "(TODO)") → `messages/*.json`
- CV: completar los `TODO(...)` de `cv/cv-data.mjs` (Franco los carga en `datos-cv.txt` del Escritorio) y correr `npm run cv`
- Capturas de proyectos → `public/projects/` + campo `image` en `src/data/projects.ts`; demo y repo en `demoUrl` / `repoUrl`
- Dominio propio (con `NEXT_PUBLIC_SITE_URL`)

## Commits

- Mensajes de commit en inglés, formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`), en imperativo y neutros: describir el cambio, no el contexto personal ni decisiones de negocio pendientes.
