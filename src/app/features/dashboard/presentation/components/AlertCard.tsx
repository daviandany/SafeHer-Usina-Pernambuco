import type { EmergencyAlert } from "../../../emergency/domain/Emergency";

type AlertCardProps = {
  alert: EmergencyAlert;
};

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <article className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase text-purple-700">Alerta {alert.status}</p>
      <p className="mt-2 text-sm text-slate-700">ID: {alert.id.slice(0, 8)}</p>
      <p className="text-sm text-slate-700">Local: {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}</p>
      <p className="text-xs text-slate-500 mt-1">{new Date(alert.createdAt).toLocaleString("pt-BR")}</p>
    </article>
  );
}
