export interface UserProfile {
    name: string;
    role: string;
    avatarUrl?: string; // For future use
    initials: string;
}

export interface DashboardStats {
    iaActive: boolean;
    newLeadsCount: number;
    newSalesCount: number;
}

export interface AlertData {
    id: string;
    type: "lead" | "sale";
    title: string;
    subtitle: string;
    timeAgo: string;
    actionLabel: string;
    value?: string; // e.g. "$450.00"
}

export interface FunnelStage {
    id: string;
    label: string;
    value: string; // Formatted string "2,450"
    raw_value: number; // For calculations if needed
    variant: "light" | "medium" | "dark";
}

export interface FunnelConnector {
    percentage: string;
}

export interface FunnelData {
    stages: FunnelStage[];
    connectors: FunnelConnector[];
}

export interface ProductData {
    id: string;
    name: string;
    subtitle: string;
    percentage: string; // "24%"
    trendColor: "success" | "warning" | "error";
    isHot: boolean;
    iconType: "gift" | "flame" | "award";
}

export interface Appointment {
    id: string;
    initials: string;
    name: string;
    time: string;
    service: string;
    status: "confirmed" | "pending";
    avatarColor: string; // string class for now
}

export interface ActivityItem {
    id: string;
    type: "lead" | "sale";
    title: string;
    time: string;
    description?: string;
    tags?: string[];
    amount?: string;
    badge?: string;
}

export interface DashboardData {
    user: UserProfile;
    stats: DashboardStats;
    alerts: AlertData[];
    // metrics: MetricData[]; // REMOVED: Now handled by separate service
    funnel: FunnelData;
    products: ProductData[];
    appointments: Appointment[];
    recentActivity: ActivityItem[];
}
