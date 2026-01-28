import { getDashboardData } from "@/lib/data";
import { Sidebar } from "@/components/sidebar";
import { HeaderCards } from "@/components/header-cards";
import { MetricCards } from "@/components/metric-cards";
import { ConversionFunnel } from "@/components/conversion-funnel";
import { ProductPerformance } from "@/components/product-performance";
import { AppointmentsTable } from "@/components/appointments-table";
import { RecentActivity } from "@/components/recent-activity";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <div className="flex min-h-screen">
      <Sidebar user={data.user} stats={data.stats} />

      {/* Mobile Header for styling consistency (hidden on desktop) */}
      <main className="flex-1 bg/[var(--background)] px-4 pb-8 pt-20 lg:px-8 lg:pt-8">
        <div className="mx-auto max-w-7xl animate-in fade-in-0 duration-500">
          <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)] sm:text-3xl lg:hidden">
            Dashboard
          </h1>

          <div className="flex flex-col gap-6">
            {/* Top Alerts */}
            <HeaderCards alerts={data.alerts} />

            {/* Key Metrics - Now handles its own data fetching */}
            <MetricCards />

            {/* Main Content Grid */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <ConversionFunnel funnel={data.funnel} />
              <ProductPerformance products={data.products} />
            </div>

            {/* Bottom Grid */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <AppointmentsTable appointments={data.appointments} />
              <RecentActivity activity={data.recentActivity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
