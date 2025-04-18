"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function GasUsageChart() {
    const chartData = {
        labels: ["Solver 1", "Solver 2", "Solver 3", "Solver 4", "Solver 5"],
        datasets: [
            {
                label: "Average Gas Used",
                data: [120000, 105000, 135000, 95000, 110000],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
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
                text: "Gas Usage by Solver",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Gas Used",
                },
            },
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gas Usage</CardTitle>
            </CardHeader>
            <CardContent>
                <Bar data={chartData} options={options} />
            </CardContent>
        </Card>
    )
}
