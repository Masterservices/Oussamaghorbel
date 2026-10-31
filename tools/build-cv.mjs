#!/usr/bin/env node
/*
 * Génère les pages CV et leurs PDF à partir de assets/js/content.js.
 *
 *   node tools/build-cv.mjs          pages HTML : cv/index.html, cv/<slug>/index.html,
 *                                    redirections, sitemap.xml, robots.txt
 *   node tools/build-cv.mjs --pdf    + les PDF A4 dans les 4 langues (Playwright + Chromium)
 *
 * À relancer (avec --pdf) après chaque modification du contenu du CV.
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import vm from "node:vm";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://oussamaghorbel.vercel.app";
const LANGS = ["fr", "en", "ar", "ru"];

// Charge les données comme le ferait le navigateur.
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ["assets/js/i18n.js", "assets/js/content.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
}
const C = sandbox.window.SITE_CONTENT;
const template = fs.readFileSync(path.join(ROOT, "tools/cv-template.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const write = (rel, content) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log("  " + rel);
};

// Une entrée par page : le CV général (indexé) puis un CV par poste (non indexés, envoyés par lien).
const pages = [{ slug: "", dir: "cv", T: null }].concat(
  Object.entries(C.CV_TARGETS).map(([slug, T]) => ({ slug, dir: "cv/" + slug, T }))
);

function pageVars({ slug, dir, T }) {
  const depth = dir.split("/").length;
  const url = `${SITE}/${dir}/`;
  const title = T ? `CV ${T.short.fr} — Oussama Ghorbel` : "CV — Oussama Ghorbel · Consultant, chef de projet, business developer";
  const desc = T
    ? `CV d'Oussama Ghorbel — ${T.title.fr}. Interactif, en français, anglais, arabe et russe, à télécharger en PDF.`
    : "CV interactif d'Oussama Ghorbel : ingénieur textile et en mathématiques, consultant, chef de projet et business developer. À télécharger en PDF en français, anglais, arabe et russe.";
  const hreflang = LANGS.map((l) => `  <link rel="alternate" hreflang="${l}" href="${url}?lang=${l}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${url}">`).join("\n");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: C.PROFILE.name,
    jobTitle: T ? T.short.en : C.PROFILE.title.en.replace(/ · /g, ", "),
    url: SITE + "/",
    email: "mailto:" + C.PROFILE.email,
    image: SITE + "/assets/img/og-image.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Tula", addressCountry: "RU" },
    knowsLanguage: ["ar", "fr", "en", "ru"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "École Nationale d'Ingénieurs de Monastir" },
      { "@type": "CollegeOrUniversity", name: "École Polytechnique de Tunisie" }
    ]
  };
  return {
    ROOT: "../".repeat(depth),
    SLUG: slug,
    PDF: "Oussama-Ghorbel-CV" + (T ? "-" + T.file : ""),
    PHOTO: T ? T.photo : "assets/img/role-leader.webp",
    TITLE: esc(title),
    DESC: esc(desc),
    URL: url,
    SITE,
    ROBOTS: T ? "noindex, follow" : "index, follow",
    HREFLANG: hreflang,
    JSONLD: JSON.stringify(person).replace(/</g, "\\u003c")
  };
}

function redirect(to, canonical) {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>CV — Oussama Ghorbel</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${canonical}">
  <meta http-equiv="refresh" content="0; url=${to}">
  <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
</head>
<body><p><a href="${to}">CV — Oussama Ghorbel</a></p></body>
</html>
`;
}

function buildPages() {
  console.log("Pages :");
  for (const p of pages) {
    const v = pageVars(p);
    const html = template.replace(/\{\{([A-Z]+)\}\}/g, (m, k) => {
      if (!(k in v)) throw new Error("Variable inconnue dans le modèle : " + k);
      return v[k];
    });
    write(p.dir + "/index.html", html);
  }

  // Redirections : ancienne adresse du CV et orthographe « developper ».
  write("cv.html", redirect("cv/", `${SITE}/cv/`));
  write("cv/business-developper/index.html", redirect("../business-developer/", `${SITE}/cv/business-developer/`));

  // Plan du site : seules les pages publiques (le CV général, pas les CV ciblés).
  const alt = (u) => LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}?lang=${l}"/>`).join("\n");
  const urls = [SITE + "/", SITE + "/cv/"];
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${C.updated}</lastmod>\n${alt(u)}\n  </url>`).join("\n")}
</urlset>
`);
  write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
}

// Petit serveur statique pour que Chromium charge les pages comme en ligne.
function serve() {
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".pdf": "application/pdf" };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(ROOT, p);
    if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function buildPdfs() {
  const require = createRequire(import.meta.url);
  let playwright;
  try { playwright = require("playwright"); } catch {
    playwright = require(path.join(execSync("npm root -g").toString().trim(), "playwright"));
  }
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  // Les polices viennent de Google Fonts : on passe par le proxy s'il y en a un
  // (option native de Chromium, qui laisse passer 127.0.0.1 en direct).
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const browser = await playwright.chromium.launch({ args: proxy ? ["--proxy-server=" + proxy] : [] });
  console.log("PDF :");
  try {
    for (const p of pages) {
      const prefix = pageVars(p).PDF;
      for (const lang of LANGS) {
        const page = await browser.newPage();
        await page.goto(`${base}/${p.dir}/?lang=${lang}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
        await page.emulateMedia({ media: "print" });
        const rel = `${p.dir}/${prefix}-${lang.toUpperCase()}.pdf`;
        const file = path.join(ROOT, rel);
        await page.pdf({ path: file, format: "A4", printBackground: true, preferCSSPageSize: true });
        const count = (fs.readFileSync(file, "latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
        console.log(`  ${rel}  ${count} p.  ${Math.round(fs.statSync(file).size / 1024)} Ko${count > 2 ? "   ⚠ plus de 2 pages" : ""}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

buildPages();
if (process.argv.includes("--pdf")) await buildPdfs();
