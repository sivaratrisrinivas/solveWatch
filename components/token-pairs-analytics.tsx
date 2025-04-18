"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TokenPairsAnalytics() {
    // Mock data for token pairs analytics
    const tokenPairs = [
        {
            pair: "ETH-USDC",
            volume: "1,245.32 ETH",
            trades: 156,
            avgSlippage: "0.12%",
            avgGasUsed: "105,234",
        },
        {
            pair: "DAI-USDC",
            volume: "985.75 DAI",
            trades: 124,
            avgSlippage: "0.08%",
            avgGasUsed: "92,456",
        },
        {
            pair: "WBTC-USDC",
            volume: "42.18 WBTC",
            trades: 78,
            avgSlippage: "0.15%",
            avgGasUsed: "118,765",
        },
        {
            pair: "ETH-DAI",
            volume: "356.91 ETH",
            trades: 67,
            avgSlippage: "0.14%",
            avgGasUsed: "102,345",
        },
        {
            pair: "USDT-USDC",
            volume: "1,567,890 USDT",
            trades: 45,
            avgSlippage: "0.03%",
            avgGasUsed: "85,234",
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token Pairs Analytics</CardTitle>
            </CardHeader>
            <CardContent>
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
                        {tokenPairs.map((pair) => (
                            <TableRow key={pair.pair}>
                                <TableCell className="font-medium">{pair.pair}</TableCell>
                                <TableCell>{pair.volume}</TableCell>
                                <TableCell>{pair.trades}</TableCell>
                                <TableCell>{pair.avgSlippage}</TableCell>
                                <TableCell>{pair.avgGasUsed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
