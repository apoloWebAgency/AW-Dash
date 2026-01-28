"use client";

import { Users, UserPlus, Link2, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect, useTransition } from "react";
import { getMetricData } from "@/lib/actions";
import { MetricData } from "@/types/metrics";

function MetricCard({ metric }: { metric: MetricData }) {
    const [period, setPeriod] = useState<"today" | "month">("today");
    const [isPending, startTransition] = useTransition();

    const currentData = metric.data[period];

    const handlePeriodChange = (newPeriod: "today" | "month") => {
        // In a real app with server actions, we might fetch specific data here.
        // Since we have all data, we just switch state, but simulate a transition/loading 
        // to match the user's request for "asking for info".
        startTransition(() => {
            setPeriod(newPeriod);
        });
    };

    const { icon, bg } = getIconData(metric.iconType);

    return (
        <Card className="flex flex-col p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] sm:p-6">
            <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {metric.category}
                </span>

                {/* Toggle Switch */}
                <div className="relative flex items-center rounded-full border border-[var(--border)] bg-transparent p-0.5">
                    <button
                        onClick={() => handlePeriodChange("today")}
                        className={cn(
                            "relative z-10 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300",
                            period === "today"
                                ? "bg-[var(--foreground)] text-white shadow-sm"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        )}
                    >
                        Hoy
                    </button>
                    <button
                        onClick={() => handlePeriodChange("month")}
                        className={cn(
                            "relative z-10 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300",
                            period === "month"
                                ? "bg-[var(--foreground)] text-white shadow-sm"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        )}
                    >
                        Mes
                    </button>
                </div>
            </div>

            <p className="mt-2 text-[15px] font-medium text-[var(--card-foreground)]">{metric.title}</p>

            <div className="mt-4 flex items-end justify-between">
                <div className={`min-w-0 flex-1 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                    <p className="text-[36px] font-semibold leading-none tracking-tight text-[var(--card-foreground)] sm:text-[42px]">
                        {currentData.value}
                    </p>

                    {currentData.trend && (
                        <p className="mt-2 flex items-center gap-1 text-[13px] text-[var(--success)]">
                            <span className="text-lg">↗</span>
                            <span>{currentData.trend}</span>
                        </p>
                    )}

                    {currentData.subtitle && !currentData.trend && (
                        <div className="mt-2">
                            <p className="text-[13px] text-[var(--muted-foreground)]">{currentData.subtitle}</p>
                            {currentData.progress !== undefined && (
                                <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-[var(--border)]">
                                    <div
                                        className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                                        style={{ width: `${currentData.progress}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all", bg)}>
                    {icon}
                </div>
            </div>
        </Card>
    );
}

const getIconData = (type: string) => {
    switch (type) {
        case "users":
            return { icon: <Users size={24} className="text-[var(--primary)]" />, bg: "bg-[#ede9fe]" };
        case "user-plus":
            return { icon: <UserPlus size={24} className="text-[var(--success)]" />, bg: "bg-[var(--success-bg)]" };
        case "link":
            return { icon: <Link2 size={24} className="text-[var(--primary)]" />, bg: "bg-[#ede9fe]" };
        default:
            return { icon: <BarChart2 size={24} className="text-[var(--primary)]" />, bg: "bg-[#ede9fe]" };
    }
};

export function MetricCards() {
    const [metrics, setMetrics] = useState<MetricData[]>([]);

    // Fetch initial data
    useEffect(() => {
        const loadMetrics = async () => {
            const data = await getMetricData();
            setMetrics(data);
        };
        loadMetrics();
    }, []);

    if (metrics.length === 0) {
        // Skeleton loading state could go here
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="flex h-48 animate-pulse flex-col p-6 shadow-sm">
                        <div className="h-4 w-20 rounded bg-gray-200"></div>
                        <div className="mt-4 h-6 w-32 rounded bg-gray-200"></div>
                        <div className="mt-auto h-10 w-24 rounded bg-gray-200"></div>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
            ))}
        </div>
    );
}
