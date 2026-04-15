import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SESSION_KEY = "exit_shown";
const MIN_DELAY_MS = 8000;
const MOBILE_INACTIVITY_MS = 45000;

const trackWa = (event: string, params: Record<string, string>) => {
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("track", event, params);
  }
};

const trackGtag = (eventName: string, params: Record<string, string>) => {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
};

const ExitIntent = () => {
  const [visible, setVisible] = useState(false);
  const readyRef = useRef(false);         // true after MIN_DELAY_MS
  const shownRef = useRef(false);         // guard against double-fire
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (shownRef.current) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    shownRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
    trackWa("ViewContent", { content_name: "exit_intent_popup" });
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  // ── reset inactivity timer (mobile) ──────────────────────────
  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!readyRef.current || shownRef.current) return;
    inactivityTimer.current = setTimeout(show, MOBILE_INACTIVITY_MS);
  }, [show]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return; // already seen — skip everything

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Minimum page-time gate
    const minDelayTimer = setTimeout(() => {
      readyRef.current = true;

      if (isMobile) {
        // Start inactivity timer after the gate
        inactivityTimer.current = setTimeout(show, MOBILE_INACTIVITY_MS);
        window.addEventListener("scroll", resetInactivity, { passive: true });
        window.addEventListener("touchstart", resetInactivity, { passive: true });
      } else {
        // Desktop: listen for mouse leaving through the top edge
        const handleMouseOut = (e: MouseEvent) => {
          if (e.clientY < 10 && e.relatedTarget === null) {
            show();
          }
        };
        document.addEventListener("mouseout", handleMouseOut);
        return () => document.removeEventListener("mouseout", handleMouseOut);
      }
    }, MIN_DELAY_MS);

    return () => {
      clearTimeout(minDelayTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      window.removeEventListener("scroll", resetInactivity);
      window.removeEventListener("touchstart", resetInactivity);
    };
  }, [show, resetInactivity]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: 5999 }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          aria-modal="true"
          role="dialog"
          aria-label="Oferta de orçamento gratuito"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-card border border-border/40 rounded-2xl p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="space-y-4 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Espera — seu concorrente já tem site.
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada dia sem um site profissional é um dia que seus clientes vão pra concorrência. Receba um orçamento grátis em 2 horas.
              </p>

              <a
                href="https://wa.me/5511998409981?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20para%20parar%20de%20perder%20clientes"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWa("Lead", { content_name: "exit_intent_cta" });
                  trackGtag("generate_lead", { event_label: "exit_intent" });
                }}
                className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200"
              >
                Quero parar de perder clientes →
              </a>

              <p className="text-xs text-muted-foreground/60">
                Sem spam. Orçamento gratuito em 2 horas.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
