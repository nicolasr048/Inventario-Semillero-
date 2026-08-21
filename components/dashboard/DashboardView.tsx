import Link from "next/link";
import { AlertTriangle, Archive, Boxes, CircleCheck, Package, Wrench } from "lucide-react";
import { Card } from "@/components/ui";
import type { getDashboardStats } from "@/lib/dashboard-service";

type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;

function Metric({ label, value, icon: Icon, tone = "blue" }: { label: string; value: number; icon: typeof Package; tone?: "blue" | "green" | "yellow" | "red" | "slate" }) {
  const tones = { blue: "bg-blue-100 text-blue-700", green: "bg-emerald-100 text-emerald-700", yellow: "bg-amber-100 text-amber-700", red: "bg-red-100 text-red-700", slate: "bg-slate-100 text-slate-700" };
  return <Card className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div><span className={`rounded-xl p-3 ${tones[tone]}`}><Icon size={23} /></span></div></Card>;
}

function Chart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return <Card className="p-6"><h2 className="font-semibold text-slate-900">{title}</h2><div className="mt-5 space-y-3">{data.length ? data.map((item) => <div key={item.label}><div className="mb-1 flex justify-between text-sm"><span className="truncate pr-3">{item.label}</span><strong>{item.value}</strong></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${(item.value / max) * 100}%` }} /></div></div>) : <p className="text-sm text-slate-500">Sin datos registrados.</p>}</div></Card>;
}

export default function DashboardView({ stats }: { stats: DashboardStats }) {
  return <div className="space-y-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold text-slate-900">Dashboard</h1><p className="mt-1 text-slate-500">Resumen operativo del inventario SISE.</p></div><Link href="/inventario" className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700">Administrar inventario</Link></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Componentes" value={stats.totalComponents} icon={Package}/><Metric label="Bolsas" value={stats.totalBags} icon={Archive} tone="green"/><Metric label="Disponibles" value={stats.available} icon={CircleCheck} tone="green"/><Metric label="Prestados" value={stats.loaned} icon={Wrench} tone="yellow"/><Metric label="Agotados" value={stats.depleted} icon={AlertTriangle} tone="red"/><Metric label="Dañados" value={stats.damaged} icon={Wrench} tone="red"/><Metric label="Sin bolsa" value={stats.unassigned} icon={Boxes} tone="slate"/><Metric label="Categorías" value={stats.categoryCount} icon={Boxes} tone="blue"/></div>
    <div className="grid gap-6 xl:grid-cols-3"><Chart title="Por categoría" data={stats.byCategory}/><Chart title="Por estado" data={stats.byState}/><Chart title="Por bolsa" data={stats.byBag}/></div>
    <div className="grid gap-6 xl:grid-cols-3"><Card className="p-6 xl:col-span-2"><h2 className="font-semibold">Últimos componentes</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="pb-3">Código</th><th className="pb-3">Nombre</th><th className="pb-3">Bolsa</th><th className="pb-3">Estado</th></tr></thead><tbody>{stats.recent.map((item) => <tr key={item.id} className="border-t"><td className="py-3 font-medium">{item.codigo}</td><td>{item.nombre}</td><td>{item.bag?.nombre ?? "Sin bolsa"}</td><td>{item.estado}</td></tr>)}</tbody></table>{!stats.recent.length && <p className="py-6 text-slate-500">Aún no hay componentes.</p>}</div></Card><Card className="p-6"><h2 className="font-semibold">Requieren atención</h2><div className="mt-4 space-y-3">{[...stats.lowStock, ...stats.attention].slice(0, 6).map((item) => <div key={item.id} className="rounded-lg bg-slate-50 p-3 text-sm"><strong>{item.nombre}</strong><p className="text-slate-500">{item.estado} · {item.cantidad} {item.unidad}</p></div>)}{!stats.lowStock.length && !stats.attention.length && <p className="text-sm text-slate-500">No hay alertas activas.</p>}</div></Card></div>
  </div>;
}
