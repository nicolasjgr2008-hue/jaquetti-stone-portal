import { useParams, Link } from "react-router-dom";
import { cases } from "@/components/Portfolio";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import marbleBg from "@/assets/marble-bg.jpg";

const Case = () => {
  const { id } = useParams();
  const caseData = cases.find((c) => c.id === id);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
      >
        {/* Animated Marble Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${marbleBg})`,
            backgroundSize: '120%',
            backgroundPosition: 'center',
            animation: 'marbleMove 60s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/85 to-black/90" />
        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <Link to="/#cases">
            <Button variant="outline" className="mb-8 group border-primary/30 hover:border-primary">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
              Voltar para Cases
            </Button>
          </Link>

          <div className="max-w-4xl space-y-8 animate-fade-in">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium uppercase tracking-wide">
              {caseData.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              {caseData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* Logo/Image Display */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500" />
                <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 shadow-2xl">
                  <img 
                    src={caseData.image} 
                    alt={caseData.category}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                  Categoria
                </h3>
                <p className="text-2xl font-serif font-semibold">
                  {caseData.category}
                </p>
              </div>
              
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                  Serviços
                </h3>
                <p className="text-lg">
                  Design, Desenvolvimento, SEO
                </p>
              </div>
              
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                  Status
                </h3>
                <p className="text-lg">
                  ✓ Projeto Concluído
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-6">Sobre o Projeto</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseData.title} Este projeto foi desenvolvido com foco em design moderno, 
                otimização para mecanismos de busca e experiência do usuário excepcional. 
                Utilizamos as melhores práticas de desenvolvimento web para criar uma solução 
                personalizada que atende às necessidades específicas do cliente.
              </p>
            </div>

            {/* Deliverables */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
              <h2 className="text-2xl font-serif font-bold">Entregas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-1">Design Responsivo</h4>
                    <p className="text-sm text-muted-foreground">Interface adaptável para todos os dispositivos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-1">Otimização SEO</h4>
                    <p className="text-sm text-muted-foreground">Configuração completa para motores de busca</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-1">Performance</h4>
                    <p className="text-sm text-muted-foreground">Carregamento rápido e otimizado</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-1">Manutenção</h4>
                    <p className="text-sm text-muted-foreground">Suporte contínuo e atualizações</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6 pt-8">
              <h3 className="text-2xl font-serif font-bold">
                Gostou deste projeto?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <a href={caseData.url} target="_blank" rel="noopener noreferrer">
                    Ver Site Ao Vivo
                    <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary hover:bg-primary hover:text-primary-foreground">
                  <a href="mailto:jaquettiweb@gmail.com">
                    Solicitar Orçamento
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Case;
