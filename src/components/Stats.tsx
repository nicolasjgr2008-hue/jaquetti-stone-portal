import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection, AnimatedCounter } from "./AnimatedSection";
import { Briefcase, Users, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: 150,
    suffix: "+",
    label: "Projetos Entregues",
    description: "Sites, apps e sistemas desenvolvidos",
  },
  {
    icon: Users,
    value: 80,
    suffix: "+",
    label: "Clientes Satisfeitos",
    description: "Empresas que confiam em nosso trabalho",
  },
  {
    icon: Award,
    value: 12,
    suffix: "",
    label: "Anos de Experiência",
    description: "Atuando no mercado digital",
  },
  {
    icon: Clock,
    value: 98,
    suffix: "%",
    label: "Taxa de Satisfação",
    description: "Clientes que nos recomendam",
  },
];

const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
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
          <stat.icon className="w-8 h-8" />
        </motion.div>

        {/* Counter */}
        <div className="relative flex items-baseline gap-1 mb-2">
          <span className="text-5xl md:text-6xl font-bold font-playfair text-foreground">
            <AnimatedCounter target={stat.value} duration={2.5} />
          </span>
          <span className="text-3xl md:text-4xl font-bold text-primary">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm">{stat.description}</p>

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
  return (
    <section id="stats" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider text-primary border border-primary/30 rounded-full">
            NOSSOS NÚMEROS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-foreground mb-6">
            Resultados que
            <span className="block text-primary">Falam por Si</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que representam nossa dedicação e compromisso com a
            excelência em cada projeto que desenvolvemos.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Pronto para fazer parte dessas estatísticas?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar Projeto
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
