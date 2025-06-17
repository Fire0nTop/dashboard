import {RequireAuth} from '@/components/auth/require-auth';
import React from "react";
import {AppSidebar} from "@/components/sidebar/sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function ProtectedLayout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar/>
            <SidebarInset>
                <SidebarTrigger/>
                <RequireAuth>
                    {children}
                </RequireAuth>
            </SidebarInset>
        </SidebarProvider>
    );
}