// Genera el CV en HTML y PDF (A4) para ES y EN a partir de cv-data.mjs.
// Uso: npm run cv  (requiere playwright-cli instalado globalmente)
//
// - Si quedan datos TODO: genera borradores en cv/out/ con los
//   pendientes resaltados, y NO toca public/cv/.
// - Si no queda ninguno: publica public/cv/cv-es.pdf y cv-en.pdf.
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cv } from "./cv-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "cv", "out");
const publicDir = join(root, "public", "cv");
mkdirSync(outDir, { recursive: true });

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

let pending = 0;
// Texto normal o dato pendiente resaltado
const v = (value) => {
  if (value && typeof value === "object" && "todo" in value) {
    pending++;
    return `<mark>[${esc(value.todo)}]</mark>`;
  }
  return esc(value);
};
const link = (l) => `<a href="${esc(l.href)}">${esc(l.text)}</a>`;

const section = (title, body) => `
  <section>
    <h2>${esc(title)}</h2>
    ${body}
  </section>`;

const entry = ({ title, sub, meta, extra = "", bullets = [] }) => `
  <div class="entry">
    <div class="entry-head">
      <h3>${title}${sub ? ` <span class="sub">— ${sub}</span>` : ""}</h3>
      ${meta ? `<span class="meta">${meta}</span>` : ""}
    </div>
    ${extra}
    ${bullets.length ? `<ul>${bullets.map((b) => `<li>${v(b)}</li>`).join("")}</ul>` : ""}
  </div>`;

function render(d) {
  const c = d.contact;
  const contactLine = [
    esc(d.location),
    v(d.phone),
    `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`,
    link(c.linkedin),
    link(c.github),
    link(c.site),
  ]
    // Cada dato es una pieza que no se corta; el separador va pegado al
    // dato anterior, así un salto de línea nunca empieza con "·"
    .map((item, i, all) =>
      `<span class="nowrap">${item}${i < all.length - 1 ? ' <span class="sep">·</span>' : ""}</span>`,
    )
    .join(" ");

  const projects = d.projects
    .map((p) =>
      entry({
        title: esc(p.name),
        meta: esc(p.meta),
        extra: [
          p.links ? `<p class="links">${p.links.map(link).join(" · ")}</p>` : "",
          p.stack ? `<p class="stack">${esc(p.stack)}</p>` : "",
        ].join(""),
        bullets: p.bullets,
      }),
    )
    .join("");

  const experience = d.experience
    .map((e) => entry({ title: v(e.role), sub: v(e.org), meta: v(e.meta), bullets: e.bullets }))
    .join("");

  const education = d.education
    .map((e) => entry({ title: esc(e.title), sub: v(e.org), meta: v(e.meta) }))
    .join("");

  const rows = (items) =>
    `<dl>${items.map((i) => `<dt>${esc(i.label)}</dt><dd>${v(i.value)}</dd>`).join("")}</dl>`;

  const courses = d.courses.length
    ? section(d.sections.courses, `<ul>${d.courses.map((x) => `<li>${v(x)}</li>`).join("")}</ul>`)
    : "";

  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8">
<title>${esc(d.name)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "Space Grotesk", system-ui, sans-serif; font-size: 9.2pt; line-height: 1.42; color: #16191d; }
  a { color: inherit; text-decoration: none; }
  mark { background: #fde68a; color: #16191d; padding: 0 2px; }
  header { padding-bottom: 9pt; border-bottom: 1.5pt solid #16191d; }
  .ref { font-family: "JetBrains Mono", monospace; font-size: 7.5pt; letter-spacing: 0.08em; text-transform: uppercase; color: #c2410c; margin: 0 0 4pt; }
  h1 { margin: 0; font-size: 24pt; line-height: 1; letter-spacing: -0.03em; font-weight: 600; }
  .role { margin: 4pt 0 0; font-size: 11.5pt; font-weight: 500; }
  .contact { margin: 7pt 0 0; font-size: 8.6pt; color: #4f5661; }
  .contact a { color: #16191d; }
  .nowrap { white-space: nowrap; }
  .sep { margin: 0 2pt; color: #c2410c; }
  section { margin-top: 9pt; }
  h2 { margin: 0 0 5pt; padding-bottom: 3pt; border-bottom: 0.75pt solid #d6d0c4; font-family: "JetBrains Mono", monospace; font-size: 8pt; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c2410c; }
  p { margin: 0; }
  .entry { margin-top: 5pt; break-inside: avoid; }
  .entry:first-of-type { margin-top: 0; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
  h3 { margin: 0; font-size: 10pt; font-weight: 600; }
  .sub { font-weight: 400; color: #4f5661; }
  .meta { flex-shrink: 0; font-family: "JetBrains Mono", monospace; font-size: 7.8pt; color: #4f5661; }
  .links, .stack { font-size: 8.4pt; color: #4f5661; margin-top: 1pt; }
  .links a { color: #c2410c; }
  .stack { font-family: "JetBrains Mono", monospace; font-size: 7.8pt; }
  ul { margin: 3pt 0 0; padding-left: 12pt; }
  li { margin-top: 1pt; }
  li::marker { color: #c2410c; }
  dl { display: grid; grid-template-columns: 34mm 1fr; gap: 3pt 10pt; margin: 0; }
  dt { font-weight: 600; }
  dd { margin: 0; }
</style>
</head>
<body>
  <header>
    <p class="ref">CV — ${esc(d.role.split(" · ")[0])}</p>
    <h1>${esc(d.name)}</h1>
    <p class="role">${esc(d.role)}</p>
    <p class="contact">${contactLine}</p>
  </header>
  ${section(d.sections.profile, `<p>${esc(d.profile)}</p>`)}
  ${section(d.sections.projects, projects)}
  ${section(d.sections.experience, experience)}
  ${section(d.sections.education, education)}
  ${section(d.sections.skills, rows(d.skills))}
  ${section(d.sections.languages, rows(d.languages))}
  ${courses}
</body>
</html>`;
}

// Imprime el HTML a PDF con el navegador de playwright-cli
function toPdf(htmlPath, pdfPath) {
  const script = join(outDir, "_print.js");
  writeFileSync(
    script,
    `async page => {
  await page.goto(${JSON.stringify(pathToFileURL(htmlPath).href)});
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: ${JSON.stringify(pdfPath)}, preferCSSPageSize: true, printBackground: true });
}`,
  );
  const run = (cmd) => execSync(`playwright-cli -s=cv ${cmd}`, { cwd: outDir, stdio: "pipe" }).toString();
  run("open");
  try {
    const out = run(`run-code --filename="${script}"`);
    if (/### Error/.test(out)) throw new Error(out);
  } finally {
    run("close");
  }
  // Conteo aproximado de páginas: el CV tiene que entrar en una
  const pages = (readFileSync(pdfPath, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return pages;
}

const results = [];
for (const d of Object.values(cv)) {
  const before = pending;
  const html = render(d);
  const draft = pending > before;
  const name = `cv-${d.lang}`;
  const htmlPath = join(outDir, `${name}.html`);
  writeFileSync(htmlPath, html);
  const pdfPath = draft ? join(outDir, `${name}-borrador.pdf`) : join(publicDir, `${name}.pdf`);
  mkdirSync(dirname(pdfPath), { recursive: true });
  const pages = toPdf(htmlPath, pdfPath);
  results.push({ lang: d.lang, pending: pending - before, pages, pdf: pdfPath });
}

for (const r of results) {
  const status = r.pending ? `BORRADOR (${r.pending} datos pendientes)` : "publicado";
  const warn = r.pages > 1 ? `  ⚠ ${r.pages} páginas: recortar contenido` : "";
  console.log(`${r.lang.toUpperCase()}: ${status} → ${r.pdf}${warn}`);
}
