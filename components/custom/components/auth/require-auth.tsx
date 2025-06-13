'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingProfile from "@/components/custom/components/auth/loading-profile";

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, user, router]);

    if (loading || !user) return <LoadingProfile/>;

    return <>{children}</>;
}