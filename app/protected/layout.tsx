'use client';
import { RequireAuth } from '@/components/custom/components/auth/require-auth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <RequireAuth>{children}</RequireAuth>;
}