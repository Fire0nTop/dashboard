'use client';

import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import LoadingProfile from "@/components/auth/loading-profile";
import {useNavigation} from "@/hooks/useNavigation";

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const { goLogin } = useNavigation()

    useEffect(() => {
        if (!loading && !user) {
            goLogin()
        }
    }, [loading, user, goLogin]);

    if (loading || !user) return <LoadingProfile/>;

    return <>{children}</>;
}