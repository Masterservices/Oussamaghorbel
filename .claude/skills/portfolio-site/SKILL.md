---
name: portfolio-site
description: Design system, motion design and content rules for Oussama Ghorbel's personal site (static HTML/CSS/JS on GitHub Pages, 4 languages, WebGL hero, GSAP animations). Use when adding a portfolio project, editing a section, changing animations or visuals, or adding a language string on this site.
---

# Site d'Oussama Ghorbel — guide de travail

Site statique servi par GitHub Pages depuis `main`, sans compilation. Aucun CDN : les
bibliothèques sont copiées dans `assets/vendor/` (GSAP, ScrollTrigger, Lenis).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Site (une page). Textes fixes marqués `data-i18n="clé"`. |
| `cv/index.html`, `cv/<slug>/index.html` | Pages CV **générées** par `tools/build-cv.mjs` à partir de `tools/cv-template.html` : ne pas les modifier à la main. `cv.html` redirige vers `cv/`. |
| `assets/js/cv.js` + `assets/css/cv.css` | CV interactif : couverture WebGL + parallaxe, atouts, filtres par axe, missions dépliables, 4 langues, menu de téléchargement des PDF, impression A4 sur 2 pages. |
| `assets/js/distort.js` | Survol WebGL des portraits des rôles (souris uniquement, hors mouvement réduit). |
| `assets/js/i18n.js` | Textes de l'interface en `fr`, `en`, `ar`, `ru`. Toute clé ajoutée doit exister dans les 4 langues. |
| `assets/js/content.js` | **Source unique du site et du CV** : `PROFILE`, `domains`, `STATUS`, `ROLES`, `CASES`, `PROJECTS`, `METHOD`, `SERVICES`, `VISION`, `EXPERIENCE`, `EDUCATION`, `TRAINING`, `LANGUAGES`, `SKILLS`, date `updated`. |
| `assets/js/site.js` | Rendu, langue, filtres. Émet `site:render` et `site:filter` sur `document`. |
| `assets/js/gl.js` | Shader WebGL (étoffe de soie animée), sur chaque `<canvas data-silk>` : section Contact et couverture du CV (`data-silk="center"`). |
| `assets/js/sparkles.js` | Éclats dorés en parallaxe sur l'en-tête vidéo (calque arrière optionnel), traînée d'éclats sous la souris. |
| `assets/js/video.js` | Vidéo plein écran de l'en-tête (format cinéma) : version mobile sous 700 px, lecture auto sans son, minutage et barre de lecture cliquable, bouton « Regarder avec le son » (repart du début avec le son), pause et son. |
| `assets/video/` | `showreel.mp4` (720p), `showreel-mobile.mp4` (480p), `showreel-poster.jpg`. |
| `assets/js/motion.js` | Préchargeur, intro, Lenis, parallaxe, apparitions au scroll, marquee, curseur, boutons magnétiques. |
| `assets/css/site.css` | Mise en page et thème. `assets/css/motion.css` : styles propres aux animations. |
| `assets/img/` | Images web. `logo.svg` / `logo-dark.svg` (monogramme OG serif), `favicon.svg`, `og-image.jpg` (partage). |

## Mettre à jour le portfolio et le CV (à chaque nouvelle info)

Oussama envoie régulièrement de nouvelles informations. Tout passe par `assets/js/content.js` :
le site et le CV se mettent à jour ensemble. Toujours changer `updated` (date affichée en pied de CV).

- **Nouveau projet récent** : objet dans `CASES` (en tête) avec `id`, `status` (`live`, `delivered`,
  `wip`, `concept`, `done`), `domains` (`consulting`, `business`, `engineering`, `digital`), `kind`,
  `title`, `context`, `did` (liste), `stack`, et `image` (capture réelle, 1600×1200 WebP) ou `mock`
  (aperçu illustratif, marqué comme tel). `link` si le projet est en ligne.
- **Ancien projet** : `PROJECTS` (archives 2010–2014).
- **Nouvelle expérience** : `EXPERIENCE` (ordre antichronologique), avec `axes` et `points`.
- Textes en 4 langues `{ fr, en, ar, ru }`.

## CV ciblés (un par poste) et PDF

- `CV_TARGETS` dans `content.js` : une entrée par poste (`seo`, `business-developer`, `project-manager`,
  `textile-engineer`, `developer`). Chaque entrée : `file` (nom des PDF), `photo` (portrait de couverture), `short`, `title`,
  `summary`, `highlights` (4 atouts), `key` (ids d'`EXPERIENCE` détaillées ; les autres tiennent en une ligne),
  `projects` / `detail` (ids de `CASES` ou `PROJECTS`), `skills` (ids de `SKILLS`), `vision` (ids de `VISION`).
- Les CV ciblés ne sont **jamais liés depuis le site** (demande d'Oussama : il envoie le lien aux recruteurs) et
  portent `noindex`. Seul le CV général (`cv/`) est lié et indexé.
- Après toute modification du CV : `node tools/build-cv.mjs --pdf` (pages + 24 PDF). Vérifier dans la sortie
  que chaque PDF fait 2 pages. Dans un conteneur avec proxy, le script passe `--proxy-server` à Chromium
  (l'option `proxy` de Playwright envoie aussi 127.0.0.1 au proxy).
- Chaque texte d'un CV ciblé reste factuel : il réorganise et met en avant des faits déjà présents, sans rien ajouter.
- Générateur (`cv/generateur/`, `assets/js/cv-generator.js`, `assets/css/cv-generator.css`) : page écrite à la main,
  non générée par le script, `noindex`, jamais liée. Il détecte les thèmes de `CV_GENERATOR.topics` (mots-clés
  sans accents, 4 langues), score chaque élément par ses `CV_GENERATOR.tags`, ajoute un bonus dégressif aux
  éléments du profil de départ le plus proche (`bases`), puis écrit le choix dans un lien lisible (demande d'Oussama : pas de lettres au hasard) :
  `/cv/?poste=Chargé+SEO&profil=seo&lang=fr&exp=ms,ifaco&projets=…&details=…&competences=…&ambitions=…&atouts=seo.0,…&plus=Git`.
  Seules les listes qui diffèrent du profil de départ sont écrites ; une liste absente reprend celle du profil
  (tout le contenu pour `profil=general`). Accents, arabe et cyrillique restent en clair. L'ancien format
  `?g=` (base64 d'un JSON `{t, b, k, p, d, s, v, h, x}`) reste lu pour les liens déjà envoyés. `cv.js` relit ce lien, ne garde que des
  identifiants existants et propose « Enregistrer en PDF » (impression) à la place des PDF préparés.
  Toute nouvelle expérience, tout projet, groupe de compétences ou ambition doit recevoir ses tags, et tout
  nouvel atout un champ `tags`.
- Adéquation au poste (générateur) : `CV_GENERATOR.requirements` liste ~80 compétences courantes
  (`[libellé, [motifs sans accents], codeLangue?]`). Le générateur repère celles de l'annonce, vérifie si elles
  figurent déjà dans le texte du CV (4 langues), propose « Je l'ai » pour les autres (ajoutées au CV généré dans
  « Autres compétences », champ `x` du lien, 12 au plus) et calcule une note /100 : 60 % compétences couvertes,
  30 % thèmes de l'annonce présents dans les expériences retenues, 10 % années d'expérience demandées
  (depuis 2010, hors stages). C'est une estimation affichée comme telle, jamais une garantie.
  `CV_GENERATOR.expected` propose aussi, par thème dominant (≥ 50 % du plus fort), les compétences souvent
  attendues que l'annonce ne cite pas ; elles comptent pour moitié dans la note. Sans texte d'annonce, la note
  est plafonnée à 70. Le bouton « Chercher plus de compétences adéquates » montre 8 compétences voisines de plus
  à chaque clic (`CV_GENERATOR.more` des thèmes dominants, puis tous les thèmes repérés, puis ceux du profil de départ),
  avec « Je l'ai » ; elles ne changent pas la note. Tout libellé de `expected` ou `more` doit exister dans
  `requirements`. Le générateur ne cherche rien sur le web.
- Historique du générateur : `localStorage` clé `og-cv-history` (100 entrées max : poste, annonce, profil,
  langue, compétences ajoutées, réglages, note, lien), avec réouverture pour modifier, suppression, export et
  import JSON. Il reste dans le navigateur d'Oussama ; l'export sert de sauvegarde ou de transfert.
- RusStudy : blog de plus de 300 pages indexées par Google (confirmé par Oussama).

## Traductions

Pas de traduction mot à mot (demande explicite d'Oussama). Chaque langue doit sonner comme écrite par un
professionnel natif : arabe standard compris au Maghreb comme au Golfe (pas de termes uniquement tunisiens :
« الاحتياجات » plutôt que « الحاجيات », « مزوّدو الخدمات » plutôt que « المزوّدين »), russe des recruteurs
(« менеджер по развитию бизнеса », pas « бизнес-девелопер »), anglais britannique sans gallicismes.
En français, espace insécable avant ; : ? ! et après «.

Faits confirmés par Oussama (à respecter dans toutes les langues) :
- Kenzalou Confection (2014) : intitulé « COO » (Chief Operating Officer), abréviation à garder.
- Lectra, Gerber, CLO 3D : appris en autodidacte, pratiqués un peu chez Christine Confection et en freelance ;
  ne pas les rattacher à DUOACCESSORIES ni à un autre employeur.

Règles (briefs d'Oussama) : ne rien inventer (diplômes, clients, chiffres, résultats) ; ne jamais
présenter un concept ou une maquette comme livré ; signaler les contradictions et demander confirmation ;
ne pas publier de données personnelles sensibles (adresse, date de naissance). Les anciens CV PDF de 2017
ont été retirés pour cette raison.

Capture d'un site en ligne : Playwright avec le proxy (`chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } })`),
puis composition ordinateur + téléphone (voir `case-russtudy.webp`).

## Détourage (si besoin)

Les poses détourées ont été retirées du site à la demande d'Oussama (« les photos en bas ne servent à rien »),
ainsi que la galerie de 2014–2017. La méthode reste valable pour un futur visuel : : choisir l'image la plus nette du plan (variance du laplacien sur le visage),
détourer avec `rembg` + `birefnet-portrait` (venv dans le dossier temporaire, pas dans le dépôt),
recalculer les couleurs des bords avec `pymatting.estimate_foreground_ml`, rogner, agrandir de 1,25×
avec un léger accentuage, puis mettre à zéro l'alpha résiduel (< 24) pour éviter un voile autour.
Sur fond clair, ne pas mettre d'ombre portée : le masque de fondu la coupe net en haut.
Ne pas réutiliser le portrait « chaise en bois » envoyé avec la vidéo : Oussama a demandé de le retirer.

## Rôles (filmographie)

Section `#roles` juste après les chiffres : une bande de portraits 3:4 tirés de la vidéo, une tenue
par rôle (`ROLES` dans `content.js`, images `assets/img/role-*.webp`, 720×960). Sur ordinateur, la
section est épinglée et la bande défile à l'horizontale pendant le scroll (compteur 01/06 et barre).
Sur mobile et en mouvement réduit, c'est un défilement horizontal natif avec aimantation.
Tous les portraits ont exactement le même cadre 3:4, alignés sur la même ligne (pas de décalage en quinconce : Oussama trouvait les tailles différentes peu soignées).
Portraits : image la plus nette du plan, recadrage 540×720 centré sur la personne, agrandi à 720×960,
léger accentuage, contraste +8 %, saturation −8 %, vignettage doux. Affichés en noir et blanc,
ils passent en couleur au survol ou quand ils sont au centre.
Ne pas utiliser les plans au sweat jaune (liés à la marque « Lemoon »).

## Logo

Monogramme « OG » : O droit (Cormorant Garamond, graisse 400) en or, G italique (graisse 500) en ivoire,
dans un double anneau fin avec un petit losange. Les lettres sont vectorisées avec fontTools
(chemins SVG, aucune police nécessaire à l'affichage). `logo-dark.svg` sert sur fond clair.
Le préchargeur dessine ces mêmes chemins au trait, puis les remplit.

## Vidéo

- Encodage : H.264 `-crf 27 -preset slow -movflags +faststart`, AAC 96k ; version mobile 854 px de large, CRF 29, AAC 64k.
- Retirer tout plan montrant une marque tierce (le montage d'origine contenait des plans « Lemoon », coupés).
- Le Chromium de test n'a pas H.264 : pour tester la lecture, encoder une copie WebM temporaire et la servir à la place des .mp4 via `page.route`, sans la committer.

## Identité visuelle

- Couleurs : encre `#0e0f14`, ivoire `#f6f2ea`, champagne `#c9a96e` / `#e3cc98`, or foncé `#8c6d32`.
  Domaines : business `#b08d4f`, textile `#a4704f`, it `#5d7085`, research `#7a6a86`.
- Polices : Cormorant Garamond pour les titres (romain + italique, latin et cyrillique), Manrope pour le texte,
  Amiri pour les titres arabes et Noto Kufi Arabic pour le texte arabe.
- Ton : éditorial et sobre. Filets de 1 px, angles à 4 px, petites capitales espacées pour les libellés,
  pas de couleurs vives : les domaines sont des nuances autour du champagne.
- Le nom « Oussama Ghorbel » reste en lettres latines dans toutes les langues.
- L'arabe passe la page en `dir="rtl"` : utiliser des propriétés logiques
  (`inset-inline-start`, `margin-inline-start`…) plutôt que left/right.

## Règles de motion

- Courbes : `expo.out` pour les entrées, `power3.out` pour les apparitions, durées de 0,9 à 1,4 s.
- Ne jamais découper en lettres un texte traduit (ça casse la liaison des lettres arabes).
  Pour les titres, utiliser le rideau `clip-path` déjà en place.
- Les éléments générés par `site.js` sont animés via `ScrollTrigger.batch` dans `animateDynamic()` ;
  un nouveau type de liste doit y être ajouté.
- Respecter `prefers-reduced-motion` : `motion.js` s'arrête tôt et affiche tout ; `gl.js` dessine une image fixe.
- Parallaxe souris : ajouter `data-depth="0.2…1.6"` à un élément du hero.
- Performance : le shader tourne à résolution réduite et s'arrête hors écran ; garder le hero sous 1 Mo d'images.

## Vérifier avant de publier

```
python3 -m http.server 8765
```

Avec Playwright (Chromium est préinstallé dans les sessions cloud), ouvrir
`http://127.0.0.1:8765/?lang=fr|en|ar|ru` en 1440×900 et 390×844 et vérifier :
pas d'erreur console, pas de défilement horizontal (`scrollWidth` = largeur),
le hero après l'intro (~5 s), et un contexte `reducedMotion: 'reduce'`.
Pour le WebGL en headless : `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.
