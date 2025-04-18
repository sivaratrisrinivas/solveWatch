"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js"
import "chartjs-adapter-date-fns"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

export default function TradeVolumeChart() {
    // Generate timestamps for the last 7 days, one per day
    const now = new Date()
    const timestamps = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now)
        date.setDate(now.getDate() - 6 + i)
        date.setHours(0, 0, 0, 0)
        return date.toISOString()
    })

    // Generate mock volume data
    const chartData = {
        datasets: [
            {
                label: "Trade Volume (ETH)",
                data: timestamps.map((timestamp, i) => ({
                    x: timestamp,
                    y: Math.random() * 100 + 50,
                })),
                borderColor: "rgba(53, 162, 235, 1)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                fill: true,
                tension: 0.3,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Trade Volume (Last 7 Days)",
            },
        },
        scales: {
            x: {
                type: "time" as const,
                time: {
                    unit: "day" as const,
                    displayFormats: {
                        day: "MMM d",
                    },
                },
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Volume (ETH)",
                },
            },
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Trade Volume</CardTitle>
            </CardHeader>
            <CardContent>
                <Line data={chartData} options={options} />
            </CardContent>
        </Card>
    )
}
