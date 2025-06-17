import {CommandGroupType} from "@/types/command-items";
import {Home, UserIcon} from "lucide-react";
import {ROUTES} from "@/lib/routes";

export const commandConfig: CommandGroupType[] = [
    {
        title:"Navigation",
        items: [
            {
                title: "Home",
                url: ROUTES.HOME,
                icon: Home,
            },
            {
                title: "Login",
                url: ROUTES.LOGIN,
                icon: UserIcon,
            },
        ]
    }
]