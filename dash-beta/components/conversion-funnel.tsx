"use client";

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

function FunnelStage({ stage }: FunnelStageProps) {
    const styles = {
        light: "bg-[#f8f5ff] text-[var(--primary)]",
        medium: "bg-[#ede9fe] text-[var(--primary)]",
        dark: "bg-[var(--primary)] text-white",
    };

    const heights = {
        light: "h-24 sm:h-28 lg:h-32",
        medium: "h-20 sm:h-24 lg:h-28",
        dark: "h-16 sm:h-20 lg:h-24",
    };

    return (
        <div className="flex flex-1 flex-col items-center gap-3">
            <div
                className={cn(
                    "flex w-full items-center justify-center rounded-xl transition-all duration-300",
                    styles[stage.variant],
                    heights[stage.variant]
                )}
            >
                <span className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                    {stage.value}
                </span>
            </div>
            <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[11px]">
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
        <div className="flex flex-col items-center justify-end self-stretch pb-8 sm:pb-10">
            <Badge
                variant="success"
                className="z-10 mb-2 px-2.5 py-1 text-[11px] font-semibold shadow-sm"
            >
                {percentage}
            </Badge>
            <div className="h-14 w-px bg-gradient-to-b from-[var(--success)] to-[var(--border)] sm:h-18 lg:h-20" />
        </div>
    );
}

export function ConversionFunnel({ funnel }: ConversionFunnelProps) {
    const { stages, connectors } = funnel;

    // We need to interleave stages and connectors
    // Assuming stages.length === connectors.length + 1

    return (
        <Card className="flex flex-col p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] sm:p-6 xl:flex-[2]">
            <h2 className="text-[15px] font-semibold text-[var(--card-foreground)] sm:text-base">
                Embudo de Conversión
            </h2>

            <div className="mt-8 flex items-end gap-1 sm:mt-10 sm:gap-2">
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
