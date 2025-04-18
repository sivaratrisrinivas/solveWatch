"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { fetchSolverPerformance } from "@/lib/api"
import useSWR from "swr"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SolverPerformanceChart() {
    const {
        data: solvers,
        error,
        isLoading,
    } = useSWR("solver-performance", fetchSolverPerformance, {
        refreshInterval: 30000, // Refresh every 30 seconds
        fallbackData: [],
    })

    const chartData = {
        labels: solvers.map((solver) => solver.name),
        datasets: [
            {
                label: "Success Rate (%)",
                data: solvers.map((solver) => solver.successRate * 100),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderColor: "rgba(53, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Avg Gas Used (K)",
                data: solvers.map((solver) => solver.avgGasUsed / 1000),
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
                text: "Solver Performance Metrics",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Solver Performance</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-4">Loading solver data...</div>
                ) : error ? (
                    <div className="text-red-500">Error loading solver performance data</div>
                ) : solvers.length === 0 ? (
                    <div>No solver data available</div>
                ) : (
                    <Bar data={chartData} options={options} />
                )}
            </CardContent>
        </Card>
    )
}
