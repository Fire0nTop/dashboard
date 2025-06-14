export type Profile = {
    id: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
    email_confirmed_at: string | null;
    last_sign_in_at: string | null;
    display_name: string | null;
    bio: string | null;
    auth_created_at: string;
    email: string;
};