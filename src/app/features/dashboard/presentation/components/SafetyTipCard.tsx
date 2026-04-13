type SafetyTipCardProps = {
  title: string;
  description: string;
};

export function SafetyTipCard({ title, description }: SafetyTipCardProps) {
  return (
    <article className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </article>
  );
}
