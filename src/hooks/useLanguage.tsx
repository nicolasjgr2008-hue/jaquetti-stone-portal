import { createContext, useContext, useState, ReactNode } from 'react';

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
    badge: string;
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
      context?: string;
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
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    mostChosen: string;
    subscribe: string;
    mo: string;
    scarcity1: string;
    scarcity2: string;
    disclaimer: string;
    waMessage: string;
  };
  faq: {
    title: string;
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
  whatsapp: {
    message: string;
    ariaLabel: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    hero: {
      badge: "RESULTADOS REAIS. ENTREGA EM 15 DIAS.",
      headline1: "Sites profissionais para ",
      headline2: "alcançar mais clientes",
      subtitle: "Criamos sites profissionais para prestadores de serviço, e-commerces e empresas que precisam converter visitas em clientes — entregues em até 15 dias, com SEO técnico incluso.",
      cta1: "COMECE SEU PROJETO AGORA",
      cta2: "VER PROJETOS REAIS",
      stats: ["153 projetos entregues", "97 em cada 100 clientes indicam", "Resposta em até 2 horas"],
    },
    services: {
      badge: "Nossas Especialidades",
      title1: "Criamos Plataformas",
      title2: "Que Faturam.",
      subtitle: "Nós somos especialistas apenas em desenvolvimento web. Oferecemos as melhores soluções técnicas escaláveis nas 4 principais modalidades do mercado.",
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
      cta: "Seu negócio pode ser o próximo caso de sucesso.",
      ctaButton: "Iniciar Projeto",
      items: [
        { label: "Projetos Entregues", description: "Sites, apps e sistemas desenvolvidos", context: "Sites, apps e sistemas que geram resultados reais" },
        { label: "Clientes Satisfeitos", description: "Empresas que confiam em nosso trabalho", context: "Empresas de 12 segmentos diferentes confiam em nós" },
        { label: "Anos de Experiência", description: "Atuando no mercado digital", context: "Uma década de experiência no mercado digital" },
        { label: "Taxa de Satisfação", description: "Clientes que nos recomendam", context: "Clientes que nos indicam para amigos e parceiros" },
      ],
    },
    portfolio: {
      badge: "NOSSO PORTFÓLIO",
      title1: "Cases de",
      title2: "Sucesso",
      subtitle: "Conheça alguns dos projetos que desenvolvemos e os resultados alcançados por nossos clientes.",
      cta: "VER TODOS OS CASES",
      viewCase: "Ver Case",
      testimonials: [
        { quote: "Nosso site ficou moderno, funcional e responsivo. Com agendamento online e acesso fácil a documentos, a gestão do condomínio ficou muito mais eficiente. Em 30 dias já tínhamos reduzido 40% das ligações de suporte.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profissional", company: "Condomínio Hermes", badge: "+40% eficiência" },
        { quote: "Em menos de 2 semanas tínhamos o site no ar. O processo foi transparente e o resultado superou expectativas. Já na primeira semana recebi 3 novos clientes pelo site.", author: "Marina Costa", initials: "MC", role: "Diretora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
        { quote: "Profissionalismo do início ao fim. A Jaquetti entendeu o que a minha clínica precisava e entregou um site que realmente converte. O agendamento online dobrou em 45 dias.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clínica Pereira", badge: "2x mais agendamentos" },
        { quote: "Lançamos nosso e-commerce de roupas do zero. A plataforma é super rápida, fácil de gerenciar e totalmente integrada. As vendas online aumentaram 120% já no primeiro trimestre com a nova estrutura e estabilidade.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Vendas" },
        { quote: "A presença digital do escritório mudou completamente. O design transmite confiança de classe A, o que atraiu clientes corporativos de alto valor num ciclo de tempo muito menor do que o mercado tradicional.", author: "Dr. Marcos Alencar", initials: "MA", role: "Sócio", company: "Alencar & Associados", badge: "Clientes High-Ticket" },
        { quote: "O portfólio que construíram capturou perfeitamente a essência dos nossos projetos de luxo. O site carrega as imagens 4K sem perder nada de performance técnica. Incrível o cuidado técnico com o detalhe.", author: "Isabela Muniz", initials: "IM", role: "Arquiteta Chefe", company: "IM Arquitetura", badge: "Performance A+" },
      ],
    },
    pricing: {
      badge: "Planos Mensais",
      title: "Hospedagem & Manutenção",
      subtitle: "Proteja seu investimento e garanta que seu site opere com excelência os 365 dias do ano. Esqueça dores de cabeça com servidores, quedas ou ataques e deixe tudo conosco.",
      mostChosen: "Mais Escolhido",
      subscribe: "Assinar",
      mo: "/mês",
      scarcity1: "2 das 3 vagas de",
      scarcity2: "já reservadas",
      disclaimer: "* Não cobramos taxa de adesão em nenhum plano. Fidelidade exigida como descrita em contrato.",
      waMessage: "Olá, quero contratar o plano",
    },
    faq: {
      title: "Dúvidas Frequentes",
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
    whatsapp: {
      message: "Olá! Vim pelo site e quero iniciar meu projeto",
      ariaLabel: "Fale conosco no WhatsApp",
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
      stats: ["153 projects delivered", "97 out of 100 clients recommend", "Response in up to 2 hours"],
    },
    services: {
      badge: "Our Specialties",
      title1: "We Build Platforms",
      title2: "That Generate Revenue.",
      subtitle: "We specialize solely in web development. We offer the best scalable technical solutions across the 4 main market modalities.",
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
        { label: "Projects Delivered", description: "Websites, apps and systems developed", context: "Websites, apps, and systems that generate real results" },
        { label: "Satisfied Clients", description: "Companies that trust our work", context: "Companies from 12 different segments trust us" },
        { label: "Years of Experience", description: "Operating in the digital market", context: "A decade of experience in the digital market" },
        { label: "Satisfaction Rate", description: "Clients who recommend us", context: "Clients who recommend us to friends and partners" },
      ],
    },
    portfolio: {
      badge: "OUR PORTFOLIO",
      title1: "Success",
      title2: "Cases",
      subtitle: "Discover some of the projects we developed and the results achieved by our clients.",
      cta: "VIEW ALL CASES",
      viewCase: "View Case",
      testimonials: [
        { quote: "Our site became modern, functional, and responsive. With online scheduling and easy access to documents, condominium management became much more efficient. Within 30 days we had already reduced support calls by 40%.", author: "Hermes Dos Anjos", initials: "HD", role: "Professional Manager", company: "Hermes Condominium", badge: "+40% efficiency" },
        { quote: "In less than 2 weeks our site was live. The process was transparent and the result exceeded expectations. In the first week, I received 3 new clients through the site.", author: "Marina Costa", initials: "MC", role: "Commercial Director", company: "Studio MC Design", badge: "+3 clients/week" },
        { quote: "Professionalism from start to finish. Jaquetti understood what my clinic needed and delivered a site that truly converts. Online scheduling doubled in 45 days.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentist", company: "Pereira Clinic", badge: "2x more appointments" },
        { quote: "We launched our clothing e-commerce from scratch. The platform is super fast, easy to manage, and fully integrated. Online sales increased by 120% in the first quarter with the new structure.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Sales" },
        { quote: "The office's digital presence completely changed. The design transmits Class A trust, which attracted high-value corporate clients in a much shorter cycle than the traditional market.", author: "Dr. Marcos Alencar", initials: "MA", role: "Partner", company: "Alencar & Associates", badge: "High-Ticket Clients" },
        { quote: "The portfolio they built perfectly captured the essence of our luxury projects. The site loads 4K images without losing any technical performance. Amazing technical care with detail.", author: "Isabela Muniz", initials: "IM", role: "Chief Architect", company: "IM Architecture", badge: "Performance A+" },
      ],
    },
    pricing: {
      badge: "Monthly Plans",
      title: "Hosting & Maintenance",
      subtitle: "Protect your investment and ensure your site operates with excellence 365 days a year. Forget about headaches with servers, downtime, or attacks and leave everything to us.",
      mostChosen: "Most Chosen",
      subscribe: "Subscribe",
      mo: "/mo",
      scarcity1: "2 of the 3 spots for",
      scarcity2: "already reserved",
      disclaimer: "* We do not charge an setup fee on any plan. Commitment required as described in the contract.",
      waMessage: "Hi, I'd like to subscribe to the",
    },
    faq: {
      title: "Frequently Asked Questions",
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
    whatsapp: {
      message: "Hi! I came from the website and I'd like to start my project",
      ariaLabel: "Chat with us on WhatsApp",
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
      stats: ["153 proyectos entregados", "97 de cada 100 clientes recomiendan", "Respuesta en hasta 2 horas"],
    },
    services: {
      badge: "Nuestras Especialidades",
      title1: "Creamos Plataformas",
      title2: "Que Facturan.",
      subtitle: "Somos especialistas exclusivamente en desarrollo web. Ofrecemos las mejores soluciones técnicas escalables en las 4 modalidades principales del mercado.",
      cta: "SOLICITA TU PRESUPUESTO",
      items: [
        { title: "Construcción de sitios", description: "Presencia digital profesional para atraer y convertir clientes." },
        { title: "Tráfico", description: "Campañas inteligentes para atraer clientes correctos y aumentar tus ventas." },
        { title: "Identidad Visual", description: "Creación de logotipo e identidad única que traducen la esencia de tu marca." },
        { title: "Diseño", description: "Layouts creativos e profesionales que destacan tu negocio con impacto visual." },
        { title: "SEO", description: "Optimización para Google: más visibilidade e clientes encontrando tu empresa online." },
        { title: "Copywriting", description: "Textos persuasivos que transforman visitantes en clientes y aumentan conversiones." },
      ],
    },
    stats: {
      badge: "NUESTROS NÚMEROS",
      title1: "Resultados que",
      title2: "Hablan por Sí Solos",
      subtitle: "Números que representan nuestra dedicación e compromiso com a excelencia em cada proyecto que desenvolvemos.",
      cta: "¿Listo para ser parte de estas estadísticas?",
      ctaButton: "Iniciar Proyecto",
      items: [
        { label: "Proyectos Entregados", description: "Sitios, apps y sistemas desenvolvidos", context: "Sitios, apps y sistemas que geram resultados reais" },
        { label: "Clientes Satisfechos", description: "Empresas que confían em nosso trabalho", context: "Empresas de 12 segmentos diferentes confiam em nós" },
        { label: "Años de Experiencia", description: "Atuando no mercado digital", context: "Uma década de experiência no mercado digital" },
        { label: "Tasa de Satisfação", description: "Clientes que nos recomendam", context: "Clientes que nos recomendam para amigos e parceiros" },
      ],
    },
    portfolio: {
      badge: "NUESTRO PORTAFOLIO",
      title1: "Casos de",
      title2: "Éxito",
      subtitle: "Conoce algunos de los proyectos que desenvolvemos y los resultados alcançados por nossos clientes.",
      cta: "VER TODOS LOS CASOS",
      viewCase: "Ver Caso",
      testimonials: [
        { quote: "Nuestro sitio ficou moderno, funcional y responsivo. Com agendamento online y acesso fácil a documentos, a gestão do condomínio ficou muito mais eficiente. En 30 dias já tínhamos reduzido 40% das ligações de suporte.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profissional", company: "Condomínio Hermes", badge: "+40% eficiencia" },
        { quote: "En menos de 2 semanas tínhamos o site no ar. O processo foi transparente e o resultado superou expectativas. Já na primeira semana recebi 3 novos clientes pelo site.", author: "Marina Costa", initials: "MC", role: "Directora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
        { quote: "Profissionalismo do início ao fim. A Jaquetti entendeu o que a minha clínica precisava e entregou um site que realmente converte. O agendamento online dobrou em 45 dias.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clinica Pereira", badge: "2x mais agendamentos" },
        { quote: "Lançamos nuestro e-commerce de roupas do zero. A plataforma é super rápida, fácil de gerenciar e totalmente integrada. As vendas online aumentaram 120% já no primeiro trimestre com a nova estrutura.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Ventas" },
        { quote: "A presença digital do escritório mudou completamente. O design transmite confiança de classe A, o que atraiu clientes corporativos de alto valor num ciclo de tempo muito menor do que o mercado tradicional.", author: "Dr. Marcos Alencar", initials: "MA", role: "Sócio", company: "Alencar & Associados", badge: "Clientes High-Ticket" },
        { quote: "O portfólio que construíram capturou perfeitamente a essência dos nossos projetos de luxo. O site carrega as imagens 4K sem perder nada de performance técnica. Incrível o cuidado técnico com o detalhe.", author: "Isabela Muniz", initials: "IM", role: "Arquiteta Chefe", company: "IM Arquitetura", badge: "Performance A+" },
      ],
    },
    pricing: {
      badge: "Planes Mensuales",
      title: "Hospedaje & Mantenimiento",
      subtitle: "Proteja su inversión y garantice que su sitio opere con excelencia los 365 días del año. Olvídese de dolores de cabeza con servidores, caídas o ataques y deje todo en nuestras manos.",
      mostChosen: "Más Elegido",
      subscribe: "Suscribirse",
      mo: "/mes",
      scarcity1: "2 de los 3 cupos de",
      scarcity2: "ya reservados",
      disclaimer: "* No cobramos cuota de inscripción en ningún plan. Permanencia requerida según contrato.",
      waMessage: "Hola, quiero contratar el plan",
    },
    faq: {
      title: "Preguntas Frecuentes",
    },
    footer: {
      description: "Transformando ideas em experiências digitais memoráveis. Especialistas em criar soluções web que geram resultados.",
      navigation: "Navegação",
      services: "Servicios",
      contact: "Contacto",
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Casos",
      copyright: "Todos os direitos reservados.",
      scrollTop: "Volver arriba",
    },
    navbar: {
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Casos",
      contact: "Contacto",
    },
    whatsapp: {
      message: "¡Hola! Vengo de la web e quiero iniciar mi proyecto",
      ariaLabel: "Habla con nosotros en WhatsApp",
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
