import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import csapetLogo from "@/assets/csapet-logo.png";

export const cases = [
  { id: "csapet", category: "CSAPET", title: "Site Institucional", description: "Site institucional profissional para apresentar a empresa, produtos e fortalecer a presença digital com credibilidade e autoridade no setor.", image: csapetLogo, url: "/case/csapet", isInternal: true },
  { id: "1", category: "Advocate", title: "Site Advocate", description: "Escritório de advocacia especializado, oferecendo soluções jurídicas confiáveis e estratégicas.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-2.png", url: "https://nicolasjgr.me/advocate" },
  { id: "2", category: "Dinheiro com Crochê", title: "Curso de Crochê", description: "Aprenda técnicas de crochê e transforme suas peças em renda lucrativa.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/Logo-dinheiro-com-croche.png", url: "#" },
  { id: "3", category: "Agency Marketing", title: "Agência de Marketing", description: "Agência de marketing inovadora, transformando ideias em resultados extraordinários.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo.png", url: "https://nicolasjgr.me/agency-marketing/" },
  { id: "4", category: "Austenberg", title: "Equipamentos Elétricos", description: "Fornecedora de equipamentos elétricos, especializada em qualidade e soluções confiáveis.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/image-removebg-preview.png", url: "#" },
  { id: "5", category: "Hermes", title: "Gestão Condominial", description: "Gestão condominial eficiente, comunicação transparente e serviços confiáveis para moradores.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-removebg-preview.png", url: "https://nicolasjgr.me/hermes/" },
  { id: "6", category: "SOSVet", title: "Clínica Veterinária", description: "Clínica veterinária dedicada, oferecendo cuidado profissional, confiança e saúde animal.", image: "https://nicolasjgr.me/wp-content/uploads/2025/09/Logo-small.png", url: "https://nicolasjgr.me/clinica-veterinaria" },
];

const testimonials = {
  pt: [
    { quote: "Nosso site ficou moderno, funcional e responsivo. Com agendamento online e acesso fácil a documentos, a gestão do condomínio ficou muito mais eficiente. Em 30 dias já tínhamos reduzido 40% das ligações de suporte.", author: "Hermes Dos Anjos", initials: "HD", role: "Gestor Profissional", company: "Condomínio Hermes", badge: "+40% eficiência" },
    { quote: "Em menos de 2 semanas tínhamos o site no ar. O processo foi transparente e o resultado superou expectativas. Já na primeira semana recebi 3 novos clientes pelo site.", author: "Marina Costa", initials: "MC", role: "Diretora Comercial", company: "Studio MC Design", badge: "+3 clientes/semana" },
    { quote: "Profissionalismo do início ao fim. A Jaquetti entendeu o que a minha clínica precisava e entregou um site que realmente converte. O agendamento online dobrou em 45 dias.", author: "Dr. Rafael Pereira", initials: "RP", role: "Dentista", company: "Clínica Pereira", badge: "2x mais agendamentos" },
  ]
};

const sectionText = {
  pt: { title1: "Empresas que", title2: "Crescem", title3: "Conosco", subtitle: "Cada cliente recebe um atendimento personalizado, com soluções sob medida e suporte contínuo.", cta: "Transforme seu negócio hoje mesmo", testimonialTitle: "O que dizem nossos clientes", portfolio: { badge: "Nosso Portfólio", title1: "Projetos que", title2: "Inspiram", desc: "Cada projeto é uma oportunidade de criar algo único. Veja como ajudamos empresas a se destacarem no digital." } },
  en: { title1: "Companies that", title2: "Grow", title3: "With Us", subtitle: "Each client receives personalized service, with tailored solutions and continuous support.", cta: "Transform your business today", testimonialTitle: "What our clients say", portfolio: { badge: "Our Portfolio", title1: "Projects that", title2: "Inspire", desc: "Each project is an opportunity to create something unique. See how we help businesses stand out digitally." } },
  es: { title1: "Empresas que", title2: "Crecen", title3: "Con Nosotros", subtitle: "Cada cliente recibe atención personalizada, con soluciones a medida y soporte continuo.", cta: "Transforma tu negocio hoy", testimonialTitle: "Lo que dicen nuestros clientes", portfolio: { badge: "Nuestro Portafolio", title1: "Proyectos que", title2: "Inspiran", desc: "Cada proyecto es una oportunidad de crear algo único. Mira cómo ayudamos a las empresas a destacarse digitalmente." } },
};

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(cases.length / itemsPerSlide);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const currentCases = cases.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide);
  
  const text = sectionText[language];

  useEffect(() => {
    // Removed old interval since we're using a grid not a carousel
  }, []);

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
              {text.portfolio.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {text.portfolio.title2}
              </span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.2} className="reveal">
            <p className="text-muted-foreground/80 text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              {text.portfolio.desc}
            </p>
          </AnimatedSection>
        </div>

        {/* Cases carousel */}
        <AnimatedSection className="relative mb-20">
          <div className="flex items-center gap-6">
            <button
              onClick={prevSlide}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-foreground/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {currentCases.map((caseItem, index) => {
                    const CardWrapper = caseItem.isInternal ? Link : 'a';
                    const linkProps = caseItem.isInternal 
                      ? { to: caseItem.url } 
                      : { href: caseItem.url, target: caseItem.url !== '#' ? '_blank' : undefined, rel: caseItem.url !== '#' ? 'noopener noreferrer' : undefined };
                    
                    return (
                      <motion.div
                        key={caseItem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <CardWrapper
                          {...linkProps as any}
                          className="group flex flex-col items-center text-center space-y-5 p-8 rounded-2xl border border-transparent hover:border-border/50 hover:bg-card/30 transition-all duration-500 block"
                        >
                          <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-card/50 border border-border/30 overflow-hidden group-hover:border-border/60 transition-all duration-500">
                            <img
                              src={caseItem.image}
                              alt={caseItem.category}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {caseItem.category}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {caseItem.description}
                            </p>
                          </div>
                        </CardWrapper>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextSlide}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-foreground/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-foreground w-8" : "bg-border w-1.5"
                }`}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mb-24">
          <Button
            asChild
            variant="outline"
            className="text-xs px-10 py-5 border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 tracking-widest uppercase reveal"
          >
            <a href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto" target="_blank" rel="noopener noreferrer">{text.cta}</a>
          </Button>
        </AnimatedSection>

        {/* Divider */}
        <div className="w-full h-px bg-border/30 mb-24" />

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground reveal">{text.testimonialTitle}</h3>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(testimonials[language as keyof typeof testimonials] || testimonials.pt).map((testi, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="flex flex-col p-6 rounded-2xl border border-border/30 bg-card/20 hover:bg-card/40 transition-colors duration-300 h-full reveal">
                {/* Estrelas */}
                <div className="flex text-amber-500 mb-4 reveal">
                  <span className="text-xl tracking-widest text-[#FFC107]">★★★★★</span>
                </div>
                
                <div className="relative flex-grow mb-6">
                  <Quote className="absolute -top-1 -left-1 w-8 h-8 text-border/30 -z-10 rotate-180" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic relative z-10 reveal">
                    "{testi.quote}"
                  </p>
                  {testi.badge && (
                    <span className="inline-block mt-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full reveal">
                      {testi.badge}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-border/30 reveal">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#1A1A1A] border border-border/50 flex items-center justify-center text-foreground font-bold text-sm tracking-wider">
                    {testi.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{testi.author}</p>
                    <p className="text-xs text-muted-foreground">{testi.role} · {testi.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6} className="flex justify-center mt-12">
            <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/40 px-8 py-4 rounded-full transition-all hover:bg-card reveal">
              Ler mais depoimentos
            </button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
