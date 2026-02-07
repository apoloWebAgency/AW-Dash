// src/components/leads-view.tsx
"use client";

import { useState } from "react";
import { 
    ArrowLeft, 
    Search, 
    Plus, 
    UserPlus, 
    Phone, 
    Mail, 
    MessageCircle,
    ChevronRight,
    X,
    Tag,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Target,
    Zap,
    Instagram,
    Globe,
    Share2,
    BarChart3,
    Percent
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==================== TIPOS ====================

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    source: string;
    createdAt: string;
    status: "new" | "contacted" | "qualified" | "converted" | "lost";
    interests: Interest[];
    notes?: string;
}

interface Interest {
    id: string;
    service: string;
    date: string;
    message?: string;
    channel: "whatsapp" | "web" | "email" | "instagram";
}

interface LeadsViewProps {
    onBack: () => void;
}

interface LeadMetricData {
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
            isNegative?: boolean;
        };
        month: {
            value: string;
            subtitle?: string;
            trend?: string;
            progress?: number;
            isNegative?: boolean;
        };
    };
}

// ==================== DATOS DE EJEMPLO ====================

const mockLeads: Lead[] = [
    {
        id: "1",
        name: "Laura Fernández",
        email: "laura@email.com",
        phone: "+54 11 2222-3333",
        source: "WhatsApp",
        createdAt: "Hace 5 minutos",
        status: "new",
        interests: [
            { id: "i1", service: "Plan Premium", date: "Hace 5 minutos", message: "Hola, me gustaría saber más sobre el plan premium...", channel: "whatsapp" },
        ]
    },
    {
        id: "2",
        name: "Diego Rodríguez",
        email: "diego@email.com",
        phone: "+54 11 4444-5555",
        source: "Landing Page",
        createdAt: "Hace 2 horas",
        status: "contacted",
        interests: [
            { id: "i2", service: "Curso Avanzado", date: "Hace 2 horas", message: "Quiero información del curso", channel: "web" },
            { id: "i3", service: "Consultoría", date: "Hace 1 hora", message: "También me interesa la consultoría", channel: "whatsapp" },
        ]
    },
    {
        id: "3",
        name: "Valentina Torres",
        email: "vale@email.com",
        phone: "+54 11 6666-7777",
        source: "Instagram",
        createdAt: "Hace 1 día",
        status: "qualified",
        interests: [
            { id: "i4", service: "Plan Enterprise", date: "Hace 1 día", message: "Necesito una solución para mi empresa", channel: "instagram" },
            { id: "i5", service: "Integración API", date: "Hace 12 horas", channel: "email" },
        ],
        notes: "Cliente potencial para plan enterprise. Tiene una empresa de 50 empleados."
    },
    {
        id: "4",
        name: "Martín Gómez",
        email: "martin@email.com",
        phone: "+54 11 8888-9999",
        source: "Referido",
        createdAt: "Hace 3 días",
        status: "converted",
        interests: [
            { id: "i6", service: "Plan Básico", date: "Hace 3 días", channel: "whatsapp" },
        ]
    },
    {
        id: "5",
        name: "Sofía Ruiz",
        email: "sofia@email.com",
        phone: "+54 11 1111-0000",
        source: "Google Ads",
        createdAt: "Hace 1 semana",
        status: "lost",
        interests: [
            { id: "i7", service: "Curso Básico", date: "Hace 1 semana", channel: "web" },
        ],
        notes: "No respondió después de 3 intentos de contacto."
    },
    {
        id: "6",
        name: "Carolina Méndez",
        email: "caro@email.com",
        phone: "+54 11 3333-4444",
        source: "Instagram",
        createdAt: "Hace 30 minutos",
        status: "new",
        interests: [
            { id: "i8", service: "Consultoría", date: "Hace 30 minutos", message: "Vi tu publicación y me interesa", channel: "instagram" },
        ]
    },
    {
        id: "7",
        name: "Fernando López",
        email: "fer@email.com",
        phone: "+54 11 5555-6666",
        source: "WhatsApp",
        createdAt: "Hace 4 horas",
        status: "contacted",
        interests: [
            { id: "i9", service: "Plan Premium", date: "Hace 4 horas", channel: "whatsapp" },
        ]
    },
];

const leadMetrics: LeadMetricData[] = [
    {
        id: "total-leads",
        category: "LEADS NUEVOS",
        title: "Entraron esta semana",
        iconType: "users",
        data: {
            week: {
                value: "23",
                subtitle: "vs 18 semana anterior",
                trend: "+28%"
            },
            month: {
                value: "87",
                subtitle: "vs 72 mes anterior",
                trend: "+21%"
            }
        }
    },
    {
        id: "conversion-rate",
        category: "CONVERSIÓN",
        title: "Leads → Clientes",
        iconType: "target",
        data: {
            week: {
                value: "32%",
                subtitle: "7 de 23 convertidos",
                progress: 32
            },
            month: {
                value: "28%",
                subtitle: "24 de 87 convertidos",
                progress: 28
            }
        }
    },
    {
        id: "best-source",
        category: "MEJOR CANAL",
        title: "Más leads de",
        iconType: "source",
        data: {
            week: {
                value: "WhatsApp",
                subtitle: "42% de los leads (10)",
            },
            month: {
                value: "Instagram",
                subtitle: "38% de los leads (33)",
            }
        }
    },
    {
        id: "response-time",
        category: "TIEMPO RESPUESTA",
        title: "Promedio de atención",
        iconType: "clock",
        data: {
            week: {
                value: "12 min",
                trend: "-25%",
                subtitle: "Meta: <15 min ✓"
            },
            month: {
                value: "18 min",
                trend: "-10%",
                subtitle: "Meta: <15 min"
            }
        }
    }
];

const statusConfig = {
    new: { label: "Nuevo", color: "bg-blue-100 text-blue-700", icon: UserPlus },
    contacted: { label: "Contactado", color: "bg-amber-100 text-amber-700", icon: Phone },
    qualified: { label: "Calificado", color: "bg-purple-100 text-purple-700", icon: CheckCircle },
    converted: { label: "Convertido", color: "bg-green-100 text-green-700", icon: CheckCircle },
    lost: { label: "Perdido", color: "bg-red-100 text-red-700", icon: XCircle },
};

const channelIcons = {
    whatsapp: "🟢",
    web: "🌐",
    email: "📧",
    instagram: "📸",
};

const sourceColors: Record<string, string> = {
    "WhatsApp": "bg-green-100 text-green-700",
    "Instagram": "bg-pink-100 text-pink-700",
    "Landing Page": "bg-blue-100 text-blue-700",
    "Google Ads": "bg-amber-100 text-amber-700",
    "Referido": "bg-purple-100 text-purple-700",
};

// ==================== COMPONENTE DE MÉTRICA ====================

function LeadMetricCard({ metric }: { metric: LeadMetricData }) {
    const [period, setPeriod] = useState<"week" | "month">("week");
    const currentData = metric.data[period];

    const getIconData = (type: string) => {
        switch (type) {
            case "users":
                return { icon: <UserPlus size={22} className="text-blue-600" />, bg: "bg-blue-100" };
            case "target":
                return { icon: <Target size={22} className="text-emerald-600" />, bg: "bg-emerald-100" };
            case "source":
                return { icon: <Share2 size={22} className="text-pink-600" />, bg: "bg-pink-100" };
            case "clock":
                return { icon: <Zap size={22} className="text-amber-600" />, bg: "bg-amber-100" };
            default:
                return { icon: <BarChart3 size={22} className="text-violet-600" />, bg: "bg-violet-100" };
        }
    };

    const { icon, bg } = getIconData(metric.iconType);
    
    // Para tiempo de respuesta, menos es mejor
    const isTimeMetric = metric.id === "response-time";
    const trendColor = currentData.trend?.startsWith("-") 
        ? (isTimeMetric ? "text-emerald-600" : "text-red-500")
        : (isTimeMetric ? "text-red-500" : "text-emerald-600");

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
                            <TrendingUp size={12} className={currentData.trend.startsWith("-") ? "rotate-180" : ""} />
                            <span>{currentData.trend}</span>
                        </p>
                    )}

                    {currentData.subtitle && !currentData.trend && (
                        <p className="mt-1.5 text-[11px] text-[var(--muted-foreground)]">
                            {currentData.subtitle}
                        </p>
                    )}

                    {currentData.trend && currentData.subtitle && (
                        <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                            {currentData.subtitle}
                        </p>
                    )}

                    {currentData.progress !== undefined && (
                        <div className="mt-2">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        currentData.progress >= 30 ? "bg-emerald-500" :
                                        currentData.progress >= 20 ? "bg-amber-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${Math.min(currentData.progress * 2, 100)}%` }}
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

// ==================== COMPONENTES DE LEAD ====================

function LeadCard({ 
    lead, 
    onClick 
}: { 
    lead: Lead; 
    onClick: () => void;
}) {
    const status = statusConfig[lead.status];
    const sourceColor = sourceColors[lead.source] || "bg-gray-100 text-gray-700";
    const isHot = lead.status === "new" && lead.createdAt.includes("minutos");

    return (
        <div 
            onClick={onClick}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md sm:gap-4 sm:p-4"
        >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-[14px] font-semibold text-white shadow-sm sm:h-12 sm:w-12 sm:text-[16px]">
                {lead.name.split(" ").map(n => n[0]).join("")}
                {isHot && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                        <Zap size={10} className="text-white" />
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                            {lead.name}
                        </p>
                        <span className={cn(
                            "hidden rounded-full px-2 py-0.5 text-[9px] font-medium sm:inline-flex sm:text-[10px]",
                            status.color
                        )}>
                            {status.label}
                        </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[var(--muted-foreground)] sm:gap-x-3 sm:text-[12px]">
                        <span className="flex items-center gap-1">
                            <Tag size={10} />
                            {lead.interests[0]?.service || "Sin interés"}
                        </span>
                        <span className="hidden items-center gap-1 sm:flex">
                            <Clock size={10} />
                            {lead.createdAt}
                        </span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    <span className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                        sourceColor
                    )}>
                        {lead.source}
                    </span>
                    <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
                        {lead.interests.length} interacción{lead.interests.length !== 1 ? "es" : ""}
                    </p>
                </div>

                <div className="flex items-center gap-1 sm:hidden">
                    <span className={cn(
                        "rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                        status.color
                    )}>
                        {status.label.slice(0, 3)}
                    </span>
                </div>

                <ChevronRight size={16} className="shrink-0 text-[var(--muted-foreground)]" />
            </div>
        </div>
    );
}

function LeadDetail({ 
    lead, 
    onBack 
}: { 
    lead: Lead; 
    onBack: () => void;
}) {
    const status = statusConfig[lead.status];
    const sourceColor = sourceColors[lead.source] || "bg-gray-100 text-gray-700";

    return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={onBack}
                        className="h-9 w-9 rounded-xl sm:h-10 sm:w-10"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-[16px] font-semibold text-white shadow-sm sm:h-14 sm:w-14 sm:text-[18px]">
                            {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
                                {lead.name}
                            </h1>
                            <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                                Lead desde {lead.createdAt}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-medium sm:text-[11px]",
                        status.color
                    )}>
                        {status.label}
                    </span>
                    <span className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-medium sm:text-[10px]",
                        sourceColor
                    )}>
                        {lead.source}
                    </span>
                </div>
            </div>

            {/* Info Cards */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 sm:grid-cols-4 sm:gap-4">
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Origen
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--card-foreground)] sm:text-[15px]">
                        {lead.source}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Interacciones
                    </p>
                    <p className="mt-1 text-lg font-bold text-[var(--card-foreground)] sm:text-xl">
                        {lead.interests.length}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Email
                    </p>
                    <p className="mt-1 truncate text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                        {lead.email}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Teléfono
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                        {lead.phone}
                    </p>
                </Card>
            </div>

            {/* Notes */}
            {lead.notes && (
                <Card className="mb-5 p-4 sm:mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Notas
                    </p>
                    <p className="mt-2 text-[13px] text-[var(--card-foreground)] sm:text-[14px]">
                        {lead.notes}
                    </p>
                </Card>
            )}

            {/* Interest History */}
            <Card className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Historial de Intereses
                    </h2>
                    <Badge variant="secondary" className="text-[10px]">
                        {lead.interests.length} consulta{lead.interests.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    {lead.interests.map((interest) => (
                        <div 
                            key={interest.id}
                            className="rounded-lg border border-[var(--border)] p-2.5 sm:p-3"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 sm:h-9 sm:w-9">
                                        <MessageCircle size={14} className="text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                                                {interest.service}
                                            </p>
                                            <span className="text-[11px]">
                                                {channelIcons[interest.channel]}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[var(--muted-foreground)] sm:text-[12px]">
                                            {interest.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {interest.message && (
                                <div className="mt-2 rounded-lg bg-[var(--muted)]/50 p-2.5 sm:mt-3 sm:p-3">
                                    <p className="text-[12px] italic text-[var(--muted-foreground)] sm:text-[13px]">
                                        "{interest.message}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <Phone size={14} />
                    Llamar
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <MessageCircle size={14} />
                    WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <Mail size={14} />
                    Email
                </Button>
                {lead.status !== "converted" && lead.status !== "lost" && (
                    <Button size="sm" className="gap-2 text-[12px]">
                        <CheckCircle size={14} />
                        Convertir a Cliente
                    </Button>
                )}
            </div>
        </div>
    );
}

// ==================== MODAL ====================

function CreateLeadModal({ 
    isOpen, 
    onClose 
}: { 
    isOpen: boolean; 
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <Card className="relative z-10 max-h-[90vh] w-full max-w-md animate-in fade-in-0 zoom-in-95 overflow-y-auto p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                        Nuevo Lead
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="email@ejemplo.com"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                placeholder="+54 11 1234-5678"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Servicio de interés
                        </label>
                        <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]">
                            <option value="">Seleccionar...</option>
                            <option value="plan-basico">Plan Básico</option>
                            <option value="plan-premium">Plan Premium</option>
                            <option value="plan-enterprise">Plan Enterprise</option>
                            <option value="consultoria">Consultoría</option>
                            <option value="curso">Curso</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Origen
                        </label>
                        <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]">
                            <option value="">Seleccionar...</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="web">Sitio Web</option>
                            <option value="instagram">Instagram</option>
                            <option value="referido">Referido</option>
                            <option value="google">Google Ads</option>
                        </select>
                    </div>
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
                </div>

                <div className="mt-5 flex gap-3 sm:mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button className="flex-1">
                        Crear Lead
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// ==================== COMPONENTE PRINCIPAL ====================

type FilterStatus = "all" | "new" | "contacted" | "qualified" | "converted" | "lost";

export function LeadsView({ onBack }: LeadsViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const filteredLeads = mockLeads.filter(lead => {
        const matchesSearch = 
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone.includes(searchQuery) ||
            lead.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.interests.some(i => i.service.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Ordenar: nuevos primero, luego por fecha
    const sortedLeads = [...filteredLeads].sort((a, b) => {
        if (a.status === "new" && b.status !== "new") return -1;
        if (a.status !== "new" && b.status === "new") return 1;
        return 0;
    });

    if (selectedLead) {
        return (
            <LeadDetail 
                lead={selectedLead} 
                onBack={() => setSelectedLead(null)} 
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
                            Gestión de Leads
                        </h1>
                        <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            Convertí consultas en clientes
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    size="sm"
                    className="gap-2"
                >
                    <Plus size={16} />
                    Nuevo Lead
                </Button>
            </div>

            {/* Métricas */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 lg:grid-cols-4 lg:gap-4">
                {leadMetrics.map((metric) => (
                    <LeadMetricCard key={metric.id} metric={metric} />
                ))}
            </div>

            {/* Search & Filters */}
            <Card className="mb-4 p-3 sm:mb-5 sm:p-4">
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email, origen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-9 pr-4 text-[13px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-1">
                        {(["all", "new", "contacted", "qualified", "converted", "lost"] as FilterStatus[]).map((status) => (
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

            {/* Leads List */}
            <div className="space-y-2 sm:space-y-3">
                {sortedLeads.map((lead) => (
                    <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        onClick={() => setSelectedLead(lead)}
                    />
                ))}

                {sortedLeads.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--muted)]/60 sm:mb-4 sm:h-16 sm:w-16">
                            <UserPlus size={22} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[14px] font-medium text-[var(--card-foreground)] sm:text-[15px]">
                            No se encontraron leads
                        </p>
                        <p className="mt-1 text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            Intentá con otros términos de búsqueda
                        </p>
                    </Card>
                )}
            </div>

            {/* Create Modal */}
            <CreateLeadModal 
                isOpen={showCreateModal} 
                onClose={() => setShowCreateModal(false)} 
            />
        </div>
    );
}