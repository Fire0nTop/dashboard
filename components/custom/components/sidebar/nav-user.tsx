"use client"

import {
    ChevronsUpDown,
    LogIn,
    LogOut, Settings,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {useAuth} from "@/context/AuthContext";
import {useNavigation} from "@/hooks";
import UserCard from "@/components/custom/components/user/user-card";

export function NavUser() {
    const { isMobile } = useSidebar()

    const {logout,userProfile,user} = useAuth()
    const {goLogin,goSettings,goProfile} = useNavigation()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserCard profile={userProfile ? userProfile : undefined} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <UserCard profile={userProfile ? userProfile : undefined} />
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                <button onClick={goProfile}>
                                    Profile
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                <button onClick={goSettings}>
                                    Settings
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {user ? (
                                <>
                                    <LogOut />
                                    <button onClick={logout}>
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <LogIn />
                                    <button onClick={goLogin}>
                                        Log in
                                    </button>
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}