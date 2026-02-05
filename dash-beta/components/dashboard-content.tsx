// src/components/dashboard-content.tsx
"use client";

import { useState } from "react";
import { MetricCard } from "@/components/metric-cards";
import { ConversionFunnel } from "@/components/conversion-funnel";
import { ProductPerformance } from "@/components/product-performance";
import { AppointmentsTable } from "@/components/appointments-table";
import { RecentActivity } from "@/components/recent-activity";
import { ActivityHistory } from "@/components/activity-history";
import { ClientsView } from "@/components/clients-view";
import { LeadsView } from "@/components/leads-view";
import { AppointmentsView } from "@/components/appointments-view";
import { Sidebar } from "@/components/sidebar";

interface DashboardContentProps {
    data: any;
    metrics: any[];
}

export type ViewType = "dashboard" | "activity" | "clients" | "leads" | "appointments";

export function DashboardContent({ data, metrics }: DashboardContentProps) {
    const [currentView, setCurrentView] = useState<ViewType>("dashboard");

    const growthMetric = metrics.find(m => m.category === "CRECIMIENTO");
    const conversionMetric = metrics.find(m => m.category === "CONVERSIÓN");
    const revenueMetric = metrics.find(m => m.category === "INGRESOS");

    const renderContent = () => {
        switch (currentView) {
            case "activity":
                return (
                    <ActivityHistory 
                        activity={data.recentActivity} 
                        onBack={() => setCurrentView("dashboard")} 
                    />
                );
            case "clients":
                return (
                    <ClientsView 
                        onBack={() => setCurrentView("dashboard")} 
                    />
                );
            case "leads":
                return (
                    <LeadsView 
                        onBack={() => setCurrentView("dashboard")} 
                    />
                );
            case "appointments":
                return (
                    <AppointmentsView 
                        onBack={() => setCurrentView("dashboard")} 
                    />
                );
            default:
                return (
                    <>
                        <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)] sm:text-3xl lg:hidden">
                            Dashboard
                        </h1>

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <div className="flex flex-[2] flex-col gap-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {growthMetric && <MetricCard metric={growthMetric} />}
                                    {conversionMetric && <MetricCard metric={conversionMetric} />}
                                </div>

                                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                                    <ConversionFunnel funnel={data.funnel} />
                                    {revenueMetric && <MetricCard metric={revenueMetric} />}
                                </div>

                                <AppointmentsTable 
                                    appointments={data.appointments} 
                                    onViewAll={() => setCurrentView("appointments")}
                                />
                            </div>

                            <div className="flex flex-1 flex-col gap-6">
                                <div className="flex-[3]">
                                    <RecentActivity 
                                        activity={data.recentActivity} 
                                        onViewAll={() => setCurrentView("activity")}
                                    />
                                </div>

                                <div className="flex-1">
                                    <ProductPerformance products={data.products} />
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar 
                user={data.user} 
                stats={data.stats} 
                currentView={currentView}
                onNavigate={(view) => setCurrentView(view as ViewType)}
            />

            <main className="flex-1 bg-[var(--background)] px-2 pb-8 pt-20 sm:px-4 lg:px-6 lg:pt-8">
                <div className="mx-auto max-w-7xl animate-in fade-in-0 duration-500">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}