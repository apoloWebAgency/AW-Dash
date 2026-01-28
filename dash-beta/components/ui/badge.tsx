import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-[var(--primary)] text-white",
                secondary: "bg-[var(--muted)] text-[var(--muted-foreground)]",
                success: "bg-[#dcfce7] text-[var(--success)]",
                warning: "bg-[#fff7ed] text-[var(--warning)]",
                error: "bg-[#fee2e2] text-[var(--error)]",
                outline: "border border-[var(--border)] text-[var(--muted-foreground)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
