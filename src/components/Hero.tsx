import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import marbleBg from "@/assets/marble-bg.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${marbleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-[fadeInUp_0.8s_ease-out]">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            Sites profissionais para{" "}
            <span className="text-primary">alcançar mais clientes</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformamos sua presença online com sites modernos, otimizados e responsivos, 
            design exclusivo, SEO e estratégias digitais eficientes para crescer.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              asChild 
              size="lg" 
              className="text-base px-8 py-6 group"
            >
              <a href="mailto:jaquettiweb@gmail.com">
                COMECE SEU PROJETO AGORA
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a href="#solucoes">CONHECER SOLUÇÕES</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
