/*
 * Survol WebGL des portraits « Un homme, plusieurs rôles » :
 * une onde part du curseur, avec un léger décalage des couleurs et un reflet doré.
 * Seulement avec une souris, hors mouvement réduit ; sinon le survol CSS suffit.
 * Un canvas par carte, créé au premier survol, posé au-dessus de l'image.
 */
(function () {
  "use strict";

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var VERT = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}";
  var FRAG = [
    "precision mediump float;",
    "uniform sampler2D uTex;",
    "uniform vec2 uMouse;",
    "uniform vec2 uCover;",
    "uniform float uAspect;",
    "uniform float uHover;",
    "uniform float uTime;",
    "varying vec2 v;",
    "void main(){",
    "  vec2 uv=(v-.5)*uCover+.5;",
    "  vec2 d=(v-uMouse)*vec2(uAspect,1.);",
    "  float dist=length(d);",
    "  float wave=sin(dist*30.-uTime*4.5)*exp(-dist*4.5)*.014*uHover;",
    "  vec2 off=normalize(d+1e-5)*wave;",
    "  vec3 col=vec3(texture2D(uTex,uv+off*1.8).r,texture2D(uTex,uv+off).g,texture2D(uTex,uv+off*.3).b);",
    "  col+=vec3(.89,.78,.55)*exp(-dist*7.)*.16*uHover;",
    "  gl_FragColor=vec4(col,1.);",
    "}"
  ].join("\n");

  var active = [];
  var running = false;

  function setup(card) {
    var img = card.querySelector(".role__media img");
    if (!img || !img.complete || !img.naturalWidth) return null;
    var canvas = document.createElement("canvas");
    canvas.className = "role__gl";
    canvas.setAttribute("aria-hidden", "true");
    var gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) return null;

    function sh(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    card.appendChild(canvas);
    var fx = {
      card: card, canvas: canvas, gl: gl,
      u: {
        mouse: gl.getUniformLocation(prog, "uMouse"),
        cover: gl.getUniformLocation(prog, "uCover"),
        aspect: gl.getUniformLocation(prog, "uAspect"),
        hover: gl.getUniformLocation(prog, "uHover"),
        time: gl.getUniformLocation(prog, "uTime")
      },
      ratio: img.naturalWidth / img.naturalHeight,
      mx: .5, my: .5, tx: .5, ty: .5, hover: 0, target: 0
    };
    resize(fx);
    return fx;
  }

  function resize(fx) {
    var r = fx.card.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (fx.canvas.width !== w || fx.canvas.height !== h) {
      fx.canvas.width = w;
      fx.canvas.height = h;
      fx.gl.viewport(0, 0, w, h);
    }
    // Équivalent de object-fit: cover
    var box = r.width / Math.max(1, r.height);
    fx.gl.uniform2f(fx.u.cover, Math.min(1, box / fx.ratio), Math.min(1, fx.ratio / box));
    fx.gl.uniform1f(fx.u.aspect, box);
  }

  function loop(now) {
    running = false;
    active = active.filter(function (fx) {
      fx.hover += (fx.target - fx.hover) * 0.08;
      fx.mx += (fx.tx - fx.mx) * 0.12;
      fx.my += (fx.ty - fx.my) * 0.12;
      var gl = fx.gl;
      gl.uniform2f(fx.u.mouse, fx.mx, fx.my);
      gl.uniform1f(fx.u.hover, fx.hover);
      gl.uniform1f(fx.u.time, now / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      fx.canvas.style.opacity = String(Math.min(1, fx.hover * 1.4));
      return fx.target > 0 || fx.hover > 0.01;
    });
    if (active.length) { running = true; requestAnimationFrame(loop); }
  }
  function kick(fx) {
    if (active.indexOf(fx) === -1) active.push(fx);
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  function point(fx, e) {
    var r = fx.card.getBoundingClientRect();
    fx.tx = (e.clientX - r.left) / r.width;
    fx.ty = 1 - (e.clientY - r.top) / r.height;
  }

  // Délégation : les cartes sont recréées quand on change de langue.
  document.addEventListener("pointerover", function (e) {
    var card = e.target.closest && e.target.closest(".role");
    if (!card || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    if (!card._fx || !card.contains(card._fx.canvas)) card._fx = setup(card);
    var fx = card._fx;
    if (!fx) return;
    resize(fx);
    point(fx, e);
    fx.mx = fx.tx; fx.my = fx.ty;
    fx.target = 1;
    kick(fx);
  });
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(".role");
    if (card && card._fx) { point(card._fx, e); kick(card._fx); }
  }, { passive: true });
  document.addEventListener("pointerout", function (e) {
    var card = e.target.closest && e.target.closest(".role");
    if (!card || !card._fx || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    card._fx.target = 0;
    kick(card._fx);
  });
})();
