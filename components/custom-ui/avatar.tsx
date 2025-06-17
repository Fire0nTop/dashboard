import { UserRoundIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    src?: string;
    username?: string;
    alt?: string;
    size?: number;
    className?: string;
}

export default function UserAvatar({
                                       src,
                                       username,
                                       alt,
                                       size = 16,
                                       className
                                   }: UserAvatarProps) {
    // Generate initials from username if available
    const getInitials = (name?: string) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(username);
    const displayAlt = alt || username || "User";

    return (
        <Avatar className={className}>
            <AvatarImage src={src} alt={displayAlt} />
            <AvatarFallback>
                {initials ? (
                    <span className="text-sm font-medium">{initials}</span>
                ) : (
                    <UserRoundIcon size={size} className="opacity-60" aria-hidden="true" />
                )}
            </AvatarFallback>
        </Avatar>
    );
}