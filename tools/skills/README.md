# Dictionnaire de compétences (sources)

Un fichier par secteur. `node tools/build-skills.mjs` vérifie les sources et écrit
`assets/js/skills-dict.js` (chargé par le générateur de CV uniquement).

Format :

    # topics: web            thèmes du fichier (ids de CV_GENERATOR.topics)
    ## Front-end             groupe : les compétences d'un même groupe sont « liées »
    fr | en | ar | ru | motifs ; séparés ; par ; des points-virgules | niveau | catégorie | thèmes en plus

- `=` dans en, ar ou ru : même libellé qu'en français (marques, logiciels).
- Motifs : en minuscules, sans accents. Les libellés simples sont ajoutés d'office.
  Un motif de 3 caractères ou moins doit être sans ambiguïté (« sql » oui, « ai » non).
- Niveau : `c` courant (demandé dans la plupart des offres du thème), `f` fréquent, `s` spécialisé.
- Catégorie : `o` outil, `m` méthode, `n` norme ou certification, `t` savoir-faire métier,
  `x` compétence transverse, `l` langue.
