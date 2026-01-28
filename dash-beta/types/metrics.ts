export interface MetricValue {
    value: string;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    subtitle?: string;
    progress?: number;
    goal?: number;
}

export interface MetricData {
    id: string;
    category: string;
    title: string;
    iconType: "users" | "user-plus" | "link";
    data: {
        today: MetricValue;
        month: MetricValue;
    };
}
