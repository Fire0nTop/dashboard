import React from "react";

export interface Setting {
    key: string;
    label: string;
    type: SettingType;
    defaultValue: string | boolean;
    options?: string[];
}

export interface SettingSection {
    title: string;
    settings: Setting[];
}
export type SettingsState = Record<string, string | boolean>;

export type SettingType = 'input' | 'textarea' | 'switch' | 'select';
export type IconComponent = React.ComponentType<{ className?: string }>;
export interface Section {
    title: string;
    settings: Setting[];
}

export interface Tab {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    sections: Record<string, Section>;
}

export type SettingsConfig = Record<string, Tab>;