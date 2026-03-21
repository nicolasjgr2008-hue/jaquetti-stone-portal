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
    { quote: "Nosso site agora é ágil, visualmente impactante e otimizado para conversões. Cada visitante percebe a qualidade do nosso trabalho, aumentando leads, credibilidade e presença digital.", author: "Felipe Oliveira", role: "CEO", company: "Agency Marketing" },
    { quote: "O site desenvolvido pela Jaquetti Web Agency não só refletiu nossa essência, mas também é rápido, responsivo e otimizado para SEO. A visibilidade aumentou, gerando mais clientes e fortalecendo nossa credibilidade no mercado.", author: "William Roberto", role: "CEO", company: "Austenberg" },
    { quote: "Nosso site agora é moderno, funcional e responsivo em qualquer dispositivo. Com agendamento online e acesso fácil a documentos, a gestão do condomínio se tornou mais eficiente e transparente.", author: "Hermes Dos Anjos", role: "Síndico profissional", company: "Hermes" },
    { quote: "O site deixou nossa clínica muito mais próxima dos clientes. Agora eles nos encontram facilmente e confiam ainda mais no nosso trabalho.", author: "Alexandre Da Silva", role: "Veterinário Responsável", company: "SOSVet" },
    { quote: "O site não é apenas bonito — transmite segurança e profissionalismo. Estamos conquistando clientes que antes não nos encontrariam de outra maneira.", author: "Dra. Camila Rocha", role: "Sócia Fundadora", company: "Advocate" },
  ],
  en: [
    { quote: "Our website is now agile, visually impactful, and optimized for conversions. Every visitor notices the quality of our work, increasing leads, credibility, and digital presence.", author: "Felipe Oliveira", role: "CEO", company: "Agency Marketing" },
    { quote: "The website developed by Jaquetti Web Agency not only reflected our essence but is also fast, responsive, and SEO-optimized. Visibility increased, generating more clients and strengthening our market credibility.", author: "William Roberto", role: "CEO", company: "Austenberg" },
    { quote: "Our website is now modern, functional, and responsive on any device. With online scheduling and easy access to documents, condominium management has become more efficient and transparent.", author: "Hermes Dos Anjos", role: "Professional Manager", company: "Hermes" },
    { quote: "The website brought our clinic much closer to clients. Now they find us easily and trust our work even more.", author: "Alexandre Da Silva", role: "Lead Veterinarian", company: "SOSVet" },
    { quote: "The website is not just beautiful — it conveys security and professionalism. We're acquiring clients who wouldn't have found us otherwise.", author: "Dr. Camila Rocha", role: "Founding Partner", company: "Advocate" },
  ],
  es: [
    { quote: "Nuestro sitio web ahora es ágil, visualmente impactante y optimizado para conversiones. Cada visitante nota la calidad de nuestro trabajo, aumentando leads, credibilidad y presencia digital.", author: "Felipe Oliveira", role: "CEO", company: "Agency Marketing" },
    { quote: "El sitio desarrollado por Jaquetti Web Agency no solo reflejó nuestra esencia, sino que también es rápido, responsivo y optimizado para SEO. La visibilidad aumentó, generando más clientes y fortaleciendo nuestra credibilidad.", author: "William Roberto", role: "CEO", company: "Austenberg" },
    { quote: "Nuestro sitio ahora es moderno, funcional y responsivo en cualquier dispositivo. Con programación online y fácil acceso a documentos, la gestión del condominio se volvió más eficiente y transparente.", author: "Hermes Dos Anjos", role: "Administrador profesional", company: "Hermes" },
    { quote: "El sitio acercó mucho más nuestra clínica a los clientes. Ahora nos encuentran fácilmente y confían aún más en nuestro trabajo.", author: "Alexandre Da Silva", role: "Veterinario Responsable", company: "SOSVet" },
    { quote: "El sitio no es solo hermoso — transmite seguridad y profesionalismo. Estamos conquistando clientes que antes no nos encontrarían de otra manera.", author: "Dra. Camila Rocha", role: "Socia Fundadora", company: "Advocate" },
  ],
};

const sectionText = {
  pt: { title1: "Empresas que", title2: "Crescem", title3: "Conosco", subtitle: "Cada cliente recebe um atendimento personalizado, com soluções sob medida e suporte contínuo.", cta: "Transforme seu negócio hoje mesmo", testimonialTitle: "O que dizem nossos clientes" },
  en: { title1: "Companies that", title2: "Grow", title3: "With Us", subtitle: "Each client receives personalized service, with tailored solutions and continuous support.", cta: "Transform your business today", testimonialTitle: "What our clients say" },
  es: { title1: "Empresas que", title2: "Crecen", title3: "Con Nosotros", subtitle: "Cada cliente recibe atención personalizada, con soluciones a medida y soporte continuo.", cta: "Transforma tu negocio hoy", testimonialTitle: "Lo que dicen nuestros clientes" },
};

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { language } = useLanguage();
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(cases.length / itemsPerSlide);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const currentCases = cases.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide);
  
  const currentTestimonials = testimonials[language];
  const text = sectionText[language];
  
  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % currentTestimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  return (
    <section id="cases" className="py-32 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[100px]" />
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 items-end">
          <AnimatedSection direction="left">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1]">
              {text.title1}{" "}
              <span className="text-primary">{text.title2}</span>
              <span className="block mt-1">{text.title3}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">{text.subtitle}</p>
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
            className="text-xs px-10 py-5 border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30 tracking-widest uppercase"
          >
            <a href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto" target="_blank" rel="noopener noreferrer">{text.cta}</a>
          </Button>
        </AnimatedSection>

        {/* Divider */}
        <div className="w-full h-px bg-border/30 mb-24" />

        {/* Testimonials */}
        <AnimatedSection direction="scale" className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Quote className="w-8 h-8 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-serif text-foreground">{text.testimonialTitle}</h3>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center px-4 md:px-12"
              >
                <blockquote className="space-y-6">
                  <p className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed">
                    "{currentTestimonials[testimonialIndex].quote}"
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {currentTestimonials[testimonialIndex].author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentTestimonials[testimonialIndex].role} · {currentTestimonials[testimonialIndex].company}
                    </p>
                  </div>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center hover:border-foreground/30 transition-colors"
              >
                <ChevronLeft className="w-3 h-3 text-muted-foreground" />
              </button>
              
              <div className="flex gap-1.5">
                {currentTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      testimonialIndex === index ? "bg-foreground w-6" : "bg-border w-1.5"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center hover:border-foreground/30 transition-colors"
              >
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
