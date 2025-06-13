"use client"
import {LoginComponent} from "@/components/custom/components/auth/login-component";
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function SignUpPage() {

    return (
        <BackgroundWrapper>
            <LoginComponent defaultValue={"signup"}/>
        </BackgroundWrapper>
    )
}