"use client"
import clsx from 'clsx';
import {useSettings} from "@/context/SettingsContext";
import React from "react";

export const BackgroundWrapper = ({
                                      children,
                                      className,
                                      src
                                  }: {
    children?: React.ReactNode;
    className?: string;
    src?: string;
}) => {
    const {settings} = useSettings();

    let backgroundUrl = settings["bg-url"];
    if (src) backgroundUrl = src;

    return (
        <div
            className={clsx(
                "w-full h-full overflow-auto bg-cover bg-center p-4 md:p-10",
                className
            )}
            style={{
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
                backgroundColor: backgroundUrl && src ? undefined : '#f0f0f0',
            }}

        >
            {children}
        </div>
    );
};
