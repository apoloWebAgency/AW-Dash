"use client";

import { UserPlus, Wallet, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertData } from "@/types/dashboard";

interface HeaderCardsProps {
    alerts: AlertData[];
}

interface AlertCardProps {
    icon: React.ReactNode;
    iconBg: string;
    iconBorder?: string;
    title: string;
    subtitle: string;
    action: string;
}

function AlertCard({ icon, iconBg, iconBorder, title, subtitle, action }: AlertCardProps) {
    return (
        <Card className="flex flex-1 items-center justify-between gap-4 p-4 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] sm:p-5">
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm",
                        iconBg,
                        iconBorder && `ring-2 ring-offset-2 ${iconBorder}`
                    )}
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-[var(--card-foreground)]">{title}</p>
                    <p className="truncate text-[13px] text-[var(--muted-foreground)]">{subtitle}</p>
                </div>
            </div>
            <Button variant="link" className="shrink-0 text-[13px] font-medium text-[var(--primary)]">
                {action}
            </Button>
        </Card>
    );
}

export function HeaderCards({ alerts }: HeaderCardsProps) {
    // Map icon type from API to component
    const getIcon = (type: string) => {
        switch (type) {
            case "lead":
                return <UserPlus size={22} className="text-[var(--primary)]" />;
            case "sale":
                return <Wallet size={22} className="text-[var(--success)]" />;
            default:
                return <Bell size={22} className="text-[var(--muted-foreground)]" />;
        }
    };

    const getStyles = (type: string) => {
        switch (type) {
            case "lead":
                return { bg: "bg-[#ede9fe]", border: "ring-[var(--primary)]/20" };
            case "sale":
                return { bg: "bg-[var(--success-bg)]", border: "ring-[var(--success)]/20" };
            default:
                return { bg: "bg-[var(--muted)]", border: "ring-[var(--border)]" };
        }
    };

    if (!alerts || alerts.length === 0) return null;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {alerts.map((alert) => {
                const styles = getStyles(alert.type);
                return (
                    <AlertCard
                        key={alert.id}
                        icon={getIcon(alert.type)}
                        iconBg={styles.bg}
                        iconBorder={styles.border}
                        title={alert.title}
                        subtitle={alert.subtitle}
                        action={alert.actionLabel}
                    />
                );
            })}
        </div>
    );
}
