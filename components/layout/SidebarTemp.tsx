"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: Package,
  },
  {
    name: "Agregar",
    href: "/agregar",
    icon: PlusCircle,
  },
  {
    name: "Bolsas",
    href: "/bolsas",
    icon: ShoppingBag,
  },
  {
    name: "Estadísticas",
    href: "/estadisticas",
    icon: BarChart3,
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
];

export default function SidebarTemp() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-white border-r border-slate-800">
      <div className="flex h-24 items-center gap-4 border-b border-slate-800 px-6">
        <Image
          src="/logo-sise.png"
          alt="SISE"
          width={52}
          height={52}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-2xl font-bold tracking-wide">SISE</h1>
          <p className="text-sm text-slate-400">
            Sistema Inteligente de Inventario
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={active ? "" : "group-hover:scale-110 transition-transform"}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <p className="text-sm font-medium text-slate-300">
          SISE Inventory
        </p>
        <p className="text-xs text-slate-500">
          Versión 1.0
        </p>
      </div>
    </aside>
  );
}