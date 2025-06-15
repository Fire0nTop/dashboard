import UserAvatar from "@/components/custom/ui/avatar";
import React from "react";
import {Team} from "@/types/db";

interface UserCardProps {
    team?:Team
    size?: number;
    className?: string;

}

export default function UserCard({
                                     team,
                                     size = 16,
                                 }: UserCardProps) {

    return (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
                username={team?.team_name ? team?.team_name : undefined}
                src={team?.avatar_url ? team?.avatar_url: undefined}
                size={size}
                alt={team?.team_name ? team?.team_name : undefined}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{team?.team_name}</span>
                <span className="truncate font-medium">{team?.description}</span>
            </div>
        </div>
    )
}