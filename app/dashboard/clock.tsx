"use client"
import * as React from "react";
import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        const tick = () => setTime(new Date());

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <div className="text-3xl font-mono text-center p-4">
            {time.toLocaleTimeString()}
        </div>
    );
}

