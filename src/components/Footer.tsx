import { Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-foreground">
              Jaquetti
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformamos sua presença online com sites modernos, otimizados e responsivos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <nav className="flex flex-col gap-2">
              <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Sobre
              </a>
              <a href="#cases" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Cases
              </a>
              <a href="#solucoes" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Soluções
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <a 
              href="mailto:jaquettiweb@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform" />
              jaquettiweb@gmail.com
            </a>
          </div>

          {/* Back to Top */}
          <div className="flex items-start justify-end">
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 group"
            >
              <ArrowUp size={20} className="text-primary group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Jaquetti Web Agency. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
