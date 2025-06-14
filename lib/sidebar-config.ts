import {sidebarItems} from "@/types/sidebar/sidebaritems";
import {Home, LayoutDashboard, Settings, UserIcon, Users} from "lucide-react";

export const SidebarConfig: sidebarItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserIcon,
    },
    {
        title: "Teams",
        url: "/teams",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
]