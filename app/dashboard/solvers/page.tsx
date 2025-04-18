import type { Metadata } from "next"
import SolverPerformanceChart from "@/components/solver-performance-chart"
import SolverActivityTimeline from "@/components/solver-activity-timeline"

export const metadata: Metadata = {
    title: "Solvers - SolveWatch",
    description: "Analyze CoW Protocol solver performance",
}

export default function SolversPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Solver Performance</h1>
            <SolverPerformanceChart />
            <SolverActivityTimeline />
        </div>
    )
}
