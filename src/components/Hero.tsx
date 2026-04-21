import { ArrowRight, Check } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import HeroParticles from "./HeroParticles";
import { lazy, Suspense, useEffect, useRef, useState, useCallback, Fragment } from "react";
import { LiquidButton } from "./LiquidButton";
import { useIsMobile } from "@/hooks/use-mobile";

const SplineScene = lazy(() =>
  import('@/components/ui/splite').then(m => ({ default: m.SplineScene }))
);

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

/* ─── Typewriter Hook ─── */
const useTypewriter = (text: string, speed = 60, startDelay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setShowCursor(false);
    setDone(false);

    const delayTimer = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          setTimeout(type, speed);
        } else {
          setDone(true);
          // Hide cursor 1s after finishing
          setTimeout(() => setShowCursor(false), 1000);
        }
      };
      type();
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, showCursor, done };
};

/* ─── Magnetic Button Component ─── */
const MagneticHeroButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      const factor = (80 - dist) / 80;
      const moveX = dx * factor * 0.1; // max ~8px
      const moveY = dy * factor * 0.1;
      ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      ref.current.style.transition = "transform 0.1s ease-out";
    } else {
      ref.current.style.transform = "translate(0, 0)";
      ref.current.style.transition = "transform 0.3s ease";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = "transform 0.3s ease";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={ref} className={className} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

/* ─── Hero Component ─── */
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const { t } = useLanguage();
  // Synchronous mobile detection — runs BEFORE first render to prevent Spline flash on mobile
  const isMobile = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 767px)').matches
    : false;
  const heroRef = useRef<HTMLElement>(null);

  // ── UTM detection ──
  const [adVariant, setAdVariant] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_content') || params.get('utm_campaign');
    setAdVariant(utm);
  }, []);

  // ── Copy helper: returns overrides when a known ad variant is detected ──
  const getHeroCopy = () => {
    switch (adVariant) {
      case 'ad02':
      case 'autoridade':
        return {
          badge: 'SEU CONCORRENTE NÃO VAI CONSEGUIR COPIAR ISSO.',
          headline2: 'autoridade antes da conversa começar',
          subtitle: 'Enquanto seu concorrente explica o que faz, seu site já convenceu. Design que comunica valor antes do visitante ler uma linha — e transforma dúvida em decisão.',
          proofPoints: [
            'Design que comunica valor imediato',
            '98% dos clientes fecham novo contrato',
            'Entrega em até 15 dias',
          ],
        };
      case 'ad04':
      case 'closer':
        return {
          badge: 'TRABALHA ENQUANTO VOCÊ DORME. FECHA ENQUANTO VOCÊ ENTREGA.',
          headline2: 'fechar sem você estar presente',
          subtitle: 'Uma página que conduz, quebra objeções e transforma interesse em decisão — sem depender da sua disponibilidade em nenhum momento do processo.',
          proofPoints: [
            'Página que vende 24h sem você presente',
            'Integração com WhatsApp e pixel inclusa',
            'Entrega em até 15 dias',
          ],
        };
      case 'ad07':
      case 'ecommerce':
        return {
          badge: 'SUA LOJA ABERTA 24H. EM QUALQUER LUGAR DO BRASIL.',
          headline2: 'vender online enquanto a loja física dorme',
          subtitle: 'Plataforma de e-commerce completa: vitrine, pagamento integrado e estrutura pronta para receber clientes — mesmo quando você está fechado. Entrega em até 15 dias.',
          proofPoints: [
            'Loja integrada com Pix, cartão e boleto',
            'Pronta para vender em 15 dias',
            'Gestão simples, sem depender de programador',
          ],
        };
      case 'ad09':
      case 'portfolio':
        return {
          badge: 'UM PORTFÓLIO QUE FECHA CONTRATO ANTES DE VOCÊ FALAR.',
          headline2: 'impressionar antes da conversa começar',
          subtitle: 'O cliente decide em milissegundos se o seu trabalho vale atenção. Um portfólio com autoridade visual muda esse julgamento antes de qualquer projeto ser visto.',
          proofPoints: [
            'Portfólio que fecha contrato',
            'Animações e CMS incluso',
            'Entrega em até 15 dias',
          ],
        };
      default:
        return null;
    }
  };

  const heroCopy = getHeroCopy();

  // Proof points — use UTM variant or fall back to translation stats
  const proofPoints: string[] = heroCopy?.proofPoints ?? t.hero.stats;

  // Typewriter for headline2 — starts after headline1 stagger delay (280ms)
  const { displayed, showCursor } = useTypewriter(
    heroCopy?.headline2 || t.hero.headline2,
    60,
    280
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Spline 3D Background - Hidden on mobile for performance */}
      {!isMobile ? (
        <Suspense fallback={<div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />}>
          <div className="absolute inset-0 z-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              followMouse={true}
            />
          </div>
        </Suspense>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />
      )}

      {/* Canvas Particles - Desktop only */}
      {!isMobile && <HeroParticles />}

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/50 to-background" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y }}
      >
        {/* Bind framer-motion transforms */}
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* ── Eyebrow (delay 0ms, duration 600ms) ── */}
          <div className="hero-stagger" style={{ "--stagger-delay": "0ms", "--stagger-duration": "600ms" } as React.CSSProperties}>
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {heroCopy?.badge || t.hero.badge}
            </span>
          </div>

          {/* ── Headline Container with Glitch ── */}
          <div className="hero-stagger" style={{ "--stagger-delay": "150ms", "--stagger-duration": "700ms" } as React.CSSProperties}>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight"
            >
              {/* Line 1 — static (delay 150ms) */}
              <span className="block">{t.hero.headline1}</span>
              {/* Line 2 — typewriter (delay 280ms, duration 700ms) */}
              <span className="text-primary block hero-stagger" style={{ "--stagger-delay": "280ms", "--stagger-duration": "700ms" } as React.CSSProperties}>
                {displayed}
                {showCursor && (
                  <span className="hero-cursor" aria-hidden="true">|</span>
                )}
              </span>
            </h1>
          </div>

          {/* ── Subtitle (delay 420ms, duration 600ms) ── */}
          <div className="hero-stagger" style={{ "--stagger-delay": "420ms", "--stagger-duration": "600ms" } as React.CSSProperties}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {heroCopy?.subtitle || t.hero.subtitle}
            </p>
          </div>

          {/* ── CTA Buttons ── */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button (delay 560ms, duration 500ms) + Magnetic + Liquid */}
            <div className="hero-stagger" style={{ "--stagger-delay": "560ms", "--stagger-duration": "500ms" } as React.CSSProperties}>
              <MagneticHeroButton>
                <LiquidButton
                  asChild
                  className="hero-btn-glow"
                >
                  <a
                    href={`https://wa.me/5511998409981?text=${encodeURIComponent(t.whatsapp.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-black hover:bg-white/90 h-11 rounded-md px-8 text-sm py-6 tracking-wide font-medium transition-colors"
                    onClick={() => trackWa('hero_cta_principal')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      className="mr-2"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    {t.hero.cta1}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </LiquidButton>
              </MagneticHeroButton>
            </div>

            {/* Secondary Button (delay 640ms, duration 500ms) */}
            <div className="hero-stagger" style={{ "--stagger-delay": "640ms", "--stagger-duration": "500ms" } as React.CSSProperties}>
              <LiquidButton
                asChild
                className="inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground h-11 rounded-md text-sm px-8 py-6 tracking-wide text-muted-foreground transition-colors"
              >
                <a href="#cases">{t.hero.cta2}</a>
              </LiquidButton>
            </div>
          </div>

          {/* ── Social Proof Micro-line (delay 750ms, duration 500ms) ── */}
          <div className="hero-stagger pt-2" style={{ "--stagger-delay": "750ms", "--stagger-duration": "500ms" } as React.CSSProperties}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-[12px] text-muted-foreground/80 font-medium">
              {proofPoints.map((point, index) => (
                <Fragment key={point}>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    <span>{point}</span>
                  </div>
                  {index < proofPoints.length - 1 && (
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hero-stagger" style={{ "--stagger-delay": "900ms" } as React.CSSProperties}>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5 hero-scroll-dot">
          <div className="w-1 h-1 bg-muted-foreground/50 rounded-full hero-scroll-dot-inner" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
