import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Profile} from "@/types";
import UserAvatar from "@/components/custom-ui/avatar";
import React from "react";
import Link from "next/link";

interface UserCardProps {
    profile?: Profile
    size?: number;
    className?: string;
    link?: boolean;
    show_friend?: boolean;
}

export default function HoverUserCard({
                                          profile,
                                          size = 16,
                                          link = false,
                                          show_friend = false,
                                      }: UserCardProps) {
    return (
        <HoverCard>
            <div className="flex items-center gap-3">
                <UserAvatar
                    username={profile?.display_name ? profile.display_name : undefined}
                    src={profile?.avatar_url ? profile.avatar_url : undefined}
                    size={size}
                    alt="Avatar"
                />
                <div className="space-y-0.5">
                    <HoverCardTrigger asChild>
                        <div>
                            <Link className="text-sm font-medium hover:underline" href={link ? "#" : ""} hidden={!link}>
                                {profile?.display_name}
                            </Link>
                            <p className="text-sm font-medium hover:underline" hidden={link}>
                                {profile?.display_name}
                            </p>
                        </div>
                    </HoverCardTrigger>
                    <p className="text-muted-foreground text-xs">
                        {profile?.email}
                    </p>
                </div>
            </div>
            <HoverCardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            username={profile?.display_name ? profile.display_name : undefined}
                            src={profile?.avatar_url ? profile.avatar_url : undefined}
                            size={size * 2}
                            alt="Avatar"
                        />
                        <div className="space-y-0.5">
                            <p className="text-sm font-medium">{profile?.display_name}</p>
                            <p className="text-muted-foreground text-xs">{profile?.email}</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {profile?.bio}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5" hidden={!show_friend}>
                            <UserAvatar
                                username={profile?.display_name ? profile.display_name : undefined}
                                src={profile?.avatar_url ? profile.avatar_url : undefined}
                                size={size}
                                alt="Avatar"
                            />{/*TODO: fix this*/}
                            <UserAvatar
                                username={profile?.display_name ? profile.display_name : undefined}
                                src={profile?.avatar_url ? profile.avatar_url : undefined}
                                size={size}
                                alt="Avatar"
                            />{/*TODO: fix this*/}
                            <UserAvatar
                                username={profile?.display_name ? profile.display_name : undefined}
                                src={profile?.avatar_url ? profile.avatar_url : undefined}
                                size={size}
                                alt="Avatar"
                            />{/*TODO: fix this*/}
                        </div>
                        <div className="text-muted-foreground text-xs" hidden={!show_friend}>
                            x mutual friends {/*TODO: fix this*/}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
