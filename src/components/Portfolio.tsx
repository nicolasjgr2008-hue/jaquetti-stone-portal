import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cases = [
  {
    id: "advocacia",
    title: "Escritório de advocacia especializado, oferecendo soluções jurídicas confiáveis e estratégicas.",
    url: "https://nicolasjgr.me/advocate",
    category: "Advocacia",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo-1.png"
  },
  {
    id: "croche",
    title: "Aprenda técnicas de crochê e transforme suas peças em renda lucrativa.",
    url: "https://nicolasjgr.me/?page_id=2919&preview_id=2919&preview_nonce=c028507e63&preview=true",
    category: "Educação",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-1.png"
  },
  {
    id: "marketing",
    title: "Agência de marketing inovadora, transformando ideias em resultados extraordinários e crescimento real para empresas.",
    url: "https://nicolasjgr.me/agency-marketing/",
    category: "Marketing",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo.png"
  },
  {
    id: "eletricos",
    title: "Fornecedora de equipamentos elétricos, especializada em qualidade e soluções confiáveis.",
    url: "https://nicolasjgr.me/?elementor_library=pagina-de-case",
    category: "Indústria",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/image-removebg-preview.png"
  },
  {
    id: "condominial",
    title: "Gestão condominial eficiente, comunicação transparente e serviços confiáveis para moradores.",
    url: "https://nicolasjgr.me/hermes/",
    category: "Gestão",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-removebg-preview.png"
  },
];

export { cases };

const Portfolio = () => {
  const headerRef = useScrollReveal();

  return (
    <section id="cases" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Cases de Sucesso</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Nosso <span className="text-primary relative inline-block">
              Portfólio
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50"></span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projetos que geraram resultados reais para nossos clientes
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => {
            const CaseCard = () => {
              const cardRef = useScrollReveal();
              return (
                <div
                  ref={cardRef}
                  className="scroll-reveal-scale"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    to={`/case/${caseItem.id}`}
                    className="group block h-full"
                  >
                    <Card className="h-full bg-background border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden group-hover:bg-card/50">
                      <CardContent className="p-8 space-y-4 flex flex-col justify-between h-full relative">
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Category Badge */}
                        <div className="inline-block self-start">
                          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium group-hover:bg-primary/20 transition-colors">
                            {caseItem.category}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-serif leading-relaxed flex-grow group-hover:text-primary transition-colors">
                          {caseItem.title}
                        </h3>
                        
                        {/* View Link */}
                        <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                          <span className="font-medium">Ver caso</span>
                          <ExternalLink size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            };
            return <CaseCard key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
