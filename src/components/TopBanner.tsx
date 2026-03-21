import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("urgency_banner_dismissed");
    if (!isDismissed) {
      // Small delay to allow main render
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("urgency_banner_dismissed", "true");
  };

  const scrollToContact = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#92400E] text-white overflow-hidden relative z-[6000] w-full flex items-center shadow-md shadow-black/20"
        >
          <div className="container mx-auto h-full flex items-center justify-center px-4 relative">
            <button 
              onClick={scrollToContact}
              className="flex items-center gap-2 text-[13px] font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              <Zap className="w-4 h-4 text-yellow-300" strokeWidth={2.5} />
              Apenas 3 vagas disponíveis este mês — Garanta a sua
            </button>
            
            <button 
              onClick={dismiss}
              className="absolute right-4 p-1 hover:bg-black/20 rounded-full transition-colors flex items-center justify-center"
              aria-label="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBanner;
