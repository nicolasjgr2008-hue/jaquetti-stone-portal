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
  context,
  index,
}: {
  icon: typeof Briefcase;
  value: number;
  suffix: string;
  label: string;
  description: string;
  context?: string;
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
        {context && <p className="mt-3 text-[11px] text-muted-foreground/60 leading-relaxed max-w-[90%]">{context}</p>}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const { t } = useLanguage();

  return (
    <section id="stats" className="py-32 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-[120px]" />
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
              context={(stat as any).context}
              index={index}
            />
          ))}
        </div>

        {/* Client Logos Marquee */}
        <div className="mt-32 pt-16 border-t border-border/20 relative">
          <AnimatedSection className="text-center mb-10">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
              Empresas que confiam na Jaquetti
            </span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="relative flex overflow-hidden group">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 sm:gap-10 px-3 sm:px-5">
                  {[...Array(8)].map((_, j) => (
                    <div 
                      key={`${i}-${j}`} 
                      className="w-32 h-14 sm:w-40 sm:h-16 rounded-xl border border-border/30 bg-card/10 flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-card/40 hover:border-border/60 transition-all duration-500 cursor-default"
                    >
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground/70">Cliente {j + 1}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-32">
          <p className="text-base text-foreground mb-6 font-medium tracking-wide">{t.stats.cta}</p>
          <motion.a
            href="https://wa.me/5511998409981?text=Quero%20fazer%20parte%20dos%20seus%20casos%20de%20sucesso"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366" className="mr-1 filter brightness-0 invert">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            {t.stats.ctaButton}
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Stats;
