import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { ScrambleText } from "./ScrambleText";

const faqs = [
  {
    question: "Quanto custa um site profissional?",
    answer: "Nossos projetos partem de R$ 1.800 para sites institucionais e R$ 3.500 para e-commerces. Fazemos um orçamento personalizado gratuito — sem compromisso — em até 2 horas."
  },
  {
    question: "Qual é o prazo de entrega?",
    answer: "A maioria dos projetos é entregue em 10 a 15 dias úteis após aprovação do briefing. Projetos mais complexos podem levar até 30 dias. Cumprimos prazos — isso é compromisso."
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer: "Sim. Todos os nossos sites são entregues com SEO técnico configurado: meta tags, velocidade otimizada e estrutura correta para indexação. SEO de conteúdo contínuo é oferecido como serviço adicional."
  },
  {
    question: "Preciso ter o conteúdo pronto antes de começar?",
    answer: "Não. Oferecemos suporte para criação de textos, banners e imagens como serviço adicional. Mas quanto mais conteúdo você tiver pronto, mais rápido entregamos."
  },
  {
    question: "Tem contrato? Como funciona o pagamento?",
    answer: "Sempre trabalhamos com contrato digital antes de iniciar. O pagamento é dividido: 50% na aprovação do briefing e 50% na entrega. Aceitamos Pix, cartão e transferência."
  },
  {
    question: "E após a entrega, como funciona o suporte?",
    answer: "30 dias de suporte gratuito para ajustes após a entrega. Depois, você pode contratar nossa manutenção mensal ou levar o projeto para onde quiser — sem fidelidade obrigatória."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <AnimatedSection className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground reveal">
            <ScrambleText text={t.faq.title} />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto reveal">
            Tudo o que você precisa saber antes de começar o seu projeto.
          </p>
        </AnimatedSection>

        <div className="space-y-4 grid">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimatedSection
                key={index}
                delay={index * 0.1}
                className={`border border-border/30 rounded-2xl bg-card/20 overflow-hidden transition-colors duration-300 reveal ${isOpen ? 'border-primary/50 bg-card/40' : 'hover:border-border/60 hover:bg-card/30'}`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-serif text-lg font-bold text-foreground/90 pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-primary/50 text-primary bg-primary/10' : 'border-border/50 text-muted-foreground'}`}>
                    {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        <div className="w-full h-px bg-border/20 mb-6" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
