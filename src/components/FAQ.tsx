import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "@/hooks/useLanguage";

const faqs = [
  {
    question: "Quanto custa um site profissional?",
    answer: "Nossos projetos partem de R$ 1.800 para sites institucionais e R$ 3.500 para e-commerces. Fazemos um orçamento personalizado gratuito — sem compromisso — em até 2 horas. A maioria dos clientes nos conta que o investimento se pagou nas primeiras semanas."
  },
  {
    question: "Qual é o prazo de entrega?",
    answer: "A maioria dos projetos é entregue em 10 a 15 dias úteis após aprovação do briefing. Projetos mais complexos podem levar até 30 dias. Cumprimos prazos — isso é compromisso. Nenhum cliente nosso ficou esperando além do combinado."
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer: "Sim. Todos os nossos sites são entregues com SEO técnico configurado: meta tags, velocidade otimizada e estrutura correta para indexação. SEO de conteúdo contínuo é oferecido como serviço adicional. Clientes que investem em SEO com a gente relatam aparecer na primeira página em menos de 3 meses para palavras-chave locais."
  },
  {
    question: "Preciso ter o conteúdo pronto antes de começar?",
    answer: "Não. Oferecemos suporte para criação de textos, banners e imagens como serviço adicional. Mas quanto mais conteúdo você tiver pronto, mais rápido entregamos. Na prática, conseguimos iniciar o projeto com o mínimo — e construímos juntos."
  },
  {
    question: "Tem contrato? Como funciona o pagamento?",
    answer: "Sempre trabalhamos com contrato digital antes de iniciar. O pagamento é dividido: 50% na aprovação do briefing e 50% na entrega. Aceitamos Pix, cartão e transferência. Isso garante segurança para os dois lados — e já atendemos mais de 80 clientes com esse modelo sem nenhuma disputa."
  },
  {
    question: "E após a entrega, como funciona o suporte?",
    answer: "30 dias de suporte gratuito para ajustes após a entrega. Depois, você pode contratar nossa manutenção mensal ou levar o projeto para onde quiser — sem fidelidade obrigatória. Mas a maioria dos clientes escolhe continuar com a gente."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    const opening = openIndex !== index;
    setOpenIndex(openIndex === index ? null : index);

    if (opening) {
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'faq_open', {
            question_index: index,
            question: faqs[index].question.substring(0, 50)
          });
        }
        if ((window as any).fbq) {
          (window as any).fbq('trackCustom', 'FAQOpen', {
            question: faqs[index].question.substring(0, 50)
          });
        }
      }
    }
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
                className={`border rounded-2xl overflow-hidden transition-all duration-500 reveal ${isOpen ? 'border-border/50 bg-card/20' : 'border-border/15 bg-card/5 hover:border-border/40 hover:bg-card/10'}`}
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
                        <a
                          href="https://wa.me/5511998409981?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20uma%20d%C3%BAvida"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              if ((window as any).gtag) (window as any).gtag('event', 'generate_lead', { event_category: 'whatsapp', event_label: 'faq_microcta' });
                              if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'faq_microcta' });
                            }
                          }}
                        >
                          Ainda tem dúvidas? Fale com a gente agora →
                        </a>
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
