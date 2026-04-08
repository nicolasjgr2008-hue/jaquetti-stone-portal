import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { LiquidButton } from "./LiquidButton";
import { ScrambleText } from "./ScrambleText";
import { cases } from "@/data/cases";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const testimonials = {
  pt: [
    { quote: "Nosso site ficou moderno, funcional e responsivo. Com agendamento online e acesso fácil a documentos, a gestão do condomínio ficou muito mais eficiente. Em 30 dias já tínhamos reduzido 40% das ligações de suporte.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profissional", company: "Condomínio Hermes", badge: "+40% eficiência" },
    { quote: "Em menos de 2 semanas tínhamos o site no ar. O processo foi transparente e o resultado superou expectativas. Já na primeira semana recebi 3 novos clientes pelo site.", author: "Marina Costa", initials: "MC", role: "Diretora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
    { quote: "Profissionalismo do início ao fim. A Jaquetti entendeu o que a minha clínica precisava e entregou um site que realmente converte. O agendamento online dobrou em 45 dias.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clínica Pereira", badge: "2x mais agendamentos" },
    { quote: "Lançamos nosso e-commerce de roupas do zero. A plataforma é super rápida, fácil de gerenciar e totalmente integrada. As vendas online aumentaram 120% já no primeiro trimestre com a nova estrutura e estabilidade.", author: "Carolina Silva", initials: "CS", role: "CEO", company: "Use Carolina Brand", badge: "+120% Vendas" },
    { quote: "A presença digital do escritório mudou completamente. O design transmite confiança de classe A, o que atraiu clientes corporativos de alto valor num ciclo de tempo muito menor do que o mercado tradicional.", author: "Dr. Marcos Alencar", initials: "MA", role: "Sócio", company: "Alencar & Associados", badge: "Clientes High-Ticket" },
    { quote: "O portfólio que construíram capturou perfeitamente a essência dos nossos projetos de luxo. O site carrega as imagens 4K sem perder nada de performance técnica. Incrível o cuidado técnico com o detalhe.", author: "Isabela Muniz", initials: "IM", role: "Arquiteta Chefe", company: "IM Arquitetura", badge: "Performance A+" },
  ]
};

const sectionText = {
  pt: { title1: "Empresas que", title2: "Crescem", title3: "Conosco", subtitle: "Cada cliente recebe um atendimento personalizado, com soluções sob medida e suporte contínuo.", cta: "Transforme seu negócio hoje mesmo", testimonialTitle: "O que dizem nossos clientes", portfolio: { badge: "Nosso Portfólio", title1: "Projetos que", title2: "Inspiram", desc: "Cada projeto é uma oportunidade de criar algo único. Veja como ajudamos empresas a se destacarem no digital." } },
  en: { title1: "Companies that", title2: "Grow", title3: "With Us", subtitle: "Each client receives personalized service, with tailored solutions and continuous support.", cta: "Transform your business today", testimonialTitle: "What our clients say", portfolio: { badge: "Our Portfolio", title1: "Projects that", title2: "Inspire", desc: "Each project is an opportunity to create something unique. See how we help businesses stand out digitally." } },
  es: { title1: "Empresas que", title2: "Crecen", title3: "Con Nosotros", subtitle: "Cada cliente recibe atención personalizada, con soluciones a medida y soporte continuo.", cta: "Transforma tu negocio hoy", testimonialTitle: "Lo que dicen nuestros clientes", portfolio: { badge: "Nuestro Portafolio", title1: "Proyectos que", title2: "Inspiran", desc: "Cada proyecto es una oportunidad de crear algo único. Mira cómo ayudamos a las empresas a destacarse digitalmente." } },
};

const Portfolio = () => {
  const [testiSlide, setTestiSlide] = useState(0);
  const { language } = useLanguage();
  const text = sectionText[language];

  useEffect(() => {
    const testiList = testimonials[language as keyof typeof testimonials] || testimonials.pt;
    const testiSlideSize = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
    const testiTotal = Math.ceil(testiList.length / testiSlideSize);
    const interval = setInterval(() => {
      setTestiSlide((prev) => (prev + 1) % testiTotal);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <section id="cases" className="py-32 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 items-end">
          <AnimatedSection direction="left">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block reveal">
              {text.portfolio.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight reveal pt-2">
              <ScrambleText text={`${text.portfolio.title1} ${text.portfolio.title2}`} />
            </h2>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.2} className="reveal">
            <p className="text-muted-foreground/80 text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              {text.portfolio.desc}
            </p>
          </AnimatedSection>
        </div>

        {/* Infinite Cases Marquee */}
        <AnimatedSection className="relative mb-20 w-[100vw] left-1/2 -ml-[50vw]">
          <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="animate-marquee-infinite gap-5 py-4" style={{ display: "flex", width: "max-content" }}>
              {[...cases, ...cases, ...cases, ...cases].map((caseItem, index) => {
                const isClickable = caseItem.isInternal || (caseItem.url && caseItem.url !== '#');
                const CardWrapper = caseItem.isInternal ? Link : 'a';
                const linkProps = caseItem.isInternal 
                  ? { to: caseItem.url } 
                  : { href: caseItem.url, target: caseItem.url !== '#' ? '_blank' : undefined, rel: caseItem.url !== '#' ? 'noopener noreferrer' : undefined };
                
                return (
                  <CardWrapper
                    key={`${caseItem.id}-${index}`}
                    {...linkProps as any}
                    className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl border border-border/30 bg-card/10 hover:border-primary/30 hover:bg-card/30 transition-all duration-500 flex-shrink-0 relative overflow-hidden"
                    style={{ width: "260px" }}
                  >
                    <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-card/50 border border-border/30 overflow-hidden group-hover:border-primary/40 transition-all duration-500">
                      <img
                        src={caseItem.image}
                        alt={caseItem.category}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {caseItem.category}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-3">
                        {caseItem.description}
                      </p>
                    </div>
                    {isClickable && (
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 group-hover:text-primary/80 transition-colors duration-300">
                        Ver Case →
                      </span>
                    )}
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        </AnimatedSection>


        {/* CTA */}
        <AnimatedSection className="text-center mb-24">
          <LiquidButton
            asChild
            className="inline-flex items-center justify-center text-xs px-10 py-5 rounded-md border border-border/50 text-muted-foreground bg-card/20 hover:text-foreground hover:border-foreground/30 tracking-widest uppercase reveal transition-all"
          >
            <a href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto" target="_blank" rel="noopener noreferrer" onClick={() => trackWa('portfolio_cta')}>{text.cta}</a>
          </LiquidButton>
        </AnimatedSection>

        {/* Divider */}
        <div className="w-full h-px bg-border/30 mb-24" />

        {/* Testimonials Carousel */}
        <div 
          className="max-w-7xl mx-auto"
        >
          <AnimatedSection className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground reveal">
              <ScrambleText text={text.testimonialTitle} />
            </h3>
          </AnimatedSection>
          
          {(() => {
            const testiList = testimonials[language as keyof typeof testimonials] || testimonials.pt;
            const testiSlideSize = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
            const testiTotalSlides = Math.ceil(testiList.length / testiSlideSize);
            
            return (
              <>
                <div className="relative">
                  {/* Arrows */}
                  <button
                    onClick={() => setTestiSlide((prev) => (prev - 1 + testiTotalSlides) % testiTotalSlides)}
                    className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border/30 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-border/60 hover:bg-card/40 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setTestiSlide((prev) => (prev + 1) % testiTotalSlides)}
                    className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border/30 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-border/60 hover:bg-card/40 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {/* Carousel viewport */}
                  <div className="overflow-hidden px-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={testiSlide}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        {testiList.slice(testiSlide * testiSlideSize, (testiSlide + 1) * testiSlideSize).map((testi, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                          >
                            <div 
                              className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/20 bg-card/5 hover:bg-card/15 hover:border-border/40 transition-all duration-500 h-full"
                              data-cursor="quote"
                            >
                              {/* Stars */}
                              <div className="flex text-amber-500 mb-4 relative z-10">
                                <span className="text-xl tracking-widest text-[#FFC107]">★★★★★</span>
                              </div>
                              
                              <div className="relative flex-grow mb-6 z-10">
                                <Quote className="absolute -top-1 -left-1 w-8 h-8 text-border/30 -z-10 rotate-180" />
                                <p className="text-sm text-muted-foreground leading-relaxed italic relative z-10">
                                  "{testi.quote}"
                                </p>
                                {testi.badge && (
                                  <span className="inline-block mt-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                                    {testi.badge}
                                  </span>
                                )}
                              </div>

                              <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-border/20">
                                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#1A1A1A] border border-border/40 flex items-center justify-center text-foreground font-bold text-sm tracking-wider">
                                  {testi.initials}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-foreground">{testi.author}</p>
                                  <p className="text-xs text-muted-foreground">{testi.role} · {testi.company}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: testiTotalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestiSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        testiSlide === index ? "bg-foreground w-8" : "bg-border/50 w-1.5 hover:bg-border"
                      }`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
