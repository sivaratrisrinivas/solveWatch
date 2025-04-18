"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { fetchGasUsage } from "@/lib/api"
import useSWR from "swr"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function GasUsageChart() {
  const { data, error, isLoading } = useSWR("gas-usage", fetchGasUsage, {
    refreshInterval: 60000, // Refresh every minute
  })

  // Transform API data for Chart.js
  const chartData = {
    labels: data?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Average Gas Used",
        data: data?.map((item) => item.avgGasUsed) || [],
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
        {isLoading ? (
          <div className="flex justify-center p-4">Loading gas usage data...</div>
        ) : error ? (
          <div className="text-red-500">Error loading gas usage data</div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  )
}
