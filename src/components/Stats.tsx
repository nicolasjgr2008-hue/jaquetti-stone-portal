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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="p-8 rounded-2xl border border-border/30 bg-card/20 hover:bg-card/40 transition-all duration-500">
        <Icon className="w-6 h-6 text-muted-foreground mb-6" />

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-4xl md:text-5xl font-bold font-serif text-foreground">
            <AnimatedCounter target={value} duration={2} />
          </span>
          <span className="text-2xl font-bold text-muted-foreground">{suffix}</span>
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useLanguage();

  return (
    <section id="stats" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
            {t.stats.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            {t.stats.title1}{" "}
            <span className="text-primary">{t.stats.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.stats.subtitle}
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <AnimatedSection delay={0.4} className="text-center mt-20">
          <p className="text-sm text-muted-foreground mb-4">{t.stats.cta}</p>
          <motion.a
            href="mailto:jaquettiweb@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.stats.ctaButton}
            <span>→</span>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Stats;
