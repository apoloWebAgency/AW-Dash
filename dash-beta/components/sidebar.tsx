// src/components/sidebar.tsx
"use client";

import { useState } from "react";
import { 
    LayoutDashboard, 
    ChevronDown, 
    Activity, 
    Users, 
    UserPlus,
    Calendar,
    Bot,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
    user: {
        name: string;
        role: string;
        initials: string;
    };
    stats: {
        iaActive: boolean;
        newLeadsCount: number;
        newSalesCount: number;
    };
    currentView: string;
    onNavigate: (view: string) => void;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    hasSubmenu?: boolean;
    isExpanded?: boolean;
    onClick?: () => void;
    badge?: number;
}

function NavItem({ icon, label, isActive, hasSubmenu, isExpanded, onClick, badge }: NavItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium transition-all duration-200",
                isActive
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60 hover:text-[var(--card-foreground)]"
            )}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {badge && badge > 0 && (
                    <span className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                        isActive 
                            ? "bg-white/20 text-white" 
                            : "bg-[var(--primary)]/10 text-[var(--primary)]"
                    )}>
                        {badge}
                    </span>
                )}
                {hasSubmenu && (
                    <ChevronDown 
                        size={16} 
                        className={cn(
                            "transition-transform duration-200",
                            isExpanded && "rotate-180"
                        )} 
                    />
                )}
            </div>
        </button>
    );
}

interface SubNavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    badge?: number;
}

function SubNavItem({ icon, label, isActive, onClick, badge }: SubNavItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/40 hover:text-[var(--card-foreground)]"
            )}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)]/10 px-1.5 text-[11px] font-semibold text-[var(--primary)]">
                    {badge}
                </span>
            )}
        </button>
    );
}

export function Sidebar({ user, stats, currentView, onNavigate }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDashboardExpanded, setIsDashboardExpanded] = useState(true);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md lg:hidden"
            >
                <Menu size={20} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300 lg:static lg:z-0 lg:shadow-[var(--shadow-sm)]",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm">
                            <Bot size={20} />
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold text-[var(--card-foreground)]">
                                ChatAgent
                            </p>
                            <p className="text-[12px] text-[var(--muted-foreground)]">
                                Panel de Control
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--muted)]/60 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* IA Status */}
                <div className="border-b border-[var(--border)] p-4">
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[var(--success-bg)] to-[var(--success-bg)]/50 p-3">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
                            </span>
                            <span className="text-[13px] font-medium text-[var(--success)]">
                                IA Activa
                            </span>
                        </div>
                        <span className="text-[12px] text-[var(--muted-foreground)]">
                            24/7
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {/* Dashboard con submenú */}
                        <NavItem
                            icon={<LayoutDashboard size={18} />}
                            label="Dashboard"
                            isActive={currentView === "dashboard"}
                            hasSubmenu
                            isExpanded={isDashboardExpanded}
                            onClick={() => {
                                if (isDashboardExpanded && currentView !== "dashboard") {
                                    onNavigate("dashboard");
                                }
                                setIsDashboardExpanded(!isDashboardExpanded);
                            }}
                        />

                        {/* Submenú del Dashboard */}
                        {isDashboardExpanded && (
                            <div className="ml-3 mt-1 space-y-1 border-l-2 border-[var(--border)] pl-3">
                                <SubNavItem
                                    icon={<Activity size={16} />}
                                    label="Actividad Reciente"
                                    isActive={currentView === "activity"}
                                    onClick={() => {
                                        onNavigate("activity");
                                        setIsOpen(false);
                                    }}
                                />
                                <SubNavItem
                                    icon={<Users size={16} />}
                                    label="Clientes"
                                    isActive={currentView === "clients"}
                                    onClick={() => {
                                        onNavigate("clients");
                                        setIsOpen(false);
                                    }}
                                    badge={stats.newSalesCount}
                                />
                                <SubNavItem
                                    icon={<UserPlus size={16} />}
                                    label="Leads"
                                    isActive={currentView === "leads"}
                                    onClick={() => {
                                        onNavigate("leads");
                                        setIsOpen(false);
                                    }}
                                    badge={stats.newLeadsCount}
                                />
                                <SubNavItem
                                    icon={<Calendar size={16} />}
                                    label="Turnos"
                                    isActive={currentView === "appointments"}
                                    onClick={() => {
                                        onNavigate("appointments");
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="my-4 h-px bg-[var(--border)]" />

                    {/* Settings */}
                    <div className="space-y-1">
                        <NavItem
                            icon={<Settings size={18} />}
                            label="Configuración"
                            onClick={() => {}}
                        />
                    </div>
                </nav>

                {/* User */}
                <div className="border-t border-[var(--border)] p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[14px] font-semibold text-white">
                            {user.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium text-[var(--card-foreground)]">
                                {user.name}
                            </p>
                            <p className="truncate text-[12px] text-[var(--muted-foreground)]">
                                {user.role}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <LogOut size={16} />
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}