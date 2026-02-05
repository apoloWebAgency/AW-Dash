// src/components/leads-view.tsx
"use client";

import { useState } from "react";
import { 
    ArrowLeft, 
    Search, 
    Plus, 
    Filter, 
    UserPlus, 
    Phone, 
    Mail, 
    Calendar,
    MessageCircle,
    ChevronRight,
    X,
    Tag,
    Clock,
    CheckCircle,
    XCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

function LeadCard({ 
    lead, 
    onClick 
}: { 
    lead: Lead; 
    onClick: () => void;
}) {
    const status = statusConfig[lead.status];

    return (
        <div 
            onClick={onClick}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-[16px] font-semibold text-white shadow-sm">
                {lead.name.split(" ").map(n => n[0]).join("")}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[14px] font-medium text-[var(--card-foreground)]">
                            {lead.name}
                        </p>
                        <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            status.color
                        )}>
                            {status.label}
                        </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                            <Tag size={12} />
                            {lead.interests[0]?.service || "Sin interés"}
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                            <Clock size={12} />
                            {lead.createdAt}
                        </span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-[13px] font-medium text-[var(--card-foreground)]">
                        {lead.source}
                    </p>
                    <p className="text-[12px] text-[var(--muted-foreground)]">
                        {lead.interests.length} interacción{lead.interests.length !== 1 ? "es" : ""}
                    </p>
                </div>

                <ChevronRight size={18} className="shrink-0 text-[var(--muted-foreground)]" />
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
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-[18px] font-semibold text-white shadow-sm">
                            {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                                {lead.name}
                            </h1>
                            <p className="text-[13px] text-[var(--muted-foreground)]">
                                Lead desde {lead.createdAt}
                            </p>
                        </div>
                    </div>
                </div>
                <span className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-medium",
                    status.color
                )}>
                    {status.label}
                </span>
            </div>

            {/* Info Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Origen
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--card-foreground)]">
                        {lead.source}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Interacciones
                    </p>
                    <p className="mt-1 text-xl font-bold text-[var(--card-foreground)]">
                        {lead.interests.length}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Email
                    </p>
                    <p className="mt-1 truncate text-[14px] font-medium text-[var(--card-foreground)]">
                        {lead.email}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Teléfono
                    </p>
                    <p className="mt-1 text-[14px] font-medium text-[var(--card-foreground)]">
                        {lead.phone}
                    </p>
                </Card>
            </div>

            {/* Notes */}
            {lead.notes && (
                <Card className="mb-6 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Notas
                    </p>
                    <p className="mt-2 text-[14px] text-[var(--card-foreground)]">
                        {lead.notes}
                    </p>
                </Card>
            )}

            {/* Interest History */}
            <Card className="p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Historial de Intereses
                    </h2>
                    <Badge variant="secondary" className="text-[11px]">
                        {lead.interests.length} consulta{lead.interests.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                <div className="space-y-3">
                    {lead.interests.map((interest) => (
                        <div 
                            key={interest.id}
                            className="rounded-lg border border-[var(--border)] p-3"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                        <MessageCircle size={16} className="text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                                {interest.service}
                                            </p>
                                            <span className="text-[12px]">
                                                {channelIcons[interest.channel]}
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-[var(--muted-foreground)]">
                                            {interest.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {interest.message && (
                                <div className="mt-3 rounded-lg bg-[var(--muted)]/50 p-3">
                                    <p className="text-[13px] italic text-[var(--muted-foreground)]">
                                        "{interest.message}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                    <Phone size={16} />
                    Llamar
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                    <MessageCircle size={16} />
                    WhatsApp
                </Button>
                <Button className="flex-1 gap-2">
                    <CheckCircle size={16} />
                    Convertir a Cliente
                </Button>
            </div>
        </div>
    );
}

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
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-6">
                <div className="mb-6 flex items-center justify-between">
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
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Servicio de interés
                        </label>
                        <select
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        >
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
                        <select
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        >
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
                            rows={3}
                            className="mt-1 w-full resize-none rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
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
            lead.interests.some(i => i.service.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
        
        return matchesSearch && matchesStatus;
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
                            Leads
                        </h1>
                        <p className="text-[13px] text-[var(--muted-foreground)]">
                            {filteredLeads.length} leads registrados
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="gap-2"
                >
                    <Plus size={18} />
                    Nuevo Lead
                </Button>
            </div>

            {/* Search & Filters */}
            <Card className="mb-6 p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, email, teléfono o servicio..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                    </div>
                    
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-1">
                        {(["all", "new", "contacted", "qualified", "converted", "lost"] as FilterStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-200",
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
            <div className="space-y-3">
                {filteredLeads.map((lead) => (
                    <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        onClick={() => setSelectedLead(lead)}
                    />
                ))}

                {filteredLeads.length === 0 && (
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)]/60">
                            <UserPlus size={24} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[15px] font-medium text-[var(--card-foreground)]">
                            No se encontraron leads
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
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