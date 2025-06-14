"use client";

import Settings from "@/app/(protected)/settings/settings";
import Link from "next/link";
import {GlassCard} from "@/components/custom/ui/glass-card";
import {CardContent} from "@/components/ui/card";
import {Button} from "@/components/custom/ui/button";
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function SettingsPage() {

    return (
        <BackgroundWrapper>
            <Link href="/public"><Button variant={"glass"}>Go to Home</Button></Link>
            <div className={'h-max w-full flex justify-center p-10'}>
                <GlassCard className={'w-1/3 h-min py-0'}>
                    <CardContent><Settings></Settings></CardContent>
                </GlassCard>
            </div>
        </BackgroundWrapper>
    )
}