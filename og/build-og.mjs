// Genera las imágenes Open Graph (1200×630) que muestran LinkedIn,
// WhatsApp, etc. al compartir el sitio: public/og/og-es.png y og-en.png.
// Uso: npm run og  (requiere playwright-cli instalado globalmente)
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "og", "out");
const publicDir = join(root, "public", "og");
mkdirSync(outDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

const texts = {
  es: {
    tagline: "Interfaces rápidas, accesibles y fáciles de mantener, del diseño al deploy.",
    caption: "Fig. 01 — Del diseño al deploy",
    boxes: ["DISEÑO", "CÓDIGO", "DEPLOY"],
    subs: ["UI · SISTEMA", "REACT · TS", "VERCEL"],
    location: "Mar del Plata, AR",
  },
  en: {
    tagline: "Fast, accessible and maintainable interfaces, from design to deploy.",
    caption: "Fig. 01 — From design to deploy",
    boxes: ["DESIGN", "CODE", "DEPLOY"],
    subs: ["UI · SYSTEM", "REACT · TS", "VERCEL"],
    location: "Mar del Plata, AR",
  },
};

// Paleta oscura del sitio: destaca más en el feed de LinkedIn
const c = {
  bg: "#0E1116",
  surface: "#11151B",
  fg: "#E6E8EB",
  muted: "#A3ABB8",
  subtle: "#7A8290",
  border: "#2A323D",
  line: "#1F2630",
  grid: "#151A21",
  accent: "#FF6B1A",
};

const diagram = (t) => {
  const box = (x, i) => `
    <rect x="${x}" y="30" width="112" height="56" fill="${c.surface}" stroke="${i === 1 ? c.accent : c.border}"/>
    <text x="${x + 56}" y="56" fill="${c.fg}">${t.boxes[i]}</text>
    <text x="${x + 56}" y="73" font-size="9" fill="${c.subtle}">${t.subs[i]}</text>`;
  return `
  <svg viewBox="0 0 420 300" width="400" aria-hidden="true">
    <g font-family="JetBrains Mono, monospace" font-size="12" text-anchor="middle">
      ${box(10, 0)}${box(154, 1)}${box(298, 2)}
    </g>
    <g stroke="${c.accent}" stroke-width="1.5" fill="none">
      <path d="M122 58 H148 M143 53 L149 58 L143 63"/>
      <path d="M266 58 H292 M287 53 L293 58 L287 63"/>
      <path d="M210 86 V146" stroke-dasharray="4 4"/>
      <circle cx="210" cy="204" r="50" stroke-width="10" stroke-dasharray="9.8 9.8"/>
      <circle cx="210" cy="204" r="40"/>
      <circle cx="210" cy="204" r="14"/>
      <path d="M210 190 V218 M196 204 H224" stroke-width="1"/>
    </g>
  </svg>`;
};

const tick = (pos) =>
  `<span class="tick" style="${pos}"></span>`;

const render = (lang, t) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    background-color: ${c.bg};
    background-image: linear-gradient(${c.grid} 1px, transparent 1px), linear-gradient(90deg, ${c.grid} 1px, transparent 1px);
    background-size: 48px 48px;
    font-family: "Space Grotesk", sans-serif;
    color: ${c.fg};
  }
  .frame { position: absolute; inset: 40px; border: 1px solid ${c.border}; }
  .tick { position: absolute; width: 18px; height: 18px; border-color: ${c.accent}; border-style: solid; border-width: 0; }
  .mono { font-family: "JetBrains Mono", monospace; letter-spacing: 0.08em; text-transform: uppercase; }
  .content { position: absolute; inset: 40px; display: grid; grid-template-columns: 1fr 420px; align-items: center; padding: 0 64px; gap: 24px; }
  .ref { font-size: 17px; color: ${c.accent}; }
  h1 { margin-top: 22px; font-size: 104px; font-weight: 600; line-height: 0.9; letter-spacing: -0.04em; }
  .role { margin-top: 26px; font-size: 27px; font-weight: 500; letter-spacing: -0.01em; white-space: nowrap; }
  .tagline { margin-top: 16px; max-width: 520px; font-size: 20px; line-height: 1.5; color: ${c.muted}; }
  .figure { display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .caption { font-size: 13px; color: ${c.subtle}; }
  .footer { position: absolute; left: 40px; right: 40px; bottom: 40px; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; border-top: 1px solid ${c.border}; font-size: 15px; color: ${c.muted}; }
  .footer strong { color: ${c.fg}; font-weight: 500; }
  .dot { display: inline-block; width: 9px; height: 9px; margin-right: 10px; background: ${c.accent}; }
</style>
</head>
<body>
  <div class="frame">
    ${tick("top:-1px;left:-1px;border-top-width:2px;border-left-width:2px")}
    ${tick("top:-1px;right:-1px;border-top-width:2px;border-right-width:2px")}
    ${tick("bottom:-1px;left:-1px;border-bottom-width:2px;border-left-width:2px")}
    ${tick("bottom:-1px;right:-1px;border-bottom-width:2px;border-right-width:2px")}
  </div>
  <div class="content" style="bottom: 96px;">
    <div>
      <p class="mono ref">REF-00 — Frontend Developer</p>
      <h1>Franco<br>Spatocco</h1>
      <p class="role">Frontend Developer · React · TypeScript</p>
      <p class="tagline">${t.tagline}</p>
    </div>
    <div class="figure">
      ${diagram(t)}
      <p class="mono caption">${t.caption}</p>
    </div>
  </div>
  <div class="footer mono">
    <span><span class="dot"></span><strong>franco-spatocco.vercel.app</strong></span>
    <span>${t.location}</span>
  </div>
</body>
</html>`;

function screenshot(htmlPath, pngPath) {
  const script = join(outDir, "_shot.js");
  writeFileSync(
    script,
    `async page => {
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(${JSON.stringify(pathToFileURL(htmlPath).href)});
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: ${JSON.stringify(pngPath)}, type: "png" });
}`,
  );
  const run = (cmd) => execSync(`playwright-cli -s=og ${cmd}`, { cwd: outDir, stdio: "pipe" }).toString();
  run("open");
  try {
    const out = run(`run-code --filename="${script}"`);
    if (/### Error/.test(out)) throw new Error(out);
  } finally {
    run("close");
  }
}

for (const [lang, t] of Object.entries(texts)) {
  const htmlPath = join(outDir, `og-${lang}.html`);
  const pngPath = join(publicDir, `og-${lang}.png`);
  writeFileSync(htmlPath, render(lang, t));
  screenshot(htmlPath, pngPath);
  console.log(`${lang.toUpperCase()}: ${pngPath}`);
}
