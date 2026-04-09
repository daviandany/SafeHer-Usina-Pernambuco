export function AppDashboard() {
  return (
    <section className="relative h-[calc(100vh-6rem)] overflow-hidden bg-[#f8f9ff]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1QMxWc2oxUqf-v1i80QxHciUZC9a52bQ_FOD07-o4YIggRIEwFXKKLMalH37lQFHkpmF2OMdXdOjmMu_DpLwU1DvzQCzzSgmXFM8PIqBNcTnvMFnFAR_xbIETEdncvC6W3nInLORHk0yfOmQTjC0l1iD1XKoZtFoekERrARjg_BbVgDNtUUgyzdF-3StD2-oTMAwfTh8U80-DDIG1IugkJ-rjDr5kv_U0TitxOeHFYNKm_NUXDYz99NGsKEYZROc0mGQC8VwL26A')",
        }}
      />

      <div className="relative z-10 grid gap-4 p-6 md:max-w-md">
        <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-md">
          <h1 className="mb-2 text-2xl font-black">Status Atual</h1>
          <p className="mb-4 text-sm text-slate-600">
            Você está em uma zona monitorada. 4 contatos de confiança estão ativos no momento.
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[#eff4ff] p-3">
              <div className="text-[10px] font-bold uppercase text-slate-500">Tempo de Trajeto</div>
              <div className="font-bold text-purple-700">12 min restantes</div>
            </div>
            <div className="rounded-xl bg-[#eff4ff] p-3">
              <div className="text-[10px] font-bold uppercase text-slate-500">Bateria</div>
              <div className="font-bold text-purple-700">84%</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-purple-200/80 p-5 text-sm text-purple-900 shadow-lg">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined">share_location</span>
            Compartilhamento Ativo
          </div>
          Sua localização está sendo enviada para: Mãe, Carol e Grupo "Night Out".
        </div>
      </div>

      <button className="absolute bottom-16 right-10 z-20 h-28 w-28 rounded-full bg-gradient-to-br from-purple-700 to-purple-500 text-xl font-black text-white shadow-[0_0_60px_rgba(129,39,207,0.4)]">
        SOS
      </button>
    </section>
  );
}
