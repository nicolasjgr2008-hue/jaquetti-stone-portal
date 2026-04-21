import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "@/hooks/useLanguage";

const WA_LINK = "https://wa.me/5511998409981?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20uma%20d%C3%BAvida";

const faqs = [
  // ── Perguntas de quem vem dos anúncios (quebram as objeções específicas) ──
  {
    question: "Meu site vai realmente parecer mais profissional que o do concorrente?",
    answer: "Sim — e essa é exatamente a diferença que nossos clientes mais relatam. Não é sobre ser 'bonito': é sobre comunicar autoridade antes do visitante ler uma linha. Hermes Dos Anjos, gestor do Condomínio Hermes, relatou redução de 40% nas ligações de suporte em 30 dias porque o site transmitia credibilidade suficiente para responder dúvidas antes da pessoa entrar em contato. Design que posiciona é design que fecha negócio.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Uma landing page realmente consegue fechar cliente sem eu estar presente?",
    answer: "É exatamente para isso que ela é construída. Cada elemento — título, hierarquia visual, prova social, FAQ, CTA — está posicionado para conduzir o visitante da dúvida à decisão sem precisar de você. Marina Costa, diretora do Studio MC Design, recebeu 3 novos clientes na primeira semana após o lançamento, sem nenhuma interação manual. A página trabalha enquanto você entrega para quem já comprou.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "E-commerce é complicado de gerenciar no dia a dia?",
    answer: "Não na estrutura que entregamos. Você gerencia produtos, estoque e pedidos por um painel simples, sem precisar de programador para nenhuma atualização do dia a dia. Integramos com os principais meios de pagamento do Brasil (Pix, cartão, boleto) e configuramos o frete automaticamente. Carolina Silva, CEO da Use Carolina Brand, aumentou as vendas online em 120% no primeiro trimestre sem precisar de equipe técnica.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Como um portfólio pode fechar contrato antes de eu falar com o cliente?",
    answer: "O cliente decide se o seu trabalho vale atenção em milissegundos — antes de ver qualquer projeto. Um portfólio com hierarquia visual correta, velocidade de carregamento profissional e apresentação de casos com resultado (não só imagem bonita) muda esse julgamento antes de qualquer conversa. Isabela Muniz, arquiteta, passou a atrair clientes de ticket maior depois que seu portfólio começou a carregar projetos 4K sem perder performance.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  // ── Perguntas gerais (já existentes, com prova social adicionada) ──
  {
    question: "Quanto custa um site profissional?",
    answer: "Nossos projetos partem de R$ 1.800 para sites institucionais e R$ 3.500 para e-commerces. Fazemos um orçamento personalizado gratuito — sem compromisso — em até 2 horas. A maioria dos clientes nos conta que o retorno veio já nas primeiras semanas após o lançamento.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Qual é o prazo de entrega?",
    answer: "A maioria dos projetos é entregue em 10 a 15 dias úteis após aprovação do briefing. Projetos mais complexos podem levar até 30 dias. Cumprimos prazos — isso é compromisso. Nenhum cliente nosso ficou esperando além do combinado.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer: "Sim. Todos os nossos sites são entregues com SEO técnico configurado: meta tags, velocidade otimizada e estrutura correta para indexação. SEO de conteúdo contínuo é oferecido como serviço adicional. Sites entregues pela Jaquetti aparecem no Google em média dentro de 30 a 60 dias após o lançamento.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Preciso ter o conteúdo pronto antes de começar?",
    answer: "Não. Oferecemos suporte para criação de textos, banners e imagens como serviço adicional. Mas quanto mais conteúdo você tiver pronto, mais rápido entregamos.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "Tem contrato? Como funciona o pagamento?",
    answer: "Sempre trabalhamos com contrato digital antes de iniciar. O pagamento é dividido: 50% na aprovação do briefing e 50% na entrega. Aceitamos Pix, cartão e transferência.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
  {
    question: "E após a entrega, como funciona o suporte?",
    answer: "30 dias de suporte gratuito para ajustes após a entrega. Depois, você pode contratar nossa manutenção mensal ou levar o projeto para onde quiser — sem fidelidade obrigatória.",
    cta: "Ainda tem dúvidas? Fale com a gente agora →",
  },
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
                        {faq.cta && (
                          <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 block text-primary hover:underline text-sm font-medium"
                          >
                            {faq.cta}
                          </a>
                        )}
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
