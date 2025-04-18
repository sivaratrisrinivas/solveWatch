"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchMetrics } from "@/lib/api"
import useSWR from "swr"

export default function MetricsDashboard() {
    const {
        data: metrics,
        error,
        isLoading,
    } = useSWR("metrics", fetchMetrics, {
        refreshInterval: 10000, // Refresh every 10 seconds
        fallbackData: {
            activeSolversCount: 0,
            recentTradesCount: 0,
            avgPriceImprovement: 0,
        },
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Solvers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : metrics.activeSolversCount}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? "..." : metrics.recentTradesCount}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg Price Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? "..." : `${(metrics.avgPriceImprovement * 100).toFixed(2)}%`}
                    </div>
                    {error && <p className="text-sm text-red-500 mt-2">Error loading data</p>}
                </CardContent>
            </Card>
        </div>
    )
}
