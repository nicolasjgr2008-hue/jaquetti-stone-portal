import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const serviceIcons: LucideIcon[] = [Code, TrendingUp, Palette, Pencil, Search, MessageSquare];

const ServiceCard = ({ 
  title,
  description,
  icon: Icon,
  isHovered, 
  isAnyHovered 
}: { 
  title: string;
  description: string;
  icon: LucideIcon;
  isHovered: boolean;
  isAnyHovered: boolean;
}) => {
  const opacity = isHovered ? 1 : isAnyHovered ? 0.4 : 1;

  return (
    <StaggerItem>
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
      >
        <div className="group p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-border transition-all duration-500 h-full">
          <div className="space-y-5">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
              <Icon className="text-primary/70 group-hover:text-primary transition-colors duration-300" size={24} />
            </div>

            <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="solucoes" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20 space-y-4">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            {t.services.title1}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            {t.services.title2}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div onMouseLeave={() => setHoveredIndex(null)}>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {t.services.items.map((service, index) => (
              <div key={index} onMouseEnter={() => setHoveredIndex(index)}>
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  icon={serviceIcons[index]}
                  isHovered={hoveredIndex === index}
                  isAnyHovered={hoveredIndex !== null}
                />
              </div>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-20">
          <a
            href="mailto:jaquettiweb@gmail.com"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {t.services.cta}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
