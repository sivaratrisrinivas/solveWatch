"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function ApiStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState("")
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${apiUrl.replace(/\/api$/, "")}/`)
        if (response.ok) {
          setStatus("connected")
          setMessage("API is connected")
        } else {
          setStatus("error")
          setMessage(`API returned status ${response.status}`)
        }
      } catch (error) {
        setStatus("error")
        setMessage(`Failed to connect to API: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [apiUrl])

  return (
    <div className="flex items-center gap-2 text-sm">
      {status === "loading" ? (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <span>Checking API connection...</span>
        </div>
      ) : status === "connected" ? (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <XCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
