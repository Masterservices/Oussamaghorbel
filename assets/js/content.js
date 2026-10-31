/*
 * Contenu du site et du CV — Oussama Ghorbel
 * -------------------------------------------
 * Source unique : le site (index.html) et le CV interactif (cv.html) lisent ce fichier.
 * Pour mettre à jour le portfolio ou le CV, il suffit de modifier les données ci-dessous,
 * puis la date « updated ».
 *
 * Chaque texte existe en 4 langues : { fr, en, ar, ru }. Si une langue manque,
 * le site affiche l'anglais, puis le français.
 *
 * Axes (domains) : consulting, business, engineering, digital.
 * Statuts des projets (STATUS) : live, delivered, wip, concept, done.
 */

window.SITE_CONTENT = {
  updated: "2026-10-30",
  PROFILE: {
    name: "Oussama Ghorbel",
    title: { fr: "Consultant · Chef de projet · Business developer", en: "Consultant · Project manager · Business developer", ar: "مستشار · مدير مشاريع · مطوّر أعمال", ru: "Консультант · Руководитель проектов · Менеджер по развитию бизнеса" },
    tagline: { fr: "Ingénierie textile · Conseil aux entreprises · Transformation digitale · Innovation & R&D", en: "Textile engineering · Business consulting · Digital transformation · Innovation & R&D", ar: "هندسة النسيج · استشارات الأعمال · التحوّل الرقمي · الابتكار والبحث والتطوير", ru: "Текстильная инженерия · Консалтинг · Цифровая трансформация · Инновации и R&D" },
    summary: { fr: "Professionnel multidisciplinaire de formation ingénieur, avec un parcours couvrant l'ingénierie textile, le conseil, la gestion de projet, le développement commercial et les technologies numériques. Ma valeur ajoutée : relier les dimensions techniques, commerciales, humaines et stratégiques d'un projet — comprendre le besoin, analyser la situation, structurer une solution, coordonner les ressources et contribuer à sa mise en œuvre.", en: "A multidisciplinary professional with an engineering background and experience spanning textile engineering, consulting, project management, business development and digital technology. My strength lies in connecting the technical, commercial, human and strategic aspects of a project — understanding the need, analysing the situation, structuring a solution, coordinating resources and helping deliver it.", ar: "مهني متعدّد التخصّصات ذو خلفية هندسية، بمسيرة تمتدّ من هندسة النسيج إلى الاستشارات وإدارة المشاريع وتطوير الأعمال والتقنيات الرقمية. ما أقدّمه: الربط بين الجوانب التقنية والتجارية والبشرية والاستراتيجية لأيّ مشروع — فهم الحاجة، وتحليل الوضع، وبلورة الحلّ، وتنسيق الموارد، والإسهام في تنفيذه.", ru: "Специалист широкого профиля с инженерным образованием и опытом в текстильной инженерии, консалтинге, управлении проектами, развитии бизнеса и цифровых технологиях. Моя сильная сторона — увязывать технические, коммерческие, человеческие и стратегические аспекты проекта: понять задачу, проанализировать ситуацию, выстроить решение, скоординировать ресурсы и участвовать в его внедрении." },
    location: { fr: "Toula, Russie", en: "Tula, Russia", ar: "تولا، روسيا", ru: "Тула, Россия" },
    email: "master.services.ad.001@gmail.com",
    phone: "+7 996 433-44-89",
    site: "oussamaghorbel.vercel.app",
    // Points forts du CV général (les CV ciblés ont les leurs dans CV_TARGETS)
    highlights: [
      { tags: ["engineering", "data"], title: { fr: "Double formation d'ingénieur", en: "Engineering background", ar: "تأهيل هندسي مزدوج", ru: "Два инженерных образования" }, text: { fr: "Diplôme d'ingénieur textile (ENIM) et mastère en ingénierie mathématique (École Polytechnique de Tunisie).", en: "Textile engineering degree (ENIM) and a master's in mathematical engineering (Tunisia Polytechnic School).", ar: "شهادة مهندس في النسيج من المدرسة الوطنية للمهندسين بالمنستير، وماجستير في الهندسة الرياضية من المدرسة التونسية للتقنيات.", ru: "Диплом инженера-текстильщика (ENIM) и магистратура по математической инженерии (Политехническая школа Туниса)." } },
      { tags: ["textile", "quality", "project"], title: { fr: "Terrain industriel", en: "Shop-floor experience", ar: "خبرة ميدانية في الصناعة", ru: "Опыт на производстве" }, text: { fr: "Contrôle qualité, direction des opérations, puis responsable d'un département textile (2015–2018).", en: "Quality control and operations management, then head of a textile department (2015–2018).", ar: "مراقبة الجودة وإدارة العمليات، ثم رئاسة قسم للنسيج (2015–2018).", ru: "Контроль качества, операционное управление, затем руководство текстильным отделом (2015–2018)." } },
      { tags: ["business"], title: { fr: "Développement commercial", en: "Business development", ar: "تطوير الأعمال", ru: "Развитие бизнеса" }, text: { fr: "Prospection, partenariats et lancement d'activités, dont une société de tourisme médical (2019).", en: "Prospecting, partnerships and new ventures, including a medical-tourism company (2019).", ar: "البحث عن العملاء، وعقد الشراكات، وإطلاق مشاريع جديدة، من بينها شركة للسياحة العلاجية (2019).", ru: "Поиск клиентов, партнёрства и запуск бизнес-проектов, в том числе компании в сфере медицинского туризма (2019)." } },
      { tags: ["web", "seo", "erp"], title: { fr: "Digital", en: "Digital", ar: "الرقمنة", ru: "Цифровые проекты" }, text: { fr: "Sites multilingues et SEO, plateformes web, adaptation d'ERP (Odoo, Dolibarr) et outils d'IA.", en: "Multilingual websites and SEO, web platforms, ERP customisation (Odoo, Dolibarr) and AI tools.", ar: "مواقع متعدّدة اللغات وتحسين محرّكات البحث (SEO)، ومنصّات ويب، وتكييف أنظمة ERP (Odoo وDolibarr)، وأدوات الذكاء الاصطناعي.", ru: "Многоязычные сайты и SEO, веб-платформы, настройка ERP (Odoo, Dolibarr) и инструменты ИИ." } }
    ]
  },
  domains: {
    consulting: { fr: "Conseil & gestion de projet", en: "Consulting & project management", ar: "الاستشارات وإدارة المشاريع", ru: "Консалтинг и управление проектами" },
    business: { fr: "Développement commercial", en: "Business development", ar: "تطوير الأعمال", ru: "Развитие бизнеса" },
    engineering: { fr: "Ingénierie & R&D", en: "Engineering & R&D", ar: "الهندسة والبحث والتطوير", ru: "Инженерия и R&D" },
    digital: { fr: "Digital & IA", en: "Digital & AI", ar: "الرقمنة والذكاء الاصطناعي", ru: "Цифровые технологии и ИИ" }
  },
  STATUS: {
    live: { fr: "En ligne", en: "Live", ar: "منشور", ru: "Онлайн" },
    delivered: { fr: "Livré", en: "Delivered", ar: "تمّ التسليم", ru: "Сдан" },
    wip: { fr: "En cours", en: "In progress", ar: "قيد الإنجاز", ru: "В работе" },
    concept: { fr: "Concept", en: "Concept", ar: "تصوّر", ru: "Концепция" },
    done: { fr: "Réalisé", en: "Completed", ar: "منجز", ru: "Завершён" }
  },
  ROLES: [
    {
      img: "assets/img/role-leader.webp",
      title: { fr: "Le Chef de projet", en: "The Project Manager", ar: "مدير المشاريع", ru: "Руководитель проектов" },
      genre: { fr: "Structuration · Coordination", en: "Planning · Coordination", ar: "الهيكلة · التنسيق", ru: "Структурирование · Координация" }
    },
    {
      img: "assets/img/role-entrepreneur.webp",
      title: { fr: "L'Entrepreneur", en: "The Entrepreneur", ar: "رائد الأعمال", ru: "Предприниматель" },
      genre: { fr: "Lancement d'activités", en: "Launching businesses", ar: "إطلاق المشاريع", ru: "Запуск бизнеса" }
    },
    {
      img: "assets/img/role-speaker.webp",
      title: { fr: "Le Consultant", en: "The Consultant", ar: "المستشار", ru: "Консультант" },
      genre: { fr: "Conseil · Accompagnement", en: "Advisory · Coaching", ar: "الاستشارات · التوجيه", ru: "Консалтинг · Сопровождение" }
    },
    {
      img: "assets/img/role-textile.webp",
      title: { fr: "L'Ingénieur textile", en: "The Textile Engineer", ar: "مهندس النسيج", ru: "Инженер-текстильщик" },
      genre: { fr: "R&D · Production · Qualité", en: "R&D · Production · Quality", ar: "البحث والتطوير · الإنتاج · الجودة", ru: "R&D · Производство · Качество" }
    },
    {
      img: "assets/img/role-engineer.webp",
      title: { fr: "Le Business Developer", en: "The Business Developer", ar: "مطوّر الأعمال", ru: "Менеджер по развитию бизнеса" },
      genre: { fr: "Clients · Partenariats", en: "Clients · Partnerships", ar: "العملاء · الشراكات", ru: "Клиенты · Партнёрства" }
    },
    {
      img: "assets/img/role-creator.webp",
      title: { fr: "Le Créateur numérique", en: "The Digital Creator", ar: "المبدع الرقمي", ru: "Digital-специалист" },
      genre: { fr: "Web · IA · Image", en: "Web · AI · Visuals", ar: "الويب · الذكاء الاصطناعي · المحتوى البصري", ru: "Веб · ИИ · Графика" }
    }
  ],
  CASES: [
    {
      id: "russtudy",
      status: "live",
      domains: ["digital", "business"],
      image: "assets/img/case-russtudy.webp",
      link: "https://www.russieetudes.com",
      kind: { fr: "Plateforme web · Éducation", en: "Web platform · Education", ar: "منصّة ويب · التعليم", ru: "Веб-платформа · Образование" },
      title: { fr: "RusStudy", en: "RusStudy", ar: "RusStudy", ru: "RusStudy" },
      context: { fr: "Agence qui accompagne des étudiants, surtout de Tunisie, du Maroc et d'Algérie, dans leur inscription en université russe. Il fallait un site qui inspire confiance en arabe comme en français, et un outil pour suivre chaque dossier.", en: "An agency helping students, mostly from Tunisia, Morocco and Algeria, enrol in Russian universities. It needed a site that inspires trust in both Arabic and French, plus a tool to track each application.", ar: "وكالة تساعد الطلاب، ولا سيّما من تونس والمغرب والجزائر، على التسجيل في الجامعات الروسية. كانت بحاجة إلى موقع يبعث على الثقة بالعربية والفرنسية على حدّ سواء، وإلى أداة لمتابعة كل ملف.", ru: "Агентство, которое помогает студентам, в основном из Туниса, Марокко и Алжира, поступить в российские вузы. Нужен был сайт, который вызывает доверие как на арабском, так и на французском, а также инструмент для ведения каждой заявки." },
      did: [
        { fr: "Site en 4 langues (FR, AR, EN, RU), avec mise en page de droite à gauche pour l'arabe", en: "4-language site (FR, AR, EN, RU) with right-to-left layout for Arabic", ar: "موقع بأربع لغات (الفرنسية والعربية والإنجليزية والروسية)، مع واجهة من اليمين إلى اليسار للنسخة العربية", ru: "Сайт на 4 языках (FR, AR, EN, RU) с вёрсткой справа налево для арабского" },
        { fr: "SEO : hreflang, données structurées, sitemap, et un blog de plus de 300 pages indexées par Google", en: "SEO: hreflang, structured data, sitemap, and a blog with over 300 pages indexed by Google", ar: "تحسين محرّكات البحث (SEO): وسوم hreflang، والبيانات المنظّمة، وخريطة الموقع، ومدوّنة تضمّ أكثر من 300 صفحة مفهرسة في Google", ru: "SEO: hreflang, микроразметка, карта сайта и блог — более 300 страниц в индексе Google" },
        { fr: "Formulaire de candidature rapide et parcours de conversion en plusieurs étapes", en: "Quick application form and multi-step conversion funnel", ar: "نموذج تقديم سريع ومسار تحويل متعدّد المراحل", ru: "Быстрая форма заявки и многошаговая воронка конверсии" },
        { fr: "Espace de suivi des dossiers avec rôles admin, consultant et étudiant", en: "Application-tracking portal with admin, consultant and student roles", ar: "بوابة لمتابعة الملفات بأدوار للمشرف والمستشار والطالب", ru: "Личный кабинет для отслеживания заявок с ролями администратора, консультанта и студента" }
      ],
      stack: ["React", "Node.js", "Supabase", "Vercel", "SEO"]
    },
    {
      id: "permagroup",
      status: "delivered",
      domains: ["business", "digital"],
      mock: "pg",
      kind: { fr: "Lancement d'activité · Tourisme médical", en: "Business launch · Medical tourism", ar: "إطلاق مشروع · السياحة العلاجية", ru: "Запуск бизнеса · Медицинский туризм" },
      title: { fr: "PermaGroup", en: "PermaGroup", ar: "PermaGroup", ru: "PermaGroup" },
      context: { fr: "Société de tourisme médical en Tunisie qui s'adresse à une clientèle française et européenne. Participation au lancement de l'activité en 2019, puis refonte de la page d'accueil pour un rendu haut de gamme qui rassure avant un voyage pour une intervention.", en: "A Tunisian medical-tourism company serving French and European clients. Helped launch the business in 2019, then redesigned its landing page with a premium look that reassures patients before they travel for treatment.", ar: "شركة سياحة علاجية في تونس تستهدف عملاء من فرنسا وأوروبا. شاركتُ في إطلاق المشروع سنة 2019، ثم أعدتُ تصميم الصفحة الرئيسية لتقدّم صورة راقية تبعث الطمأنينة في نفس المريض قبل سفره للعلاج.", ru: "Тунисская компания в сфере медицинского туризма для клиентов из Франции и других стран Европы. В 2019 году участвовал в запуске бизнеса, затем сделал редизайн главной страницы в премиальном стиле, который внушает пациенту доверие перед поездкой на лечение." },
      did: [
        { fr: "Structuration initiale, identité de marque et processus commerciaux (2019)", en: "Initial business set-up, brand identity and sales processes (2019)", ar: "الهيكلة الأولية، والهوية البصرية، وعمليات البيع (2019)", ru: "Начальная организация бизнеса, фирменный стиль и процессы продаж (2019)" },
        { fr: "Coordination des prestataires en design et développement web, visibilité numérique", en: "Coordination of design and web-development contractors; online visibility", ar: "تنسيق مزوّدي خدمات التصميم وتطوير الويب، وتعزيز الحضور الرقمي", ru: "Координация подрядчиков по дизайну и веб-разработке, продвижение в интернете" },
        { fr: "Refonte de la landing page : direction artistique ivoire, noir et or, huit fiches d'intervention", en: "Landing-page redesign: ivory, black and gold art direction and eight treatment cards", ar: "إعادة تصميم صفحة الهبوط: هوية بصرية بألوان العاجي والأسود والذهبي، وثماني بطاقات للإجراءات العلاجية", ru: "Редизайн лендинга: визуальный стиль в цветах слоновой кости, чёрного и золота, восемь карточек процедур" }
      ],
      stack: ["HTML / CSS", "Responsive", "Direction artistique"]
    },
    {
      id: "yulia",
      status: "delivered",
      domains: ["digital"],
      mock: "yg",
      kind: { fr: "Site vitrine · Beauté", en: "Portfolio website · Beauty", ar: "موقع تعريفي · التجميل", ru: "Сайт-визитка · Красота" },
      title: { fr: "Yulia Gorbel", en: "Yulia Gorbel", ar: "Yulia Gorbel", ru: "Юлия Горбель" },
      context: { fr: "Coiffeuse indépendante en Russie. Son travail se juge sur le résultat : le site met les transformations au premier plan. Essayez le curseur sur l'aperçu.", en: "An independent hairdresser in Russia. Her work is judged on results, so the site puts her transformations front and centre. Try the slider on the preview.", ar: "مصفّفة شعر مستقلّة في روسيا. يُحكم على عملها بالنتيجة، لذلك يُبرز الموقع صور التحوّل قبل وبعد. جرّب شريط المقارنة على المعاينة.", ru: "Частный мастер-парикмахер в России. Её работу оценивают по результату, поэтому сайт выводит на первый план преображения клиентов. Попробуйте подвигать ползунок на превью." },
      did: [
        { fr: "Site complet en russe, esthétique éditoriale sombre", en: "Full site in Russian with a dark editorial look", ar: "موقع كامل بالروسية بأسلوب تحريري داكن", ru: "Сайт полностью на русском, в тёмном журнальном стиле" },
        { fr: "Comparateurs avant / après déplaçables au doigt", en: "Swipeable before / after sliders", ar: "أشرطة مقارنة قبل / بعد تُسحب بالإصبع", ru: "Слайдеры «до / после», которые можно двигать пальцем" },
        { fr: "Traitement des photos et typographie cyrillique soignée", en: "Photo retouching and refined Cyrillic typography", ar: "معالجة الصور، وعناية خاصة بالخطوط السيريلية", ru: "Обработка фото и продуманная кириллическая типографика" }
      ],
      stack: ["HTML / CSS / JS", "Cyrillique", "Retouche image"]
    },
    {
      id: "nurens",
      status: "delivered",
      domains: ["digital", "business"],
      mock: "nu",
      kind: { fr: "Contenu visuel · Cosmétique", en: "Visual content · Cosmetics", ar: "محتوى بصري · مستحضرات التجميل", ru: "Визуальный контент · Косметика" },
      title: { fr: "Nurens", en: "Nurens", ar: "Nurens", ru: "Nurens" },
      context: { fr: "Marque de sérums pour la peau. Besoin de visuels produits et d'une vidéo prêts pour les réseaux sociaux, sans organiser de shooting.", en: "A skin-serum brand that needed product visuals and a video ready for social media, without organising a photo shoot.", ar: "علامة تجارية لأمصال البشرة احتاجت إلى صور للمنتجات وفيديو جاهزين للنشر على مواقع التواصل الاجتماعي، دون تنظيم جلسة تصوير.", ru: "Бренду сывороток для кожи нужны были визуалы и видео продукта для соцсетей — без организации съёмки." },
      did: [
        { fr: "Composition des quatre sérums dans un visuel marketing carré 1080 × 1080", en: "All four serums composited into a square 1080 × 1080 marketing visual", ar: "تركيب الأمصال الأربعة في صورة تسويقية مربّعة 1080 × 1080", ru: "Четыре сыворотки в одном квадратном рекламном визуале 1080 × 1080" },
        { fr: "Vidéo produit générée par IA puis retravaillée : étalonnage, titres, vignettage", en: "AI-generated product video, refined in post-production: colour grading, titles, vignetting", ar: "فيديو للمنتج أُنتج بالذكاء الاصطناعي ثم أُعيدت معالجته: تصحيح الألوان، والعناوين، وتظليل الحواف", ru: "Видео продукта, сгенерированное ИИ и доработанное: цветокоррекция, титры, виньетирование" }
      ],
      stack: ["Vidéo IA", "FFmpeg", "Compositing"]
    },
    {
      id: "duo",
      year: "2020",
      status: "done",
      domains: ["engineering", "business"],
      mock: "duo",
      kind: { fr: "R&D textile · DuoMaghreb", en: "Textile R&D · DuoMaghreb", ar: "بحث وتطوير في النسيج · DuoMaghreb", ru: "R&D в текстиле · DuoMaghreb" },
      title: { fr: "DUOACCESSORIES", en: "DUOACCESSORIES", ar: "DUOACCESSORIES", ru: "DUOACCESSORIES" },
      context: { fr: "Ingénieur R&D textile chez DuoMaghreb : développement d'accessoires textiles et structuration de la marque DUOACCESSORIES.", en: "Textile R&D engineer at DuoMaghreb: developing textile accessories and building the DUOACCESSORIES brand.", ar: "مهندس بحث وتطوير في النسيج لدى DuoMaghreb: تطوير إكسسوارات نسيجية وبناء العلامة التجارية DUOACCESSORIES.", ru: "Инженер R&D по текстилю в DuoMaghreb: разработка текстильных аксессуаров и выстраивание бренда DUOACCESSORIES." },
      did: [
        { fr: "Développement de produits, du patronage et de la confection aux méthodes de production", en: "Developed products, from pattern-making and sewing to production methods", ar: "تطوير المنتجات، من إعداد الباترونات والخياطة إلى أساليب الإنتاج", ru: "Разработка изделий: от лекал и пошива до технологии производства" },
        { fr: "Présence web et marque ; recherche de débouchés, notamment en grandes surfaces", en: "Built the web presence and brand; sought outlets, notably with large retailers", ar: "الحضور على الويب والعلامة التجارية؛ والبحث عن منافذ بيع، لا سيّما لدى المتاجر الكبرى", ru: "Присутствие в интернете и бренд; поиск каналов сбыта, в том числе в крупных торговых сетях" },
        { fr: "Suivi des prestataires pour la mise en place d'un système GPAO", en: "Oversaw the contractors setting up a production-management (GPAO) system", ar: "متابعة مزوّدي الخدمات لإرساء نظام محوسب لإدارة الإنتاج (GPAO)", ru: "Курирование подрядчиков при внедрении системы управления производством" },
        { fr: "Participation à l'organisation de l'activité et aux ressources humaines", en: "Helped organise operations and human resources", ar: "المساهمة في تنظيم سير العمل وإدارة الموارد البشرية", ru: "Участие в организации деятельности и работе с персоналом" }
      ],
      stack: ["Patronage", "Confection", "GPAO", "Marque"]
    },
    {
      id: "ifaco",
      year: "2021",
      status: "done",
      domains: ["business", "digital", "consulting"],
      mock: "ifaco",
      kind: { fr: "Conseil · Marque et acquisition", en: "Consulting · Branding and client acquisition", ar: "استشارات · العلامة التجارية واستقطاب العملاء", ru: "Консалтинг · Бренд и привлечение клиентов" },
      title: { fr: "IFACO", en: "IFACO", ar: "IFACO", ru: "IFACO" },
      context: { fr: "Mission de consultant et business developer : relier positionnement commercial, communication digitale et développement des ventes.", en: "Consulting and business-development assignment linking market positioning, digital communications and sales growth.", ar: "مهمّة بصفة مستشار ومطوّر أعمال، هدفها الربط بين التموضع التجاري والتواصل الرقمي وتنمية المبيعات.", ru: "Работа в качестве консультанта и менеджера по развитию бизнеса: увязать коммерческое позиционирование, цифровые коммуникации и рост продаж." },
      did: [
        { fr: "Travail sur l'image de marque", en: "Worked on brand image", ar: "العمل على صورة العلامة التجارية", ru: "Работа над имиджем бренда" },
        { fr: "Contribution au site web", en: "Contributed to the website", ar: "المساهمة في إنجاز الموقع الإلكتروني", ru: "Участие в создании сайта" },
        { fr: "Stratégie d'acquisition de clients", en: "Shaped the client-acquisition strategy", ar: "استراتيجية استقطاب العملاء", ru: "Стратегия привлечения клиентов" }
      ],
      stack: ["Branding", "Site web", "Acquisition"]
    },
    {
      id: "intellect",
      status: "concept",
      domains: ["digital", "consulting"],
      mock: "intellect",
      kind: { fr: "Concept de site · Langues et études", en: "Site concept · Languages and study abroad", ar: "تصوّر لموقع · اللغات والدراسة", ru: "Концепция сайта · Языки и образование" },
      title: { fr: "Intellect", en: "Intellect", ar: "Intellect", ru: "Intellect" },
      context: { fr: "Concept de site pour des cours d'allemand A1–B1 et une préparation C1 aux études de médecine en Allemagne, avec accompagnement d'étudiants en Russie et en Allemagne.", en: "Site concept for German courses (A1–B1) and C1 preparation for medical school in Germany, with student support in Russia and Germany.", ar: "تصوّر لموقع يقدّم دروسًا في اللغة الألمانية من A1 إلى B1، وتحضيرًا لمستوى C1 لدراسة الطب في ألمانيا، مع دعم الطلاب ومتابعتهم في روسيا وألمانيا.", ru: "Концепция сайта: курсы немецкого языка A1–B1 и подготовка к уровню C1 для обучения на медицинском факультете в Германии, а также сопровождение студентов в России и Германии." },
      did: [
        { fr: "Identité de marque et positionnement", en: "Brand identity and positioning", ar: "الهوية البصرية والتموضع في السوق", ru: "Фирменный стиль и позиционирование" },
        { fr: "Architecture d'un site vitrine multilingue et évolutif", en: "Architecture for a scalable, multilingual business website", ar: "بنية موقع تعريفي متعدّد اللغات وقابل للتوسّع", ru: "Архитектура масштабируемого многоязычного сайта" }
      ],
      stack: ["Branding", "UX", "Multilingue"]
    }
  ],
  PROJECTS: [
    {
      id: "plant3d",
      year: "2014",
      domains: ["engineering", "digital"],
      status: "done",
      title: { fr: "Reconstruction 3D d'une plante en croissance", en: "3D reconstruction of a growing plant", ar: "إعادة بناء ثلاثية الأبعاد لنبتة في طور النمو", ru: "3D-реконструкция растущего растения" },
      desc: { fr: "Modélisation et simulation du développement d'une branche végétale — travail de mastère en ingénierie mathématique (C++, 3D).", en: "Modelling and simulating the growth of a plant branch — master's thesis in mathematical engineering (C++, 3D).", ar: "نمذجة نموّ غصن نباتي ومحاكاته — بحث ماجستير في الهندسة الرياضية (C++، ثلاثي الأبعاد).", ru: "Моделирование и симуляция развития ветви растения — магистерская диссертация по математической инженерии (C++, 3D)." }
    },
    {
      id: "marsa",
      year: "2014",
      domains: ["business", "engineering"],
      status: "done",
      title: { fr: "Boutique de prêt-à-porter femme — La Marsa", en: "Women's fashion boutique — La Marsa", ar: "متجر ملابس نسائية — المرسى", ru: "Магазин женской одежды — Ла-Марса" },
      desc: { fr: "Lancement et gestion de la vente de vêtements femme au centre Carrefour La Marsa.", en: "Launched and ran a women's clothing shop at the Carrefour La Marsa shopping centre.", ar: "إطلاق نقطة بيع للملابس النسائية وإدارتها في مركز كارفور المرسى.", ru: "Запуск и управление торговой точкой женской одежды в ТЦ Carrefour La Marsa." }
    },
    {
      id: "vision",
      year: "2013",
      domains: ["engineering", "digital"],
      status: "done",
      title: { fr: "Vision par ordinateur : détection d'objets", en: "Computer vision: object detection", ar: "الرؤية الحاسوبية: كشف الأجسام", ru: "Компьютерное зрение: обнаружение объектов" },
      desc: { fr: "Traitement d'image et détection automatique d'objets avec OpenCV, C++ et Matlab.", en: "Image processing and automatic object detection with OpenCV, C++ and Matlab.", ar: "معالجة الصور والكشف الآلي عن الأجسام باستخدام OpenCV وC++ وMatlab.", ru: "Обработка изображений и автоматическое обнаружение объектов с помощью OpenCV, C++ и Matlab." }
    },
    {
      id: "android",
      year: "2013",
      domains: ["digital", "business"],
      status: "done",
      title: { fr: "Application Android de suivi commercial", en: "Android sales-tracking app", ar: "تطبيق أندرويد لتتبّع المبيعات", ru: "Android-приложение для учёта продаж" },
      desc: { fr: "Application mobile assurant la traçabilité de la commercialisation en temps réel.", en: "Mobile app for tracking sales and distribution in real time.", ar: "تطبيق جوّال يتيح تتبّع عمليات البيع في الوقت الفعلي.", ru: "Мобильное приложение для отслеживания продаж в реальном времени." }
    },
    {
      id: "queen-si",
      year: "2013",
      domains: ["digital"],
      status: "done",
      title: { fr: "Système d'information — entreprise QUEEN", en: "Information system — QUEEN", ar: "نظام معلومات — شركة QUEEN", ru: "Информационная система для компании QUEEN" },
      desc: { fr: "Conception et développement du système d'information de l'entreprise, en freelance.", en: "Designed and built the company's information system as a freelancer.", ar: "تصميم نظام معلومات الشركة وتطويره، في إطار عمل حرّ.", ru: "Проектирование и разработка информационной системы компании (фриланс)." }
    },
    {
      id: "ariana",
      year: "2013",
      domains: ["business", "engineering"],
      status: "done",
      title: { fr: "Boutique de prêt-à-porter homme — Ariana", en: "Men's fashion boutique — Ariana", ar: "متجر ملابس رجالية — أريانة", ru: "Магазин мужской одежды — Ариана" },
      desc: { fr: "Vente de vêtements homme en boutique au centre de l'Ariana.", en: "Sold men's clothing from a shop in central Ariana.", ar: "بيع الملابس الرجالية في متجر بوسط أريانة.", ru: "Розничная продажа мужской одежды: магазин в центре Арианы." }
    },
    {
      id: "workwear",
      year: "2012",
      domains: ["business", "engineering"],
      status: "done",
      title: { fr: "Vêtements de travail sur mesure", en: "Custom workwear", ar: "ملابس عمل حسب الطلب", ru: "Спецодежда на заказ" },
      desc: { fr: "Conception et vente de vêtements de travail et de dossards pour les entreprises.", en: "Designed and sold work uniforms and tabards for companies.", ar: "تصميم ملابس العمل والصدريات وبيعها للمؤسسات.", ru: "Разработка и продажа спецодежды и жилетов для предприятий." }
    },
    {
      id: "traceability",
      year: "2012",
      domains: ["engineering", "digital"],
      status: "done",
      title: { fr: "Logiciel de traçabilité et d'analyse des défauts", en: "Traceability & defect-analysis software", ar: "برنامج للتتبّع وتحليل العيوب", ru: "ПО для прослеживаемости и анализа дефектов" },
      desc: { fr: "Outil qui suit chaque produit et analyse les défaillances pour garantir la qualité.", en: "Tool that tracks each product and analyses failures to ensure quality.", ar: "أداة تتتبّع كل منتج وتحلّل العيوب لضمان الجودة.", ru: "Инструмент, который отслеживает каждое изделие и анализирует дефекты для контроля качества." }
    },
    {
      id: "balancing",
      year: "2011",
      domains: ["engineering", "digital"],
      status: "done",
      title: { fr: "Logiciel d'équilibrage de chaîne de montage", en: "Assembly-line balancing software", ar: "برنامج موازنة خطّ التجميع", ru: "ПО для балансировки швейного потока" },
      desc: { fr: "Répartition optimale des opérations de confection entre les postes de la chaîne.", en: "Distributes garment operations across workstations to balance the line.", ar: "توزيع عمليات الخياطة على مراكز العمل لتحقيق توازن الخطّ.", ru: "Оптимальное распределение швейных операций между рабочими местами потока." }
    },
    {
      id: "gpao",
      year: "2010",
      domains: ["engineering"],
      status: "done",
      title: { fr: "Amélioration du système GPAO", en: "Improving the production-management system", ar: "تحسين نظام إدارة الإنتاج", ru: "Улучшение системы управления производством" },
      desc: { fr: "Projet de fin d'études d'ingénieur à la Société Tunisienne de Tricotage et Confection.", en: "Final-year engineering project at Société Tunisienne de Tricotage et Confection.", ar: "مشروع التخرّج في الهندسة لدى الشركة التونسية للتريكو والخياطة.", ru: "Инженерный дипломный проект на предприятии Société Tunisienne de Tricotage et Confection." }
    }
  ],
  METHOD: [
    {
      title: { fr: "Analyser", en: "Analyse", ar: "التحليل", ru: "Анализ" },
      text: { fr: "Comprendre le besoin réel et la situation avant de choisir une solution.", en: "Understand the real need and the situation before choosing a solution.", ar: "فهم الحاجة الفعلية والوضع القائم قبل اختيار الحل.", ru: "Понять реальную потребность и ситуацию, прежде чем выбирать решение." }
    },
    {
      title: { fr: "Structurer", en: "Structure", ar: "الهيكلة", ru: "Структурирование" },
      text: { fr: "Poser les objectifs, les étapes, les ressources et les responsabilités.", en: "Define the goals, stages, resources and responsibilities.", ar: "تحديد الأهداف والمراحل والموارد والمسؤوليات.", ru: "Определить цели, этапы, ресурсы и зоны ответственности." }
    },
    {
      title: { fr: "Concevoir", en: "Design", ar: "التصميم", ru: "Проектирование" },
      text: { fr: "Imaginer la solution en tenant compte des dimensions techniques, commerciales, financières et humaines.", en: "Shape the solution with its technical, commercial, financial and human aspects in mind.", ar: "تصوّر الحل مع مراعاة الجوانب التقنية والتجارية والمالية والبشرية.", ru: "Продумать решение с учётом технических, коммерческих, финансовых и человеческих аспектов." }
    },
    {
      title: { fr: "Tester", en: "Test", ar: "الاختبار", ru: "Тестирование" },
      text: { fr: "Prototyper, confronter au terrain et mesurer ce qui fonctionne.", en: "Build a prototype, field-test it and measure what works.", ar: "إعداد نموذج أولي، واختباره على أرض الواقع، وقياس فعاليته.", ru: "Сделать прототип, проверить его в реальных условиях и оценить, что работает." }
    },
    {
      title: { fr: "Améliorer", en: "Improve", ar: "التحسين", ru: "Улучшение" },
      text: { fr: "Ajuster à partir des retours, dans une logique d'amélioration continue.", en: "Refine based on feedback, in a spirit of continuous improvement.", ar: "التعديل بناءً على الملاحظات، في إطار التحسين المستمر.", ru: "Корректировать по обратной связи, следуя принципу постоянного улучшения." }
    },
    {
      title: { fr: "Mettre en œuvre", en: "Deliver", ar: "التنفيذ", ru: "Внедрение" },
      text: { fr: "Coordonner les intervenants et accompagner le déploiement jusqu'au résultat.", en: "Coordinate the people involved and see the rollout through to results.", ar: "تنسيق الأطراف المعنية ومتابعة التطبيق حتى تحقيق النتائج.", ru: "Координировать участников и сопровождать внедрение до получения результата." }
    }
  ],
  SERVICES: [
    {
      icon: "web",
      title: { fr: "Landing pages & sites vitrines", en: "Landing pages & business websites", ar: "صفحات هبوط ومواقع تعريفية", ru: "Лендинги и сайты-визитки" },
      text: { fr: "Un site rapide et élégant qui présente votre activité et transforme les visiteurs en demandes de contact.", en: "A fast, elegant site that presents your business and turns visitors into enquiries.", ar: "موقع سريع وأنيق يعرّف بنشاطك ويحوّل الزوّار إلى طلبات تواصل.", ru: "Быстрый и элегантный сайт, который представляет ваш бизнес и превращает посетителей в заявки." }
    },
    {
      icon: "app",
      title: { fr: "Plateformes & applications", en: "Platforms & web apps", ar: "منصّات وتطبيقات", ru: "Платформы и приложения" },
      text: { fr: "Espaces clients, tableaux de bord, suivi de dossiers : base de données, connexion et rôles utilisateurs.", en: "Client portals, dashboards, case tracking: database, sign-in and user roles.", ar: "بوابات للعملاء، ولوحات تحكّم، ومتابعة للملفات: قاعدة بيانات، وتسجيل دخول، وأدوار للمستخدمين.", ru: "Личные кабинеты, панели управления, отслеживание заявок: база данных, авторизация и роли пользователей." }
    },
    {
      icon: "globe",
      title: { fr: "Sites multilingues & SEO", en: "Multilingual sites & SEO", ar: "مواقع متعدّدة اللغات وتحسين محرّكات البحث", ru: "Многоязычные сайты и SEO" },
      text: { fr: "Français, anglais, arabe, russe : chaque version référencée pour être trouvée sur Google dans sa langue.", en: "French, English, Arabic, Russian: each version optimised to be found on Google in its own language.", ar: "الفرنسية والإنجليزية والعربية والروسية: كل نسخة مهيّأة للظهور في نتائج Google بلغتها.", ru: "Французский, английский, арабский, русский: каждая версия оптимизирована, чтобы её находили в Google на своём языке." }
    },
    {
      icon: "film",
      title: { fr: "Visuels & vidéo produit", en: "Product visuals & video", ar: "صور ومقاطع فيديو للمنتجات", ru: "Визуалы и видео продукта" },
      text: { fr: "Visuels pour les réseaux sociaux et vidéos produit générées par IA puis montées.", en: "Social-media visuals and AI-generated product videos, edited and finished.", ar: "صور لمواقع التواصل الاجتماعي، وفيديوهات للمنتجات تُولَّد بالذكاء الاصطناعي ثم تخضع للمونتاج.", ru: "Визуалы для соцсетей и видео продукта: генерация с помощью ИИ и монтаж." }
    },
    {
      icon: "compass",
      title: { fr: "Conseil & gestion de projet", en: "Consulting & project management", ar: "الاستشارات وإدارة المشاريع", ru: "Консалтинг и управление проектами" },
      text: { fr: "Analyse des besoins, structuration, coordination de prestataires et suivi jusqu'à la mise en œuvre.", en: "Needs analysis, project structuring, contractor coordination and follow-through to delivery.", ar: "تحليل الاحتياجات، وهيكلة المشروع، وتنسيق مزوّدي الخدمات، والمتابعة حتى التنفيذ.", ru: "Анализ потребностей, структурирование проекта, координация подрядчиков и сопровождение вплоть до внедрения." }
    },
    {
      icon: "flow",
      title: { fr: "Transformation digitale", en: "Digital transformation", ar: "التحوّل الرقمي", ru: "Цифровая трансформация" },
      text: { fr: "Adaptation de flux de travail dans Odoo et Dolibarr, CRM, spécifications fonctionnelles et automatisation.", en: "Workflow customisation in Odoo and Dolibarr, CRM, functional specifications and automation.", ar: "تكييف سير العمل في Odoo وDolibarr، وأنظمة إدارة علاقات العملاء (CRM)، وإعداد المواصفات الوظيفية، والأتمتة.", ru: "Настройка бизнес-процессов в Odoo и Dolibarr, CRM, разработка ТЗ и автоматизация." }
    }
  ],
  VISION: [
    {
      id: "intl",
      title: { fr: "Conseil international", en: "International consulting", ar: "الاستشارات الدولية", ru: "Международный консалтинг" },
      text: { fr: "Collaborer avec des équipes multiculturelles sur des projets qui demandent une vision technique et commerciale.", en: "Work with multicultural teams on projects that call for both technical and commercial insight.", ar: "التعاون مع فرق متعدّدة الثقافات في مشاريع تتطلّب رؤية تقنية وتجارية.", ru: "Работать в интернациональных командах над проектами, где нужен и технический, и коммерческий взгляд." }
    },
    {
      id: "markets",
      title: { fr: "Nouveaux marchés", en: "New markets", ar: "أسواق جديدة", ru: "Новые рынки" },
      text: { fr: "Aider les entreprises à accéder à de nouveaux marchés, développer des partenariats et leurs clients.", en: "Help companies reach new markets and grow their partnerships and client base.", ar: "مساعدة المؤسسات على دخول أسواق جديدة، وتطوير شراكاتها، وتوسيع قاعدة عملائها.", ru: "Помогать компаниям выходить на новые рынки, развивать партнёрства и клиентскую базу." }
    },
    {
      id: "ai",
      title: { fr: "IA & automatisation", en: "AI & automation", ar: "الذكاء الاصطناعي والأتمتة", ru: "ИИ и автоматизация" },
      text: { fr: "Concevoir des solutions pratiques pour automatiser des tâches et créer des services numériques.", en: "Build practical solutions that automate tasks and create digital services.", ar: "تصميم حلول عملية لأتمتة المهام وإنشاء خدمات رقمية.", ru: "Разрабатывать практичные решения для автоматизации задач и создания цифровых сервисов." }
    },
    {
      id: "entrepreneur",
      title: { fr: "Entrepreneuriat", en: "Entrepreneurship", ar: "ريادة الأعمال", ru: "Предпринимательство" },
      text: { fr: "Développer des projets depuis l'idée : marché, marque, outils numériques, opérations et clients.", en: "Build projects from the ground up: market, brand, digital tools, operations and clients.", ar: "تطوير المشاريع انطلاقًا من الفكرة: السوق، والعلامة التجارية، والأدوات الرقمية، والعمليات، والعملاء.", ru: "Развивать проекты, начиная с идеи: рынок, бренд, цифровые инструменты, операционная деятельность и клиенты." }
    },
    {
      id: "innovation",
      title: { fr: "Innovation & R&D", en: "Innovation & R&D", ar: "الابتكار والبحث والتطوير", ru: "Инновации и R&D" },
      text: { fr: "Mobiliser l'expérience textile et les mathématiques au service des produits et des processus.", en: "Apply textile expertise and mathematics to products and processes.", ar: "توظيف خبرتي في النسيج والرياضيات لخدمة المنتجات والعمليات.", ru: "Применять опыт в текстиле и математику для развития продуктов и процессов." }
    },
    {
      id: "strategy",
      title: { fr: "Management stratégique", en: "Strategic management", ar: "الإدارة الاستراتيجية", ru: "Стратегическое управление" },
      text: { fr: "Évoluer vers la direction de projets, de programmes et d'activités internationales.", en: "Move towards leading projects, programmes and international operations.", ar: "الارتقاء إلى قيادة المشاريع والبرامج والأنشطة الدولية.", ru: "Перейти к руководству проектами, программами и международной деятельностью." }
    }
  ],
  EXPERIENCE: [
    {
      id: "ms",
      period: "2019 –",
      axes: ["consulting", "business", "digital"],
      org: "Master Services",
      role: { fr: "Consultant, chef de projet et business developer", en: "Consultant, project manager and business developer", ar: "مستشار ومدير مشاريع ومطوّر أعمال", ru: "Консультант, руководитель проектов и менеджер по развитию бизнеса" },
      points: [
        { fr: "Développement commercial, recherche d'opportunités et de partenariats", en: "Business development, sourcing opportunities and partnerships", ar: "تطوير الأعمال والبحث عن الفرص والشراكات", ru: "Развитие бизнеса, поиск рыночных возможностей и партнёров" },
        { fr: "Conseil en organisation, structuration et suivi de projets", en: "Organisational consulting, project structuring and monitoring", ar: "استشارات في التنظيم وهيكلة المشاريع ومتابعتها", ru: "Организационный консалтинг, структурирование и сопровождение проектов" },
        { fr: "Transformation digitale et adaptation de flux de travail ERP", en: "Digital transformation and ERP workflow customisation", ar: "التحوّل الرقمي وتكييف سير العمل في أنظمة ERP", ru: "Цифровая трансформация и настройка бизнес-процессов в ERP" },
        { fr: "Conception de projets web, accompagnement marketing et services numériques", en: "Web projects, marketing support and digital services", ar: "تصميم مشاريع الويب، والدعم التسويقي، والخدمات الرقمية", ru: "Веб-проекты, маркетинговая поддержка и цифровые услуги" },
        { fr: "Innovation, formation et accompagnement", en: "Innovation, training and coaching", ar: "الابتكار والتدريب والتوجيه", ru: "Инновации, обучение и сопровождение" },
        { fr: "Coordination de prestataires, partenaires et opérations", en: "Coordinating contractors, partners and operations", ar: "تنسيق مزوّدي الخدمات والشركاء والعمليات", ru: "Координация подрядчиков, партнёров и операций" }
      ]
    },
    {
      id: "wereact",
      period: "2022",
      axes: ["business"],
      org: "WEREACT",
      role: { fr: "Business developer", en: "Business developer", ar: "مطوّر أعمال", ru: "Менеджер по развитию бизнеса" },
      points: [
        { fr: "Développement commercial et recherche de nouveaux clients, par le conseil et les relations professionnelles", en: "Business development and new-client acquisition through consulting and professional networking", ar: "تطوير الأعمال والبحث عن عملاء جدد عبر الاستشارة والعلاقات المهنية", ru: "Развитие бизнеса и поиск новых клиентов через консалтинг и деловые связи" }
      ]
    },
    {
      id: "ifaco",
      period: "2021",
      axes: ["consulting", "business", "digital"],
      org: "IFACO",
      role: { fr: "Consultant et business developer", en: "Consultant and business developer", ar: "مستشار ومطوّر أعمال", ru: "Консультант и менеджер по развитию бизнеса" },
      points: [
        { fr: "Image de marque, site web et stratégie d'acquisition de clients", en: "Brand image, website and client-acquisition strategy", ar: "صورة العلامة التجارية، والموقع الإلكتروني، واستراتيجية استقطاب العملاء", ru: "Имидж бренда, сайт и стратегия привлечения клиентов" }
      ]
    },
    {
      id: "duo",
      period: "2020",
      axes: ["engineering", "business"],
      org: "DuoMaghreb — DUOACCESSORIES",
      role: { fr: "Ingénieur R&D textile", en: "Textile R&D engineer", ar: "مهندس بحث وتطوير في النسيج", ru: "Инженер R&D по текстилю" },
      points: [
        { fr: "Développement d'accessoires textiles, du patronage à la commercialisation", en: "Developed textile accessories, from pattern-making to sales", ar: "تطوير إكسسوارات نسيجية، من إعداد الباترونات إلى التسويق", ru: "Разработка текстильных аксессуаров: от лекал до продаж" },
        { fr: "Présence web, marque et débouchés en grandes surfaces", en: "Built the web presence and brand, and sought outlets in large retail chains", ar: "الحضور على الويب، والعلامة التجارية، ومنافذ البيع في المتاجر الكبرى", ru: "Присутствие в интернете, бренд и сбыт через крупные торговые сети" },
        { fr: "Suivi des prestataires pour un système GPAO", en: "Oversaw contractors implementing a production-management system", ar: "متابعة مزوّدي نظام محوسب لإدارة الإنتاج (GPAO)", ru: "Курирование подрядчиков по внедрению системы управления производством" }
      ]
    },
    {
      id: "perma",
      period: "2019",
      axes: ["business", "consulting", "digital"],
      org: "PermaGroup",
      role: { fr: "Lancement et management d'activité", en: "Business launch and management", ar: "إطلاق المشروع وإدارته", ru: "Запуск и управление бизнесом" },
      points: [
        { fr: "Lancement d'une activité de tourisme médical : structuration, marque, prestataires web, visibilité et ventes", en: "Launched a medical-tourism business: set-up, branding, web contractors, online visibility and sales", ar: "إطلاق مشروع في السياحة العلاجية: الهيكلة، والعلامة التجارية، ومزوّدو خدمات الويب، والحضور الرقمي، والمبيعات", ru: "Запуск направления медицинского туризма: организация, бренд, веб-подрядчики, продвижение и продажи" }
      ]
    },
    {
      id: "woo",
      period: "2018 – 2019",
      axes: ["business", "consulting"],
      org: "woo-services / Venus-Estetika",
      role: { fr: "Management du tourisme médical", en: "Medical-tourism management", ar: "إدارة السياحة العلاجية", ru: "Управление медицинским туризмом" },
      points: [
        { fr: "Développement et gestion d'une offre, coordination des intervenants et relation commerciale", en: "Developed and ran a service offering, coordinated stakeholders and managed client relations", ar: "تطوير عرض وإدارته، وتنسيق الأطراف المعنية، وإدارة العلاقة مع العملاء", ru: "Разработка и ведение пакета услуг, координация участников и работа с клиентами" }
      ]
    },
    {
      id: "gharieni",
      period: "2015 – 2018",
      axes: ["engineering", "consulting"],
      org: "Gharieni Group — GTIM",
      logo: "assets/img/logo-gharieni.jpg",
      role: { fr: "Responsable du département textile", en: "Head of the textile department", ar: "رئيس قسم النسيج", ru: "Руководитель текстильного отдела" },
      points: [
        { fr: "Expertise textile, gestion d'activité et exigences techniques de fabrication", en: "Textile expertise, business management and technical manufacturing requirements", ar: "خبرة في النسيج، وإدارة النشاط، والمتطلّبات التقنية للتصنيع", ru: "Экспертиза в текстиле, управление направлением и технические требования к производству" }
      ]
    },
    {
      id: "kenzalou",
      period: "2014",
      axes: ["engineering", "business"],
      org: "Kenzalou Confection",
      logo: "assets/img/logo-kenzalou.jpg",
      role: { fr: "Directeur des opérations (COO)", en: "Chief Operating Officer (COO)", ar: "مدير العمليات (COO)", ru: "Операционный директор (COO)" },
      points: []
    },
    {
      id: "queen",
      period: "2013",
      axes: ["digital"],
      org: "QUEEN",
      role: { fr: "Développeur du système d'information (freelance)", en: "Information systems developer (freelance)", ar: "مطوّر نظام المعلومات (عمل حرّ)", ru: "Разработчик информационной системы (фриланс)" },
      points: []
    },
    {
      id: "atm",
      period: "2012",
      axes: ["business"],
      org: { fr: "Association Tunisienne de la Mode", en: "Tunisian Fashion Association", ar: "الجمعية التونسية للموضة", ru: "Тунисская ассоциация моды" },
      role: { fr: "Vice-président", en: "Vice-president", ar: "نائب الرئيس", ru: "Вице-президент" },
      points: []
    },
    {
      id: "christine",
      period: "2010 – 2011",
      axes: ["engineering"],
      org: "Christine Confection",
      logo: "assets/img/logo-christine.jpg",
      role: { fr: "Responsable contrôle qualité", en: "Quality control manager", ar: "مسؤول مراقبة الجودة", ru: "Руководитель отдела контроля качества" },
      points: []
    },
    {
      id: "sttc",
      period: "2008 – 2010",
      axes: ["engineering"],
      org: "STTC · TIB",
      role: { fr: "Stages : ouvrier, technicien, projet de fin d'études", en: "Internships: shop-floor worker, technician, final-year project", ar: "تدريبات ميدانية: عامل، تقني، مشروع التخرّج", ru: "Производственная практика: рабочий, техник, дипломный проект" },
      points: []
    }
  ],
  EDUCATION: [
    {
      period: "2023 – 2025",
      org: { fr: "Études linguistiques", en: "Language studies", ar: "دراسات لغوية", ru: "Языковая подготовка" },
      role: { fr: "Langue russe", en: "Russian language", ar: "اللغة الروسية", ru: "Русский язык" }
    },
    {
      period: "2011 – 2014",
      logo: "assets/img/logo-ept.jpg",
      org: { fr: "École Polytechnique de Tunisie", en: "Tunisia Polytechnic School", ar: "المدرسة التونسية للتقنيات", ru: "Политехническая школа Туниса" },
      role: { fr: "Mastère en ingénierie mathématique", en: "Master's in Mathematical Engineering", ar: "ماجستير في الهندسة الرياضية", ru: "Магистратура по математической инженерии" }
    },
    {
      period: "2006 – 2010",
      logo: "assets/img/logo-enim.jpg",
      org: { fr: "École Nationale d'Ingénieurs de Monastir", en: "National Engineering School of Monastir", ar: "المدرسة الوطنية للمهندسين بالمنستير", ru: "Национальная инженерная школа Монастира" },
      role: { fr: "Diplôme national d'ingénieur textile", en: "National Diploma in Textile Engineering", ar: "الشهادة الوطنية لمهندس في النسيج", ru: "Диплом инженера-текстильщика" }
    },
    {
      period: "2004 – 2006",
      org: { fr: "Institut Préparatoire aux Études d'Ingénieurs d'El Manar", en: "El Manar Preparatory Engineering Institute", ar: "المعهد التحضيري للدراسات الهندسية بالمنار", ru: "Подготовительный инженерный институт Эль-Манар" },
      role: { fr: "Classes préparatoires physique-chimie", en: "Preparatory classes in physics and chemistry", ar: "الأقسام التحضيرية (فيزياء وكيمياء)", ru: "Подготовительные классы: физика и химия" }
    },
    {
      period: "2004",
      org: { fr: "Baccalauréat", en: "Baccalaureate", ar: "البكالوريا", ru: "Среднее образование" },
      role: { fr: "Baccalauréat mathématiques", en: "Baccalaureate in Mathematics", ar: "بكالوريا، شعبة الرياضيات", ru: "Аттестат, математический профиль" }
    }
  ],
  TRAINING: [
    {
      year: "2017",
      text: { fr: "Anglais des affaires — Business 1, 2 & 3, Amideast", en: "Business English 1, 2 & 3 — Amideast", ar: "إنجليزية الأعمال (المستويات 1 و2 و3) — أميديست", ru: "Деловой английский, уровни 1, 2 и 3 — Amideast" }
    },
    {
      year: "2016",
      text: { fr: "Management et motivation du personnel — Lumière Formation", en: "Staff management & motivation — Lumière Formation", ar: "إدارة الموظفين وتحفيزهم — Lumière Formation", ru: "Управление и мотивация персонала — Lumière Formation" }
    },
    {
      year: "2016",
      text: { fr: "Certificat « Challenge and Opportunity » — ENIM", en: "“Challenge and Opportunity” certificate — ENIM", ar: "شهادة «Challenge and Opportunity» — ENIM", ru: "Сертификат «Challenge and Opportunity» — ENIM" }
    },
    {
      year: "2012 – 2016",
      text: { fr: "Techniques de communication — British Council", en: "Communication skills — British Council", ar: "تقنيات التواصل — المجلس الثقافي البريطاني", ru: "Техники коммуникации — British Council" }
    },
    {
      year: "2012",
      text: { fr: "Programmes entrepreneuriaux MORAINE et CEFE", en: "MORAINE and CEFE entrepreneurship programmes", ar: "برنامجا ريادة الأعمال MORAINE وCEFE", ru: "Предпринимательские программы MORAINE и CEFE" }
    },
    {
      year: "2011",
      text: { fr: "Lean Management", en: "Lean Management", ar: "الإدارة الرشيقة (Lean)", ru: "Бережливое производство (Lean)" }
    },
    {
      year: "2010",
      text: { fr: "Norme ISO 9001 version 2008", en: "ISO 9001:2008 standard", ar: "معيار ISO 9001 إصدار 2008", ru: "Стандарт ISO 9001:2008" }
    }
  ],
  LANGUAGES: [
    {
      code: "AR",
      name: "العربية",
      level: "C1",
      score: 5
    },
    {
      code: "FR",
      name: "Français",
      level: "B2",
      score: 4
    },
    {
      code: "EN",
      name: "English",
      level: "B2",
      score: 4
    },
    {
      code: "RU",
      name: "Русский",
      level: { fr: "En cours", en: "Learning", ar: "قيد التعلّم", ru: "Изучаю" },
      score: 2
    }
  ],
  SKILLS: [
    {
      id: "strategy",
      title: { fr: "Stratégie & développement commercial", en: "Strategy & business development", ar: "الاستراتيجية وتطوير الأعمال", ru: "Стратегия и развитие бизнеса" },
      items: [
        { fr: "Prospection & partenariats", en: "Prospecting & partnerships", ar: "البحث عن العملاء والشراكات", ru: "Поиск клиентов и партнёрства" },
        { fr: "Positionnement d'offre", en: "Market positioning", ar: "تموضع العروض في السوق", ru: "Позиционирование предложения" },
        { fr: "Stratégies d'acquisition", en: "Client-acquisition strategies", ar: "استراتيجيات استقطاب العملاء", ru: "Стратегии привлечения клиентов" },
        { fr: "Analyse des besoins", en: "Needs analysis", ar: "تحليل الاحتياجات", ru: "Анализ потребностей" }
      ]
    },
    {
      id: "project",
      title: { fr: "Gestion de projet & management", en: "Project & people management", ar: "إدارة المشاريع والفرق", ru: "Управление проектами и командой" },
      items: [
        { fr: "Structuration & suivi de projets", en: "Project structuring & monitoring", ar: "هيكلة المشاريع ومتابعتها", ru: "Структурирование и сопровождение проектов" },
        { fr: "Coordination de prestataires", en: "Contractor coordination", ar: "تنسيق مزوّدي الخدمات", ru: "Координация подрядчиков" },
        { fr: "Spécifications fonctionnelles", en: "Functional specifications", ar: "المواصفات الوظيفية", ru: "Разработка ТЗ" },
        "Lean Management",
        "ISO 9001"
      ]
    },
    {
      id: "textile",
      title: { fr: "Ingénierie textile & R&D", en: "Textile engineering & R&D", ar: "هندسة النسيج والبحث والتطوير", ru: "Текстильная инженерия и R&D" },
      items: [
        { fr: "Patronage & confection", en: "Pattern-making & sewing", ar: "إعداد الباترونات والخياطة", ru: "Лекала и пошив" },
        { fr: "Méthodes de production", en: "Production methods", ar: "أساليب الإنتاج", ru: "Технология производства" },
        { fr: "Contrôle qualité", en: "Quality control", ar: "مراقبة الجودة", ru: "Контроль качества" },
        "GPAO",
        { fr: "Lectra · Gerber · CLO 3D (autodidacte)", en: "Lectra · Gerber · CLO 3D (self-taught)", ar: "Lectra · Gerber · CLO 3D (تعلّم ذاتي)", ru: "Lectra · Gerber · CLO 3D (самостоятельно)" }
      ]
    },
    {
      id: "digital",
      title: { fr: "Digital, web & ERP", en: "Digital, web & ERP", ar: "الرقمنة والويب وأنظمة ERP", ru: "Цифровые технологии, веб и ERP" },
      items: [
        "HTML · CSS · JavaScript",
        "React · Node.js · Supabase · Vercel",
        "Python",
        "WordPress",
        "WinDev",
        "Odoo · Dolibarr",
        "Salesforce · Monday.com"
      ]
    },
    {
      id: "seo",
      title: { fr: "SEO & acquisition", en: "SEO & acquisition", ar: "SEO واستقطاب العملاء", ru: "SEO и привлечение клиентов" },
      items: [
        { fr: "SEO technique", en: "Technical SEO", ar: "SEO التقني", ru: "Техническое SEO" },
        { fr: "Indexation Google : 300+ pages (RusStudy)", en: "Google indexing: 300+ pages (RusStudy)", ar: "الفهرسة في Google: أكثر من 300 صفحة (RusStudy)", ru: "Индексация в Google: 300+ страниц (RusStudy)" },
        "hreflang",
        { fr: "Données structurées · sitemap", en: "Structured data · sitemaps", ar: "البيانات المنظَّمة · خريطة الموقع", ru: "Микроразметка · карта сайта" },
        { fr: "Sites multilingues & RTL", en: "Multilingual & RTL sites", ar: "مواقع متعدّدة اللغات ودعم RTL", ru: "Многоязычные сайты и RTL" },
        { fr: "Contenu de blog", en: "Blog content", ar: "محتوى المدوّنات", ru: "Контент для блога" },
        { fr: "Parcours de conversion", en: "Conversion funnels", ar: "مسارات التحويل", ru: "Воронки конверсии" },
        "Google Ads · Facebook Ads",
        "Google Business Profile"
      ]
    },
    {
      id: "marketing",
      title: { fr: "Marketing & création", en: "Marketing & creative", ar: "التسويق والتصميم الإبداعي", ru: "Маркетинг и креатив" },
      items: [
        "Mailchimp · SendBlaster",
        "Photoshop · Illustrator",
        "Canva",
        "3ds Max"
      ]
    },
    {
      id: "ai",
      title: { fr: "IA & automatisation", en: "AI & automation", ar: "الذكاء الاصطناعي والأتمتة", ru: "ИИ и автоматизация" },
      note: { fr: "Usage pratique, en approfondissement", en: "Hands-on use, still building expertise", ar: "استخدام عملي، مع تعمّق مستمر", ru: "Использую на практике, продолжаю изучать" },
      items: ["Claude · Claude Code", "ChatGPT", "Gemini", { fr: "Prompt engineering", en: "Prompt engineering", ar: "هندسة الأوامر (Prompt engineering)", ru: "Промпт-инжиниринг" }, "Midjourney", "Suno", "ElevenLabs", "n8n"]
    },
    {
      id: "quant",
      title: { fr: "Analyse quantitative", en: "Quantitative analysis", ar: "التحليل الكمّي", ru: "Количественный анализ" },
      items: [
        { fr: "Modélisation", en: "Modelling", ar: "النمذجة", ru: "Моделирование" },
        { fr: "Économétrie", en: "Econometrics", ar: "الاقتصاد القياسي", ru: "Эконометрика" },
        { fr: "Théorie des jeux", en: "Game theory", ar: "نظرية الألعاب", ru: "Теория игр" },
        "Matlab · R · Stata",
        "OpenCV · C++"
      ]
    }
  ],
  /*
   * CV ciblés : une page par poste, sous /cv/<slug>/ (pages générées par tools/build-cv.mjs).
   * Ces pages ne sont pas liées depuis le site : Oussama envoie leur lien aux recruteurs.
   * - title / short / summary / highlights : textes propres au poste
   * - key : expériences mises en avant (ids d'EXPERIENCE) ; les autres sont résumées en une ligne
   * - projects : ids de CASES ou de PROJECTS, dans l'ordre ; detail : ceux dont on montre le détail
   * - skills : groupes de compétences affichés (ids de SKILLS), dans l'ordre
   * - vision : ambitions affichées (ids de VISION)
   * - file : nom utilisé pour les PDF (Oussama-Ghorbel-CV-<file>-FR.pdf) ; photo : portrait de couverture
   */
  CV_TARGETS: {
    "seo": {
      file: "SEO",
      photo: "assets/img/role-creator.webp",
      short: { fr: "SEO & marketing digital", en: "SEO & digital marketing", ar: "SEO والتسويق الرقمي", ru: "SEO и интернет-маркетинг" },
      title: { fr: "SEO & marketing digital · Sites multilingues", en: "SEO & digital marketing · Multilingual websites", ar: "SEO والتسويق الرقمي · مواقع متعددة اللغات", ru: "SEO и интернет-маркетинг · Многоязычные сайты" },
      summary: {
        fr: "Ingénieur de formation, je mène depuis 2019 des projets web et de marketing digital. Je conçois des sites multilingues pensés pour être trouvés — structure, balises hreflang, données structurées, sitemap, contenus — et pour convertir, avec des parcours qui transforment une visite en demande de contact. Mon expérience commerciale me fait garder le cap sur l'essentiel : attirer les bons visiteurs et les amener jusqu'au contact. Je travaille en français, en arabe et en anglais, un atout pour le référencement international.",
        en: "An engineer by training, I have been running web and digital-marketing projects since 2019. I build multilingual websites designed to be found — site structure, hreflang, structured data, sitemaps, content — and to convert, with journeys that turn a visit into an enquiry. My sales background keeps me focused on what matters: attracting the right visitors and bringing them to get in touch. I work in French, Arabic and English, an asset for international SEO.",
        ar: "مهندس بحكم دراستي، أقود منذ 2019 مشاريع في الويب والتسويق الرقمي. أصمّم مواقع متعدّدة اللغات يسهل العثور عليها في نتائج البحث — من هيكلة الموقع ووسوم hreflang والبيانات المنظَّمة وخريطة الموقع إلى المحتوى — وتحوّل الزيارة إلى طلب تواصل عبر مسارات التحويل. وتُبقي خبرتي التجارية تركيزي على الأهم: جذب الزوّار المناسبين وإيصالهم حتى خطوة التواصل. أعمل بالعربية والفرنسية والإنجليزية، وهي ميزة في تحسين محرّكات البحث على المستوى الدولي.",
        ru: "Инженер по образованию; с 2019 года веду проекты по веб-разработке и интернет-маркетингу. Создаю многоязычные сайты, которые находят в поиске (структура, hreflang, микроразметка, карта сайта, контент) и которые приносят заявки: воронка ведёт посетителя от первого визита до заявки. Коммерческий опыт помогает не терять из виду главное — привлекать целевую аудиторию и доводить её до обращения. Работаю на французском, арабском и английском, что даёт преимущество в международном SEO."
      },
      highlights: [
        { tags: ["seo", "web"], title: { fr: "SEO technique multilingue", en: "Multilingual technical SEO", ar: "SEO تقني متعدد اللغات", ru: "Техническое SEO многоязычных сайтов" }, text: { fr: "RusStudy : site en 4 langues (FR, AR, EN, RU) avec hreflang, données structurées et sitemap.", en: "RusStudy: a four-language site (FR, AR, EN, RU) with hreflang, structured data and a sitemap.", ar: "RusStudy: موقع بأربع لغات (الفرنسية والعربية والإنجليزية والروسية) مع وسوم hreflang وبيانات منظَّمة وخريطة موقع.", ru: "RusStudy: сайт на четырёх языках (FR, AR, EN, RU) с hreflang, микроразметкой и картой сайта." } },
        { tags: ["seo", "marketing"], title: { fr: "Contenu indexé", en: "Indexed content", ar: "محتوى مفهرس", ru: "Контент в индексе" }, text: { fr: "Blog RusStudy : plus de 300 pages indexées par Google.", en: "RusStudy blog: over 300 pages indexed by Google.", ar: "مدوّنة RusStudy: أكثر من 300 صفحة مفهرسة في Google.", ru: "Блог RusStudy: более 300 страниц в индексе Google." } },
        { tags: ["web", "marketing"], title: { fr: "Conversion", en: "Conversion", ar: "التحويل", ru: "Конверсия" }, text: { fr: "Formulaire de candidature rapide et parcours en plusieurs étapes (RusStudy) ; landing page haut de gamme (PermaGroup).", en: "Quick application form and multi-step funnel (RusStudy); premium landing page (PermaGroup).", ar: "نموذج تقديم سريع ومسار تحويل متعدّد المراحل (RusStudy)، وصفحة هبوط راقية (PermaGroup).", ru: "Быстрая форма заявки и многошаговая воронка (RusStudy); премиальный лендинг (PermaGroup)." } },
        { tags: ["marketing", "business"], title: { fr: "Acquisition", en: "Acquisition", ar: "استقطاب العملاء", ru: "Привлечение клиентов" }, text: { fr: "Stratégie d'acquisition de clients (IFACO, 2021) ; Google Ads, Facebook Ads, Google Business Profile, Mailchimp.", en: "Client-acquisition strategy (IFACO, 2021); Google Ads, Facebook Ads, Google Business Profile, Mailchimp.", ar: "استراتيجية استقطاب العملاء (IFACO، 2021)؛ وأدوات Google Ads وFacebook Ads وGoogle Business Profile وMailchimp.", ru: "Стратегия привлечения клиентов (IFACO, 2021); Google Ads, Facebook Ads, Google Business Profile, Mailchimp." } }
      ],
      key: ["ms", "ifaco", "perma"],
      projects: ["russtudy", "permagroup", "ifaco", "yulia", "intellect"],
      detail: ["russtudy", "permagroup"],
      skills: ["seo", "digital", "marketing", "ai", "strategy"],
      vision: ["ai", "markets", "entrepreneur"]
    },
    "business-developer": {
      file: "Business-Developer",
      photo: "assets/img/role-engineer.webp",
      short: { fr: "Business developer", en: "Business developer", ar: "مطوّر أعمال", ru: "Менеджер по развитию бизнеса" },
      title: { fr: "Business developer · Prospection, partenariats & lancement d'activités", en: "Business developer · Prospecting, partnerships & new ventures", ar: "مطوّر أعمال · البحث عن العملاء والشراكات وإطلاق المشاريع", ru: "Менеджер по развитию бизнеса · Поиск клиентов, партнёрства, запуск новых направлений" },
      summary: {
        fr: "Business developer de formation ingénieur. Depuis 2019, je recherche des opportunités, des clients et des partenaires pour les entreprises que j'accompagne — Master Services, IFACO, WEREACT — et j'ai participé au lancement de plusieurs activités, dont une société de tourisme médical tournée vers une clientèle européenne. Ma double culture, technique et commerciale, m'aide à comprendre un produit en profondeur, à le positionner sur son marché et à construire une relation de confiance avec le client.",
        en: "A business developer with an engineering background. Since 2019 I have been sourcing opportunities, clients and partners for the companies I work with — Master Services, IFACO, WEREACT — and I have helped launch several ventures, including a medical-tourism company serving European clients. Being both technical and commercial, I can understand a product in depth, position it in its market and build client relationships based on trust.",
        ar: "مطوّر أعمال بخلفية هندسية. منذ 2019 أبحث عن الفرص والعملاء والشركاء لصالح المؤسسات التي أعمل معها — Master Services وIFACO وWEREACT — وأسهمت في إطلاق عدّة مشاريع، من بينها شركة للسياحة العلاجية تستهدف عملاء أوروبيين. ويتيح لي الجمع بين الكفاءة التقنية والحسّ التجاري فهم المنتج بعمق، وتحديد موقعه في السوق، وبناء علاقة ثقة مع العميل.",
        ru: "Менеджер по развитию бизнеса с инженерным образованием. С 2019 года ищу рыночные возможности, клиентов и партнёров для компаний, с которыми работаю (Master Services, IFACO, WEREACT). Участвовал в запуске нескольких бизнес-проектов, в том числе компании в сфере медицинского туризма для клиентов из Европы. Сочетание технической и коммерческой подготовки помогает мне глубоко разбираться в продукте, позиционировать его на рынке и выстраивать с клиентами доверительные отношения."
      },
      highlights: [
        { tags: ["business", "consulting"], title: { fr: "Prospection & partenariats", en: "Prospecting & partnerships", ar: "البحث عن العملاء والشركاء", ru: "Поиск клиентов и партнёров" }, text: { fr: "Recherche de clients et de partenaires chez Master Services (depuis 2019), IFACO (2021) et WEREACT (2022).", en: "Sourcing clients and partners at Master Services (since 2019), IFACO (2021) and WEREACT (2022).", ar: "البحث عن العملاء والشركاء لدى Master Services (منذ 2019) وIFACO (2021) وWEREACT (2022).", ru: "Поиск клиентов и партнёров в Master Services (с 2019 года), IFACO (2021) и WEREACT (2022)." } },
        { tags: ["business", "project"], title: { fr: "Lancement d'activités", en: "New ventures", ar: "إطلاق المشاريع", ru: "Запуск новых направлений" }, text: { fr: "Tourisme médical pour une clientèle européenne (PermaGroup, 2019) ; boutiques de prêt-à-porter à La Marsa et à l'Ariana.", en: "Medical tourism for European clients (PermaGroup, 2019); fashion shops in La Marsa and Ariana.", ar: "مشروع للسياحة العلاجية موجّه إلى عملاء أوروبيين (PermaGroup، 2019)، ومتجرا ملابس جاهزة في المرسى وأريانة.", ru: "Медицинский туризм для клиентов из Европы (PermaGroup, 2019); магазины одежды в Ла-Марсе и Ариане." } },
        { tags: ["business", "marketing"], title: { fr: "Offre & acquisition", en: "Offer & acquisition", ar: "العرض واستقطاب العملاء", ru: "Позиционирование и привлечение клиентов" }, text: { fr: "Positionnement de l'offre, image de marque et stratégie d'acquisition de clients (IFACO).", en: "Market positioning, brand image and client-acquisition strategy (IFACO).", ar: "تموضع العرض في السوق، وصورة العلامة التجارية، واستراتيجية استقطاب العملاء (IFACO).", ru: "Позиционирование предложения, имидж бренда и стратегия привлечения клиентов (IFACO)." } },
        { tags: ["business", "textile"], title: { fr: "Vente B2B & distribution", en: "B2B sales & retail", ar: "المبيعات للمؤسسات والتوزيع", ru: "B2B-продажи и дистрибуция" }, text: { fr: "Vêtements de travail sur mesure pour les entreprises ; recherche de débouchés en grandes surfaces (DUOACCESSORIES).", en: "Custom workwear for companies; sought outlets with large retailers (DUOACCESSORIES).", ar: "ملابس عمل حسب الطلب للمؤسسات، والبحث عن منافذ بيع لدى المتاجر الكبرى (DUOACCESSORIES).", ru: "Спецодежда на заказ для предприятий; поиск каналов сбыта в крупных торговых сетях (DUOACCESSORIES)." } }
      ],
      key: ["ms", "wereact", "ifaco", "perma", "woo", "duo"],
      projects: ["permagroup", "ifaco", "duo", "russtudy", "workwear"],
      detail: ["permagroup", "ifaco"],
      skills: ["strategy", "seo", "project", "digital", "marketing", "textile"],
      vision: ["markets", "intl", "entrepreneur"]
    },
    "project-manager": {
      file: "Project-Manager",
      photo: "assets/img/role-leader.webp",
      short: { fr: "Chef de projet", en: "Project manager", ar: "مدير مشاريع", ru: "Руководитель проектов" },
      title: { fr: "Chef de projet · Structuration, coordination & mise en œuvre", en: "Project manager · Planning, coordination & delivery", ar: "مدير مشاريع · التخطيط والتنسيق والتنفيذ", ru: "Руководитель проектов · Планирование, координация, внедрение" },
      summary: {
        fr: "Chef de projet de formation ingénieur, avec une expérience de terrain en industrie — qualité, opérations, direction d'un département textile — et en conseil. Je structure les projets (objectifs, étapes, ressources, responsabilités), je coordonne prestataires et partenaires, et j'accompagne la mise en œuvre jusqu'au résultat, sur des projets industriels comme numériques : sites web, plateformes, ERP.",
        en: "A project manager with an engineering background and hands-on experience in industry — quality, operations, heading a textile department — and in consulting. I structure projects (goals, milestones, resources, responsibilities), coordinate contractors and partners, and see delivery through to results, on industrial and digital projects alike: websites, platforms, ERP.",
        ar: "مدير مشاريع بخلفية هندسية وخبرة ميدانية في الصناعة — الجودة والعمليات ورئاسة قسم للنسيج — وفي الاستشارات. أضع لكل مشروع هيكلة واضحة (الأهداف والمراحل والموارد والمسؤوليات)، وأنسّق عمل مزوّدي الخدمات والشركاء، وأتابع التنفيذ حتى تحقيق النتائج، سواء في المشاريع الصناعية أو الرقمية: مواقع الويب والمنصّات وأنظمة ERP.",
        ru: "Руководитель проектов с инженерным образованием и практическим опытом на производстве — качество, операционное управление, руководство текстильным отделом — и в консалтинге. Планирую проекты (цели, этапы, ресурсы, зоны ответственности), координирую подрядчиков и партнёров и сопровождаю внедрение до результата — в промышленности и в цифровой сфере: сайты, платформы, ERP."
      },
      highlights: [
        { tags: ["project", "consulting"], title: { fr: "Structuration & suivi", en: "Planning & monitoring", ar: "الهيكلة والمتابعة", ru: "Планирование и сопровождение" }, text: { fr: "Conseil en organisation, structuration et suivi de projets chez Master Services (depuis 2019).", en: "Organisational consulting, project planning and monitoring at Master Services (since 2019).", ar: "استشارات في التنظيم وهيكلة المشاريع ومتابعتها لدى Master Services (منذ 2019).", ru: "Организационный консалтинг, планирование и сопровождение проектов в Master Services (с 2019 года)." } },
        { tags: ["project"], title: { fr: "Coordination de prestataires", en: "Managing contractors", ar: "تنسيق مزوّدي الخدمات", ru: "Работа с подрядчиками" }, text: { fr: "Prestataires en design et développement web (PermaGroup) ; mise en place d'un système GPAO (DuoMaghreb).", en: "Design and web-development contractors (PermaGroup); roll-out of a production-management system (DuoMaghreb).", ar: "مزوّدو خدمات التصميم وتطوير الويب (PermaGroup)، وإرساء نظام محوسب لإدارة الإنتاج (DuoMaghreb).", ru: "Координация подрядчиков по дизайну и веб-разработке (PermaGroup) и по внедрению системы управления производством (DuoMaghreb)." } },
        { tags: ["project", "textile"], title: { fr: "Management & opérations", en: "Management & operations", ar: "الإدارة والعمليات", ru: "Руководство и операционная деятельность" }, text: { fr: "Responsable du département textile (Gharieni, 2015–2018) ; directeur des opérations, COO (Kenzalou, 2014).", en: "Head of the textile department (Gharieni, 2015–2018); Chief Operating Officer, COO (Kenzalou, 2014).", ar: "رئيس قسم النسيج (Gharieni، 2015–2018)، ومدير العمليات COO (Kenzalou، 2014).", ru: "Руководитель текстильного отдела (Gharieni, 2015–2018); операционный директор, COO (Kenzalou, 2014)." } },
        { tags: ["project", "quality", "erp"], title: { fr: "Méthodes & outils", en: "Methods & tools", ar: "المنهجيات والأدوات", ru: "Методы и инструменты" }, text: { fr: "Lean Management, ISO 9001, spécifications fonctionnelles ; adaptation de flux ERP (Odoo, Dolibarr), Monday.com.", en: "Lean management, ISO 9001, functional specifications; ERP workflow customisation (Odoo, Dolibarr), Monday.com.", ar: "الإدارة الرشيقة (Lean) وISO 9001 وكتابة المواصفات الوظيفية؛ وتكييف سير العمل في أنظمة ERP (Odoo وDolibarr)، وMonday.com.", ru: "Lean, ISO 9001, разработка ТЗ; настройка бизнес-процессов в ERP (Odoo, Dolibarr), Monday.com." } }
      ],
      key: ["ms", "perma", "duo", "gharieni", "kenzalou", "christine"],
      projects: ["permagroup", "duo", "russtudy", "ifaco", "gpao"],
      detail: ["permagroup", "duo"],
      skills: ["project", "strategy", "digital", "textile", "ai"],
      vision: ["strategy", "intl", "innovation"]
    },
    "textile-engineer": {
      file: "Textile-Engineer",
      photo: "assets/img/role-textile.webp",
      short: { fr: "Ingénieur textile", en: "Textile engineer", ar: "مهندس نسيج", ru: "Инженер текстильного производства" },
      title: { fr: "Ingénieur textile · R&D, production & qualité", en: "Textile engineer · R&D, production & quality", ar: "مهندس نسيج · البحث والتطوير والإنتاج والجودة", ru: "Инженер текстильного производства · R&D, производство, качество" },
      summary: {
        fr: "Ingénieur textile diplômé de l'ENIM, également titulaire d'un mastère en ingénierie mathématique. J'ai travaillé à plusieurs étapes de la chaîne de confection : production, contrôle qualité, méthodes, direction des opérations, responsabilité d'un département textile et R&D produit. Je relie les exigences techniques de fabrication à l'organisation, aux outils numériques — GPAO, traçabilité, équilibrage de chaîne — et au marché.",
        en: "A textile engineer (ENIM) who also holds a master's in mathematical engineering. I have worked at several stages of the garment value chain: production, quality control, methods, operations management, heading a textile department and product R&D. I connect technical manufacturing requirements with organisation, digital tools — production management, traceability, line balancing — and the market.",
        ar: "مهندس نسيج متخرّج من المدرسة الوطنية للمهندسين بالمنستير، وحاصل أيضًا على ماجستير في الهندسة الرياضية. عملت في مراحل عدّة من سلسلة صناعة الملابس: الإنتاج، ومراقبة الجودة، ودراسة أساليب العمل، وإدارة العمليات، ورئاسة قسم للنسيج، والبحث والتطوير في المنتجات. وأربط المتطلّبات التقنية للتصنيع بالتنظيم وبالأدوات الرقمية — أنظمة إدارة الإنتاج المحوسبة (GPAO)، والتتبّع، وموازنة خطوط الإنتاج — وباحتياجات السوق.",
        ru: "Дипломированный инженер-текстильщик (ENIM), окончил также магистратуру по математической инженерии. Работал на разных этапах швейного производства: выпуск продукции, контроль качества, технология, операционное управление, руководство текстильным отделом и разработка изделий. Увязываю технические требования к производству с его организацией, цифровыми инструментами (система управления производством, прослеживаемость, балансировка швейного потока) и потребностями рынка."
      },
      highlights: [
        { tags: ["quality", "textile"], title: { fr: "Qualité", en: "Quality", ar: "الجودة", ru: "Качество" }, text: { fr: "Responsable contrôle qualité (Christine Confection, 2010–2011) ; formé à ISO 9001 et au Lean Management.", en: "Quality control manager (Christine Confection, 2010–2011); trained in ISO 9001 and lean management.", ar: "مسؤول مراقبة الجودة (Christine Confection، 2010–2011)، مع تدريب على معيار ISO 9001 والإدارة الرشيقة (Lean).", ru: "Руководитель отдела контроля качества (Christine Confection, 2010–2011); обучение по ISO 9001 и Lean." } },
        { tags: ["textile", "project"], title: { fr: "Production & méthodes", en: "Production & methods", ar: "الإنتاج وأساليب العمل", ru: "Производство и технология" }, text: { fr: "Directeur des opérations, COO (Kenzalou, 2014) ; logiciels d'équilibrage de chaîne et de traçabilité des défauts.", en: "Chief Operating Officer, COO (Kenzalou, 2014); line-balancing and defect-traceability software.", ar: "مدير العمليات COO (Kenzalou، 2014)، وبرامج لموازنة خطوط الإنتاج وتتبّع العيوب.", ru: "Операционный директор, COO (Kenzalou, 2014); ПО для балансировки швейного потока и прослеживаемости дефектов." } },
        { tags: ["textile"], title: { fr: "Département textile", en: "Textile department", ar: "قسم النسيج", ru: "Текстильный отдел" }, text: { fr: "Responsable du département textile chez Gharieni Group — GTIM (2015–2018).", en: "Head of the textile department at Gharieni Group — GTIM (2015–2018).", ar: "رئيس قسم النسيج لدى Gharieni Group — GTIM (2015–2018).", ru: "Руководитель текстильного отдела в Gharieni Group — GTIM (2015–2018)." } },
        { tags: ["textile", "engineering"], title: { fr: "R&D produit & CAO", en: "Product R&D & CAD", ar: "تطوير المنتجات والتصميم بالحاسوب", ru: "Разработка изделий и САПР" }, text: { fr: "Accessoires textiles DUOACCESSORIES (2020), du patronage à la confection et aux méthodes de production ; CAO textile (Lectra, Gerber, CLO 3D) apprise en autodidacte, pratiquée chez Christine Confection et en freelance.", en: "DUOACCESSORIES textile accessories (2020), from pattern-making and sewing to production methods; self-taught in textile CAD (Lectra, Gerber, CLO 3D), used at Christine Confection and on freelance projects.", ar: "إكسسوارات DUOACCESSORIES النسيجية (2020)، من إعداد الباترونات والخياطة إلى أساليب الإنتاج؛ إلى جانب التصميم بمساعدة الحاسوب في النسيج (Lectra وGerber وCLO 3D)، تعلّمته ذاتيًا واستخدمته لدى Christine Confection وفي مشاريع حرّة.", ru: "Текстильные аксессуары DUOACCESSORIES (2020): от лекал и пошива до технологии производства; САПР для швейного производства (Lectra, Gerber, CLO 3D) освоил самостоятельно, применял в Christine Confection и во фриланс-проектах." } }
      ],
      key: ["gharieni", "duo", "kenzalou", "christine", "atm", "sttc"],
      projects: ["duo", "balancing", "traceability", "gpao", "workwear"],
      detail: ["duo"],
      skills: ["textile", "project", "strategy", "digital", "quant"],
      vision: ["innovation", "strategy", "markets"]
    },
    "developer": {
      file: "Developer",
      photo: "assets/img/role-engineer.webp",
      short: { fr: "Développeur web & applications", en: "Web & application developer", ar: "مطوّر ويب وتطبيقات", ru: "Веб-разработчик" },
      title: { fr: "Développeur web & applications · Plateformes, sites multilingues, logiciels métier", en: "Web & application developer · Platforms, multilingual websites, business software", ar: "مطوّر ويب وتطبيقات · منصّات ومواقع متعدّدة اللغات وبرمجيات أعمال", ru: "Веб-разработчик · Платформы, многоязычные сайты, бизнес-приложения" },
      summary: {
        fr: "Ingénieur de formation — textile, puis mastère en ingénierie mathématique —, je développe des sites et des applications web depuis 2019, après avoir conçu dès 2011 des logiciels pour l'industrie : équilibrage de chaîne, traçabilité des défauts, système d'information, application Android. Ma réalisation la plus récente, RusStudy, est une plateforme en quatre langues (dont l'arabe, de droite à gauche) avec un espace de suivi des dossiers par rôles, construite avec React, Node.js et Supabase et déployée sur Vercel. Je prends le temps de comprendre le métier avant d'écrire le code.",
        en: "An engineer by training — textile engineering, then a master's in mathematical engineering — I have been building websites and web applications since 2019, after developing software for industry from 2011: assembly-line balancing, defect traceability, an information system and an Android app. My most recent project, RusStudy, is a four-language platform (including right-to-left Arabic) with a role-based application-tracking portal, built with React, Node.js and Supabase and deployed on Vercel. I take the time to understand the business before writing the code.",
        ar: "مهندس بحكم دراستي — هندسة النسيج ثم ماجستير في الهندسة الرياضية — أطوّر مواقع وتطبيقات الويب منذ 2019، بعد أن صمّمت منذ 2011 برمجيات للصناعة: موازنة خطوط الإنتاج، وتتبّع العيوب، ونظام معلومات، وتطبيق أندرويد. أحدث أعمالي، RusStudy، منصّة بأربع لغات (منها العربية من اليمين إلى اليسار) تضمّ بوابة لمتابعة الملفات حسب أدوار المستخدمين، مبنية بـReact وNode.js وSupabase ومنشورة على Vercel. وأحرص على فهم طبيعة النشاط قبل كتابة الشيفرة.",
        ru: "Инженер по образованию: текстильная инженерия, затем магистратура по математической инженерии. С 2019 года разрабатываю сайты и веб-приложения, а начиная с 2011 года создавал программы для производства: балансировка швейного потока, прослеживаемость дефектов, информационная система, Android-приложение. Последний проект — RusStudy: платформа на четырёх языках (включая арабский с письмом справа налево) с кабинетом отслеживания заявок и ролями пользователей, на React, Node.js и Supabase, развёрнутая на Vercel. Прежде чем писать код, разбираюсь в задачах бизнеса."
      },
      highlights: [
        { tags: ["web"], title: { fr: "Plateforme web", en: "Web platform", ar: "منصّة ويب", ru: "Веб-платформа" }, text: { fr: "RusStudy : React, Node.js, Supabase, déploiement sur Vercel ; espace de suivi des dossiers avec rôles admin, consultant et étudiant.", en: "RusStudy: React, Node.js, Supabase, deployed on Vercel; application-tracking portal with admin, consultant and student roles.", ar: "RusStudy: React وNode.js وSupabase مع النشر على Vercel، وبوابة لمتابعة الملفات بأدوار المشرف والمستشار والطالب.", ru: "RusStudy: React, Node.js, Supabase, развёртывание на Vercel; кабинет отслеживания заявок с ролями администратора, консультанта и студента." } },
        { tags: ["web", "seo"], title: { fr: "Front-end multilingue", en: "Multilingual front end", ar: "واجهات متعدّدة اللغات", ru: "Многоязычный фронтенд" }, text: { fr: "Sites en 4 langues avec mise en page de droite à gauche et SEO technique ; sites vitrines en HTML, CSS et JavaScript (Yulia Gorbel, PermaGroup).", en: "Four-language sites with right-to-left layout and technical SEO; business websites in HTML, CSS and JavaScript (Yulia Gorbel, PermaGroup).", ar: "مواقع بأربع لغات بتخطيط من اليمين إلى اليسار وتحسين تقني لمحركات البحث، ومواقع تعريفية بـHTML وCSS وJavaScript (Yulia Gorbel وPermaGroup).", ru: "Сайты на четырёх языках с вёрсткой справа налево и техническим SEO; сайты-визитки на HTML, CSS и JavaScript (Yulia Gorbel, PermaGroup)." } },
        { tags: ["web", "erp"], title: { fr: "Logiciels métier", en: "Business software", ar: "برمجيات الأعمال", ru: "Бизнес-приложения" }, text: { fr: "Système d'information de l'entreprise QUEEN (freelance, 2013), application Android de suivi commercial, logiciels de traçabilité et d'équilibrage de chaîne.", en: "Information system for QUEEN (freelance, 2013), Android sales-tracking app, traceability and line-balancing software.", ar: "نظام معلومات لشركة QUEEN (عمل حرّ، 2013)، وتطبيق أندرويد لتتبّع المبيعات، وبرامج للتتبّع ولموازنة خطوط الإنتاج.", ru: "Информационная система для компании QUEEN (фриланс, 2013), Android-приложение для учёта продаж, ПО для прослеживаемости и балансировки потока." } },
        { tags: ["data", "web"], title: { fr: "Algorithmique & données", en: "Algorithms & data", ar: "الخوارزميات والبيانات", ru: "Алгоритмы и данные" }, text: { fr: "C++, OpenCV, Matlab, Python : vision par ordinateur, reconstruction 3D, modélisation ; mastère en ingénierie mathématique.", en: "C++, OpenCV, Matlab, Python: computer vision, 3D reconstruction, modelling; master's in mathematical engineering.", ar: "C++ وOpenCV وMatlab وPython: الرؤية الحاسوبية وإعادة البناء ثلاثي الأبعاد والنمذجة، مع ماجستير في الهندسة الرياضية.", ru: "C++, OpenCV, Matlab, Python: компьютерное зрение, 3D-реконструкция, моделирование; магистратура по математической инженерии." } }
      ],
      key: ["ms", "ifaco", "queen"],
      projects: ["russtudy", "yulia", "permagroup", "android", "queen-si", "traceability", "vision"],
      detail: ["russtudy", "yulia"],
      skills: ["digital", "seo", "ai", "quant", "project"],
      vision: ["ai", "entrepreneur", "innovation"]
    }
  },
  /*
   * Générateur de CV (cv/generateur/) : il lit le poste et l'annonce, repère les thèmes
   * ci-dessous grâce à leurs mots-clés (sans accents, en minuscules), puis choisit les
   * expériences, projets, compétences, ambitions et atouts dont les étiquettes (tags)
   * correspondent. Il n'écrit aucun texte : tout vient de ce fichier.
   * Un nouvel élément (expérience, projet, groupe de compétences…) doit recevoir ses tags ici.
   */
  CV_GENERATOR: {
    topics: {
      web: { label: "Développement web", words: ["developpeur", "developer", "developpement", "development", "web", "frontend", "front-end", "backend", "back-end", "full stack", "fullstack", "full-stack", "javascript", "js", "typescript", "react", "next.js", "node", "html", "css", "api", "supabase", "wordpress", "php", "logiciel", "software", "application", "app", "mobile", "android", "integrateur", "programm", "code", "разработчик", "программист", "веб", "сайт", "مطور", "مطوّر", "برمجة", "الويب", "تطبيق"] },
      seo: { label: "SEO & contenu", words: ["seo", "referencement", "indexation", "indexing", "search engine", "moteur de recherche", "google", "hreflang", "sitemap", "contenu", "content", "blog", "redaction", "redacteur", "copywriting", "sea", "search console", "analytics", "mots-cles", "keyword", "netlinking", "trafic", "traffic", "сео", "продвижен", "поисков", "محركات البحث", "سيو"] },
      marketing: { label: "Marketing & communication", words: ["marketing", "communication", "marque", "brand", "branding", "reseaux sociaux", "social media", "community", "campagne", "campaign", "emailing", "mailchimp", "ads", "publicite", "acquisition", "growth", "canva", "photoshop", "graphi", "маркетинг", "реклам", "تسويق", "إعلان"] },
      business: { label: "Développement commercial", words: ["business developer", "business development", "commercial", "vente", "ventes", "sales", "prospection", "prospect", "partenariat", "partnership", "partenaire", "client", "negociation", "account", "b2b", "export", "marche", "market", "chiffre d'affaires", "revenue", "продаж", "развитию бизнеса", "клиент", "مبيعات", "تطوير الأعمال", "تجاري", "عملاء"] },
      project: { label: "Gestion de projet", words: ["chef de projet", "project manager", "projet", "project", "pmo", "coordination", "coordinat", "planning", "pilotage", "management", "manager", "scrum", "agile", "delivery", "deploiement", "руководитель проект", "проект", "مدير مشروع", "مدير مشاريع", "مشاريع"] },
      consulting: { label: "Conseil & organisation", words: ["conseil", "consultant", "consulting", "accompagnement", "strategie", "strategy", "organisation", "audit", "diagnostic", "консалт", "консультант", "استشار", "مستشار"] },
      erp: { label: "ERP & transformation digitale", words: ["erp", "odoo", "dolibarr", "crm", "salesforce", "monday", "transformation digitale", "digital transformation", "digitalisation", "automatisation", "automation", "processus", "workflow", "n8n", "gpao", "systeme d'information", "цифров", "автоматизац", "رقمنة", "التحول الرقمي", "أتمتة"] },
      textile: { label: "Textile & confection", words: ["textile", "confection", "habillement", "garment", "apparel", "fashion", "mode", "couture", "sewing", "patronage", "pattern", "modelisme", "cao", "cad", "lectra", "gerber", "clo 3d", "tricot", "knit", "tissu", "fabric", "usine", "factory", "atelier", "швей", "текстил", "одежд", "نسيج", "ملابس", "خياطة"] },
      quality: { label: "Qualité & production", words: ["qualite", "quality", "iso", "lean", "controle", "control", "amelioration continue", "continuous improvement", "methodes", "production", "industrialisation", "operations", "качеств", "производств", "جودة", "الإنتاج"] },
      engineering: { label: "Ingénierie & R&D", words: ["ingenieur", "engineer", "engineering", "r&d", "recherche", "research", "innovation", "developpement produit", "product development", "инженер", "مهندس", "هندسة", "البحث والتطوير"] },
      data: { label: "Données & analyse", words: ["data", "donnees", "analyse", "analysis", "analyst", "analyste", "statisti", "econometr", "modelisation", "modelling", "modeling", "matlab", "python", "machine learning", "vision", "opencv", "c++", "math", "данны", "аналит", "بيانات", "تحليل"] },
      ai: { label: "IA & automatisation", words: ["ia", "ai", "intelligence artificielle", "artificial intelligence", "chatgpt", "claude", "gemini", "elevenlabs", "prompt engineering", "llm", "genai", "generative", "prompt", "midjourney", "ии", "нейросет", "الذكاء الاصطناعي"] }
    },
    // Profil de départ (titre court, résumé) le plus proche des thèmes repérés
    bases: { "seo": ["seo", "marketing"], "business-developer": ["business", "consulting"], "project-manager": ["project", "consulting", "quality"], "textile-engineer": ["textile", "quality", "engineering"], "developer": ["web", "data", "erp"] },
    // Compétences souvent attendues pour chaque thème, proposées même si l'annonce ne les cite pas
    // (libellés pris dans requirements ci-dessous).
    expected: {
      web: ["Git", "API REST", "TypeScript", "SQL", "UX · UI"],
      seo: ["Google Search Console", "Google Analytics", "Google Ads", "Rédaction de contenu", "Netlinking", "WordPress"],
      marketing: ["Google Ads", "Facebook / Meta Ads", "Réseaux sociaux", "E-mailing", "Canva", "Google Analytics"],
      business: ["Prospection", "Négociation", "CRM", "B2B", "Grands comptes"],
      project: ["Gestion de projet", "Agile · Scrum", "Jira", "Budget", "Management d'équipe"],
      consulting: ["Gestion de projet", "Business plan", "Excel"],
      erp: ["ERP", "Odoo", "SAP", "CRM", "Excel"],
      textile: ["Patronage", "Confection", "Lectra", "CLO 3D", "Contrôle qualité"],
      quality: ["Contrôle qualité", "ISO 9001", "Lean", "Six Sigma"],
      engineering: ["Excel", "Méthodes · industrialisation"],
      data: ["Excel", "Python", "SQL", "Power BI", "Statistiques"],
      ai: ["IA générative", "Prompt engineering", "Automatisation (n8n, Zapier…)"]
    },
    /*
     * Exigences reconnues dans une annonce. Le générateur cherche ces mots (sans accents) dans
     * l'annonce, puis dans le CV pour dire si la compétence y figure déjà. lang : code de LANGUAGES.
     */
    requirements: [
      ["React", ["react", "react.js", "reactjs"]], ["Next.js", ["next.js", "nextjs"]], ["Node.js", ["node.js", "nodejs", "node"]],
      ["JavaScript", ["javascript"]], ["TypeScript", ["typescript"]], ["HTML · CSS", ["html", "css"]], ["PHP", ["php"]],
      ["Python", ["python"]], ["SQL", ["sql", "mysql"]], ["PostgreSQL", ["postgresql", "postgres"]], ["Supabase", ["supabase"]],
      ["API REST", ["api rest", "rest api", "api"]], ["Git", ["git", "github", "gitlab"]], ["Docker", ["docker"]], ["AWS", ["aws", "amazon web services"]],
      ["WordPress", ["wordpress"]], ["Vercel", ["vercel"]], ["Figma", ["figma"]], ["UX · UI", ["ux", "ui", "ux/ui"]], ["Android", ["android"]],
      ["C++", ["c++"]], ["Java", ["java"]], ["WinDev", ["windev"]],
      ["SEO", ["seo", "referencement", "сео"]], ["Google Search Console", ["search console"]], ["Google Analytics", ["google analytics", "analytics", "ga4"]],
      ["Google Ads", ["google ads", "adwords", "sea"]], ["Facebook / Meta Ads", ["facebook ads", "meta ads"]], ["Rédaction de contenu", ["redaction", "copywriting", "content writing", "redacteur", "blog"]],
      ["Netlinking", ["netlinking", "backlink", "backlinks"]], ["Réseaux sociaux", ["reseaux sociaux", "social media", "smm", "смм"]], ["E-mailing", ["emailing", "e-mailing", "email marketing", "mailchimp"]],
      ["Google Business Profile", ["google business", "google my business"]], ["Canva", ["canva"]], ["Photoshop", ["photoshop"]], ["Illustrator", ["illustrator"]],
      ["Prospection", ["prospection", "prospecting", "lead generation", "поиск клиентов"]], ["Négociation", ["negociation", "negotiation", "переговор"]],
      ["CRM", ["crm"]], ["Salesforce", ["salesforce"]], ["B2B", ["b2b"]], ["Export / international", ["export", "international"]],
      ["Grands comptes", ["grands comptes", "key account", "ключевых клиент"]], ["Business plan", ["business plan"]],
      ["Gestion de projet", ["gestion de projet", "project management", "chef de projet", "project manager", "управление проект"]],
      ["Agile · Scrum", ["agile", "scrum"]], ["Jira", ["jira"]], ["Trello", ["trello"]], ["Monday.com", ["monday"]], ["PMP · Prince2", ["pmp", "prince2"]],
      ["Management d'équipe", ["gestion d'equipe", "management d'equipe", "team management", "team lead", "encadrement", "motivation du personnel", "управление команд"]], ["Budget", ["budget", "budgetaire"]],
      ["Lean", ["lean"]], ["Six Sigma", ["six sigma"]], ["ISO 9001", ["iso 9001", "iso"]], ["Contrôle qualité", ["controle qualite", "quality control", "контроль качества"]],
      ["GPAO", ["gpao", "mrp"]], ["Lectra", ["lectra"]], ["Gerber", ["gerber"]], ["CLO 3D", ["clo 3d", "clo3d"]], ["Patronage", ["patronage", "pattern making", "лекал"]],
      ["Confection", ["confection", "garment", "швейн"]], ["Méthodes · industrialisation", ["methodes", "industrialisation"]],
      ["ERP", ["erp"]], ["Odoo", ["odoo"]], ["Dolibarr", ["dolibarr"]], ["SAP", ["sap"]], ["Excel", ["excel"]], ["Power BI", ["power bi"]],
      ["Matlab", ["matlab"]], ["Statistiques", ["statistique", "statistics", "statistical"]], ["Machine learning", ["machine learning"]],
      ["IA générative", ["ia generative", "generative ai", "genai", "chatgpt", "llm"]], ["Prompt engineering", ["prompt"]], ["Claude", ["claude"]], ["Gemini", ["gemini"]],
      ["Automatisation (n8n, Zapier…)", ["n8n", "zapier", "make.com", "automatisation", "automation"]],
      ["Anglais", ["anglais", "english", "английск"], "EN"], ["Français", ["francais", "french", "французск"], "FR"],
      ["Arabe", ["arabe", "arabic", "арабск"], "AR"], ["Russe", ["russe", "russian", "русск"], "RU"], ["Allemand", ["allemand", "german", "немецк"], "DE"],
      ["Permis B", ["permis b", "permis de conduire", "driving licence", "driving license"]]
    ],
    tags: {
      ms: ["business", "project", "consulting", "erp", "web", "marketing", "seo"],
      wereact: ["business", "consulting"],
      ifaco: ["business", "marketing", "web", "consulting", "seo"],
      duo: ["textile", "engineering", "business", "erp"],
      perma: ["business", "project", "marketing", "web", "seo"],
      woo: ["business", "project"],
      gharieni: ["textile", "project", "quality"],
      kenzalou: ["textile", "project", "quality"],
      queen: ["web", "erp"],
      atm: ["textile", "business"],
      christine: ["textile", "quality"],
      sttc: ["textile", "quality"],
      russtudy: ["web", "seo", "marketing"],
      permagroup: ["business", "web", "marketing", "project"],
      yulia: ["web", "marketing"],
      nurens: ["marketing", "ai"],
      intellect: ["web", "marketing", "consulting"],
      plant3d: ["data", "engineering"],
      marsa: ["business", "textile"],
      vision: ["data", "web", "ai"],
      android: ["web", "business"],
      "queen-si": ["web", "erp"],
      ariana: ["business", "textile"],
      workwear: ["business", "textile"],
      traceability: ["web", "quality", "textile"],
      balancing: ["web", "textile", "data"],
      gpao: ["textile", "erp", "quality"],
      "skill:strategy": ["business", "consulting", "marketing"],
      "skill:project": ["project", "quality", "consulting"],
      "skill:textile": ["textile", "quality", "engineering"],
      "skill:digital": ["web", "erp"],
      "skill:seo": ["seo", "marketing", "web"],
      "skill:marketing": ["marketing"],
      "skill:ai": ["ai", "web"],
      "skill:quant": ["data", "engineering"],
      "vision:intl": ["consulting", "business"],
      "vision:markets": ["business", "marketing"],
      "vision:ai": ["ai", "web", "erp"],
      "vision:entrepreneur": ["business", "web"],
      "vision:innovation": ["engineering", "textile", "data"],
      "vision:strategy": ["project", "consulting"]
    }
  }
};
