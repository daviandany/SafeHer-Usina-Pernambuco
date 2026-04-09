const contacts = [
  { name: "Ana Paula", relation: "Mãe", level: "Nível 1", action: "Ligar", online: true },
  { name: "Marcos Silva", relation: "Irmão", level: "Nível 1", action: "Mensagem", online: false },
  { name: "Bia Santos", relation: "Amiga", level: "Nível 2", action: "Localização", online: true },
];

export function TrustedContactsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32">
      <h1 className="mb-3 text-4xl font-black tracking-tight">Contatos de Confiança</h1>
      <p className="mb-10 max-w-2xl text-slate-600">
        Pessoas que serão notificadas instantaneamente em caso de emergência ou quando você solicitar acompanhamento.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {contacts.map((contact) => (
          <article key={contact.name} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{contact.name}</h2>
                <p className="text-slate-500">{contact.relation}</p>
              </div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-black uppercase text-purple-700">
                {contact.level}
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              <span
                className={`h-2.5 w-2.5 rounded-full ${contact.online ? "bg-green-500" : "bg-slate-300"}`}
              />
              {contact.online ? "Online" : "Offline"}
            </div>
            <button className="w-full rounded-full bg-[#eff4ff] py-3 font-semibold text-slate-700 hover:bg-[#dee9fc]">
              {contact.action}
            </button>
          </article>
        ))}

        <button className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center hover:bg-white">
          <span className="material-symbols-outlined mb-2 text-4xl text-purple-700">person_add</span>
          <div className="text-lg font-bold">Adicionar Novo</div>
          <div className="text-sm text-slate-500">Expanda seu círculo de segurança</div>
        </button>
      </div>
    </section>
  );
}
