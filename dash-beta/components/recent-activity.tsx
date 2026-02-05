// src/components/recent-activity.tsx
"use client";

import { SlidersHorizontal, MessageCircle, UserPlus, Link2, ChevronRight, ShoppingBag, UserCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActivityItem {
    id: string;
    type: "lead" | "sale" | "client" | "contact" | "upgrade";
    title: string;
    time: string;
    amount?: string;
    via?: string;
}

interface RecentActivityProps {
    activity: ActivityItem[];
    onViewAll?: () => void;
}

function ActivityCard({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
    const getIconData = (type: string) => {
        switch (type) {
            case "lead":
                return { 
                    icon: <MessageCircle size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-emerald-400 to-green-500" 
                };
            case "sale":
                return { 
                    icon: <ShoppingBag size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-blue-400 to-indigo-500" 
                };
            case "client":
                return { 
                    icon: <UserPlus size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-violet-400 to-purple-500" 
                };
            case "contact":
                return { 
                    icon: <UserCheck size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-amber-400 to-orange-500" 
                };
            case "upgrade":
                return { 
                    icon: <Sparkles size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-pink-400 to-rose-500" 
                };
            default:
                return { 
                    icon: <MessageCircle size={14} className="text-white" />, 
                    bg: "bg-gradient-to-br from-gray-400 to-gray-500" 
                };
        }
    };

    const { icon, bg } = getIconData(item.type);

    return (
        <>
            <div className="group relative flex items-start gap-3 py-3">
                <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
                    bg
                )}>
                    {icon}
                </div>

                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                {item.title}
                            </p>
                            {item.via && (
                                <span className="flex items-center gap-1 rounded-md bg-[var(--muted)]/80 px-1.5 py-0.5 text-[11px] text-[var(--muted-foreground)]">
                                    <Link2 size={10} />
                                    {item.via}
                                </span>
                            )}
                        </div>
                        <p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">
                            {item.time}
                        </p>
                    </div>
                    
                    {item.amount && (
                        <span className="shrink-0 whitespace-nowrap rounded-md bg-[var(--success-bg)] px-2 py-1 text-[13px] font-semibold tabular-nums text-[var(--success)]">
                            +${item.amount}
                        </span>
                    )}
                </div>
            </div>
            
            {!isLast && (
                <div className="ml-11 border-b border-[var(--border)]" />
            )}
        </>
    );
}

export function RecentActivity({ activity, onViewAll }: RecentActivityProps) {
    const limitedActivity = activity.slice(0, 5);

    return (
        <TooltipProvider>
            <Card className="flex h-full flex-col overflow-hidden p-0 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)]">
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
                            Leads y ventas en tiempo real
                        </p>
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                                <SlidersHorizontal size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Filtrar</TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex-1 overflow-y-auto px-5 sm:px-6">
                    {limitedActivity.map((item, index) => (
                        <ActivityCard
                            key={item.id}
                            item={item}
                            isLast={index === limitedActivity.length - 1}
                        />
                    ))}
                </div>

                <div className="border-t border-[var(--border)] p-4">
                    <Button 
                        variant="ghost" 
                        className="w-full gap-2 text-[13px] text-[var(--primary)]"
                        onClick={onViewAll}
                    >
                        Ver toda la actividad
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </Card>
        </TooltipProvider>
    );
}