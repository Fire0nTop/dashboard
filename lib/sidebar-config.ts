import {sidebarItems} from "@/types/sidebar/sidebaritems";
import {Home, LayoutDashboard, Settings, Users} from "lucide-react";

export const SidebarConfig: sidebarItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
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