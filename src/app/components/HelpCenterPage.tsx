const guides = [
  "O que fazer ao sentir que está sendo seguida?",
  "Compartilhamento de Rota",
  "Dispositivos de Defesa",
];

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
        <button className="rounded-2xl bg-red-600 p-8 text-left text-white">
          <div className="text-3xl font-black">Ligar 190</div>
          <div className="text-sm opacity-90">Polícia Militar - Emergência Imediata</div>
        </button>
        <button className="rounded-2xl bg-purple-700 p-8 text-left text-white">
          <div className="text-3xl font-black">Ligar 180</div>
          <div className="text-sm opacity-90">Central de Atendimento à Mulher</div>
        </button>
        <button className="rounded-2xl bg-[#6d4e8f] p-8 text-left text-white">
          <div className="text-3xl font-black">Chat de Apoio</div>
          <div className="text-sm opacity-90">Converse com uma especialista agora</div>
        </button>
      </div>

      <h2 className="mb-4 text-2xl font-bold">Guias de Ação</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide} className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-bold">{guide}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
