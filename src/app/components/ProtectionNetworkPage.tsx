const places = [
  { type: "Delegacia", name: "1ª Delegacia de Defesa da Mulher (DDM)", distance: "0.8 km" },
  { type: "ONG", name: "Casa da Mulher Brasileira", distance: "1.5 km" },
  { type: "Hospital", name: "Hospital Pérola Byington", distance: "2.1 km" },
];

export function ProtectionNetworkPage() {
  return (
    <section className="grid h-[calc(100vh-6rem)] grid-cols-1 overflow-hidden lg:grid-cols-[1fr_24rem]">
      <div className="relative hidden lg:block">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZIj5kMqRa67BVkh9OVJGj9ZkotNa4SPq9OrGZYMOOJOarC92NBKMJPLyn3ClkOWfrLQXIpeXQFDd-VZgSbOJK7vtuD5bi_XYVARZmR7npXwjQ6-OoZpb2q9m2CvtapTfXISdpjdspSf0NXr7LTeUZTpjXMwA6Rgb0orzzGDzYYqTfssmFUPj21Wo-d7ioaYj2WTPlW3mhERgqERCTyax0X7-BScFTPi5glUAZ7p7nIXcusTCE2z2GspU2iGV2DsIYhdJBfzNdpU8"
          alt="Mapa"
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <aside className="overflow-y-auto bg-white p-6">
        <h1 className="text-2xl font-black">Locais Próximos</h1>
        <p className="mb-6 text-sm text-slate-500">Exibindo 12 pontos de segurança em São Paulo</p>
        <div className="space-y-4">
          {places.map((place) => (
            <article key={place.name} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-purple-100 px-2 py-1 text-[10px] font-black uppercase text-purple-700">
                  {place.type}
                </span>
                <span className="text-xs text-slate-400">{place.distance}</span>
              </div>
              <h2 className="font-bold">{place.name}</h2>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
