"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import type { ComponentWithBag } from "@/lib/inventory-types";

interface InventoryTableProps {
  components: ComponentWithBag[];
  onEdit: (component: ComponentWithBag) => void;
  onDelete: (component: ComponentWithBag) => void;
  isDeleting: boolean;
}

type SortField =
  | "codigo"
  | "nombre"
  | "categoria"
  | "cantidad"
  | "ubicacion"
  | "estado";

function StatusBadge({ estado }: { estado: string }) {
  const colors = {
    Disponible: "bg-green-100 text-green-700",
    Prestado: "bg-yellow-100 text-yellow-700",
    Agotado: "bg-red-100 text-red-700",
    Dañado: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        colors[estado as keyof typeof colors] ??
        "bg-slate-100 text-slate-600"
      }`}
    >
      {estado}
    </span>
  );
}

interface SortableHeaderProps {
  title: string;
  field: SortField;
  onSort: (field: SortField) => void;
}

function SortableHeader({ title, field, onSort }: SortableHeaderProps) {
  return (
    <th
      onClick={() => onSort(field)}
      className="cursor-pointer select-none px-6 py-4 text-left font-semibold text-slate-700 hover:bg-slate-200"
    >
      <div className="flex items-center gap-2">
        {title}
        <ArrowUpDown size={15} />
      </div>
    </th>
  );
}

export default function InventoryTable({
  components,
  onEdit,
  onDelete,
  isDeleting,
}: InventoryTableProps) {
  const [sortField, setSortField] =
    useState<SortField>("codigo");

  const [ascending, setAscending] = useState(true);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  function sortBy(field: SortField) {
    if (field === sortField) {
      setAscending(!ascending);
    } else {
      setSortField(field);
      setAscending(true);
    }

    setPage(1);
  }

  const sorted = useMemo(() => {
    return [...components].sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];

      if (typeof av === "number" && typeof bv === "number") {
        return ascending ? av - bv : bv - av;
      }

      return ascending
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [components, sortField, ascending]);

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / rowsPerPage)
  );

  const current = sorted.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (!components.length) {
    return (
      <div className="py-14 text-center">
        <Package
          size={54}
          className="mx-auto mb-4 text-slate-300"
        />
        <p className="text-slate-500">
          No hay componentes registrados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {sorted.length} componentes encontrados
        </p>

        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value={10}>10 filas</option>
          <option value={25}>25 filas</option>
          <option value={50}>50 filas</option>
          <option value={100}>100 filas</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <SortableHeader title="Código" field="codigo" onSort={sortBy} />
              <SortableHeader title="Nombre" field="nombre" onSort={sortBy} />
              <SortableHeader title="Categoría" field="categoria" onSort={sortBy} />
              <SortableHeader title="Cantidad" field="cantidad" onSort={sortBy} />
              <SortableHeader title="Ubicación" field="ubicacion" onSort={sortBy} />
              <SortableHeader title="Estado" field="estado" onSort={sortBy} />
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Bolsa</th>
              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {current.map((component) => (
              <tr
                key={component.id}
                className="border-t transition hover:bg-slate-50 text-slate-800"
              >
                <td className="px-6 py-4 font-medium">
                  {component.codigo}
                </td>

                <td className="px-6 py-4">
                  {component.nombre}
                </td>

                <td className="px-6 py-4">
                  {component.categoria}
                </td>

                <td className="px-6 py-4">
                  {component.cantidad} {component.unidad}
                </td>

                <td className="px-6 py-4">
                  {component.ubicacion}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge estado={component.estado} />
                </td>

                <td className="px-6 py-4">
                  {component.bag?.nombre ?? "Sin bolsa"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(component)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(component)}
                      disabled={isDeleting}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          Anterior
        </button>

        <span className="text-sm text-slate-500">
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
