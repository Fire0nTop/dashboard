"use client"
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function ProtectedPage() {
    const {profile} = useAuth();

    return(
        <BackgroundWrapper>
            <p>Welcome {profile?.display_name} your Email is {profile?.email}</p>
            <Link href={"/protected"}>test</Link>
        </BackgroundWrapper>
    )
}