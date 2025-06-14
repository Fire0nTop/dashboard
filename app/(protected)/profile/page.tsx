"use client"

import { useAuth } from '@/context/AuthContext';
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function ProtectedPage() {
    const {userProfile} = useAuth();
    return(
        <BackgroundWrapper>
            <p>Welcome, {userProfile?.display_name} {userProfile?.email} with uuid: {userProfile?.id}</p>
        </BackgroundWrapper>
    )
}