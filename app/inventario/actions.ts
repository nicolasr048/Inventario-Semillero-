"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

function requiredText(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`El campo ${field} es obligatorio.`);
  }

  return value.trim();
}

function optionalText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalId(formData: FormData, field: string) {
  const value = optionalText(formData, field);

  if (value === null) {
    return null;
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("La bolsa seleccionada no es válida.");
  }

  return id;
}

function componentData(formData: FormData): Prisma.ComponentUncheckedCreateInput {
  const cantidad = Number(requiredText(formData, "cantidad"));

  if (!Number.isFinite(cantidad) || cantidad < 0) {
    throw new Error("La cantidad debe ser un número mayor o igual a cero.");
  }

  return {
    codigo: requiredText(formData, "codigo"),
    nombre: requiredText(formData, "nombre"),
    categoria: requiredText(formData, "categoria"),
    subcategoria: requiredText(formData, "subcategoria"),
    especificacion: optionalText(formData, "especificacion"),
    cantidad,
    unidad: requiredText(formData, "unidad"),
    ubicacion: requiredText(formData, "ubicacion"),
    estado: requiredText(formData, "estado"),
    observaciones: optionalText(formData, "observaciones"),
    bagId: optionalId(formData, "bagId"),
  };
}

function formId(formData: FormData) {
  const id = Number(requiredText(formData, "id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("El componente seleccionado no es válido.");
  }

  return id;
}

function actionError(error: unknown): ActionResult {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { ok: false, message: "Ya existe un registro con ese valor único." };
    }

    if (error.code === "P2003") {
      return { ok: false, message: "La bolsa seleccionada ya no existe." };
    }

    if (error.code === "P2025") {
      return { ok: false, message: "El registro seleccionado ya no existe." };
    }
  }

  return {
    ok: false,
    message: error instanceof Error ? error.message : "No se pudo guardar el cambio.",
  };
}

function revalidateInventory() {
  revalidatePath("/");
  revalidatePath("/inventario");
  revalidatePath("/bolsas");
  revalidatePath("/dashboard");
}

export async function createComponent(formData: FormData): Promise<ActionResult> {
  try {
    await prisma.component.create({ data: componentData(formData) });
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateComponent(formData: FormData): Promise<ActionResult> {
  try {
    await prisma.component.update({
      where: { id: formId(formData) },
      data: componentData(formData),
    });
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteComponent(formData: FormData): Promise<ActionResult> {
  try {
    await prisma.component.delete({ where: { id: formId(formData) } });
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function createBag(formData: FormData): Promise<ActionResult> {
  try {
    await prisma.bag.create({
      data: {
        nombre: requiredText(formData, "nombre"),
        descripcion: optionalText(formData, "descripcion"),
        ubicacion: optionalText(formData, "ubicacion"),
      },
    });
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateBag(formData: FormData): Promise<ActionResult> {
  try {
    await prisma.bag.update({
      where: { id: formId(formData) },
      data: {
        nombre: requiredText(formData, "nombre"),
        descripcion: optionalText(formData, "descripcion"),
        ubicacion: optionalText(formData, "ubicacion"),
      },
    });
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteBag(formData: FormData): Promise<ActionResult> {
  try {
    const id = formId(formData);

    await prisma.$transaction([
      prisma.component.updateMany({ where: { bagId: id }, data: { bagId: null } }),
      prisma.bag.delete({ where: { id } }),
    ]);
    revalidateInventory();
    return { ok: true };
  } catch (error) {
    return actionError(error);
  }
}
