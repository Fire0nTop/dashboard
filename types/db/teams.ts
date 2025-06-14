export interface Team {
    id: string;
    team_name: string;
    description: string | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
    is_owner: boolean;
    member_count: number;
}

export interface TeamMember {
    user_id: string;
    joined_at: string;
    display_name: string | null;
    avatar_url: string | null;
}

export interface TeamWithMembers extends Omit<Team, 'member_count'> {
    members: TeamMember[];
}