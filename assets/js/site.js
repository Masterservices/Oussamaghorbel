(function () {
  "use strict";

  var I18N = window.I18N;
  var C = window.SITE_CONTENT;
  var LANGS = ["fr", "en", "ar", "ru"];
  var state = { lang: "fr", filter: "all" };

  /* ---------- Helpers ---------- */

  // Renvoie le texte dans la langue courante, avec repli EN puis FR.
  function t(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.en || value.fr || "";
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function storage(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Rendering ---------- */

  function renderStatic() {
    var dict = I18N[state.lang];
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (dict[key] != null) node.textContent = dict[key];
    });
    document.querySelectorAll("[data-domain-label]").forEach(function (node) {
      node.textContent = t(C.domains[node.getAttribute("data-domain-label")]);
    });
    document.title = dict["meta.title"];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && dict["meta.description"]) desc.setAttribute("content", dict["meta.description"]);
    // Le PDF du CV général suit la langue affichée.
    document.querySelectorAll("[data-cv-pdf]").forEach(function (a) {
      a.setAttribute("href", "cv/Oussama-Ghorbel-CV-" + state.lang.toUpperCase() + ".pdf");
    });
  }

  function matches(domains) {
    return state.filter === "all" || domains.indexOf(state.filter) !== -1;
  }

  function renderFilters() {
    var box = document.getElementById("filters");
    if (!box) return;
    box.innerHTML = "";
    var all = (C.CASES || []).concat(C.PROJECTS);
    ["all"].concat(Object.keys(C.domains)).forEach(function (key) {
      var count = key === "all" ? all.length
        : all.filter(function (p) { return p.domains.indexOf(key) !== -1; }).length;
      if (!count) return;
      var label = key === "all" ? I18N[state.lang]["portfolio.all"] : t(C.domains[key]);
      var btn = el("button", { type: "button", "data-filter": key, "aria-pressed": String(state.filter === key) }, [
        document.createTextNode(label),
        el("span", { class: "count", text: String(count) })
      ]);
      btn.addEventListener("click", function () {
        state.filter = key;
        renderFilters();
        applyFilter();
        document.dispatchEvent(new CustomEvent("site:filter"));
      });
      box.appendChild(btn);
    });
  }

  function statusBadge(st, year) {
    return el("span", { class: "status status--" + st }, [
      el("i", { "aria-hidden": "true" }),
      document.createTextNode(t(C.STATUS[st]) + (year ? " · " + year : ""))
    ]);
  }

  // Aperçus illustratifs (pas des captures) pour les projets sans capture d'écran publiable.
  var MOCKS = {
    pg: '<div class="mock m-pg"><span class="k">Tourisme médical · Tunisie</span><h4>L’excellence médicale,<br><i>l’hospitalité</i> en plus.</h4><div class="rule"></div><div class="grid8">' + new Array(9).join("<div></div>") + "</div></div>",
    yg: '<div class="mock m-yg"><div class="hd"><b>Юлия Горбель</b><span>парикмахер</span></div><div class="ba"><div class="before"></div><div class="after"></div><div class="handle"></div><span class="tag l">До</span><span class="tag r">После</span><input type="range" min="5" max="95" value="52"></div></div>',
    nu: '<div class="mock m-nu"><div class="sq"><span class="px">1080 × 1080</span><div class="bt"></div><div class="bt"></div><div class="bt"></div><div class="bt"></div><span class="wm">NURENS</span></div></div>',
    duo: '<div class="mock m-duo"><div class="swatches"><i></i><i></i><i></i></div><div class="label"><b>DUOACCESSORIES</b><span>R&amp;D · Patronage · Confection</span></div><svg class="stitch" viewBox="0 0 200 40" aria-hidden="true"><path d="M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20"/></svg></div>',
    ifaco: '<div class="mock m-ifaco"><div class="mark">IFACO</div><div class="palette"><i></i><i></i><i></i><i></i></div><div class="funnel"><span style="width:100%"></span><span style="width:72%"></span><span style="width:46%"></span><span style="width:28%"></span></div></div>',
    intellect: '<div class="mock m-int"><div class="m-bar"><i></i><i></i><i></i></div><div class="in"><b>Intellect</b><div class="chips"><span>Deutsch A1–B1</span><span>C1 · Medizin</span><span>RU · DE</span></div><div class="lines"><i></i><i></i><i></i></div></div></div>'
  };

  function renderCases() {
    var box = document.getElementById("cases");
    if (!box || !C.CASES) return;
    box.innerHTML = "";
    var dict = I18N[state.lang];
    C.CASES.forEach(function (c, i) {
      var media;
      if (c.image) {
        media = el("figure", { class: "case__media" }, [el("img", { src: c.image, alt: t(c.title), loading: "lazy", width: "1600", height: "1200" })]);
      } else {
        media = el("figure", { class: "case__media case__media--mock" });
        media.innerHTML = MOCKS[c.mock] || "";
        media.appendChild(el("figcaption", { class: "case__illus", text: dict["case.illustration"] }));
        var range = media.querySelector('input[type="range"]');
        if (range) {
          range.setAttribute("aria-label", dict["case.slider"]);
          range.addEventListener("input", function () { media.querySelector(".ba").style.setProperty("--pos", range.value + "%"); });
        }
      }
      var body = el("div", { class: "case__body" }, [
        el("div", { class: "case__top" }, [el("span", { class: "case__kind", text: t(c.kind) }), statusBadge(c.status, c.year)]),
        el("h3", { class: "case__title", text: t(c.title) }),
        el("p", { class: "case__context", text: t(c.context) }),
        el("p", { class: "case__label", text: dict["case.did"] }),
        el("ul", { class: "case__did" }, c.did.map(function (d) { return el("li", { text: t(d) }); })),
        el("div", { class: "case__stack" }, c.stack.map(function (s) { return el("span", { text: s }); })),
        c.link ? el("a", { class: "case__link", href: c.link, target: "_blank", rel: "noopener" }, [
          el("span", { text: dict["case.visit"] }), el("i", { "aria-hidden": "true", text: "↗" })
        ]) : null
      ]);
      box.appendChild(el("article", { class: "case" + (i % 2 ? " case--alt" : ""), "data-domains": c.domains.join(" ") }, [media, body]));
    });
  }

  function renderProjects() {
    var box = document.getElementById("projects");
    if (!box) return;
    box.innerHTML = "";
    C.PROJECTS.forEach(function (p) {
      var tags = el("div", { class: "project__tags" }, p.domains.map(function (d) {
        return el("span", { class: "tag", "data-d": d, text: t(C.domains[d]) });
      }));
      box.appendChild(el("article", { class: "project", "data-domains": p.domains.join(" ") }, [
        el("div", { class: "project__meta" }, [el("span", { class: "project__year", text: p.year }), tags]),
        el("h3", { text: t(p.title) }),
        el("p", { text: t(p.desc) })
      ]));
    });
    applyFilter();
  }

  function applyFilter() {
    document.querySelectorAll("#projects .project, #cases .case").forEach(function (card) {
      card.hidden = !matches(card.getAttribute("data-domains").split(" "));
    });
    var head = document.querySelector(".archive__head");
    if (head) head.hidden = !document.querySelector("#projects .project:not([hidden])");
  }

  function renderTimeline(id, items) {
    var box = document.getElementById(id);
    if (!box) return;
    box.innerHTML = "";
    items.forEach(function (it) {
      var logo = it.logo
        ? el("span", { class: "tl__logo" }, [el("img", { src: it.logo, alt: "", loading: "lazy" })])
        : el("span", { class: "tl__logo tl__logo--dot" });
      box.appendChild(el("li", { class: "tl" }, [
        logo,
        el("div", null, [
          el("div", { class: "tl__period", text: it.period }),
          el("div", { class: "tl__role", text: t(it.role) }),
          el("div", { class: "tl__org", text: t(it.org) })
        ])
      ]));
    });
  }

  function renderTraining() {
    var box = document.getElementById("training");
    if (!box) return;
    box.innerHTML = "";
    C.TRAINING.forEach(function (it) {
      box.appendChild(el("li", null, [el("b", { text: it.year }), el("span", { text: t(it.text) })]));
    });
  }

  function renderSkills() {
    var box = document.getElementById("skillGroups");
    if (!box) return;
    box.innerHTML = "";
    C.SKILLS.forEach(function (g) {
      box.appendChild(el("div", { class: "skill reveal is-visible" }, [
        el("h3", { text: t(g.title) }),
        g.note ? el("p", { class: "skill__note", text: t(g.note) }) : null,
        el("ul", null, g.items.map(function (s) { return el("li", { text: t(s) }); }))
      ]));
    });
  }

  function renderLanguages() {
    var box = document.getElementById("languagesList");
    if (!box || !C.LANGUAGES) return;
    box.innerHTML = "";
    C.LANGUAGES.forEach(function (l) {
      var dots = el("span", { class: "lvl", "aria-hidden": "true" });
      for (var i = 1; i <= 6; i++) dots.appendChild(el("i", { class: i <= l.score ? "on" : "" }));
      box.appendChild(el("li", null, [
        el("span", { class: "languages__name", lang: l.code.toLowerCase(), text: l.name }),
        el("small", { text: l.code + " · " + t(l.level) }),
        dots
      ]));
    });
  }

  var ICONS = {
    web: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    app: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M10 9.5v5l4-2.5z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    flow: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>'
  };

  function renderServices() {
    var box = document.getElementById("servicesGrid");
    if (!box || !C.SERVICES) return;
    box.innerHTML = "";
    C.SERVICES.forEach(function (s, i) {
      var icon = el("span", { class: "svc__icon", "aria-hidden": "true" });
      icon.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[s.icon] || "") + "</svg>";
      box.appendChild(el("article", { class: "svc" }, [
        el("span", { class: "svc__num", text: (i + 1 < 10 ? "0" : "") + (i + 1) }),
        icon,
        el("h3", { text: t(s.title) }),
        el("p", { text: t(s.text) })
      ]));
    });
  }

  function renderSteps() {
    var box = document.getElementById("steps");
    if (!box || !C.METHOD) return;
    box.innerHTML = "";
    C.METHOD.forEach(function (m, i) {
      var li = el("li", { class: "step" + (i === 0 ? " is-active" : ""), tabindex: "0" }, [
        el("span", { class: "step__num", text: (i + 1 < 10 ? "0" : "") + (i + 1) }),
        el("h3", { class: "step__title", text: t(m.title) }),
        el("p", { class: "step__text", text: t(m.text) })
      ]);
      var activate = function () {
        box.querySelectorAll(".step").forEach(function (n) { n.classList.toggle("is-active", n === li); });
        box.style.setProperty("--step", i);
      };
      li.addEventListener("mouseenter", activate);
      li.addEventListener("focus", activate);
      li.addEventListener("click", activate);
      box.appendChild(li);
    });
    box.style.setProperty("--step", 0);
    box.style.setProperty("--steps", C.METHOD.length);
  }

  function renderVision() {
    var box = document.getElementById("visionList");
    if (!box || !C.VISION) return;
    box.innerHTML = "";
    C.VISION.forEach(function (v, i) {
      box.appendChild(el("li", { class: "vis" }, [
        el("span", { class: "vis__num", text: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][i] || String(i + 1) }),
        el("h3", { text: t(v.title) }),
        el("p", { text: t(v.text) })
      ]));
    });
  }

  function renderRoles() {
    var box = document.getElementById("rolesTrack");
    if (!box || !C.ROLES) return;
    box.innerHTML = "";
    var starring = I18N[state.lang]["roles.starring"];
    C.ROLES.forEach(function (r, i) {
      var num = (i + 1 < 10 ? "0" : "") + (i + 1);
      var card = el("button", { type: "button", class: "role", "data-index": String(i) }, [
        el("span", { class: "role__media" }, [el("img", { src: r.img, alt: t(r.title), loading: "lazy", width: "720", height: "960" })]),
        el("span", { class: "role__num", text: num }),
        el("span", { class: "role__body" }, [
          el("span", { class: "role__starring", text: starring }),
          el("span", { class: "role__title", text: t(r.title) }),
          el("span", { class: "role__genre", text: t(r.genre) })
        ])
      ]);
      card.addEventListener("click", function () { openLightbox(r.img, t(r.title) + " — " + t(r.genre)); });
      box.appendChild(card);
    });
    var total = document.getElementById("rolesTotal");
    if (total) total.textContent = (C.ROLES.length < 10 ? "0" : "") + C.ROLES.length;
  }

  function render() {
    renderStatic();
    renderFilters();
    renderCases();
    renderProjects();
    renderSteps();
    renderServices();
    renderVision();
    renderTimeline("experience", C.EXPERIENCE);
    renderTimeline("education", C.EDUCATION);
    renderTraining();
    renderSkills();
    renderLanguages();
    renderRoles();
    document.dispatchEvent(new CustomEvent("site:render"));
  }

  /* ---------- Language ---------- */

  function setLang(lang, save) {
    if (LANGS.indexOf(lang) === -1) lang = "fr";
    state.lang = lang;
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
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
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && LANGS.indexOf(fromUrl) !== -1) return fromUrl;
    var saved = storage("og-lang");
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : "fr";
  }

  /* ---------- Lightbox ---------- */

  var lb = document.getElementById("lightbox");
  function openLightbox(src, caption) {
    lb.querySelector("img").src = src;
    lb.querySelector("img").alt = caption;
    lb.querySelector("figcaption").textContent = caption;
    lb.hidden = false;
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLightbox() { lb.hidden = true; }
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__close")) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  /* ---------- Nav ---------- */

  var nav = document.querySelector(".nav");
  var menu = document.getElementById("menu");
  var burger = document.querySelector(".burger");

  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", function () {
    var open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      burger.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    }
  });

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
  });

  /* ---------- Scroll effects ---------- */

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (n) { revealObs.observe(n); });

    var links = document.querySelectorAll(".nav__links a");
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spyObs.observe(s); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ---------- Barre de progression de la page ---------- */

  var bar = document.getElementById("pageProgress");
  if (bar) {
    var updateBar = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  setLang(initialLang(), false);
})();
