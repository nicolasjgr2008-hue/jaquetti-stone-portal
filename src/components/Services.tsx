import { useState } from "react";
import { Code, TrendingUp, Palette, Pencil, Search, Rocket, ChevronDown } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

const servicesDetails = [
  {
    id: "web",
    title: "Website Development",
    icon: Code,
    description: "Sites institucionais, landing pages e portais modernos, rápidos e otimizados para converter visitantes em clientes.",
    detail: "Entrega em até 15 dias úteis",
    price: "A partir de R$ 1.800",
    popular: true,
    highlight: false,
    content: "Desenvolvemos plataformas com as melhores tecnologias do mercado (React, Next.js, Node.js), garantindo carregamento ultrarrápido, acessibilidade e um design focado na experiência do usuário."
  },
  {
    id: "seo",
    title: "SEO & Posicionamento",
    icon: Search,
    description: "Estratégias para seu site aparecer no topo do Google e atrair clientes de forma orgânica e consistente.",
    detail: "Resultados visíveis em 60–90 dias",
    price: "A partir de R$ 800/mês",
    popular: false,
    highlight: false,
    content: "Através de auditorias técnicas, pesquisa de palavras-chave e otimização On-Page e Off-Page, colocamos sua marca na frente de quem já procura pelo que você vende."
  },
  {
    id: "traffic",
    title: "Tráfego Pago",
    icon: TrendingUp,
    description: "Campanhas no Google Ads e Meta Ads focadas em ROI. Cada real investido com estratégia e acompanhamento.",
    detail: "Setup + gestão mensal",
    price: "Gestão a partir de R$ 600/mês",
    popular: false,
    highlight: false,
    content: "Gerenciamos seu orçamento com precisão. Criamos testes A/B, rastreamento de conversões e funis escaláveis para maximizar o seu Retorno Sobre o Investimento."
  },
  {
    id: "design",
    title: "Design & Identidade Visual",
    icon: Palette,
    description: "Identidade visual completa, logotipos e materiais gráficos com impacto visual e valor de marca.",
    detail: "Identidade completa",
    price: "A partir de R$ 1.500",
    popular: false,
    highlight: false,
    content: "Do estudo de cores à tipografia, criamos uma identidade memorável que posiciona sua empresa como líder no segmento e gera confiança imediata no seu consumidor."
  },
  {
    id: "copy",
    title: "Copywriting",
    icon: Pencil,
    description: "Textos persuasivos para anúncios, landing pages e e-mails que transformam visitantes em clientes compradores.",
    detail: "Para landing pages e anúncios",
    price: "A partir de R$ 400",
    popular: false,
    highlight: false,
    content: "Utilizamos gatilhos mentais e a voz correta da sua marca para escrever copys irresistíveis que quebram objeções e facilitam a decisão de compra."
  },
  {
    id: "package",
    title: "Pacote Completo",
    icon: Rocket,
    description: "Website + SEO + Tráfego + Copywriting. Uma máquina completa de vendas para crescimento acelerado.",
    detail: "Crescimento acelerado",
    price: "A partir de R$ 3.500",
    popular: false,
    highlight: true,
    content: "A solução definitiva. Alinhamos design, performance, posicionamento orgânico e anúncios pagos em uma única estratégia coesa para dominar seu mercado."
  }
];

const ServiceCard = ({ service, index }: { service: typeof servicesDetails[0], index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative flex flex-col p-6 sm:p-8 rounded-2xl border transition-all duration-300 group
        ${service.highlight ? 'border-primary bg-primary/5 shadow-[0_0_30px_-10px_hsl(var(--primary))]' : 'border-border/40 bg-[#111111]/80 hover:bg-[#1a1a1a] hover:-translate-y-1 hover:border-primary/30'}
      `}
    >
      {service.popular && (
        <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
          Mais popular
        </div>
      )}
      
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.highlight ? 'bg-primary/20 text-primary' : 'bg-card border border-border/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/30'} transition-all duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">{service.detail}</p>
          <p className={`font-semibold text-sm ${service.highlight ? 'text-primary' : 'text-foreground/90'}`}>{service.price}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{service.title}</h3>
      <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6 flex-grow">{service.description}</p>

      <div className="mt-auto">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          Saiba mais <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border/20">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.content}</p>
                <a 
                  href={`https://wa.me/5511998409981?text=Olá,%20quero%20saber%20mais%20sobre%20o%20serviço%20de%20${encodeURIComponent(service.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all font-medium text-sm"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="solucoes" className="py-32 bg-background relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.015] blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {servicesDetails.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-20">
          <a
            href="https://wa.me/5511998409981?text=Quero%20um%20orçamento%20dos%20serviços"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary hover:text-primary-foreground uppercase tracking-wider"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Orçamento gratuito em até 2 horas
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
