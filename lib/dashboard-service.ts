import { prisma } from "./prisma";

const LOW_STOCK_LIMIT = 3;

export async function getDashboardStats() {
  const [
    totalComponents, totalBags, available, loaned, depleted, damaged, unassigned,
    categories, byCategory, byState, bags, recent, lowStock, attention,
  ] = await Promise.all([
    prisma.component.count(),
    prisma.bag.count(),
    prisma.component.count({ where: { estado: "Disponible" } }),
    prisma.component.count({ where: { estado: "Prestado" } }),
    prisma.component.count({ where: { estado: "Agotado" } }),
    prisma.component.count({ where: { estado: "Dañado" } }),
    prisma.component.count({ where: { bagId: null } }),
    prisma.component.groupBy({ by: ["categoria"] }),
    prisma.component.groupBy({ by: ["categoria"], _count: { _all: true }, orderBy: { _count: { categoria: "desc" } } }),
    prisma.component.groupBy({ by: ["estado"], _count: { _all: true } }),
    prisma.bag.findMany({ select: { nombre: true, _count: { select: { components: true } } }, orderBy: { nombre: "asc" } }),
    prisma.component.findMany({ include: { bag: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.component.findMany({ include: { bag: true }, where: { cantidad: { lte: LOW_STOCK_LIMIT }, estado: "Disponible" }, orderBy: { cantidad: "asc" }, take: 6 }),
    prisma.component.findMany({ include: { bag: true }, where: { estado: { in: ["Agotado", "Dañado"] } }, orderBy: { updatedAt: "desc" }, take: 6 }),
  ]);

  return {
    totalComponents, totalBags, available, loaned, depleted, damaged, unassigned,
    categoryCount: categories.length,
    byCategory: byCategory.map((item) => ({ label: item.categoria, value: item._count._all })),
    byState: byState.map((item) => ({ label: item.estado, value: item._count._all })),
    byBag: bags.map((bag) => ({ label: bag.nombre, value: bag._count.components })),
    recent, lowStock, attention,
  };
}
