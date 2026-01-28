"use client";

import { Gift, Flame, Award, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProductData } from "@/types/dashboard";

interface ProductPerformanceProps {
    products: ProductData[];
}

interface ProductItemProps {
    product: ProductData;
}

function ProductItem({ product }: ProductItemProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case "gift": return { icon: <Gift size={20} className="text-[var(--primary)]" />, bg: "bg-[#ede9fe]" };
            case "flame": return { icon: <Flame size={20} className="text-[var(--warning)]" />, bg: "bg-[var(--warning-bg)]" };
            case "award": return { icon: <Award size={20} className="text-[#ec4899]" />, bg: "bg-[#fdf2f8]" };
            default: return { icon: <Gift size={20} className="text-[var(--primary)]" />, bg: "bg-[#ede9fe]" };
        }
    };

    const { icon, bg } = getIcon(product.iconType);

    return (
        <div className="group flex cursor-pointer items-center gap-3 rounded-xl bg-[var(--muted)] p-3 transition-all duration-200 hover:bg-[var(--secondary)] sm:p-4">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11", bg)}>
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[var(--card-foreground)] sm:text-[14px]">
                    {product.name}
                    {product.isHot && <span className="ml-1">🔥</span>}
                </p>
                <p className="truncate text-[12px] text-[var(--muted-foreground)]">{product.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <span
                    className="text-[13px] font-semibold sm:text-[14px]"
                    style={{ color: `var(--${product.trendColor})` }}
                >
                    {product.percentage}
                </span>
                <ChevronRight size={16} className="text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5" />
            </div>
        </div>
    );
}

export function ProductPerformance({ products }: ProductPerformanceProps) {
    return (
        <Card className="flex flex-col p-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] sm:p-6 xl:flex-1">
            <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[15px] font-semibold text-[var(--card-foreground)] sm:text-base">
                    Product Performance
                </h2>
                <Badge variant="warning" className="pulse-soft text-[10px]">
                    HOT TOPICS
                </Badge>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </Card>
    );
}
