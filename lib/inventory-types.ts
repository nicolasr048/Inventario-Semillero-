import type { Prisma } from "@prisma/client";

export type ComponentWithBag = Prisma.ComponentGetPayload<{
  include: { bag: true };
}>;

export type BagWithComponents = Prisma.BagGetPayload<{
  include: { components: true };
}>;
