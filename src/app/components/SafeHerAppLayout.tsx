import { LifeBuoy, MapPin, Shield, Siren, Sparkles } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/app/emergencia", label: "Emergência", shortLabel: "Emerg.", icon: Siren },
  { to: "/app/dicas", label: "Dicas", shortLabel: "Dicas", icon: Sparkles },
  { to: "/app/recursos", label: "Recursos", shortLabel: "Rec.", icon: LifeBuoy },
  { to: "/app/locais", label: "Locais Seguros", shortLabel: "Locais", icon: MapPin },
];

export function SafeHerAppLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#f4f2ff_45%,_#eef2ff)] font-sans text-slate-900">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-purple-100 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-2 text-purple-700">
          <span className="rounded-xl bg-purple-100 p-2">
            <Shield className="h-5 w-5" />
          </span>
          <strong className="text-xl">SafeHer</strong>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-purple-700 text-white" : "text-slate-600 hover:bg-purple-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="pb-32 pt-20 md:pt-24">
        <Outlet />
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
        <nav className="mx-auto flex w-full max-w-md items-center justify-between rounded-3xl border border-white/70 bg-white/85 p-2 shadow-[0_12px_35px_rgba(88,28,135,0.18)] backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "-translate-y-1 bg-gradient-to-b from-purple-100 to-purple-50 text-purple-700 shadow-[0_8px_16px_rgba(147,51,234,0.22)]"
                      : "text-slate-500 hover:-translate-y-0.5 hover:bg-purple-50/70 hover:text-purple-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-4 w-4 transition-all duration-300 ${
                        isActive ? "scale-110" : "opacity-85 group-hover:scale-105"
                      }`}
                    />
                    <span className="truncate">{item.shortLabel}</span>
                    <span
                      className={`absolute inset-x-4 -top-1 h-1 rounded-full bg-purple-500 transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
