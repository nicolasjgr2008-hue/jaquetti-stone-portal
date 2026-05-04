import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "@/hooks/useLanguage";

const WA_PT = "https://wa.me/5511998409981?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20uma%20d%C3%BAvida";
const WA_EN = "https://wa.me/5511998409981?text=Hi!%20I%20came%20from%20the%20website%20and%20have%20a%20question";
const WA_ES = "https://wa.me/5511998409981?text=Hola!%20Vine%20desde%20el%20sitio%20y%20tengo%20una%20consulta";

// ── Perguntas de quem vem dos anúncios (quebram as objeções específicas) ──
const faqsAdsPT = [
  {
    question: "Meu site vai realmente parecer mais profissional que o do concorrente?",
    answer: "Sim — e essa é exatamente a diferença que nossos clientes mais relatam. Não é sobre ser 'bonito': é sobre comunicar autoridade antes do visitante ler uma linha. Hermes Dos Anjos, gestor do Condomínio Hermes, relatou redução de 40% nas ligações de suporte em 30 dias porque o site transmitia credibilidade suficiente para responder dúvidas antes da pessoa entrar em contato. Design que posiciona é design que fecha negócio.",
  },
  {
    question: "Uma landing page realmente consegue fechar cliente sem eu estar presente?",
    answer: "É exatamente para isso que ela é construída. Cada elemento — título, hierarquia visual, prova social, FAQ, CTA — está posicionado para conduzir o visitante da dúvida à decisão sem precisar de você. Marina Costa, diretora do Studio MC Design, recebeu 3 novos clientes na primeira semana após o lançamento, sem nenhuma interação manual. A página trabalha enquanto você entrega para quem já comprou.",
  },
  {
    question: "E-commerce é complicado de gerenciar no dia a dia?",
    answer: "Não na estrutura que entregamos. Você gerencia produtos, estoque e pedidos por um painel simples, sem precisar de programador para nenhuma atualização do dia a dia. Integramos com os principais meios de pagamento do Brasil (Pix, cartão, boleto) e configuramos o frete automaticamente. Carolina Silva, CEO da Use Carolina Brand, aumentou as vendas online em 120% no primeiro trimestre sem precisar de equipe técnica.",
  },
  {
    question: "Como um portfólio pode fechar contrato antes de eu falar com o cliente?",
    answer: "O cliente decide se o seu trabalho vale atenção em milissegundos — antes de ver qualquer projeto. Um portfólio com hierarquia visual correta, velocidade de carregamento profissional e apresentação de casos com resultado (não só imagem bonita) muda esse julgamento antes de qualquer conversa. Isabela Muniz, arquiteta, passou a atrair clientes de ticket maior depois que seu portfólio começou a carregar projetos 4K sem perder performance.",
  },
];

// ── Ad-objection FAQs (EN) ──
const faqsAdsEN = [
  {
    question: "Will my site really look more professional than my competitor's?",
    answer: "Yes — and that's exactly the difference our clients report most. It's not about being 'pretty': it's about communicating authority before the visitor reads a single line. Hermes Dos Anjos, manager at Condomínio Hermes, reported a 40% reduction in support calls within 30 days because the site conveyed enough credibility to answer questions before people even reached out.",
  },
  {
    question: "Can a landing page really close clients without me being present?",
    answer: "That's exactly what it's built for. Every element — headline, visual hierarchy, social proof, FAQ, CTA — is positioned to guide the visitor from doubt to decision without needing you. Marina Costa, director at Studio MC Design, received 3 new clients in the first week after launch, with zero manual interaction.",
  },
  {
    question: "Is an e-commerce hard to manage day to day?",
    answer: "Not with the structure we deliver. You manage products, inventory, and orders through a simple dashboard — no developer needed for day-to-day updates. We integrate with major payment methods and set up shipping automatically. Carolina Silva, CEO at Use Carolina Brand, increased online sales by 120% in the first quarter without a tech team.",
  },
  {
    question: "How can a portfolio close a deal before I even speak to the client?",
    answer: "The client decides if your work deserves attention in milliseconds — before seeing any project. A portfolio with correct visual hierarchy, professional loading speed, and result-driven case presentations changes that judgment before any conversation happens. Isabela Muniz, architect, started attracting higher-ticket clients after her portfolio began loading 4K projects without losing performance.",
  },
];

// ── Perguntas gerais PT ──
const faqsPT = [
  {
    question: "Quanto custa um site que traz clientes?",
    answer: "Projetos a partir de R$ 797 para landing pages e R$ 2.997 para sites institucionais. Enviamos orçamento personalizado grátis em até 2 horas — sem compromisso. A maioria dos clientes nos conta que o investimento se pagou nas primeiras semanas com os novos clientes que o site trouxe.",
  },
  {
    question: "Em quanto tempo meu site fica pronto?",
    answer: "A maioria dos projetos fica pronta em 10 a 15 dias úteis. Projetos mais complexos podem levar até 30 dias. Cumprimos prazo — isso é inegociável. Nenhum cliente nosso ficou esperando além do combinado.",
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer: "Sim. Todos os sites saem com SEO técnico configurado: meta tags, velocidade otimizada e estrutura correta. Clientes que investem em SEO contínuo conosco aparecem na primeira página em menos de 3 meses para buscas da sua região. Sites entregues pela Jaquetti aparecem no Google em média dentro de 30 a 60 dias após o lançamento.",
  },
  {
    question: "Preciso ter tudo pronto antes de começar?",
    answer: "Não. A maioria dos nossos clientes começa sem nada — e a gente constrói junto. Textos, fotos, estrutura... cuidamos de tudo. Quanto mais você tiver pronto, mais rápido entregamos. Mas não deixe isso te atrasar.",
  },
  {
    question: "E se eu não gostar do resultado?",
    answer: "30 dias de garantia em todos os projetos. Se não ficar satisfeito, ajustamos até ficar. E trabalhamos sempre com contrato digital: 50% na aprovação e 50% na entrega. Já atendemos mais de 150 clientes com esse modelo — zero disputas.",
  },
  {
    question: "E depois que o site fica pronto?",
    answer: "30 dias de suporte grátis para ajustes. Depois, você escolhe: contrata nosso plano mensal (a partir de R$ 149/mês) ou leva o projeto para onde quiser. Sem fidelidade obrigatória. Mas 9 em cada 10 clientes ficam — porque funciona.",
  },
];

const faqsEN = [
  {
    question: "How much does a website that brings clients cost?",
    answer: "Projects start at $497 for landing pages and $1,497 for business websites. We send a free custom quote within 2 hours — no commitment. Most clients tell us the investment paid for itself in the first few weeks with new clients the site brought in.",
  },
  {
    question: "How fast will my site be ready?",
    answer: "Most projects are delivered in 10 to 15 business days. More complex projects can take up to 30 days. We meet deadlines — that's non-negotiable. No client has ever been left waiting beyond what was agreed.",
  },
  {
    question: "Will my site show up on Google?",
    answer: "Yes. All sites ship with technical SEO configured: meta tags, optimized speed, and proper structure. Clients who invest in ongoing SEO with us appear on the first page in less than 3 months for local searches. Your competitor is already there — you should be too.",
  },
  {
    question: "Do I need everything ready before starting?",
    answer: "No. Most of our clients start with nothing — and we build together. Text, photos, structure... we handle everything. The more you have ready, the faster we deliver. But don't let that delay you.",
  },
  {
    question: "What if I don't like the result?",
    answer: "30-day guarantee on all projects. If you're not satisfied, we adjust until you are. We always work with digital contracts: 50% on approval, 50% on delivery. Over 150 clients served with this model — zero disputes.",
  },
  {
    question: "What happens after the site is done?",
    answer: "30 days of free support for adjustments. After that, you choose: hire our monthly plan (starting at $49/mo) or take the project wherever you want. No mandatory loyalty. But 9 out of 10 clients stay — because it works.",
  },
];

const faqsES = [
  {
    question: "¿Cuánto cuesta un sitio que trae clientes?",
    answer: "Proyectos desde R$ 797 para landing pages y R$ 2.997 para sitios institucionales. Enviamos presupuesto personalizado gratis en hasta 2 horas — sin compromiso. La mayoría de clientes nos cuenta que la inversión se pagó en las primeras semanas con los nuevos clientes que trajo el sitio.",
  },
  {
    question: "¿Cuánto tiempo tarda mi sitio en estar listo?",
    answer: "La mayoría de los proyectos están listos en 10 a 15 días hábiles. Proyectos más complejos pueden llevar hasta 30 días. Cumplimos el plazo — eso no es negociable.",
  },
  {
    question: "¿Mi sitio va a aparecer en Google?",
    answer: "Sí. Todos los sitios salen con SEO técnico configurado: meta tags, velocidad optimizada y estructura correcta. Los clientes que invierten en SEO continuo con nosotros aparecen en la primera página en menos de 3 meses para búsquedas de su región.",
  },
  {
    question: "¿Necesito tener todo listo antes de comenzar?",
    answer: "No. La mayoría de nuestros clientes empieza sin nada — y construimos juntos. Textos, fotos, estructura... nos encargamos de todo. Cuanto más tengas listo, más rápido entregamos.",
  },
  {
    question: "¿Y si no me gusta el resultado?",
    answer: "30 días de garantía en todos los proyectos. Si no quedas satisfecho, ajustamos hasta que lo estés. Trabajamos siempre con contrato digital: 50% en la aprobación y 50% en la entrega.",
  },
  {
    question: "¿Qué pasa después de que el sitio esté listo?",
    answer: "30 días de soporte gratuito para ajustes. Después, tú eliges: contrata nuestro plan mensual o lleva el proyecto a donde quieras. Sin fidelidad obligatoria.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, language } = useLanguage();

  // Build the full list: ad-objection questions first, then general FAQs
  const allFaqs = language === 'en'
    ? [...faqsAdsEN, ...faqsEN]
    : language === 'es'
    ? faqsES
    : [...faqsAdsPT, ...faqsPT];

  const toggle = (index: number) => {
    const opening = openIndex !== index;
    setOpenIndex(openIndex === index ? null : index);

    if (opening) {
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'faq_open', {
            question_index: index,
            question: allFaqs[index].question.substring(0, 50),
          });
        }
        if ((window as any).fbq) {
          (window as any).fbq('trackCustom', 'FAQOpen', {
            question: allFaqs[index].question.substring(0, 50),
          });
        }
      }
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <AnimatedSection className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground reveal">
            <ScrambleText text={t.faq.title} />
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto reveal">
            {language === 'en'
              ? 'Everything you need to know before we start bringing you clients.'
              : language === 'es'
              ? 'Todo lo que necesitas saber antes de empezar a recibir más clientes.'
              : 'Tudo o que você precisa saber antes de começar a receber mais clientes.'}
          </p>
        </AnimatedSection>

        <div className="space-y-4 grid">
          {allFaqs.map((faq, index) => {
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
                          href={language === 'en' ? WA_EN : language === 'es' ? WA_ES : WA_PT}
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
                          {language === 'en' ? 'Still have questions? Talk to us now →' : language === 'es' ? '¿Tienes más dudas? Habla con nosotros →' : 'Ainda tem dúvidas? Fale com a gente agora →'}
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
