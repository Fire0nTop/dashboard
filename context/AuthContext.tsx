'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import {Profile} from "@/types/auth/profile";
import {useNavigation} from "@/hooks/useNavigation";

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

    const {goLogin} = useNavigation()

    useEffect(() => {
        const fetchUserData = async (currentUser: User | null) => {
            if (currentUser) {
                const { data: currentProfile, error } = await supabase
                    .rpc('get_current_user_profile');

                // Fixed: currentProfile is a single object, not an array
                if (!error && currentProfile) {
                    setUserProfile(currentProfile as Profile);
                } else {
                    console.error('Error fetching profile:', error);
                    setUserProfile(null);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            fetchUserData(currentUser);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            fetchUserData(currentUser);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setUserProfile(null);
        goLogin()
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, userProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);