import { useState } from "react";
import { Rocket, Building2, ShoppingCart, Briefcase, CheckCircle2, ChevronDown } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTilt } from "@/hooks/useTilt";
import { ScrambleText } from "./ScrambleText";
import { LiquidButton } from "./LiquidButton";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const siteTypeCta: Record<string, string> = {
  landing: 'cta_landing_page',
  institucional: 'cta_institucional',
  ecommerce: 'cta_ecommerce',
  portfolio: 'cta_portfolio',
};

const monthlyPlanCta: Record<string, string> = {
  basico: 'plano_basico',
  gestao: 'plano_gestao',
  premium: 'plano_premium',
};

const siteTypes = [
  {
    id: "landing",
    title: "01 — LANDING PAGE",
    icon: Rocket,
    description: "Transforme visitantes em leads e clientes. Ideal para lançamentos, infoprodutos e campanhas de tráfego pago.",
    ctaText: "Quero mais conversões →",
    ctaMessage: "Quero uma landing page que converte",
    ctaMessageEN: "Hi! I'd like a landing page quote — seeing the $997 Professional plan",
    tiers: [
      { 
        name: "Básica", price: "R$ 797", priceUSD: "$497", popular: false,
        features: ["1 página responsiva", "Formulário de captura", "Entrega em 7 dias"]
      },
      { 
        name: "Profissional", price: "R$ 1.497", priceUSD: "$997", popular: true,
        features: ["Até 3 seções personalizadas", "Integração com WhatsApp e pixel", "SEO básico configurado", "Entrega em 10 dias"]
      },
      { 
        name: "Premium", price: "R$ 2.997", priceUSD: "$2,497", popular: false,
        features: ["Páginas ilimitadas", "Copywriting profissional incluso", "A/B test configurado", "Suporte por 60 dias"]
      }
    ]
  },
  {
    id: "institucional",
    title: "02 — SITE INSTITUCIONAL",
    icon: Building2,
    description: "Apareça antes da concorrência e conquiste credibilidade imediata. Seu cliente pesquisa antes de contratar — esteja lá.",
    ctaText: "Quero aparecer profissional →",
    ctaMessage: "Quero um site institucional profissional",
    ctaMessageEN: "Hi! I'd like a quote for an institutional website — interested in the $2,997 Professional plan",
    tiers: [
      { 
        name: "Essencial", price: "R$ 2.997", priceUSD: "$1,497", popular: false,
        features: ["Até 5 páginas institucionais", "Design totalmente responsivo", "Botão WhatsApp fixo"]
      },
      { 
        name: "Profissional", price: "R$ 3.997", priceUSD: "$2,997", popular: true,
        features: ["Até 10 páginas", "Identidade visual premium", "SEO avançado em todas páginas", "Painel de blog configurado"]
      },
      { 
        name: "Premium", price: "R$ 6.997", priceUSD: "$5,997", popular: false,
        features: ["Páginas ilimitadas", "Sistema Multi-idioma integrado", "Integração nativa com CRM", "Consultoria de 3 meses"]
      }
    ]
  },
  {
    id: "ecommerce",
    title: "03 — E-COMMERCE",
    icon: ShoppingCart,
    description: "Venda seus produtos 24h por dia. A recuperação de carrinho abandonado do plano Profissional sozinha recupera em média 10-15% das vendas perdidas — o suficiente para pagar a diferença do plano no primeiro mês.",
    ctaText: "Quero vender 24h →",
    ctaMessage: "Quero uma loja virtual",
    ctaMessageEN: "Hi! I'd like a quote for an online store — seeing the $4,997 Professional plan",
    tiers: [
      { 
        name: "Starter", price: "R$ 2.997", priceUSD: "$1,997", popular: false,
        features: ["Até 50 produtos cadastrados", "Meios de Pagamento e Frete", "Layout Otimizado para Mobile"]
      },
      { 
        name: "Profissional", price: "R$ 5.997", priceUSD: "$4,997", popular: true,
        features: ["Recuperação de carrinho abandonado (paga o plano sozinha)", "Até 500 produtos cadastrados", "Integração avançada ERP / Bling", "Pixel e rastreamento avançado de conversão"]
      },
      { 
        name: "Premium", price: "R$ 9.997", priceUSD: "$9,997", popular: false,
        features: ["Produtos Ilimitados (Banco próprio)", "Múltiplos centros de distribuição", "Recursos para B2B e Atacado", "Suporte técnico 24h dedicado"]
      }
    ]
  },
  {
    id: "portfolio",
    title: "04 — PORTFÓLIO",
    icon: Briefcase,
    description: "Impressione clientes antes de abrir a boca. Mostre seu trabalho de um jeito que ninguém esquece.",
    ctaText: "Quero impressionar clientes →",
    ctaMessage: "Quero um site portfólio",
    ctaMessageEN: "Hi! I'd like a portfolio website quote — interested in the $1,497 Creative plan",
    tiers: [
      { 
        name: "Básico", price: "R$ 997", priceUSD: "$597", popular: false,
        features: ["Galeria de projetos simples", "Link para redes sociais", "Design clean minimalista"]
      },
      { 
        name: "Criativo", price: "R$ 1.997", priceUSD: "$1,497", popular: true,
        features: ["Galeria interativa CMS", "Animações modernas fluidas", "Estudo de caso detalhado / página", "SEO Focado em Portfólio"]
      },
      { 
        name: "Elite", price: "R$ 3.497", priceUSD: "$2,997", popular: false,
        features: ["Filtros dinâmicos por categoria", "Área restrita por senha (Password)", "Vídeo Background em Loop", "Manutenção VIP 6 meses"]
      }
    ]
  }
];

const monthlyPlans = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 149/mês",
    priceUSD: "$49/mo",
    subtitle: "Para quem só precisa existir online — sem crescimento ativo",
    popular: false,
    features: [
      "Hospedagem gerenciada SSD",
      "Certificado SSL (HTTPS)",
      "Backup quinzenal automático",
      "1 alteração de conteúdo/mês"
    ],
    ctaText: "Contratar Básico →",
    ctaMessage: "Quero o plano mensal Básico de R$ 149",
    ctaMessageEN: "Hi! I'd like the Basic maintenance plan at $49/mo"
  },
  {
    id: "gestao",
    name: "Gestão",
    price: "R$ 297/mês",
    priceUSD: "$97/mo",
    subtitle: "Para quem quer crescer, não apenas sobreviver online",
    popular: true,
    features: [
      "Tudo do Básico",
      "Backup semanal",
      "Monitoramento semanal de disponibilidade",
      "Manutenção técnica mensal",
      "4 alterações de conteúdo/mês",
      "Suporte via WhatsApp (até 8h úteis)",
      "Relatório de desempenho simplificado",
      "Otimização de velocidade semestral",
      "Pequenas melhorias de design (até 1h/mês)",
      "Aviso de renovação de domínio"
    ],
    ctaText: "Contratar Gestão →",
    ctaMessage: "Quero o plano mensal Gestão de R$ 297",
    ctaMessageEN: "Hi! I'd like the Management plan at $97/mo"
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 497/mês",
    priceUSD: "$197/mo",
    subtitle: "Para negócios onde cada hora offline custa dinheiro real",
    popular: false,
    features: [
      "Tudo do Gestão",
      "Servidor dedicado",
      "Backup DIÁRIO",
      "Monitoramento contínuo 24h/7",
      "Manutenção quinzenal + urgências",
      "Alterações de conteúdo ILIMITADAS",
      "Suporte WhatsApp prioritário (até 4h úteis)",
      "Relatório completo com insights",
      "Otimização de velocidade trimestral",
      "Melhorias de design (até 3h/mês)",
      "Renovação de domínio gerenciada por nós"
    ],
    ctaText: "Contratar Premium →",
    ctaMessage: "Quero o plano mensal Premium de R$ 497",
    ctaMessageEN: "Hi! I'd like the Premium plan at $197/mo"
  }
];

const SiteTypeCard = ({ site }: { site: typeof siteTypes[0] }) => {
  const Icon = site.icon;
  const tiltRef = useTilt();
  const { language } = useLanguage();

  const [expandedTier, setExpandedTier] = useState<number>(
    site.tiers.findIndex(t => t.popular) !== -1 ? site.tiers.findIndex(t => t.popular) : 0
  );

  return (
    <div 
      ref={tiltRef as unknown as React.RefObject<HTMLDivElement>} 
      className="flex flex-col p-6 sm:p-8 rounded-3xl border border-border/30 bg-card/5 hover:bg-card/20 hover:border-border/50 transition-all duration-500 group reveal"
      style={{ transition: "transform 0.15s ease-out, background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease" }}
      data-cursor="view"
    >
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold tracking-wider text-foreground font-serif reveal">{site.title}</h3>
      </div>
      
      <p className="text-sm font-medium text-muted-foreground/90 leading-relaxed mb-6 flex-grow reveal relative z-10">
        {site.description}
      </p>

      {/* Tiers Accordion */}
      <div className="space-y-3 mb-8 relative z-10">
        {site.tiers.map((tier, idx) => {
          const isExpanded = expandedTier === idx;
          return (
            <div 
              key={idx} 
              onClick={() => setExpandedTier(isExpanded ? -1 : idx)}
              className={`flex flex-col p-4 rounded-xl border transition-all cursor-pointer select-none ${
                tier.popular 
                  ? 'border-primary/40 bg-primary/[0.03]' 
                  : 'border-border/20 bg-card/10 hover:border-border/40'
              } ${isExpanded && tier.popular ? 'shadow-[0_0_15px_rgba(200,150,50,0.05)] transform scale-[1.01]' : ''} relative`}
            >
              {tier.popular && (
                 <span className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 sm:right-4 bg-[#D4AF37] text-black text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-lg border border-yellow-200/20 whitespace-nowrap z-10">
                   ⭐ Mais Vendido
                 </span>
              )}
              
              <div className={`flex items-center justify-between gap-2 ${tier.popular ? 'mt-1 sm:mt-0' : ''}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${tier.popular ? 'text-[#D4AF37]' : 'text-primary/60'}`} />
                  <span className={`text-[13px] font-bold uppercase tracking-wide ${tier.popular ? 'text-foreground' : 'text-foreground/80'}`}>
                    {tier.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {tier.popular && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-muted-foreground/50 line-through leading-none">
                        {language === 'en' ? (site.tiers[site.tiers.length - 1] as any).priceUSD : site.tiers[site.tiers.length - 1].price}
                      </span>
                      <span className="text-[9px] text-muted-foreground/40 leading-none">vs premium</span>
                    </div>
                  )}
                  <span className={`font-serif font-bold whitespace-nowrap ${tier.popular ? 'text-lg text-[#D4AF37]' : 'text-base text-foreground/90'}`}>
                    {language === 'en' ? (tier as any).priceUSD : tier.price}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''} ${tier.popular ? 'text-[#D4AF37]' : 'text-muted-foreground'}`}/>
                </div>
              </div>
              
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1.5 pl-7 mt-4 pt-4 border-t border-border/10">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs text-muted-foreground/80 flex items-start leading-snug">
                          <span className="text-primary/40 mr-2 text-[10px] mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-auto reveal relative z-10">
        <LiquidButton 
          asChild
          onClick={() => { 
            trackWa(siteTypeCta[site.id] || `cta_${site.id}`); 
            window.open(`https://wa.me/5511998409981?text=${encodeURIComponent(language === 'en' ? (site as any).ctaMessageEN : site.ctaMessage)}`, "_blank"); 
          }}
          data-source={`cta_services_${site.id}`}
          className="w-full flex items-center justify-center py-4 rounded-xl bg-foreground text-background font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-foreground/90 hover:shadow-lg transition-all duration-300"
        >
          {site.ctaText}
        </LiquidButton>
        <p className="text-center text-[11px] mt-3 font-medium flex items-center justify-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            30 dias de garantia · Sem fidelidade
          </span>
        </p>
        <p className="text-center text-[11px] text-amber-500/80 mt-1 font-medium flex items-center justify-center gap-1">
          {(() => {
            const day = new Date().getDate();
            const vagasTotais = 3;
            const vagasRestantes = day <= 7 ? 3 : day <= 14 ? 2 : 1;
            const ocupadas = vagasTotais - vagasRestantes;
            return `⚡ ${ocupadas} das ${vagasTotais} vagas de ${new Date().toLocaleDateString('pt-BR', {month: 'long'})} já reservadas`;
          })()}
        </p>
      </div>
    </div>
  );
};

const MonthlyPlanCard = ({ plan }: { plan: typeof monthlyPlans[0] }) => {
  const tiltRef = useTilt();
  const { language } = useLanguage();

  return (
    <div 
      ref={tiltRef as unknown as React.RefObject<HTMLDivElement>}
      className={`flex flex-col p-8 rounded-3xl border transition-all duration-500 relative h-full reveal ${
        plan.popular 
          ? 'border-primary/40 bg-card/30 shadow-[0_0_30px_-15px_hsl(var(--primary)/0.3)] transform md:-translate-y-2' 
          : 'border-border/30 bg-card/5 hover:bg-card/15 hover:border-border/50'
      }`}
      style={{ transition: "transform 0.15s ease-out, background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease" }}
      data-cursor="view"
    >
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[11px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-lg border border-yellow-200/20 whitespace-nowrap z-10">
          ⭐ Mais Escolhido
        </span>
      )}
      
      <h3 className={`text-2xl font-bold uppercase tracking-wider mb-2 reveal relative z-10 ${plan.popular ? 'text-[#D4AF37]' : 'text-foreground'}`}>
        {plan.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 min-h-[40px] leading-relaxed reveal relative z-10">
        {plan.subtitle}
      </p>
      
      <div className="mb-8 relative z-10">
        <span className={`font-serif font-black text-4xl ${plan.popular ? 'text-foreground' : 'text-foreground/90'}`}>
          {language === 'en'
            ? (plan as any).priceUSD.split('/')[0]
            : plan.price.split('/')[0]}
        </span>
        <span className="text-muted-foreground font-medium">/{language === 'en' ? 'mo' : 'mês'}</span>
      </div>

      <div className="w-full h-px bg-border/30 mb-8 relative z-10" />
      
      <ul className="space-y-4 mb-10 flex-grow relative z-10">
        {plan.features.map((feature, idx) => {
          const isTudoDoBásico = feature.includes("Tudo do Básico") || feature.includes("Tudo do Gestão");
          return (
            <li key={idx} className="flex items-start text-sm text-foreground/80 leading-snug">
              {isTudoDoBásico ? (
                <CheckCircle2 className={`w-4 h-4 mr-3 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-[#D4AF37]' : 'text-foreground'}`} />
              ) : (
                <span className="text-primary/50 mr-3 text-[14px] mt-px">•</span>
              )}
              <span className={isTudoDoBásico ? "font-bold text-foreground" : ""}>
                {feature}
              </span>
            </li>
          );
        })}
      </ul>

      <LiquidButton 
        asChild
        onClick={() => { 
          trackWa(monthlyPlanCta[plan.id] || `plano_${plan.id}`); 
          window.open(`https://wa.me/5511998409981?text=${encodeURIComponent(language === 'en' ? (plan as any).ctaMessageEN : plan.ctaMessage)}`, "_blank"); 
        }}
        data-source={`cta_plan_${plan.id}`}
        className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 reveal relative z-10 ${
          plan.popular 
            ? 'bg-primary text-primary-foreground hover:shadow-[0_0_20px_-5px_hsl(var(--primary))] hover:scale-[1.02]' 
            : 'bg-card border border-border/50 text-foreground hover:bg-foreground hover:text-background'
        }`}
      >
        {plan.ctaText}
      </LiquidButton>
      <p className="text-center text-[11px] text-amber-500/80 mt-3 font-medium flex items-center justify-center gap-1">
        {(() => {
          const day = new Date().getDate();
          const vagasTotais = 3;
          const vagasRestantes = day <= 7 ? 3 : day <= 14 ? 2 : 1;
          const ocupadas = vagasTotais - vagasRestantes;
          return `⚡ ${ocupadas} das ${vagasTotais} vagas de ${new Date().toLocaleDateString('pt-BR', {month: 'long'})} já reservadas`;
        })()}
      </p>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<'sites' | 'plans'>('sites');

  const bottomCtaProps = view === 'sites' 
    ? {
        text: "Não sabe qual plano escolher? Fale com a gente — em 5 minutos indicamos o ideal para você.",
        btn: "Conversar no WhatsApp",
        link: "https://wa.me/5511998409981?text=Olá,%20gostaria%20de%20ajuda%20para%20escolher%20o%20plano%20ideal%20para%20o%20meu%20projeto"
      }
    : {
        text: "Não sabe qual plano escolher? Em 5 minutos indicamos o ideal.",
        btn: "Falar no WhatsApp",
        link: "https://wa.me/5511998409981?text=Quero%20ajuda%20para%20escolher%20um%20plano%20mensal"
      };

  return (
    <section id="solucoes" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary reveal">
            {t.services.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight reveal pt-2">
            <ScrambleText text={t.services.title1} /> <br/> <ScrambleText text={t.services.title2} />
          </h2>
          <p className="text-muted-foreground/80 text-lg reveal">
            {t.services.subtitle}
          </p>
        </AnimatedSection>

        {/* View Toggle */}
        <AnimatedSection className="flex justify-center mb-20 relative z-20">
          <div className="inline-flex items-center p-1.5 bg-card/20 border border-border/20 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setView('sites')}
              className={`px-6 sm:px-10 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                view === 'sites' 
                  ? 'bg-foreground text-background shadow-lg scale-100' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 scale-95'
              }`}
            >
              Site único
            </button>
            <button
              onClick={() => setView('plans')}
              className={`px-6 sm:px-10 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                view === 'plans' 
                  ? 'bg-foreground text-background shadow-lg scale-100' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 scale-95'
              }`}
            >
              + Plano mensal
            </button>
          </div>
        </AnimatedSection>

        {/* Content Area with smooth transition */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {view === 'sites' ? (
              <motion.div
                key="sites"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                {siteTypes.map((site, index) => (
                  <motion.div 
                    key={site.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }}
                  >
                    <SiteTypeCard site={site} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {monthlyPlans.map((plan, index) => (
                    <motion.div 
                      key={plan.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.1 }}
                    >
                      <MonthlyPlanCard plan={plan} />
                    </motion.div>
                  ))}
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-center text-[12px] text-muted-foreground/60 font-medium mt-10"
                >
                  Planos com fidelidade mínima de 3 a 6 meses. Consulte condições no WhatsApp.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center mt-32 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-foreground mb-8 font-serif italic text-muted-foreground/90 leading-relaxed">
            "{bottomCtaProps.text}"
          </p>
          <a
            href={bottomCtaProps.link}
            target="_blank" rel="noopener noreferrer"
            data-source={`cta_services_footer_${view}`}
            onClick={() => trackWa('services_footer')}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] uppercase tracking-widest text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1 filter brightness-0 invert">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            {bottomCtaProps.btn}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
