// src/components/clients-view.tsx
"use client";

import { useState } from "react";
import { 
    ArrowLeft, 
    Search, 
    Plus, 
    Filter, 
    Users, 
    Phone, 
    Mail, 
    Calendar,
    ShoppingBag,
    ChevronRight,
    X,
    DollarSign,
    TrendingUp,
    UserCheck,
    Repeat,
    Crown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==================== TIPOS ====================

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    dni: string;
    createdAt: string;
    totalPurchases: number;
    totalSpent: string;
    lastPurchase?: string;
    status: "active" | "inactive";
    purchases: Purchase[];
}

interface Purchase {
    id: string;
    product: string;
    amount: string;
    date: string;
    status: "completed" | "pending" | "refunded";
}

interface ClientsViewProps {
    onBack: () => void;
}

interface ClientMetricData {
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

const mockClients: Client[] = [
    {
        id: "1",
        name: "María García",
        email: "maria@email.com",
        phone: "+54 11 1234-5678",
        dni: "30.456.789",
        createdAt: "Hace 2 días",
        totalPurchases: 5,
        totalSpent: "450.000",
        lastPurchase: "Plan Premium",
        status: "active",
        purchases: [
            { id: "p1", product: "Plan Premium", amount: "150.000", date: "Hace 2 días", status: "completed" },
            { id: "p2", product: "Curso Avanzado", amount: "85.000", date: "Hace 1 semana", status: "completed" },
            { id: "p3", product: "Consultoría", amount: "120.000", date: "Hace 2 semanas", status: "completed" },
            { id: "p4", product: "Plan Básico", amount: "50.000", date: "Hace 1 mes", status: "completed" },
            { id: "p5", product: "Ebook", amount: "45.000", date: "Hace 2 meses", status: "completed" },
        ]
    },
    {
        id: "2",
        name: "Carlos López",
        email: "carlos@email.com",
        phone: "+54 11 9876-5432",
        dni: "28.123.456",
        createdAt: "Hace 1 semana",
        totalPurchases: 2,
        totalSpent: "180.000",
        lastPurchase: "Curso Básico",
        status: "active",
        purchases: [
            { id: "p6", product: "Curso Básico", amount: "80.000", date: "Hace 1 semana", status: "completed" },
            { id: "p7", product: "Ebook Pack", amount: "100.000", date: "Hace 2 semanas", status: "completed" },
        ]
    },
    {
        id: "3",
        name: "Ana Martínez",
        email: "ana@email.com",
        phone: "+54 11 5555-1234",
        dni: "35.789.012",
        createdAt: "Hace 3 días",
        totalPurchases: 1,
        totalSpent: "299.000",
        lastPurchase: "Plan Enterprise",
        status: "active",
        purchases: [
            { id: "p8", product: "Plan Enterprise", amount: "299.000", date: "Hace 3 días", status: "completed" },
        ]
    },
    {
        id: "4",
        name: "Roberto Sánchez",
        email: "roberto@email.com",
        phone: "+54 11 4444-5678",
        dni: "32.456.123",
        createdAt: "Hace 1 mes",
        totalPurchases: 3,
        totalSpent: "95.500",
        status: "inactive",
        purchases: [
            { id: "p9", product: "Consultoría Express", amount: "45.000", date: "Hace 1 mes", status: "completed" },
            { id: "p10", product: "Ebook", amount: "25.500", date: "Hace 2 meses", status: "completed" },
            { id: "p11", product: "Webinar VIP", amount: "25.000", date: "Hace 3 meses", status: "completed" },
        ]
    },
    {
        id: "5",
        name: "Laura Fernández",
        email: "laura@email.com",
        phone: "+54 11 6666-7777",
        dni: "29.876.543",
        createdAt: "Hace 2 semanas",
        totalPurchases: 4,
        totalSpent: "320.000",
        lastPurchase: "Consultoría Premium",
        status: "active",
        purchases: [
            { id: "p12", product: "Consultoría Premium", amount: "180.000", date: "Hace 2 semanas", status: "completed" },
            { id: "p13", product: "Curso Avanzado", amount: "85.000", date: "Hace 1 mes", status: "completed" },
            { id: "p14", product: "Ebook Pack", amount: "35.000", date: "Hace 2 meses", status: "completed" },
            { id: "p15", product: "Webinar", amount: "20.000", date: "Hace 3 meses", status: "completed" },
        ]
    },
];

const clientMetrics: ClientMetricData[] = [
    {
        id: "total-clients",
        category: "CARTERA",
        title: "Total de Clientes",
        iconType: "users",
        data: {
            week: {
                value: "127",
                subtitle: "3 nuevos esta semana",
                trend: "+2.4%"
            },
            month: {
                value: "127",
                subtitle: "12 nuevos este mes",
                trend: "+10.5%"
            }
        }
    },
    {
        id: "avg-ticket",
        category: "TICKET PROMEDIO",
        title: "Valor por Cliente",
        iconType: "dollar",
        data: {
            week: {
                value: "$85.400",
                trend: "+8%"
            },
            month: {
                value: "$78.200",
                trend: "+5%"
            }
        }
    },
    {
        id: "retention",
        category: "RETENCIÓN",
        title: "Clientes que Repiten",
        iconType: "repeat",
        data: {
            week: {
                value: "68%",
                subtitle: "86 de 127 vuelven",
                progress: 68
            },
            month: {
                value: "72%",
                subtitle: "91 de 127 vuelven",
                progress: 72
            }
        }
    },
    {
        id: "top-clients",
        category: "TOP CLIENTES",
        title: "Alto Valor (VIP)",
        iconType: "crown",
        data: {
            week: {
                value: "18",
                subtitle: "Gastan +$200.000"
            },
            month: {
                value: "23",
                subtitle: "Gastan +$200.000"
            }
        }
    }
];

// ==================== COMPONENTE DE MÉTRICA ====================

function ClientMetricCard({ metric }: { metric: ClientMetricData }) {
    const [period, setPeriod] = useState<"week" | "month">("week");
    const currentData = metric.data[period];

    const getIconData = (type: string) => {
        switch (type) {
            case "users":
                return { icon: <Users size={22} className="text-violet-600" />, bg: "bg-violet-100" };
            case "dollar":
                return { icon: <DollarSign size={22} className="text-emerald-600" />, bg: "bg-emerald-100" };
            case "repeat":
                return { icon: <Repeat size={22} className="text-blue-600" />, bg: "bg-blue-100" };
            case "crown":
                return { icon: <Crown size={22} className="text-amber-600" />, bg: "bg-amber-100" };
            default:
                return { icon: <Users size={22} className="text-violet-600" />, bg: "bg-violet-100" };
        }
    };

    const { icon, bg } = getIconData(metric.iconType);

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
                        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-600">
                            <TrendingUp size={12} />
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
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        currentData.progress >= 70 ? "bg-emerald-500" :
                                        currentData.progress >= 50 ? "bg-amber-500" : "bg-red-500"
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

// ==================== COMPONENTES DE CLIENTE ====================

function ClientCard({ 
    client, 
    onClick 
}: { 
    client: Client; 
    onClick: () => void;
}) {
    const isVIP = parseInt(client.totalSpent.replace(/\./g, "")) >= 200000;

    return (
        <div 
            onClick={onClick}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md sm:gap-4 sm:p-4"
        >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-[14px] font-semibold text-white shadow-sm sm:h-12 sm:w-12 sm:text-[16px]">
                {client.name.split(" ").map(n => n[0]).join("")}
                {isVIP && (
                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400">
                        <Crown size={10} className="text-white" />
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                            {client.name}
                        </p>
                        <Badge 
                            variant={client.status === "active" ? "success" : "secondary"}
                            className="hidden text-[9px] sm:inline-flex sm:text-[10px]"
                        >
                            {client.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[var(--muted-foreground)] sm:gap-x-3 sm:text-[12px]">
                        <span className="flex items-center gap-1">
                            <Mail size={10} />
                            <span className="hidden sm:inline">{client.email}</span>
                            <span className="sm:hidden">{client.email.split("@")[0]}</span>
                        </span>
                        <span className="hidden items-center gap-1 sm:flex">
                            <Calendar size={10} />
                            {client.createdAt}
                        </span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[13px] font-semibold tabular-nums text-[var(--card-foreground)]">
                        ${client.totalSpent}
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                        {client.totalPurchases} compras
                    </p>
                </div>

                <div className="flex items-center gap-1 sm:hidden">
                    <p className="text-[12px] font-semibold tabular-nums text-[var(--card-foreground)]">
                        ${client.totalSpent}
                    </p>
                </div>

                <ChevronRight size={16} className="shrink-0 text-[var(--muted-foreground)]" />
            </div>
        </div>
    );
}

function ClientDetail({ 
    client, 
    onBack 
}: { 
    client: Client; 
    onBack: () => void;
}) {
    const isVIP = parseInt(client.totalSpent.replace(/\./g, "")) >= 200000;

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
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-[16px] font-semibold text-white shadow-sm sm:h-14 sm:w-14 sm:text-[18px]">
                            {client.name.split(" ").map(n => n[0]).join("")}
                            {isVIP && (
                                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400">
                                    <Crown size={12} className="text-white" />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
                                    {client.name}
                                </h1>
                                {isVIP && (
                                    <Badge className="bg-amber-100 text-[10px] text-amber-700">
                                        VIP
                                    </Badge>
                                )}
                            </div>
                            <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                                Cliente desde {client.createdAt}
                            </p>
                        </div>
                    </div>
                </div>
                <Badge 
                    variant={client.status === "active" ? "success" : "secondary"}
                    className="text-[10px] sm:text-[11px]"
                >
                    {client.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
            </div>

            {/* Info Cards */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 sm:grid-cols-4 sm:gap-4">
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Total Gastado
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-[var(--success)] sm:text-xl">
                        ${client.totalSpent}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Compras
                    </p>
                    <p className="mt-1 text-lg font-bold text-[var(--card-foreground)] sm:text-xl">
                        {client.totalPurchases}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        DNI
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-[var(--card-foreground)] sm:text-[15px]">
                        {client.dni}
                    </p>
                </Card>
                <Card className="p-3 sm:p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:text-[10px]">
                        Teléfono
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                        {client.phone}
                    </p>
                </Card>
            </div>

            {/* Contact Actions */}
            <div className="mb-5 flex flex-wrap gap-2 sm:mb-6">
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <Phone size={14} />
                    Llamar
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <Mail size={14} />
                    Email
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-[12px]">
                    <ShoppingBag size={14} />
                    Nueva Venta
                </Button>
            </div>

            {/* Purchase History */}
            <Card className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Historial de Compras
                    </h2>
                    <Badge variant="secondary" className="text-[10px]">
                        {client.purchases.length} compras
                    </Badge>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    {client.purchases.map((purchase) => (
                        <div 
                            key={purchase.id}
                            className="flex items-center justify-between rounded-lg border border-[var(--border)] p-2.5 sm:p-3"
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 sm:h-9 sm:w-9">
                                    <ShoppingBag size={14} className="text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-medium text-[var(--card-foreground)] sm:text-[14px]">
                                        {purchase.product}
                                    </p>
                                    <p className="text-[11px] text-[var(--muted-foreground)] sm:text-[12px]">
                                        {purchase.date}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[13px] font-semibold tabular-nums text-[var(--success)] sm:text-[14px]">
                                    +${purchase.amount}
                                </p>
                                <Badge 
                                    variant={purchase.status === "completed" ? "success" : "secondary"}
                                    className="text-[9px]"
                                >
                                    {purchase.status === "completed" ? "Completado" : purchase.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

// ==================== MODAL ====================

function CreateClientModal({ 
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
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                        Nuevo Cliente
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
                            placeholder="Ej: María García"
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
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
                    <div className="grid grid-cols-2 gap-3">
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
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                DNI
                            </label>
                            <input
                                type="text"
                                placeholder="12.345.678"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex gap-3 sm:mt-6">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button className="flex-1">
                        Crear Cliente
                    </Button>
                </div>
            </Card>
        </div>
    );
}

// ==================== COMPONENTE PRINCIPAL ====================

export function ClientsView({ onBack }: ClientsViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

    const filteredClients = mockClients.filter(client => {
        const matchesSearch = 
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.dni.includes(searchQuery) ||
            client.phone.includes(searchQuery);
        
        const matchesStatus = statusFilter === "all" || client.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Ordenar por total gastado (VIPs primero)
    const sortedClients = [...filteredClients].sort((a, b) => {
        const aSpent = parseInt(a.totalSpent.replace(/\./g, ""));
        const bSpent = parseInt(b.totalSpent.replace(/\./g, ""));
        return bSpent - aSpent;
    });

    if (selectedClient) {
        return (
            <ClientDetail 
                client={selectedClient} 
                onBack={() => setSelectedClient(null)} 
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
                            Gestión de Clientes
                        </h1>
                        <p className="text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            Conocé mejor a tu cartera y aumentá ventas
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    size="sm"
                    className="gap-2"
                >
                    <Plus size={16} />
                    Nuevo Cliente
                </Button>
            </div>

            {/* Métricas */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 lg:grid-cols-4 lg:gap-4">
                {clientMetrics.map((metric) => (
                    <ClientMetricCard key={metric.id} metric={metric} />
                ))}
            </div>

            {/* Search & Filters */}
            <Card className="mb-4 p-3 sm:mb-5 sm:p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, email, DNI..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2 pl-9 pr-4 text-[13px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                    </div>
                    
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-1">
                        <span className="mr-1 self-center text-[11px] text-[var(--muted-foreground)]">Estado:</span>
                        {(["all", "active", "inactive"] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                                    statusFilter === status
                                        ? "bg-[var(--primary)] text-white shadow-sm"
                                        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60"
                                )}
                            >
                                {status === "all" ? "Todos" : status === "active" ? "Activos" : "Inactivos"}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Clients List */}
            <div className="space-y-2 sm:space-y-3">
                {sortedClients.map((client) => (
                    <ClientCard 
                        key={client.id} 
                        client={client} 
                        onClick={() => setSelectedClient(client)}
                    />
                ))}

                {sortedClients.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--muted)]/60 sm:mb-4 sm:h-16 sm:w-16">
                            <Users size={22} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[14px] font-medium text-[var(--card-foreground)] sm:text-[15px]">
                            No se encontraron clientes
                        </p>
                        <p className="mt-1 text-[12px] text-[var(--muted-foreground)] sm:text-[13px]">
                            Intentá con otros términos de búsqueda
                        </p>
                    </Card>
                )}
            </div>

            {/* Create Modal */}
            <CreateClientModal 
                isOpen={showCreateModal} 
                onClose={() => setShowCreateModal(false)} 
            />
        </div>
    );
}