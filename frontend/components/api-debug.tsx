"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ApiDebug() {
    const [apiUrl] = useState(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api")
    const [endpoint, setEndpoint] = useState("/metrics")
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [statusCode, setStatusCode] = useState<number | null>(null)

    const testEndpoint = async () => {
        setLoading(true)
        setError(null)
        setResponse(null)
        setStatusCode(null)

        try {
            console.log(`Testing endpoint: ${apiUrl}${endpoint}`)
            const res = await fetch(`${apiUrl}${endpoint}`)
            setStatusCode(res.status)

            try {
                const data = await res.json()
                setResponse(data)
            } catch (jsonError) {
                // If JSON parsing fails, try to get the text
                const text = await res.text()
                setError(`Failed to parse JSON response: ${text}`)
            }

            if (!res.ok) {
                setError(`API returned status code ${res.status}`)
            }
        } catch (err: unknown) {
            console.error("API Debug error:", err)
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    }

    const endpoints = [
        "/metrics",
        "/orders",
        "/solver-performance",
        "/trades",
        "/token-pairs",
        "/solver-activity",
        "/trade-volume",
        "/gas-usage",
        "/token-pairs-analytics",
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>API Debug</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-2">API URL: {apiUrl}</p>
                        <div className="flex gap-2 flex-wrap">
                            {endpoints.map((ep) => (
                                <Button
                                    key={ep}
                                    variant={endpoint === ep ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEndpoint(ep)}
                                >
                                    {ep}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={testEndpoint} disabled={loading}>
                        {loading ? "Testing..." : `Test ${endpoint}`}
                    </Button>

                    {statusCode && (
                        <div
                            className={`p-2 rounded-md ${statusCode >= 200 && statusCode < 300 ? "bg-green-100 text-green-800" : "bg-yellow-50 text-yellow-800"}`}
                        >
                            Status Code: {statusCode}
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-800 rounded-md overflow-auto">
                            <p className="font-bold">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {response && (
                        <div className="p-4 bg-gray-50 rounded-md overflow-auto max-h-96">
                            <p className="font-bold mb-2">Response:</p>
                            <pre className="text-xs">{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
