// src/components/activity-history.tsx
"use client";

import { 
    ArrowLeft, 
    MessageCircle, 
    ShoppingBag, 
    UserPlus, 
    UserCheck, 
    Sparkles, 
    Link2, 
    Calendar, 
    Filter,
    Clock,
    Zap,
    Radio,
    Flame,
    TrendingUp,
    Lightbulb,
    Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

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

interface NotificationInsightCardProps {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string;
    insight: string;
    badge?: {
        text: string;
        variant: "success" | "warning" | "info";
    };
}

function NotificationInsightCard({ 
    title, 
    value, 
    subtitle, 
    icon, 
    gradient, 
    insight,
    badge 
}: NotificationInsightCardProps) {
    const badgeStyles = {
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        info: "bg-blue-100 text-blue-700"
    };

    return (
        <Card className="relative overflow-hidden p-5">
            {/* Background gradient decoration */}
            <div className={cn(
                "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl",
                gradient
            )} />
            
            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl shadow-sm",
                        gradient
                    )}>
                        {icon}
                    </div>
                    {badge && (
                        <span className={cn(
                            "rounded-full px-2 py-1 text-[10px] font-semibold",
                            badgeStyles[badge.variant]
                        )}>
                            {badge.text}
                        </span>
                    )}
                </div>

                {/* Value */}
                <div className="mt-4">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                        {title}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                        {value}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">
                        {subtitle}
                    </p>
                </div>

                {/* Insight */}
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-[var(--muted)]/50 p-3">
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                        {insight}
                    </p>
                </div>
            </div>
        </Card>
    );
}

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

    // Calcular insights basados SOLO en datos de notificaciones
    const notificationInsights = useMemo(() => {
        // 1. Hora pico - Analizar cuándo llegan más notificaciones
        const timePatterns = activity.reduce((acc, a) => {
            if (a.time.includes("minutos")) {
                acc.lastHour++;
            } else if (a.time.includes("hora")) {
                const hours = parseInt(a.time) || 1;
                if (hours <= 3) acc.morning++;
                else if (hours <= 6) acc.afternoon++;
                else acc.evening++;
            }
            return acc;
        }, { lastHour: 0, morning: 0, afternoon: 0, evening: 0 });

        // Determinar hora pico
        let peakTime = "Mañana";
        let peakEmoji = "🌅";
        const maxTime = Math.max(timePatterns.morning, timePatterns.afternoon, timePatterns.evening, timePatterns.lastHour);
        if (maxTime === timePatterns.lastHour && timePatterns.lastHour > 0) {
            peakTime = "Ahora mismo";
            peakEmoji = "🔥";
        } else if (maxTime === timePatterns.afternoon) {
            peakTime = "Tarde";
            peakEmoji = "☀️";
        } else if (maxTime === timePatterns.evening) {
            peakTime = "Noche";
            peakEmoji = "🌙";
        }

        // 2. Frecuencia/Velocidad - Cada cuánto llega una notificación
        const recentActivity = activity.filter(a => 
            a.time.includes("minutos") || a.time.includes("hora")
        ).length;
        
        let frequency = "Baja";
        let frequencyTime = "> 2 horas";
        let frequencyBadge: "success" | "warning" | "info" = "warning";
        
        if (recentActivity >= 5) {
            frequency = "Muy Alta";
            frequencyTime = "~15 min";
            frequencyBadge = "success";
        } else if (recentActivity >= 3) {
            frequency = "Alta";
            frequencyTime = "~30 min";
            frequencyBadge = "success";
        } else if (recentActivity >= 1) {
            frequency = "Media";
            frequencyTime = "~1 hora";
            frequencyBadge = "info";
        }

        // 3. Canal dominante
        const channels = activity.reduce((acc, a) => {
            if (a.via) {
                acc[a.via] = (acc[a.via] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);
        
        const sortedChannels = Object.entries(channels).sort((a, b) => b[1] - a[1]);
        const topChannel = sortedChannels[0];
        const channelPercentage = topChannel 
            ? Math.round((topChannel[1] / activity.filter(a => a.via).length) * 100)
            : 0;

        // 4. Racha de actividad - Días consecutivos con notificaciones
        const hasToday = activity.some(a => 
            a.time.includes("minutos") || a.time.includes("hora")
        );
        const hasYesterday = activity.some(a => 
            a.time.toLowerCase().includes("ayer")
        );
        const hasOlder = activity.some(a => 
            !a.time.includes("minutos") && 
            !a.time.includes("hora") && 
            !a.time.toLowerCase().includes("ayer")
        );

        let streak = 0;
        if (hasToday) streak++;
        if (hasYesterday) streak++;
        if (hasOlder) streak += 2; // Asumimos al menos 2 días más si hay actividad anterior

        // Tipo de notificación más común
        const types = activity.reduce((acc, a) => {
            acc[a.type] = (acc[a.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const topType = Object.entries(types).sort((a, b) => b[1] - a[1])[0];

        return {
            peakTime,
            peakEmoji,
            frequency,
            frequencyTime,
            frequencyBadge,
            topChannel,
            channelPercentage,
            sortedChannels,
            streak,
            hasToday,
            topType,
            totalToday: recentActivity,
            totalNotifications: activity.length
        };
    }, [activity]);

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

    // Agrupar por fecha
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

    // Las 4 cards de insights de notificaciones
    const insightCards: NotificationInsightCardProps[] = [
        {
            title: "Hora Pico",
            value: `${notificationInsights.peakEmoji} ${notificationInsights.peakTime}`,
            subtitle: "Momento de mayor actividad",
            icon: <Clock size={20} className="text-white" />,
            gradient: "bg-gradient-to-br from-violet-400 to-purple-500",
            insight: notificationInsights.peakTime === "Ahora mismo"
                ? "¡Estás en hora pico! Es el mejor momento para estar atento y responder rápido a las oportunidades."
                : `La mayoría de tus notificaciones llegan en la ${notificationInsights.peakTime.toLowerCase()}. Programa tu disponibilidad para ese horario.`,
            badge: notificationInsights.peakTime === "Ahora mismo" 
                ? { text: "EN VIVO", variant: "success" }
                : undefined
        },
        {
            title: "Frecuencia",
            value: notificationInsights.frequency,
            subtitle: `Una notificación cada ${notificationInsights.frequencyTime}`,
            icon: <Zap size={20} className="text-white" />,
            gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
            insight: notificationInsights.frequency === "Muy Alta" || notificationInsights.frequency === "Alta"
                ? "Tu negocio tiene un flujo saludable de actividad. Mantén los canales activos que están funcionando."
                : "El flujo de notificaciones está bajo. Considera activar campañas o revisar tus fuentes de tráfico.",
            badge: { 
                text: notificationInsights.frequencyTime, 
                variant: notificationInsights.frequencyBadge 
            }
        },
        {
            title: "Canal Dominante",
            value: notificationInsights.topChannel ? notificationInsights.topChannel[0] : "Sin datos",
            subtitle: notificationInsights.topChannel 
                ? `${notificationInsights.channelPercentage}% de las notificaciones`
                : "Aún sin suficientes datos",
            icon: <Radio size={20} className="text-white" />,
            gradient: "bg-gradient-to-br from-blue-400 to-indigo-500",
            insight: notificationInsights.topChannel
                ? notificationInsights.channelPercentage > 70
                    ? `${notificationInsights.topChannel[0]} domina tu actividad. Diversifica para no depender de un solo canal.`
                    : `Buen balance de canales. ${notificationInsights.topChannel[0]} lidera pero tienes otras fuentes activas.`
                : "Conecta más canales para tener un mejor análisis de dónde vienen tus oportunidades.",
            badge: notificationInsights.topChannel 
                ? { 
                    text: `${notificationInsights.topChannel[1]} notif.`, 
                    variant: "info" 
                }
                : undefined
        },
        {
            title: "Racha Activa",
            value: `${notificationInsights.streak} días`,
            subtitle: notificationInsights.hasToday ? "Actividad confirmada hoy" : "Sin actividad hoy aún",
            icon: <Flame size={20} className="text-white" />,
            gradient: notificationInsights.streak >= 3 
                ? "bg-gradient-to-br from-emerald-400 to-green-500"
                : "bg-gradient-to-br from-gray-400 to-gray-500",
            insight: notificationInsights.streak >= 5
                ? "¡Excelente racha! Tu negocio tiene un flujo constante de actividad. Esto indica buena salud comercial."
                : notificationInsights.streak >= 3
                    ? "Buena consistencia. Mantén las acciones que están generando este flujo de notificaciones."
                    : "Tu racha es corta. Enfócate en acciones diarias que generen movimiento constante.",
            badge: notificationInsights.streak >= 3 
                ? { text: "🔥 En racha", variant: "success" }
                : { text: "Construyendo", variant: "warning" }
        }
    ];

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

            {/* Notification Insight Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {insightCards.map((card, index) => (
                    <NotificationInsightCard key={index} {...card} />
                ))}
            </div>

            {/* Quick Stats Bar */}
            <Card className="mb-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Activity size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-[var(--foreground)]">
                                Resumen de Notificaciones
                            </p>
                            <p className="text-[12px] text-[var(--muted-foreground)]">
                                {notificationInsights.totalToday} hoy · {notificationInsights.totalNotifications} totales
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {notificationInsights.sortedChannels.slice(0, 3).map(([channel, count]) => (
                            <Badge 
                                key={channel} 
                                variant="secondary"
                                className="text-[11px]"
                            >
                                {channel}: {count}
                            </Badge>
                        ))}
                        {notificationInsights.topType && (
                            <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] text-[11px]">
                                Top: {notificationInsights.topType[0] === "lead" ? "Leads" : 
                                      notificationInsights.topType[0] === "sale" ? "Ventas" :
                                      notificationInsights.topType[0] === "client" ? "Clientes" :
                                      notificationInsights.topType[0] === "contact" ? "Conversiones" : "Upgrades"}
                            </Badge>
                        )}
                    </div>
                </div>
            </Card>

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
                            <Badge variant="secondary" className="text-[10px]">
                                {today.length} notificaciones
                            </Badge>
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
                            <Badge variant="secondary" className="text-[10px]">
                                {yesterday.length} notificaciones
                            </Badge>
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
                            <Badge variant="secondary" className="text-[10px]">
                                {older.length} notificaciones
                            </Badge>
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
                            No hay notificaciones
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
                            No se encontraron notificaciones con este filtro
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}