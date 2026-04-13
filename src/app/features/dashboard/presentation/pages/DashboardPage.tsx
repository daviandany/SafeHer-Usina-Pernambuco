import { useState } from "react";
import { AlertCard } from "../components/AlertCard";
import { RouteCard } from "../components/RouteCard";
import { SafetyTipCard } from "../components/SafetyTipCard";
import { RiskMap } from "../components/RiskMap";
import { useDashboard } from "../hooks/useDashboard";

const riskZones = [
  { id: "1", center: [-8.0084, -34.8557] as [number, number], radius: 220, riskLabel: "Risco elevado à noite" },
  { id: "2", center: [-8.0142, -34.8469] as [number, number], radius: 180, riskLabel: "Baixa iluminação" },
];

export function DashboardPage() {
  const { alerts, loading, error, totalOpenAlerts, triggerSOS } = useDashboard();
  const [feedback, setFeedback] = useState("");

  const handleSOS = async () => {
    try {
      await triggerSOS();
      setFeedback("SOS enviado para a central com sua localização atual.");
    } catch (err: unknown) {
      setFeedback(err instanceof Error ? err.message : "Não foi possível enviar o SOS.");
    }
  };

  return (
    <section className="min-h-screen bg-[#F9FAFB] p-4 md:p-6 pb-28">
      <header className="mb-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#6B21A8]">Central SafeHer - Olinda</h1>
        <p className="text-sm text-slate-600">Alertas abertos: {totalOpenAlerts}</p>
        {feedback ? <p className="text-sm text-[#6B21A8]">{feedback}</p> : null}
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Áreas de risco (Geofencing)</h2>
          <RiskMap zones={riskZones} />

          <h2 className="text-lg font-semibold text-slate-800">Alertas em tempo real</h2>
          {loading ? <p className="text-sm text-slate-500">Carregando alertas...</p> : null}
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="grid gap-3">
            {alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Trajetos seguros</h2>
          <RouteCard name="Casa → Trabalho" safetyLevel="alto" duration="18 min" />
          <RouteCard name="Faculdade → Terminal" safetyLevel="médio" duration="12 min" />

          <h2 className="text-lg font-semibold text-slate-800">Dicas de segurança</h2>
          <SafetyTipCard title="Compartilhe sua rota" description="Ative o compartilhamento com contatos confiáveis ao sair à noite." />
          <SafetyTipCard title="Evite áreas escuras" description="Prefira vias principais e com iluminação pública." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a href="tel:190" className="rounded-xl bg-[#6B21A8] px-4 py-3 text-center font-semibold text-white">Ligar 190 / Patrulha</a>
            <button className="rounded-xl border border-[#6B21A8] bg-white px-4 py-3 font-semibold text-[#6B21A8]">Centro de Ajuda</button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSOS}
        className="fixed bottom-6 right-6 rounded-full bg-[#6B21A8] px-7 py-5 text-lg font-bold text-white shadow-xl"
      >
        SOS
      </button>
    </section>
  );
}
