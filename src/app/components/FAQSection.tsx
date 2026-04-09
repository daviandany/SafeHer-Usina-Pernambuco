import { HelpCircle, ShieldAlert, MapPinned, LockKeyhole, BellRing, PhoneCall } from "lucide-react";

const faqs = [
  {
    icon: ShieldAlert,
    question: "Como funcionam os alertas de emergência do SafeHer?",
    answer:
      "Ao acionar o botão de emergência, o sistema envia imediatamente uma notificação para seus contatos de confiança com sua identificação e um aviso de risco para agilizar o apoio.",
  },
  {
    icon: MapPinned,
    question: "Posso compartilhar minha localização em tempo real com pessoas específicas?",
    answer:
      "Sim. Você escolhe quem recebe sua localização e por quanto tempo o compartilhamento fica ativo, mantendo o controle total sobre suas informações.",
  },
  {
    icon: BellRing,
    question: "O que são as notificações inteligentes de prevenção?",
    answer:
      "São alertas preventivos baseados no seu contexto, como horário e região, para ajudar você a antecipar riscos e tomar decisões mais seguras no dia a dia.",
  },
  {
    icon: PhoneCall,
    question: "Existe suporte em situações de urgência?",
    answer:
      "Sim. O SafeHer oferece canal de suporte 24/7 para orientação em momentos críticos, além de recursos para acionar rapidamente sua rede de apoio.",
  },
  {
    icon: LockKeyhole,
    question: "Como o SafeHer protege meus dados pessoais?",
    answer:
      "Os dados são protegidos com criptografia e políticas de privacidade alinhadas à LGPD, com acesso restrito e foco em sigilo e segurança das usuárias.",
  },
];

export function FAQSection() {
  return (
    <section id="ajuda" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ SafeHer
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes sobre Proteção e Prevenção
          </h2>
          <p className="text-lg text-gray-600">
            Tire dúvidas sobre como o SafeHer ajuda mulheres a se proteger, prevenir riscos e agir com rapidez em situações de emergência.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={index}
                className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="flex items-start gap-3 text-lg font-semibold text-gray-900 mb-2">
                  <span className="bg-purple-100 text-purple-600 rounded-lg p-2 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </span>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-12">{item.answer}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
