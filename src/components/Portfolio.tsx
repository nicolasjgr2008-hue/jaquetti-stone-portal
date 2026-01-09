import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, MagneticButton } from "./AnimatedSection";
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
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  return (
    <section id="cases" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <AnimatedSection direction="left">
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              {text.title1} <motion.span className="block text-primary" animate={{ textShadow: ["0 0 0px hsl(var(--primary))", "0 0 30px hsl(var(--primary))", "0 0 0px hsl(var(--primary))"] }} transition={{ duration: 3, repeat: Infinity }}>{text.title2}</motion.span>
              <span className="block">{text.title3}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">{text.subtitle}</p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="relative mb-16">
          <div className="flex items-center gap-8">
            <MagneticButton className="hidden md:block">
              <motion.button onClick={prevSlide} className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            </MagneticButton>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide} className="grid grid-cols-1 md:grid-cols-3 gap-8" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
                  {currentCases.map((caseItem, index) => {
                    const CardWrapper = caseItem.isInternal ? Link : 'a';
                    const linkProps = caseItem.isInternal 
                      ? { to: caseItem.url } 
                      : { href: caseItem.url, target: caseItem.url !== '#' ? '_blank' : undefined, rel: caseItem.url !== '#' ? 'noopener noreferrer' : undefined };
                    
                    return (
                      <motion.div key={caseItem.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
                        <CardWrapper {...linkProps as any} className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all block">
                          <motion.div className="w-32 h-32 flex items-center justify-center bg-card rounded-2xl border border-border group-hover:border-primary/50 overflow-hidden" whileHover={{ boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.3)" }}>
                            <motion.img src={caseItem.image} alt={caseItem.category} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                          </motion.div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{caseItem.category}</h3>
                          <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                        </CardWrapper>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <MagneticButton className="hidden md:block">
              <motion.button onClick={nextSlide} className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            </MagneticButton>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${currentSlide === index ? "bg-primary w-8" : "bg-border w-2"}`} whileHover={{ scale: 1.2 }} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-20">
          <MagneticButton className="inline-block">
            <Button asChild size="lg" variant="outline" className="text-base px-12 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider">
              <a href="mailto:jaquettiweb@gmail.com">{text.cta}</a>
            </Button>
          </MagneticButton>
        </AnimatedSection>

        <motion.div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />

        <AnimatedSection direction="scale" className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-foreground">{text.testimonialTitle}</h3>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12"
              >
                <blockquote className="space-y-6 text-center">
                  <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
                    "{currentTestimonials[testimonialIndex].quote}"
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold text-foreground">{currentTestimonials[testimonialIndex].author}</p>
                    <p className="text-sm text-primary">{currentTestimonials[testimonialIndex].role} - {currentTestimonials[testimonialIndex].company}</p>
                  </div>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <motion.button onClick={prevTestimonial} className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </motion.button>
              
              <div className="flex gap-2">
                {currentTestimonials.map((_, index) => (
                  <motion.button key={index} onClick={() => setTestimonialIndex(index)} className={`h-2 rounded-full transition-all ${testimonialIndex === index ? "bg-primary w-6" : "bg-border w-2"}`} whileHover={{ scale: 1.2 }} />
                ))}
              </div>
              
              <motion.button onClick={nextTestimonial} className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
