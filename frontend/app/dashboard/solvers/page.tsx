import type { Metadata } from "next"
import SolverPerformance from "@/components/solver-performance"
import SolverActivityTimeline from "@/components/solver-activity-timeline"

export const metadata: Metadata = {
    title: "Solver Performance - SolveWatch",
    description: "Analyze CoW Protocol solver performance",
}

export default function SolversPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Solver Performance</h1>
            <SolverPerformance />
            <SolverActivityTimeline />
        </div>
    )
}
