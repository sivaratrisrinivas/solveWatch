"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Solvers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg Price Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.3%</div>
        </CardContent>
      </Card>
    </div>
  )
}
