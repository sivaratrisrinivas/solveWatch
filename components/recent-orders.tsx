"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { fetchOrders } from "@/lib/api"
import useSWR from "swr"

export default function RecentOrders() {
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)

    const { data, error, isLoading } = useSWR(
        [`orders-${page}-${pageSize}`, page, pageSize],
        () => fetchOrders(page, pageSize),
        { refreshInterval: 10000 }, // Refresh every 10 seconds
    )

    const orders = data?.data || []
    const totalPages = data?.total_pages || 1

    const handlePreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setPage((prev) => Math.min(prev + 1, totalPages))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    const truncateAddress = (address) => {
        if (!address) return ""
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-4">Loading orders...</div>
                ) : error ? (
                    <div className="text-red-500">Error loading orders</div>
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
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No orders found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
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
                                    ))
                                )}
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
