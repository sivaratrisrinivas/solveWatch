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

export default function SolverActivityTimeline() {
    // Generate timestamps for the last 24 hours, one per hour
    const now = new Date()
    const timestamps = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(now)
        date.setHours(now.getHours() - 23 + i)
        date.setMinutes(0, 0, 0)
        return date.toISOString()
    })

    // Generate mock data for 3 solvers
    const chartData = {
        datasets: [
            {
                label: "Solver 1",
                data: timestamps.map((timestamp, i) => ({
                    x: timestamp,
                    y: Math.floor(Math.random() * 10) + 5,
                })),
                borderColor: "rgba(53, 162, 235, 1)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                tension: 0.3,
            },
            {
                label: "Solver 2",
                data: timestamps.map((timestamp, i) => ({
                    x: timestamp,
                    y: Math.floor(Math.random() * 8) + 3,
                })),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                tension: 0.3,
            },
            {
                label: "Solver 3",
                data: timestamps.map((timestamp, i) => ({
                    x: timestamp,
                    y: Math.floor(Math.random() * 6) + 2,
                })),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                text: "Solver Activity (Last 24 Hours)",
            },
        },
        scales: {
            x: {
                type: "time" as const,
                time: {
                    unit: "hour" as const,
                    displayFormats: {
                        hour: "HH:mm",
                    },
                },
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Trades Settled",
                },
            },
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Solver Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <Line data={chartData} options={options} />
            </CardContent>
        </Card>
    )
}
