import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection, AnimatedCounter } from "./AnimatedSection";
import { Briefcase, Users, Award, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const statIcons = [Briefcase, Users, Award, Clock];
const statValues = [150, 80, 12, 98];
const statSuffixes = ["+", "+", "", "%"];

const StatCard = ({
  icon: Icon,
  value,
  suffix,
  label,
  description,
  index,
}: {
  icon: typeof Briefcase;
  value: number;
  suffix: string;
  label: string;
  description: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-card/80">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        </div>

        {/* Icon */}
        <motion.div
          className="relative mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>

        {/* Counter */}
        <div className="relative flex items-baseline gap-1 mb-2">
          <span className="text-5xl md:text-6xl font-bold font-playfair text-foreground">
            <AnimatedCounter target={value} duration={2.5} />
          </span>
          <span className="text-3xl md:text-4xl font-bold text-primary">
            {suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {label}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm">{description}</p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useLanguage();

  return (
    <section id="stats" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <motion.span 
            className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider text-primary border border-primary/30 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0px hsl(var(--primary) / 0)",
                "0 0 15px hsl(var(--primary) / 0.3)",
                "0 0 0px hsl(var(--primary) / 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {t.stats.badge}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-foreground mb-6">
            {t.stats.title1}
            <span className="block text-primary">{t.stats.title2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.stats.items.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={statIcons[index]}
              value={statValues[index]}
              suffix={statSuffixes[index]}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            {t.stats.cta}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.stats.ctaButton}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Stats;
