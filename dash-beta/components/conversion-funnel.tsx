"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FunnelData, FunnelStage as FunnelStageType } from "@/types/dashboard";

interface ConversionFunnelProps {
    funnel: FunnelData;
}

interface FunnelStageProps {
    stage: FunnelStageType;
}

type Period = "hoy" | "semana" | "mes";

function FunnelStage({ stage }: FunnelStageProps) {
    const styles = {
        light: "bg-[#f8f5ff] text-[var(--primary)]",
        medium: "bg-[#ede9fe] text-[var(--primary)]",
        dark: "bg-[var(--primary)] text-white",
    };

    return (
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
                className={cn(
                    "flex w-full items-center justify-center rounded-xl px-2 py-4 transition-all duration-300",
                    styles[stage.variant]
                )}
            >
                <span className="text-base font-bold tabular-nums sm:text-lg md:text-xl">
                    {stage.value}
                </span>
            </div>
            <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)] sm:text-[10px]">
                {stage.label}
            </span>
        </div>
    );
}

interface PercentageConnectorProps {
    percentage: string;
}

function PercentageConnector({ percentage }: PercentageConnectorProps) {
    return (
        <div className="flex shrink-0 flex-col items-center justify-end pb-6 sm:pb-7">
            <Badge
                variant="success"
                className="mb-1 whitespace-nowrap px-1.5 py-0.5 text-[9px] font-semibold shadow-sm sm:px-2 sm:text-[10px]"
            >
                {percentage}
            </Badge>
            <div className="h-6 w-px bg-gradient-to-b from-[var(--success)] to-[var(--border)] sm:h-8" />
        </div>
    );
}

function PeriodSwitch({ 
    value, 
    onChange 
}: { 
    value: Period; 
    onChange: (period: Period) => void;
}) {
    const periods: { key: Period; label: string }[] = [
        { key: "hoy", label: "Hoy" },
        { key: "semana", label: "Semana" },
        { key: "mes", label: "Mes" },
    ];

    return (
        <div className="flex rounded-lg bg-[var(--muted)]/60 p-1">
            {periods.map((period) => (
                <button
                    key={period.key}
                    onClick={() => onChange(period.key)}
                    className={cn(
                        "rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 sm:px-3 sm:text-xs",
                        value === period.key
                            ? "bg-white text-[var(--card-foreground)] shadow-sm"
                            : "text-[var(--muted-foreground)] hover:text-[var(--card-foreground)]"
                    )}
                >
                    {period.label}
                </button>
            ))}
        </div>
    );
}

export function ConversionFunnel({ funnel }: ConversionFunnelProps) {
    const [period, setPeriod] = useState<Period>("hoy");
    const { stages, connectors } = funnel;

    return (
        <Card className="flex min-w-0 flex-col overflow-hidden p-4 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] sm:p-5">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Embudo de Conversión
                </h2>
                <PeriodSwitch value={period} onChange={setPeriod} />
            </div>

            {/* Funnel */}
            <div className="mt-4 flex min-w-0 items-end gap-1.5 sm:gap-2">
                {stages.map((stage, index) => (
                    <div key={stage.id} className="contents">
                        <FunnelStage stage={stage} />
                        {index < connectors.length && (
                            <PercentageConnector percentage={connectors[index].percentage} />
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}