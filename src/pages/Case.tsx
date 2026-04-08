import { useParams, Link } from "react-router-dom";
import { cases } from "@/data/cases";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, CheckCircle2, TrendingUp, Wrench, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import marbleBg from "@/assets/marble-bg.jpg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Case = () => {
  const { id } = useParams();
  const caseData = cases.find((c) => c.id === id);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rid: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePosition({ x, y });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rid);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold">Case não encontrado</h1>
          <Link to="/">
            <Button>Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const accent = caseData.accentColor || "hsl(var(--primary))";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        {/* Marble background */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${marbleBg})`,
            backgroundSize: "120%",
            backgroundPosition: "center",
            animation: "marbleMove 30s ease-in-out infinite",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute inset-0 z-[1] opacity-30"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${accent}33, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/80 via-black/70 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/#cases">
            <Button variant="outline" className="mb-10 group border-white/20 hover:border-white/50 text-white/70 hover:text-white">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
              Voltar para Cases
            </Button>
          </Link>

          <div className="max-w-4xl space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{ color: accent, borderColor: `${accent}55`, background: `${accent}15` }}
            >
              {caseData.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-white"
            >
              {caseData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              {caseData.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MOCKUP IMAGE ── */}
      {caseData.mockupImage && (
        <section className="relative -mt-8 mb-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ boxShadow: `0 40px 80px -20px ${accent}33` }}
            >
              {/* Gradient overlay top + bottom */}
              <div className="absolute inset-x-0 top-0 h-12 z-10 bg-gradient-to-b from-background to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-background to-transparent" />
              <img
                src={caseData.mockupImage}
                alt={`${caseData.category} website mockup`}
                className="w-full object-cover max-h-[600px]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CONTENT ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-24">

            {/* Logo + results row */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Logo card */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex">
                <div className="relative group w-full">
                  <div
                    className="absolute inset-0 blur-3xl rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: accent }}
                  />
                  <div className="relative bg-card border border-border/50 rounded-3xl p-10 flex items-center justify-center">
                    <img
                      src={caseData.image}
                      alt={caseData.category}
                      className="h-28 object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              {caseData.results && (
                <div className="grid grid-cols-1 gap-4">
                  {caseData.results.map((r, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-5 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/60 transition-colors"
                    >
                      <span className="text-sm text-muted-foreground font-medium">{r.label}</span>
                      <span className="text-2xl font-bold font-serif" style={{ color: accent }}>{r.value}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Challenge + Solution */}
            {(caseData.challenge || caseData.solution) && (
              <div className="grid md:grid-cols-2 gap-8">
                {caseData.challenge && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4 p-8 rounded-2xl border border-border/40 bg-card/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${accent}22` }}>
                        <Target size={16} style={{ color: accent }} />
                      </div>
                      <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">O Desafio</h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{caseData.challenge}</p>
                  </motion.div>
                )}
                {caseData.solution && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4 p-8 rounded-2xl border border-border/40 bg-card/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${accent}22` }}>
                        <TrendingUp size={16} style={{ color: accent }} />
                      </div>
                      <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">A Solução</h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{caseData.solution}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Full description */}
            {caseData.fullDescription && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-5"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Sobre o Projeto</h2>
                <p className="text-lg text-muted-foreground leading-relaxed border-l-2 pl-6" style={{ borderColor: accent }}>
                  {caseData.fullDescription}
                </p>
              </motion.div>
            )}

            {/* Services */}
            {caseData.services && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Wrench size={18} className="text-muted-foreground" />
                  <h2 className="text-2xl font-serif font-bold">Serviços Entregues</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {caseData.services.map((service, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start gap-2 p-4 rounded-xl border border-border/30 bg-card/20"
                    >
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                      <span className="text-sm text-foreground/80 leading-snug">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center space-y-6 pt-4 pb-8"
            >
              <div
                className="inline-block px-6 py-3 rounded-2xl mb-2"
                style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}
              >
                <p className="text-sm font-medium" style={{ color: accent }}>
                  Quer resultados como esses?
                </p>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold">
                Vamos construir o seu próximo case de sucesso
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-black font-bold px-8"
                  style={{ background: accent }}
                >
                  <a
                    href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWa('case_solicitar_proposta')}
                  >
                    Solicitar Proposta
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                </Button>
                {caseData.url && !caseData.isInternal && caseData.url !== "#" && (
                  <Button asChild variant="outline" size="lg" className="border-border/50 hover:border-border">
                    <a href={caseData.url} target="_blank" rel="noopener noreferrer">
                      Ver Site Ao Vivo
                    </a>
                  </Button>
                )}
                <Button asChild variant="ghost" size="lg">
                  <Link to="/#cases">← Ver Outros Cases</Link>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Case;
