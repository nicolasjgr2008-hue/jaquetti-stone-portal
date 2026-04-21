import { MessageCircle, ArrowUp, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const trackWa = (ctaName: string) => {
  if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Lead', { content_name: ctaName });
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: ctaName });
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 py-16 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
        backgroundSize: '20px 20px',
      }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground reveal">Jaquetti</h3>
            <p className="text-muted-foreground text-sm leading-relaxed reveal">{t.footer.description}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground reveal">{t.footer.navigation}</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: t.footer.home, href: "#" },
                { label: t.footer.solutions, href: "#solucoes" },
                { label: t.footer.cases, href: "#cases" },
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground reveal">{t.footer.contact}</h4>
            <div className="flex flex-col gap-2">
              <a 
                href={`https://wa.me/5511998409981?text=${encodeURIComponent(t.whatsapp.message)}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackWa('services_footer')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <MessageCircle size={14} />
                +55 11 99840-9981
              </a>
              <a 
                href="https://instagram.com/jaquettiagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Instagram size={14} />
                @jaquettiagency
              </a>
            </div>
          </motion.div>

          {/* Back to Top */}
          <motion.div 
            className="flex items-start justify-end"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center hover:border-foreground/30 transition-colors duration-300"
              title={t.footer.scrollTop}
            >
              <ArrowUp size={16} className="text-muted-foreground" />
            </button>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/60 reveal">
            &copy; {currentYear} Jaquetti Web Agency. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
