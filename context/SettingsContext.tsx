"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SettingsState } from "@/types/settings-types";
import { settingsConfig } from "@/lib/settings-config";

const STORAGE_KEY = "settings";

const getDefaultSettings = (): SettingsState => {
    const defaultSettings: SettingsState = {};
    Object.values(settingsConfig).forEach((tab) => {
        Object.values(tab.sections).forEach((section) => {
            section.settings.forEach((setting) => {
                defaultSettings[setting.key] = setting.defaultValue;
            });
        });
    });
    return defaultSettings;
};

const loadSettingsFromStorage = (): SettingsState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...getDefaultSettings(), ...parsed };
        }
    } catch (error) {
        console.error("Error loading settings from localStorage:", error);
    }
    return getDefaultSettings();
};

const saveSettingsToStorage = (settings: SettingsState): boolean => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error("Error saving settings to localStorage:", error);
        return false;
    }
};

interface SettingsContextType {
    settings: SettingsState;
    setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
    saveSettings: () => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<SettingsState>(getDefaultSettings());

    useEffect(() => {
        const loaded = loadSettingsFromStorage();
        setSettings(loaded);
    }, []);

    const saveSettings = (): boolean => {
        return saveSettingsToStorage(settings);
    };

    return (
        <SettingsContext.Provider value={{ settings, setSettings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
