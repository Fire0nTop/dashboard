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
import UserAvatar from "@/components/custom/ui/avatar";
import {useNavigation} from "@/hooks";

export function NavUser() {
    const { isMobile } = useSidebar()

    const {logout,userProfile,user} = useAuth()
    const {goLogin,goSettings,goProfile} = useNavigation()

    const user_name: string | undefined  = userProfile?.display_name ? userProfile?.display_name : undefined
    const avatar_url: string | undefined = userProfile?.avatar_url ? userProfile?.avatar_url : undefined
    const user_email: string | undefined = user?.email ? user?.email : undefined

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserAvatar
                                username={user_name}
                                src={avatar_url}
                            />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user_name ? user_name : "Not logged in"}</span>
                                <span className="truncate text-xs">{user_email}</span>
                            </div>
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
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserAvatar
                                    username={user_name}
                                    src={avatar_url}
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user_name ? user_name : "Not logged in"}</span>
                                    <span className="truncate text-xs">{user_email}</span>
                                </div>
                            </div>
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