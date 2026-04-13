type RiskZone = {
  id: string;
  center: [number, number];
  radius: number;
  riskLabel: string;
};

type RiskMapProps = {
  zones: RiskZone[];
};

export function RiskMap({ zones }: RiskMapProps) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-purple-100">
        <iframe
          title="Mapa de áreas de risco em Olinda"
          src="https://maps.google.com/maps?q=Olinda,PE&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-72 w-full"
          loading="lazy"
        />
      </div>

      <div className="grid gap-2">
        {zones.map((zone) => (
          <div key={zone.id} className="rounded-xl bg-white p-3 text-sm text-slate-700 border border-purple-100">
            <span className="font-semibold text-[#6B21A8]">Geofence:</span> {zone.riskLabel} ({zone.center[0].toFixed(4)}, {zone.center[1].toFixed(4)}) - raio {zone.radius}m
          </div>
        ))}
      </div>
    </div>
  );
}
