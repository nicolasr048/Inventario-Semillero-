"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  createComponent,
  updateComponent,
} from "@/app/inventario/actions";

import { Button, Card } from "@/components/ui";
import type { BagWithComponents, ComponentWithBag } from "@/lib/inventory-types";

interface ComponentFormProps {
  component?: ComponentWithBag | null;
  bags: BagWithComponents[];
  onCancel: () => void;
}

const CATEGORIAS = [
  "Electrónica",
  "Motores",
  "Sensores",
  "Cables",
  "Tornillería",
  "Herramientas",
  "Impresión 3D",
  "Neumática",
  "Materiales",
  "Otros",
];

const UNIDADES = [
  "Unidad",
  "Metro",
  "Centímetro",
  "Milímetro",
  "Kilogramo",
  "Gramo",
  "Litro",
  "Par",
  "Caja",
  "Rollo",
];

const ESTADOS = [
  "Disponible",
  "Prestado",
  "Agotado",
  "Dañado",
];

export default function ComponentForm({
  component,
  bags,
  onCancel,
}: ComponentFormProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const action = component ? updateComponent : createComponent;

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-2xl font-bold">
        {component ? "Editar componente" : "Nuevo componente"}
      </h2>

      <form
        action={(formData) => {
          startTransition(async () => {
            setError(null);
            const result = await action(formData);

            if (!result.ok) {
              setError(result.message);
              return;
            }

            onCancel();
            router.refresh();
          });
        }}
        className="grid grid-cols-2 gap-5"
      >
        {component && (
          <input
            type="hidden"
            name="id"
            defaultValue={component.id}
          />
        )}

        <div>
          <label className="mb-2 block font-medium">
            Código
          </label>

          <input
            name="codigo"
            required
            defaultValue={component?.codigo}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Nombre
          </label>

          <input
            name="nombre"
            required
            defaultValue={component?.nombre}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Categoría
          </label>

          <select
            name="categoria"
            required
            defaultValue={component?.categoria ?? ""}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>

            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Subcategoría
          </label>

          <input
            name="subcategoria"
            required
            defaultValue={component?.subcategoria}
            placeholder="Ej: Servo, Arduino, Tornillo M6..."
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Cantidad
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            name="cantidad"
            required
            defaultValue={component?.cantidad ?? 1}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Unidad
          </label>

          <select
            name="unidad"
            required
            defaultValue={component?.unidad ?? "Unidad"}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            {UNIDADES.map((unidad) => (
              <option key={unidad} value={unidad}>
                {unidad}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="mb-2 block font-medium">
            Especificación
          </label>

          <input
            name="especificacion"
            defaultValue={component?.especificacion ?? ""}
            placeholder="Voltaje, dimensiones, referencia..."
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Ubicación
          </label>

          <input
            name="ubicacion"
            required
            defaultValue={component?.ubicacion}
            placeholder="Bolsa A-01"
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Bolsa</label>

          <select
            name="bagId"
            defaultValue={component?.bagId?.toString() ?? ""}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sin bolsa</option>
            {bags.map((bag) => (
              <option key={bag.id} value={bag.id}>
                {bag.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Estado
          </label>

          <select
            name="estado"
            defaultValue={component?.estado ?? "Disponible"}
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="mb-2 block font-medium">
            Observaciones
          </label>

          <textarea
            rows={4}
            name="observaciones"
            defaultValue={component?.observaciones ?? ""}
            placeholder="Información adicional..."
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2 mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Guardando..."
              : component
              ? "Guardar cambios"
              : "Guardar componente"}
          </Button>
        </div>

        {error && (
          <p className="col-span-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </Card>
  );
}
