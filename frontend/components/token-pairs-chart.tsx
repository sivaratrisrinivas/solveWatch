"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { fetchTokenPairs } from "@/lib/api"
import useSWR from "swr"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export default function TokenPairsChart() {
  const { data, error, isLoading } = useSWR("token-pairs", fetchTokenPairs, {
    refreshInterval: 60000, // Refresh every minute
  })

  const chartData = {
    labels: data?.map((item: { name: string; value: number }) => item.name) || [],
    datasets: [
      {
        label: "Trade Volume",
        data: data?.map((item: { name: string; value: number }) => item.value) || [],
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
        {isLoading ? (
          <div className="flex justify-center p-4">Loading token pairs data...</div>
        ) : error ? (
          <div className="text-red-500">Error loading token pairs data</div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={chartData} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
