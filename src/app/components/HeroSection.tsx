import { Button } from "./ui/button";
import { Shield, MapPin, Heart, CheckCircle, Siren, Sparkles, LifeBuoy } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const previewTabs = [
  { id: "emergencia", label: "Emergência", icon: Siren },
  { id: "dicas", label: "Dicas", icon: Sparkles },
  { id: "recursos", label: "Recursos", icon: LifeBuoy },
] as const;

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<(typeof previewTabs)[number]["id"]>("emergencia");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = previewTabs.findIndex((tab) => tab.id === current);
        return previewTabs[(currentIndex + 1) % previewTabs.length].id;
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fique segura.
              <br />
              <span className="text-purple-600">Sinta-se empoderada.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Sua companhia de segurança para mulheres,
              a qualquer hora, em qualquer lugar.
            </p>

            <div className="space-y-3">
              <Link to="/cadastro">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-sky-500 via-purple-500 to-fuchsia-500 hover:opacity-100 text-white rounded-2xl px-8 py-6 text-lg font-bold shadow-[0_14px_30px_rgba(168,85,247,0.35)] hover:shadow-[0_20px_46px_rgba(217,70,239,0.55)] hover:-translate-y-0.5 transition-all duration-300">
                  Comece agora. É GRÁTIS →
                </Button>
              </Link>
              <p className="text-sm text-slate-500">Gratuito e pensado para ajudar mulheres com apoio rápido quando mais precisarem.</p>
            </div>

            <div className="absolute -top-10 -left-10 opacity-20">
              <div className="bg-purple-300 rounded-full p-4">
                <Shield className="w-12 h-12 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>

              <div className="absolute top-1/4 -left-6 bg-white rounded-full p-3 shadow-lg animate-bounce delay-200">
                <MapPin className="w-8 h-8 text-purple-500" />
              </div>

              <div className="absolute bottom-1/4 -right-6 bg-white rounded-full p-3 shadow-lg animate-bounce delay-500">
                <Heart className="w-8 h-8 text-purple-500" />
              </div>

              <div className="absolute -bottom-6 left-1/4 bg-white rounded-full p-3 shadow-lg animate-bounce delay-700">
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>

              <div className="relative z-10 rounded-3xl border border-fuchsia-200 bg-white p-4 sm:p-5 shadow-2xl shadow-purple-100/80">
                <div className="flex flex-wrap gap-2 border-b border-purple-100 pb-4">
                  {previewTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                          isActive ? "bg-purple-700 text-white" : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 min-h-[220px] rounded-2xl border border-purple-100 bg-gradient-to-b from-white to-purple-50/40 p-4">
                  {activeTab === "emergencia" ? (
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900">Painel de Emergência</h3>
                      <div className="rounded-2xl border border-red-100 bg-red-50/70 p-4 text-center">
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white font-bold">SOS</span>
                        <p className="text-sm text-slate-600 mt-2">Acione ajuda imediata com um toque.</p>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="rounded-xl bg-white border border-purple-100 px-3 py-2">Polícia Militar • 190</div>
                        <div className="rounded-xl bg-white border border-purple-100 px-3 py-2">Central da Mulher • 180</div>
                      </div>
                    </div>
                  ) : null}

                  {activeTab === "dicas" ? (
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900">Dicas de Segurança</h3>
                      <div className="grid gap-2">
                        <div className="rounded-xl bg-white border border-purple-100 p-3 text-sm text-slate-600">
                          Compartilhe sua localização em deslocamentos.
                        </div>
                        <div className="rounded-xl bg-white border border-purple-100 p-3 text-sm text-slate-600">
                          Tenha contatos de confiança salvos.
                        </div>
                        <div className="rounded-xl bg-white border border-purple-100 p-3 text-sm text-slate-600">
                          Em risco, priorize locais movimentados.
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {activeTab === "recursos" ? (
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900">Recursos e Apoio</h3>
                      <div className="rounded-xl bg-purple-700 p-3 text-white text-sm">
                        Lei Maria da Penha: proteção legal para mulheres.
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="rounded-xl bg-white border border-purple-100 px-3 py-2">Delegacia da Mulher</div>
                        <div className="rounded-xl bg-white border border-purple-100 px-3 py-2">Defensoria Pública</div>
                        <div className="rounded-xl bg-white border border-purple-100 px-3 py-2">Centros de Referência</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#F3F4F6"
            fillOpacity="0.5"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
