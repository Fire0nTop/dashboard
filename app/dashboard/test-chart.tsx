"use client"

import * as React from "react"
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
} from "recharts"

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { useSettings } from "@/app/settings/SettingsContext"

interface Hour {
    time: string
    temp_c: number
}

interface Day {
    maxtemp_c: number
    mintemp_c: number
}

interface ForecastDay {
    date: string
    day: Day
    hour: Hour[]
}

interface Forecast {
    forecastday: ForecastDay[]
}

interface Location {
    localtime: string
}

interface WeatherApiResponse {
    location: Location
    forecast: Forecast
}

const hourlyChartConfig = {
    temperature: {
        label: "Temperature °C",
        color: "hsl(var(--chart-1))",
    },
}

const dailyChartConfig = {
    max: {
        label: "Max Temp °C",
        color: "hsl(var(--chart-2))",
    },
    min: {
        label: "Min Temp °C",
        color: "hsl(var(--chart-1))",
    },
}

export function TemperatureChart() {
    const { settings } = useSettings()

    const API_KEY = settings["weatherapi-key"]
    const LOCATION = settings["weatherapi-location"]

    const [range, setRange] = React.useState<"today" | "next7Days" | "next14Days">("today")
    const [hourlyData, setHourlyData] = React.useState<{ time: string; temperature: number }[]>([])
    const [dailyData, setDailyData] = React.useState<
        { date: string; max: number; min: number }[]
    >([])

    React.useEffect(() => {
        if (!API_KEY || !LOCATION) {
            console.warn("Missing API key or location. Skipping fetch.")
            setHourlyData([])
            setDailyData([])
            return
        }

        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
                        LOCATION
                    )}&days=14&aqi=no&alerts=no`
                )

                if (!res.ok) throw new Error("Failed to fetch weather data")

                const data: WeatherApiResponse = await res.json()

                const todayDate = data.location.localtime.split(" ")[0]
                const todayForecast = data.forecast.forecastday.find((d) => d.date === todayDate)

                if (todayForecast) {
                    const hours = todayForecast.hour.map((h) => ({
                        time: h.time,
                        temperature: Math.round(h.temp_c),
                    }))
                    setHourlyData(hours)
                } else {
                    setHourlyData([])
                }

                const dailyTemps = data.forecast.forecastday.map((d) => ({
                    date: d.date,
                    max: Math.round(d.day.maxtemp_c),
                    min: Math.round(d.day.mintemp_c),
                }))

                setDailyData(dailyTemps)
            } catch (error) {
                console.error("Error fetching weather:", error)
                setHourlyData([])
                setDailyData([])
            }
        }

        fetchWeather()
    }, [API_KEY, LOCATION])

    // Date filters for next 7 and 14 days
    const todayMidnight = new Date()
    todayMidnight.setHours(0, 0, 0, 0)

    const sevenDaysLater = new Date(todayMidnight)
    sevenDaysLater.setDate(todayMidnight.getDate() + 7)

    const fourteenDaysLater = new Date(todayMidnight)
    fourteenDaysLater.setDate(todayMidnight.getDate() + 14)

    const filteredNext7Days = dailyData.filter((d) => {
        const date = new Date(d.date)
        return date >= todayMidnight && date < sevenDaysLater
    })

    const filteredNext14Days = dailyData.filter((d) => {
        const date = new Date(d.date)
        return date >= todayMidnight && date < fourteenDaysLater
    })

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <CardTitle>Temperature Forecast</CardTitle>
                    <CardDescription>
                        {range === "today"
                            ? "Today (hourly)"
                            : range === "next7Days"
                                ? "Next 7 Days"
                                : "Next 14 Days"}{" "}
                        · {LOCATION}
                    </CardDescription>
                </div>
                <Select
                    value={range}
                    onValueChange={(value) => {
                        if (value === "today" || value === "next7Days" || value === "next14Days") {
                            setRange(value)
                        }
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today (24h)</SelectItem>
                        <SelectItem value="next7Days">Next 7 Days</SelectItem>
                        <SelectItem value="next14Days">Next 14 Days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {range === "today" ? (
                    <ChartContainer config={hourlyChartConfig} className="h-[250px] w-full">
                        <LineChart
                            data={hourlyData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.getHours() + ":00"
                                }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                            <Line
                                dataKey="temperature"
                                type="monotone"
                                stroke="var(--color-chart-1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <ChartContainer config={dailyChartConfig} className="h-[250px] w-full">
                        <LineChart
                            data={range === "next7Days" ? filteredNext7Days : filteredNext14Days}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "numeric",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                            <Line
                                dataKey="max"
                                type="monotone"
                                stroke="var(--color-chart-2)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="min"
                                type="monotone"
                                stroke="var(--color-chart-1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter>
                <div className="text-sm text-muted-foreground">
                    Showing temperature data for {LOCATION}
                </div>
            </CardFooter>
        </Card>
    )
}
