import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section id="cases" className="py-24 bg-muted relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Empresas que <span className="text-primary">Crescem Conosco</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada cliente recebe um atendimento personalizado, com soluções sob medida, 
            suporte contínuo e acompanhamento dedicado para garantir resultados reais e satisfação total.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <Link
              key={index}
              to={`/case/${caseItem.id}`}
              className="group"
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                <CardContent className="p-8 space-y-4 flex flex-col justify-between h-full">
                  {/* Category Badge */}
                  <div className="inline-block self-start">
                    <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {caseItem.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-serif leading-relaxed flex-grow">
                    {caseItem.title}
                  </h3>
                  
                  {/* View Link */}
                  <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                    <span className="font-medium">Ver caso</span>
                    <ExternalLink size={18} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
