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
import { fetchTradeVolume } from "@/lib/api"
import useSWR from "swr"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

export default function TradeVolumeChart() {
  const { data, error, isLoading } = useSWR("trade-volume", fetchTradeVolume, {
    refreshInterval: 60000, // Refresh every minute
  })

  // Transform API data for Chart.js
  const chartData = {
    datasets: [
      {
        label: "Trade Volume (ETH)",
        data:
          data?.map((point) => ({
            x: point.timestamp,
            y: point.volume,
          })) || [],
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        // Removed fill: true to avoid the error
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
        {isLoading ? (
          <div className="flex justify-center p-4">Loading volume data...</div>
        ) : error ? (
          <div className="text-red-500">Error loading trade volume data: {(error as Error).message}</div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  )
}
