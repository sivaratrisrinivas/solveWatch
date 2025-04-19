import { OrderBookApi, SupportedChainId } from "@cowprotocol/cow-sdk"

// Initialize the OrderBookApi with the appropriate chain ID
export const orderBookApi = new OrderBookApi({
    chainId: SupportedChainId.GNOSIS_CHAIN, // Using Gnosis Chain for our dashboard
    // env: "production", // Temporarily removed due to type issues
})

// Fetch recent orders (simulating our previous auctions endpoint)
export async function fetchRecentOrders(page = 1, pageSize = 10) {
    try {
        // Note: The actual API doesn't have a direct method to fetch all orders
        // This is a placeholder - in production, you would need to track order IDs
        // or use an indexer/subgraph to get this data

        // For demo purposes, we'll return a mock implementation
        const mockOrders = Array(pageSize)
            .fill(0)
            .map((_, i) => ({
                id: `order-${(page - 1) * pageSize + i}`,
                creationDate: new Date(Date.now() - i * 600000).toISOString(),
                sellToken: "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
                buyToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
                status: ["open", "fulfilled", "expired", "cancelled"][Math.floor(Math.random() * 4)],
            }))

        return {
            data: mockOrders,
            page,
            pageSize,
            total: 100, // Mock total
            totalPages: Math.ceil(100 / pageSize),
        }
    } catch (error) {
        console.error("Error fetching orders:", error)
        throw error
    }
}

// Fetch a specific order by ID
export async function fetchOrder(orderId: string) {
    try {
        const order = await orderBookApi.getOrder(orderId)
        return order
    } catch (error) {
        console.error(`Error fetching order ${orderId}:`, error)
        throw error
    }
}

// Fetch trades for a specific order
export async function fetchTrades(orderId: string) {
    try {
        // Pass orderId as orderUid within an object
        const trades = await orderBookApi.getTrades({ orderUid: orderId })
        return trades
    } catch (error) {
        console.error(`Error fetching trades for order ${orderId}:`, error)
        throw error
    }
}

// Temporarily commented out due to type issues with 'kind'
/*
// Get a quote for a potential trade
export async function fetchQuote(params: {
    sellToken: string
    buyToken: string
    amount: string
    kind: "sell" | "buy"
}) {
    try {
        const quote = await orderBookApi.getQuote({
            sellToken: params.sellToken,
            buyToken: params.buyToken,
            amount: params.amount,
            kind: params.kind,
        })
        return quote
    } catch (error) {
        console.error("Error fetching quote:", error)
        throw error
    }
}
*/

// Analyze solver performance based on trade data
export async function analyzeSolverPerformance(trades: any[]) {
    // This is where we would analyze trade data to infer solver behavior
    // For example, we could look at price improvements, gas usage, etc.

    // Mock implementation for demonstration
    const solvers = trades.reduce((acc, trade) => {
        const solverId = trade.solver || "unknown"
        if (!acc[solverId]) {
            acc[solverId] = {
                id: solverId,
                name: `Solver ${solverId.substring(0, 6)}`,
                tradesCount: 0,
                avgGasUsed: 0,
                totalGasUsed: 0,
                successRate: 0,
            }
        }

        acc[solverId].tradesCount++
        acc[solverId].totalGasUsed += trade.gasUsed || 0
        acc[solverId].avgGasUsed = acc[solverId].totalGasUsed / acc[solverId].tradesCount

        return acc
    }, {})

    return Object.values(solvers)
}
