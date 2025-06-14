'use client';

import { useEffect, useState } from 'react';
import { BackgroundWrapper } from "@/components/custom/ui/background-wrapper";
import { teamsApi } from "@/lib";
import {Team} from "@/types/db";

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const userTeams = await teamsApi.getUserTeams();
                setTeams(userTeams);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <BackgroundWrapper>
            <p>Teams page</p>
            <div>
                {teams.map(team => (
                    <div key={team.id}>{team.team_name}</div>
                ))}
            </div>
        </BackgroundWrapper>
    );
}