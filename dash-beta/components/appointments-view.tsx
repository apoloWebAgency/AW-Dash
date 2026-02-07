// src/components/appointments-view.tsx
"use client";

import { useState } from "react";
import { 
    ArrowLeft, 
    Search, 
    Plus, 
    Calendar,
    Clock,
    Phone,
    Mail,
    X,
    Check,
    AlertCircle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    RefreshCw,
    Bell,
    MessageCircle,
    Users,
    UserPlus,
    TrendingDown,
    Target,
    Zap,
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    History
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// ==================== TIPOS ====================

interface Appointment {
    id: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    initials: string;
    avatarColor: string;
    service: string;
    date: string;
    time: string;
    duration: string;
    status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show";
    notes?: string;
    price?: string;
    reminderSent?: boolean;
    isRecurring?: boolean;
}

interface AppointmentsViewProps {
    onBack: () => void;
}

interface MetricCardData {
    id: string;
    category: string;
    title: string;
    iconType: string;
    data: {
        week: {
            value: string;
            subtitle?: string;
            trend?: string;
            progress?: number;
        };
        month: {
            value: string;
            subtitle?: string;
            trend?: string;
            progress?: number;
        };
    };
}

// ==================== DATOS DE EJEMPLO ====================

const mockAppointments: Appointment[] = [
    {
        id: "1",
        clientName: "Sofia Martinez",
        clientEmail: "sofia@email.com",
        clientPhone: "+54 11 1234-5678",
        initials: "SM",
        avatarColor: "bg-gradient-to-br from-violet-500 to-purple-600",
        service: "Consulta Inicial",
        date: "Hoy",
        time: "10:00",
        duration: "1 hora",
        status: "confirmed",
        price: "15.000",
        reminderSent: true,
        notes: "Primera consulta - viene por recomendación",
        isRecurring: false
    },
    {
        id: "2",
        clientName: "Pablo Gómez",
        clientEmail: "pablo@email.com",
        clientPhone: "+54 11 9876-5432",
        initials: "PG",
        avatarColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
        service: "Seguimiento",
        date: "Hoy",
        time: "14:30",
        duration: "30 min",
        status: "pending",
        price: "8.000",
        isRecurring: true
    },
    {
        id: "3",
        clientName: "María García",
        clientEmail: "maria@email.com",
        clientPhone: "+54 11 5555-1234",
        initials: "MG",
        avatarColor: "bg-gradient-to-br from-pink-500 to-rose-600",
        service: "Sesión Premium",
        date: "Hoy",
        time: "16:00",
        duration: "1.5 horas",
        status: "confirmed",
        price: "25.000",
        reminderSent: true,
        isRecurring: true
    },
    {
        id: "4",
        clientName: "Carlos López",
        clientEmail: "carlos@email.com",
        clientPhone: "+54 11 4444-5678",
        initials: "CL",
        avatarColor: "bg-gradient-to-br from-amber-500 to-orange-600",
        service: "Consulta Express",
        date: "Mañana",
        time: "09:00",
        duration: "30 min",
        status: "confirmed",
        price: "10.000",
        isRecurring: false
    },
    {
        id: "5",
        clientName: "Ana Rodríguez",
        clientEmail: "ana@email.com",
        clientPhone: "+54 11 3333-2222",
        initials: "AR",
        avatarColor: "bg-gradient-to-br from-emerald-500 to-green-600",
        service: "Seguimiento",
        date: "Mañana",
        time: "11:30",
        duration: "45 min",
        status: "pending",
        price: "12.000",
        isRecurring: true
    },
    {
        id: "6",
        clientName: "Roberto Sánchez",
        clientEmail: "roberto@email.com",
        clientPhone: "+54 11 7777-8888",
        initials: "RS",
        avatarColor: "bg-gradient-to-br from-red-500 to-pink-600",
        service: "Consulta Inicial",
        date: "Ayer",
        time: "15:00",
        duration: "1 hora",
        status: "completed",
        price: "15.000",
        isRecurring: false
    },
    {
        id: "7",
        clientName: "Laura Fernández",
        clientEmail: "laura@email.com",
        clientPhone: "+54 11 6666-5555",
        initials: "LF",
        avatarColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
        service: "Sesión Premium",
        date: "Ayer",
        time: "10:00",
        duration: "1.5 horas",
        status: "no-show",
        price: "25.000",
        notes: "No se presentó, no respondió llamadas",
        isRecurring: true
    },
    {
        id: "8",
        clientName: "Diego Torres",
        clientEmail: "diego@email.com",
        clientPhone: "+54 11 2222-1111",
        initials: "DT",
        avatarColor: "bg-gradient-to-br from-teal-500 to-cyan-600",
        service: "Consulta Express",
        date: "23/01/2025",
        time: "14:00",
        duration: "30 min",
        status: "cancelled",
        price: "10.000",
        notes: "Canceló por enfermedad, reagendar",
        isRecurring: false
    },
];

const metricsData: MetricCardData[] = [
    {
        id: "recurring",
        category: "FIDELIZACIÓN",
        title: "Recurrentes vs Nuevos",
        iconType: "users",
        data: {
            week: {
                value: "72%",
                subtitle: "18 recurrentes · 7 nuevos",
                trend: "+5% vs semana anterior"
            },
            month: {
                value: "68%",
                subtitle: "85 recurrentes · 40 nuevos",
                trend: "+3% vs mes anterior"
            }
        }
    },
    {
        id: "cancellation",
        category: "CANCELACIONES",
        title: "Tasa de Cancelación",
        iconType: "trending-down",
        data: {
            week: {
                value: "8%",
                subtitle: "2 cancelados de 25",
                trend: "-2% vs semana anterior"
            },
            month: {
                value: "12%",
                subtitle: "15 cancelados de 125",
                trend: "+1% vs mes anterior"
            }
        }
    },
    {
        id: "peak-hour",
        category: "HORARIO PICO",
        title: "Más Activo",
        iconType: "clock",
        data: {
            week: {
                value: "10-12hs",
                subtitle: "85% ocupación en ese horario"
            },
            month: {
                value: "10-12hs",
                subtitle: "82% ocupación promedio"
            }
        }
    },
    {
        id: "efficiency",
        category: "EFICIENCIA",
        title: "Ocupación de Agenda",
        iconType: "target",
        data: {
            week: {
                value: "76%",
                subtitle: "Meta: 85%",
                progress: 76
            },
            month: {
                value: "71%",
                subtitle: "Meta: 85%",
                progress: 71
            }
        }
    }
];

const statusConfig = {
    confirmed: { 
        label: "Confirmado", 
        color: "bg-green-100 text-green-700 border-green-200",
        icon: Check
    },
    pending: { 
        label: "Pendiente", 
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: Clock
    },
    cancelled: { 
        label: "Cancelado", 
        color: "bg-red-100 text-red-700 border-red-200",
        icon: X
    },
    completed: { 
        label: "Completado", 
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Check
    },
    "no-show": { 
        label: "No asistió", 
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: AlertCircle
    },
};

const services = [
    { id: "1", name: "Consulta Inicial", duration: "1 hora", price: "15.000" },
    { id: "2", name: "Seguimiento", duration: "30 min", price: "8.000" },
    { id: "3", name: "Consulta Express", duration: "30 min", price: "10.000" },
    { id: "4", name: "Sesión Premium", duration: "1.5 horas", price: "25.000" },
    { id: "5", name: "Sesión Grupal", duration: "2 horas", price: "5.000" },
];

type FilterStatus = "all" | "confirmed" | "pending" | "cancelled" | "completed" | "no-show";
type ViewTab = "upcoming" | "history";

// ==================== COMPONENTE DE MÉTRICA ====================

function AppointmentMetricCard({ metric }: { metric: MetricCardData }) {
    const [period, setPeriod] = useState<"week" | "month">("week");
    const currentData = metric.data[period];

    const getIconData = (type: string) => {
        switch (type) {
            case "users":
                return { icon: <Users size={22} className="text-violet-600" />, bg: "bg-violet-100" };
            case "trending-down":
                return { icon: <TrendingDown size={22} className="text-amber-600" />, bg: "bg-amber-100" };
            case "clock":
                return { icon: <Zap size={22} className="text-blue-600" />, bg: "bg-blue-100" };
            case "target":
                return { icon: <Target size={22} className="text-emerald-600" />, bg: "bg-emerald-100" };
            default:
                return { icon: <Users size={22} className="text-violet-600" />, bg: "bg-violet-100" };
        }
    };

    const { icon, bg } = getIconData(metric.iconType);
    
    const isNegativeMetric = metric.id === "cancellation";
    const trendColor = currentData.trend?.startsWith("-") 
        ? (isNegativeMetric ? "text-emerald-600" : "text-red-500")
        : (isNegativeMetric ? "text-red-500" : "text-emerald-600");

    return (
        <Card className="flex flex-col p-4 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)]">
            <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {metric.category}
                </span>

                <div className="flex items-center rounded-full border border-[var(--border)] bg-transparent p-0.5">
                    <button
                        onClick={() => setPeriod("week")}
                        className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300",
                            period === "week"
                                ? "bg-[var(--foreground)] text-white shadow-sm"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        )}
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => setPeriod("month")}
                        className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300",
                            period === "month"
                                ? "bg-[var(--foreground)] text-white shadow-sm"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        )}
                    >
                        Mes
                    </button>
                </div>
            </div>

            <p className="mt-1 text-[13px] font-medium text-[var(--card-foreground)]">{metric.title}</p>

            <div className="mt-3 flex items-end justify-between">
                <div className="min-w-0 flex-1">
                    <p className="text-[28px] font-bold leading-none tracking-tight text-[var(--card-foreground)]">
                        {currentData.value}
                    </p>

                    {currentData.trend && (
                        <p className={cn("mt-1.5 flex items-center gap-1 text-[11px]", trendColor)}>
                            <span>{currentData.trend.startsWith("-") ? "↘" : "↗"}</span>
                            <span>{currentData.trend}</span>
                        </p>
                    )}

                    {currentData.subtitle && !currentData.trend && (
                        <p className="mt-1.5 text-[11px] text-[var(--muted-foreground)]">
                            {currentData.subtitle}
                        </p>
                    )}

                    {currentData.progress !== undefined && (
                        <div className="mt-2">
                            <div className="flex items-center justify-between text-[10px]">
                                <span className="text-[var(--muted-foreground)]">{currentData.subtitle}</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        currentData.progress >= 80 ? "bg-emerald-500" :
                                        currentData.progress >= 60 ? "bg-amber-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${currentData.progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", bg)}>
                    {icon}
                </div>
            </div>
        </Card>
    );
}

// ==================== COMPONENTE DE TURNO ====================

function AppointmentCard({ 
    appointment, 
    onClick,
    onConfirm,
    onCancel,
    onReschedule,
    onSendReminder,
    onMarkCompleted,
    onMarkNoShow
}: { 
    appointment: Appointment;
    onClick: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    onReschedule: () => void;
    onSendReminder: () => void;
    onMarkCompleted: () => void;
    onMarkNoShow: () => void;
}) {
    const status = statusConfig[appointment.status];
    const StatusIcon = status.icon;
    const isPast = appointment.date === "Ayer" || appointment.date.includes("/");
    const isToday = appointment.date === "Hoy";

    return (
        <div className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md sm:gap-4 sm:p-4">
            <Avatar className={cn("h-10 w-10 ring-2 ring-white shadow-md sm:h-12 sm:w-12", appointment.avatarColor)}>
                <AvatarFallback className="bg-transparent text-[12px] font-semibold text-white sm:text-[14px]">
                    {appointment.initials}
                </AvatarFallback>
            </Avatar>

            <div 
                className="flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-2 sm:gap-4"
                onClick={onClick}
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                            {appointment.clientName}
                        </p>
                        {appointment.isRecurring && (
                            <Badge variant="secondary" className="hidden h-4 px-1.5 text-[8px] sm:inline-flex">
                                Recurrente
                            </Badge>
                        )}
                        {appointment.reminderSent && (
                            <Bell size={10} className="text-[var(--primary)]" />
                        )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[var(--muted-foreground)] sm:gap-x-3 sm:text-[12px]">
                        <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {appointment.time}
                        </span>
                        <span className="hidden sm:inline">{appointment.service}</span>
                        <span className="sm:hidden">{appointment.duration}</span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    {appointment.price && (
                        <p className="text-[13px] font-semibold tabular-nums text-[var(--card-foreground)]">
                            ${appointment.price}
                        </p>
                    )}
                    <span className={cn(
                        "mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        status.color
                    )}>
                        <StatusIcon size={10} />
                        {status.label}
                    </span>
                </div>
            </div>

            <span className={cn(
                "flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-medium sm:hidden",
                status.color
            )}>
                <StatusIcon size={9} />
            </span>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-lg opacity-60 transition-opacity hover:opacity-100 group-hover:opacity-100"
                    >
                        <MoreHorizontal size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem onClick={onClick} className="gap-2">
                        <Eye size={14} /> Ver detalle
                    </DropdownMenuItem>
                    
                    {!isPast && (
                        <>
                            <DropdownMenuItem className="gap-2">
                                <Edit size={14} /> Editar turno
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onReschedule} className="gap-2">
                                <RefreshCw size={14} /> Reagendar
                            </DropdownMenuItem>
                        </>
                    )}
                    
                    {appointment.status === "pending" && (
                        <DropdownMenuItem onClick={onConfirm} className="gap-2 text-green-600">
                            <Check size={14} /> Confirmar turno
                        </DropdownMenuItem>
                    )}
                    
                    {!isPast && !appointment.reminderSent && appointment.status !== "cancelled" && (
                        <DropdownMenuItem onClick={onSendReminder} className="gap-2">
                            <Bell size={14} /> Enviar recordatorio
                        </DropdownMenuItem>
                    )}
                    
                    {isToday && appointment.status === "confirmed" && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onMarkCompleted} className="gap-2 text-blue-600">
                                <Check size={14} /> Marcar completado
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onMarkNoShow} className="gap-2 text-gray-600">
                                <AlertCircle size={14} /> No se presentó
                            </DropdownMenuItem>
                        </>
                    )}
                    
                    {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onCancel} className="gap-2 text-[var(--error)]">
                                <Trash2 size={14} /> Cancelar turno
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// ==================== DETALLE DE TURNO ====================

function AppointmentDetail({ 
    appointment, 
    onBack,
    onConfirm,
    onCancel,
    onReschedule,
    onSendReminder,
    onMarkCompleted
}: { 
    appointment: Appointment; 
    onBack: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    onReschedule: () => void;
    onSendReminder: () => void;
    onMarkCompleted: () => void;
}) {
    const status = statusConfig[appointment.status];
    const StatusIcon = status.icon;
    const isPast = appointment.date === "Ayer" || appointment.date.includes("/");
    const isToday = appointment.date === "Hoy";

    return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={onBack}
                        className="h-10 w-10 rounded-xl"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div className="flex items-center gap-4">
                        <Avatar className={cn("h-14 w-14 ring-2 ring-white shadow-md", appointment.avatarColor)}>
                            <AvatarFallback className="bg-transparent text-[18px] font-semibold text-white">
                                {appointment.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                                    {appointment.clientName}
                                </h1>
                                {appointment.isRecurring && (
                                    <Badge variant="secondary" className="text-[10px]">
                                        Recurrente
                                    </Badge>
                                )}
                            </div>
                            <p className="text-[13px] text-[var(--muted-foreground)]">
                                {appointment.service}
                            </p>
                        </div>
                    </div>
                </div>
                <span className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium",
                    status.color
                )}>
                    <StatusIcon size={12} />
                    {status.label}
                </span>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Fecha
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--card-foreground)] sm:text-[15px]">
                        {appointment.date}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Hora
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--card-foreground)] sm:text-[15px]">
                        {appointment.time}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Duración
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--card-foreground)] sm:text-[15px]">
                        {appointment.duration}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Precio
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--success)] sm:text-[15px]">
                        ${appointment.price}
                    </p>
                </Card>
            </div>

            <Card className="mb-6 p-4 sm:p-5">
                <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:mb-4">
                    Información de Contacto
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)]/60 sm:h-10 sm:w-10">
                            <Mail size={16} className="text-[var(--muted-foreground)]" />
                        </div>
                        <div>
                            <p className="text-[11px] text-[var(--muted-foreground)]">Email</p>
                            <p className="text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                                {appointment.clientEmail}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)]/60 sm:h-10 sm:w-10">
                            <Phone size={16} className="text-[var(--muted-foreground)]" />
                        </div>
                        <div>
                            <p className="text-[11px] text-[var(--muted-foreground)]">Teléfono</p>
                            <p className="text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                                {appointment.clientPhone}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {appointment.notes && (
                <Card className="mb-6 p-4 sm:p-5">
                    <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:mb-3">
                        Notas
                    </h2>
                    <p className="text-[13px] text-[var(--card-foreground)] sm:text-[14px]">
                        {appointment.notes}
                    </p>
                </Card>
            )}

            <Card className="mb-6 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10",
                            appointment.reminderSent 
                                ? "bg-green-100" 
                                : "bg-[var(--muted)]/60"
                        )}>
                            <Bell size={16} className={
                                appointment.reminderSent 
                                    ? "text-green-600" 
                                    : "text-[var(--muted-foreground)]"
                            } />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                                Recordatorio
                            </p>
                            <p className="text-[11px] text-[var(--muted-foreground)] sm:text-[12px]">
                                {appointment.reminderSent 
                                    ? "Enviado correctamente" 
                                    : "No enviado aún"
                                }
                            </p>
                        </div>
                    </div>
                    {!appointment.reminderSent && !isPast && appointment.status !== "cancelled" && (
                        <Button variant="outline" size="sm" onClick={onSendReminder} className="gap-2 text-[12px]">
                            <Bell size={14} />
                            Enviar
                        </Button>
                    )}
                </div>
            </Card>

            <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="gap-2 text-[12px] sm:text-[13px]">
                    <Phone size={14} />
                    Llamar
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-[12px] sm:text-[13px]">
                    <MessageCircle size={14} />
                    WhatsApp
                </Button>
                
                {!isPast && appointment.status !== "cancelled" && (
                    <>
                        <Button variant="outline" size="sm" onClick={onReschedule} className="gap-2 text-[12px] sm:text-[13px]">
                            <RefreshCw size={14} />
                            Reagendar
                        </Button>
                        
                        {appointment.status === "pending" && (
                            <Button size="sm" onClick={onConfirm} className="gap-2 text-[12px] sm:text-[13px]">
                                <Check size={14} />
                                Confirmar
                            </Button>
                        )}
                    </>
                )}
                
                {isToday && appointment.status === "confirmed" && (
                    <Button size="sm" onClick={onMarkCompleted} className="gap-2 bg-blue-600 text-[12px] hover:bg-blue-700 sm:text-[13px]">
                        <Check size={14} />
                        Completado
                    </Button>
                )}
                
                {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                    <Button variant="outline" size="sm" onClick={onCancel} className="gap-2 text-[12px] text-[var(--error)] hover:bg-red-50 sm:text-[13px]">
                        <X size={14} />
                        Cancelar
                    </Button>
                )}
            </div>
        </div>
    );
}

// ==================== MODALES ====================

function CreateAppointmentModal({ 
    isOpen, 
    onClose 
}: { 
    isOpen: boolean; 
    onClose: () => void;
}) {
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    if (!isOpen) return null;

    const selectedServiceData = services.find(s => s.id === selectedService);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <Card className="relative z-10 max-h-[90vh] w-full max-w-lg animate-in fade-in-0 zoom-in-95 overflow-y-auto p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                        Nuevo Turno
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Cliente
                        </label>
                        <div className="mt-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Buscar cliente existente..."
                                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                            <Button variant="outline" size="sm">
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Servicio
                        </label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        >
                            <option value="">Seleccionar servicio...</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - {service.duration} - ${service.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Hora
                            </label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            >
                                <option value="">Seleccionar...</option>
                                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"].map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedServiceData && (
                        <div className="rounded-lg bg-[var(--muted)]/50 p-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[13px] font-medium text-[var(--card-foreground)]">
                                        {selectedServiceData.name}
                                    </p>
                                    <p className="text-[11px] text-[var(--muted-foreground)]">
                                        Duración: {selectedServiceData.duration}
                                    </p>
                                </div>
                                <p className="text-[15px] font-semibold text-[var(--primary)]">
                                    ${selectedServiceData.price}
                                </p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Notas (opcional)
                        </label>
                        <textarea
                            placeholder="Información adicional..."
                            rows={2}
                            className="mt-1 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="sendReminder"
                            className="h-4 w-4 rounded border-[var(--border)]"
                            defaultChecked
                        />
                        <label htmlFor="sendReminder" className="text-[12px] text-[var(--card-foreground)]">
                            Enviar recordatorio automático (24hs antes)
                        </label>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 sm:mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button className="flex-1">
                        Crear Turno
                    </Button>
                </div>
            </Card>
        </div>
    );
}

function RescheduleModal({ 
    isOpen, 
    onClose,
    appointment
}: { 
    isOpen: boolean; 
    onClose: () => void;
    appointment: Appointment | null;
}) {
    if (!isOpen || !appointment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                        Reagendar Turno
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="mb-4 flex items-center gap-3 rounded-lg bg-[var(--muted)]/50 p-3">
                    <Avatar className={cn("h-10 w-10", appointment.avatarColor)}>
                        <AvatarFallback className="bg-transparent text-[12px] font-semibold text-white">
                            {appointment.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-[13px] font-medium text-[var(--card-foreground)]">
                            {appointment.clientName}
                        </p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">
                            {appointment.service}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Nueva Fecha
                            </label>
                            <input
                                type="date"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Nueva Hora
                            </label>
                            <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]">
                                <option value="">Seleccionar...</option>
                                {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Motivo (opcional)
                        </label>
                        <textarea
                            placeholder="Ej: Solicitud del cliente..."
                            rows={2}
                            className="mt-1 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notifyClient"
                            className="h-4 w-4 rounded border-[var(--border)]"
                            defaultChecked
                        />
                        <label htmlFor="notifyClient" className="text-[12px] text-[var(--card-foreground)]">
                            Notificar al cliente por WhatsApp
                        </label>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 sm:mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button className="flex-1">
                        Reagendar
                    </Button>
                </div>
            </Card>
        </div>
    );
}

function CancelModal({ 
    isOpen, 
    onClose,
    appointment
}: { 
    isOpen: boolean; 
    onClose: () => void;
    appointment: Appointment | null;
}) {
    if (!isOpen || !appointment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <h2 className="text-lg font-semibold text-[var(--error)]">
                        Cancelar Turno
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="mb-4 flex items-center gap-3 rounded-lg bg-red-50 p-3">
                    <Avatar className={cn("h-10 w-10", appointment.avatarColor)}>
                        <AvatarFallback className="bg-transparent text-[12px] font-semibold text-white">
                            {appointment.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-[13px] font-medium text-[var(--card-foreground)]">
                            {appointment.clientName}
                        </p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">
                            {appointment.date} a las {appointment.time}
                        </p>
                    </div>
                </div>

                <p className="mb-4 text-[13px] text-[var(--muted-foreground)]">
                    ¿Estás seguro de que querés cancelar este turno?
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Motivo
                        </label>
                        <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]">
                            <option value="">Seleccionar motivo...</option>
                            <option value="client-request">Solicitud del cliente</option>
                            <option value="no-show">No se presentó</option>
                            <option value="provider-unavailable">No disponible</option>
                            <option value="other">Otro motivo</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notifyCancel"
                            className="h-4 w-4 rounded border-[var(--border)]"
                            defaultChecked
                        />
                        <label htmlFor="notifyCancel" className="text-[12px] text-[var(--card-foreground)]">
                            Notificar al cliente
                        </label>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 sm:mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Volver
                    </Button>
                    <Button variant="destructive" className="flex-1">
                        Cancelar Turno
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// ==================== COMPONENTE PRINCIPAL ====================

export function AppointmentsView({ onBack }: AppointmentsViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
    const [viewTab, setViewTab] = useState<ViewTab>("upcoming");
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToAction, setAppointmentToAction] = useState<Appointment | null>(null);

    // Filtrar turnos según la vista
    const upcomingAppointments = mockAppointments.filter(apt => 
        apt.date === "Hoy" || apt.date === "Mañana"
    );
    
    const historyAppointments = mockAppointments.filter(apt => 
        apt.date === "Ayer" || apt.date.includes("/")
    );

    const currentAppointments = viewTab === "upcoming" ? upcomingAppointments : historyAppointments;

    const filteredAppointments = currentAppointments.filter(apt => {
        const matchesSearch = 
            apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Agrupar por fecha
    const todayAppointments = filteredAppointments.filter(a => a.date === "Hoy");
    const tomorrowAppointments = filteredAppointments.filter(a => a.date === "Mañana");
    const pastAppointments = filteredAppointments.filter(a => a.date === "Ayer" || a.date.includes("/"));

    const handleConfirm = (apt: Appointment) => console.log("Confirmar:", apt.id);
    const handleReschedule = (apt: Appointment) => {
        setAppointmentToAction(apt);
        setShowRescheduleModal(true);
    };
    const handleCancel = (apt: Appointment) => {
        setAppointmentToAction(apt);
        setShowCancelModal(true);
    };
    const handleSendReminder = (apt: Appointment) => console.log("Enviar recordatorio:", apt.id);
    const handleMarkCompleted = (apt: Appointment) => console.log("Marcar completado:", apt.id);
    const handleMarkNoShow = (apt: Appointment) => console.log("Marcar no-show:", apt.id);

    if (selectedAppointment) {
        return (
            <AppointmentDetail 
                appointment={selectedAppointment} 
                onBack={() => setSelectedAppointment(null)}
                onConfirm={() => handleConfirm(selectedAppointment)}
                onCancel={() => handleCancel(selectedAppointment)}
                onReschedule={() => handleReschedule(selectedAppointment)}
                onSendReminder={() => handleSendReminder(selectedAppointment)}
                onMarkCompleted={() => handleMarkCompleted(selectedAppointment)}
            />
        );
    }

    return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={onBack}
                        className="h-9 w-9 rounded-xl sm:h-10 sm:w-10"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
                            Gestión de Turnos
                        </h1>
                        <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            Optimizá tu agenda y maximizá ingresos
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    size="sm"
                    className="gap-2"
                >
                    <Plus size={16} />
                    Nuevo Turno
                </Button>
            </div>

            {/* Métricas */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 lg:grid-cols-4 lg:gap-4">
                {metricsData.map((metric) => (
                    <AppointmentMetricCard key={metric.id} metric={metric} />
                ))}
            </div>

            {/* Tabs de Vista */}
            <div className="mb-4 flex items-center gap-2">
                <button
                    onClick={() => setViewTab("upcoming")}
                    className={cn(
                        "flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all",
                        viewTab === "upcoming"
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "bg-[var(--muted)]/60 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                    )}
                >
                    <CalendarDays size={16} />
                    Próximos
                    <Badge variant={viewTab === "upcoming" ? "secondary" : "outline"} className="ml-1 h-5 px-1.5 text-[10px]">
                        {upcomingAppointments.length}
                    </Badge>
                </button>
                <button
                    onClick={() => setViewTab("history")}
                    className={cn(
                        "flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all",
                        viewTab === "history"
                            ? "bg-[var(--primary)] text-white shadow-sm"
                            : "bg-[var(--muted)]/60 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                    )}
                >
                    <History size={16} />
                    Historial
                    <Badge variant={viewTab === "history" ? "secondary" : "outline"} className="ml-1 h-5 px-1.5 text-[10px]">
                        {historyAppointments.length}
                    </Badge>
                </button>
            </div>

            {/* Search & Filters */}
            <Card className="mb-4 p-3 sm:mb-5 sm:p-4">
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o servicio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-9 pr-4 text-[13px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-1">
                        <span className="mr-1 self-center text-[11px] text-[var(--muted-foreground)]">Estado:</span>
                        {(["all", "confirmed", "pending", "completed", "cancelled", "no-show"] as FilterStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "rounded-lg px-2 py-1 text-[11px] font-medium transition-all duration-200",
                                    statusFilter === status
                                        ? "bg-[var(--primary)] text-white shadow-sm"
                                        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60"
                                )}
                            >
                                {status === "all" ? "Todos" : statusConfig[status].label}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Lista de Turnos */}
            <div className="space-y-5">
                {/* Vista Próximos */}
                {viewTab === "upcoming" && (
                    <>
                        {todayAppointments.length > 0 && (
                            <div>
                                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[11px]">
                                        Hoy
                                    </span>
                                    <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                                        {todayAppointments.length}
                                    </Badge>
                                    <div className="h-px flex-1 bg-[var(--border)]" />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {todayAppointments.map((apt) => (
                                        <AppointmentCard 
                                            key={apt.id} 
                                            appointment={apt}
                                            onClick={() => setSelectedAppointment(apt)}
                                            onConfirm={() => handleConfirm(apt)}
                                            onCancel={() => handleCancel(apt)}
                                            onReschedule={() => handleReschedule(apt)}
                                            onSendReminder={() => handleSendReminder(apt)}
                                            onMarkCompleted={() => handleMarkCompleted(apt)}
                                            onMarkNoShow={() => handleMarkNoShow(apt)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {tomorrowAppointments.length > 0 && (
                            <div>
                                <div className="mb-2 flex items-center gap-2 sm:mb-3">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[11px]">
                                        Mañana
                                    </span>
                                    <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                                        {tomorrowAppointments.length}
                                    </Badge>
                                    <div className="h-px flex-1 bg-[var(--border)]" />
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {tomorrowAppointments.map((apt) => (
                                        <AppointmentCard 
                                            key={apt.id} 
                                            appointment={apt}
                                            onClick={() => setSelectedAppointment(apt)}
                                            onConfirm={() => handleConfirm(apt)}
                                            onCancel={() => handleCancel(apt)}
                                            onReschedule={() => handleReschedule(apt)}
                                            onSendReminder={() => handleSendReminder(apt)}
                                            onMarkCompleted={() => handleMarkCompleted(apt)}
                                            onMarkNoShow={() => handleMarkNoShow(apt)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Vista Historial */}
                {viewTab === "history" && pastAppointments.length > 0 && (
                    <div>
                        <div className="mb-2 flex items-center gap-2 sm:mb-3">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[11px]">
                                Turnos Anteriores
                            </span>
                            <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                                {pastAppointments.length}
                            </Badge>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {pastAppointments.map((apt) => (
                                <AppointmentCard 
                                    key={apt.id} 
                                    appointment={apt}
                                    onClick={() => setSelectedAppointment(apt)}
                                    onConfirm={() => handleConfirm(apt)}
                                    onCancel={() => handleCancel(apt)}
                                    onReschedule={() => handleReschedule(apt)}
                                    onSendReminder={() => handleSendReminder(apt)}
                                    onMarkCompleted={() => handleMarkCompleted(apt)}
                                    onMarkNoShow={() => handleMarkNoShow(apt)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredAppointments.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--muted)]/60 sm:mb-4 sm:h-16 sm:w-16">
                            <Calendar size={22} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[14px] font-medium text-[var(--card-foreground)] sm:text-[15px]">
                            {viewTab === "upcoming" ? "No hay turnos próximos" : "No hay turnos en el historial"}
                        </p>
                        <p className="mt-1 text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            {viewTab === "upcoming" 
                                ? "Creá un nuevo turno para empezar" 
                                : "Los turnos completados aparecerán aquí"
                            }
                        </p>
                        {viewTab === "upcoming" && (
                            <Button 
                                onClick={() => setShowCreateModal(true)}
                                size="sm"
                                className="mt-4 gap-2"
                            >
                                <Plus size={14} />
                                Crear Turno
                            </Button>
                        )}
                    </Card>
                )}
            </div>

            {/* Modales */}
            <CreateAppointmentModal 
                isOpen={showCreateModal} 
                onClose={() => setShowCreateModal(false)} 
            />
            <RescheduleModal 
                isOpen={showRescheduleModal} 
                onClose={() => {
                    setShowRescheduleModal(false);
                    setAppointmentToAction(null);
                }}
                appointment={appointmentToAction}
            />
            <CancelModal 
                isOpen={showCancelModal} 
                onClose={() => {
                    setShowCancelModal(false);
                    setAppointmentToAction(null);
                }}
                appointment={appointmentToAction}
            />
        </div>
    );
}