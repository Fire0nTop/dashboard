"use client";

import Settings from "@/components/custom/components/settings";
import {GlassCard} from "@/components/custom/ui/glass-card";
import {CardContent} from "@/components/ui/card";
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function SettingsPage() {

    return (
        <BackgroundWrapper>
            <div className={'h-max w-full flex justify-center p-10'}>
                <GlassCard className={'w-1/3 h-min py-0'}>
                    <CardContent><Settings></Settings></CardContent>
                </GlassCard>
            </div>
        </BackgroundWrapper>
    )
}