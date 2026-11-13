import type { SourceId } from "./contract";

// Banco de preguntas frecuentes de un recruiter, con respuesta fija en ES y EN.
// Cada respuesta sale de lo que el sitio ya publica (messages/, cv/cv-data.mjs,
// proyectos). Si el sitio no dice algo (sueldo, años de experiencia), la
// respuesta lo aclara en vez de inventarlo. Se responden sin llamar a la API.
//
// k = formas de reconocer la pregunta: frases sin tildes y en minúscula, con las
// palabras unidas por "+" (deben aparecer seguidas; la última puede ser sólo el
// comienzo de una palabra). Si una pregunta encaja con una sola entrada, se
// responde desde acá; si encaja con varias o con ninguna, la responde Claude.

export type FaqLang = { q: string; k: string[]; a: string };
export type FaqEntry = { id: string; sources: SourceId[]; es: FaqLang; en: FaqLang };

export const faq: FaqEntry[] = [
  // ───────── Disponibilidad y condiciones ─────────
  {
    id: "availability",
    sources: ["availability"],
    es: {
      q: "¿Está disponible para trabajar?",
      k: ["disponib", "puede+empezar", "puede+incorporar", "cuando+empez"],
      a: "Sí. Está buscando trabajo y disponible para empezar, en relación de dependencia o como freelance.",
    },
    en: {
      q: "Is he available to work?",
      k: ["available+to+work", "available+to+start", "available+for+work", "is+he+available", "can+start", "when+start", "open+to+work"],
      a: "Yes. He is looking for work and available to start, either as an employee or as a freelancer.",
    },
  },
  {
    id: "mode",
    sources: ["availability"],
    es: {
      q: "¿Trabaja remoto, híbrido o presencial?",
      k: ["remot", "hibrid", "presencial", "modalidad", "oficina"],
      a: "Busca trabajo remoto, desde Argentina. El sitio no menciona trabajo híbrido ni presencial.",
    },
    en: {
      q: "Does he work remote, hybrid or on-site?",
      k: ["remote", "hybrid", "on+site", "onsite", "in+office", "work+mode"],
      a: "He is looking for remote work, from Argentina. The site does not mention hybrid or on-site work.",
    },
  },
  {
    id: "location",
    sources: ["about"],
    es: {
      q: "¿Dónde vive?",
      k: ["donde+vive", "donde+esta+ubicado", "donde+esta+basado", "ubicacion", "de+donde+es", "ciudad", "mar+del+plata"],
      a: "En Mar del Plata, Argentina. Trabaja de forma remota (UTC-3).",
    },
    en: {
      q: "Where does he live?",
      k: ["where+does+he+live", "where+live", "where+is+he+based", "where+based", "location", "which+city", "which+country", "mar+del+plata"],
      a: "In Mar del Plata, Argentina. He works remotely (UTC-3).",
    },
  },
  {
    id: "timezone",
    sources: ["availability"],
    es: {
      q: "¿En qué zona horaria trabaja?",
      k: ["zona+horaria", "huso", "utc", "overlap", "diferencia+horaria"],
      a: "En UTC-3 (Argentina). Los horarios de trabajo concretos no están publicados en el sitio; se pueden acordar desde Contacto.",
    },
    en: {
      q: "Which time zone does he work in?",
      k: ["time+zone", "timezone", "utc", "overlap", "working+hours"],
      a: "UTC-3 (Argentina). Specific working hours are not published on the site; they can be agreed through Contact.",
    },
  },
  {
    id: "relocation",
    sources: ["availability"],
    es: {
      q: "¿Estaría dispuesto a mudarse?",
      k: ["mudar", "reubic", "relocat", "trasladar"],
      a: "El sitio no lo menciona: busca trabajo remoto desde Argentina. Para consultarlo, se lo puede contactar desde la sección Contacto.",
    },
    en: {
      q: "Would he be willing to relocate?",
      k: ["relocat", "move+to", "willing+to+move", "moving"],
      a: "The site does not say: he is looking for remote work from Argentina. To ask about it, use the Contact section.",
    },
  },
  {
    id: "salary",
    sources: ["availability"],
    es: {
      q: "¿Cuál es su pretensión salarial?",
      k: ["salari", "sueldo", "pretension", "cuanto+cobra", "remuneracion", "rango+salarial"],
      a: "El sitio no publica pretensiones salariales ni tarifas. Se hablan directamente desde Contacto (email o formulario).",
    },
    en: {
      q: "What is his salary expectation?",
      k: ["salary", "salaries", "compensation", "pay+expect", "how+much+does+he+charge", "rate+expect"],
      a: "The site does not publish salary expectations or rates. They are discussed directly through Contact (email or form).",
    },
  },
  {
    id: "contracttype",
    sources: ["availability"],
    es: {
      q: "¿Busca tiempo completo, part-time o freelance?",
      k: ["tiempo+completo", "part+time", "full+time", "relacion+de+dependencia", "jornada"],
      a: "Está abierto a relación de dependencia o a trabajar como freelance. El sitio no detalla la carga horaria; se acuerda desde Contacto.",
    },
    en: {
      q: "Is he looking for full-time, part-time or freelance?",
      k: ["full+time", "part+time", "fulltime", "parttime", "employee", "employment+type"],
      a: "He is open to being an employee or working as a freelancer. The site does not detail weekly hours; they are agreed through Contact.",
    },
  },
  {
    id: "startdate",
    sources: ["about"],
    es: {
      q: "¿Tiene preaviso para empezar?",
      k: ["preaviso", "aviso+previo", "fecha+de+inicio", "fecha+de+ingreso"],
      a: "El sitio no indica preaviso ni fecha. Su último empleo en relación de dependencia terminó en julio de 2026 y desde agosto de 2026 trabaja como freelance.",
    },
    en: {
      q: "Does he have a notice period?",
      k: ["notice+period", "notice", "start+date", "earliest+start"],
      a: "The site does not state a notice period or start date. His last employed job ended in July 2026 and since August 2026 he has worked as a freelancer.",
    },
  },
  {
    id: "legal",
    sources: ["availability"],
    es: {
      q: "¿Puede trabajar para empresas del exterior?",
      k: ["exterior", "extranjer", "visa", "ciudadania", "facturar", "contratar+desde", "residencia"],
      a: "Trabaja de forma remota desde Argentina. El sitio no detalla temas legales ni de facturación (contratación desde el exterior, visas); se pueden hablar desde Contacto.",
    },
    en: {
      q: "Can he work for companies abroad?",
      k: ["abroad", "foreign", "visa", "citizenship", "invoice", "work+permit", "overseas", "international+compan"],
      a: "He works remotely from Argentina. The site does not detail legal or invoicing matters (hiring from abroad, visas); they can be discussed through Contact.",
    },
  },
  {
    id: "contact",
    sources: ["availability"],
    es: {
      q: "¿Cómo lo contacto?",
      k: ["contacto", "contactar", "contactarlo", "comunicar", "mail", "email", "correo", "linkedin", "entrevista"],
      a: "Desde la sección Contacto del sitio: formulario, email (fspatocco02@gmail.com), LinkedIn y GitHub.",
    },
    en: {
      q: "How can I contact him?",
      k: ["contact", "reach+him", "get+in+touch", "email", "linkedin", "interview", "schedule+a+call"],
      a: "From the Contact section of the site: form, email (fspatocco02@gmail.com), LinkedIn and GitHub.",
    },
  },

  // ───────── Perfil ─────────
  {
    id: "who",
    sources: ["about"],
    es: {
      q: "¿Quién es Franco?",
      k: ["quien+es", "quien+sos", "presentacion", "presentate", "cuentame", "sobre+franco"],
      a: "Franco Spatocco es Analista de Sistemas y desarrolla apps web con IA integrada, con React, TypeScript y Next.js. Arma proyectos de punta a punta, del diseño al deploy.",
    },
    en: {
      q: "Who is Franco?",
      k: ["who+is", "tell+me+about", "introduce", "about+franco", "about+him"],
      a: "Franco Spatocco is a Systems Analyst who builds web apps with integrated AI, using React, TypeScript and Next.js. He ships projects end to end, from design to deploy.",
    },
  },
  {
    id: "role",
    sources: ["about"],
    es: {
      q: "¿Para qué puesto aplica?",
      k: ["puesto", "posicion", "vacante", "rol", "perfil"],
      a: "Para puestos de Frontend Developer con foco en IA aplicada: React, TypeScript y Next.js, integrando la API de Claude. Hoy suma Python y RAG para crecer hacia AI Engineering.",
    },
    en: {
      q: "What role does he apply for?",
      k: ["what+role", "which+role", "position", "job+title", "vacancy", "what+job"],
      a: "Frontend Developer roles with a focus on applied AI: React, TypeScript and Next.js, integrating the Claude API. He is adding Python and RAG to grow toward AI engineering.",
    },
  },
  {
    id: "years",
    sources: ["about"],
    es: {
      q: "¿Cuántos años de experiencia tiene?",
      k: ["anos+de+experiencia", "cuantos+anos", "experiencia+profesional", "anos+programando"],
      a: "El sitio no publica años de experiencia como desarrollador. Muestra tres proyectos de 2026 hechos de punta a punta y trabajo freelance desde agosto de 2026; antes fue encargado de depósito (octubre de 2025 a julio de 2026).",
    },
    en: {
      q: "How many years of experience does he have?",
      k: ["years+of+experience", "how+many+years", "how+long", "professional+experience", "years+coding"],
      a: "The site does not publish years of experience as a developer. It shows three projects from 2026 built end to end and freelance work since August 2026; before that he was a warehouse lead (October 2025 to July 2026).",
    },
  },
  {
    id: "seniority",
    sources: ["about"],
    es: {
      q: "¿Es junior, semi senior o senior?",
      k: ["junior", "semi+senior", "senior", "seniority"],
      a: "El sitio no le asigna un nivel. Se formó como Analista de Sistemas y sus proyectos, todos de 2026, tienen demo y código público para evaluar el trabajo.",
    },
    en: {
      q: "Is he junior, mid or senior?",
      k: ["junior", "mid+level", "senior", "seniority"],
      a: "The site does not assign a level. He trained as a Systems Analyst and his projects, all from 2026, have a live demo and public code so you can judge the work.",
    },
  },
  {
    id: "education",
    sources: ["about"],
    es: {
      q: "¿Qué estudió?",
      k: ["estudio", "estudios", "titulo", "carrera", "formacion", "educacion", "universidad"],
      a: "Analista de Sistemas (Instituto Superior de la Empresa, HILET, 2024) y la Tecnicatura Superior en Mantenimiento Industrial (ISFP N° 196, en curso desde 2025). También hizo Claude Academy: Claude Code 101.",
    },
    en: {
      q: "What did he study?",
      k: ["what+did+he+study", "studied", "degree", "education", "background", "university", "qualification"],
      a: "Systems Analyst (Instituto Superior de la Empresa, HILET, 2024) and a Higher Technical Degree in Industrial Maintenance (ISFP N° 196, ongoing since 2025). He also took Claude Academy: Claude Code 101.",
    },
  },
  {
    id: "studying",
    sources: ["about"],
    es: {
      q: "¿Qué está estudiando ahora?",
      k: ["estudiando", "cursando", "tecnicatura", "mantenimiento+industrial", "que+aprende"],
      a: "Cursa la Tecnicatura Superior en Mantenimiento Industrial, porque le atrae el cruce entre software e industria (automatización, Industria 4.0). En lo técnico, está sumando Python y RAG.",
    },
    en: {
      q: "What is he studying now?",
      k: ["studying", "currently+learning", "learning+now", "industrial+maintenance", "technical+degree"],
      a: "He is taking the Higher Technical Degree in Industrial Maintenance, because he likes the crossover between software and industry (automation, Industry 4.0). On the technical side, he is adding Python and RAG.",
    },
  },
  {
    id: "languages",
    sources: ["about"],
    es: {
      q: "¿Qué nivel de inglés tiene?",
      k: ["nivel+de+ingles", "que+idiomas", "idiomas+habla", "habla+ingles", "sabe+ingles", "tiene+ingles"],
      a: "Inglés intermedio, con B1 certificado. Español nativo. El sitio está disponible en ambos idiomas.",
    },
    en: {
      q: "What is his English level?",
      k: ["english+level", "level+of+english", "what+languages", "languages+does", "speak+english"],
      a: "Intermediate English, with a B1 certificate. Native Spanish. The site is available in both languages.",
    },
  },
  {
    id: "certs",
    sources: ["about"],
    es: {
      q: "¿Tiene certificaciones o cursos?",
      k: ["certificacion", "certificado", "cursos", "claude+academy", "capacitacion"],
      a: "Hizo Claude Academy: Claude Code 101 y tiene el inglés certificado en nivel B1. Su título es de Analista de Sistemas (2024).",
    },
    en: {
      q: "Does he have certifications or courses?",
      k: ["certification", "certificate", "courses", "claude+academy", "training"],
      a: "He took Claude Academy: Claude Code 101 and holds a B1 English certificate. His degree is Systems Analyst (2024).",
    },
  },

  // ───────── Experiencia ─────────
  {
    id: "experience",
    sources: ["about"],
    es: {
      q: "¿Cuál es su experiencia laboral?",
      k: ["experiencia+laboral", "trayectoria", "historial", "curriculum", "cv", "trabajos+anteriores", "empleos+anteriores"],
      a: "Desarrollador Frontend freelance desde agosto de 2026 (Grano & Co., Laufen y este portfolio) y, antes, encargado de depósito en Zoom Bazar, Mar del Plata (octubre de 2025 a julio de 2026). El CV se descarga desde el sitio.",
    },
    en: {
      q: "What is his work experience?",
      k: ["work+experience", "work+history", "career", "resume", "cv", "previous+jobs", "previous+employers"],
      a: "Freelance Front-End Developer since August 2026 (Grano & Co., Laufen and this portfolio) and, before that, warehouse lead at Zoom Bazar, Mar del Plata (October 2025 to July 2026). The CV can be downloaded from the site.",
    },
  },
  {
    id: "otherjobs",
    sources: ["about"],
    es: {
      q: "¿Qué hacía antes de programar?",
      k: ["deposito", "zoom", "antes+de+programar", "otro+rubro", "encargado"],
      a: "Fue encargado de depósito en Zoom Bazar (Mar del Plata): reorganizó el depósito y el circuito de reposición para agilizar el trabajo del equipo.",
    },
    en: {
      q: "What did he do before programming?",
      k: ["warehouse", "zoom+bazar", "before+programming", "before+coding", "other+industry", "career+change"],
      a: "He was a warehouse lead at Zoom Bazar (Mar del Plata): he reorganized the warehouse and restocking flow to speed up the team's daily work.",
    },
  },
  {
    id: "teamwork",
    sources: ["about"],
    es: {
      q: "¿Tiene experiencia trabajando en equipo?",
      k: ["en+equipo", "scrum", "agil", "metodolog"],
      a: "El sitio muestra proyectos individuales y no publica experiencia en un equipo de software. Sí busca sumarse a uno para aprender y crecer, y como encargado de depósito organizó el trabajo de un equipo.",
    },
    en: {
      q: "Does he have experience working in a team?",
      k: ["in+a+team", "team+experience", "teamwork", "scrum", "agile", "methodolog"],
      a: "The site shows solo projects and does not publish experience in a software team. He does want to join one to learn and grow, and as a warehouse lead he organized a team's work.",
    },
  },
  {
    id: "freelance",
    sources: ["about"],
    es: {
      q: "¿Tiene experiencia como freelance?",
      k: ["experiencia+freelance", "como+freelance", "trabajo+independiente", "clientes+anteriores"],
      a: "Trabaja como desarrollador Frontend freelance desde agosto de 2026, diseñando y desarrollando apps web y mobile completas, desde la interfaz hasta el deploy. El sitio no lista clientes.",
    },
    en: {
      q: "Does he have freelance experience?",
      k: ["freelance+experience", "worked+as+a+freelanc", "as+a+freelanc", "past+clients", "previous+clients"],
      a: "He has worked as a freelance Front-End Developer since August 2026, designing and building complete web and mobile apps, from interface to deploy. The site does not list clients.",
    },
  },
  {
    id: "motivation",
    sources: ["about"],
    es: {
      q: "¿Por qué cambió a software?",
      k: ["por+que+software", "por+que+cambi", "cambio+de+carrera", "motiva", "pasion", "por+que+programar"],
      a: "Se formó como Analista de Sistemas y le atrae el cruce entre software e industria: automatización, Industria 4.0 y herramientas que ayuden a las empresas a aprovechar mejor sus datos.",
    },
    en: {
      q: "Why did he move into software?",
      k: ["why+software", "why+did+he+change", "why+did+he+move", "career+change", "motivat", "passion", "why+programming"],
      a: "He trained as a Systems Analyst and likes the crossover between software and industry: automation, Industry 4.0 and tools that help companies make better use of their data.",
    },
  },
  {
    id: "lookingfor",
    sources: ["about"],
    es: {
      q: "¿Qué busca en su próximo trabajo?",
      k: ["proximo+trabajo", "proximo+empleo", "expectativas", "objetivo+profesional", "que+espera"],
      a: "Sumarse a un equipo, aprender y crecer profesionalmente. Está disponible para empezar de forma remota, en relación de dependencia o como freelance.",
    },
    en: {
      q: "What is he looking for in his next job?",
      k: ["next+job", "next+role", "expectations", "career+goal", "what+does+he+expect"],
      a: "To join a team, keep learning and grow professionally. He is available to start remotely, as an employee or as a freelancer.",
    },
  },

  // ───────── Tecnologías ─────────
  {
    id: "stack",
    sources: ["stack"],
    es: {
      q: "¿Con qué tecnologías trabaja?",
      k: ["stack", "tecnolog", "herramientas", "lenguajes+de+programacion"],
      a: "React, TypeScript y Next.js en frontend, con Tailwind CSS y GSAP. Flutter y Firebase para apps web y mobile. En IA, la API de Claude, Claude Code, MCP y Zod; para calidad, Vitest y Playwright. Despliega con GitHub Actions y Vercel.",
    },
    en: {
      q: "Which technologies does he work with?",
      k: ["stack", "technolog", "tools", "programming+languages"],
      a: "React, TypeScript and Next.js on the front end, with Tailwind CSS and GSAP. Flutter and Firebase for web and mobile apps. On the AI side, the Claude API, Claude Code, MCP and Zod; for quality, Vitest and Playwright. He deploys with GitHub Actions and Vercel.",
    },
  },
  {
    id: "react",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Sabe React?",
      k: ["react"],
      a: "Sí: React es parte central de su stack y lo usa con Next.js y TypeScript en el Dashboard con IA y en este portfolio.",
    },
    en: {
      q: "Does he know React?",
      k: ["react"],
      a: "Yes: React is a core part of his stack, used with Next.js and TypeScript in the AI dashboard and in this portfolio.",
    },
  },
  {
    id: "typescript",
    sources: ["stack"],
    es: {
      q: "¿Usa TypeScript?",
      k: ["typescript", "tipado", "tipos+estaticos"],
      a: "Sí. TypeScript está en todos sus proyectos web (Dashboard con IA y este portfolio) y valida los datos que vienen de afuera con Zod.",
    },
    en: {
      q: "Does he use TypeScript?",
      k: ["typescript", "typing", "static+types"],
      a: "Yes. TypeScript is in all his web projects (the AI dashboard and this portfolio) and he validates external data with Zod.",
    },
  },
  {
    id: "nextjs",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Qué experiencia tiene con Next.js?",
      k: ["next+js", "nextjs", "app+router", "ssr", "ssg", "server+components"],
      a: "Construyó con Next.js el Dashboard con IA (la IA se consulta desde el servidor) y este portfolio, bilingüe y generado de forma estática, con deploy continuo en Vercel.",
    },
    en: {
      q: "What experience does he have with Next.js?",
      k: ["next+js", "nextjs", "app+router", "ssr", "ssg", "server+components"],
      a: "He built the AI dashboard with Next.js (the AI is called from the server) and this portfolio, bilingual and statically generated, with continuous deploys on Vercel.",
    },
  },
  {
    id: "tailwind",
    sources: ["stack"],
    es: {
      q: "¿Usa Tailwind CSS?",
      k: ["tailwind", "css", "estilos", "sass"],
      a: "Sí, Tailwind CSS está en su stack y lo usa en este portfolio, además de HTML5 y CSS3. Diseña sus propias interfaces, en modo claro y oscuro.",
    },
    en: {
      q: "Does he use Tailwind CSS?",
      k: ["tailwind", "css", "styling", "sass"],
      a: "Yes, Tailwind CSS is in his stack and he uses it in this portfolio, along with HTML5 and CSS3. He designs his own interfaces, in light and dark mode.",
    },
  },
  {
    id: "flutter",
    sources: ["laufen", "stack"],
    es: {
      q: "¿Sabe Flutter o Dart?",
      k: ["flutter", "dart"],
      a: "Sí. Hizo Laufen, una app de running 100% en Flutter: el mismo código funciona en Android y en la web, con Firebase detrás.",
    },
    en: {
      q: "Does he know Flutter or Dart?",
      k: ["flutter", "dart"],
      a: "Yes. He built Laufen, a running app 100% in Flutter: the same code runs on Android and on the web, with Firebase behind it.",
    },
  },
  {
    id: "firebase",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Qué experiencia tiene con Firebase?",
      k: ["firebase", "firestore"],
      a: "Lo usa en el Dashboard con IA (los datos, con un resumen por día para cargar rápido) y en Laufen (autenticación, datos y hosting).",
    },
    en: {
      q: "What experience does he have with Firebase?",
      k: ["firebase", "firestore"],
      a: "He uses it in the AI dashboard (the data, with a per-day summary so it loads fast) and in Laufen (authentication, data and hosting).",
    },
  },
  {
    id: "backend",
    sources: ["stack"],
    es: {
      q: "¿Sabe backend o Node.js?",
      k: ["backend", "back+end", "node", "api+rest", "apis"],
      a: "Su fuerte es el frontend, pero usa Node.js, rutas de servidor de Next.js e integración de APIs REST. En el Dashboard con IA, la API de Claude se consulta desde el servidor.",
    },
    en: {
      q: "Does he know back-end or Node.js?",
      k: ["backend", "back+end", "node", "rest+api", "apis"],
      a: "His strength is the front end, but he uses Node.js, Next.js server routes and REST API integration. In the AI dashboard, the Claude API is called from the server.",
    },
  },
  {
    id: "testing",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Escribe tests?",
      k: ["escribe+tests", "escribe+pruebas", "tests+unitarios", "pruebas+automat", "vitest", "playwright", "testing"],
      a: "Sí: Vitest para la lógica (por ejemplo, los parciales por kilómetro e intervalos de Laufen y el Dashboard con IA) y Playwright para verificar en el navegador.",
    },
    en: {
      q: "Does he write tests?",
      k: ["write+tests", "unit+tests", "automated+test", "vitest", "playwright", "testing"],
      a: "Yes: Vitest for logic (for example Laufen's per-kilometer splits and intervals, and the AI dashboard) and Playwright to verify in the browser.",
    },
  },
  {
    id: "cicd",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Qué experiencia tiene con CI/CD y deploy?",
      k: ["ci+cd", "deploy", "despliegue", "github+actions", "integracion+continua", "vercel"],
      a: "Usa GitHub Actions y Vercel: sus proyectos se publican automáticamente desde GitHub. El Dashboard con IA y este portfolio tienen CI con las verificaciones antes de publicar.",
    },
    en: {
      q: "What experience does he have with CI/CD and deploys?",
      k: ["ci+cd", "deploy", "github+actions", "continuous+integration", "vercel", "pipeline"],
      a: "He uses GitHub Actions and Vercel: his projects publish automatically from GitHub. The AI dashboard and this portfolio have CI with checks before publishing.",
    },
  },
  {
    id: "a11y",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Cuida la accesibilidad?",
      k: ["accesib", "wcag", "a11y", "lector+de+pantalla"],
      a: "Sí: es parte de cómo construye. El Dashboard con IA obtuvo 100 en accesibilidad en Lighthouse, y el stack incluye WCAG.",
    },
    en: {
      q: "Does he care about accessibility?",
      k: ["accessib", "wcag", "a11y", "screen+reader"],
      a: "Yes: it is part of how he builds. The AI dashboard scored 100 in accessibility in Lighthouse, and his skills include WCAG.",
    },
  },
  {
    id: "performance",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Qué tan rápidas son sus webs?",
      k: ["rendimiento", "performance", "velocidad", "core+web+vitals", "rapid"],
      a: "El Dashboard con IA obtuvo en Lighthouse 100 en accesibilidad, buenas prácticas y SEO, y 99 de rendimiento en computadora; en celular ronda 75 y es lo próximo a mejorar.",
    },
    en: {
      q: "How fast are his sites?",
      k: ["performance", "speed", "core+web+vitals", "fast", "page+speed"],
      a: "The AI dashboard scored in Lighthouse 100 in accessibility, best practices and SEO, and 99 desktop performance; mobile is around 75 and is the next thing to improve.",
    },
  },
  {
    id: "seo",
    sources: ["stack", "ai-dashboard"],
    es: {
      q: "¿Sabe de SEO?",
      k: ["seo", "posicionamiento", "metadata", "sitemap"],
      a: "Sí, SEO técnico: este portfolio es bilingüe, tiene metadata, sitemap y versiones por idioma. El Dashboard con IA obtuvo 100 en SEO en Lighthouse.",
    },
    en: {
      q: "Does he know SEO?",
      k: ["seo", "search+engine", "metadata", "sitemap"],
      a: "Yes, technical SEO: this portfolio is bilingual, with metadata, a sitemap and per-language versions. The AI dashboard scored 100 in SEO in Lighthouse.",
    },
  },
  {
    id: "i18n",
    sources: ["stack"],
    es: {
      q: "¿Hace sitios en varios idiomas?",
      k: ["varios+idiomas", "multiidioma", "i18n", "internacionaliz", "next+intl", "traduc"],
      a: "Sí: este portfolio y el Dashboard con IA están en español e inglés, con next-intl en Next.js y versiones por idioma para SEO.",
    },
    en: {
      q: "Does he build multilingual sites?",
      k: ["multilingual", "multiple+languages", "i18n", "internationali", "next+intl", "translat"],
      a: "Yes: this portfolio and the AI dashboard are in Spanish and English, using next-intl in Next.js and per-language versions for SEO.",
    },
  },
  {
    id: "git",
    sources: ["stack"],
    es: {
      q: "¿Usa Git y GitHub?",
      k: ["git", "github", "control+de+versiones", "pull+request"],
      a: "Sí. Todos sus proyectos están en GitHub, con publicación automática y CI en GitHub Actions. El código es público.",
    },
    en: {
      q: "Does he use Git and GitHub?",
      k: ["git", "github", "version+control", "pull+request"],
      a: "Yes. All his projects are on GitHub, with automatic publishing and CI on GitHub Actions. The code is public.",
    },
  },
  {
    id: "python",
    sources: ["about", "stack"],
    es: {
      q: "¿Sabe Python?",
      k: ["python"],
      a: "Todavía no lo usa en sus proyectos publicados: hoy está sumando Python y RAG para crecer hacia AI Engineering. Su stack actual es JavaScript, TypeScript y Dart.",
    },
    en: {
      q: "Does he know Python?",
      k: ["python"],
      a: "He does not use it yet in his published projects: he is adding Python and RAG to grow toward AI engineering. His current stack is JavaScript, TypeScript and Dart.",
    },
  },
  {
    id: "gsap",
    sources: ["stack"],
    es: {
      q: "¿Hace animaciones web?",
      k: ["animaci", "gsap", "motion", "microinteracc"],
      a: "Sí, con GSAP y CSS, cuidando la accesibilidad: respeta la preferencia de movimiento reducido. En Laufen, las animaciones usan las herramientas propias de Flutter.",
    },
    en: {
      q: "Does he build web animations?",
      k: ["animation", "animate", "gsap", "motion", "micro+interaction"],
      a: "Yes, with GSAP and CSS, keeping accessibility in mind: it respects the reduced-motion preference. In Laufen, animations use Flutter's own tools.",
    },
  },
  {
    id: "design",
    sources: ["about"],
    es: {
      q: "¿Diseña las interfaces o solo las programa?",
      k: ["disena", "diseno", "ui+ux", "figma", "interfaces"],
      a: "Hace ambas cosas: diseña y desarrolla sus propias interfaces, con foco en que sean claras, rápidas y accesibles. El sitio no menciona Figma.",
    },
    en: {
      q: "Does he design the interfaces or only code them?",
      k: ["design", "ui+ux", "figma", "interfaces"],
      a: "Both: he designs and builds his own interfaces, aiming for them to be clear, fast and accessible. The site does not mention Figma.",
    },
  },
  {
    id: "database",
    sources: ["stack"],
    es: {
      q: "¿Qué bases de datos usa?",
      k: ["base+de+datos", "bases+de+datos", "sql", "postgres", "mongo", "redis"],
      a: "Firebase (Firestore) en el Dashboard con IA y Laufen, y Redis para los contadores de este asistente. El sitio no menciona bases SQL.",
    },
    en: {
      q: "Which databases does he use?",
      k: ["database", "sql", "postgres", "mongo", "redis"],
      a: "Firebase (Firestore) in the AI dashboard and Laufen, and Redis for this assistant's usage counters. The site does not mention SQL databases.",
    },
  },

  // ───────── IA ─────────
  {
    id: "ai",
    sources: ["ai-dashboard", "about"],
    es: {
      q: "¿Qué experiencia tiene con IA?",
      k: ["experiencia+con+ia", "experiencia+tiene+con+ia", "experiencia+en+ia", "inteligencia+artificial", "ia+aplicada", "que+hace+con+ia"],
      a: "Integra la API de Claude en apps web: el Dashboard con IA genera un resumen semanal desde el servidor, validado con Zod, con caché y límites de uso. Además trabaja a diario con Claude Code y MCP.",
    },
    en: {
      q: "What experience does he have with AI?",
      k: ["experience+with+ai", "have+with+ai", "ai+experience", "artificial+intelligence", "applied+ai", "what+does+he+do+with+ai"],
      a: "He integrates the Claude API into web apps: the AI dashboard generates a weekly summary from the server, validated with Zod, with caching and usage limits. He also works daily with Claude Code and MCP.",
    },
  },
  {
    id: "claudecode",
    sources: ["about"],
    es: {
      q: "¿Usa Claude Code?",
      k: ["claude+code", "herramientas+agenticas", "agentic", "claude+md"],
      a: "Sí, todos los días, con servidores MCP y archivos de contexto del proyecto (CLAUDE.md), y entendiendo cada línea que sube. Hizo el curso Claude Academy: Claude Code 101.",
    },
    en: {
      q: "Does he use Claude Code?",
      k: ["claude+code", "agentic+tools", "agentic", "claude+md"],
      a: "Yes, every day, with MCP servers and project context files (CLAUDE.md), understanding every line he commits. He took the Claude Academy: Claude Code 101 course.",
    },
  },
  {
    id: "mcp",
    sources: ["about", "stack"],
    es: {
      q: "¿Qué es MCP y cómo lo usa?",
      k: ["mcp", "model+context+protocol", "servidores+mcp", "context7"],
      a: "MCP (Model Context Protocol) conecta a Claude con herramientas y documentación. Lo usa con Claude Code, por ejemplo con el servidor context7 para consultar documentación al día de las librerías.",
    },
    en: {
      q: "What is MCP and how does he use it?",
      k: ["mcp", "model+context+protocol", "mcp+servers", "context7"],
      a: "MCP (Model Context Protocol) connects Claude to tools and documentation. He uses it with Claude Code, for example the context7 server to look up up-to-date library docs.",
    },
  },
  {
    id: "prompts",
    sources: ["stack"],
    es: {
      q: "¿Sabe de ingeniería de prompts?",
      k: ["prompt", "prompts", "ingenieria+de+prompts"],
      a: "Sí, figura entre sus aptitudes de IA, junto con la API de Claude, Claude Code y MCP. En sus proyectos, las respuestas del modelo se piden en formato estructurado y se validan.",
    },
    en: {
      q: "Does he know prompt engineering?",
      k: ["prompt", "prompts", "prompt+engineering"],
      a: "Yes, it is listed among his AI skills, with the Claude API, Claude Code and MCP. In his projects, model answers are requested in a structured format and validated.",
    },
  },
  {
    id: "rag",
    sources: ["about"],
    es: {
      q: "¿Sabe RAG o trabaja con embeddings?",
      k: ["rag", "embedding", "vectorial", "vector", "recuperacion"],
      a: "Todavía no tiene un proyecto publicado con RAG: lo está aprendiendo junto con Python, para crecer hacia AI Engineering.",
    },
    en: {
      q: "Does he know RAG or work with embeddings?",
      k: ["rag", "embedding", "vector", "retrieval"],
      a: "He does not have a published RAG project yet: he is learning it along with Python, to grow toward AI engineering.",
    },
  },
  {
    id: "structured",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Cómo evita que la IA invente cosas?",
      k: ["alucin", "inventa", "invente", "validacion", "zod", "confiable"],
      a: "En el Dashboard con IA la respuesta del modelo se pide en formato estructurado y se valida con Zod antes de mostrarla; si no cumple, se usa un resumen por reglas. Este asistente responde solo con el contenido del sitio.",
    },
    en: {
      q: "How does he keep the AI from making things up?",
      k: ["hallucinat", "make+things+up", "making+things+up", "keep+the+ai", "invent", "validation", "zod", "reliable"],
      a: "In the AI dashboard the model's answer is requested in a structured format and validated with Zod before showing it; if it fails, a rule-based summary is used. This assistant only answers from the site's content.",
    },
  },
  {
    id: "aicost",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Cómo controla el costo de la IA?",
      k: ["costo+de+la+ia", "controla+el+costo", "gasto+de+la+ia", "limites+de+uso", "rate+limit"],
      a: "En el Dashboard con IA el resumen se genera una sola vez por semana, se guarda en caché y hay un límite de usos por persona y por día. Así el gasto no se dispara.",
    },
    en: {
      q: "How does he control AI costs?",
      k: ["ai+cost", "control+cost", "ai+spend", "usage+limits", "rate+limit"],
      a: "In the AI dashboard the summary is generated once a week, cached, and there is a per-person, per-day usage limit. That keeps spending from spiking.",
    },
  },
  {
    id: "apikeysec",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Cómo protege la clave de la API?",
      k: ["clave", "api+key", "seguridad", "secretos", "proteg"],
      a: "La IA se consulta desde el servidor: la clave nunca llega al navegador. Además el sitio usa cabeceras de seguridad (CSP) y topes de uso en los endpoints con IA.",
    },
    en: {
      q: "How does he protect the API key?",
      k: ["api+key", "key", "security", "secrets", "protect"],
      a: "The AI is called from the server: the key never reaches the browser. The site also uses security headers (CSP) and usage caps on the AI endpoints.",
    },
  },
  {
    id: "aifallback",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Qué pasa si la IA falla?",
      k: ["si+la+ia+falla", "plan+b", "fallback", "cuando+falla", "si+no+responde"],
      a: "El Dashboard con IA muestra igual un resumen, generado por reglas. Es una lección que destaca: pensar qué pasa cuando algo falla. Este asistente, si no está disponible, deja las preguntas sugeridas.",
    },
    en: {
      q: "What happens if the AI fails?",
      k: ["if+the+ai+fails", "fallback", "plan+b", "when+it+fails", "if+it+does+not+respond"],
      a: "The AI dashboard still shows a summary, generated by rules. It is a lesson he highlights: plan for what happens when something fails. If this assistant is unavailable, the suggested questions remain.",
    },
  },
  {
    id: "aicode",
    sources: ["about"],
    es: {
      q: "¿Entiende el código que genera la IA?",
      k: ["entiende+el+codigo", "codigo+que+genera", "depende+de+la+ia", "vibe+coding", "copia"],
      a: "Sí: trabaja con herramientas agénticas entendiendo cada línea que sube. Es parte de cómo se presenta, y todos sus repositorios son públicos para revisarlos.",
    },
    en: {
      q: "Does he understand the code AI generates?",
      k: ["understand+the+code", "code+ai+generates", "depend+on+ai", "vibe+coding", "copy"],
      a: "Yes: he works with agentic tools while understanding every line he commits. It is part of how he presents himself, and all his repositories are public to review.",
    },
  },
  {
    id: "assistant",
    sources: ["about", "stack"],
    es: {
      q: "¿Cómo funciona este asistente?",
      k: ["como+funciona+este", "como+funciona+el+asistente", "como+esta+hecho+el+asistente", "como+hizo+el+asistente", "este+asistente", "este+chat"],
      a: "Las preguntas frecuentes se responden con textos escritos a partir del sitio. Las libres van a la API de Claude desde el servidor, que responde solo con el contenido del sitio, cita fuentes y valida la salida con Zod. Hay topes de uso en Redis.",
    },
    en: {
      q: "How does this assistant work?",
      k: ["how+does+this", "how+does+the+assistant", "how+is+the+assistant+built", "how+was+this+built", "this+assistant", "this+chat"],
      a: "Frequent questions are answered with texts written from the site. Free questions go to the Claude API from the server, which answers only from the site's content, cites sources and validates the output with Zod. Usage caps are kept in Redis.",
    },
  },
  {
    id: "assistantcost",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Cuánto cuesta cada pregunta al asistente?",
      k: ["cuanto+cuesta+cada", "cuanto+cuesta+una+pregunta", "costo+por+pregunta", "cuanto+gasta", "es+caro"],
      a: "Muy poco: las preguntas frecuentes, como esta, se responden sin llamar a la API (costo cero). Las libres usan un modelo Haiku de Claude con el contenido del sitio en caché, respuestas cortas y topes: 8 por visitante y 150 por día en total.",
    },
    en: {
      q: "How much does each question to the assistant cost?",
      k: ["how+much+does+each", "how+much+is+a+question", "cost+per+question", "how+much+does+it+cost+to+ask", "is+it+expensive"],
      a: "Very little: frequent questions, like this one, are answered without calling the API (zero cost). Free questions use a Claude Haiku model with the site's content cached, short answers and caps: 8 per visitor and 150 per day overall.",
    },
  },
  {
    id: "assistantmodel",
    sources: ["stack"],
    es: {
      q: "¿Qué modelo usa el asistente?",
      k: ["que+modelo", "cual+modelo", "modelo+de+ia", "haiku", "gpt", "openai"],
      a: "Un modelo Haiku de Claude (el más liviano de la familia), elegido para responder rápido y barato. El modelo se puede cambiar con una variable de entorno.",
    },
    en: {
      q: "Which model does the assistant use?",
      k: ["which+model", "what+model", "ai+model", "haiku", "gpt", "openai"],
      a: "A Claude Haiku model (the lightest in the family), chosen to answer fast and cheaply. The model can be changed with an environment variable.",
    },
  },
  {
    id: "aieng",
    sources: ["about"],
    es: {
      q: "¿Quiere dedicarse a AI Engineering?",
      k: ["ai+engineer", "ingenieria+de+ia", "ingeniero+de+ia", "machine+learning", "futuro+profesional"],
      a: "Es la dirección en la que crece: hoy combina frontend con IA aplicada y está sumando Python y RAG. Sus intereses son Frontend, IA aplicada y automatización.",
    },
    en: {
      q: "Does he want to move into AI engineering?",
      k: ["ai+engineer", "machine+learning", "future+plans", "career+direction"],
      a: "It is the direction he is growing in: today he combines front end with applied AI and is adding Python and RAG. His interests are Frontend, applied AI and automation.",
    },
  },

  // ───────── Proyectos ─────────
  {
    id: "projects",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Qué proyectos tiene?",
      k: ["que+proyectos", "cuales+proyectos", "tiene+proyectos", "portfolio+de", "que+hizo", "que+construyo", "que+armo", "trabajos+publicados"],
      a: "Tres de 2026: el Dashboard con IA para una cafetería (Grano & Co.), Laufen (app de running en Flutter) y este portfolio. Los dos primeros tienen demo y código público.",
    },
    en: {
      q: "What projects does he have?",
      k: ["what+projects", "which+projects", "have+projects", "what+has+he+built", "what+did+he+build", "what+has+he+made", "published+work"],
      a: "Three from 2026: the AI dashboard for a coffee shop (Grano & Co.), Laufen (a running app in Flutter) and this portfolio. The first two have a live demo and public code.",
    },
  },
  {
    id: "grano",
    sources: ["ai-dashboard"],
    es: {
      q: "¿De qué trata el Dashboard con IA?",
      k: ["grano", "dashboard", "panel", "cafeteria"],
      a: "Un panel para una cafetería de especialidad: ventas, pedidos y stock en una pantalla, con alertas de stock bajo, mapa de horas pico y un resumen semanal escrito por Claude que aparece como un ticket que se imprime.",
    },
    en: {
      q: "What is the AI dashboard about?",
      k: ["grano", "dashboard", "panel", "coffee"],
      a: "A panel for a specialty coffee shop: sales, orders and stock on one screen, with low-stock alerts, a peak-hours map and a weekly summary written by Claude that appears as a printed ticket.",
    },
  },
  {
    id: "laufen",
    sources: ["laufen"],
    es: {
      q: "¿De qué trata Laufen?",
      k: ["que+es+laufen", "trata+laufen", "sobre+laufen", "app+de+running", "apps+de+running"],
      a: "Una app de running hecha 100% en Flutter, para Android y web con el mismo código: mapa en vivo, ritmo y parciales por kilómetro, intervalos y récords personales, con Firebase detrás. Se prueba sin registrarse.",
    },
    en: {
      q: "What is Laufen about?",
      k: ["what+is+laufen", "about+laufen", "running+app"],
      a: "A running app built 100% in Flutter, for Android and web from the same code: live map, pace and per-kilometer splits, intervals and personal records, with Firebase behind it. It can be tried without signing up.",
    },
  },
  {
    id: "portfolio",
    sources: ["stack"],
    es: {
      q: "¿Cómo está hecho este portfolio?",
      k: ["este+portfolio", "este+sitio", "esta+web", "esta+pagina", "como+esta+hecho+el+portfolio"],
      a: "Con Next.js, TypeScript y Tailwind CSS: bilingüe (ES/EN), con SEO técnico, accesibilidad y modo claro y oscuro. Sale estático, con deploy continuo desde GitHub a Vercel; solo este asistente es dinámico.",
    },
    en: {
      q: "How is this portfolio built?",
      k: ["this+portfolio", "this+site", "this+website", "this+page", "how+is+the+portfolio+built"],
      a: "With Next.js, TypeScript and Tailwind CSS: bilingual (ES/EN), with technical SEO, accessibility and light and dark mode. It is statically generated, deployed continuously from GitHub to Vercel; only this assistant is dynamic.",
    },
  },
  {
    id: "demos",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Dónde puedo ver las demos?",
      k: ["demo", "demos", "en+vivo", "ver+los+proyectos", "link+a+los+proyectos"],
      a: "En la sección Proyectos del sitio: cada proyecto tiene su demo y su caso de estudio. Los dos publicados se abren en un clic, sin registrarse.",
    },
    en: {
      q: "Where can I see the demos?",
      k: ["demo", "demos", "live+demo", "see+the+projects", "link+to+the+projects"],
      a: "In the Projects section of the site: each project has its demo and its case study. The two published ones open in one click, with no sign-up.",
    },
  },
  {
    id: "repos",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Dónde está el código?",
      k: ["donde+esta+el+codigo", "repositorio", "repo", "github+de", "codigo+fuente", "open+source", "link+al+codigo"],
      a: "Público en GitHub (github.com/FranSpatocco): el Dashboard con IA, Laufen y este portfolio tienen repositorio propio, enlazado desde cada proyecto.",
    },
    en: {
      q: "Where is the code?",
      k: ["where+is+the+code", "repository", "repo", "source+code", "open+source", "link+to+the+code"],
      a: "Public on GitHub (github.com/FranSpatocco): the AI dashboard, Laufen and this portfolio each have their own repository, linked from each project.",
    },
  },
  {
    id: "lighthouse",
    sources: ["ai-dashboard"],
    es: {
      q: "¿Qué resultados tuvo en Lighthouse?",
      k: ["lighthouse", "resultados+lighthouse", "puntaje", "score", "metricas", "cifras"],
      a: "El Dashboard con IA: 100 en accesibilidad, buenas prácticas y SEO, y 99 de rendimiento en computadora. En celular ronda 75, y lo marca como lo próximo a mejorar.",
    },
    en: {
      q: "What did he score in Lighthouse?",
      k: ["lighthouse+results", "lighthouse+score", "score", "scores", "metrics", "numbers"],
      a: "The AI dashboard: 100 in accessibility, best practices and SEO, and 99 desktop performance. On mobile it is around 75, which he flags as the next thing to improve.",
    },
  },
  {
    id: "hardest",
    sources: ["laufen", "ai-dashboard"],
    es: {
      q: "¿Cuál fue el problema más difícil que resolvió?",
      k: ["problema+mas+dificil", "mayor+desafio", "desafio", "reto", "dificultad"],
      a: "En Laufen, el GPS daba saltos imposibles: descarta lecturas poco precisas y las que implicarían correr a más de 8 m/s, y calcula el cruce de cada kilómetro entre dos lecturas. Lo descubrió probando en una carrera real.",
    },
    en: {
      q: "What was the hardest problem he solved?",
      k: ["hardest+problem", "biggest+challenge", "challenge", "difficult"],
      a: "In Laufen, GPS gave impossible jumps: he discards imprecise readings and ones implying running faster than 8 m/s, and computes each kilometer crossing between two readings. He found it by testing on a real run.",
    },
  },
  {
    id: "learned",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Qué aprendió con sus proyectos?",
      k: ["aprendio", "aprendizaje", "lecciones", "que+aprendi"],
      a: "Que hay que probar en producción y en dispositivos reales, porque varios problemas aparecieron recién ahí, y pensar qué pasa cuando algo falla (si la IA no responde, el panel muestra igual un resumen).",
    },
    en: {
      q: "What did he learn from his projects?",
      k: ["learned", "lessons", "takeaways", "what+did+he+learn"],
      a: "To test in production and on real devices, because several problems only showed up there, and to plan for what happens when something fails (if the AI does not respond, the dashboard still shows a summary).",
    },
  },
  {
    id: "stores",
    sources: ["laufen"],
    es: {
      q: "¿Laufen está en las tiendas de aplicaciones?",
      k: ["play+store", "app+store", "tiendas", "google+play", "publicada+en+la+tienda"],
      a: "Todavía no: queda pendiente publicarla en las tiendas. Hoy está en la web con Firebase Hosting y fue instalada y probada en un Android real, incluida una carrera al aire libre.",
    },
    en: {
      q: "Is Laufen in the app stores?",
      k: ["play+store", "app+store", "stores", "google+play", "published+in+the+store"],
      a: "Not yet: publishing it to the stores is pending. Today it is on the web with Firebase Hosting and was installed and tested on a real Android, including an outdoor run.",
    },
  },
  {
    id: "mobile",
    sources: ["laufen"],
    es: {
      q: "¿Desarrolla apps mobile?",
      k: ["mobile", "movil", "celular", "android", "ios", "apps+para+celular"],
      a: "Sí, con Flutter: Laufen funciona en Android y en la web con el mismo código. El sitio no menciona una app publicada en iOS.",
    },
    en: {
      q: "Does he build mobile apps?",
      k: ["mobile", "android", "ios", "phone+app"],
      a: "Yes, with Flutter: Laufen runs on Android and on the web from the same code. The site does not mention an app published on iOS.",
    },
  },
  {
    id: "projtests",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Sus proyectos tienen tests?",
      k: ["proyectos+tienen+tests", "tests+en+sus+proyectos", "cobertura", "pruebas+de+sus+proyectos"],
      a: "Sí. El Dashboard con IA tiene tests con Vitest y Laufen tiene tests de la lógica (parciales por kilómetro e intervalos) y de pantallas. Este portfolio también corre tests en su CI.",
    },
    en: {
      q: "Do his projects have tests?",
      k: ["projects+have+tests", "tests+in+his+projects", "coverage", "tests+for+his+projects"],
      a: "Yes. The AI dashboard has Vitest tests and Laufen has tests for logic (per-kilometer splits and intervals) and screens. This portfolio also runs tests in its CI.",
    },
  },
  {
    id: "noregister",
    sources: ["ai-dashboard", "laufen"],
    es: {
      q: "¿Hay que registrarse para probar los proyectos?",
      k: ["registrarse", "registro", "cuenta", "login", "sin+registro"],
      a: "No. Los dos proyectos publicados se abren en un clic: el Dashboard con IA usa datos de ejemplo, y Laufen trae una carrera de ejemplo; el registro se pide recién al guardar una carrera.",
    },
    en: {
      q: "Do I need to sign up to try the projects?",
      k: ["sign+up", "register", "account", "login", "without+signing"],
      a: "No. Both published projects open in one click: the AI dashboard uses sample data, and Laufen ships with a sample run; sign-in is asked only when saving a run.",
    },
  },

  // ───────── Servicios y cierre ─────────
  {
    id: "services",
    sources: ["availability"],
    es: {
      q: "¿Qué servicios freelance ofrece?",
      k: ["servicios", "ofrece", "landing", "pagina+web+para"],
      a: "Landings y sitios institucionales, apps para web y celular con Flutter, y optimización de performance y SEO. Sitios rápidos, accesibles y bien posicionados.",
    },
    en: {
      q: "Which freelance services does he offer?",
      k: ["services", "offer", "landing", "website+for"],
      a: "Landing pages and company websites, web and mobile apps with Flutter, and performance and SEO optimization. Fast, accessible, well-positioned sites.",
    },
  },
  {
    id: "quote",
    sources: ["availability"],
    es: {
      q: "¿Cómo pido un presupuesto?",
      k: ["presupuesto", "cotizacion", "cotizar", "precio", "cuanto+cuesta+una+web"],
      a: "Desde Contacto (botón Pedir presupuesto) o por email. El sitio no publica tarifas: dependen del proyecto.",
    },
    en: {
      q: "How do I ask for a quote?",
      k: ["quote", "estimate", "pricing", "price", "how+much+for+a+website"],
      a: "From Contact (Request a quote button) or by email. The site does not publish rates: they depend on the project.",
    },
  },
  {
    id: "bilingual",
    sources: ["about"],
    es: {
      q: "¿El sitio está en inglés?",
      k: ["en+ingles", "version+en+ingles", "traducido", "cambiar+de+idioma"],
      a: "Sí: el sitio está completo en español e inglés, y también los casos de estudio. El idioma se cambia desde el encabezado. Franco tiene inglés intermedio (B1 certificado).",
    },
    en: {
      q: "Is the site available in English?",
      k: ["in+english", "english+version", "translated", "change+language"],
      a: "Yes: the whole site is in Spanish and English, including the case studies. The language is switched from the header. Franco has intermediate English (B1 certified).",
    },
  },
  {
    id: "interests",
    sources: ["about"],
    es: {
      q: "¿Cuáles son sus intereses profesionales?",
      k: ["intereses", "le+interesa", "que+le+gusta", "automatizacion", "industria+4"],
      a: "Frontend, IA aplicada y automatización, y el cruce entre software e industria (Industria 4.0): herramientas que ayuden a las empresas a aprovechar mejor sus datos.",
    },
    en: {
      q: "What are his professional interests?",
      k: ["interests", "interested+in", "what+does+he+like", "automation", "industry+4"],
      a: "Frontend, applied AI and automation, and the crossover between software and industry (Industry 4.0): tools that help companies make better use of their data.",
    },
  },
  {
    id: "whyhire",
    sources: ["about", "ai-dashboard"],
    es: {
      q: "¿Por qué contratarlo?",
      k: ["por+que+contratar", "por+que+elegir", "por+que+deberia", "valor+agregado", "fortalezas", "diferencia"],
      a: "Entrega proyectos de punta a punta (diseño, código, deploy) con IA integrada y bien resuelta: servidor, validación, caché, límites y plan B. Trabaja con herramientas agénticas entendiendo cada línea, y todo su trabajo se puede revisar.",
    },
    en: {
      q: "Why hire him?",
      k: ["why+hire", "why+choose", "why+should", "added+value", "strengths", "what+sets"],
      a: "He delivers projects end to end (design, code, deploy) with AI integrated and done properly: server, validation, caching, limits and a fallback. He works with agentic tools understanding every line, and all his work can be reviewed.",
    },
  },
];
