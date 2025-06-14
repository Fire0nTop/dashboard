import {Home, LayoutDashboard, Settings, Users} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {NavUser} from "@/components/custom/components/sidebar/nav-user";
import React from "react";
import {RoutePath} from "@/lib/routes";
const user = {
        name: "Tom",
        email: "tomIstGeil@geilo.ficken",
        avatar: "https://avatars.githubusercontent.com/u/162488526?v=4",
    }

interface sidebarItem {
    title: string,
    url: RoutePath,
    icon: typeof Users //TODO fix this type
}

// Menu items.
const items: sidebarItem[] = [
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}