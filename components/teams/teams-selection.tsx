"use client"
import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '@/lib/api';
import { Team } from "@/types/db";
import TeamCard from "@/components/teams/team-card";

export default function TeamsSelection() {
    const {
        data: teams,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['userTeams'],
        queryFn: () => teamsApi.getUserTeams(),
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });

    if (isLoading || isFetching) return <p>Loading...</p>;
    if (error) return <p>Error loading teams.</p>;

    if (teams && teams.length > 0) {
        return (
            <div>
                <h1>Your Teams</h1>
                <ul>
                    {teams.map((team: Team) => (
                        <TeamCard key={team.id} team={team} link={true} />
                    ))}
                </ul>
            </div>
        );
    }

    return <p>Teams Unavailable</p>;
}
