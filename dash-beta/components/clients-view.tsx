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
    FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

// Datos de ejemplo
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
];

function ClientCard({ 
    client, 
    onClick 
}: { 
    client: Client; 
    onClick: () => void;
}) {
    return (
        <div 
            onClick={onClick}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-[16px] font-semibold text-white shadow-sm">
                {client.name.split(" ").map(n => n[0]).join("")}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[14px] font-medium text-[var(--card-foreground)]">
                            {client.name}
                        </p>
                        <Badge 
                            variant={client.status === "active" ? "success" : "secondary"}
                            className="text-[10px]"
                        >
                            {client.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {client.email}
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                            <Calendar size={12} />
                            {client.createdAt}
                        </span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[14px] font-semibold tabular-nums text-[var(--card-foreground)]">
                        ${client.totalSpent}
                    </p>
                    <p className="text-[12px] text-[var(--muted-foreground)]">
                        {client.totalPurchases} compras
                    </p>
                </div>

                <ChevronRight size={18} className="shrink-0 text-[var(--muted-foreground)]" />
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
    return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Header */}
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
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-[18px] font-semibold text-white shadow-sm">
                            {client.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                                {client.name}
                            </h1>
                            <p className="text-[13px] text-[var(--muted-foreground)]">
                                Cliente desde {client.createdAt}
                            </p>
                        </div>
                    </div>
                </div>
                <Badge 
                    variant={client.status === "active" ? "success" : "secondary"}
                    className="text-[11px]"
                >
                    {client.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
            </div>

            {/* Info Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Total Gastado
                    </p>
                    <p className="mt-1 text-xl font-bold tabular-nums text-[var(--card-foreground)]">
                        ${client.totalSpent}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Compras
                    </p>
                    <p className="mt-1 text-xl font-bold text-[var(--card-foreground)]">
                        {client.totalPurchases}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        DNI
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--card-foreground)]">
                        {client.dni}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Teléfono
                    </p>
                    <p className="mt-1 text-[14px] font-medium text-[var(--card-foreground)]">
                        {client.phone}
                    </p>
                </Card>
            </div>

            {/* Purchase History */}
            <Card className="p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Historial de Compras
                    </h2>
                    <Badge variant="secondary" className="text-[11px]">
                        {client.purchases.length} compras
                    </Badge>
                </div>

                <div className="space-y-3">
                    {client.purchases.map((purchase) => (
                        <div 
                            key={purchase.id}
                            className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                    <ShoppingBag size={16} className="text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                        {purchase.product}
                                    </p>
                                    <p className="text-[12px] text-[var(--muted-foreground)]">
                                        {purchase.date}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[14px] font-semibold tabular-nums text-[var(--success)]">
                                    +${purchase.amount}
                                </p>
                                <Badge 
                                    variant={purchase.status === "completed" ? "success" : "secondary"}
                                    className="text-[10px]"
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
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-6">
                <div className="mb-6 flex items-center justify-between">
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
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="email@ejemplo.com"
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                placeholder="+54 11 1234-5678"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                DNI
                            </label>
                            <input
                                type="text"
                                placeholder="12.345.678"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
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

export function ClientsView({ onBack }: ClientsViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const filteredClients = mockClients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.dni.includes(searchQuery) ||
        client.phone.includes(searchQuery)
    );

    // Si hay un cliente seleccionado, mostrar su detalle
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                            Clientes
                        </h1>
                        <p className="text-[13px] text-[var(--muted-foreground)]">
                            {filteredClients.length} clientes registrados
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="gap-2"
                >
                    <Plus size={18} />
                    Nuevo Cliente
                </Button>
            </div>

            {/* Search & Filters */}
            <Card className="mb-6 p-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email, DNI o teléfono..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter size={16} />
                        Filtros
                    </Button>
                </div>
            </Card>

            {/* Clients List */}
            <div className="space-y-3">
                {filteredClients.map((client) => (
                    <ClientCard 
                        key={client.id} 
                        client={client} 
                        onClick={() => setSelectedClient(client)}
                    />
                ))}

                {filteredClients.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)]/60">
                            <Users size={24} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[15px] font-medium text-[var(--card-foreground)]">
                            No se encontraron clientes
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
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