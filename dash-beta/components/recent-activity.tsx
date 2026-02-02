"use client";

import { SlidersHorizontal, Wallet, MessageCircle, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ActivityItem } from "@/types/dashboard";

interface RecentActivityProps {
    activity: ActivityItem[];
}

function ActivityCard({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
    const getIconData = (type: string) => {
        switch (type) {
            case "lead":
                return { icon: <MessageCircle size={18} className="text-white" />, bg: "bg-gradient-to-br from-emerald-400 to-green-500" };
            case "sale":
                return { icon: <Wallet size={18} className="text-white" />, bg: "bg-gradient-to-br from-blue-400 to-indigo-500" };
            default:
                return { icon: <MessageCircle size={18} className="text-white" />, bg: "bg-gradient-to-br from-gray-400 to-gray-500" };
        }
    };

    const { icon, bg } = getIconData(item.type);

    return (
        <div className="group relative flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
                {/* Icon */}
                <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ring-4 ring-white",
                    bg
                )}>
                    {icon}
                </div>
                {/* Line */}
                {!isLast && (
                    <div className="mt-3 h-full w-0.5 rounded-full bg-gradient-to-b from-[var(--border)] via-[var(--border)] to-transparent" />
                )}
            </div>

            {/* Content Card */}
            <div className={cn(
                "mb-6 flex-1 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm transition-all duration-200",
                "hover:border-[var(--primary)]/20 hover:shadow-md"
            )}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-[14px] font-semibold text-[var(--card-foreground)]">{item.title}</p>
                        <p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">{item.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                        <ChevronRight size={16} />
                    </Button>
                </div>

                {/* Description */}
                {item.description && (
                    <div className="mt-3 rounded-xl bg-[var(--muted)]/60 p-3">
                        <p className="line-clamp-2 text-[13px] italic text-[var(--muted-foreground)]">
                            {item.description}
                        </p>
                    </div>
                )}

                {/* Tags */}
                {item.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium"
                            >
                                {tag.includes("IA") && <Zap size={10} />}
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Amount */}
                {item.amount && (
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-[var(--success-bg)] to-[var(--success-bg)]/50 p-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={18} className="text-[var(--success)]" />
                            <span className="text-xl font-bold text-[var(--success)]">{item.amount}</span>
                        </div>
                        {item.badge && (
                            <Badge variant="success" className="px-3 py-1 text-[11px] font-semibold shadow-sm">
                                ✓ {item.badge}
                            </Badge>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export function RecentActivity({ activity }: RecentActivityProps) {
    return (
        <TooltipProvider>
            <Card className="flex h-full flex-col overflow-hidden p-0 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)]">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-[var(--border)] bg-gradient-to-r from-[var(--card)] to-[var(--muted)]/30 p-5 sm:p-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-[17px] font-semibold text-[var(--card-foreground)]">
                                Actividad Reciente
                            </h2>
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                            </span>
                        </div>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
                            Flujo en tiempo real de Leads y Ventas
                        </p>
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                                <SlidersHorizontal size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Filtrar actividad</TooltipContent>
                    </Tooltip>
                </div>

                {/* Activity Timeline */}
                <div className="flex-1 p-5 sm:p-6">
                    {activity.map((item, index) => (
                        <ActivityCard
                            key={item.id}
                            item={item}
                            isLast={index === activity.length - 1}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--border)] p-4">
                    <Button variant="ghost" className="w-full gap-2 text-[13px] text-[var(--primary)]">
                        Ver toda la actividad
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </Card>
        </TooltipProvider>
    );
}
