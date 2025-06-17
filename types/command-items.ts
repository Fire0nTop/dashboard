import {User} from "lucide-react";

export interface CommandItems {
    title: string;
    icon: typeof User
    url?: string //TODO: fix this (make 2 options one with href other with onclick no optionals)
    onClick?: () => void
}

export interface CommandGroupType {
    title: string;
    items: CommandItems[];
}