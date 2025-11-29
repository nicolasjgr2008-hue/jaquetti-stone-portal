import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import marbleBg from "@/assets/marble-bg.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Marble Background with Mouse Parallax */}
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
      {/* Golden Marble Veins Overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-30 transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle at 20% 30%, hsl(43, 96%, 56%) 0%, transparent 25%), radial-gradient(circle at 80% 70%, hsl(43, 96%, 56%) 0%, transparent 25%), radial-gradient(circle at 50% 50%, hsl(43, 80%, 50%) 0%, transparent 30%)',
          backgroundSize: '200% 200%',
          animation: 'marbleMove 40s ease-in-out infinite reverse',
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 to-black/80" />
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_2s]"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div 
          className="max-w-4xl mx-auto text-center space-y-8"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-[fadeInUp_0.6s_ease-out]">
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Sua presença digital começa aqui</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            Sites profissionais para{" "}
            <span className="text-primary relative inline-block">
              alcançar mais clientes
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            Transformamos sua presença online com sites modernos, otimizados e responsivos, 
            design exclusivo, SEO e estratégias digitais eficientes para crescer.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-[fadeInUp_1.2s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <Button 
              asChild 
              size="lg" 
              className="text-base px-8 py-6 group relative overflow-hidden"
            >
              <a href="mailto:jaquettiweb@gmail.com" className="relative z-10">
                COMECE SEU PROJETO AGORA
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground relative overflow-hidden group"
            >
              <a href="#solucoes" className="relative z-10">
                CONHECER SOLUÇÕES
                <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></span>
              </a>
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
