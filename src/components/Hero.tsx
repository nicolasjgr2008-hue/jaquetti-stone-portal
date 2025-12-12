import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, MagneticButton, RevealText } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
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

      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/60 via-background/40 to-background/80" />

      {/* Floating Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ y }}
        />
        
        {/* Additional floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-6 py-32 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <AnimatedSection delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              animate={{
                boxShadow: [
                  "0 0 0px hsl(var(--primary) / 0)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 0px hsl(var(--primary) / 0)",
                ],
              }}
            >
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {t.hero.badge}
              </span>
            </motion.div>
          </AnimatedSection>

          {/* Main Headline with Character Animation */}
          <AnimatedSection delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              <RevealText text={t.hero.headline1} delay={0.5} />
              <span className="text-primary relative inline-block">
                <RevealText text={t.hero.headline2} delay={0.8} />
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                />
              </span>
            </h1>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.8} className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="text-base px-8 py-6 group relative overflow-hidden"
                >
                  <a href="mailto:jaquettiweb@gmail.com" className="relative z-10">
                    <span className="relative z-10 flex items-center">
                      {t.hero.cta1}
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                        size={20}
                      />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground relative overflow-hidden group"
                >
                  <a href="#solucoes" className="relative z-10">
                    <span className="relative z-10">{t.hero.cta2}</span>
                    <motion.span
                      className="absolute inset-0 bg-primary -z-10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
