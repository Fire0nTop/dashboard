"use client"
import CustomAvatar from "@/components/custom-ui/custom-avatar";

export default function Logo() {
    const src = "VT Border.svg"

    return (
        <CustomAvatar className={"rounded-md "} src={src} name={"VoidTalk"} alt={"Logo"}/>
    )
}