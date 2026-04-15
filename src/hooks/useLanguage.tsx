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
      stats: string[];
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
    testimonials: {
      quote: string;
      author: string;
      initials: string;
      role: string;
      company: string;
      badge: string;
    }[];
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
      badge: "SITES QUE GERAM CLIENTES. ENTREGA EM 15 DIAS.",
      headline1: "Seu site deveria trazer ",
      headline2: "clientes todos os dias",
      subtitle: "Criamos sites que aparecem no Google, passam confiança e transformam visitantes em clientes reais — com SEO técnico incluso e entrega em até 15 dias.",
      cta1: "QUERO MAIS CLIENTES AGORA",
      cta2: "VER RESULTADOS REAIS",
      stats: ["153 projetos que geram vendas", "97% dos clientes indicam", "Orçamento grátis em 2 horas"],
    },
    services: {
      badge: "O Que Fazemos Por Você",
      title1: "Sites Que Vendem.",
      title2: "Não Só Existem.",
      subtitle: "Cada projeto é construído para um único objetivo: trazer mais clientes para o seu negócio. Sem enrolação, sem enfeite — só resultado.",
      cta: "QUERO MEU SITE AGORA",
      items: [
        { title: "Sites que convertem", description: "Seu cliente pesquisa no Google antes de comprar. Esteja lá com um site que convence em 5 segundos." },
        { title: "Tráfego pago", description: "Anúncios que trazem clientes certos para o seu WhatsApp — sem desperdiçar dinheiro com curiosos." },
        { title: "Identidade Visual", description: "Logo e identidade que fazem seu negócio parecer 10x maior do que é. Primeira impressão vende." },
        { title: "Design estratégico", description: "Design bonito que guia o visitante até o botão de contato. Cada pixel pensado para converter." },
        { title: "SEO que aparece", description: "Seu site na primeira página do Google. Clientes te encontram sem você pagar por anúncio." },
        { title: "Textos que vendem", description: "Palavras certas no lugar certo. Cada frase do seu site pensada para fazer o visitante agir." },
      ],
    },
    stats: {
      badge: "PROVA NOS NÚMEROS",
      title1: "Resultados que",
      title2: "Pagam o Investimento",
      subtitle: "Não vendemos promessas. Esses são os números reais dos nossos clientes.",
      cta: "Seu negócio pode ser o próximo.",
      ctaButton: "Quero resultados assim",
      items: [
        { label: "Projetos Entregues", description: "Sites que geram clientes todos os dias", context: "De dentistas a e-commerces — todos vendendo mais" },
        { label: "Clientes Satisfeitos", description: "Empresários que indicam nosso trabalho", context: "De 12 segmentos diferentes — e contando" },
        { label: "Anos no Mercado", description: "Fazendo negócios crescerem online", context: "Mais de uma década entregando resultado real" },
        { label: "Taxa de Indicação", description: "Clientes que nos recomendam", context: "97 em cada 100 clientes indicam para parceiros" },
      ],
    },
    portfolio: {
      badge: "RESULTADOS COMPROVADOS",
      title1: "Cases de",
      title2: "Sucesso",
      subtitle: "Esses são projetos reais. Empresas que confiaram na Jaquetti e viram o faturamento crescer.",
      cta: "QUERO RESULTADOS COMO ESSES",
      viewCase: "Ver Case",
      testimonials: [
        { quote: "Em 30 dias já tínhamos reduzido 40% das ligações de suporte. O site fez o trabalho que 2 funcionários faziam antes — e melhor.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profissional", company: "Condomínio Hermes", badge: "+40% eficiência" },
        { quote: "Na primeira semana com o site novo, recebi 3 clientes que vieram direto do Google. O investimento se pagou antes de vencer a primeira parcela.", author: "Marina Costa", initials: "MC", role: "Diretora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
        { quote: "O agendamento online dobrou em 45 dias. Antes eu perdia paciente porque ninguém atendia o telefone fora do horário. Agora o site agenda sozinho, 24h.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clínica Pereira", badge: "2x mais agendamentos" },
        { quote: "As vendas online aumentaram 120% no primeiro trimestre. A plataforma é rápida, estável e não caiu nem na Black Friday. Isso é dinheiro que antes eu perdia.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Vendas" },
        { quote: "O design do site transmite exatamente o que somos: escritório sério, de alto nível. Em 60 dias já havia atraído 4 clientes corporativos que pagam acima de R$ 50 mil.", author: "Dr. Marcos Alencar", initials: "MA", role: "Sócio", company: "Alencar & Associados", badge: "Clientes High-Ticket" },
        { quote: "Meus projetos de R$ 500 mil apareciam em fotos borradas no site antigo. Agora o portfólio vende sozinho — 3 projetos fechados só porque o cliente viu o site.", author: "Isabela Muniz", initials: "IM", role: "Arquiteta Chefe", company: "IM Arquitetura", badge: "3 projetos fechados" },
      ],
    },
    pricing: {
      badge: "Planos Mensais",
      title: "Seu Site Protegido 24h",
      subtitle: "Site fora do ar = cliente perdido. Nossos planos garantem velocidade, segurança e zero dor de cabeça — para você focar em vender.",
      mostChosen: "Mais Escolhido",
      subscribe: "Contratar",
      mo: "/mês",
      scarcity1: "2 das 3 vagas de",
      scarcity2: "já reservadas",
      disclaimer: "* Sem taxa de adesão. Fidelidade mínima conforme contrato.",
      waMessage: "Olá, quero contratar o plano",
    },
    faq: {
      title: "Tire Suas Dúvidas",
    },
    footer: {
      description: "Sites que geram clientes todos os dias. Mais de 150 empresas já cresceram com a Jaquetti.",
      navigation: "Navegação",
      services: "Serviços",
      contact: "Fale Conosco",
      home: "Início",
      solutions: "Soluções",
      cases: "Resultados",
      copyright: "Todos os direitos reservados.",
      scrollTop: "Voltar ao topo",
    },
    navbar: {
      home: "Início",
      solutions: "Soluções",
      cases: "Resultados",
      contact: "Falar Agora",
    },
    whatsapp: {
      message: "Olá! Quero um site que traga clientes para o meu negócio",
      ariaLabel: "Fale com um especialista no WhatsApp",
    },
  },
  en: {
    hero: {
      badge: "WEBSITES THAT BRING CLIENTS. DELIVERED IN 15 DAYS.",
      headline1: "Your website should bring ",
      headline2: "clients every single day",
      subtitle: "We build websites that rank on Google, build trust, and turn visitors into paying clients — with technical SEO included and delivery in 15 days.",
      cta1: "I WANT MORE CLIENTS NOW",
      cta2: "SEE REAL RESULTS",
      stats: ["153 revenue-generating projects", "97% of clients refer us", "Free quote in 2 hours"],
    },
    services: {
      badge: "What We Do For You",
      title1: "Websites That Sell.",
      title2: "Not Just Exist.",
      subtitle: "Every project is built with one goal: bring more clients to your business. No fluff, no filler — just results.",
      cta: "I WANT MY WEBSITE NOW",
      items: [
        { title: "Websites that convert", description: "Your clients Google you before buying. Be there with a site that convinces in 5 seconds." },
        { title: "Paid traffic", description: "Ads that bring the right clients to your inbox — without wasting money on tire-kickers." },
        { title: "Visual Identity", description: "Logo and branding that make your business look 10x bigger than it is. First impressions sell." },
        { title: "Strategic Design", description: "Beautiful design that guides visitors to the contact button. Every pixel designed to convert." },
        { title: "SEO that ranks", description: "Your site on Google's first page. Clients find you without paying for ads." },
        { title: "Sales copywriting", description: "The right words in the right place. Every sentence on your site designed to make visitors act." },
      ],
    },
    stats: {
      badge: "PROOF IN NUMBERS",
      title1: "Results that",
      title2: "Pay for Themselves",
      subtitle: "We don't sell promises. These are real numbers from real clients.",
      cta: "Your business could be next.",
      ctaButton: "I want results like these",
      items: [
        { label: "Projects Delivered", description: "Websites generating clients daily", context: "From dentists to e-commerces — all selling more" },
        { label: "Happy Clients", description: "Business owners who refer our work", context: "From 12 different industries — and counting" },
        { label: "Years in Business", description: "Helping businesses grow online", context: "Over a decade of delivering real results" },
        { label: "Referral Rate", description: "Clients who recommend us", context: "97 out of 100 clients refer us to partners" },
      ],
    },
    portfolio: {
      badge: "PROVEN RESULTS",
      title1: "Success",
      title2: "Stories",
      subtitle: "These are real projects. Businesses that trusted Jaquetti and watched their revenue grow.",
      cta: "I WANT RESULTS LIKE THESE",
      viewCase: "View Case",
      testimonials: [
        { quote: "Within 30 days we reduced support calls by 40%. The site did the work of 2 employees — and better.", author: "Hermes Dos Anjos", initials: "HD", role: "Professional Manager", company: "Hermes Condominium", badge: "+40% efficiency" },
        { quote: "In the first week with the new site, I got 3 clients straight from Google. The investment paid for itself before the first installment was due.", author: "Marina Costa", initials: "MC", role: "Commercial Director", company: "Studio MC Design", badge: "+3 clients/week" },
        { quote: "Online bookings doubled in 45 days. Before, I was losing patients because nobody answered the phone after hours. Now the site books 24/7.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentist", company: "Pereira Clinic", badge: "2x more bookings" },
        { quote: "Online sales jumped 120% in the first quarter. The platform is fast, stable, and didn't crash even on Black Friday. That's money I used to lose.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Sales" },
        { quote: "The site design conveys exactly what we are: a serious, high-level firm. Within 60 days it attracted 4 corporate clients paying above $10K each.", author: "Dr. Marcos Alencar", initials: "MA", role: "Partner", company: "Alencar & Associates", badge: "High-Ticket Clients" },
        { quote: "My $100K projects were shown in blurry photos on the old site. Now the portfolio sells itself — 3 projects closed just because the client saw the site.", author: "Isabela Muniz", initials: "IM", role: "Chief Architect", company: "IM Architecture", badge: "3 projects closed" },
      ],
    },
    pricing: {
      badge: "Monthly Plans",
      title: "Your Site Protected 24/7",
      subtitle: "Site down = client lost. Our plans guarantee speed, security, and zero headaches — so you can focus on selling.",
      mostChosen: "Most Chosen",
      subscribe: "Subscribe",
      mo: "/mo",
      scarcity1: "2 of the 3 spots for",
      scarcity2: "already reserved",
      disclaimer: "* No setup fee. Minimum commitment as described in the contract.",
      waMessage: "Hi, I want to subscribe to the",
    },
    faq: {
      title: "Got Questions? We Have Answers",
    },
    footer: {
      description: "Websites that generate clients every day. Over 150 businesses have already grown with Jaquetti.",
      navigation: "Navigation",
      services: "Services",
      contact: "Talk to Us",
      home: "Home",
      solutions: "Solutions",
      cases: "Results",
      copyright: "All rights reserved.",
      scrollTop: "Back to top",
    },
    navbar: {
      home: "Home",
      solutions: "Solutions",
      cases: "Results",
      contact: "Talk Now",
    },
    whatsapp: {
      message: "Hi! I want a website that brings clients to my business",
      ariaLabel: "Talk to a specialist on WhatsApp",
    },
  },
  es: {
    hero: {
      badge: "SITIOS QUE GENERAN CLIENTES. ENTREGA EN 15 DÍAS.",
      headline1: "Tu sitio web debería traer ",
      headline2: "clientes todos los días",
      subtitle: "Creamos sitios que aparecen en Google, generan confianza y convierten visitantes en clientes reales — con SEO técnico incluido y entrega en 15 días.",
      cta1: "QUIERO MÁS CLIENTES AHORA",
      cta2: "VER RESULTADOS REALES",
      stats: ["153 proyectos que generan ventas", "97% de clientes nos recomiendan", "Presupuesto gratis en 2 horas"],
    },
    services: {
      badge: "Lo Que Hacemos Por Ti",
      title1: "Sitios Que Venden.",
      title2: "No Solo Existen.",
      subtitle: "Cada proyecto se construye con un único objetivo: traer más clientes a tu negocio. Sin rodeos — solo resultados.",
      cta: "QUIERO MI SITIO AHORA",
      items: [
        { title: "Sitios que convierten", description: "Tu cliente busca en Google antes de comprar. Está ahí con un sitio que convence en 5 segundos." },
        { title: "Tráfico pago", description: "Anuncios que traen clientes correctos a tu WhatsApp — sin desperdiciar dinero en curiosos." },
        { title: "Identidad Visual", description: "Logo e identidad que hacen tu negocio parecer 10x más grande. La primera impresión vende." },
        { title: "Diseño estratégico", description: "Diseño hermoso que guía al visitante hasta el botón de contacto. Cada píxel pensado para convertir." },
        { title: "SEO que posiciona", description: "Tu sitio en la primera página de Google. Clientes te encuentran sin pagar por anuncios." },
        { title: "Textos que venden", description: "Las palabras correctas en el lugar correcto. Cada frase pensada para hacer que el visitante actúe." },
      ],
    },
    stats: {
      badge: "PRUEBA EN NÚMEROS",
      title1: "Resultados que",
      title2: "Pagan la Inversión",
      subtitle: "No vendemos promesas. Estos son los números reales de nuestros clientes.",
      cta: "Tu negocio puede ser el próximo.",
      ctaButton: "Quiero resultados así",
      items: [
        { label: "Proyectos Entregados", description: "Sitios que generan clientes a diario", context: "De dentistas a e-commerces — todos vendiendo más" },
        { label: "Clientes Satisfechos", description: "Empresarios que recomiendan nuestro trabajo", context: "De 12 segmentos diferentes — y contando" },
        { label: "Años en el Mercado", description: "Haciendo negocios crecer online", context: "Más de una década entregando resultados reales" },
        { label: "Tasa de Recomendación", description: "Clientes que nos recomiendan", context: "97 de cada 100 clientes nos recomiendan a socios" },
      ],
    },
    portfolio: {
      badge: "RESULTADOS COMPROBADOS",
      title1: "Casos de",
      title2: "Éxito",
      subtitle: "Estos son proyectos reales. Empresas que confiaron en Jaquetti y vieron crecer su facturación.",
      cta: "QUIERO RESULTADOS COMO ESTOS",
      viewCase: "Ver Caso",
      testimonials: [
        { quote: "En 30 días ya habíamos reducido 40% de las llamadas de soporte. El sitio hizo el trabajo de 2 empleados — y mejor.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profesional", company: "Condominio Hermes", badge: "+40% eficiencia" },
        { quote: "En la primera semana con el sitio nuevo, recibí 3 clientes directos de Google. La inversión se pagó antes de la primera cuota.", author: "Marina Costa", initials: "MC", role: "Directora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
        { quote: "Las citas online se duplicaron en 45 días. Antes perdía pacientes porque nadie contestaba el teléfono fuera de horario. Ahora el sitio agenda solo, 24h.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clínica Pereira", badge: "2x más citas" },
        { quote: "Las ventas online aumentaron 120% en el primer trimestre. La plataforma es rápida, estable y no cayó ni en Black Friday.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Ventas" },
        { quote: "El diseño del sitio transmite exactamente lo que somos: un despacho serio de alto nivel. En 60 días atrajo 4 clientes corporativos de alto valor.", author: "Dr. Marcos Alencar", initials: "MA", role: "Socio", company: "Alencar & Asociados", badge: "Clientes High-Ticket" },
        { quote: "Mis proyectos de lujo aparecían en fotos borrosas. Ahora el portafolio vende solo — 3 proyectos cerrados solo porque el cliente vio el sitio.", author: "Isabela Muniz", initials: "IM", role: "Arquitecta Jefe", company: "IM Arquitectura", badge: "3 proyectos cerrados" },
      ],
    },
    pricing: {
      badge: "Planes Mensuales",
      title: "Tu Sitio Protegido 24/7",
      subtitle: "Sitio caído = cliente perdido. Nuestros planes garantizan velocidad, seguridad y cero dolores de cabeza — para que te enfoques en vender.",
      mostChosen: "Más Elegido",
      subscribe: "Contratar",
      mo: "/mes",
      scarcity1: "2 de los 3 cupos de",
      scarcity2: "ya reservados",
      disclaimer: "* Sin cuota de inscripción. Permanencia mínima según contrato.",
      waMessage: "Hola, quiero contratar el plan",
    },
    faq: {
      title: "Resuelve Tus Dudas",
    },
    footer: {
      description: "Sitios que generan clientes todos los días. Más de 150 empresas ya crecieron con Jaquetti.",
      navigation: "Navegación",
      services: "Servicios",
      contact: "Habla Con Nosotros",
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Resultados",
      copyright: "Todos los derechos reservados.",
      scrollTop: "Volver arriba",
    },
    navbar: {
      home: "Inicio",
      solutions: "Soluciones",
      cases: "Resultados",
      contact: "Hablar Ahora",
    },
    whatsapp: {
      message: "¡Hola! Quiero un sitio web que traiga clientes a mi negocio",
      ariaLabel: "Habla con un especialista en WhatsApp",
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
