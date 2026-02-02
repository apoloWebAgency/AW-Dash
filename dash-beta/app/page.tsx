import { getDashboardData } from "@/lib/data";
import { getMetricData } from "@/lib/actions";
import { Sidebar } from "@/components/sidebar";
import { HeaderCards } from "@/components/header-cards";
import { MetricCard } from "@/components/metric-cards";
import { ConversionFunnel } from "@/components/conversion-funnel";
import { ProductPerformance } from "@/components/product-performance";
import { AppointmentsTable } from "@/components/appointments-table";
import { RecentActivity } from "@/components/recent-activity";

export default async function Home() {
  const data = await getDashboardData();
  const metrics = await getMetricData();

  // Find specific metrics by category
  const growthMetric = metrics.find(m => m.category === "CRECIMIENTO");
  const conversionMetric = metrics.find(m => m.category === "CONVERSIÓN");
  const revenueMetric = metrics.find(m => m.category === "INGRESOS");

  return (
    <div className="flex min-h-screen">
      <Sidebar user={data.user} stats={data.stats} />

      {/* Mobile Header for styling consistency (hidden on desktop) */}
      <main className="flex-1 bg/[var(--background)] px-2 pb-8 pt-20 sm:px-2 lg:px-6 lg:pt-8">
        <div className="mx-auto max-w-7xl animate-in fade-in-0 duration-500">
          <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)] sm:text-3xl lg:hidden">
            Dashboard
          </h1>

          <div className="flex flex-col gap-6 xl:flex-row">
            {/* Left Column - 20% wider */}
            <div className="flex flex-[2] flex-col gap-4">
              {/* Top: Growth + Conversion */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {growthMetric && <MetricCard metric={growthMetric} />}
                {conversionMetric && <MetricCard metric={conversionMetric} />}
              </div>

              {/* Middle: Conversion Funnel + Revenue */}
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ConversionFunnel funnel={data.funnel} />
                {revenueMetric && <MetricCard metric={revenueMetric} />}
              </div>

              {/* Bottom: Appointments */}
              <AppointmentsTable appointments={data.appointments} />
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Top: Recent Activity - 3/4 height */}
              <div className="flex-[3]">
                <RecentActivity activity={data.recentActivity} />
              </div>

              {/* Bottom: Product Performance - 1/4 height */}
              <div className="flex-1">
                <ProductPerformance products={data.products} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
