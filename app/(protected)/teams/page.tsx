"use client"
import { BackgroundWrapper } from "@/components/custom-ui/background-wrapper";
import {useSearchParams} from "next/navigation";
import TeamsSelection from "@/components/teams/teams-selection";
import TeamHome from "@/components/teams/team-home";

export default function TeamsPage() {


    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (id === null) {
        return (
            <BackgroundWrapper>
                <TeamsSelection></TeamsSelection>
            </BackgroundWrapper>
        );
    } else {
        return (
            <BackgroundWrapper>
                <TeamHome id={id}></TeamHome>
            </BackgroundWrapper>
        );
    }
}