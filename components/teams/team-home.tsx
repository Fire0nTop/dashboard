"use client"
import { useQuery } from "@tanstack/react-query";
import { teamsApi } from "@/lib";
import { Member } from "@/types/auth/member";
import {Tabs, TabsContent, TabsList,TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {CheckSquareIcon, LayoutDashboardIcon,SettingsIcon} from "lucide-react";
import TeamForm from "@/components/teams/team-form";
import {Team} from "@/types/db";

export default function TeamHome({ id }: { id: string }) {
    const {
        data: team_with_member,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['userTeam', id],
        queryFn: () => teamsApi.getTeamWithMembers(id),
        refetchInterval: 10000,
        refetchOnWindowFocus: false,
    });

    if (isLoading || isFetching) return <p>loading...</p>;
    if (error) return <p>error {error.message}</p>;

    const isOwner = !!team_with_member?.is_owner

    if (team_with_member?.members && team_with_member.members.length > 0) {
        return (
            <Tabs defaultValue="overview">
                <ScrollArea>
                    <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
                        <TabsTrigger value="overview" className="tab-trigger">
                            <LayoutDashboardIcon className="-ms-0.5 me-1.5 opacity-60" size={16} />
                            Overview
                        </TabsTrigger>

                        <TabsTrigger value="tasks" className="tab-trigger">
                            <CheckSquareIcon className="-ms-0.5 me-1.5 opacity-60" size={16} />
                            Task Collections
                        </TabsTrigger>

                        {isOwner && (
                            <TabsTrigger value="settings" className="tab-trigger">
                                <SettingsIcon className="-ms-0.5 me-1.5 opacity-60" size={16} />
                                Settings
                            </TabsTrigger>
                        )}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="overview">
                    <h1>Team: {team_with_member.team_name}</h1>
                    <p>Members:</p>
                    <ul>
                        {team_with_member.members.map((member: Member) => (
                            <li key={member.user_id}>{member.display_name}</li>
                        ))}
                    </ul>
                </TabsContent>

                <TabsContent value="tasks">
                    <div className="p-4">✅ <strong>Task Collections</strong> — Add your task list here</div>
                </TabsContent>

                {isOwner && (
                    <TabsContent value="settings">
                        <TeamForm data={team_with_member as Team} onSubmit={
                            (data) => {
                                teamsApi.updateTeam(data as Team) //TODO: fix this
                                refetch()
                            }
                        }></TeamForm>
                    </TabsContent>
                )}
            </Tabs>
        );
    }

    return <p>Team Unavailable</p>;
}
