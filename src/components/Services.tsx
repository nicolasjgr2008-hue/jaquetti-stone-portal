import { Code, TrendingUp, Palette, Pencil, Search, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section id="solucoes" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para transformar sua presença digital
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
              >
                <CardContent className="p-8 space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={32} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-serif font-semibold">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="mailto:jaquettiweb@gmail.com"
            className="inline-block text-primary hover:text-primary/80 font-medium text-lg group"
          >
            SOLICITE SEU ORÇAMENTO
            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
