'use client';
import { RequireAuth } from '@/components/custom/components/auth/require-auth';
import React from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <RequireAuth>{children}</RequireAuth>;
}