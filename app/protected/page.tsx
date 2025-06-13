"use client"

import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import {router} from "next/client";
import {BackgroundWrapper} from "@/components/custom/ui/background-wrapper";

export default function ProtectedPage() {
    const { user} = useAuth();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return(
        <BackgroundWrapper>
            <p>Welcome, {user!.email} with uuid: {user!.id}</p>
            <Link href={"/protected/test"}>test</Link>
            <button onClick={handleLogout}>
                Logout
            </button>
        </BackgroundWrapper>
    )
}