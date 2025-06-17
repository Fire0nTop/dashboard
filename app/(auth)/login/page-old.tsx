import {LoginComponent} from "@/components/auth/login-component";
import {BackgroundWrapper} from "@/components/custom-ui/background-wrapper";

export default function LoginPage() {

    return (
        <BackgroundWrapper>
            <LoginComponent defaultValue={"login"}/>
        </BackgroundWrapper>
    )
}
