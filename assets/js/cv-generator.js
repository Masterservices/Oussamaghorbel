/*
 * Générateur de CV — cv/generateur/
 * Lit l'intitulé du poste et, si besoin, le texte de l'annonce ; repère les thèmes
 * (CV_GENERATOR.topics) puis choisit dans content.js les expériences, projets, compétences,
 * ambitions et atouts dont les étiquettes correspondent. Aucun texte n'est inventé :
 * le CV produit est la page /cv/ avec un paramètre ?g=… qui liste ces éléments.
 */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  var G = C.CV_GENERATOR;
  var TOPICS = Object.keys(G.topics);
  var ALL_PROJECTS = C.CASES.concat(C.PROJECTS);
  var POOL = [];
  C.PROFILE.highlights.forEach(function (h, i) { POOL.push({ ref: "profile." + i, h: h }); });
  Object.keys(C.CV_TARGETS).forEach(function (k) {
    C.CV_TARGETS[k].highlights.forEach(function (h, i) { POOL.push({ ref: k + "." + i, h: h }); });
  });

  var state = { lang: "fr", toggles: {}, manual: null, scores: {}, extra: [] };
  function $(id) { return document.getElementById(id); }
  function fr(v) { return typeof v === "string" ? v : (v && (v.fr || v.en)) || ""; }

  /* ---------- Repérage des thèmes ---------- */
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD")
      .replace(/[̀-ًͯ-ٰٟ]/g, "").replace(/ё/g, "е");
  }
  function count(text, word) {
    var w = norm(word);
    if (!w) return 0;
    if (w.length <= 3 && /^[a-z0-9+#.]+$/.test(w)) {
      var esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var m = text.match(new RegExp("(^|[^a-z0-9])" + esc + "(?=[^a-z0-9]|$)", "g"));
      return m ? m.length : 0;
    }
    var n = 0, i = 0;
    while ((i = text.indexOf(w, i)) !== -1) { n++; i += w.length; }
    return n;
  }
  function detect(post, ad) {
    var p = norm(post), a = norm(ad), scores = {};
    TOPICS.forEach(function (k) {
      var s = 0;
      G.topics[k].words.forEach(function (w) { s += 3 * Math.min(count(p, w), 2) + Math.min(count(a, w), 3); });
      scores[k] = s;
    });
    return scores;
  }
  function weights() {
    var w = {};
    TOPICS.forEach(function (k) {
      var on = state.toggles[k] != null ? state.toggles[k] : state.scores[k] > 0;
      w[k] = on ? Math.max(state.scores[k], 2) : 0;
    });
    return w;
  }
  function score(id, w) {
    return (G.tags[id] || []).reduce(function (s, t) { return s + (w[t] || 0); }, 0);
  }
  function ranked(list, key, w) {
    return list.map(function (x, i) { return { x: x, i: i, s: score(key(x), w) }; })
      .sort(function (a, b) { return b.s - a.s || a.i - b.i; });
  }

  /* ---------- Composition automatique ---------- */
  function autoBase(w) {
    var base = "", best = 0;
    Object.keys(G.bases).forEach(function (b) {
      var s = G.bases[b].reduce(function (n, t) { return n + (w[t] || 0); }, 0);
      if (s > best) { best = s; base = b; }
    });
    return base;
  }
  function refs(base) {
    var list = base ? C.CV_TARGETS[base].highlights : C.PROFILE.highlights;
    return list.map(function (h, i) { return (base || "profile") + "." + i; });
  }
  // Le profil de départ départage : ses éléments reçoivent un bonus dégressif selon leur rang.
  function bonus(ids, top, strength) {
    var b = {};
    (ids || []).forEach(function (id, i) { b[id] = top * strength * (1 - i / (ids.length + 1)); });
    return b;
  }
  function boosted(list, key, w, extra) {
    return list.map(function (x, i) { return { x: x, i: i, s: score(key(x), w) + (extra[key(x)] || 0) }; })
      .sort(function (a, b) { return b.s - a.s || a.i - b.i; });
  }

  function compose(w, forced) {
    var any = TOPICS.some(function (k) { return w[k] > 0; });
    var base = forced != null ? forced : autoBase(w);
    var B = base ? C.CV_TARGETS[base] : null;
    if (!any) {
      if (!B) return null;
      return { b: base, k: B.key.slice(), p: B.projects.slice(), d: B.detail.slice(), s: B.skills.slice(), v: B.vision.slice(), h: refs(base) };
    }
    var top = Math.max.apply(null, TOPICS.map(function (k) { return w[k]; }));

    var xp = boosted(C.EXPERIENCE, function (x) { return x.id; }, w, bonus(B && B.key, top, .5));
    var best = xp[0].s, keep = xp.filter(function (r) { return r.s > 0 && r.s >= best * 0.4; });
    if (keep.length < 3) keep = xp.slice(0, 3);
    keep = keep.slice(0, 6).map(function (r) { return r.x.id; });
    var k = C.EXPERIENCE.map(function (x) { return x.id; }).filter(function (id) { return keep.indexOf(id) !== -1; });

    var pr = boosted(ALL_PROJECTS, function (x) { return x.id; }, w, bonus(B && B.projects, top, .5)).filter(function (r) { return r.s > 0; }).slice(0, 6);
    if (pr.length < 3) {
      ranked(C.CASES, function (x) { return x.id; }, w).forEach(function (r) {
        if (pr.length < 3 && pr.every(function (q) { return q.x !== r.x; })) pr.push(r);
      });
    }
    var p = pr.map(function (r) { return r.x.id; });
    var d = p.filter(function (id) { return C.CASES.some(function (c) { return c.id === id; }); }).slice(0, 2);

    var skb = {};
    if (B) B.skills.forEach(function (id, i) { skb["skill:" + id] = top * .6 * (1 - i / (B.skills.length + 1)); });
    var sk = boosted(C.SKILLS, function (g) { return "skill:" + g.id; }, w, skb);
    var s = sk.filter(function (r) { return r.s > 0; });
    if (s.length < 4) s = sk.slice(0, 4);
    s = s.slice(0, 6).map(function (r) { return r.x.id; });

    var vb = {};
    if (B) B.vision.forEach(function (id, i) { vb["vision:" + id] = top * .6 * (1 - i / (B.vision.length + 1)); });
    var v = boosted(C.VISION, function (x) { return "vision:" + x.id; }, w, vb).slice(0, 3).map(function (r) { return r.x.id; });

    var hb = bonus(refs(base), top, .8);
    var seen = {};
    var h = POOL.map(function (e, i) {
      return { e: e, i: i, s: (e.h.tags || []).reduce(function (n, t) { return n + (w[t] || 0); }, 0) + (hb[e.ref] || 0) };
    }).sort(function (a, b) { return b.s - a.s || a.i - b.i; }).filter(function (r) {
      var key = fr(r.e.h.title);
      if (r.s <= 0 || seen[key]) return false;
      seen[key] = true;
      return true;
    }).slice(0, 4).map(function (r) { return r.e.ref; });

    return { b: base, k: k, p: p, d: d, s: s, v: v, h: h };
  }

  /* ---------- Exigences de l'annonce et note d'adéquation ---------- */
  // Tout le texte du CV (4 langues), pour savoir si une compétence demandée y figure déjà.
  var PROFILE_TEXT = (function () {
    var parts = [];
    (function walk(v) {
      if (typeof v === "string") parts.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.keys(v).forEach(function (k) { if (k !== "CV_GENERATOR") walk(v[k]); });
    })(C);
    return norm(parts.join(" \n "));
  })();
  var LANG_SCORE = {};
  C.LANGUAGES.forEach(function (l) { LANG_SCORE[l.code] = l.score; });
  var SINCE = 2010; // premier poste (Christine Confection), hors stages

  function has(text, pattern) {
    var w = norm(pattern);
    if (/^[a-z0-9+#.\/' -]+$/.test(w)) {
      var esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp("(^|[^a-z0-9])" + esc + "(?=[^a-z0-9]|$)").test(text);
    }
    return text.indexOf(w) !== -1;
  }
  var REQ = {};
  G.requirements.forEach(function (r) { REQ[r[0]] = r; });
  // ok : déjà dans le CV ; part : langue en cours d'apprentissage ; no : absente du CV
  function statusOf(r) {
    if (r[2]) {
      var s = LANG_SCORE[r[2]] || 0;
      return s >= 4 ? "ok" : s > 0 ? "part" : "no";
    }
    return r[1].concat([r[0]]).some(function (p) { return has(PROFILE_TEXT, p); }) ? "ok" : "no";
  }
  function requirements(post, ad) {
    var text = norm(post + " \n " + ad);
    return G.requirements.filter(function (r) {
      return r[1].some(function (p) { return has(text, p); });
    }).map(function (r) { return { label: r[0], status: statusOf(r) }; });
  }
  // Compétences souvent attendues pour les thèmes repérés, que l'annonce ne cite pas
  function expectedFor(w, reqs) {
    var seen = {}, out = [];
    reqs.forEach(function (r) { seen[r.label] = true; });
    var top = Math.max.apply(null, TOPICS.map(function (k) { return w[k]; }));
    TOPICS.filter(function (k) { return w[k] > 0 && w[k] >= top * 0.5; }).sort(function (a, b) { return w[b] - w[a]; }).forEach(function (k) {
      (G.expected[k] || []).forEach(function (label) {
        if (!seen[label] && REQ[label] && out.length < 8) { seen[label] = true; out.push({ label: label, status: statusOf(REQ[label]) }); }
      });
    });
    return out;
  }
  function yearsAsked(ad) {
    var m, best = 0, re = /(\d{1,2})\s*\+?\s*(?:ans|an|years?|yrs|лет|года|год|سنوات|سنة)/g, t = norm(ad);
    while ((m = re.exec(t))) { var n = +m[1]; if (n > best && n <= 30) best = n; }
    return best;
  }

  function evaluate(reqs, exp, cfg, w) {
    var total = TOPICS.reduce(function (s, k) { return s + w[k]; }, 0);
    var tags = {};
    (cfg ? cfg.k : []).forEach(function (id) { (G.tags[id] || []).forEach(function (t) { tags[t] = true; }); });
    var aligned = total ? TOPICS.reduce(function (s, k) { return s + (tags[k] ? w[k] : 0); }, 0) / total : 0;
    var got = 0;
    reqs.forEach(function (r) {
      if (r.status === "ok" || state.extra.indexOf(r.label) !== -1) got += 1;
      else if (r.status === "part") got += 0.5;
    });
    // Les compétences souvent attendues (non citées par l'annonce) comptent pour moitié.
    var gotExp = 0;
    exp.forEach(function (r) {
      if (r.status === "ok" || state.extra.indexOf(r.label) !== -1) gotExp += 1;
      else if (r.status === "part") gotExp += 0.5;
    });
    var weight = reqs.length + exp.length * 0.5;
    var cover = weight ? (got + gotExp * 0.5) / weight : 0;
    var asked = yearsAsked($("ad").value), mine = new Date().getFullYear() - SINCE;
    var years = asked ? Math.min(1, mine / asked) : 1;
    var score = weight ? 0.6 * cover + 0.3 * aligned + 0.1 * years : 0.8 * aligned + 0.2 * years;
    score = Math.round(score * 100);
    // Sans le texte de l'annonce, la note reste prudente.
    var capped = !reqs.length && score > 70;
    if (capped) score = 70;
    return { score: score, got: got, n: reqs.length, gotExp: gotExp, nExp: exp.length, aligned: aligned, asked: asked, mine: mine, capped: capped };
  }

  function renderFit(cfg) {
    var post = $("post").value, ad = $("ad").value;
    var reqs = requirements(post, ad);
    var w = weights();
    var any = TOPICS.some(function (k) { return w[k] > 0; });
    $("fit").hidden = !(any || reqs.length);
    if ($("fit").hidden) return;

    var list = $("reqs");
    list.innerHTML = "";
    var exp = expectedFor(w, reqs);
    var expList = $("expected");
    expList.innerHTML = "";
    $("expTitle").hidden = expList.hidden = !exp.length;
    reqs.concat(exp).forEach(function (r, idx) {
      var target = idx < reqs.length ? list : expList;
      var mine = state.extra.indexOf(r.label) !== -1;
      var li = document.createElement("li");
      var mark = document.createElement("span");
      mark.className = r.status === "ok" || mine ? "ok" : r.status === "part" ? "part" : "no";
      mark.textContent = r.status === "ok" || mine ? "✓" : r.status === "part" ? "◐" : "✕";
      var name = document.createElement("span");
      name.textContent = r.label;
      var right = document.createElement("span");
      if (r.status === "ok") { right.className = "src"; right.textContent = "Dans ton CV"; }
      else if (r.status === "part") { right.className = "src"; right.textContent = "En cours d'apprentissage"; }
      else {
        var lab = document.createElement("label");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = mine;
        cb.addEventListener("change", function () { toggleExtra(r.label, cb.checked); });
        lab.appendChild(cb);
        lab.appendChild(document.createTextNode("Je l'ai"));
        right.appendChild(lab);
      }
      li.appendChild(mark); li.appendChild(name); li.appendChild(right);
      target.appendChild(li);
    });
    state.extra.filter(function (x) { return !reqs.concat(exp).some(function (r) { return r.label === x; }); }).forEach(function (x) {
      var li = document.createElement("li");
      var a = document.createElement("span"); a.className = "ok"; a.textContent = "✓";
      var b = document.createElement("span"); b.textContent = x;
      var c = document.createElement("button"); c.type = "button"; c.className = "linkish"; c.textContent = "Retirer";
      c.addEventListener("click", function () { toggleExtra(x, false); });
      li.appendChild(a); li.appendChild(b); li.appendChild(c);
      list.appendChild(li);
    });
    if (!reqs.length && !state.extra.length) {
      var none = document.createElement("li");
      none.textContent = "Colle le texte de l'annonce pour voir les compétences demandées.";
      list.appendChild(none);
    }

    var e = evaluate(reqs, exp, cfg, w);
    var band = e.score >= 75 ? ["high", "Très bonnes chances : profil très adapté"] :
      e.score >= 55 ? ["mid", "Bonnes chances : profil adapté, quelques points à renforcer"] :
      e.score >= 35 ? ["mid", "Chances moyennes : des écarts importants à combler"] :
      ["low", "Peu de chances : poste éloigné de ton profil"];
    $("scoreN").textContent = String(e.score);
    $("score").setAttribute("data-band", band[0]);
    $("scoreVerdict").textContent = band[1];
    var bits = [];
    if (e.n) bits.push("Compétences demandées : " + String(e.got).replace(".", ",") + " / " + e.n + " couvertes");
    if (e.nExp) bits.push("Souvent attendues : " + String(e.gotExp).replace(".", ",") + " / " + e.nExp);
    if (e.capped) bits.push("Colle le texte de l'annonce pour une note plus fiable");
    bits.push("Thèmes de l'annonce couverts par tes expériences : " + Math.round(e.aligned * 100) + " %");
    if (e.asked) bits.push("Expérience demandée : " + e.asked + " ans (toi : " + e.mine + " ans)");
    $("scoreDetail").textContent = bits.join(" · ");
  }

  function toggleExtra(label, on) {
    var i = state.extra.indexOf(label);
    if (on && i === -1 && state.extra.length < 12) state.extra.push(label);
    if (!on && i !== -1) state.extra.splice(i, 1);
    refresh();
  }

  /* ---------- Interface ---------- */
  function chipList() {
    var box = $("topics");
    box.innerHTML = "";
    var w = weights();
    var order = TOPICS.slice().sort(function (a, b) { return state.scores[b] - state.scores[a]; });
    order.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "gchip";
      b.setAttribute("aria-pressed", String(w[k] > 0));
      b.textContent = G.topics[k].label;
      if (state.scores[k] > 0) {
        var n = document.createElement("span");
        n.className = "gchip__n";
        n.textContent = String(state.scores[k]);
        b.appendChild(n);
      }
      b.addEventListener("click", function () {
        state.toggles[k] = !(w[k] > 0);
        state.manual = null;
        update();
      });
      box.appendChild(b);
    });
  }

  function checklist(id, list, keyOf, labelOf, selected, field) {
    var box = $(id);
    box.innerHTML = "";
    list.forEach(function (x) {
      var key = keyOf(x);
      var row = document.createElement("label");
      row.className = "gcheck";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = selected.indexOf(key) !== -1;
      cb.addEventListener("change", function () {
        var cfg = currentConfig() || emptyConfig();
        state.manual = JSON.parse(JSON.stringify(cfg));
        delete state.manual.t;
        var arr = state.manual[field];
        var at = arr.indexOf(key);
        if (cb.checked && at === -1) arr.push(key);
        if (!cb.checked && at !== -1) arr.splice(at, 1);
        if (field === "k") state.manual.k = C.EXPERIENCE.map(function (e) { return e.id; }).filter(function (i) { return arr.indexOf(i) !== -1; });
        if (field === "h") state.manual.h = state.manual.h.slice(-4);
        refresh();
      });
      var txt = document.createElement("span");
      txt.textContent = labelOf(x);
      row.appendChild(cb);
      row.appendChild(txt);
      box.appendChild(row);
    });
  }

  function emptyConfig() {
    return {
      b: "",
      k: C.EXPERIENCE.map(function (e) { return e.id; }),
      p: C.CASES.map(function (c) { return c.id; }),
      d: [],
      s: C.SKILLS.map(function (g) { return g.id; }),
      v: C.VISION.map(function (x) { return x.id; }),
      h: C.PROFILE.highlights.map(function (h, i) { return "profile." + i; })
    };
  }
  function chosenBase() {
    var v = $("base").value;
    return v === "auto" ? null : v === "general" ? "" : v;
  }
  function auto() { return compose(weights(), chosenBase()); }
  function currentConfig() {
    var cfg = state.manual || auto();
    if (!cfg) return null;
    cfg = JSON.parse(JSON.stringify(cfg));
    if (chosenBase() != null) cfg.b = chosenBase();
    var post = $("post").value.trim();
    if (post) cfg.t = post;
    if (state.extra.length) cfg.x = state.extra.slice();
    return cfg;
  }

  function encode(cfg) {
    var json = JSON.stringify(cfg);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function linkFor(cfg, extra) {
    var url = new URL("../", window.location.href);
    url.searchParams.set("lang", state.lang);
    if (cfg) url.searchParams.set("g", encode(cfg));
    if (extra) Object.keys(extra).forEach(function (k) { url.searchParams.set(k, extra[k]); });
    return url.href;
  }

  var timer = null;
  function refresh() {
    var cfg = currentConfig();
    var ab = autoBase(weights());
    $("baseAuto").textContent = ab ? "Automatique · " + fr(C.CV_TARGETS[ab].short) : "Automatique · CV général";
    var sel = cfg || emptyConfig();
    checklist("listXp", C.EXPERIENCE, function (x) { return x.id; }, function (x) { return x.period + " · " + fr(x.role) + " — " + fr(x.org); }, sel.k, "k");
    checklist("listPj", ALL_PROJECTS, function (x) { return x.id; }, function (x) { return fr(x.title) + (x.year ? " · " + x.year : ""); }, sel.p, "p");
    checklist("listSk", C.SKILLS, function (x) { return x.id; }, function (x) { return fr(x.title); }, sel.s, "s");
    checklist("listVi", C.VISION, function (x) { return x.id; }, function (x) { return fr(x.title); }, sel.v, "v");
    checklist("listHl", POOL, function (x) { return x.ref; }, function (x) { return fr(x.h.title) + " — " + fr(x.h.text); }, sel.h, "h");
    $("manualNote").hidden = !state.manual;
    renderFit(cfg);

    var url = linkFor(cfg);
    $("link").value = url;
    $("open").href = url;
    $("pdf").href = linkFor(cfg, { print: "1" });
    clearTimeout(timer);
    timer = setTimeout(function () { if ($("preview").src !== url) $("preview").src = url; }, 450);
  }

  function update() {
    state.scores = detect($("post").value, $("ad").value);
    chipList();
    refresh();
  }

  $("post").addEventListener("input", function () { state.manual = null; state.toggles = {}; update(); });
  $("ad").addEventListener("input", function () { state.manual = null; state.toggles = {}; update(); });
  $("base").addEventListener("change", function () { state.manual = null; refresh(); });
  function addTyped() {
    var v = $("newSkill").value.trim().slice(0, 40);
    if (v) { $("newSkill").value = ""; toggleExtra(v, true); }
  }
  $("addSkill").addEventListener("click", addTyped);
  $("newSkill").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); addTyped(); } });
  $("reset").addEventListener("click", function () { state.manual = null; state.toggles = {}; update(); });
  document.querySelectorAll("[data-plang]").forEach(function (b) {
    b.addEventListener("click", function () {
      state.lang = b.getAttribute("data-plang");
      document.querySelectorAll("[data-plang]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      refresh();
    });
  });
  $("copy").addEventListener("click", function () {
    var input = $("link");
    function done(ok) {
      $("copy").textContent = ok ? "Lien copié" : "Sélectionne le lien et copie-le";
      setTimeout(function () { $("copy").textContent = "Copier le lien"; }, 2200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(input.value).then(function () { done(true); }, function () { input.select(); done(false); });
    } else { input.select(); done(false); }
  });

  // CV déjà prêts, pour mémoire
  var ready = $("ready");
  [["", "CV général"]].concat(Object.keys(C.CV_TARGETS).map(function (k) { return [k + "/", fr(C.CV_TARGETS[k].short)]; })).forEach(function (r) {
    var a = document.createElement("a");
    a.href = "../" + r[0];
    a.textContent = r[1];
    a.target = "_blank";
    a.rel = "noopener";
    ready.appendChild(a);
  });

  /* ---------- Historique (gardé dans ce navigateur, exportable) ---------- */
  var HKEY = "og-cv-history";
  state.current = null;
  function loadHist() { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } }
  function storeHist(h) { try { localStorage.setItem(HKEY, JSON.stringify(h)); return true; } catch (e) { return false; } }
  function note(text) { $("saveNote").textContent = text; }

  function snapshot() {
    return {
      post: $("post").value, ad: $("ad").value, base: $("base").value, lang: state.lang,
      extra: state.extra.slice(), manual: state.manual, toggles: state.toggles,
      score: $("fit").hidden ? null : +$("scoreN").textContent, link: $("link").value
    };
  }
  function restore(e) {
    $("post").value = e.post || "";
    $("ad").value = e.ad || "";
    $("base").value = e.base || "auto";
    state.lang = e.lang || "fr";
    document.querySelectorAll("[data-plang]").forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-plang") === state.lang)); });
    state.extra = (e.extra || []).slice();
    state.manual = e.manual || null;
    state.toggles = e.toggles || {};
    state.current = e.id;
    state.scores = detect($("post").value, $("ad").value);
    chipList();
    refresh();
    renderHist();
    window.scrollTo(0, 0);
    $("form").scrollTop = 0;
  }
  function renderHist() {
    var box = $("hist");
    box.innerHTML = "";
    loadHist().forEach(function (e) {
      var li = document.createElement("li");
      if (e.id === state.current) li.className = "is-current";
      var top = document.createElement("div"); top.className = "hist__top";
      var post = document.createElement("span"); post.className = "hist__post"; post.textContent = e.post || "Sans intitulé";
      var sc = document.createElement("span"); sc.className = "hist__score"; sc.textContent = e.score != null ? e.score + "/100" : "";
      top.appendChild(post); top.appendChild(sc);
      var meta = document.createElement("span"); meta.className = "hist__meta";
      meta.textContent = new Date(e.date).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }) + (e.extra && e.extra.length ? " · " + e.extra.length + " compétence(s) ajoutée(s)" : "");
      var btns = document.createElement("div"); btns.className = "hist__btns";
      [["Ouvrir et modifier", function () { restore(e); note("CV « " + (e.post || "sans intitulé") + " » rouvert : modifie-le puis « Enregistrer » pour mettre à jour."); }],
       ["Copier le lien", function () { if (navigator.clipboard) navigator.clipboard.writeText(e.link).then(function () { note("Lien copié."); }, function () { note(e.link); }); else note(e.link); }],
       ["Supprimer", function () {
         if (!window.confirm("Supprimer « " + (e.post || "sans intitulé") + " » de l'historique ?")) return;
         storeHist(loadHist().filter(function (x) { return x.id !== e.id; }));
         if (state.current === e.id) state.current = null;
         renderHist();
       }]].forEach(function (b) {
        var btn = document.createElement("button"); btn.type = "button"; btn.className = "linkish"; btn.textContent = b[0];
        btn.addEventListener("click", b[1]); btns.appendChild(btn);
      });
      li.appendChild(top); li.appendChild(meta); li.appendChild(btns);
      box.appendChild(li);
    });
  }

  $("save").addEventListener("click", function () {
    var h = loadHist();
    var entry = snapshot();
    entry.id = state.current || Date.now().toString(36);
    entry.date = new Date().toISOString();
    var at = h.findIndex(function (x) { return x.id === entry.id; });
    if (at !== -1) h.splice(at, 1);
    h.unshift(entry);
    if (storeHist(h.slice(0, 100))) {
      note(at !== -1 ? "Mis à jour dans l'historique." : "Enregistré dans l'historique.");
      state.current = entry.id;
    } else note("Impossible d'enregistrer dans ce navigateur (navigation privée ?). Utilise « Exporter ».");
    renderHist();
  });
  $("newOne").addEventListener("click", function () {
    $("post").value = ""; $("ad").value = ""; $("base").value = "auto";
    state.extra = []; state.manual = null; state.toggles = {}; state.current = null;
    note("");
    update();
    renderHist();
  });
  $("export").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(loadHist(), null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "historique-cv-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  $("import").addEventListener("change", function () {
    var f = this.files && this.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var incoming = JSON.parse(r.result);
        if (!Array.isArray(incoming)) throw new Error("format");
        var h = loadHist(), ids = {};
        h.forEach(function (x) { ids[x.id] = true; });
        incoming.forEach(function (x) { if (x && x.id && !ids[x.id]) h.push(x); });
        h.sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
        storeHist(h.slice(0, 100));
        note(incoming.length + " CV importé(s).");
        renderHist();
      } catch (e) { note("Ce fichier n'est pas un historique exporté par le générateur."); }
    };
    r.readAsText(f);
    this.value = "";
  });

  update();
  renderHist();
})();
