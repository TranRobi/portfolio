import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      architecture: 'Projects',
      matrix: 'Skills',
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
    },
  },
  hu: {
    nav: {
      architecture: 'Projektjeim',
      matrix: 'Skillek',
      contact: 'Kapcsolat',
      resume: 'CVC',
    },
    home: {
      systemInit: 'Rendszer Inicializálva // Mérnökinformatikus Jelölt',
      title: 'A hardver és szoftver közötti szakadék áthidalása.',
      subtitle:
        'Egy Full-Stack Rendszer Mérnök vagyok aki robot integrációkban, kis logikai szintű, magas teljesítményt hozó web architektúrakban specializált',
      btnProjects: 'Projectek Megtekintése',
      btnSkills: 'Technológiáim',
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
