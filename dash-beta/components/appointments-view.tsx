// src/components/appointments-view.tsx
"use client";

import { useState } from "react";
import { 
    ArrowLeft, 
    Search, 
    Plus, 
    Filter, 
    Calendar,
    Clock,
    Phone,
    Mail,
    User,
    ChevronRight,
    ChevronLeft,
    X,
    Check,
    AlertCircle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    RefreshCw,
    Bell,
    MessageCircle
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
}

interface AppointmentsViewProps {
    onBack: () => void;
}

// Datos de ejemplo expandidos
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
        notes: "Primera consulta - viene por recomendación"
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
        price: "8.000"
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
        reminderSent: true
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
        price: "10.000"
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
        price: "12.000"
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
        price: "15.000"
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
        notes: "No se presentó, no respondió llamadas"
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
        notes: "Canceló por enfermedad, reagendar"
    },
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
type FilterDate = "all" | "today" | "tomorrow" | "week" | "past";

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
        <div className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 transition-all duration-200 hover:border-[var(--primary)]/20 hover:shadow-md">
            <Avatar className={cn("h-12 w-12 ring-2 ring-white shadow-md", appointment.avatarColor)}>
                <AvatarFallback className="bg-transparent text-[14px] font-semibold text-white">
                    {appointment.initials}
                </AvatarFallback>
            </Avatar>

            <div 
                className="flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-4"
                onClick={onClick}
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate text-[14px] font-medium text-[var(--card-foreground)]">
                            {appointment.clientName}
                        </p>
                        {appointment.reminderSent && (
                            <Bell size={12} className="text-[var(--primary)]" />
                        )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {appointment.time} ({appointment.duration})
                        </span>
                        <span className="hidden sm:inline">{appointment.service}</span>
                    </div>
                </div>
                
                <div className="hidden shrink-0 text-right sm:block">
                    {appointment.price && (
                        <p className="text-[14px] font-semibold tabular-nums text-[var(--card-foreground)]">
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

            {/* Mobile Status */}
            <span className={cn(
                "flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium sm:hidden",
                status.color
            )}>
                <StatusIcon size={10} />
            </span>

            {/* Actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 shrink-0 rounded-lg opacity-60 transition-opacity hover:opacity-100 group-hover:opacity-100"
                    >
                        <MoreHorizontal size={18} />
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
                        <Avatar className={cn("h-14 w-14 ring-2 ring-white shadow-md", appointment.avatarColor)}>
                            <AvatarFallback className="bg-transparent text-[18px] font-semibold text-white">
                                {appointment.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                                {appointment.clientName}
                            </h1>
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

            {/* Info Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Fecha
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--card-foreground)]">
                        {appointment.date}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Hora
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--card-foreground)]">
                        {appointment.time}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Duración
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--card-foreground)]">
                        {appointment.duration}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Precio
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-[var(--success)]">
                        ${appointment.price}
                    </p>
                </Card>
            </div>

            {/* Contact Info */}
            <Card className="mb-6 p-5">
                <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Información de Contacto
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)]/60">
                            <Mail size={18} className="text-[var(--muted-foreground)]" />
                        </div>
                        <div>
                            <p className="text-[12px] text-[var(--muted-foreground)]">Email</p>
                            <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                {appointment.clientEmail}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)]/60">
                            <Phone size={18} className="text-[var(--muted-foreground)]" />
                        </div>
                        <div>
                            <p className="text-[12px] text-[var(--muted-foreground)]">Teléfono</p>
                            <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                {appointment.clientPhone}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notes */}
            {appointment.notes && (
                <Card className="mb-6 p-5">
                    <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Notas
                    </h2>
                    <p className="text-[14px] text-[var(--card-foreground)]">
                        {appointment.notes}
                    </p>
                </Card>
            )}

            {/* Reminder Status */}
            <Card className="mb-6 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            appointment.reminderSent 
                                ? "bg-green-100" 
                                : "bg-[var(--muted)]/60"
                        )}>
                            <Bell size={18} className={
                                appointment.reminderSent 
                                    ? "text-green-600" 
                                    : "text-[var(--muted-foreground)]"
                            } />
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                Recordatorio
                            </p>
                            <p className="text-[12px] text-[var(--muted-foreground)]">
                                {appointment.reminderSent 
                                    ? "Enviado correctamente" 
                                    : "No enviado aún"
                                }
                            </p>
                        </div>
                    </div>
                    {!appointment.reminderSent && !isPast && appointment.status !== "cancelled" && (
                        <Button variant="outline" size="sm" onClick={onSendReminder} className="gap-2">
                            <Bell size={14} />
                            Enviar
                        </Button>
                    )}
                </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                    <Phone size={16} />
                    Llamar
                </Button>
                <Button variant="outline" className="gap-2">
                    <MessageCircle size={16} />
                    WhatsApp
                </Button>
                
                {!isPast && appointment.status !== "cancelled" && (
                    <>
                        <Button variant="outline" onClick={onReschedule} className="gap-2">
                            <RefreshCw size={16} />
                            Reagendar
                        </Button>
                        
                        {appointment.status === "pending" && (
                            <Button onClick={onConfirm} className="gap-2">
                                <Check size={16} />
                                Confirmar
                            </Button>
                        )}
                    </>
                )}
                
                {isToday && appointment.status === "confirmed" && (
                    <Button onClick={onMarkCompleted} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Check size={16} />
                        Marcar Completado
                    </Button>
                )}
                
                {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                    <Button variant="outline" onClick={onCancel} className="gap-2 text-[var(--error)] hover:bg-red-50">
                        <X size={16} />
                        Cancelar
                    </Button>
                )}
            </div>
        </div>
    );
}

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
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <Card className="relative z-10 max-h-[90vh] w-full max-w-lg animate-in fade-in-0 zoom-in-95 overflow-y-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                        Nuevo Turno
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Cliente */}
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Cliente
                        </label>
                        <div className="mt-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Buscar cliente existente..."
                                className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                            <Button variant="outline" size="sm">
                                <Plus size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Servicio */}
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Servicio
                        </label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        >
                            <option value="">Seleccionar servicio...</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - {service.duration} - ${service.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Hora
                            </label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="09:00">09:00</option>
                                <option value="09:30">09:30</option>
                                <option value="10:00">10:00</option>
                                <option value="10:30">10:30</option>
                                <option value="11:00">11:00</option>
                                <option value="11:30">11:30</option>
                                <option value="12:00">12:00</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>
                                <option value="15:00">15:00</option>
                                <option value="15:30">15:30</option>
                                <option value="16:00">16:00</option>
                                <option value="16:30">16:30</option>
                                <option value="17:00">17:00</option>
                                <option value="17:30">17:30</option>
                                <option value="18:00">18:00</option>
                            </select>
                        </div>
                    </div>

                    {/* Resumen del servicio */}
                    {selectedServiceData && (
                        <div className="rounded-lg bg-[var(--muted)]/50 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                                        {selectedServiceData.name}
                                    </p>
                                    <p className="text-[12px] text-[var(--muted-foreground)]">
                                        Duración: {selectedServiceData.duration}
                                    </p>
                                </div>
                                <p className="text-[16px] font-semibold text-[var(--primary)]">
                                    ${selectedServiceData.price}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Notas */}
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

                    {/* Opciones adicionales */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="sendReminder"
                            className="h-4 w-4 rounded border-[var(--border)]"
                            defaultChecked
                        />
                        <label htmlFor="sendReminder" className="text-[13px] text-[var(--card-foreground)]">
                            Enviar recordatorio automático (24hs antes)
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
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
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-6">
                <div className="mb-6 flex items-center justify-between">
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
                        <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                            {appointment.clientName}
                        </p>
                        <p className="text-[12px] text-[var(--muted-foreground)]">
                            {appointment.service}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Nueva Fecha
                            </label>
                            <input
                                type="date"
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                                Nueva Hora
                            </label>
                            <select
                                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Motivo del cambio (opcional)
                        </label>
                        <textarea
                            placeholder="Ej: Solicitud del cliente..."
                            rows={2}
                            className="mt-1 w-full resize-none rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="notifyClient"
                            className="h-4 w-4 rounded border-[var(--border)]"
                            defaultChecked
                        />
                        <label htmlFor="notifyClient" className="text-[13px] text-[var(--card-foreground)]">
                            Notificar al cliente por WhatsApp
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
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
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <Card className="relative z-10 w-full max-w-md animate-in fade-in-0 zoom-in-95 p-6">
                <div className="mb-6 flex items-center justify-between">
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
                        <p className="text-[14px] font-medium text-[var(--card-foreground)]">
                            {appointment.clientName}
                        </p>
                        <p className="text-[12px] text-[var(--muted-foreground)]">
                            {appointment.date} a las {appointment.time}
                        </p>
                    </div>
                </div>

                <p className="mb-4 text-[14px] text-[var(--muted-foreground)]">
                    ¿Estás seguro de que querés cancelar este turno? Esta acción no se puede deshacer.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="text-[12px] font-medium text-[var(--muted-foreground)]">
                            Motivo de cancelación
                        </label>
                        <select
                            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        >
                            <option value="">Seleccionar motivo...</option>
                            <option value="client-request">Solicitud del cliente</option>
                            <option value="no-show">No se presentó</option>
                            <option value="provider-unavailable">Proveedor no disponible</option>
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
                        <label htmlFor="notifyCancel" className="text-[13px] text-[var(--card-foreground)]">
                            Notificar al cliente
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
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

export function AppointmentsView({ onBack }: AppointmentsViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
    const [dateFilter, setDateFilter] = useState<FilterDate>("all");
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToAction, setAppointmentToAction] = useState<Appointment | null>(null);

    const filteredAppointments = mockAppointments.filter(apt => {
        const matchesSearch = 
            apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
        
        let matchesDate = true;
        if (dateFilter === "today") matchesDate = apt.date === "Hoy";
        else if (dateFilter === "tomorrow") matchesDate = apt.date === "Mañana";
        else if (dateFilter === "past") matchesDate = apt.date === "Ayer" || apt.date.includes("/");
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    // Agrupar por fecha
    const todayAppointments = filteredAppointments.filter(a => a.date === "Hoy");
    const tomorrowAppointments = filteredAppointments.filter(a => a.date === "Mañana");
    const pastAppointments = filteredAppointments.filter(a => a.date === "Ayer" || a.date.includes("/"));

    const handleConfirm = (apt: Appointment) => {
        console.log("Confirmar:", apt.id);
    };

    const handleReschedule = (apt: Appointment) => {
        setAppointmentToAction(apt);
        setShowRescheduleModal(true);
    };

    const handleCancel = (apt: Appointment) => {
        setAppointmentToAction(apt);
        setShowCancelModal(true);
    };

    const handleSendReminder = (apt: Appointment) => {
        console.log("Enviar recordatorio:", apt.id);
    };

    const handleMarkCompleted = (apt: Appointment) => {
        console.log("Marcar completado:", apt.id);
    };

    const handleMarkNoShow = (apt: Appointment) => {
        console.log("Marcar no-show:", apt.id);
    };

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
                            Turnos
                        </h1>
                        <p className="text-[13px] text-[var(--muted-foreground)]">
                            {filteredAppointments.length} turnos encontrados
                        </p>
                    </div>
                </div>

                <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="gap-2"
                >
                    <Plus size={18} />
                    Nuevo Turno
                </Button>
            </div>

            {/* Search & Filters */}
            <Card className="mb-6 p-4">
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o servicio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-[14px] outline-none transition-colors focus:border-[var(--primary)]"
                        />
                    </div>
                    
                    {/* Date Filters */}
                    <div className="flex flex-wrap gap-1">
                        <span className="mr-2 self-center text-[12px] text-[var(--muted-foreground)]">Fecha:</span>
                        {(["all", "today", "tomorrow", "past"] as FilterDate[]).map((date) => (
                            <button
                                key={date}
                                onClick={() => setDateFilter(date)}
                                className={cn(
                                    "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-200",
                                    dateFilter === date
                                        ? "bg-[var(--primary)] text-white shadow-sm"
                                        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60"
                                )}
                            >
                                {date === "all" ? "Todos" : 
                                 date === "today" ? "Hoy" : 
                                 date === "tomorrow" ? "Mañana" : "Pasados"}
                            </button>
                        ))}
                    </div>
                    
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-1">
                        <span className="mr-2 self-center text-[12px] text-[var(--muted-foreground)]">Estado:</span>
                        {(["all", "confirmed", "pending", "completed", "cancelled", "no-show"] as FilterStatus[]).map((status) => (
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

            {/* Appointments List */}
            <div className="space-y-6">
                {/* Hoy */}
                {todayAppointments.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Hoy
                            </span>
                            <Badge variant="secondary" className="text-[10px]">
                                {todayAppointments.length}
                            </Badge>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
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

                {/* Mañana */}
                {tomorrowAppointments.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Mañana
                            </span>
                            <Badge variant="secondary" className="text-[10px]">
                                {tomorrowAppointments.length}
                            </Badge>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
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

                {/* Pasados */}
                {pastAppointments.length > 0 && (
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                Anteriores
                            </span>
                            <Badge variant="secondary" className="text-[10px]">
                                {pastAppointments.length}
                            </Badge>
                            <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>
                        <div className="space-y-3">
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
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)]/60">
                            <Calendar size={24} className="text-[var(--muted-foreground)]" />
                        </div>
                        <p className="text-[15px] font-medium text-[var(--card-foreground)]">
                            No se encontraron turnos
                        </p>
                        <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
                            Intentá con otros filtros o creá un nuevo turno
                        </p>
                        <Button 
                            onClick={() => setShowCreateModal(true)}
                            className="mt-4 gap-2"
                        >
                            <Plus size={16} />
                            Crear Turno
                        </Button>
                    </Card>
                )}
            </div>

            {/* Modals */}
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