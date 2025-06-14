import {RouteDefinitionsPath} from "@/types/routes";
import {Users} from "lucide-react";

export interface sidebarItem {
    title: string,
    url: RouteDefinitionsPath,
    icon: typeof Users //TODO fix this type
}