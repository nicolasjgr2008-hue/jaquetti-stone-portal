import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cases = [
  {
    id: "advocacia",
    title: "Escritório de advocacia especializado, oferecendo soluções jurídicas confiáveis e estratégicas.",
    url: "https://nicolasjgr.me/advocate",
    category: "Advocacia",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo-1.png",
    description: "Advocacia especializado, oferecendo soluções jurídicas confiáveis e estratégicas para pessoas e empresas."
  },
  {
    id: "croche",
    title: "Aprenda técnicas de crochê e transforme suas peças em renda lucrativa.",
    url: "https://nicolasjgr.me/?page_id=2919&preview_id=2919&preview_nonce=c028507e63&preview=true",
    category: "Educação",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-1.png",
    description: "Aprenda técnicas de crochê e transforme suas peças em renda lucrativa."
  },
  {
    id: "marketing",
    title: "Agência de marketing inovadora, transformando ideias em resultados extraordinários e crescimento real para empresas.",
    url: "https://nicolasjgr.me/agency-marketing/",
    category: "Marketing",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/logotipo.png",
    description: "Agência de marketing inovadora, transformando ideias em resultados extraordinários e crescimento real para empresas."
  },
  {
    id: "eletricos",
    title: "Fornecedora de equipamentos elétricos, especializada em qualidade e soluções confiáveis.",
    url: "https://nicolasjgr.me/?elementor_library=pagina-de-case",
    category: "Indústria",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/image-removebg-preview.png",
    description: "Fornecedora de equipamentos elétricos, especializada em qualidade e soluções confiáveis."
  },
  {
    id: "condominial",
    title: "Gestão condominial eficiente, comunicação transparente e serviços confiáveis para moradores.",
    url: "https://nicolasjgr.me/hermes/",
    category: "Gestão",
    image: "https://nicolasjgr.me/wp-content/uploads/2025/09/favicon-removebg-preview.png",
    description: "Gestão condominial eficiente, comunicação transparente e serviços confiáveis para moradores."
  },
];

export { cases };

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const headerRef = useScrollReveal();
  const carouselRef = useScrollReveal();
  const ctaRef = useScrollReveal();
  const testimonialRef = useScrollReveal();

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(cases.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentCases = cases.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  return (
    <section id="cases" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className="grid md:grid-cols-2 gap-12 mb-20 scroll-reveal items-center"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Empresas que{" "}
              <span className="block text-primary">Crescem</span>
              <span className="block">Conosco</span>
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada cliente recebe um atendimento personalizado, com soluções sob medida,
              suporte contínuo e acompanhamento dedicado para garantir resultados reais
              e satisfação total.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div 
          ref={carouselRef}
          className="scroll-reveal-scale relative mb-16"
        >
          <div className="flex items-center gap-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors group flex-shrink-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            {/* Cases Grid */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentCases.map((caseItem, index) => (
                  <a
                    key={caseItem.id}
                    href={caseItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Logo Container */}
                    <div className="w-32 h-32 flex items-center justify-center bg-card rounded-2xl border border-border group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <img
                        src={caseItem.image}
                        alt={caseItem.category}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    {/* Description */}
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      {caseItem.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors group flex-shrink-0"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div 
          ref={ctaRef}
          className="scroll-reveal text-center mb-20"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base px-12 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-wider"
          >
            <a href="mailto:jaquettiweb@gmail.com">
              Transforme seu negócio hoje mesmo
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

        {/* Testimonial Section */}
        <div 
          ref={testimonialRef}
          className="scroll-reveal-scale text-center max-w-4xl mx-auto"
        >
          <blockquote className="space-y-6">
            <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed">
              "O site deixou nossa clínica muito mais próxima dos clientes. Agora eles nos encontram facilmente e confiam ainda mais no nosso trabalho."
            </p>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Alexandre Da Silva</p>
              <p className="text-sm text-primary">Veterinário Responsável - SOSVet</p>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
