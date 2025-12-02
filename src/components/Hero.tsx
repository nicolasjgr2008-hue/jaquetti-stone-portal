import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import marbleBg from "@/assets/marble-bg.jpg";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, MagneticButton, RevealText } from "./AnimatedSection";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Marble Background with Mouse Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${marbleBg})`,
          backgroundSize: "120%",
          backgroundPosition: "center",
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Golden Marble Veins Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-20 mix-blend-overlay"
        style={{
          background: `
            linear-gradient(135deg, transparent 30%, hsl(43, 96%, 56%) 45%, transparent 50%),
            linear-gradient(-45deg, transparent 35%, hsl(43, 90%, 60%) 48%, transparent 52%),
            linear-gradient(65deg, transparent 40%, hsl(43, 85%, 55%) 50%, transparent 55%),
            linear-gradient(-120deg, transparent 38%, hsl(43, 92%, 58%) 48%, transparent 53%)
          `,
          backgroundSize: "400% 400%, 350% 350%, 300% 300%, 450% 450%",
          x: -mousePosition.x * 0.5,
          y: -mousePosition.y * 0.5,
        }}
        animate={{
          backgroundPosition: [
            "0% 0%, 100% 100%, 50% 50%, 25% 75%",
            "100% 100%, 0% 0%, 75% 25%, 50% 50%",
            "0% 0%, 100% 100%, 50% 50%, 25% 75%",
          ],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 to-black/80" />

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
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
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
            >
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Sua presença digital começa aqui
              </span>
            </motion.div>
          </AnimatedSection>

          {/* Main Headline with Character Animation */}
          <AnimatedSection delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              <RevealText text="Sites profissionais para " delay={0.5} />
              <span className="text-primary relative inline-block">
                <RevealText text="alcançar mais clientes" delay={0.8} />
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
              Transformamos sua presença online com sites modernos, otimizados e
              responsivos, design exclusivo, SEO e estratégias digitais
              eficientes para crescer.
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
                      COMECE SEU PROJETO AGORA
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
                    <span className="relative z-10">CONHECER SOLUÇÕES</span>
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
