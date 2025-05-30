import {GlassCard} from "@/components/custom/glass-card";
import {CardContent} from "@/components/ui/card";
import {ModeToggle} from "@/components/custom/mode-toggle";

export function Sidebar() {
    return (
        <div className={"absolute w-20 h-full p-4 hover:w-max"}>
            <GlassCard className={"h-full w-full flex items-center"}>
                <CardContent>
                    <ModeToggle></ModeToggle>
                </CardContent>
            </GlassCard>
        </div>
    )
}