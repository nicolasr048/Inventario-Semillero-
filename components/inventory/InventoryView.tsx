"use client";

import { deleteComponent } from "@/app/inventario/actions";
import { useMemo, useState, useTransition } from "react";
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  CheckCircle2,
  Wrench,
} from "lucide-react";

import ComponentForm from "./ComponentForm";
import InventoryTable from "./InventoryTable";

import { Button, Card } from "@/components/ui";
import type { BagWithComponents, ComponentWithBag } from "@/lib/inventory-types";

interface InventoryViewProps {
  components: ComponentWithBag[];
  bags: BagWithComponents[];
}

export default function InventoryView({
  components,
  bags,
}: InventoryViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentWithBag | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [bagId, setBagId] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleNew() {
    setSelectedComponent(null);
    setShowForm(true);
  }

  function handleEdit(component: ComponentWithBag) {
    setSelectedComponent(component);
    setShowForm(true);
  }

  function handleDelete(component: ComponentWithBag) {
    const ok = window.confirm(
      `¿Eliminar "${component.nombre}"?`
    );

    if (!ok) return;

    startDeleteTransition(async () => {
      const formData = new FormData();
      formData.append("id", component.id.toString());
      const result = await deleteComponent(formData);

      if (!result.ok) {
        window.alert(result.message);
      }
    });
  }

  const filteredComponents = useMemo(() => {
    const text = search.toLowerCase().trim();

    return components.filter((component) =>
      [
        component.codigo,
        component.nombre,
        component.categoria,
        component.subcategoria,
        component.ubicacion,
        component.estado,
        component.especificacion ?? "",
        component.observaciones ?? "", component.bag?.nombre ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(text) && (!category || component.categoria === category) && (!bagId || String(component.bagId ?? "none") === bagId) && (!state || component.estado === state) && (!location || component.ubicacion.toLowerCase().includes(location.toLowerCase()))
    );
  }, [components, search, category, bagId, state, location]);
  const categories = [...new Set(components.map((component) => component.categoria))].sort();
  const clearFilters = () => { setSearch(""); setCategory(""); setBagId(""); setState(""); setLocation(""); };

  const disponibles = components.filter(
    (c) => c.estado === "Disponible"
  ).length;

  const prestados = components.filter(
    (c) => c.estado === "Prestado"
  ).length;

  const agotados = components.filter(
    (c) => c.estado === "Agotado"
  ).length;

  const danados = components.filter(
    (c) => c.estado === "Dañado"
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Inventario
          </h1>

          <p className="text-slate-500">
            Administra todos los componentes del laboratorio.
          </p>
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={handleNew}
        >
          <Plus size={18} />
          Agregar componente
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="flex items-center gap-4 p-5">
          <div className="rounded-xl bg-blue-100 p-3">
            <Package className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total
            </p>
            <h2 className="text-3xl font-bold">
              {components.length}
            </h2>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="rounded-xl bg-green-100 p-3">
            <CheckCircle2 className="text-green-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Disponibles
            </p>
            <h2 className="text-3xl font-bold">
              {disponibles}
            </h2>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="rounded-xl bg-yellow-100 p-3">
            <Wrench className="text-yellow-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Prestados
            </p>
            <h2 className="text-3xl font-bold">
              {prestados}
            </h2>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5">
          <div className="rounded-xl bg-red-100 p-3">
            <AlertTriangle className="text-red-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Agotados / Dañados
            </p>
            <h2 className="text-3xl font-bold">
              {agotados + danados}
            </h2>
          </div>
        </Card>
      </div>

      {showForm && (
        <ComponentForm
          component={selectedComponent}
          bags={bags}
          onCancel={() => {
            setShowForm(false);
            setSelectedComponent(null);
          }}
        />
      )}

      <Card className="p-6">
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Buscar por código, nombre, categoría, ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <select aria-label="Filtrar por categoría" value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800"><option value="">Todas las categorías</option>{categories.map((value) => <option key={value}>{value}</option>)}</select>
          <select aria-label="Filtrar por bolsa" value={bagId} onChange={(event) => setBagId(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800"><option value="">Todas las bolsas</option><option value="none">Sin bolsa</option>{bags.map((bag) => <option key={bag.id} value={bag.id}>{bag.nombre}</option>)}</select>
          <select aria-label="Filtrar por estado" value={state} onChange={(event) => setState(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800"><option value="">Todos los estados</option>{["Disponible", "Prestado", "Agotado", "Dañado"].map((value) => <option key={value}>{value}</option>)}</select>
          <input aria-label="Filtrar por ubicación" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Filtrar ubicación" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800" />
          <Button type="button" variant="secondary" onClick={clearFilters}>Limpiar filtros</Button>
        </div>

        <InventoryTable
          components={filteredComponents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      </Card>
    </div>
  );
}
