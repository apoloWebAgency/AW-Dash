"use client";

import { MessageSquare, LayoutDashboard, History, Calendar, Settings, PanelLeft, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserProfile, DashboardStats } from "@/types/dashboard";

interface SidebarProps {
    user: UserProfile;
    stats: DashboardStats;
}

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: MessageSquare, label: "Chats" },
    { icon: History, label: "Historial" },
    { icon: Calendar, label: "Agenda" },
    { icon: Settings, label: "Configuración" },
];

export function Sidebar({ user, stats }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Mobile Drawer */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <PanelLeft className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                    <SidebarContent user={user} stats={stats} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden h-screen flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] transition-all duration-300 lg:flex",
                    isCollapsed ? "w-20" : "w-[280px]"
                )}
            >
                <SidebarContent
                    collapsed={isCollapsed}
                    onToggle={() => setIsCollapsed(!isCollapsed)}
                    user={user}
                    stats={stats}
                />
            </div>
        </>
    );
}

interface SidebarContentProps {
    collapsed?: boolean;
    onToggle?: () => void;
    user: UserProfile;
    stats: DashboardStats;
}

function SidebarContent({ collapsed, onToggle, user, stats }: SidebarContentProps) {
    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className={cn("flex items-center gap-3 p-6", collapsed && "justify-center px-4")}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-md">
                    <Bot size={24} />
                </div>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="font-bold text-[var(--foreground)]">Flux AI</span>
                        <span className="text-[11px] text-[var(--muted-foreground)]">Smart Dashboard</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3 py-6">
                <TooltipProvider delayDuration={0}>
                    {menuItems.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <button
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium transition-all",
                                        item.active
                                            ? "bg-[var(--primary)] text-white shadow-md"
                                            : "text-[var(--secondary-foreground)] hover:bg-[var(--muted)]",
                                        collapsed && "justify-center px-0"
                                    )}
                                >
                                    <item.icon size={20} />
                                    {!collapsed && <span>{item.label}</span>}
                                </button>
                            </TooltipTrigger>
                            {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>

            {/* IA Status Card */}
            {!collapsed && (
                <div className="px-4 pb-6">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg">
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-[13px] font-semibold">
                                <Sparkles size={14} className="animate-pulse" />
                                IA Status
                            </span>
                            <span className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm",
                                stats.iaActive ? "bg-white/20 text-white" : "bg-black/20 text-gray-200"
                            )}>
                                {stats.iaActive ? "ACTIVO" : "INACTIVO"}
                            </span>
                        </div>
                        <p className="mt-2 text-[11px] font-medium opacity-90">
                            Analizando conversaciones en tiempo real...
                        </p>
                    </div>
                </div>
            )}

            {/* Footer / Toggle */}
            <div className={cn("border-t border-[var(--sidebar-border)] p-4", collapsed && "flex justify-center")}>
                {!collapsed ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 text-[12px] font-bold text-white shadow-sm">
                                {user.initials}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[13px] font-semibold text-[var(--foreground)]">{user.name}</span>
                                <span className="text-[11px] text-[var(--muted-foreground)]">{user.role}</span>
                            </div>
                        </div>
                        {onToggle && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--muted-foreground)]" onClick={onToggle}>
                                <PanelLeft size={16} />
                            </Button>
                        )}
                    </div>
                ) : (
                    onToggle && (
                        <Button variant="ghost" size="icon" onClick={onToggle}>
                            <PanelLeft size={20} />
                        </Button>
                    )
                )}
            </div>
        </div>
    );
}
