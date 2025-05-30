"use client";

import Settings from "@/app/settings/settings";
import Link from "next/link";
import {GlassCard} from "@/components/custom/glass-card";
import {CardContent} from "@/components/ui/card";
import {useSettings} from "@/app/settings/SettingsContext";
import {Button} from "@/components/custom/button";

export default function SettingsPage() {

    const { settings } = useSettings();

    return (
        <div
            className="h-svh w-svw flex bg-cover bg-center p-10"
            style={{
                backgroundImage: settings["bg-url"] ? `url(${settings["bg-url"]})` : undefined,
            }}
        >
            <Link href="/"><Button variant={"glass"}>Go to Home</Button></Link>
            <div className={'h-max w-full flex justify-center p-10'}>
                <GlassCard className={'w-1/3 h-min py-0'}>
                    <CardContent><Settings></Settings></CardContent>
                </GlassCard>
            </div>
        </div>
    )
}