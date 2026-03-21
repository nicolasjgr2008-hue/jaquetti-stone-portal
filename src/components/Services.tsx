import { Rocket, Building2, ShoppingCart, Briefcase, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const siteTypes = [
  {
    id: "landing",
    title: "01 — LANDING PAGE",
    icon: Rocket,
    description: "Páginas desenhadas para conversão agressiva. Perfeitas para lançamentos, infoprodutos, Google Ads e captura de leads segmentados.",
    tiers: [
      { name: "Básica", price: "R$ 797" },
      { name: "Profissional", price: "R$ 1.497" },
      { name: "Premium", price: "R$ 2.997" }
    ]
  },
  {
    id: "institucional",
    title: "02 — SITE INSTITUCIONAL",
    icon: Building2,
    description: "Sua presença corporativa premium. Sites densos que geram confiança imediata, apresentam seus serviços e posicionam sua empresa frente aos concorrentes.",
    tiers: [
      { name: "Essencial", price: "R$ 2.997" },
      { name: "Profissional", price: "R$ 3.997" },
      { name: "Premium", price: "R$ 6.997" }
    ]
  },
  {
    id: "ecommerce",
    title: "03 — E-COMMERCE",
    icon: ShoppingCart,
    description: "Lojas virtuais seguras, rápidas e escaláveis, integradas com os melhores gateways de pagamento e sistemas logísticos para vendas 24h.",
    tiers: [
      { name: "Starter", price: "R$ 2.997" },
      { name: "Profissional", price: "R$ 5.997" },
      { name: "Premium", price: "R$ 9.997" }
    ]
  },
  {
    id: "portfolio",
    title: "04 — PORTFÓLIO",
    icon: Briefcase,
    description: "Vitrines criativas interativas e visualmente impactantes criadas para designers, arquitetos, agências boutiques e criadores de conteúdo.",
    tiers: [
      { name: "Básico", price: "R$ 997" },
      { name: "Criativo", price: "R$ 1.997" },
      { name: "Elite", price: "R$ 3.497" }
    ]
  }
];

const SiteTypeCard = ({ site, index }: { site: typeof siteTypes[0], index: number }) => {
  const Icon = site.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col p-8 rounded-3xl border border-border/40 bg-card/10 hover:bg-card/30 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold tracking-wider text-foreground font-serif">{site.title}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground/90 leading-relaxed mb-8 flex-grow">
        {site.description}
      </p>

      <div className="space-y-4 mb-8">
        {site.tiers.map((tier, idx) => (
          <div key={idx} className="flex items-center justify-between pb-4 border-b border-border/30 last:border-0 last:pb-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary opacity-70" />
              <span className="text-sm font-medium text-foreground/80">{tier.name}</span>
            </div>
            <span className="text-sm font-bold text-foreground font-serif">{tier.price}</span>
          </div>
        ))}
      </div>

      <a 
        href={`https://wa.me/5511998409981?text=Olá,%20tenho%20interesse%20em%20desenvolver%20um%20${encodeURIComponent(site.title.split('— ')[1].toLowerCase())}`}
        target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center justify-center py-4 rounded-xl bg-foreground text-background font-bold text-sm tracking-wide uppercase hover:bg-primary transition-colors"
      >
        Inicie seu projeto
      </a>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="solucoes" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-24 max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
            Nossas Especialidades
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
            Criamos Plataformas <br/> Que Faturam.
          </h2>
          <p className="text-muted-foreground/80 text-lg">
            Nós somos especialistas apenas em desenvolvimento web. Oferecemos as melhores soluções técnicas escaláveis nas 4 principais modalidades do mercado.
          </p>
        </AnimatedSection>

        {/* Services Grid (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {siteTypes.map((site, index) => (
            <SiteTypeCard key={site.id} site={site} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-32">
          <p className="text-lg text-foreground mb-8 font-medium font-serif italic">Não sabe qual é o ideal para o seu momento?</p>
          <a
            href="https://wa.me/5511998409981?text=Quero%20uma%20consultoria%20gratuita%20para%20escolher%20o%20site%20ideal"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] uppercase tracking-widest text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1 filter brightness-0 invert">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Agendar Reunião Gratuita
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
