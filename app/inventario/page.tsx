import InventoryView from "@/components/inventory/InventoryView";
import {
  getAllBags,
  getAllComponents,
} from "@/lib/inventory-service";

export default async function InventarioPage() {
  const [components, bags] = await Promise.all([
    getAllComponents(),
    getAllBags(),
  ]);

  return (
    <InventoryView
      components={components}
      bags={bags}
    />
  );
}