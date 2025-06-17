import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import UserAvatar from "@/components/custom-ui/avatar";
import React from "react";
import {Team} from "@/types/db";
import {ROUTES} from "@/lib";
import Link from "next/link";

interface UserCardProps {
    team?: Team
    size?: number;
    className?: string;
    link?: boolean;
}

export default function HoverTeamCard({
                                          team,
                                          size = 16,
                                          link = false,
                                      }: UserCardProps) {
    return (
        <HoverCard>
            <div className="flex items-center gap-3">
                <UserAvatar
                    username={team?.team_name ? team.team_name : undefined}
                    src={team?.avatar_url ? team.avatar_url : undefined}
                    size={size}
                    alt="Avatar"
                />
                <div className="space-y-0.5">
                    <HoverCardTrigger asChild>
                        <div>
                            <Link className="text-sm font-medium hover:underline"
                                  href={ROUTES.TEAMS + "?id=" + team?.id} hidden={!link}>{/*TODO: fix this*/}
                                {team?.team_name}
                            </Link>
                            <p className="text-sm font-medium hover:underline" hidden={link}>
                                {team?.team_name}
                            </p>
                        </div>
                    </HoverCardTrigger>
                    <p className="text-muted-foreground text-xs">
                        {team?.owner_id}
                    </p>
                </div>
            </div>
            <HoverCardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            username={team?.team_name ? team.team_name : undefined}
                            src={team?.avatar_url ? team.avatar_url : undefined}
                            size={size * 2}
                            alt="Avatar"
                        />
                        <div className="space-y-0.5">
                            <p className="text-sm font-medium">{team?.team_name}</p>
                            <p className="text-muted-foreground text-xs">{team?.owner_id}</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {team?.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="text-muted-foreground text-xs">
                            {team?.member_count} members
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
