// src/components/activity-history.tsx
"use client";

import { ArrowLeft, MessageCircle, ShoppingBag, UserPlus, UserCheck, Sparkles, Link2, Calendar, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ActivityItem {
    id: string;
    type: "lead" | "sale" | "client" | "contact" | "upgrade";
    title: string;
    time: string;
    amount?: string;
    via?: string;
    date?: string;
}

interface ActivityHistoryProps {
    activity: ActivityItem[];
    onBack: () => void;
}

type FilterType = "all" | "lead" | "sale" | "client" | "contact" | "upgrade";

function ActivityHistoryCard({ item }: { item: ActivityItem }) {
    const getIconData = (type: string) => {
        switch (type) {
            case "lead":
                return { 
                    icon: <MessageCircle size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-emerald-400 to-green-500",
                    label: "Lead"
                };
            case "sale":
                return { 
                    icon: <ShoppingBag size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-blue-400 to-indigo-500",
                    label: "Venta"
                };
            case "client":
                return { 
                    icon: <UserPlus size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-violet-400 to-purple-500",
                    label: "Cliente"
                };
            case "contact":
                return { 
                    icon: <UserCheck size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-amber-400 to-orange-500",
                    label: "Conversión"
                };
            case "upgrade":
                return { 
                    icon: <Sparkles size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-pink-400 to-rose-500",
                    label: "Upgrade"
                };
            default:
                return { 
                    icon: <MessageCircle size={16} className="text-white" />, 
                    bg: "bg-gradient-to-br from-gray-400 to-gray-500",
                    label: "Otro"
                };
        }
    };

    const { icon, bg, label } = getIconData(item.type);

    return (
        <div className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md">
            <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm",
                bg
            )}>
                {icon}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                            {item.title}
                        </p>
                        <Badge variant="secondary" className="text-[10px]">
                            {label}
                        </Badge>
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
                    <span className="shrink-0 whitespace-nowrap rounded-md bg-[var(--success-bg)] px-2.5 py-1.5 text-[14px] font-semibold tabular-nums text-[var(--success)]">
                        +${item.amount}
                    </span>
                )}
            </div>
        </div>
    );
}

export function ActivityHistory({ activity, onBack }: ActivityHistoryProps) {
    const [filter, setFilter] = useState<FilterType>("all");

    const filters: { key: FilterType; label: string }[] = [
        { key: "all", label: "Todos" },
        { key: "lead", label: "Leads" },
        { key: "sale", label: "Ventas" },
        { key: "client", label: "Clientes" },
        { key: "contact", label: "Conversiones" },
        { key: "upgrade", label: "Upgrades" },
    ];

    const filteredActivity = filter === "all" 
        ? activity 
        : activity.filter(item => item.type === filter);

    // Agrupar por fecha (simulado - podrías mejorar esto con fechas reales)
    const today = filteredActivity.filter(item => 
        item.time.includes("minutos") || item.time.includes("hora")
    );
    const yesterday = filteredActivity.filter(item => 
        item.time.includes("ayer") || item.time.includes("Ayer")
    );
    const older = filteredActivity.filter(item => 
        !item.time.includes("minutos") && 
        !item.time.includes("hora") && 
        !item.time.includes("ayer") &&
        !item.time.includes("Ayer")
    );

    return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={onBack}
                        className="h-10 w-10 rounded-xl"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                            Historial de Actividad
                        </h1>
                        <p className="text-[13px] text-[var(--muted-foreground)]">
                            {filteredActivity.length} actividades registradas
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden gap-2 sm:flex">
                        <Calendar size={16} />
                        Fecha
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="mb-6 p-2">
                <div className="flex flex-wrap gap-1">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={cn(
                                "rounded-lg px-3 py-2 text-[12px] font-medium transition-all duration-200 sm:text-[13px]",
                                filter === f.key
                                    ? "bg-[var(--primary)] text-white shadow-sm"
                                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60 hover:text-[var(--card-foreground)]"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Activity List */}
            <div className="space-y-6">
                {/* Hoy */}
                {today.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Hoy
                            </span>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
                            {today.map((item) => (
                                <ActivityHistoryCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Ayer */}
                {yesterday.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Ayer
                            </span>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
                            {yesterday.map((item) => (
                                <ActivityHistoryCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Anteriores */}
                {older.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Anteriores
                            </span>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
                            {older.map((item) => (
                                <ActivityHistoryCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredActivity.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)]/60">
                            <Filter size={24} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[15px] font-medium text-[var(--card-foreground)]">
                            No hay actividades
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
                            No se encontraron actividades con este filtro
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}