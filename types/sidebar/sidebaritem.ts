import {RouteDefinitionsPath} from "@/types/routes";
import {User} from "lucide-react";

export interface sidebarItem {
    title: string,
    url: RouteDefinitionsPath,
    icon: typeof User
}