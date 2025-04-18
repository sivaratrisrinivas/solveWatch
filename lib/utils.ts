const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function fetchMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`)
    if (!response.ok) {
        throw new Error("Failed to fetch metrics")
    }
    return response.json()
}

export async function fetchOrders(page = 1, pageSize = 10) {
    const response = await fetch(`${API_BASE_URL}/orders?page=${page}&page_size=${pageSize}`)
    if (!response.ok) {
        throw new Error("Failed to fetch orders")
    }
    return response.json()
}

export async function fetchSolverPerformance() {
    const response = await fetch(`${API_BASE_URL}/solver-performance`)
    if (!response.ok) {
        throw new Error("Failed to fetch solver performance")
    }
    return response.json()
}

export async function fetchTrades(orderId?: string) {
    const url = orderId ? `${API_BASE_URL}/trades?order_id=${orderId}` : `${API_BASE_URL}/trades`

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Failed to fetch trades")
    }
    return response.json()
}
