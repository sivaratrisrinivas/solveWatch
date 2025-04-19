"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchTokenPairsAnalytics } from "@/lib/api"
import useSWR from "swr"

export default function TokenPairsAnalytics() {
  const {
    data: tokenPairs,
    error,
    isLoading,
  } = useSWR("token-pairs-analytics", fetchTokenPairsAnalytics, {
    refreshInterval: 60000, // Refresh every minute
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Pairs Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">Loading token pairs analytics...</div>
        ) : error ? (
          <div className="text-red-500">Error loading token pairs analytics</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token Pair</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Trades</TableHead>
                <TableHead>Avg. Slippage</TableHead>
                <TableHead>Avg. Gas Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokenPairs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No token pairs data available
                  </TableCell>
                </TableRow>
              ) : (
                tokenPairs?.map((pair: { pair: string; volume: string; trades: number | string; avgSlippage: string; avgGasUsed: string }) => (
                  <TableRow key={pair.pair}>
                    <TableCell className="font-medium">{pair.pair}</TableCell>
                    <TableCell>{pair.volume}</TableCell>
                    <TableCell>{pair.trades}</TableCell>
                    <TableCell>{pair.avgSlippage}</TableCell>
                    <TableCell>{pair.avgGasUsed}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
