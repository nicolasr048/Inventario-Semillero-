import DashboardView from "@/components/dashboard/DashboardView";
import { getDashboardStats } from "@/lib/dashboard-service";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <DashboardView stats={stats} />;
}