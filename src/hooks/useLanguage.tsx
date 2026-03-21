import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface Translations {
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  services: {
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  stats: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    ctaButton: string;
    items: {
      label: string;
      description: string;
    }[];
  };
  portfolio: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    viewCase: string;
  };
  footer: {
    description: string;
    navigation: string;
    services: string;
    contact: string;
    home: string;
    solutions: string;
    cases: string;
    copyright: string;
    scrollTop: string;
  };
  navbar: {
    home: string;
    solutions: string;
    cases: string;
    contact: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    hero: {
      badge: "RESULTADOS REAIS. ENTREGA EM 15 DIAS.",
      headline1: "Sites profissionais para ",
      headline2: "alcançar mais clientes",
      subtitle: "Transformamos sua presença online com sites modernos, otimizados e responsivos, design exclusivo, SEO e estratégias digitais eficientes para crescer.",
      cta1: "COMECE SEU PROJETO AGORA",
      cta2: "VER PROJETOS REAIS",
    },
    services: {
      title1: "Nossos",
      title2: "Serviços",
      subtitle: "Soluções completas para transformar sua presença digital",
      cta: "SOLICITE SEU ORÇAMENTO",
      items: [
        { title: "Construções de site", description: "Presença digital profissional para atrair e converter clientes." },
        { title: "Tráfego", description: "Campanhas inteligentes para atrair clientes certos e aumentar suas vendas." },
        { title: "Identidade Visual", description: "Criação de logotipo e identidade única que traduzem a essência da sua marca." },
        { title: "Design", description: "Layouts criativos e profissionais que destacam seu negócio com impacto visual." },
        { title: "SEO", description: "Otimização para Google: mais visibilidade e clientes encontrando sua empresa online." },
        { title: "Copywriting", description: "Textos persuasivos que transformam visitantes em clientes e aumentam conversões." },
      ],
    },
    stats: {
      badge: "NOSSOS NÚMEROS",
      title1: "Resultados que",
      title2: "Falam por Si",
      subtitle: "Números que representam nossa dedicação e compromisso com a excelência em cada projeto que desenvolvemos.",
      cta: "Pronto para fazer parte dessas estatísticas?",
      ctaButton: "Iniciar Projeto",
      items: [
        { label: "Projetos Entregues", description: "Sites, apps e sistemas desenvolvidos" },
        { label: "Clientes Satisfeitos", description: "Empresas que confiam em nosso trabalho" },
        { label: "Anos de Experiência", description: "Atuando no mercado digital" },
        { label: "Taxa de Satisfação", description: "Clientes que nos recomendam" },
      ],
    },
    portfolio: {
      badge: "NOSSO PORTFÓLIO",
      title1: "Cases de",
      title2: "Sucesso",
      subtitle: "Conheça alguns dos projetos que desenvolvemos e os resultados alcançados por nossos clientes.",
      cta: "VER TODOS OS CASES",
      viewCase: "Ver Case",
    },
    footer: {
      description: "Transformando ideias em experiências digitais memoráveis. Especialistas em criar soluções web que geram resultados.",
      navigation: "Navegação",
      services: "Serviços",
      contact: "Contato",
      home: "Início",
      solutions: "Soluções",
      cases: "Cases",
      copyright: "Todos os direitos reservados.",
      scrollTop: "Voltar ao topo",
    },
    navbar: {
      home: "Início",
      solutions: "Soluções",
      cases: "Cases",
      contact: "Contato",
    },
  },
  en: {
    hero: {
      badge: "REAL RESULTS. DELIVERED IN 15 DAYS.",
      headline1: "Professional websites to ",
      headline2: "reach more clients",
      subtitle: "We transform your online presence with modern, optimized, and responsive websites, exclusive design, SEO, and efficient digital strategies to grow.",
      cta1: "START YOUR PROJECT NOW",
      cta2: "SEE REAL PROJECTS",
    },
    services: {
      title1: "Our",
      title2: "Services",
      subtitle: "Complete solutions to transform your digital presence",
      cta: "REQUEST A QUOTE",
      items: [
        { title: "Website Development", description: "Professional digital presence to attract and convert clients." },
        { title: "Traffic", description: "Smart campaigns to attract the right clients and increase your sales." },
        { title: "Visual Identity", description: "Logo creation and unique identity that translates your brand's essence." },
        { title: "Design", description: "Creative and professional layouts that highlight your business with visual impact." },
        { title: "SEO", description: "Google optimization: more visibility and clients finding your company online." },
        { title: "Copywriting", description: "Persuasive texts that turn visitors into clients and increase conversions." },
      ],
    },
    stats: {
      badge: "OUR NUMBERS",
      title1: "Results that",
      title2: "Speak for Themselves",
      subtitle: "Numbers that represent our dedication and commitment to excellence in every project we develop.",
      cta: "Ready to be part of these statistics?",
      ctaButton: "Start Project",
      items: [
        { label: "Projects Delivered", description: "Websites, apps and systems developed" },
        { label: "Satisfied Clients", description: "Companies that trust our work" },
        { label: "Years of Experience", description: "Operating in the digital market" },
        { label: "Satisfaction Rate", description: "Clients who recommend us" },
      ],
    },
    portfolio: {
      badge: "OUR PORTFOLIO",
      title1: "Success",
      title2: "Cases",
      subtitle: "Discover some of the projects we developed and the results achieved by our clients.",
      cta: "VIEW ALL CASES",
      viewCase: "View Case",
    },
    footer: {
      description: "Transforming ideas into memorable digital experiences. Specialists in creating web solutions that generate results.",
      navigation: "Navigation",
      services: "Services",
      contact: "Contact",
      home: "Home",
      solutions: "Solutions",
      cases: "Cases",
      copyright: "All rights reserved.",
      scrollTop: "Back to top",
    },
    navbar: {
      home: "Home",
      solutions: "Solutions",
      cases: "Cases",
      contact: "Contact",
    },
  },
  es: {
    hero: {
      badge: "RESULTADOS REALES. ENTREGA EN 15 DÍAS.",
      headline1: "Sitios web profesionales para ",
      headline2: "alcanzar más clientes",
      subtitle: "Transformamos tu presencia online con sitios modernos, optimizados y responsivos, diseño exclusivo, SEO y estrategias digitales eficientes para crecer.",
      cta1: "COMIENZA TU PROYECTO AHORA",
      cta2: "VER PROYECTOS REALES",
    },
    services: {
      title1: "Nuestros",
      title2: "Servicios",
      subtitle: "Soluciones completas para transformar tu presencia digital",
      cta: "SOLICITA TU PRESUPUESTO",
      items: [
        { title: "Construcción de sitios", description: "Presencia digital profesional para atraer y convertir clientes." },
        { title: "Tráfico", description: "Campañas inteligentes para atraer clientes correctos y aumentar tus ventas." },
        { title: "Identidad Visual", description: "Creación de logotipo e identidad única que traducen la esencia de tu marca." },
        { title: "Diseño", description: "Layouts creativos y profesionales que destacan tu negocio con impacto visual." },
        { title: "SEO", description: "Optimización para Google: más visibilidad y clientes encontrando tu empresa online." },
        { title: "Copywriting", description: "Textos persuasivos que transforman visitantes en clientes y aumentan conversiones." },
      ],
    },
    stats: {
      badge: "NUESTROS NÚMEROS",
      title1: "Resultados que",
      title2: "Hablan por Sí Solos",
      subtitle: "Números que representan nuestra dedicación y compromiso con la excelencia en cada proyecto que desarrollamos.",
      cta: "¿Listo para ser parte de estas estadísticas?",
      ctaButton: "Iniciar Proyecto",
      items: [
        { label: "Proyectos Entregados", description: "Sitios, apps y sistemas desarrollados" },
        { label: "Clientes Satisfechos", description: "Empresas que confían en nuestro trabajo" },
        { label: "Años de Experiencia", description: "Actuando en el mercado digital" },
        { label: "Tasa de Satisfacción", description: "Clientes que nos recomiendan" },
      ],
    },
    portfolio: {
      badge: "NUESTRO PORTAFOLIO",
      title1: "Casos de",
      title2: "Éxito",
      subtitle: "Conoce algunos de los proyectos que desarrollamos y los resultados alcanzados por nuestros clientes.",
      cta: "VER TODOS LOS CASOS",
      viewCase: "Ver Caso",
    },
    footer: {
      description: "Transformando ideas en experiencias digitales memorables. Especialistas en crear soluciones web que generan resultados.",
      navigation: "Navegación",
      services: "Servicios",
      contact: "Contacto",
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Casos",
      copyright: "Todos los derechos reservados.",
      scrollTop: "Volver arriba",
    },
    navbar: {
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Casos",
      contact: "Contacto",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'pt';
  const browserLang = navigator.language || (navigator as any).userLanguage || 'pt';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (langCode === 'pt') return 'pt';
  if (langCode === 'es') return 'es';
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(detectBrowserLanguage);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { Language, Translations };
