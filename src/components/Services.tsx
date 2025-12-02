import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem, MagneticButton } from "./AnimatedSection";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Code,
    title: "Construções de site",
    description: "Presença digital profissional para atrair e converter clientes.",
  },
  {
    icon: TrendingUp,
    title: "Tráfego",
    description: "Campanhas inteligentes para atrair clientes certos e aumentar suas vendas.",
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    description: "Criação de logotipo e identidade única que traduzem a essência da sua marca.",
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Layouts criativos e profissionais que destacam seu negócio com impacto visual.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Otimização para Google: mais visibilidade e clientes encontrando sua empresa online.",
  },
  {
    icon: MessageSquare,
    title: "Copywriting",
    description: "Textos persuasivos que transformam visitantes em clientes e aumentam conversões.",
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {service.description}
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
            Nossos{" "}
            <span className="text-primary relative inline-block">
              Serviços
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
            Soluções completas para transformar sua presença digital
          </motion.p>
        </AnimatedSection>

        {/* Services Grid with Stagger Animation */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </StaggerContainer>

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
                SOLICITE SEU ORÇAMENTO
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
