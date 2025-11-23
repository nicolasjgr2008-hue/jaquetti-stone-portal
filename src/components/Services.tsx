import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
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

const Services = () => {
  const headerRef = useScrollReveal();

  return (
    <section id="solucoes" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Nossos <span className="text-primary relative inline-block">
              Serviços
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"></span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para transformar sua presença digital
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const ServiceCard = () => {
              const cardRef = useScrollReveal();
              return (
                <div 
                  ref={cardRef}
                  className="scroll-reveal"
                  style={{ 
                    transform: 'translateY(30px)',
                    transitionDelay: `${index * 100}ms` 
                  }}
                >
                  <Card 
                    className="group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 h-full"
                  >
                    <CardContent className="p-8 space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                        <Icon className="text-primary group-hover:scale-110 transition-transform" size={32} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-serif font-semibold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            };
            return <ServiceCard key={index} />;
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="mailto:jaquettiweb@gmail.com"
            className="inline-flex items-center gap-3 text-primary hover:text-primary/80 font-medium text-lg group relative"
          >
            <span className="relative">
              SOLICITE SEU ORÇAMENTO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
