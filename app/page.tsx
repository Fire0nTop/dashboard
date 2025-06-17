import {GlassCard} from "@/components/custom-ui/glass-card";
import Link from "next/link";
import {ROUTES} from "@/lib";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col p-4">
            <GlassCard className="w-full max-w-md">
                <h1>Home page</h1>
                <Link href={ROUTES.HOME}>Go To Home</Link>
            </GlassCard>
        </div>
    );
}