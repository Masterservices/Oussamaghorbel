/*
 * Fils — sculptures de particules en 3D (WebGL brut, aucune bibliothèque).
 * Des dizaines de milliers de points sont posés le long de « fils » (courbes paramétrées) ;
 * ils forment une figure, puis glissent vers la suivante quand la progression change.
 *
 *   <canvas data-threads="sculpture">  quatre figures, une par domaine d'expertise :
 *       sphère armillaire (conseil), réseau (développement commercial),
 *       étoffe tissée (ingénierie), hyperboloïde de fils (digital & IA)
 *   <canvas data-threads="field">      nappe de fils qui ondule (fond de la citation)
 *
 * Le canvas est transparent et les points s'additionnent au fond de la page.
 * Réglages par CSS sur le canvas : --cx, --cy (centre, en demi-écrans), --rx, --ry
 * (place que le rayon de la figure peut prendre, en fraction de la demi-largeur et de la demi-hauteur).
 * Pilotage (motion.js) : window.Threads.get(id).progress(g) / .intro(v).
 * Mouvement réduit : une image fixe. Sans WebGL : le fond CSS reste seul.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var TAU = Math.PI * 2;

  /* ---------- Outils ---------- */

  // Générateur pseudo-aléatoire à graine : les figures sont identiques à chaque chargement.
  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
  function fib(n, R) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var y = 1 - 2 * (i + .5) / n, r = Math.sqrt(1 - y * y), a = i * 2.399963;
      out.push([Math.cos(a) * r * R, y * R, Math.sin(a) * r * R]);
    }
    return out;
  }

  /* ---------- Fils élémentaires : { len, w (poids), thick, at(t, out, rnd) } ---------- */

  function ring(R, n, off, o) {
    n = norm(n);
    var e1 = norm(cross(n, Math.abs(n[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), e2 = cross(n, e1);
    o = o || {};
    return {
      len: TAU * R, w: o.w || 1, thick: o.thick,
      at: function (t, p) {
        var c = Math.cos(t * TAU) * R, s = Math.sin(t * TAU) * R;
        p[0] = n[0] * off + e1[0] * c + e2[0] * s;
        p[1] = n[1] * off + e1[1] * c + e2[1] * s;
        p[2] = n[2] * off + e1[2] * c + e2[2] * s;
      }
    };
  }
  function seg(a, b, o) {
    o = o || {};
    return {
      len: dist(a, b), w: o.w || 1, thick: o.thick,
      at: function (t, p) { p[0] = a[0] + (b[0] - a[0]) * t; p[1] = a[1] + (b[1] - a[1]) * t; p[2] = a[2] + (b[2] - a[2]) * t; }
    };
  }
  // Arc de Bézier dont le point de contrôle est poussé loin du centre.
  function arc(a, b, bulge, o) {
    o = o || {};
    var m = [(a[0] + b[0]) / 2 * (1 + bulge), (a[1] + b[1]) / 2 * (1 + bulge), (a[2] + b[2]) / 2 * (1 + bulge)];
    return {
      len: dist(a, m) + dist(m, b), w: o.w || 1, thick: o.thick,
      at: function (t, p) {
        var u = 1 - t, k0 = u * u, k1 = 2 * u * t, k2 = t * t;
        p[0] = a[0] * k0 + m[0] * k1 + b[0] * k2; p[1] = a[1] * k0 + m[1] * k1 + b[1] * k2; p[2] = a[2] * k0 + m[2] * k1 + b[2] * k2;
      }
    };
  }
  // Nœud : petit amas de points.
  function blob(c, r, len) {
    return { len: len, w: 1, thick: r, at: function (t, p) { p[0] = c[0]; p[1] = c[1]; p[2] = c[2]; } };
  }
  // Poussière : coquille clairsemée autour de la figure.
  function dust(r0, r1, len) {
    return {
      len: len, w: 1, thick: 0, soft: true,
      at: function (t, p, rnd) {
        var y = rnd() * 2 - 1, a = rnd() * TAU, r = Math.sqrt(1 - y * y), R = r0 + (r1 - r0) * rnd();
        p[0] = Math.cos(a) * r * R; p[1] = y * R; p[2] = Math.sin(a) * r * R;
      }
    };
  }

  /* ---------- Les quatre figures ---------- */

  // Conseil & gestion de projet : sphère armillaire (structurer, orienter, coordonner).
  function armillary() {
    var c = [], up = [0, 1, 0], ecl = [Math.sin(.41), Math.cos(.41), 0];
    c.push(ring(1, up, 0, { w: 1.2 }));
    c.push(ring(.917, up, .4), ring(.917, up, -.4));
    c.push(ring(.6, up, .8, { w: .8 }), ring(.6, up, -.8, { w: .8 }));
    c.push(ring(1, [0, 0, 1], 0), ring(1, [1, 0, 0], 0));
    c.push(ring(1.045, ecl, 0, { w: 1.3 }), ring(1.085, ecl, 0, { w: 1.3 }));
    c.push(ring(.68, [.5, .6, .62], 0), ring(.68, [-.62, .5, .3], 0));
    c.push(ring(.4, [.2, .35, .9], 0), ring(.4, [.8, .3, -.2], 0));
    c.push(seg([0, -1.3, 0], [0, 1.3, 0], { w: .8 }));
    c.push(blob([0, 0, 0], .07, .9), blob([0, 1.3, 0], .025, .2), blob([0, -1.3, 0], .025, .2));
    c.push(dust(1.2, 1.55, 1.6));
    return { curves: c, tilt: .36 };
  }

  // Développement commercial : un réseau qui rayonne (clients, partenaires, opportunités).
  function network(rnd) {
    var c = [], hub = [0, 0, 0];
    var mids = fib(8, .5), outs = fib(30, 1).map(function (p) { var k = .88 + rnd() * .22; return [p[0] * k, p[1] * k, p[2] * k]; });
    c.push(blob(hub, .05, 1));
    c.push(ring(.16, [.3, 1, .2], 0, { w: .7 }));
    mids.forEach(function (m) { c.push(seg(hub, m, { w: 1.2 })); c.push(blob(m, .026, .5)); });
    outs.forEach(function (o, i) {
      var best = mids[0];
      mids.forEach(function (m) { if (dist(m, o) < dist(best, o)) best = m; });
      c.push(seg(best, o));
      c.push(blob(o, .017, .3));
      // toile : chaque nœud rejoint son plus proche voisin
      var near = outs.map(function (q, j) { return [dist(o, q), j]; }).sort(function (a, b) { return a[0] - b[0]; })[1];
      if (near[1] > i || i % 3 === 0) c.push(arc(o, outs[near[1]], .05, { w: .5 }));
    });
    c.push(dust(1.15, 1.6, 3));
    return { curves: c, tilt: .18 };
  }

  // Ingénierie & R&D : une étoffe tissée, chaîne et trame entrecroisées.
  function cloth() {
    var c = [], W = 2.35, D = 1.8, nw = 28, nf = 38, dx = W / (nf - 1), dz = D / (nw - 1), amp = .014;
    function h(x, z) {
      var lift = Math.max(0, x - .35) * Math.max(0, z - .15);
      return .17 * Math.sin(1.7 * x + .4) * Math.cos(1.3 * z) + .07 * Math.sin(3.3 * z + 1.2 * x) + lift * lift * 1.2 + .22 * lift;
    }
    var j, i;
    for (j = 0; j < nw; j++) (function (j) {
      var z = -D / 2 + j * dz, s = j % 2 ? 1 : -1;
      c.push({ len: W, w: 1, phase: z * 1.1, at: function (t, p) { var x = -W / 2 + t * W; p[0] = x; p[2] = z; p[1] = h(x, z) + amp * s * Math.cos(Math.PI * (x + W / 2) / dx); } });
    })(j);
    for (i = 0; i < nf; i++) (function (i) {
      var x = -W / 2 + i * dx, s = i % 2 ? 1 : -1;
      c.push({ len: D, w: 1, phase: 40 + x * .9, at: function (t, p) { var z = -D / 2 + t * D; p[0] = x; p[2] = z; p[1] = h(x, z) - amp * s * Math.cos(Math.PI * (z + D / 2) / dz); } });
    })(i);
    c.push(dust(1.3, 1.7, 2));
    return { curves: c, tilt: 0 };
  }

  // Digital & IA : hyperboloïde réglé — des fils droits qui dessinent une surface courbe.
  function hyperboloid() {
    var c = [], R = .84, H = .96, N = 26, tw = 2.0, up = [0, 1, 0], k;
    for (k = 0; k < N; k++) {
      var a = k / N * TAU;
      var A = [R * Math.cos(a), -H, R * Math.sin(a)];
      var B = [R * Math.cos(a + tw), H, R * Math.sin(a + tw)];
      var B2 = [R * Math.cos(a - tw), H, R * Math.sin(a - tw)];
      c.push(seg(A, B), seg(A, B2));
      c.push(blob(A, .02, .1), blob(B, .02, .1));
    }
    c.push(ring(R, up, -H, { w: 1.2 }), ring(R, up, H, { w: 1.2 }));
    c.push(ring(R * Math.cos(tw / 2), up, 0, { w: 1.4 }));
    c.push(blob([0, 0, 0], .05, .6));
    c.push(dust(1.3, 1.65, 2.4));
    return { curves: c, tilt: .1 };
  }

  // Nappe de fils parallèles (fond de la citation) : la houle est calculée dans le shader.
  function strands() {
    var c = [], n = 44, j;
    for (j = 0; j < n; j++) (function (j) {
      var z = -3.2 + j / (n - 1) * 4.6;
      c.push({ len: 7.6, w: 1, at: function (t, p) { p[0] = -3.8 + t * 7.6; p[1] = 0; p[2] = z; } });
    })(j);
    return { curves: c, tilt: 0 };
  }

  /*
   * Répartit n points le long des fils, au prorata de leur longueur.
   * Sortie : x, y, z, u (abscisse le long du fil, pour les impulsions de lumière).
   */
  function build(shape, n, rnd, blockSeed) {
    var out = new Float32Array(n * 4), curves = shape.curves, total = 0, idx = 0, p = [0, 0, 0];
    curves.forEach(function (c) { total += c.len * c.w; });
    var ct = Math.cos(shape.tilt), st = Math.sin(shape.tilt);
    curves.forEach(function (c, ci) {
      var count = ci === curves.length - 1 ? n - idx : Math.min(n - idx, Math.round(n * c.len * c.w / total));
      var phase = c.phase != null ? c.phase : rnd() * 20, thick = c.thick == null ? .004 : c.thick;
      for (var k = 0; k < count; k++) {
        var t = (k + rnd()) / count;
        c.at(t, p, rnd);
        // épaisseur du fil : cœur serré, léger duvet autour
        var g = thick * (rnd() < .1 && !c.soft ? 3.6 : 1);
        var r1 = Math.sqrt(-2 * Math.log(1 - rnd() * .999)), a1 = rnd() * TAU, r2 = Math.sqrt(-2 * Math.log(1 - rnd() * .999)), a2 = rnd() * TAU;
        var x = p[0] + g * r1 * Math.cos(a1), y = p[1] + g * r1 * Math.sin(a1), z = p[2] + g * r2 * Math.cos(a2);
        var o = (idx + k) * 4;
        out[o] = x * ct - y * st; out[o + 1] = x * st + y * ct; out[o + 2] = z;
        out[o + 3] = phase + t * c.len;
      }
      idx += count;
    });
    if (!blockSeed) return out;
    // Les points voyagent par petits paquets : on mélange des blocs entiers, pas les points un à un.
    var B = 40, blocks = Math.floor(n / B), order = [], r = mulberry(blockSeed), i, tmp, j2;
    for (i = 0; i < blocks; i++) order.push(i);
    for (i = blocks - 1; i > 0; i--) { j2 = Math.floor(r() * (i + 1)); tmp = order[i]; order[i] = order[j2]; order[j2] = tmp; }
    var mixed = new Float32Array(n * 4);
    for (i = 0; i < blocks; i++) mixed.set(out.subarray(order[i] * B * 4, (order[i] + 1) * B * 4), i * B * 4);
    mixed.set(out.subarray(blocks * B * 4), blocks * B * 4);
    return mixed;
  }

  /* ---------- Shaders ---------- */

  var VERT = [
    "attribute vec4 aP0;attribute vec4 aP1;attribute vec4 aP2;attribute vec4 aP3;",
    "attribute vec4 aR;attribute vec3 aS;",
    "uniform float uG,uIntro,uTime,uWave,uBlur,uSize,uPush,uAspect,uFocal,uDist,uGain;",
    "uniform mat3 uRot;uniform vec2 uMouse,uCenter;",
    "varying float vA;varying float vT;",
    "vec3 flow(vec3 p,float t){return vec3(sin(p.y*2.3+t*.7+p.z*1.7),sin(p.z*2.1+t*.6+p.x*1.9),sin(p.x*2.5+t*.8+p.y*1.3));}",
    "void main(){",
    // figure de départ et d'arrivée ; chaque point part avec un léger retard
    "  float sg=min(floor(uG),2.);",
    "  float f=clamp(uG-sg,0.,1.);",
    "  float k=smoothstep(aR.y*.45,aR.y*.45+.55,f);",
    "  vec4 a=sg<.5?aP0:(sg<1.5?aP1:aP2);",
    "  vec4 b=sg<.5?aP1:(sg<1.5?aP2:aP3);",
    "  vec4 P=mix(a,b,k);",
    "  float tr=sin(k*3.14159);",
    "  vec3 p=P.xyz;",
    // en chemin : tourbillon et gonflement
    "  p+=flow(p*1.3+aR.x*6.283,uTime*.5)*tr*.2;",
    "  p*=1.+tr*.2*(aR.x-.35);",
    // houle de la nappe
    "  p.y+=uWave*(sin(p.x*1.25+uTime*.35+p.z*.9)*.2+sin(p.z*2.3-uTime*.27+p.x*.5)*.1+sin(p.x*3.7+uTime*.5+p.z)*.03);",
    // respiration
    "  p+=flow(p*1.1,uTime*.3)*.013;",
    // entrée : un nuage dispersé se rassemble
    "  float ki=smoothstep(aR.w*.5,aR.w*.5+.5,uIntro);ki=ki*ki*(3.-2.*ki);",
    "  float an=(1.-ki)*1.8;",
    "  vec3 s=aS;s.xz=mat2(cos(an),-sin(an),sin(an),cos(an))*s.xz;",
    "  p=mix(s,p,ki);",
    "  vec3 q=uRot*p;",
    "  float z=uDist-q.z;",
    "  vec2 n=q.xy*uFocal/z;",
    // les fils s'écartent sous le curseur
    "  vec2 dm=n-uMouse;float dd=dot(dm,dm);",
    "  n+=dm/(sqrt(dd)+.03)*uPush*exp(-dd*10.)*.075;",
    "  gl_Position=vec4(n.x/uAspect+uCenter.x,n.y+uCenter.y,0.,1.);",
    // impulsions de lumière qui courent le long des fils
    "  float pulse=pow(.5+.5*sin(P.w*5.-uTime*1.15+aR.x*.6),16.);",
    // profondeur de champ : les points hors du plan net s'élargissent et pâlissent
    "  float coc=abs(z-uDist)*uBlur;",
    "  float s0=aR.z*uSize/z*(1.+pulse*.9);",
    "  float px=max(s0*(1.+coc),1.);",
    "  gl_PointSize=min(px,48.);",
    "  float e=pow(s0*s0/(px*px),.78);",
    "  float fog=clamp(1.-(z-uDist)*.32,.35,1.35);",
    "  vA=uGain*e*fog*(1.+pulse*2.6)*mix(.3,1.,ki);",
    "  vT=fract(aR.x*7.31);",
    "}"
  ].join("\n");

  var FRAG = [
    "precision mediump float;",
    "varying float vA;varying float vT;uniform vec3 uA;uniform vec3 uB;",
    "void main(){",
    "  vec2 c=gl_PointCoord-.5;float r=dot(c,c);",
    "  float g=exp(-r*18.)*smoothstep(.25,.15,r);",
    "  gl_FragColor=vec4(mix(uA,uB,vT)*g*vA,0.);",
    "}"
  ].join("\n");

  /* ---------- Réglages par type ---------- */

  var KINDS = {
    sculpture: {
      shapes: function (rnd) { return [armillary(), network(rnd), cloth(), hyperboloid()]; },
      count: fine ? 76000 : 30000,
      dist: 4.3, focal: 2.45, fit: 1, pitch: [.4, .38, .72, .3], blur: .85, gain: [.23, .2, .3, .27], size: .0095, wave: 0,
      spin: [.1, .075, .055, .09],
      // teintes par domaine, autour du champagne
      tints: [[.86, .74, .78], [1, .78, .42], [1, .66, .4], [.7, .8, .92]],
      mouseYaw: .55, mousePitch: .22, push: 1
    },
    field: {
      shapes: function () { var s = strands(); return [s, s, s, s]; },
      count: fine ? 46000 : 20000,
      dist: 3.1, focal: 2.2, fit: 0, pitch: [.3, .3, .3, .3], blur: .9, gain: [.26, .26, .26, .26], size: .011, wave: 1,
      spin: [0, 0, 0, 0],
      tints: [[1, .78, .45], [1, .78, .45], [1, .78, .45], [1, .78, .45]],
      mouseYaw: .1, mousePitch: .05, push: .7
    }
  };

  var instances = [], byId = {}, running = false;

  function mount(canvas) {
    var K = KINDS[canvas.getAttribute("data-threads")];
    if (!K) return;
    var gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) return;

    function sh(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Géométrie : 4 figures (x, y, z, u), hasards par point, position dispersée de départ.
    var N = K.count, rnd = mulberry(20240611), shapes = K.shapes(rnd), STRIDE = 23;
    var data = new Float32Array(N * STRIDE), i, s;
    for (s = 0; s < 4; s++) {
      var pts = build(shapes[s], N, rnd, K.wave ? 0 : 101 + s * 17);
      for (i = 0; i < N; i++) data.set(pts.subarray(i * 4, i * 4 + 4), i * STRIDE + s * 4);
    }
    for (i = 0; i < N; i++) {
      var o = i * STRIDE + 16;
      data[o] = rnd(); data[o + 1] = rnd(); data[o + 2] = .55 + rnd() * rnd() * 1.5; data[o + 3] = rnd();
      // nuage de départ : un disque épais, large
      var a = rnd() * TAU, R = 1.3 + Math.pow(rnd(), .6) * 2.6;
      data[o + 4] = Math.cos(a) * R; data[o + 5] = (rnd() - .5) * (K.wave ? .5 : 1.5); data[o + 6] = Math.sin(a) * R;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    [["aP0", 4, 0], ["aP1", 4, 4], ["aP2", 4, 8], ["aP3", 4, 12], ["aR", 4, 16], ["aS", 3, 20]].forEach(function (a) {
      var loc = gl.getAttribLocation(prog, a[0]);
      if (loc < 0) return;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, a[1], gl.FLOAT, false, STRIDE * 4, a[2] * 4);
    });
    data = null;

    var U = {};
    ["uG", "uIntro", "uTime", "uWave", "uBlur", "uSize", "uPush", "uAspect", "uFocal", "uDist", "uGain", "uRot", "uMouse", "uCenter", "uA", "uB"].forEach(function (n) {
      U[n] = gl.getUniformLocation(prog, n);
    });
    gl.uniform1f(U.uWave, K.wave);
    gl.uniform1f(U.uBlur, K.blur);
    gl.uniform1f(U.uDist, K.dist);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    var st = {
      g: 0, gT: 0, intro: K.wave ? 1 : (reduced ? 1 : 0), introT: K.wave || reduced ? 1 : 0, driven: false,
      yaw: .5, spin: 0, lastY: window.scrollY,
      mx: 0, my: 0, tmx: 0, tmy: 0, push: 0, pushT: 0, over: false,
      cx: 0, cy: 0, aspect: 1, visible: true, start: performance.now(), last: 0
    };

    function layout() {
      var dpr = Math.min(window.devicePixelRatio || 1, fine ? 2 : 1.75);
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      var cs = getComputedStyle(canvas);
      st.cx = parseFloat(cs.getPropertyValue("--cx")) || 0;
      st.cy = parseFloat(cs.getPropertyValue("--cy")) || 0;
      var rx = parseFloat(cs.getPropertyValue("--rx")) || .4, ry = parseFloat(cs.getPropertyValue("--ry")) || .57;
      if (document.documentElement.dir === "rtl") st.cx = -st.cx;
      st.aspect = w / h;
      // la figure (rayon 1) tient dans la place donnée, en largeur comme en hauteur
      var focal = K.fit ? Math.min(ry, rx * st.aspect) * K.dist : K.focal;
      gl.uniform1f(U.uAspect, st.aspect);
      gl.uniform1f(U.uFocal, focal);
      gl.uniform1f(U.uSize, K.size * focal * h / 2);
      gl.uniform2f(U.uCenter, st.cx, st.cy);
    }

    function draw(now) {
      var t = reduced ? 14 : (now - st.start) / 1000, dt = Math.min(.05, Math.max(0, (now - st.last) / 1000));
      st.last = now;
      st.g += (st.gT - st.g) * (reduced ? 1 : .09);
      st.intro += (st.introT - st.intro) * (reduced ? 1 : .07);
      st.mx += (st.tmx - st.mx) * .06; st.my += (st.tmy - st.my) * .06;
      st.push += (st.pushT - st.push) * .08;
      // la figure tourne sur elle-même ; le scroll lui donne de l'élan
      var sy = window.scrollY, i0 = Math.max(0, Math.min(2, Math.floor(st.g))), fr = Math.max(0, Math.min(1, st.g - i0));
      st.spin += (sy - st.lastY) * .00045; st.spin *= .93; st.lastY = sy;
      if (!reduced) st.yaw += (K.spin[i0] + (K.spin[i0 + 1] - K.spin[i0]) * fr) * dt + st.spin * dt * 6;
      var yaw = st.yaw + st.mx * K.mouseYaw, pitch = K.pitch[i0] + (K.pitch[i0 + 1] - K.pitch[i0]) * fr - st.my * K.mousePitch;
      var cy = Math.cos(yaw), sy2 = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      // Rx(pitch) * Ry(yaw), en colonnes
      gl.uniformMatrix3fv(U.uRot, false, [cy, sp * sy2, -cp * sy2, 0, cp, sp, sy2, -sp * cy, cp * cy]);
      var A = K.tints[i0], B = K.tints[i0 + 1], c = [A[0] + (B[0] - A[0]) * fr, A[1] + (B[1] - A[1]) * fr, A[2] + (B[2] - A[2]) * fr];
      gl.uniform3f(U.uA, .92 * c[0], .7 * c[1], .42 * c[2]);
      gl.uniform3f(U.uB, 1, .9 * (.6 + .4 * c[1]), .7 * (.5 + .5 * c[2]));
      gl.uniform1f(U.uG, st.g);
      gl.uniform1f(U.uIntro, st.intro);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uGain, K.gain[i0] + (K.gain[i0 + 1] - K.gain[i0]) * fr);
      gl.uniform1f(U.uPush, st.push * K.push);
      gl.uniform2f(U.uMouse, (st.mx - st.cx) * st.aspect, st.my - st.cy);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, N);
    }

    var inst = {
      canvas: canvas, state: st, draw: draw,
      // g : 0 → 3, position entre les quatre figures
      progress: function (g) { st.gT = Math.max(0, Math.min(3, g)); st.driven = true; if (reduced) draw(0); },
      // v : 0 (nuage dispersé) → 1 (figure formée)
      intro: function (v) { st.introT = Math.max(0, Math.min(1, v)); st.driven = true; },
      refresh: function () { layout(); if (reduced) draw(0); }
    };

    window.addEventListener("resize", inst.refresh);
    document.addEventListener("site:render", function () { requestAnimationFrame(inst.refresh); });
    if (fine) {
      window.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        st.tmx = (e.clientX - r.left) / r.width * 2 - 1;
        st.tmy = 1 - (e.clientY - r.top) / r.height * 2;
        st.pushT = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
      }, { passive: true });
      document.addEventListener("pointerleave", function () { st.pushT = 0; });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        st.visible = en[0].isIntersecting;
        if (st.visible) { st.last = performance.now(); st.lastY = window.scrollY; kick(); }
      }, { rootMargin: "80px" }).observe(canvas);
    }

    layout();
    canvas.classList.add("is-ready");
    instances.push(inst);
    if (canvas.id) byId[canvas.id] = inst;
    // Sans pilotage (GSAP absent), la figure se forme toute seule.
    if (!reduced) setTimeout(function () { if (!st.driven) st.introT = 1; }, 1200);
  }

  function loop(now) {
    running = false;
    var any = false;
    instances.forEach(function (inst) {
      if (!inst.state.visible || document.hidden) return;
      inst.draw(now);
      any = true;
    });
    if (any) { running = true; requestAnimationFrame(loop); }
  }
  function kick() {
    if (reduced) { instances.forEach(function (i) { i.draw(0); }); return; }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  Array.prototype.forEach.call(document.querySelectorAll("canvas[data-threads]"), mount);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) kick(); });
  kick();

  window.Threads = { get: function (id) { return byId[id] || null; } };
})();
