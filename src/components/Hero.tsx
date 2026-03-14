import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
                  <a href="mailto:jaquettiweb@gmail.com">
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
                  <a href="#solucoes">{t.hero.cta2}</a>
                </Button>
              </MagneticButton>
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
