import { GlassCard } from "@/components/custom/glass-card";
import { CardContent } from "@/components/ui/card";
import * as React from "react";
import Link from "next/link";

export const DashboardCard = ({
                                  children,
                                  className = "",
                                  link = false,
                                  href = "#",
                              }: {
    children?: React.ReactNode;
    className?: string;
    link?: boolean;
    href?: string;
}) => {
    return (
        <GlassCard className={`max-w-max max-h-max ${link ? "p-0": ""} ${className}`}>
            {link ? (
                <Link href={href} className="block py-4">
                    <CardContent>{children}</CardContent>
                </Link>
            ) : (
                <CardContent>{children}</CardContent>
            )}
        </GlassCard>
    );
};
