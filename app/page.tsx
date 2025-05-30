"use client";
import { useSettings } from "@/app/settings/SettingsContext";
import { Dashboard } from "@/app/dashboard/dashboard";

export default function Home() {
    const { settings } = useSettings();

    return (
        <div
            className="h-svh w-svw flex bg-cover bg-center p-10"
            style={{
                backgroundImage: settings["bg-url"] ? `url(${settings["bg-url"]})` : undefined,
            }}
        >
            <Dashboard />
        </div>
    );
}
