import type { Metadata } from "next"
import MetricsDashboard from "@/components/metrics-dashboard"
import SolverPerformanceChart from "@/components/solver-performance-chart"
import TokenPairsChart from "@/components/token-pairs-chart"
import RecentOrders from "@/components/recent-orders"

export const metadata: Metadata = {
    title: "Dashboard - SolveWatch",
    description: "Overview of CoW Protocol solver activity",
}

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            </div>

            <MetricsDashboard />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <SolverPerformanceChart />
                <TokenPairsChart />
            </div>

            <RecentOrders />
        </div>
    )
}
