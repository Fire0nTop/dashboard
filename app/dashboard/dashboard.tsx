import {DashboardCard} from "@/app/dashboard/dashboard-card";
import {ModeToggle} from "@/components/custom/mode-toggle";
import {TemperatureChart} from "@/app/dashboard/test-chart";

export function Dashboard() {
    return (
        <div className={'flex w-full h-fit p-10 justify-around'}>
            <DashboardCard>
                <TemperatureChart></TemperatureChart>
            </DashboardCard>
            <DashboardCard link={true} href={"/settings"}>
                <h1>To Settings</h1>
            </DashboardCard>
            <DashboardCard link={true} href={"/tests"}>
                <h1>To Tests</h1>
            </DashboardCard>
            <DashboardCard>
                <ModeToggle></ModeToggle>
            </DashboardCard>
        </div>
    )
}