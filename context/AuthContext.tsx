'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import {Profile} from "@/types/auth/profile";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    profile: Profile | null;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
    profile: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchUserData = async (currentUser: User | null) => {
            if (currentUser) {

                const { data: currentProfile, error } = await supabase
                    .from('user_profiles')
                    .select('id, display_name, email, last_sign_in_at')
                    .eq('id', currentUser.id)
                    .single();

                if (!error) {
                    setProfile(currentProfile);
                } else {
                    console.error('Error fetching profile:', error);
                    setProfile(null);
                }
            } else {
                setProfile(null);
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
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, profile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
