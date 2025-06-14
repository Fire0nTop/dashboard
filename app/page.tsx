import Link from "next/link";
import { Button } from "@/components/custom/ui/button";
import { BackgroundWrapper } from "@/components/custom/ui/background-wrapper";
import { GlassCard } from "@/components/custom/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
    return (
        <BackgroundWrapper>
            <div className="min-h-screen flex items-center justify-center p-4">
                <GlassCard className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold mb-2">
                            Welcome
                        </CardTitle>
                        <p className="text-muted-foreground">
                            Get started with your dashboard
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-3">
                            <Link href="/dashboard" className="w-full">
                                <Button variant="default" className="w-full">
                                    Go to Dashboard
                                </Button>
                            </Link>
                            <Link href="/settings" className="w-full">
                                <Button variant="glass" className="w-full">
                                    Settings
                                </Button>
                            </Link>
                            <Link href="/teams" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Teams
                                </Button>
                            </Link>
                        </div>
                        <div className="pt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Choose an option to continue
                            </p>
                        </div>
                    </CardContent>
                </GlassCard>
            </div>
        </BackgroundWrapper>
    );
}