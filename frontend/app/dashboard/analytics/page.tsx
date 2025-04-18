import type { Metadata } from "next"
import TokenPairsAnalytics from "@/components/token-pairs-analytics"
import TradeVolumeChart from "@/components/trade-volume-chart"
import GasUsageChart from "@/components/gas-usage-chart"

export const metadata: Metadata = {
    title: "Analytics - SolveWatch",
    description: "Advanced analytics for CoW Protocol activity",
}

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Analytics</h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <TradeVolumeChart />
                <GasUsageChart />
            </div>

            <TokenPairsAnalytics />
        </div>
    )
}
