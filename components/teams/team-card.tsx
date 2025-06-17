import UserAvatar from "@/components/custom-ui/avatar";
import React from "react";
import {Team} from "@/types/db";
import Link from "next/link";
import {ROUTES} from "@/lib";

interface UserCardProps {
    team?: Team
    link?: boolean
    size?: number;
    className?: string;

}

export default function TeamCard({ team, size = 16, link = false }: UserCardProps) {
    const content = (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
                username={team?.team_name ? team?.team_name : undefined}
                src={team?.avatar_url ? team?.avatar_url : undefined}
                size={size}
                alt={team?.team_name ? team?.team_name : undefined}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{team?.team_name}</span>
                <span className="truncate font-medium">{team?.description}</span>
            </div>
        </div>
    );

    if (link && team !== undefined) {
        return <Link href={ROUTES.TEAMS + "?id=" + team?.id}>{content}</Link>;
    }

    return content;
}