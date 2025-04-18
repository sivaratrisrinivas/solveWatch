"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

// Mock data for token pairs (we'll replace this with real API data later)
const mockData = {
    labels: ["ETH-USDC", "DAI-USDC", "WBTC-USDC", "ETH-DAI", "Other"],
    datasets: [
        {
            label: "Trade Volume",
            data: [35, 25, 15, 10, 15],
            backgroundColor: [
                "rgba(53, 162, 235, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
                "rgba(53, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
        },
    ],
}

export default function TokenPairsChart() {
    const [chartData, setChartData] = useState(mockData)
    const [loading, setLoading] = useState(false)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
            },
            title: {
                display: true,
                text: "Token Pairs Distribution",
            },
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token Pairs</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center p-4">Loading token pairs data...</div>
                ) : (
                    <div className="h-[300px] flex items-center justify-center">
                        <Pie data={chartData} options={options} />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
