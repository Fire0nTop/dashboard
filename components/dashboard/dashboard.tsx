import {DashboardCard} from "@/components/dashboard/dashboard-card";
import {ModeToggle} from "@/components/custom-ui/mode-toggle";
import {TemperatureChart} from "@/components/dashboard/test-chart";
import Clock from "@/components/dashboard/clock";
import {ROUTE_DEFINITIONS} from "@/lib/routes";

export function Dashboard() {
    return (
        <div className={'flex w-full h-fit p-10 justify-around'}>
            <DashboardCard>
                <TemperatureChart></TemperatureChart>
            </DashboardCard>
            <DashboardCard link={true} href={ROUTE_DEFINITIONS.HOMEPAGE.path}>
                <h1>To Settings</h1>
            </DashboardCard>
            <DashboardCard link={true} href={ROUTE_DEFINITIONS.DEV.path}>
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