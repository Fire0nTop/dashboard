import { supabase } from '@/lib/supabase/client';
import { Profile } from '@/types/auth/profile';

export const authApi = {
    async getCurrentUserProfile(): Promise<Profile | null> {
        const { data, error } = await supabase.rpc('get_current_user_profile');

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return data as Profile;
    },

    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },

    async getSession() {
        return supabase.auth.getSession();
    },

    onAuthStateChange(callback: (event: any, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    }
};

