import { useEffect, useMemo, useState, type ComponentType } from "react";
import { LifeBuoy, MapPin, Siren, Sparkles } from "lucide-react";

type ModuleId = "emergencia" | "dicas" | "recursos" | "locais";

const navItems: Array<{ id: ModuleId; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: "emergencia", label: "Emergência", icon: Siren },
  { id: "dicas", label: "Dicas", icon: Sparkles },
  { id: "recursos", label: "Recursos", icon: LifeBuoy },
  { id: "locais", label: "Locais Seguros", icon: MapPin },
];

export function InteractivePreviewSection() {
  const [active, setActive] = useState<ModuleId>("emergencia");
  const [autoPlay, setAutoPlay] = useState(true);

  const flow = useMemo<ModuleId[]>(() => ["emergencia", "dicas", "recursos", "locais"], []);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = flow.indexOf(current);
        return flow[(currentIndex + 1) % flow.length];
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [autoPlay, flow]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pré-demonstração do sistema</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simulação de uso com as telas reais do SafeHer: Emergência, Dicas, Recursos e Locais Seguros.
          </p>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-white p-4 sm:p-6 shadow-[0_20px_60px_rgba(88,28,135,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setAutoPlay(false)}
                    onFocus={() => setAutoPlay(false)}
                    onClick={() => setActive(item.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition flex items-center gap-2 ${
                      isActive ? "bg-purple-700 text-white" : "text-slate-600 hover:bg-purple-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setAutoPlay((value) => !value)}
              className="text-sm font-semibold text-purple-700"
            >
              {autoPlay ? "Pausar" : "Reproduzir"}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-purple-100 bg-gradient-to-b from-white to-purple-50/30 p-4 sm:p-6 min-h-[360px]">
            {active === "emergencia" ? <EmergencyScene /> : null}
            {active === "dicas" ? <TipsScene /> : null}
            {active === "recursos" ? <ResourcesScene /> : null}
            {active === "locais" ? <LocationsScene /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmergencyScene() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Painel de Emergência</h3>
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-purple-100">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 text-center">
          <div className="relative">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />
            <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white">
              <span className="text-2xl font-bold">SOS</span>
            </div>
          </div>
          <p className="text-sm text-slate-600">Toque para iniciar seu protocolo de emergência.</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["Polícia Militar", "190"],
          ["Central de Atendimento à Mulher", "180"],
        ].map(([name, phone]) => (
          <div key={name} className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">{name}</p>
              <p className="text-sm text-slate-600">{phone}</p>
            </div>
            <span className="rounded-xl bg-purple-700 px-3 py-2 text-sm font-medium text-white">Ligar</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipsScene() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Dicas de Segurança</h3>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Transporte", "Compartilhe sua rota em tempo real com alguém de confiança."],
          ["Casa", "Tenha contatos de emergência visíveis e de fácil acesso."],
          ["Trabalho", "Combine códigos de segurança com colegas próximos."],
        ].map(([category, description]) => (
          <article key={category} className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{category}</span>
            <p className="mt-3 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ResourcesScene() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Recursos e Apoio</h3>
      <article className="rounded-3xl bg-purple-700 p-5 text-white shadow-sm">
        <h4 className="font-bold">Lei Maria da Penha (Lei 11.340/2006)</h4>
        <p className="text-sm text-purple-100 mt-1">
          Proteção contra violência física, psicológica, moral, sexual e patrimonial.
        </p>
      </article>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          "Delegacia da Mulher",
          "Defensoria Pública",
          "Centros de Referência",
          "Rede de acolhimento",
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-purple-100 bg-white p-4 text-sm text-slate-700 shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationsScene() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Locais Seguros</h3>
      <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
        <div className="h-36 rounded-xl border border-dashed border-purple-200 bg-purple-50/50 relative">
          <MapPin className="absolute left-[18%] top-[30%] h-5 w-5 text-purple-700" />
          <MapPin className="absolute left-[52%] top-[18%] h-5 w-5 text-purple-700" />
          <MapPin className="absolute left-[72%] top-[58%] h-5 w-5 text-purple-700" />
        </div>
      </div>
      <div className="grid gap-3">
        {[
          ["Delegacia da Mulher - Centro", "1.4 km"],
          ["Casa de Apoio Esperança", "2.1 km"],
        ].map(([name, distance]) => (
          <div key={name} className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800">{name}</p>
              <p className="text-sm text-slate-600">Aberto agora</p>
            </div>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">{distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
