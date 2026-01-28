"use client";

import { MoreHorizontal, Eye, Edit, Trash2, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Appointment } from "@/types/dashboard";

interface AppointmentsTableProps {
    appointments: Appointment[];
}

function ToggleTabs() {
    return (
        <div className="flex rounded-xl bg-[var(--muted)] p-1">
            <button className="rounded-lg bg-white px-4 py-2 text-[12px] font-semibold text-[var(--foreground)] shadow-sm transition-all">
                Hoy
            </button>
            <button className="rounded-lg px-4 py-2 text-[12px] font-medium text-[var(--muted-foreground)] transition-all hover:text-[var(--foreground)]">
                Semana
            </button>
            <button className="rounded-lg px-4 py-2 text-[12px] font-medium text-[var(--muted-foreground)] transition-all hover:text-[var(--foreground)]">
                Mes
            </button>
        </div>
    );
}

function AppointmentRow({ apt, index }: { apt: Appointment; index: number }) {
    return (
        <div
            className={cn(
                "group flex items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-[var(--muted)]/60",
                index === 0 && "bg-[var(--muted)]/30"
            )}
        >
            {/* Avatar */}
            <Avatar className={cn("h-11 w-11 ring-2 ring-white shadow-md", apt.avatarColor)}>
                <AvatarFallback className="bg-transparent text-[13px] font-semibold text-white">
                    {apt.initials}
                </AvatarFallback>
            </Avatar>

            {/* Client Info */}
            <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[var(--card-foreground)]">{apt.name}</p>
                <div className="mt-1 flex items-center gap-3 text-[12px] text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {apt.time}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {apt.service}
                    </span>
                </div>
            </div>

            {/* Status Badge */}
            <Badge
                variant={apt.status === "confirmed" ? "success" : "warning"}
                className="hidden px-3 py-1 text-[11px] font-semibold sm:inline-flex"
            >
                {apt.status === "confirmed" ? "Confirmado" : "Pendiente"}
            </Badge>

            {/* Actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <MoreHorizontal size={18} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2">
                        <Eye size={14} /> Ver detalle
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <Edit size={14} /> Editar turno
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-[var(--error)]">
                        <Trash2 size={14} /> Cancelar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function AppointmentCard({ apt }: { apt: Appointment }) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:hidden">
            <div className="flex items-center gap-3">
                <Avatar className={cn("h-12 w-12 ring-2 ring-white shadow-md", apt.avatarColor)}>
                    <AvatarFallback className="bg-transparent text-[14px] font-semibold text-white">
                        {apt.initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-[15px] font-semibold text-[var(--card-foreground)]">{apt.name}</p>
                    <p className="text-[13px] text-[var(--muted-foreground)]">{apt.service}</p>
                </div>
                <Badge variant={apt.status === "confirmed" ? "success" : "warning"}>
                    {apt.status === "confirmed" ? "Confirmado" : "Pendiente"}
                </Badge>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-3 py-1.5 text-[13px] font-medium text-[var(--foreground)]">
                    <Clock size={14} />
                    {apt.time}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[12px]">
                            <MoreHorizontal size={14} />
                            Acciones
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye size={14} className="mr-2" /> Ver detalle</DropdownMenuItem>
                        <DropdownMenuItem><Edit size={14} className="mr-2" /> Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[var(--error)]"><Trash2 size={14} className="mr-2" /> Cancelar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
    return (
        <Card className="flex flex-col overflow-hidden p-0 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] xl:flex-[2]">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--card)] to-[var(--muted)]/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                    <h2 className="text-[17px] font-semibold text-[var(--card-foreground)]">
                        Próximos Turnos Agendados
                    </h2>
                    <p className="mt-1 text-[13px] text-[var(--muted-foreground)]">
                        {appointments.length} turnos programados para hoy
                    </p>
                </div>
                <ToggleTabs />
            </div>

            {/* Mobile Cards View */}
            <div className="flex flex-col gap-4 p-4 sm:hidden">
                {appointments.map((apt) => (
                    <AppointmentCard key={apt.id} apt={apt} />
                ))}
            </div>

            {/* Desktop List View */}
            <div className="hidden flex-col sm:flex">
                {appointments.map((apt, index) => (
                    <AppointmentRow key={apt.id} apt={apt} index={index} />
                ))}

                {/* Footer */}
                <div className="border-t border-[var(--border)] p-4">
                    <Button variant="ghost" className="w-full gap-2 text-[13px] text-[var(--primary)]">
                        <Calendar size={16} />
                        Ver todos los turnos
                    </Button>
                </div>
            </div>
        </Card>
    );
}
