const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function fetchMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`)
    if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.status}`)
    }
    return response.json()
}

export async function fetchOrders(page = 1, pageSize = 10) {
    const response = await fetch(`${API_BASE_URL}/orders?page=${page}&page_size=${pageSize}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`)
    }
    return response.json()
}

export async function fetchOrder(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch order: ${response.status}`)
    }
    return response.json()
}

export async function fetchSolverPerformance() {
    const response = await fetch(`${API_BASE_URL}/solver-performance`)
    if (!response.ok) {
        throw new Error(`Failed to fetch solver performance: ${response.status}`)
    }
    return response.json()
}

export async function fetchTrades(orderId?: string) {
    const url = orderId ? `${API_BASE_URL}/trades?order_id=${orderId}` : `${API_BASE_URL}/trades`

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch trades: ${response.status}`)
    }
    return response.json()
}

// Add these new API functions for the remaining components
export async function fetchTokenPairs() {
    // This is a placeholder - your backend needs to implement this endpoint
    const response = await fetch(`${API_BASE_URL}/token-pairs`)
    if (!response.ok) {
        throw new Error(`Failed to fetch token pairs: ${response.status}`)
    }
    return response.json()
}

export async function fetchSolverActivity() {
    // This is a placeholder - your backend needs to implement this endpoint
    const response = await fetch(`${API_BASE_URL}/solver-activity`)
    if (!response.ok) {
        throw new Error(`Failed to fetch solver activity: ${response.status}`)
    }
    return response.json()
}

export async function fetchTradeVolume() {
    // This is a placeholder - your backend needs to implement this endpoint
    const response = await fetch(`${API_BASE_URL}/trade-volume`)
    if (!response.ok) {
        throw new Error(`Failed to fetch trade volume: ${response.status}`)
    }
    return response.json()
}

export async function fetchGasUsage() {
    // This is a placeholder - your backend needs to implement this endpoint
    const response = await fetch(`${API_BASE_URL}/gas-usage`)
    if (!response.ok) {
        throw new Error(`Failed to fetch gas usage: ${response.status}`)
    }
    return response.json()
}

export async function fetchTokenPairsAnalytics() {
    // This is a placeholder - your backend needs to implement this endpoint
    const response = await fetch(`${API_BASE_URL}/token-pairs-analytics`)
    if (!response.ok) {
        throw new Error(`Failed to fetch token pairs analytics: ${response.status}`)
    }
    return response.json()
}
