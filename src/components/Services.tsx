import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem, MagneticButton } from "./AnimatedSection";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const serviceIcons: LucideIcon[] = [Code, TrendingUp, Palette, Pencil, Search, MessageSquare];

const ServiceCard = ({ 
  title,
  description,
  icon: Icon,
  index, 
  isHovered, 
  isAnyHovered 
}: { 
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
}) => {
  const scale = isHovered ? 1.08 : isAnyHovered ? 0.92 : 1;
  const opacity = isHovered ? 1 : isAnyHovered ? 0.6 : 1;
  const y = isHovered ? -16 : 0;

  return (
    <StaggerItem>
      <motion.div
        animate={{ scale, opacity, y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-500 h-full relative overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          />

          <CardContent className="p-8 space-y-4 relative z-10">
            {/* Icon with animation */}
            <motion.div
              className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon
                className="text-primary transition-transform duration-500 group-hover:scale-110"
                size={32}
              />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-semibold group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/* Animated underline */}
            <motion.div
              className="h-0.5 bg-primary"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </CardContent>

          {/* Corner accent */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </StaggerItem>
  );
};

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="solucoes" className="py-24 bg-background relative overflow-hidden">
      {/* Animated background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-4">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.services.title1}{" "}
            <span className="text-primary relative inline-block">
              {t.services.title2}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.services.subtitle}
          </motion.p>
        </AnimatedSection>

        {/* Services Grid with Stagger Animation */}
        <div onMouseLeave={() => setHoveredIndex(null)}>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {t.services.items.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  icon={serviceIcons[index]}
                  index={index} 
                  isHovered={hoveredIndex === index}
                  isAnyHovered={hoveredIndex !== null}
                />
              </div>
            ))}
          </StaggerContainer>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <MagneticButton className="inline-block">
            <motion.a
              href="mailto:jaquettiweb@gmail.com"
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 font-medium text-lg group relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative">
                {t.services.cta}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
