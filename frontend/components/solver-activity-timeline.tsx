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
import { fetchSolverActivity } from "@/lib/api"
import useSWR from "swr"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

export default function SolverActivityTimeline() {
  const { data, error, isLoading } = useSWR("solver-activity", fetchSolverActivity, {
    refreshInterval: 60000, // Refresh every minute
  })

  // Transform API data for Chart.js
  const chartData = {
    datasets:
      data?.map((solver: { solver: string; data: { timestamp: string; trades: number }[] }, index: number) => ({
        label: solver.solver,
        data: solver.data.map((point: { timestamp: string; trades: number }) => ({
          x: point.timestamp,
          y: point.trades,
        })),
        borderColor: ["rgba(53, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"][index % 3],
        backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"][index % 3],
        tension: 0.3,
      })) || [],
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
        {isLoading ? (
          <div className="flex justify-center p-4">Loading activity data...</div>
        ) : error ? (
          <div className="text-red-500">Error loading solver activity data</div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  )
}
