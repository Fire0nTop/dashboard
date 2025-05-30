"use client";
import React, { JSX } from "react";
import { useSettings } from "./SettingsContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/custom/button";
import { Textarea } from "@/components/ui/textarea";
import { settingsConfig } from "./settings-config";
import {useTheme} from "next-themes";

// Define your types here or import them from a separate file if you prefer
type SettingType = "input" | "textarea" | "switch" | "select";

interface Setting {
    key: string;
    label: string;
    type: SettingType;
    defaultValue: string | boolean;
    options?: string[];
}

interface Section {
    title: string;
    settings: Setting[];
}

interface Tab {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    sections: Record<string, Section>;
}

export default function Settings(): JSX.Element {
    const { settings, setSettings, saveSettings } = useSettings();
    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
    const [saveStatus, setSaveStatus] = React.useState<"" | "saving" | "saved" | "error">(
        ""
    );
    const firstTabKey = Object.keys(settingsConfig)[0];
    const [activeTab, setActiveTab] = React.useState<string>(firstTabKey);

    const { setTheme } = useTheme();

    React.useEffect(() => {
        if (hasUnsavedChanges) {
            const timeoutId = setTimeout(() => {
                setSaveStatus("saving");
                const success = saveSettings();
                if (success) {
                    setSaveStatus("saved");
                    setHasUnsavedChanges(false);
                    setTimeout(() => setSaveStatus(""), 2000);
                } else {
                    setSaveStatus("error");
                    setTimeout(() => setSaveStatus(""), 3000);
                }
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [settings, hasUnsavedChanges, saveSettings]);

    React.useEffect(() => {
        // If your settings object contains a 'theme' key
        if (settings.theme) {
            setTheme(settings.theme as "light" | "dark" | "system");
        }
    }, [settings.theme, setTheme]);

    const handleSettingChange = (key: string, value: string | boolean) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setHasUnsavedChanges(true);
    };

    const handleSaveChanges = () => {
        setSaveStatus("saving");
        const success = saveSettings();
        if (success) {
            setSaveStatus("saved");
            setHasUnsavedChanges(false);
            setTimeout(() => setSaveStatus(""), 2000);
        } else {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(""), 3000);
        }
    };

    const handleResetToDefaults = () => {
        const defaultSettings: Record<string, string | boolean> = {};
        Object.values(settingsConfig).forEach((tab) => {
            Object.values(tab.sections).forEach((section) => {
                section.settings.forEach((setting) => {
                    defaultSettings[setting.key] = setting.defaultValue;
                });
            });
        });
        setSettings(defaultSettings);
        setHasUnsavedChanges(true);
        try {
            localStorage.removeItem("settings");
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    };

    const renderSetting = (setting: Setting) => {
        const { key, label, type, options, defaultValue } = setting;
        const value = settings[key] ?? defaultValue;

        switch (type) {
            case "input":
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                            id={key}
                            value={value as string}
                            onChange={(e) => handleSettingChange(key, e.target.value)}
                        />
                    </div>
                );
            case "textarea":
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{label}</Label>
                        <Textarea
                            id={key}
                            value={value as string}
                            onChange={(e) => handleSettingChange(key, e.target.value)}
                            rows={3}
                        />
                    </div>
                );
            case "switch":
                return (
                    <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key}>{label}</Label>
                        <Switch
                            id={key}
                            checked={value as boolean}
                            onCheckedChange={(checked) => handleSettingChange(key, checked)}
                        />
                    </div>
                );
            case "select":
                return (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{label}</Label>
                        <Select
                            value={value as string}
                            onValueChange={(val) => handleSettingChange(key, val)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderSection = (key: string, section: Section) => (
        <Card key={key} className="mb-6">
            <CardHeader>
                <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">{section.settings.map(renderSetting)}</CardContent>
        </Card>
    );

    const renderTabContent = (key: string, tab: Tab) => (
        <TabsContent key={key} value={key} className="space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">{tab.title}</h2>
                <p className="text-muted-foreground">{tab.description}</p>
            </div>
            {Object.entries(tab.sections).map(([secKey, sec]) => renderSection(secKey, sec))}
            <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleResetToDefaults}>
                    Reset to Defaults
                </Button>
                <Button onClick={handleSaveChanges} disabled={!hasUnsavedChanges || saveStatus === "saving"}>
                    {saveStatus === "saving" ? "Saving..." : "Save Changes"}
                </Button>
            </div>
            {saveStatus && (
                <div
                    className={`text-sm text-center py-2 ${
                        saveStatus === "saved"
                            ? "text-green-600"
                            : saveStatus === "error"
                                ? "text-red-600"
                                : "text-blue-600"
                    }`}
                >
                    {saveStatus === "saved" && "✓ Settings saved successfully"}
                    {saveStatus === "saving" && "⏳ Saving settings..."}
                    {saveStatus === "error" && "✗ Error saving settings"}
                </div>
            )}
        </TabsContent>
    );

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex flex-wrap mb-6 space-x-2">
                    {Object.entries(settingsConfig).map(([key, tab]) => (
                        <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                            <tab.icon className="w-4 h-4 mr-2" />
                            {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {Object.entries(settingsConfig).map(([key, tab]) => renderTabContent(key, tab))}
            </Tabs>
        </div>
    );
}
