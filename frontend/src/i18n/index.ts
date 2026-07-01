import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      architecture: 'Projects',
      matrix: 'Skills',
      about: 'About',
      contact: 'Contact',
      resume: 'CVC',
    },
    home: {
      systemInit: 'System Initialized // Computer Engineering Candidate',
      title: 'Bridging the gap between hardware & software.',
      subtitle:
        'I am a Full-Stack Systems Engineer specializing in robotics integration, low-level logic (C/C++), and high-performance web architecture (Vue/Node).',
      btnProjects: 'View Projects',
      btnSkills: 'My skillset',
      btnResume: 'Download Resume',
      categories: {
        lowlevel: {
          title: 'Low-Level Systems',
          desc: 'Memory management, algorithms, and logic execution.',
        },
        robotics: {
          title: 'Robotics & Hardware',
          desc: 'Industrial automation, sensor fusion, and rapid prototyping.',
        },
        web: {
          title: 'Web Architecture',
          desc: 'Responsive dashboards and scalable backend APIs.',
        },
      },
      marquee: {
        fast: '🚀 Fast',
        secure: '🔒 Secure',
        reliable: '⚡️ Reliable',
      },
    },
    skills: {
      returnMain: 'Return to Main System',
      title: 'Competency Matrix',
      subtitle:
        'A categorized breakdown of my technical proficiencies across hardware, firmware, and scalable web infrastructure.',
      categories: {
        hardware: {
          title: 'Hardware & Systems',
          description: 'Physical architecture and mechanical design.',
          skills: ['Fusion 360 (Intermediate)', 'Sensor Fusion', 'Robotics Logic'],
        },
        lowlevel: {
          title: 'Low-Level Languages',
          description: 'Memory management and firmware execution.',
          skills: ['C', 'C++', 'Lua'],
        },
        frontend: {
          title: 'Web Frontend',
          description: 'High-performance UI and state management.',
          skills: ['Vue 3', 'Tailwind CSS', 'Next.js', 'SCSS/CSS'],
        },
        backend: {
          title: 'Backend & Databases',
          description: 'API design, data persistence, and routing.',
          skills: ['Node.js', 'Java Spring Boot', 'SQL'],
        },
        tooling: {
          title: 'Tooling & Workflows',
          description: 'Version control and systems testing.',
          skills: ['Git', 'Postman', 'REST API Design'],
        },
      },
    },
    projects: {
      returnMain: 'Return to Main System',
      title: 'System Architecture',
      subtitle:
        'Core engineering case studies, hardware integrations, and technical implementations.',
      clickForMore: 'Click for more',
      liveDemo: 'Live Demo',
      keyFeatures: 'Key Features',
      p1: {
        title: 'Industrial Systems Integration',
        desc: 'Automated a 6-axis industrial robotic arm synchronized with a secondary rotator plate. Integrated an image recognition camera to process visual data and trigger precise, asynchronous hardware actuation.',
        features: [
          'Image recognition',
          'Robot arm movement',
          'State base operation',
          'Emergency stops',
          'Human-Robot operations',
        ],
      },
      p2: {
        title: 'RoboCup RMRC Autonomous Robot',
        desc: 'Designed and programmed an autonomous robot for hazardous environment navigation over a 2-year competitive period. Engineered custom 3D-printed chassis components in Fusion 360 and developed C++ control loops for obstacle avoidance and victim identification.',
        features: [
          'QR code reader',
          'AI Hazard recognition',
          '3D modelling',
          'Controllable robot arm',
        ],
      },
      p3: {
        title: 'Bit-Level Text File Compressor',
        desc: 'Built a custom text file compressor utilizing the Huffman coding algorithm. Managed memory allocation, binary tree construction, and bit-level file I/O to achieve measurable compression ratios.',
        features: ['Encoding a text file', 'Decoding a text file', 'CLI menu for the user'],
      },
      p4: {
        title: 'Digital RecipeBook',
        desc: 'A Digital RecipeBook. Basic add, remove, edit, a recipe. The recipe book has a function which gives a user a suggestion by the user custom choices.',
        features: [
          'Encoding a text file',
          'Decoding a text file',
          'CLI menu for the user',
          'Data structures',
          '3 text database implementation',
        ],
      },
      p5: {
        title: 'Call Center State Website',
        desc: 'A website which stores the states of the call and let the user know which numbers to call back. I was responsible for the frontend site of the projects, which interact with the user. We did a Login and authentication service in the site.',
        features: ['authenticate Login', 'Shows the state of the numbers'],
      },
    },
    contact: {
      returnMain: 'Return to Main System',
      openChannel: '// Open Channel',
      title: 'Contact',
      subtitle:
        'Have a project, collaboration, or question? Drop a message and I\'ll get back to you as soon as possible.',
      successTitle: 'Message transmitted.',
      successSubtitle: 'I\'ll get back to you soon.',
      btnSendAnother: 'Send another',
      labelName: 'Name',
      placeholderName: 'Your name',
      labelEmail: 'Email',
      placeholderEmail: 'your@email.com',
      labelMessage: 'Message',
      placeholderMessage: 'Describe your project or question...',
      btnSend: 'Send Message',
      btnSending: 'Transmitting...',
      error: '⚠ Transmission failed: {error}. Try again or email me directly.',
    },
    about: {
      returnMain: "Return to Main System",
      label: "// Bio & Philosophy",
      title: "About Me",
      subtitle: "Full-Stack Systems Engineer bridging the gap between mechanical design, low-level firmware, and web architectures.",
      meta: {
        title: "System Parameters",
        role: "Role",
        roleVal: "Computer Engineering Student",
        focus: "Focus",
        focusVal: "Robotics & Full-Stack",
        location: "Base Location",
        locationVal: "Hungary",
        status: "System Status",
        statusVal: "Active / Available",
      },
      storyTitle: "Engineering Philosophy",
      storyBody1: "I began my journey at the intersection of bits and steel, fascinated by how software instructions materialize into hardware movements. Over the years, this curiosity led me to master Fusion 360 for mechanical CAD, C/C++ for real-time controllers, and Vue/Node.js for high-speed dashboard analytics.",
      storyBody2: "Whether configuring a 6-axis robotic arm, tuning obstacle avoidance loops for autonomous search-and-rescue, or deploying secure Spring Boot APIs, my approach remains performance-driven and reliable.",
      valuesTitle: "Core Directives",
      credentials: "Credentials",
      values: {
        v1: {
          title: "Hardware Integration",
          desc: "Designing and integrating mechanical parts with microcontroller-driven actuators and multi-sensor systems."
        },
        v2: {
          title: "Low-Level Performance",
          desc: "Writing optimized, memory-efficient C and C++ algorithms that execute directly on bare metal without overhead."
        },
        v3: {
          title: "Full-Stack Delivery",
          desc: "Developing fast, responsive, and secure web architectures to visualize system telemetry and manage processes."
        }
      }
    },
  },
  hu: {
    nav: {
      architecture: 'Projektjeim',
      matrix: 'Skillek',
      about: 'Rólam',
      contact: 'Kapcsolat',
      resume: 'CVC',
    },
    home: {
      systemInit: 'Rendszer Inicializálva // Mérnökinformatikus Jelölt',
      title: 'A hardver és szoftver közötti szakadék áthidalása.',
      subtitle:
        'Egy Full-Stack Rendszer Mérnök vagyok aki robot integrációkban, kis logikai szintű, magas teljesítményt hozó web architektúrakban specializált',
      btnProjects: 'Projektek Megtekintése',
      btnSkills: 'Technológiáim',
      btnResume: 'Önéletrajz Letöltése',
      categories: {
        lowlevel: {
          title: 'Alacsony szintű rendszerek',
          desc: 'Memóriakezelés, algoritmusok és logikai végrehajtás.',
        },
        robotics: {
          title: 'Robotika és Hardver',
          desc: 'Ipari automatizálás, szenzorfúzió és gyors prototípus-készítés.',
        },
        web: {
          title: 'Webes Architektúra',
          desc: 'Reszponzív műszerfalak és skálázható backend API-k.',
        },
      },
      marquee: {
        fast: '🚀 Gyors',
        secure: '🔒 Biztonságos',
        reliable: '⚡️ Megbízható',
      },
    },
    skills: {
      returnMain: 'Visszatérés a fő rendszerhez',
      title: 'Kompetencia Mátrix',
      subtitle:
        'Technikai jártasságaim kategorizált lebontása hardver, firmware és skálázható webes infrastruktúra területén.',
      categories: {
        hardware: {
          title: 'Hardver és Rendszerek',
          description: 'Fizikai architektúra és mechanikai tervezés.',
          skills: ['Fusion 360 (Középszint)', 'Szenzorfúzió', 'Robotikai Logika'],
        },
        lowlevel: {
          title: 'Alacsony szintű nyelvek',
          description: 'Memóriakezelés és firmware végrehajtás.',
          skills: ['C', 'C++', 'Lua'],
        },
        frontend: {
          title: 'Web Frontend',
          description: 'Nagy teljesítményű UI és állapotkezelés.',
          skills: ['Vue 3', 'Tailwind CSS', 'Next.js', 'SCSS/CSS'],
        },
        backend: {
          title: 'Backend és Adatbázisok',
          description: 'API tervezés, adatperzisztencia és útvonalválasztás.',
          skills: ['Node.js', 'Java Spring Boot', 'SQL'],
        },
        tooling: {
          title: 'Eszközök és Munkafolyamatok',
          description: 'Verziókezelés és rendszertesztelés.',
          skills: ['Git', 'Postman', 'REST API Tervezés'],
        },
      },
    },
    projects: {
      returnMain: 'Visszatérés a fő rendszerhez',
      title: 'Rendszer Architektúra',
      subtitle:
        'Alapvető mérnöki esettanulmányok, hardverintegrációk és technikai implementációk.',
      clickForMore: 'Kattintson a részletekért',
      liveDemo: 'Élő Demó',
      keyFeatures: 'Főbb Jellemzők',
      p1: {
        title: 'Ipari Rendszerintegráció',
        desc: 'Automatizáltam egy 6 tengelyes ipari robotkart, amelyet szinkronizáltam egy másodlagos forgótányérral. Integráltam egy képfelismerő kamerát a vizuális adatok feldolgozására és a precíz, aszinkron hardveres működtetés elindítására.',
        features: [
          'Képfelismerés',
          'Robotkar mozgatás',
          'Állapotgép alapú működés',
          'Vészleállítók',
          'Ember-robot együttműködés',
        ],
      },
      p2: {
        title: 'RoboCup RMRC Autonóm Robot',
        desc: 'Terveztem és programoztam egy autonóm robotot veszélyes környezetben való navigálásra egy 2 éves versenyidőszak alatt. Egyedi, 3D nyomtatott alvázkomponenseket terveztem Fusion 360-ban, és C++ szabályozási köröket fejlesztettem ki az akadályok elkerülésére és az áldozatok azonosítására.',
        features: [
          'QR-kód olvasó',
          'AI veszélyfelismerés',
          '3D modellezés',
          'Vezérelhető robotkar',
        ],
      },
      p3: {
        title: 'Bit-szintű Szöveges Fájl Tömörítő',
        desc: 'Készítettem egy egyedi szövegfájl-tömörítőt a Huffman-kódolási algoritmus segítségével. Kezeltem a memóriafoglalást, a bináris fa felépítését és a bit-szintű fájl I/O műveleteket a mérhető tömörítési arány elérése érdekében.',
        features: ['Szöveges fájl kódolása', 'Szöveges fájl dekódolása', 'CLI menü a felhasználónak'],
      },
      p4: {
        title: 'Digitális Receptkönyv',
        desc: 'Egy digitális receptkönyv receptek alapvető hozzáadásához, törléséhez és szerkesztéséhez. A receptkönyv rendelkezik egy olyan funkcióval is, amely a felhasználó egyéni választásai alapján tesz javaslatot.',
        features: [
          'Szöveges fájl kódolása',
          'Szöveges fájl dekódolása',
          'CLI menü a felhasználónak',
          'Adatszerkezetek',
          '3 szöveges adatbázis implementáció',
        ],
      },
      p5: {
        title: 'Call Center Állapot Nyomonkövető Weboldal',
        desc: 'Egy weboldal, amely tárolja a hívások állapotát, és jelzi a felhasználónak, hogy mely számokat kell visszahívni. Felelős voltam a projekt frontend részéért, amely a felhasználóval interaktál. Belépési és hitelesítési szolgáltatást is készítettünk az oldalon.',
        features: ['Belépés hitelesítése', 'Mutatja a számok állapotát'],
      },
    },
    contact: {
      returnMain: 'Visszatérés a fő rendszerhez',
      openChannel: '// Csatorna megnyitása',
      title: 'Kapcsolat',
      subtitle:
        'Projektje, együttműködési ötlete vagy kérdése van? Hagyjon üzenetet, és a lehető leghamarabb válaszolok.',
      successTitle: 'Üzenet sikeresen elküldve.',
      successSubtitle: 'Hamarosan jelentkezem.',
      btnSendAnother: 'Új üzenet küldése',
      labelName: 'Név',
      placeholderName: 'Az Ön neve',
      labelEmail: 'E-mail',
      placeholderEmail: 'your@email.com',
      labelMessage: 'Üzenet',
      placeholderMessage: 'Írja le a projektet vagy kérdését...',
      btnSend: 'Üzenet elküldése',
      btnSending: 'Küldés...',
      error: '⚠ Az átvitel sikertelen: {error}. Próbálja újra, vagy írjon közvetlenül e-mailt.',
    },
    about: {
      returnMain: "Visszatérés a fő rendszerhez",
      label: "// Életrajz és Filozófia",
      title: "Rólam",
      subtitle: "Full-Stack Rendszermérnök, aki áthidalja a szakadékot a mechanikai tervezés, az alacsony szintű firmware és a webes architektúrák között.",
      meta: {
        title: "Rendszer Paraméterek",
        role: "Szerepkör",
        roleVal: "Mérnökinformatikus Jelölt",
        focus: "Fókusz",
        focusVal: "Robotika és Full-Stack",
        location: "Székhely",
        locationVal: "Magyarország",
        status: "Rendszer Állapot",
        statusVal: "Aktív / Elérhető",
      },
      storyTitle: "Mérnöki Filozófia",
      storyBody1: "A bitek és az acél találkozásánál kezdtem a pályafutásomat, lenyűgözött, hogyan válnak a szoftveres utasítások hardveres mozgássá. Az évek során ez a kíváncsiság vezetett el a Fusion 360 gépészeti CAD modellezéséhez, a C/C++ valós idejű vezérlők programozásához, valamint a Vue/Node.js alapú gyors műszerfalak fejlesztéséhez.",
      storyBody2: "Legyen szó egy 6 tengelyes ipari robotkar konfigurálásáról, autonóm mentőrobotok akadályelkerülő szabályozási köreinek finomhangolásáról, vagy biztonságos Spring Boot API-k telepítéséről, a megközelítésem mindig teljesítmény-orientált és megbízható.",
      valuesTitle: "Alapvető Irányelvek",
      values: {
        v1: {
          title: "Hardver Integráció",
          desc: "Mechanikus alkatrészek tervezése és integrálása mikrokontroller-vezérelt aktuátorokkal és szenzorrendszerekkel."
        },
        v2: {
          title: "Alacsony szintű teljesítmény",
          desc: "Optimalizált, memória-hatékony C és C++ algoritmusok írása, amelyek közvetlenül a hardveren futnak felesleges erőforrás-pazarlás nélkül."
        },
        v3: {
          title: "Full-Stack szoftverek",
          desc: "Gyors, reszponzív és biztonságos webes architektúrák fejlesztése a rendszerek telemetriájának megjelenítésére és a folyamatok kezelésére."
        }
      }
    },
  },
}

const i18n = createI18n({
  legacy: false, // required for composition API
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
