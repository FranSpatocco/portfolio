# PRD — Portfolio personal (Frontend Developer)

## Resumen
Sitio portfolio personal para conseguir trabajo remoto como Frontend Developer (React + TypeScript) y, en paralelo, vender servicios de desarrollo web freelance. El propio sitio funciona como proyecto demostrativo del stack que pide el mercado.

## Objetivo
Tener el portfolio publicado con dominio propio, bilingüe (ES/EN), Lighthouse 95+ en todas las métricas y 3 proyectos reales enlazados, listo para adjuntar en GetOnBoard y LinkedIn.

## Alcance
**Incluye:**
- Sitio portfolio (este PRD)
- Fichas de los 3 proyectos con demo en vivo, repo y mini caso de estudio
- CV descargable en ES y EN
- Bitácora técnica en `bitacora.txt`, actualizada en paralelo durante todo el desarrollo

**No incluye (por ahora):**
- El desarrollo de los 3 proyectos en sí (cada uno lleva su propio PRD)
- Blog, CMS o panel de administración
- Backend propio

## Proyectos a mostrar
1. **Dashboard con IA (proyecto estrella):** React + TypeScript + Firebase, con resúmenes o insights generados vía API de Claude desde una API Route (la key queda en el servidor).
2. **Laufen, app de running en Flutter** (reemplazó a la PWA con Capacitor): diferencial web a mobile, un solo código para Android, iOS y web.
3. **Landing "de cliente" con GSAP:** muestra de servicio freelance, con Lighthouse 95+.

## Funcionalidades clave
- [Must] Hero con nombre, rol ("Frontend Developer · React · TypeScript") y CTA a proyectos y contacto
- [Must] Sección de proyectos: card con captura, stack, links a demo y GitHub
- [Must] Página de caso de estudio por proyecto: problema, decisiones técnicas y resultado
- [Must] Sección "Sobre mí" + stack actual
- [Must] Contacto con formulario (Formspree), email, LinkedIn y GitHub
- [Must] Selector de idioma ES/EN
- [Must] Botón de descarga del CV según el idioma activo
- [Should] Animaciones GSAP de entrada y scroll (con respeto a `prefers-reduced-motion`)
- [Should] Modo oscuro
- [Could] Sección de servicios freelance con CTA propio
- [Could] Vercel Analytics para medir visitas de recruiters

## Stack recomendado
**Next.js (App Router) + TypeScript + Tailwind CSS + GSAP, generado de forma estática (SSG) y alojado en Vercel.**
Motivo: es el combo que más se repite en las ofertas remotas de LatAm (React + TS + Tailwind, Next.js para performance y SEO). SSG porque el portfolio no necesita datos dinámicos: carga más rápido, tiene mejor SEO y el hosting es gratis. La parte dinámica se demuestra en los proyectos.

- i18n → **next-intl**, con rutas `/es` y `/en` y textos en `messages/es.json` y `messages/en.json`. Todo texto nuevo va en ambos archivos; nunca hardcodeado en componentes.
- Contacto → Formspree (sin backend propio).
- Deploy → Vercel conectado al repo de GitHub, con deploy automático en cada push a `main`.
- Dominio → propio (a definir).

## Dirección visual (Claude Design)
Antes de codear, el diseño se trabaja en Claude Design:
1. Explorar 2 o 3 direcciones visuales de la home (hero + grilla de proyectos).
2. Elegir una y fijar el sistema de diseño: paleta, tipografías, escala de espaciados y radios.
3. Prototipar la página de caso de estudio y la versión mobile.
4. Pasar el diseño a Claude Code (`/design`) como referencia visual. El código de producción se escribe en Next.js entendiendo cada parte.

## Requisitos no funcionales
- Responsive y mobile-first: los recruiters revisan desde el celular
- Lighthouse 95+ en Performance, Accessibility, Best Practices y SEO
- Accesibilidad: HTML semántico, contraste AA, navegación por teclado, `alt` en imágenes
- SEO: metadata por idioma, Open Graph (preview en LinkedIn), `sitemap.xml` y `hreflang`
- Imágenes optimizadas con `next/image`

## Documentación en paralelo
Cada tecnología, herramienta, decisión o problema resuelto se registra en `bitacora.txt` en el momento en que aparece, no al final. Sirve como apoyo de estudio, como material para responder entrevistas técnicas y como fuente para actualizar CV y LinkedIn.

## Pendientes / Preguntas abiertas
- Nombre y dominio a usar
- Fecha objetivo de publicación
- Textos de "Sobre mí" en ES y EN
- CV actualizado (ES y EN) orientado a frontend
- Capturas o GIFs de cada proyecto (se generan cuando estén terminados)
- Decidir si el portfolio sale primero con 1 proyecto terminado o se espera a tener los 3

## Próximo paso
Con esto ya se puede pasar a Claude Code. ¿Armamos el archivo CLAUDE.md de contexto para pegarlo directo en la carpeta del proyecto?
