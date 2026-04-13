import {
  emergencyActions,
  helpGuides,
} from "../domain/content/dashboardContent";
import { EmergencyActionCard } from "./common/EmergencyActionCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const helpGuidesDetails: Record<string, { summary: string; actions: string[] }> = {
  "O que fazer ao sentir que está sendo seguida?": {
    summary: "Mantenha-se em movimento e priorize locais públicos e iluminados até se sentir em segurança.",
    actions: [
      "Entre em um comércio movimentado ou ponto de apoio próximo.",
      "Acione um contato de confiança e compartilhe sua localização em tempo real.",
      "Se o risco aumentar, ligue 190 e descreva sua localização atual.",
    ],
  },
  "Compartilhamento de Rota": {
    summary: "Ative o compartilhamento preventivo antes de iniciar trajetos, especialmente à noite ou em locais desconhecidos.",
    actions: [
      "Selecione os contatos que receberão sua rota e tempo estimado de chegada.",
      "Defina alertas automáticos caso você saia do trajeto planejado.",
      "Ao chegar em segurança, finalize o monitoramento para encerrar os alertas.",
    ],
  },
  "Dispositivos de Defesa": {
    summary: "Use apenas dispositivos permitidos por lei e mantenha o uso orientado para autoproteção.",
    actions: [
      "Mantenha o item acessível e pratique o acionamento com antecedência.",
      "Em caso de ameaça, foque em ganhar tempo para sair do local com segurança.",
      "Após o incidente, busque apoio e registre ocorrência quando necessário.",
    ],
  },
};

export function HelpCenterPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32">
      <header className="mb-10">
        <h1 className="mb-3 text-4xl font-black">Central de Ajuda</h1>
        <p className="max-w-2xl text-slate-600">
          Você não está sozinha. Acesse recursos de emergência imediatos ou aprenda a agir em situações de risco.
        </p>
      </header>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        {emergencyActions.map((action) => (
          <EmergencyActionCard key={action.id} action={action} />
        ))}
      </div>

      <h2 className="mb-4 text-2xl font-bold">Guias de Ação</h2>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <Accordion type="single" collapsible className="divide-y divide-slate-100">
          {helpGuides.map((guide) => {
            const guideDetails = helpGuidesDetails[guide];

            return (
              <AccordionItem key={guide} value={guide} className="border-none">
                <AccordionTrigger className="py-5 text-base font-bold text-slate-900 hover:no-underline">
                  {guide}
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-slate-600">
                  <p>{guideDetails?.summary ?? "Abra este guia para visualizar orientações importantes."}</p>
                  {!!guideDetails?.actions?.length && (
                    <ul className="list-disc space-y-2 pl-5">
                      {guideDetails.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
