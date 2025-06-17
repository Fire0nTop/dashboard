import {Loader} from "lucide-react";
import {BackgroundWrapper} from "@/components/custom-ui/background-wrapper";

export default function LoadingProfile() {
    return (
        <BackgroundWrapper>
            <p>Loading your Profile</p>
            <Loader></Loader>
        </BackgroundWrapper>
    )
}