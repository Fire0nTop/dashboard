import {sidebarItems} from "@/types/sidebar/sidebaritems";
import {BracketsIcon, Home, LayoutDashboard, Settings, UserIcon, Users} from "lucide-react";
import {ROUTES} from "@/lib/routes";

export const SidebarConfig: sidebarItems = [
    {
        title: "Home",
        url: ROUTES.HOME,
        icon: Home,
    },
    {
        title: "Profile",
        url: ROUTES.PROFILE,
        icon: UserIcon,
    },
    {
        title: "Teams",
        url: ROUTES.TEAMS,
        icon: Users,
    },
    {
        title: "Settings",
        url: ROUTES.SETTINGS,
        icon: Settings,
    },
    {
        title: "Dashboard",
        url: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: "DEV",
        url: ROUTES.DEV,
        icon: BracketsIcon,
    },
]