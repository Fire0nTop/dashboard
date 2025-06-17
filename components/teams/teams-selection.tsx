"use client"
import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '@/lib/api';
import { Team } from "@/types/db";
import HoverTeamCard from "@/components/teams/hover-team-card";

export default function TeamsSelection() {
    const {
        data: teams,
        isLoading,
        error,
    } = useQuery<Team[]>({
        queryKey: ['userTeams'],
        queryFn: () => teamsApi.getUserTeams(),
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData,
    });

    if (isLoading && !teams) return <p>Loading...</p>;
    if (error) return <p>Error loading teams. {error.message}</p>;

    if (teams && teams.length > 0) {
        return (
            <div>
                <h1>Your Teams</h1>
                <ul>
                    {teams.map((team: Team) => (
                        <HoverTeamCard key={team.id} team={team} link={true} />
                    ))}
                </ul>
            </div>
        );
    }

    return <p>Teams Unavailable</p>;
}
