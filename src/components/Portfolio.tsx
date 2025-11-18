import { ExternalLink } from "lucide-react";

const cases = [
  {
    title: "Escritório de advocacia especializado, oferecendo soluções jurídicas confiáveis e estratégicas.",
    url: "https://nicolasjgr.me/advocate",
    category: "Advocacia",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo-1.png"
  },
  {
    title: "Aprenda técnicas de crochê e transforme suas peças em renda lucrativa.",
    url: "https://nicolasjgr.me/?page_id=2919&preview_id=2919&preview_nonce=c028507e63&preview=true",
    category: "Educação",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-1.png"
  },
  {
    title: "Agência de marketing inovadora, transformando ideias em resultados extraordinários e crescimento real para empresas.",
    url: "https://nicolasjgr.me/agency-marketing/",
    category: "Marketing",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo.png"
  },
  {
    title: "Fornecedora de equipamentos elétricos, especializada em qualidade e soluções confiáveis.",
    url: "https://nicolasjgr.me/?elementor_library=pagina-de-case",
    category: "Indústria",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/image-removebg-preview.png"
  },
  {
    title: "Gestão condominial eficiente, comunicação transparente e serviços confiáveis para moradores.",
    url: "https://nicolasjgr.me/hermes/",
    category: "Gestão",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-removebg-preview.png"
  },
];

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

        {/* Cases Grid - New Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => (
            <a
              key={index}
              href={caseItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="p-8 flex flex-col md:flex-row gap-6 items-start">
                {/* Logo/Image Container */}
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl bg-secondary/50 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.category}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wide">
                    {caseItem.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-medium leading-relaxed text-foreground group-hover:text-primary transition-colors">
                    {caseItem.title}
                  </h3>
                  
                  {/* View Link */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary group-hover:gap-3 transition-all">
                    <span className="font-medium">Ver projeto completo</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
