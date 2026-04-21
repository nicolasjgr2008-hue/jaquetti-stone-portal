import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { Briefcase, Users, Award, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LiquidButton } from "./LiquidButton";
import { ScrambleText } from "./ScrambleText";
import csapetLogo from "@/assets/csapet-logo.png";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const statIcons = [Briefcase, Users, Award, Clock];
const statValues = [150, 80, 12, 98];
const statSuffixes = ["+", "+", "", "%"];

const clientLogos = [
  { name: "CSAPET", logo: csapetLogo },
  { name: "Advocate", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-2.png" },
  { name: "Dinheiro com Crochê", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/Logo-dinheiro-com-croche.png" },
  { name: "Agency Marketing", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo.png" },
  { name: "Austenberg", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/image-removebg-preview.png" },
  { name: "Hermes", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-removebg-preview.png" },
  { name: "SOSVet", logo: "https://nicolasjgr.me/wp-content/uploads/2025/09/Logo-small.png" },
];

const NativeCounter = ({ target, suffix }: { target: number, suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const valRef = useRef<HTMLSpanElement>(null);
  const sufRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        observer.unobserve(el);
        
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);
          
          if (valRef.current) valRef.current.innerText = currentVal.toString();
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            if (valRef.current) valRef.current.innerText = target.toString();
            if (sufRef.current) {
               sufRef.current.innerText = suffix;
               sufRef.current.style.opacity = "1";
            }
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);
  
  return (
    <span ref={ref} className="flex items-baseline gap-1">
       <span ref={valRef} className="text-4xl md:text-5xl font-bold font-serif text-foreground">0</span>
       <span ref={sufRef} className="text-2xl font-bold text-muted-foreground opacity-0 transition-opacity duration-150">{suffix}</span>
    </span>
  );
};

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
      <div className="p-8 rounded-2xl border border-border/20 bg-card/5 hover:bg-card/15 hover:border-border/40 transition-all duration-500 reveal">
        <Icon className="w-6 h-6 text-muted-foreground mb-6 reveal" />

        <div className="flex items-baseline gap-1 mb-3 reveal">
          <NativeCounter target={value} suffix={suffix} />
        </div>

        <h3 className="text-sm font-semibold text-foreground mb-1 reveal">{label}</h3>
        <p className="text-muted-foreground text-xs reveal">{description}</p>
        {context && <p className="mt-3 text-[11px] text-muted-foreground/60 leading-relaxed max-w-[90%] reveal">{context}</p>}
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
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6 reveal">
            {t.stats.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4 reveal pt-2">
            <ScrambleText text={t.stats.title1} />{" "}
            <span className="text-primary"><ScrambleText text={t.stats.title2} /></span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto reveal">
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

        {/* CTA após stats */}
        <AnimatedSection className="text-center mt-14 mb-4" delay={0.2}>
          <LiquidButton
            asChild
            className="inline-flex items-center justify-center text-xs px-10 py-5 rounded-md border border-border/50 text-muted-foreground bg-card/20 hover:text-foreground hover:border-foreground/30 tracking-widest uppercase reveal transition-all"
          >
            <a
              href="https://wa.me/5511998409981?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWa('stats_cta')}
            >
              Quero resultados assim no meu negócio
            </a>
          </LiquidButton>
        </AnimatedSection>

        {/* Client Logos Marquee */}
        <div className="mt-32 pt-16 border-t border-border/20 relative">
          <AnimatedSection className="text-center mb-10">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
              Empresas que já faturam mais com a Jaquetti
            </span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="relative flex overflow-hidden group py-4">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 sm:gap-10 px-3 sm:px-5">
                  {clientLogos.map((client, j) => (
                    <div 
                      key={`${i}-${j}`} 
                      className="w-32 h-14 sm:w-40 sm:h-16 rounded-xl border border-border/20 bg-card/5 flex items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-card/20 hover:border-border/40 transition-all duration-500 cursor-default px-4"
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        loading="lazy" 
                        decoding="async" 
                        width="160"
                        height="64"
                        style={{ objectFit: "contain" }}
                        className="max-w-full max-h-[80%] object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>


      </div>
    </section>
  );
};

export default Stats;
