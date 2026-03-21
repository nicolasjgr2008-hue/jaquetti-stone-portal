import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, MagneticButton } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { SplineScene } from "@/components/ui/splite";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          followMouse={true}
        />
      </div>

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/50 to-background" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Minimal badge */}
          <AnimatedSection delay={0.2}>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {t.hero.badge}
            </span>
          </AnimatedSection>

          {/* Clean headline */}
          <AnimatedSection delay={0.4}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight">
              {t.hero.headline1}
              <span className="text-primary">{t.hero.headline2}</span>
            </h1>
          </AnimatedSection>

          {/* Subtitle with more breathing room */}
          <AnimatedSection delay={0.6}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          {/* Clean CTA */}
          <AnimatedSection delay={0.8} className="pt-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="text-sm px-8 py-6 tracking-wide font-medium"
                >
                  <a href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366" className="mr-2">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    {t.hero.cta1}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="text-sm px-8 py-6 tracking-wide text-muted-foreground hover:text-foreground"
                >
                  <a href="#cases">{t.hero.cta2}</a>
                </Button>
              </MagneticButton>
            </div>
          </AnimatedSection>

          {/* Social Proof Micro-line */}
          <AnimatedSection delay={1.0} className="pt-2">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-[12px] text-muted-foreground/80 font-medium">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>150+ projetos entregues</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>98% de satisfação</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span>Resposta em 2 horas</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1 bg-muted-foreground/50 rounded-full"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
