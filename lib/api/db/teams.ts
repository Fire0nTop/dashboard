import {supabase} from "@/lib";
import {Team, TeamWithMembers} from "@/types/db";

export const teamsApi = {
    async getUserTeams(): Promise<Team[]> {
        const { data, error } = await supabase.rpc('get_user_teams');

        if (error) {
            console.error('Error fetching user teams:', error);
            return [];
        }

        return data || [];
    },

    async getTeamWithMembers(teamId: string): Promise<TeamWithMembers | null> {
        const { data, error } = await supabase.rpc('get_team_with_members', {
            team_uuid: teamId
        });

        if (error) {
            console.error('Error fetching team with members:', error);
            return null;
        }

        return data?.[0] || null;
    },

    async createTeam(teamData: { team_name: string; description?: string }): Promise<Team | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('teams')
            .insert({
                team_name: teamData.team_name,
                description: teamData.description,
                owner_id: user.id
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating team:', error);
            return null;
        }

        return data;
    },

    async updateTeam(teamId: string, updates: { team_name?: string; description?: string }): Promise<Team | null> {
        const { data, error } = await supabase
            .from('teams')
            .update(updates)
            .eq('id', teamId)
            .select()
            .single();

        if (error) {
            console.error('Error updating team:', error);
            return null;
        }

        return data;
    },

    async deleteTeam(teamId: string): Promise<boolean> {
        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        if (error) {
            console.error('Error deleting team:', error);
            return false;
        }

        return true;
    },

    async addTeamMember(teamId: string, userId: string): Promise<boolean> {
        const { error } = await supabase
            .from('team_members')
            .insert({
                team_id: teamId,
                user_id: userId
            });

        if (error) {
            console.error('Error adding team member:', error);
            return false;
        }

        return true;
    },

    async removeTeamMember(teamId: string, userId: string): Promise<boolean> {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('team_id', teamId)
            .eq('user_id', userId);

        if (error) {
            console.error('Error removing team member:', error);
            return false;
        }

        return true;
    },

    async leaveTeam(teamId: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('team_id', teamId)
            .eq('user_id', user.id);

        if (error) {
            console.error('Error leaving team:', error);
            return false;
        }

        return true;
    }
};