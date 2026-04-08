import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Globe, Layout, Smartphone, Search, Users, Zap, CheckCircle2, Palette, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import marbleBg from "@/assets/marble-bg.jpg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const CaseCSAPET = () => {
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
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      cancelAnimationFrame(rid);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const skills = [
    { icon: Palette, label: "Web Design" },
    { icon: Users, label: "UX/UI Design" },
    { icon: Layout, label: "Arquitetura de Informação" },
    { icon: Smartphone, label: "Design Responsivo" },
    { icon: Zap, label: "Otimização de UX" },
    { icon: Search, label: "Noções de SEO" },
  ];

  const implementations = [
    "Estrutura institucional completa",
    "Layout profissional e corporativo",
    "Organização de conteúdos e seções",
    "Navegação intuitiva",
    "Responsividade total",
    "Boas práticas de performance e SEO básico",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${marbleBg})`,
            backgroundSize: '120%',
            backgroundPosition: 'center',
            animation: 'marbleMove 30s ease-in-out infinite',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className="absolute inset-0 z-[1] opacity-20 mix-blend-overlay transition-transform duration-500 ease-out"
          style={{
            background: `
              linear-gradient(135deg, transparent 30%, hsl(43, 96%, 56%) 45%, transparent 50%),
              linear-gradient(-45deg, transparent 35%, hsl(43, 90%, 60%) 48%, transparent 52%),
              linear-gradient(65deg, transparent 40%, hsl(43, 85%, 55%) 50%, transparent 55%),
              linear-gradient(-120deg, transparent 38%, hsl(43, 92%, 58%) 48%, transparent 53%)
            `,
            backgroundSize: '400% 400%, 350% 350%, 300% 300%, 450% 450%',
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%, 25% 75%',
            animation: 'marbleMove 40s ease-in-out infinite reverse',
            transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/85 to-black/90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/#cases">
            <Button variant="outline" className="mb-8 group border-primary/30 hover:border-primary">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
              Voltar para Cases
            </Button>
          </Link>

          <motion.div 
            className="max-w-4xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium uppercase tracking-wide">
              Site Institucional
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              CSAPET – Site Institucional
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Como transformei a presença digital da CSAPET em um site profissional, claro e confiável
            </p>
          </motion.div>
        </div>
      </section>

      {/* O Problema */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            {...fadeInUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">O Problema</h2>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A CSAPET enfrentava desafios significativos em sua presença digital que impactavam diretamente sua credibilidade e capacidade de conquistar novos clientes:
              </p>
              
              <ul className="space-y-4">
                {[
                  "Necessidade urgente de um site institucional profissional",
                  "Falta de uma presença digital clara e organizada",
                  "Dificuldade em transmitir credibilidade e confiança no mercado",
                  "Apresentação de produtos e informações de forma confusa e pouco objetiva"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* A Solução */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            {...fadeInUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">A Solução</h2>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desenvolvi uma solução completa focada em transformar a presença digital da CSAPET:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Design Moderno", desc: "Site institucional com visual clean e profissional" },
                  { title: "Alinhamento de Marca", desc: "Design alinhado ao posicionamento da empresa" },
                  { title: "Arquitetura Clara", desc: "Estrutura de informação intuitiva e organizada" },
                  { title: "Foco em UX", desc: "Experiência do usuário como prioridade" },
                  { title: "100% Responsivo", desc: "Perfeito em desktop, tablet e mobile" },
                  { title: "Performance", desc: "Carregamento rápido e otimizado" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* O que foi Implementado */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            {...fadeInUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">O que foi Implementado</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {implementations.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Habilidades Utilizadas */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            {...fadeInUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Habilidades Utilizadas</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <skill.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resultado Final */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            {...fadeInUp}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Resultado Final</h2>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { title: "Site Profissional", desc: "Presença digital confiável e moderna" },
                  { title: "Melhor Posicionamento", desc: "Maior visibilidade no mercado" },
                  { title: "Comunicação Clara", desc: "Conexão efetiva com clientes e parceiros" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <h4 className="text-xl font-serif font-bold text-primary">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Veja o site no ar
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Confira o resultado final do projeto e veja como a CSAPET agora se apresenta profissionalmente no mundo digital.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="text-lg px-12 py-6 group">
                <a href="https://csapet.com.br/" target="_blank" rel="noopener noreferrer">
                  Acessar csapet.com.br
                  <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Button>
            </motion.div>
            
            <div className="pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4">Gostou deste projeto?</p>
              <Button asChild variant="outline" size="lg" className="border-primary hover:bg-primary hover:text-primary-foreground">
                <a href="https://wa.me/5511998409981?text=Olá!%20Vim%20pelo%20site%20e%20quero%20iniciar%20meu%20projeto" target="_blank" rel="noopener noreferrer" onClick={() => trackWa('case_csapet_orcamento')}>
                  Solicitar Orçamento
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseCSAPET;
