import Link from "next/link";
import {ROUTES} from "@/lib";
import CommandSearch from "@/components/custom-ui/command-search";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {BackgroundWrapper} from "@/components/custom-ui/background-wrapper";
import {ModeToggle} from "@/components/custom-ui/mode-toggle";
import Logo from "@/components/custom-ui/logo";

export default function HomePage() {
    return (
        <>
            <div className={"flex justify-between"}>
                <Logo></Logo>
                <ModeToggle></ModeToggle>
            </div>
            <BackgroundWrapper src={"white-background.png"}>
                <div className={"h-svh w-svw flex flex-col items-center gap-8"}>
                    <CommandSearch></CommandSearch>
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <h1 className={"text-3xl font-sans"}>Welcome to VoidTalk</h1>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex gap-1"}>
                                <Link className={"underline"} href={ROUTES.HOME}>Get Started</Link>
                                <p>or</p>
                                <Link className={"underline"} href={ROUTES.LOGIN}>Login</Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </BackgroundWrapper>
        </>
    );
}