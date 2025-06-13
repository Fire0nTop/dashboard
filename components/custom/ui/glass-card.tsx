import * as React from "react";
import {Card} from "@/components/ui/card";

export const GlassCard = ({ children, className = "" }: {
    children?: React.ReactNode,
    className?: string
}) => (
    <Card className={`backdrop-blur-xl rounded-3xl shadow-2xl bg-white/10 border border-white/20 ${className}`}>
        {children}
    </Card>
);