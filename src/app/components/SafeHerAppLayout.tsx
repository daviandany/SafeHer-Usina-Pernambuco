import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/contatos", label: "Trusted Contacts" },
  { to: "/app/rede", label: "Protection Network" },
  { to: "/app/ajuda", label: "Help Center" },
];

export function SafeHerAppLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c2a] font-sans">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#f8f9ff]/80 px-6 py-4 backdrop-blur-xl">
        <div className="text-2xl font-black tracking-tight text-purple-700">SafeHer</div>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-purple-700" : "text-slate-500 hover:text-purple-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>
          <img
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR13Mz5yurJEG0oLihkN9XfbjE25ykYqhg4rrTlczlUYC0LE8-1P9SCrK0YVJhErPMo3PIahRUby4aApXzf8hQn8RWUfncVK65BtFI1R4DRxmD63mnSkL8hDkArya_E8Hrl3_fGK_52uG4-DyNZ76wlUP8ajg0LZl_6vKJiu-hmNHdMOiPwjBxQFDOy19VBK0PuQJX3SLrtfhj_ka-UdeiaULhLJUJMmYRzgEH4s2oWd1Zux5iTmQpjD3jv0N15GMAcUOLiv4D93A"
            className="h-10 w-10 rounded-full border-2 border-purple-200 object-cover"
          />
        </div>
      </header>

      <main className="pt-24">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full justify-around bg-white/85 px-4 pb-7 pt-3 backdrop-blur-2xl md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-2xl px-3 py-2 text-[11px] font-bold uppercase tracking-widest ${
                isActive ? "bg-purple-100 text-purple-700" : "text-slate-400"
              }`
            }
          >
            {item.label.split(" ")[0]}
          </NavLink>
        ))}
      </footer>
    </div>
  );
}
