"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Loading orders...</p>
      </CardContent>
    </Card>
  )
}
