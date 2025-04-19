"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function OrdersList() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  // Mock data for orders
  const orders = [
    {
      uid: "0x1234567890abcdef",
      creationDate: new Date().toISOString(),
      sellToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      buyToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      status: "fulfilled"
    },
    {
      uid: "0x2345678901abcdef",
      creationDate: new Date(Date.now() - 3600000).toISOString(),
      sellToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
      buyToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
      status: "open"
    },
    {
      uid: "0x3456789012abcdef",
      creationDate: new Date(Date.now() - 7200000).toISOString(),
      sellToken: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
      buyToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      status: "expired"
    }
  ]

  const totalPages = 1

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const truncateAddress = (address: string) => {
    if (!address) return "N/A"
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">Loading orders...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Token Pair</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.uid}>
                    <TableCell className="font-mono">{truncateAddress(order.uid)}</TableCell>
                    <TableCell>{formatDate(order.creationDate)}</TableCell>
                    <TableCell>{`${truncateAddress(order.sellToken)}/${truncateAddress(order.buyToken)}`}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${order.status === "fulfilled"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : order.status === "open"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button onClick={handleNextPage} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
