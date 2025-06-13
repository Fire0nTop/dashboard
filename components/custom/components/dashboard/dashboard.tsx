import {DashboardCard} from "@/components/custom/components/dashboard/dashboard-card";
import {ModeToggle} from "@/components/custom/ui/mode-toggle";
import {TemperatureChart} from "@/components/custom/components/dashboard/test-chart";
import Clock from "@/components/custom/components/dashboard/clock";

export function Dashboard() {
    return (
        <div className={'flex w-full h-fit p-10 justify-around'}>
            <DashboardCard>
                <TemperatureChart></TemperatureChart>
            </DashboardCard>
            <DashboardCard link={true} href={"/settings"}>
                <h1>To Settings</h1>
            </DashboardCard>
            <DashboardCard link={true} href={"/dev"}>
                <h1>To Tests</h1>
            </DashboardCard>
            <DashboardCard>
                <ModeToggle></ModeToggle>
            </DashboardCard>
            <DashboardCard>
                <Clock></Clock>
            </DashboardCard>
        </div>
    )
}