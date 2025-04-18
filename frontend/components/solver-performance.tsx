"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SolverPerformance() {
  // Mock data for solver performance
  const solverData = {
    labels: ["Solver 1", "Solver 2", "Solver 3", "Solver 4", "Solver 5"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [75, 82, 68, 90, 85],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Avg Gas Used (K)",
        data: [120, 105, 135, 95, 110],
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
        <Bar data={solverData} options={options} />
      </CardContent>
    </Card>
  )
}
