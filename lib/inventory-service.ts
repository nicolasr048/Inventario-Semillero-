import { prisma } from "./prisma";
import type {
  BagWithComponents,
  ComponentWithBag,
} from "./inventory-types";

export async function getAllComponents(): Promise<ComponentWithBag[]> {
  return prisma.component.findMany({
    include: {
      bag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllBags(): Promise<BagWithComponents[]> {
  return prisma.bag.findMany({
    include: {
      components: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
}
