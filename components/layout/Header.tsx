"use client";

import {
  Bell,
  Search,
  UserCircle,
  CalendarDays,
} from "lucide-react";

export default function Header() {
  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Buscar componentes..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-slate-600">
          <CalendarDays size={18} />
          <span className="text-sm capitalize">{fecha}</span>
        </div>

        <button className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <UserCircle size={42} className="text-blue-600" />

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              Administrador
            </p>

            <p className="text-sm text-slate-500">
              Sistema SISE
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}