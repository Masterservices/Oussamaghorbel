/*
 * Dictionnaire de compétences — construit assets/js/skills-dict.js à partir de tools/skills/*.txt
 * (format décrit dans tools/skills/README.md) et des exigences déjà présentes dans
 * CV_GENERATOR.requirements (content.js), fusionnées par libellé.
 *
 *   node tools/build-skills.mjs          écrit le fichier et affiche les avertissements
 *   node tools/build-skills.mjs --check  vérifie seulement (code de sortie 1 en cas d'erreur)
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "tools/skills");
const OUT = path.join(ROOT, "assets/js/skills-dict.js");

// Même normalisation que le générateur (cv-generator.js, norm()).
const norm = (s) => String(s || "").toLowerCase().normalize("NFD")
  .replace(/[̀-ًͯ-ٰٟ]/g, "").replace(/ё/g, "е").trim();
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Mots trop généraux : ils déclencheraient la compétence dans presque toutes les annonces.
const STOP = new Set(["notion", "teams", "sage", "audit", "atelier", "rapports", "distribution", "accompagnement",
  "dynamics", "pilotage", "go", "safe", "salon", "influence", "acquisition", "indicateurs", "presentations", "spin",
  "reseaux", "network", "tableau", "r", "optimisation", "notion", "inspection", "placement", "coupe", "collection", "jean",
  "facon", "a3", "pic", "mes", "automate", "sam", "flux", "sas", "evaluation", "impression", "layout", "logo",
  "assurance", "credit", "bilan", "valorisation", "veille", "orientation", "reception", "accueil", "soins",
  "transport", "contrats", "contracts", "marques", "visa", "speaker", "creative", "organise", "rigueur", "synthesis",
  "mobilite", "deplacements", "print", "maintenance", "proto", "configuration", "parametrage", "these", "metre",
  "metres", "devis", "fluides", "evenementiel", "reservation", "booking", "cuisine", "restauration", "commis",
  "serveur", "banque", "banking", "tax", "integration", "interviews", "entretiens", "achats", "forecast",
  "previsions", "modelisation", "simulation", "modelling", "modeling", "processus", "ratios", "lambda",
  "flexibility", "flexibilite", "creativite", "creativity", "autonomie", "autonome", "leadership", "trading",
  "embarque", "solaire", "solar", "chantier", "chantiers", "architecte", "immobilier", "tourisme", "pharma",
  "pharmacie", "admissions", "sketch", "maquette", "photographie", "proactive", "proactif", "transverse",
  "coordination", "coordinat", "planning", "budget", "budgetaire", "inventaire", "export", "international",
  "comptable", "prototype", "matieres", "tissu", "tissus", "fabric", "fabrics", "retail", "closing", "growth",
  "persona", "funnel", "scoring", "sprint", "benchmark", "workshop", "facilitation", "dashboard", "reporting"]);
// Mots généraux gardés seulement comme libellé exact d'une compétence où ils ont un sens précis.
const KEEP_AS_LABEL = new Set(["leadership", "autonomie", "budget", "planning", "reporting", "benchmark", "retail",
  "closing", "coordination", "maintenance", "transport", "cuisine", "restauration", "tourisme", "immobilier",
  "export", "international", "pharmacie", "photographie", "creativite", "sketch", "tableau"]);
const LANG = { anglais: "EN", francais: "FR", arabe: "AR", russe: "RU", allemand: "DE", espagnol: "ES", italien: "IT", turc: "TR", chinois: "ZH" };
const LEVELS = { c: "courant", f: "frequent", s: "specialise" };
const CATS = { o: "outil", m: "methode", n: "norme", t: "metier", x: "transverse", l: "langue" };

const errors = [], warnings = [];
const skills = [], byId = {}, byLabel = {}, aliases = {};

function simple(label) { return /^[\p{L}\p{N} .+#/'&-]+$/u.test(label); }
function cleanPatterns(list, labels, where) {
  const out = [];
  const add = (p, fromLabel) => {
    const n = norm(p);
    if (!n || out.includes(n)) return;
    const ascii = /^[\x20-\x7e]+$/.test(n);
    if (STOP.has(n) && !(fromLabel && KEEP_AS_LABEL.has(n))) return;
    if (ascii && n.length < 2) return;
    if (!ascii && n.length < 4 && !/[a-z0-9]/.test(n)) { warnings.push(`${where} : motif « ${p} » trop court (non latin), retiré`); return; }
    out.push(n);
  };
  labels.forEach((l) => { if (l && simple(l)) add(l, true); });
  list.forEach((p) => add(p, false));
  return out;
}

// ---------- Lecture des sources ----------
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".txt")).sort()) {
  let topics = [], group = null, n = 0;
  fs.readFileSync(path.join(SRC, file), "utf8").split("\n").forEach((line, i) => {
    const where = `${file}:${i + 1}`;
    line = line.trim();
    if (!line) return;
    if (line.startsWith("# topics:")) { topics = line.slice(9).split(",").map((t) => t.trim()).filter(Boolean); return; }
    if (line.startsWith("## ")) { group = file + "/" + line.slice(3).trim(); return; }
    if (line.startsWith("#")) return;
    const f = line.split("|").map((x) => x.trim());
    if (f.length < 7) { errors.push(`${where} : ${f.length} champs au lieu de 7`); return; }
    const [fr, en, ar, ru, pats, lvl, cat, more] = f;
    const label = [fr, en === "=" ? fr : en, ar === "=" ? fr : ar, ru === "=" ? fr : ru];
    if (!LEVELS[lvl]) errors.push(`${where} : niveau « ${lvl} » inconnu`);
    if (!CATS[cat]) errors.push(`${where} : catégorie « ${cat} » inconnue`);
    const id = slug(fr);
    if (byId[id]) { errors.push(`${where} : « ${fr} » existe déjà (${byId[id].src})`); return; }
    const t = topics.concat(more ? more.split(",").map((x) => x.trim()).filter(Boolean) : []);
    const s = {
      id, l: label, p: cleanPatterns(pats.split(";"), label, where), c: cat, t: [...new Set(t)], v: lvl,
      g: group, src: where, lang: cat === "l" ? LANG[norm(fr)] : undefined
    };
    if (!s.p.length) errors.push(`${where} : aucun motif utilisable pour « ${fr} »`);
    skills.push(s); byId[id] = s; byLabel[norm(fr)] = s; n++;
  });
  if (!n) warnings.push(`${file} : aucune compétence`);
}

// ---------- Fusion avec CV_GENERATOR.requirements ----------
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/content.js"), "utf8"), sandbox);
const G = sandbox.window.SITE_CONTENT.CV_GENERATOR;
const topicIds = Object.keys(G.topics);
const labelTopics = {};
["expected", "more"].forEach((k) => Object.entries(G[k] || {}).forEach(([t, list]) => list.forEach((l) => {
  (labelTopics[l] = labelTopics[l] || []).includes(t) || labelTopics[l].push(t);
})));
G.requirements.forEach(([label, pats, lang]) => {
  // Libellé inconnu mais motif déjà porté par une fiche : on la complète et on garde l'ancien libellé comme alias.
  const s = byLabel[norm(label)] || skills.find((x) => x.p.includes(norm(label)));
  if (s && !byLabel[norm(label)]) { aliases[label] = s.id; byLabel[norm(label)] = s; }
  if (s) {
    pats.map(norm).forEach((p) => { if (!s.p.includes(p) && !STOP.has(p)) s.p.push(p); });
    if (lang) s.lang = lang;
    return;
  }
  const id = slug(label);
  const n = { id, l: [label, label, label, label], p: cleanPatterns(pats, [label], "content.js"), c: lang ? "l" : "o",
    t: labelTopics[label] || [], v: "f", g: "content.js", src: "content.js", lang };
  skills.push(n); byId[id] = n; byLabel[norm(label)] = n;
  warnings.push(`content.js : « ${label} » absente des sources, reprise telle quelle (libellé non traduit)`);
});

// ---------- Contrôles ----------
skills.forEach((s) => s.t.forEach((t) => { if (!topicIds.includes(t)) errors.push(`${s.src} : thème « ${t} » absent de CV_GENERATOR.topics`); }));
["expected", "more"].forEach((k) => Object.entries(G[k] || {}).forEach(([t, list]) => list.forEach((l) => {
  if (!byLabel[norm(l)]) errors.push(`CV_GENERATOR.${k}.${t} : « ${l} » introuvable dans le dictionnaire`);
})));
const owner = {};
skills.forEach((s) => s.p.forEach((p) => { (owner[p] = owner[p] || []).push(s.id); }));
Object.entries(owner).filter(([, ids]) => ids.length > 1).forEach(([p, ids]) => warnings.push(`motif « ${p} » partagé : ${ids.join(", ")}`));

// Compétences liées : voisines dans le même groupe (3 avant, 3 après).
const groups = {};
skills.forEach((s) => { (groups[s.g] = groups[s.g] || []).push(s); });
skills.forEach((s) => {
  const g = groups[s.g], i = g.indexOf(s);
  s.r = g.slice(Math.max(0, i - 3), i).concat(g.slice(i + 1, i + 4)).map((x) => x.id);
});

warnings.forEach((w) => console.log("  ! " + w));
errors.forEach((e) => console.log("  ✕ " + e));
const count = (k, v) => skills.filter((s) => s[k] === v).length;
console.log(`${skills.length} compétences · ${skills.reduce((n, s) => n + s.p.length, 0)} motifs · courantes ${count("v", "c")}, fréquentes ${count("v", "f")}, spécialisées ${count("v", "s")}`);
const perTopic = {};
skills.forEach((s) => s.t.forEach((t) => { perTopic[t] = (perTopic[t] || 0) + 1; }));
console.log("Par thème : " + Object.entries(perTopic).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(", "));
if (errors.length) process.exit(1);
if (process.argv.includes("--check")) process.exit(0);

// ---------- Écriture ----------
const rows = skills.map((s) => {
  const o = { id: s.id, l: s.l, p: s.p, c: s.c, t: s.t, v: s.v, r: s.r };
  if (s.lang) o.g = s.lang;
  return "    " + JSON.stringify(o);
});
fs.writeFileSync(OUT, `/*
 * Dictionnaire de compétences du générateur de CV — FICHIER GÉNÉRÉ, ne pas modifier à la main.
 * Sources : tools/skills/*.txt ; reconstruire avec : node tools/build-skills.mjs
 * id ; l : libellés [fr, en, ar, ru] ; p : motifs (minuscules, sans accents) ; c : catégorie
 * (o outil, m méthode, n norme, t métier, x transverse, l langue) ; t : thèmes ;
 * v : niveau (c courant, f fréquent, s spécialisé) ; r : compétences liées ; g : code de langue.
 */
window.SKILLS_DICT = {
  count: ${skills.length},
  // Anciens libellés de CV_GENERATOR (expected, more, requirements) → id de la fiche
  aliases: ${JSON.stringify(aliases)},
  skills: [
${rows.join(",\n")}
  ]
};
`);
console.log("Écrit : " + path.relative(ROOT, OUT) + " (" + Math.round(fs.statSync(OUT).size / 1024) + " Ko)");
