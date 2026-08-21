import BagsView from "@/components/bags/BagsView";
import { getAllBags } from "@/lib/inventory-service";

export default async function BolsasPage() {
  return <BagsView bags={await getAllBags()} />;
}
