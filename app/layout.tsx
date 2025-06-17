import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/custom-ui/theme-provider";
import {SettingsProvider} from "@/context/SettingsContext";
import {AuthProvider} from "@/context/AuthContext";
import React from "react";
import QueryProvider from "@/context/query-provider";

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
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </AuthProvider>
            </SettingsProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
