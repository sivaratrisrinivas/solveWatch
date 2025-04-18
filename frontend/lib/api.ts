const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function fetchMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`)
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch metrics: ${response.status} - ${errorText}`)
    }
    return response.json()
}

export async function fetchOrders(page = 1, pageSize = 10) {
    try {
        console.log(`Fetching orders from: ${API_BASE_URL}/orders?page=${page}&page_size=${pageSize}`)
        const response = await fetch(`${API_BASE_URL}/orders?page=${page}&page_size=${pageSize}`)

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Orders API error: ${response.status} - ${errorText}`)
            throw new Error(`Failed to fetch orders: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log("Orders API response:", data)

        // Ensure the data structure matches what the component expects
        return {
            data: data.data || [],
            page: data.page || page,
            pageSize: data.pageSize || pageSize,
            total: data.total || 0,
            totalPages: data.totalPages || 1,
        }
    } catch (error) {
        console.error("Error in fetchOrders:", error)
        throw error
    }
}

export async function fetchOrder(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`)
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch order: ${response.status} - ${errorText}`)
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
