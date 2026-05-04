import { Check, Star, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, MagneticButton } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const planCta: Record<string, string> = {
  basico: 'plano_basico',
  gestao: 'plano_gestao',
  premium: 'plano_premium',
};

interface Feature {
  name: string;
  value: string;
  check: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  priceUSD: string;
  period: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  gradient: string;
}

const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 149",
    priceUSD: "$29",
    period: "/mês",
    description: "Seu site no ar e protegido. Para quem precisa do básico sem complicação.",
    features: [
      { name: "Hospedagem", value: "Gerenciada", check: true },
      { name: "Certificado SSL", value: "Incluso", check: true },
      { name: "Backup", value: "Quinzenal", check: true },
      { name: "Atualizações", value: "1/mês", check: true },
      { name: "Fidelidade", value: "3 meses", check: true },
      { name: "Monitoramento", value: "—", check: false },
      { name: "Manutenção", value: "—", check: false },
      { name: "Suporte Whats", value: "—", check: false },
      { name: "Relatório", value: "—", check: false },
      { name: "Performance", value: "—", check: false },
      { name: "Design", value: "—", check: false },
      { name: "Domínio", value: "—", check: false },
    ],
    gradient: "from-muted/50 to-muted/30",
  },
  {
    id: "gestao",
    name: "Gestão",
    price: "R$ 297",
    priceUSD: "$59",
    period: "/mês",
    description: "Site sempre rápido, atualizado e convertendo. Você foca em vender — a gente cuida do resto.",
    popular: true,
    features: [
      { name: "Hospedagem", value: "Gerenciada", check: true },
      { name: "Certificado SSL", value: "Incluso", check: true },
      { name: "Backup", value: "Semanal", check: true },
      { name: "Monitoramento", value: "Semanal", check: true },
      { name: "Manutenção", value: "Mensal", check: true },
      { name: "Atualizações", value: "4/mês", check: true },
      { name: "Suporte Whats", value: "Até 8h úteis", check: true },
      { name: "Relatório", value: "Simplificado", check: true },
      { name: "Performance", value: "Semestral", check: true },
      { name: "Design", value: "Até 1h/mês", check: true },
      { name: "Domínio", value: "Aviso 30 dias", check: true },
      { name: "Fidelidade", value: "6 meses", check: true },
    ],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 497",
    priceUSD: "$99",
    period: "/mês",
    description: "1 hora fora do ar custa mais que o plano inteiro. Proteção total, performance máxima.",
    features: [
      { name: "Hospedagem", value: "Dedicada", check: true },
      { name: "Certificado SSL", value: "Incluso", check: true },
      { name: "Backup", value: "Diário", check: true },
      { name: "Monitoramento", value: "24h/7", check: true },
      { name: "Manutenção", value: "Quinz. + Urgência", check: true },
      { name: "Atualizações", value: "Ilimitado", check: true },
      { name: "Suporte Whats", value: "Até 4h úteis", check: true },
      { name: "Relatório", value: "Completo", check: true },
      { name: "Performance", value: "Trimestral", check: true },
      { name: "Design", value: "Até 3h/mês", check: true },
      { name: "Domínio", value: "Gestão completa", check: true },
      { name: "Fidelidade", value: "6 meses", check: true },
    ],
    gradient: "from-accent/30 to-accent/10",
  },
];

const plansEN: Plan[] = [
  {
    id: "basico",
    name: "Basic",
    price: "R$ 149",
    priceUSD: "$29",
    period: "/mo",
    description: "Your site live and protected. For those who need the essentials without the hassle.",
    features: [
      { name: "Hosting", value: "Managed", check: true },
      { name: "SSL Certificate", value: "Included", check: true },
      { name: "Backup", value: "Bi-weekly", check: true },
      { name: "Updates", value: "1/mo", check: true },
      { name: "Commitment", value: "3 months", check: true },
      { name: "Monitoring", value: "—", check: false },
      { name: "Maintenance", value: "—", check: false },
      { name: "WhatsApp Support", value: "—", check: false },
      { name: "Report", value: "—", check: false },
      { name: "Performance", value: "—", check: false },
      { name: "Design", value: "—", check: false },
      { name: "Domain", value: "—", check: false },
    ],
    gradient: "from-muted/50 to-muted/30",
  },
  {
    id: "gestao",
    name: "Management",
    price: "R$ 297",
    priceUSD: "$59",
    period: "/mo",
    description: "Site always fast, updated and converting. You focus on selling — we handle the rest.",
    popular: true,
    features: [
      { name: "Hosting", value: "Managed", check: true },
      { name: "SSL Certificate", value: "Included", check: true },
      { name: "Backup", value: "Weekly", check: true },
      { name: "Monitoring", value: "Weekly", check: true },
      { name: "Maintenance", value: "Monthly", check: true },
      { name: "Updates", value: "4/mo", check: true },
      { name: "WhatsApp Support", value: "Up to 8h", check: true },
      { name: "Report", value: "Simplified", check: true },
      { name: "Performance", value: "Bi-annual", check: true },
      { name: "Design", value: "Up to 1h/mo", check: true },
      { name: "Domain", value: "30-day notice", check: true },
      { name: "Commitment", value: "6 months", check: true },
    ],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 497",
    priceUSD: "$99",
    period: "/mo",
    description: "1 hour offline costs more than the whole plan. Total protection, maximum performance.",
    features: [
      { name: "Hosting", value: "Dedicated", check: true },
      { name: "SSL Certificate", value: "Included", check: true },
      { name: "Backup", value: "Daily", check: true },
      { name: "Monitoring", value: "24/7", check: true },
      { name: "Maintenance", value: "Bi-wkly + urgent", check: true },
      { name: "Updates", value: "Unlimited", check: true },
      { name: "WhatsApp Support", value: "Up to 4h", check: true },
      { name: "Report", value: "Full", check: true },
      { name: "Performance", value: "Quarterly", check: true },
      { name: "Design", value: "Up to 3h/mo", check: true },
      { name: "Domain", value: "Full management", check: true },
      { name: "Commitment", value: "6 months", check: true },
    ],
    gradient: "from-accent/30 to-accent/10",
  },
];

const pricingMicroCTA = {
  pt: { text: "Não sabe qual plano precisa?", link: "Fale com a gente em 2 minutos", url: "https://wa.me/5511998409981?text=Quero%20ajuda%20para%20escolher%20um%20plano%20mensal" },
  en: { text: "Not sure which plan you need?", link: "Talk to us in 2 minutes", url: "https://wa.me/5511998409981?text=I%20need%20help%20choosing%20a%20monthly%20plan" },
  es: { text: "¿No sabes qué plan necesitas?", link: "Háblanos en 2 minutos", url: "https://wa.me/5511998409981?text=Quiero%20ayuda%20para%20elegir%20un%20plan%20mensual" },
};

const PricingCard = ({ plan, index }: { plan: Plan; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.93, 1, 1.05, 1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.5, 1, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

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
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_0_hsl(var(--primary))]">
            <Star className="w-3.5 h-3.5 fill-current" />
            {t.pricing.mostChosen}
          </div>
        </motion.div>
      )}

      <motion.div
        className={`
          relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 h-full
          transition-colors duration-500
          ${plan.popular ? "border-primary bg-card/90 shadow-2xl shadow-primary/10" : "border-border/50 bg-card/20 hover:bg-card/40 hover:border-border shadow-lg"}
        `}
        whileHover={{
          borderColor: plan.popular ? "hsl(var(--primary))" : "hsl(var(--border))",
          y: -5
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-20`} />

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
            className={`text-xl font-bold mb-2 uppercase tracking-wide ${plan.popular ? 'text-primary' : 'text-foreground/80'}`}
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
              {language === 'en' ? plan.priceUSD : plan.price}
            </motion.span>
            <span className="text-muted-foreground text-sm font-medium">{t.pricing.mo}</span>
          </div>

          {/* Description */}
          <p className="text-sm mb-8 text-muted-foreground/80 leading-relaxed min-h-[40px]">
            {plan.description}
          </p>

          {/* Features mapping exactly like the table */}
          <ul className="space-y-3 mb-10 flex-grow">
            {plan.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className={`flex items-center justify-between text-[13px] border-b border-border/10 pb-2 last:border-0 ${feature.check ? 'text-foreground/90' : 'text-muted-foreground/40'}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-2">
                  {feature.check ? (
                    <Check className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                  ) : (
                    <X className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                  )}
                  <span className="font-medium tracking-wide">{feature.name}</span>
                </div>
                {feature.check && (
                  <span className="text-right font-medium opacity-90 pl-3">{feature.value}</span>
                )}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <MagneticButton className="w-full mt-auto">
            <motion.a
              href={`https://wa.me/5511998409981?text=${encodeURIComponent(
                `${t.pricing.waMessage} ${plan.name}${language === 'en' ? ` at ${plan.priceUSD}/mo` : ' Mensal'}`
              )}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackWa(planCta[plan.id] || `plano_${plan.id}`)}
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-center block text-sm tracking-widest uppercase
                transition-all duration-300 ease-out flex items-center justify-center gap-2
                ${plan.popular
                  ? "bg-primary text-primary-foreground shadow-[0_5px_20px_-5px_hsl(var(--primary))]"
                  : "bg-card border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.pricing.subscribe} {plan.name}
            </motion.a>
          </MagneticButton>
          <p className="text-center text-[11px] text-amber-500/80 mt-3 font-medium flex items-center justify-center gap-1">
            ⚡ {t.pricing.scarcity1} {new Date().toLocaleDateString(language === 'en' ? 'en-US' : (language === 'es' ? 'es-ES' : 'pt-BR'), {month: 'long'})} {t.pricing.scarcity2}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Pricing = () => {
  const { t, language } = useLanguage();
  const activePlans = language === 'en' ? plansEN : plans;

  return (
    <section id="pricing" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 0, transparent 400px)`,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto space-y-4">
          <motion.span
            className="text-primary text-xs font-bold tracking-[0.3em] uppercase block reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.pricing.badge}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold leading-tight reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.pricing.title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground/80 text-lg mx-auto leading-relaxed reveal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.pricing.subtitle}
          </motion.p>
        </AnimatedSection>

        {/* Micro-CTA for undecided users */}
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground">
            {pricingMicroCTA[language].text}{" "}
            <a
              href={pricingMicroCTA[language].url}
              target="_blank"
              rel="noopener noreferrer"
              data-source="cta_pricing_undecided"
              onClick={() => trackWa('pricing_undecided')}
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              {pricingMicroCTA[language].link}
            </a>
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {activePlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
        
        {/* Bottom CTA to remove friction */}
        <AnimatedSection delay={0.4} className="text-center mt-20">
          <p className="text-sm text-muted-foreground mb-6 reveal">{t.pricing.disclaimer}</p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
