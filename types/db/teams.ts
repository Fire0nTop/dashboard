import {Member} from "@/types/auth/member";

export interface Team {
    id: string;
    team_name: string;
    description: string | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
    is_owner: boolean;
    member_count: number;
    avatar_url: string | null;
}

export interface TeamWithMembers extends Team{
    members: Member[];
}

export type EditableTeam = Omit<Team, 'id' | 'created_at' | 'updated_at' | 'is_owner' | 'member_count'>;
