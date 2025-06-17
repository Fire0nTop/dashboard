import React from "react";
import { Profile } from "@/types";
import {ScrollArea} from "@/components/ui/scroll-area";
import HoverUserCard from "@/components/user/hover-user-card";

interface UserListProps {
    users: Profile[];
    height?: string;
    className?: string;
    cardSize?: number;
    emptyMessage?: string;
}

export default function UserList({
                                     users,
                                     height = "h-64",
                                     className = "",
                                     cardSize = 16,
                                     emptyMessage = "No users found"
                                 }: UserListProps) {
    if (users.length === 0) {
        return (
            <div className={`flex items-center justify-center ${height} ${className}`}>
                <p className="text-muted-foreground text-sm">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <ScrollArea className={`${height} ${className}`}>
            <div className="space-y-1 p-2">
                {users.map((user, index) => (
                    <HoverUserCard
                        key={user.id || user.email || index}
                        profile={user}
                        size={cardSize}
                    />
                ))}
            </div>
        </ScrollArea>
    );
}