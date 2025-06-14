'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Profile } from "@/types/auth/profile";
import { useNavigation } from "@/hooks/useNavigation";
import { authApi } from '@/lib/';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    userProfile: Profile | null;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
    userProfile: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    const { goLogin } = useNavigation();

    useEffect(() => {
        const fetchUserData = async (currentUser: User | null) => {
            if (currentUser) {
                const profile = await authApi.getCurrentUserProfile();
                setUserProfile(profile);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        };

        // Initial session check
        authApi.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            fetchUserData(currentUser);
        });

        // Listen for auth changes
        const { data: listener } = authApi.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            fetchUserData(currentUser);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        try {
            await authApi.signOut();
            setUser(null);
            setUserProfile(null);
            goLogin();
        } catch (error) {
            console.error('Logout failed:', error);
            // You might want to handle this error differently
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, userProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);