/*
 * CV interactif — lit assets/js/content.js (même source que le site).
 * Une page générale (/cv/) et des pages ciblées par poste (/cv/<slug>/) : le slug
 * vient de <body data-cv="…"> et sélectionne une entrée de CV_TARGETS.
 * Filtre par axe, missions dépliables, 4 langues, PDF à télécharger, impression A4.
 */
(function () {
  "use strict";

  var I18N = window.I18N;
  var C = window.SITE_CONTENT;
  var LANGS = ["fr", "en", "ar", "ru"];
  var slug = document.body.getAttribute("data-cv") || "";
  var T = slug && C.CV_TARGETS ? C.CV_TARGETS[slug] : null;
  var params = new URLSearchParams(window.location.search);
  // Lien du générateur (?g=…) : un CV composé pour un poste à partir du contenu existant.
  if (!T && params.get("g")) T = customTarget(params.get("g"));
  var pdfBase = document.body.getAttribute("data-pdf") || "Oussama-Ghorbel-CV";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var state = { lang: "fr", filter: "all", open: {} };

  // Sur un CV ciblé, les expériences clés sont dépliées d'emblée.
  if (T) T.key.forEach(function (id) { state.open[id] = true; });

  function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[state.lang] || v.en || v.fr || "";
  }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function clear(id) { var n = $(id); n.innerHTML = ""; return n; }
  function storage(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function dict() { return I18N[state.lang]; }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function pick(list, ids) { return ids ? ids.map(function (id) { return byId(list, id); }).filter(Boolean) : list; }
  function pdfHref(lang) { return pdfBase + "-" + lang.toUpperCase() + ".pdf"; }

  // Décode la configuration du générateur : { t: poste, b: profil de départ, k, p, d, s, v: ids, h: atouts }.
  // Seuls des identifiants existants sont retenus ; le poste saisi est le seul texte libre.
  function customTarget(raw) {
    var j;
    try {
      j = JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/")))));
    } catch (e) { return null; }
    if (!j || typeof j !== "object") return null;
    var base = j.b && C.CV_TARGETS[j.b] ? C.CV_TARGETS[j.b] : null;
    var post = String(j.t || "").trim().slice(0, 120);
    function only(ids, list) { return (Array.isArray(ids) ? ids : []).filter(function (id) { return byId(list, id); }); }
    function highlight(ref) {
      var a = String(ref).split(".");
      var list = a[0] === "profile" ? C.PROFILE.highlights : (C.CV_TARGETS[a[0]] || {}).highlights;
      return list ? list[+a[1]] : null;
    }
    if (base && base.photo) {
      var img = document.querySelector("#coverPhoto img");
      if (img) img.setAttribute("src", img.getAttribute("src").replace(/assets\/img\/[^/]+$/, base.photo));
    }
    return {
      custom: true,
      post: post,
      short: post ? { fr: post } : (base ? base.short : C.PROFILE.title),
      title: base ? base.title : C.PROFILE.title,
      summary: base ? base.summary : C.PROFILE.summary,
      highlights: (Array.isArray(j.h) ? j.h : []).map(highlight).filter(Boolean).slice(0, 4),
      key: only(j.k, C.EXPERIENCE),
      projects: only(j.p, C.CASES.concat(C.PROJECTS)),
      detail: only(j.d, C.CASES),
      skills: only(j.s, C.SKILLS),
      vision: only(j.v, C.VISION),
      // Compétences confirmées par Oussama dans le générateur (texte court, affiché tel quel)
      extra: (Array.isArray(j.x) ? j.x : []).map(function (v) { return String(v).trim().slice(0, 40); }).filter(Boolean).slice(0, 12)
    };
  }

  function renderStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      var v = dict()[n.getAttribute("data-i18n")];
      if (v != null) n.textContent = v;
    });
    var title = T ? t(T.title) : t(C.PROFILE.title);
    document.title = dict()["cv.title"] + (T ? " · " + t(T.short) : "");
    $("cvTitle").textContent = T && T.post ? T.post : title;
    $("cvCoverTitle").textContent = title;
    $("cvShort").textContent = T ? " — " + t(T.short) : "";
    $("cvSummary").textContent = t(T ? T.summary : C.PROFILE.summary);
    $("cvTagline").textContent = t(C.PROFILE.tagline);
    $("hlTitle").textContent = dict()[T ? "cv.highlightsTarget" : "cv.highlights"];
    $("xpTitle").textContent = dict()[T ? "cv.relevant" : "cv.experience"];
    $("pjTitle").textContent = dict()[T ? "cv.keyProjects" : "cv.projects"];
    var d = new Date(C.updated + "T12:00:00");
    var locale = { fr: "fr-FR", en: "en-GB", ar: "ar-TN", ru: "ru-RU" }[state.lang];
    $("cvUpdated").textContent = d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
    $("cvUpdated").setAttribute("datetime", C.updated);
    $("cvSite").textContent = C.PROFILE.site;
    // Téléchargements : le bouton de couverture suit la langue affichée.
    // Un CV du générateur n'a pas de PDF préparé : on propose « Enregistrer en PDF » (impression).
    var printOnly = !!(T && T.custom);
    $("coverDl").setAttribute("href", printOnly ? "#" : pdfHref(state.lang));
    document.querySelectorAll("[data-pdf-lang]").forEach(function (a) {
      var l = a.getAttribute("data-pdf-lang");
      a.setAttribute("href", printOnly ? "#" : pdfHref(l));
      a.classList.toggle("is-current", l === state.lang);
    });
    if (printOnly) {
      $("coverDl").querySelector("span").textContent = dict()["cv.printPdf"];
      $("dlBtn").querySelector("span").textContent = dict()["cv.printPdf"];
    }
  }

  function renderFacts() {
    var box = clear("cvFacts");
    var P = C.PROFILE;
    box.appendChild(el("li", null, [el("span", { class: "ic ic--pin", "aria-hidden": "true" }), el("span", { text: t(P.location) })]));
    box.appendChild(el("li", null, [
      el("span", { class: "ic ic--lang", "aria-hidden": "true" }),
      el("span", { text: C.LANGUAGES.map(function (l) { return l.name; }).join(" · ") })
    ]));
    box.appendChild(el("li", null, [el("span", { class: "ic ic--mail", "aria-hidden": "true" }), el("a", { href: "mailto:" + P.email, text: P.email })]));
  }

  function renderContact() {
    var box = clear("cvContact");
    var P = C.PROFILE;
    [
      ["mail", P.email, "mailto:" + P.email],
      ["phone", P.phone, "tel:" + P.phone.replace(/\s/g, "")],
      ["pin", t(P.location), null],
      ["web", P.site, "https://" + P.site]
    ].forEach(function (r) {
      var icon = el("span", { class: "ic ic--" + r[0], "aria-hidden": "true" });
      var val = r[2] ? el("a", { href: r[2], text: r[1], dir: r[0] === "phone" ? "ltr" : "auto" }) : el("span", { text: r[1] });
      box.appendChild(el("li", null, [icon, val]));
    });
  }

  function renderLangs() {
    var box = clear("cvLangs");
    C.LANGUAGES.forEach(function (l) {
      var bar = el("span", { class: "lvl", "aria-hidden": "true" });
      for (var i = 1; i <= 6; i++) bar.appendChild(el("i", { class: i <= l.score ? "on" : "", style: "--i:" + i }));
      box.appendChild(el("li", null, [
        el("span", { class: "lang__name", lang: l.code.toLowerCase(), text: l.name }),
        el("span", { class: "lang__lvl", text: t(l.level) }),
        bar
      ]));
    });
  }

  function renderSkills() {
    var box = clear("cvSkills");
    pick(C.SKILLS, T && T.skills).forEach(function (g) {
      box.appendChild(el("div", { class: "skillgrp" }, [
        el("h3", { text: t(g.title) }),
        g.note ? el("p", { class: "skillgrp__note", text: t(g.note) }) : null,
        el("ul", null, g.items.map(function (s) { return el("li", { text: t(s) }); }))
      ]));
    });
    if (T && T.extra && T.extra.length) {
      box.appendChild(el("div", { class: "skillgrp" }, [
        el("h3", { text: dict()["cv.extraSkills"] }),
        el("ul", null, T.extra.map(function (s) { return el("li", { text: s }); }))
      ]));
    }
  }

  function renderHighlights() {
    var box = clear("cvHighlights");
    (T ? T.highlights : C.PROFILE.highlights || []).forEach(function (h, i) {
      box.appendChild(el("li", { class: "hl__item", style: "--d:" + i }, [
        el("span", { class: "hl__n", text: "0" + (i + 1) }),
        el("b", { text: t(h.title) }),
        el("span", { text: t(h.text) })
      ]));
    });
  }

  function renderFilters() {
    var box = clear("cvFilters");
    box.hidden = !!T;
    if (T) return;
    ["all"].concat(Object.keys(C.domains)).forEach(function (k) {
      var n = k === "all" ? C.EXPERIENCE.length : C.EXPERIENCE.filter(function (x) { return x.axes.indexOf(k) !== -1; }).length;
      if (!n) return;
      var b = el("button", { type: "button", class: "chip", "data-axis": k, "aria-pressed": String(state.filter === k) }, [
        document.createTextNode(k === "all" ? dict()["cv.all"] : t(C.domains[k])),
        el("span", { class: "chip__n", text: String(n) })
      ]);
      b.addEventListener("click", function () { state.filter = k; renderFilters(); applyFilter(); });
      box.appendChild(b);
    });
  }

  function applyFilter() {
    document.querySelectorAll("#cvExperience .xp__item").forEach(function (li) {
      var axes = li.getAttribute("data-axes").split(" ");
      li.classList.toggle("is-dim", state.filter !== "all" && axes.indexOf(state.filter) === -1);
    });
  }

  function mainExperience() {
    return T ? C.EXPERIENCE.filter(function (x) { return T.key.indexOf(x.id) !== -1; }) : C.EXPERIENCE;
  }

  function renderExperience() {
    var box = clear("cvExperience");
    mainExperience().forEach(function (x) {
      var hasPoints = x.points && x.points.length;
      var key = x.id;
      var head = el(hasPoints ? "button" : "div", hasPoints ? { type: "button", class: "xp__head", "aria-expanded": String(!!state.open[key]) } : { class: "xp__head" }, [
        el("span", { class: "xp__period", text: x.period }),
        el("span", { class: "xp__main" }, [
          el("span", { class: "xp__role", text: t(x.role) }),
          el("span", { class: "xp__org", text: t(x.org) })
        ]),
        el("span", { class: "xp__axes" }, x.axes.map(function (a) { return el("i", { class: "dot dot--" + a, title: t(C.domains[a]) }); })),
        hasPoints ? el("span", { class: "xp__chev", "aria-hidden": "true" }) : null
      ]);
      var li = el("li", { class: "xp__item" + (state.open[key] ? " is-open" : ""), "data-axes": x.axes.join(" ") }, [head]);
      if (hasPoints) {
        li.appendChild(el("ul", { class: "xp__points" }, x.points.map(function (p) { return el("li", { text: t(p) }); })));
        head.addEventListener("click", function () {
          state.open[key] = !state.open[key];
          li.classList.toggle("is-open", state.open[key]);
          head.setAttribute("aria-expanded", String(state.open[key]));
          syncToggle();
        });
      }
      box.appendChild(li);
    });
    // CV ciblé : les autres expériences tiennent en une ligne chacune.
    var others = T ? C.EXPERIENCE.filter(function (x) { return T.key.indexOf(x.id) === -1; }) : [];
    $("xpOther").hidden = !others.length;
    var ob = clear("cvOther");
    others.forEach(function (x) {
      ob.appendChild(el("li", null, [
        el("span", { class: "xp__period", text: x.period }),
        el("span", null, [el("b", { text: t(x.role) }), document.createTextNode(" — " + t(x.org))])
      ]));
    });
    applyFilter();
    syncToggle();
  }

  function expandable() { return mainExperience().filter(function (x) { return x.points && x.points.length; }).map(function (x) { return x.id; }); }
  function allOpen() { return expandable().every(function (k) { return state.open[k]; }); }
  function syncToggle() {
    var b = $("toggleAll");
    var key = allOpen() ? "cv.collapseAll" : "cv.expandAll";
    b.setAttribute("data-i18n", key);
    b.textContent = dict()[key];
  }

  function renderProjects() {
    var box = clear("cvProjects");
    var list = T ? pick(C.CASES.concat(C.PROJECTS), T.projects) : C.CASES;
    var detail = T ? T.detail : [];
    list.forEach(function (c) {
      var isCase = !!c.kind;
      var year = c.year ? " · " + c.year : "";
      var open = detail.indexOf(c.id) !== -1;
      box.appendChild(el("li", { class: open ? "is-detail" : "" }, [
        el("span", { class: "pj__top" }, [
          el("b", { text: t(c.title) }),
          el("span", { class: "st st--" + c.status, text: t(C.STATUS[c.status]) + year })
        ]),
        el("span", { class: "pj__kind", text: isCase ? t(c.kind) : t(c.desc) }),
        open && isCase ? el("ul", { class: "pj__did" }, c.did.map(function (p) { return el("li", { text: t(p) }); })) : null,
        c.link ? el("a", { class: "pj__link", href: c.link, target: "_blank", rel: "noopener", text: c.link.replace(/^https?:\/\/(www\.)?/, "") }) : null
      ]));
    });
  }

  function renderEducation() {
    var box = clear("cvEducation");
    C.EDUCATION.forEach(function (e) {
      box.appendChild(el("li", null, [
        el("span", { class: "edu__period", text: e.period }),
        el("b", { text: t(e.role) }),
        el("span", { class: "edu__org", text: t(e.org) })
      ]));
    });
    var tb = clear("cvTraining");
    C.TRAINING.forEach(function (x) {
      tb.appendChild(el("li", null, [el("span", { class: "edu__period", text: x.year }), el("span", { text: t(x.text) })]));
    });
  }

  function renderAmbitions() {
    var box = clear("cvAmbitions");
    pick(C.VISION, T && T.vision).forEach(function (v) {
      box.appendChild(el("li", null, [el("b", { text: t(v.title) }), el("span", { text: t(v.text) })]));
    });
  }

  function render() {
    renderStatic();
    renderFacts();
    renderContact();
    renderLangs();
    renderSkills();
    renderHighlights();
    renderFilters();
    renderExperience();
    renderProjects();
    renderEducation();
    renderAmbitions();
  }

  function setLang(lang, save) {
    if (LANGS.indexOf(lang) === -1) lang = "fr";
    state.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    if (save) {
      storage("og-lang", lang);
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
    render();
  }

  function initialLang() {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q && LANGS.indexOf(q) !== -1) return q;
    var s = storage("og-lang");
    if (s && LANGS.indexOf(s) !== -1) return s;
    var n = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) !== -1 ? n : "fr";
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
  });

  $("toggleAll").addEventListener("click", function () {
    var open = !allOpen();
    expandable().forEach(function (k) { state.open[k] = open; });
    renderExperience();
  });

  // Menu de téléchargement (une version PDF par langue)
  var dlBtn = $("dlBtn"), dlMenu = $("dlMenu");
  function menu(open) {
    dlMenu.hidden = !open;
    dlBtn.setAttribute("aria-expanded", String(open));
  }
  dlBtn.addEventListener("click", function (e) { e.stopPropagation(); menu(dlMenu.hidden); });
  document.querySelectorAll("[data-pdf-lang], #coverDl").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (!(T && T.custom)) return;
      e.preventDefault();
      menu(false);
      var l = a.getAttribute("data-pdf-lang") || state.lang;
      if (l !== state.lang) setLang(l, true);
      setTimeout(function () { window.print(); }, 350);
    });
  });
  document.addEventListener("click", function (e) { if (!dlMenu.hidden && !$("dl").contains(e.target)) menu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !dlMenu.hidden) { menu(false); dlBtn.focus(); } });

  // À l'impression : tout est déplié et aucun filtre n'atténue les lignes.
  var printSnapshot = null;
  window.addEventListener("beforeprint", function () {
    printSnapshot = { open: Object.assign({}, state.open), filter: state.filter };
    expandable().forEach(function (k) { state.open[k] = true; });
    state.filter = "all";
    renderFilters();
    renderExperience();
  });
  window.addEventListener("afterprint", function () {
    if (!printSnapshot) return;
    state.open = printSnapshot.open;
    state.filter = printSnapshot.filter;
    renderFilters();
    renderExperience();
  });
  $("printBtn").addEventListener("click", function () { window.print(); });

  setLang(initialLang(), false);
  // ?print=1 : ouvre directement la boîte « Imprimer / Enregistrer en PDF » (utilisé par le générateur).
  if (params.get("print") === "1") {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(function () { window.print(); }, 600); });
  }

  /* ---------- Mouvement : apparitions, parallaxe de la couverture, progression ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (n) { n.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (n) { io.observe(n); });
  }

  var cover = $("cover"), photo = $("coverPhoto"), text = $("coverText"), bar = $("cvProgress");
  var mx = 0, my = 0, cx = 0, cy = 0, sy = window.scrollY, ticking = false;

  function frame() {
    ticking = false;
    var h = cover.offsetHeight || 1;
    var k = Math.min(1, sy / h);
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    if (!reduced) {
      photo.style.transform = "translate3d(" + (cx * -14) + "px," + (sy * 0.22 + cy * -10) + "px,0) rotateY(" + (cx * 5) + "deg) rotateX(" + (cy * -4) + "deg)";
      text.style.transform = "translate3d(0," + (sy * 0.1) + "px,0)";
      text.style.opacity = String(1 - k * 1.15);
      if (Math.abs(mx - cx) > 0.002 || Math.abs(my - cy) > 0.002) request();
    }
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? sy / max : 0) + ")";
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", function () { sy = window.scrollY; request(); }, { passive: true });
  cover.addEventListener("pointermove", function (e) {
    var r = cover.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
    request();
  });
  cover.addEventListener("pointerleave", function () { mx = 0; my = 0; request(); });
  request();
  requestAnimationFrame(function () { document.documentElement.classList.add("is-loaded"); });
})();
