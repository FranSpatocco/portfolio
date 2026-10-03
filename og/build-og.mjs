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
    modeLabel: "Modalidad",
    mode: "Trabajo remoto",
    stackLabel: "Stack",
  },
  en: {
    tagline: "Fast, accessible and maintainable interfaces, from design to deploy.",
    modeLabel: "Work mode",
    mode: "Remote work",
    stackLabel: "Stack",
  },
};

const stack = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Flutter"];

// Paleta oscura del sitio (sistema "Bento"): destaca más en el feed de LinkedIn
const c = {
  bg: "#0D0D0E",
  surface: "#19191C",
  surfaceTo: "#141416",
  inset: "#111113",
  raised: "#202024",
  fg: "#F2F2F3",
  muted: "#A6A6AD",
  subtle: "#8B8B93",
  border: "#242427",
  borderStrong: "#2E2E33",
  accent: "#7B8CFF",
  accentFg: "#0D0D0E",
};

const arrow = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;

const render = (lang, t) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    display: grid; grid-template-columns: 1fr 380px; gap: 20px; padding: 40px;
    background: ${c.bg}; font-family: "Geist", sans-serif; color: ${c.fg};
  }
  .card { border: 1px solid ${c.border}; border-radius: 32px; background: linear-gradient(180deg, ${c.surface}, ${c.surfaceTo}); }
  .label { font-size: 15px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${c.subtle}; }
  .hero { display: flex; flex-direction: column; justify-content: space-between; padding: 44px; }
  .mono { display: grid; place-items: center; width: 124px; height: 124px; border-radius: 26px; background: ${c.accent}; color: ${c.accentFg}; font-size: 58px; font-weight: 700; letter-spacing: -0.06em; }
  h1 { margin-top: 14px; font-size: 80px; font-weight: 600; line-height: 1; letter-spacing: -0.04em; }
  .tagline { margin-top: 18px; max-width: 560px; font-size: 22px; line-height: 1.5; color: ${c.muted}; }
  .side { display: flex; flex-direction: column; gap: 20px; }
  .side .card { padding: 28px; }
  .big { margin-top: 12px; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .chip { padding: 8px 14px; border-radius: 99px; border: 1px solid ${c.borderStrong}; background: ${c.raised}; font-size: 16px; font-weight: 500; }
  .url { flex: 1; display: flex; align-items: center; justify-content: space-between; }
  .url strong { font-size: 18px; font-weight: 600; white-space: nowrap; }
  .circle { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 99px; background: ${c.accent}; color: ${c.accentFg}; }
</style>
</head>
<body>
  <div class="card hero">
    <div class="mono">FS</div>
    <div>
      <p class="label">Frontend Developer · React · TypeScript</p>
      <h1>Franco Spatocco.</h1>
      <p class="tagline">${t.tagline}</p>
    </div>
  </div>
  <div class="side">
    <div class="card">
      <p class="label">${t.modeLabel}</p>
      <p class="big">${t.mode}</p>
    </div>
    <div class="card">
      <p class="label">${t.stackLabel}</p>
      <div class="chips">${stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
    </div>
    <div class="card url">
      <strong>franco-spatocco.vercel.app</strong>
      <span class="circle">${arrow}</span>
    </div>
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
