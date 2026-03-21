import { Check, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem, MagneticButton } from "./AnimatedSection";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  gradient: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 497",
    period: "/mês",
    description: "Ideal para pequenos negócios que estão começando sua presença digital",
    features: [
      "Landing page responsiva",
      "Design personalizado",
      "SEO básico",
      "Suporte por email",
      "1 revisão inclusa",
    ],
    gradient: "from-muted/50 to-muted/30",
  },
  {
    id: "professional",
    name: "Professional",
    price: "R$ 1.297",
    period: "/mês",
    description: "Para empresas que buscam crescimento e mais funcionalidades",
    features: [
      "Site completo até 5 páginas",
      "Design premium personalizado",
      "SEO avançado",
      "Integração com redes sociais",
      "Suporte prioritário",
      "3 revisões inclusas",
      "Analytics configurado",
    ],
    popular: true,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 2.997",
    period: "/mês",
    description: "Solução completa para empresas que precisam de máxima performance",
    features: [
      "Site ilimitado de páginas",
      "Design exclusivo",
      "SEO premium + consultoria",
      "E-commerce integrado",
      "Suporte 24/7",
      "Revisões ilimitadas",
      "Dashboard personalizado",
      "Manutenção mensal",
    ],
    gradient: "from-accent/30 to-accent/10",
  },
];

const PricingCard = ({ plan, index }: { plan: Plan; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.9, 1, 1.08, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.5, 1, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y }}
      className="relative"
    >
      {/* Popular Badge */}
      {plan.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            Mais Popular
          </div>
        </motion.div>
      )}

      <motion.div
        className={`
          relative overflow-hidden rounded-3xl border-2 p-8 h-full
          transition-colors duration-500
          ${plan.popular ? "border-primary bg-card shadow-2xl shadow-primary/20" : "border-border bg-card/50 shadow-lg"}
        `}
        whileHover={{
          borderColor: "hsl(var(--primary))",
          boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`} />

        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Plan Name */}
          <motion.h3
            className="text-xl font-semibold mb-2 text-foreground"
            whileHover={{ color: "hsl(var(--primary))" }}
            transition={{ duration: 0.2 }}
          >
            {plan.name}
          </motion.h3>

          {/* Price with animation */}
          <div className="mb-4">
            <motion.span
              className="text-4xl md:text-5xl font-serif font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            >
              {plan.price}
            </motion.span>
            <span className="text-muted-foreground text-sm">{plan.period}</span>
          </div>

          {/* Description */}
          <p className="text-sm mb-6 text-muted-foreground leading-relaxed">
            {plan.description}
          </p>

          {/* Features with stagger animation */}
          <ul className="space-y-3 mb-8 flex-grow">
            {plan.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                </motion.div>
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <MagneticButton className="w-full">
            <motion.a
              href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto"
              target="_blank" rel="noopener noreferrer"
              className={`
                w-full py-4 px-6 rounded-xl font-medium text-center block
                transition-all duration-300 ease-out
                ${plan.popular
                  ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar Agora
            </motion.a>
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Planos
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Escolha o plano{" "}
            <motion.span
              className="text-primary inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px hsl(var(--primary))",
                  "0 0 20px hsl(var(--primary))",
                  "0 0 0px hsl(var(--primary))",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ideal
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Soluções flexíveis que crescem com seu negócio. Todos os planos incluem
            suporte dedicado e garantia de satisfação.
          </motion.p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          * Todos os preços em reais. Consulte condições especiais para pagamento anual.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
