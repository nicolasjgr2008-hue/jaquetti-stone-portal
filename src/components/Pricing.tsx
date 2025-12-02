import { Check, Star } from "lucide-react";
import { useScrollScale } from "@/hooks/useScrollScale";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const { ref, scale, isActive } = useScrollScale({ 
    threshold: 0.3, 
    maxScale: 1.08 
  });

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        transform: `scale(${scale})`,
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: isActive ? 10 : 1,
      }}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            Mais Popular
          </div>
        </div>
      )}

      <div
        className={`
          relative overflow-hidden rounded-3xl border-2 p-8 h-full
          transition-all duration-500 ease-out
          ${isActive 
            ? "border-primary bg-card shadow-2xl shadow-primary/20" 
            : "border-border bg-card/50 shadow-lg"
          }
        `}
      >
        {/* Background Gradient */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br ${plan.gradient} 
            transition-opacity duration-500
            ${isActive ? "opacity-100" : "opacity-50"}
          `}
        />

        {/* Glow Effect */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Plan Name */}
          <h3 
            className={`
              text-xl font-semibold mb-2 transition-all duration-300
              ${isActive ? "text-primary" : "text-foreground"}
            `}
          >
            {plan.name}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <span 
              className={`
                text-4xl md:text-5xl font-serif font-bold transition-all duration-300
                ${isActive ? "text-foreground" : "text-muted-foreground"}
              `}
            >
              {plan.price}
            </span>
            <span className="text-muted-foreground text-sm">{plan.period}</span>
          </div>

          {/* Description */}
          <p 
            className={`
              text-sm mb-6 transition-all duration-300 leading-relaxed
              ${isActive ? "text-foreground" : "text-muted-foreground"}
            `}
          >
            {plan.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {plan.features.map((feature, idx) => (
              <li 
                key={idx} 
                className={`
                  flex items-start gap-3 text-sm transition-all duration-300
                  ${isActive ? "text-foreground" : "text-muted-foreground"}
                `}
                style={{ 
                  transitionDelay: isActive ? `${idx * 50}ms` : "0ms" 
                }}
              >
                <Check 
                  className={`
                    w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300
                    ${isActive ? "text-primary" : "text-muted-foreground/50"}
                  `} 
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="mailto:jaquettiweb@gmail.com"
            className={`
              w-full py-4 px-6 rounded-xl font-medium text-center
              transition-all duration-300 ease-out
              ${isActive 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }
            `}
          >
            Começar Agora
          </a>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const headerRef = useScrollReveal();

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center mb-16 scroll-reveal"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Planos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Escolha o plano{" "}
            <span className="text-primary">ideal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluções flexíveis que crescem com seu negócio. Todos os planos incluem
            suporte dedicado e garantia de satisfação.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          * Todos os preços em reais. Consulte condições especiais para pagamento anual.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
