import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <main className="flex-1 p-4 lg:p-6">{children}</main>
            </div>
        </div>
    )
}
