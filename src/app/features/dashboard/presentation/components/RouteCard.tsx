type RouteCardProps = {
  name: string;
  safetyLevel: "alto" | "médio" | "baixo";
  duration: string;
};

const safetyColorMap: Record<RouteCardProps["safetyLevel"], string> = {
  alto: "text-emerald-700",
  médio: "text-amber-700",
  baixo: "text-rose-700",
};

export function RouteCard({ name, safetyLevel, duration }: RouteCardProps) {
  return (
    <article className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
      <p className="font-semibold text-slate-800">{name}</p>
      <p className={`text-sm ${safetyColorMap[safetyLevel]}`}>Nível de segurança: {safetyLevel}</p>
      <p className="text-xs text-slate-500">Tempo estimado: {duration}</p>
    </article>
  );
}
