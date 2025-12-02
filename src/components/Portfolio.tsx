import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, MagneticButton } from "./AnimatedSection";

const cases = [
  { id: 1, category: "SOSVET", description: "Clínica veterinária com atendimento 24 horas.", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop", url: "#" },
  { id: 2, category: "TechFlow", description: "Startup de tecnologia focada em automação.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop", url: "#" },
  { id: 3, category: "Bella Casa", description: "Imobiliária de alto padrão.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop", url: "#" },
  { id: 4, category: "FitLife", description: "Academia moderna com equipamentos de ponta.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop", url: "#" },
  { id: 5, category: "Gourmet Express", description: "Restaurante delivery internacional.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop", url: "#" },
  { id: 6, category: "EduTech", description: "Plataforma de cursos online.", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200&h=200&fit=crop", url: "#" },
];

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(cases.length / itemsPerSlide);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const currentCases = cases.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide);

  return (
    <section id="cases" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <AnimatedSection direction="left">
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Empresas que <motion.span className="block text-primary" animate={{ textShadow: ["0 0 0px hsl(var(--primary))", "0 0 30px hsl(var(--primary))", "0 0 0px hsl(var(--primary))"] }} transition={{ duration: 3, repeat: Infinity }}>Crescem</motion.span>
              <span className="block">Conosco</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">Cada cliente recebe um atendimento personalizado, com soluções sob medida e suporte contínuo.</p>
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
                  {currentCases.map((caseItem, index) => (
                    <motion.a key={caseItem.id} href={caseItem.url} className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
                      <motion.div className="w-32 h-32 flex items-center justify-center bg-card rounded-2xl border border-border group-hover:border-primary/50 overflow-hidden" whileHover={{ boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.3)" }}>
                        <motion.img src={caseItem.image} alt={caseItem.category} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                      </motion.div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{caseItem.category}</h3>
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </motion.a>
                  ))}
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
              <a href="mailto:jaquettiweb@gmail.com">Transforme seu negócio hoje mesmo</a>
            </Button>
          </MagneticButton>
        </AnimatedSection>

        <motion.div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />

        <AnimatedSection direction="scale" className="text-center max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
          <blockquote className="space-y-6">
            <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">"O site deixou nossa clínica muito mais próxima dos clientes."</p>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Alexandre Da Silva</p>
              <p className="text-sm text-primary">Veterinário Responsável - SOSVet</p>
            </div>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
