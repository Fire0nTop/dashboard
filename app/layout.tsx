import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/custom/ui/theme-provider";
import {SettingsProvider} from "@/context/SettingsContext";
import {AuthProvider} from "@/context/AuthContext";
import React from "react";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/custom/components/sidebar/sidebar";

export const metadata: Metadata = {
    title: "The Dashboard Project",
    description: "Build by the VoidTalk Team",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SettingsProvider>
                <AuthProvider>
                    <SidebarProvider>
                        <AppSidebar/>
                        <SidebarInset>
                            <SidebarTrigger />
                            {children}
                        </SidebarInset>
                    </SidebarProvider>
                </AuthProvider>
            </SettingsProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
