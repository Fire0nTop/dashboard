import UserAvatar from "@/components/custom-ui/avatar";
import React from "react";
import {Profile} from "@/types";

interface UserCardProps {
    profile?:Profile
    size?: number;
    className?: string;

}

export default function UserCard({
                                      profile,
                                      size = 16,
                                  }: UserCardProps) {

    return (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
                username={profile?.display_name ? profile.display_name : undefined}
                src={profile?.avatar_url ? profile.avatar_url : undefined}
                size={size}
                alt={profile?.display_name ? profile.display_name : undefined}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{profile?.display_name}</span>
                <span className="truncate font-medium">{profile?.email}</span>
            </div>
        </div>
    )
}