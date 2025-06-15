import { Card } from "@/components/ui/card"; // adjust if needed
import React from "react";

type GlassCardProps = React.ComponentProps<typeof Card>

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className = "", ...props }, ref) => (
        <Card
            ref={ref}
            className={`backdrop-blur-xl rounded-3xl shadow-2xl bg-white/10 border border-white/20 ${className}`}
            {...props}
        >
            {children}
        </Card>
    )
);

GlassCard.displayName = "GlassCard";
