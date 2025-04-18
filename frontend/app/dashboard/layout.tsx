import type React from "react"
import { Sidebar } from "@/components/sidebar"
import ApiStatus from "@/components/api-status"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">CoW Protocol Solver Dashboard</h1>
          <ApiStatus />
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
