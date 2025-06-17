import { BackgroundWrapper } from "@/components/custom-ui/background-wrapper";
import { GlassCard } from "@/components/custom-ui/glass-card";
import Link from "next/link";
import {ROUTES} from "@/lib";

export default function HomePage() {
    return (
        <BackgroundWrapper>
            <div className="min-h-screen flex items-center justify-center p-4">
                <GlassCard className="w-full max-w-md">
                    <h1>Home page</h1>
                    <Link href={ROUTES.HOME}>Go To Home</Link>
                </GlassCard>
            </div>
        </BackgroundWrapper>
    );
}