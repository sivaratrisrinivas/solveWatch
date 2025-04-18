import type { Metadata } from "next"
import RecentOrders from "@/components/recent-orders"

export const metadata: Metadata = {
    title: "Orders - SolveWatch",
    description: "View and analyze CoW Protocol orders",
}

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <RecentOrders />
        </div>
    )
}
