import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatCurrency(value: number, currency = "ETH", decimals = 4): string {
  return `${formatNumber(value, decimals)} ${currency}`
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${formatNumber(value * 100, decimals)}%`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString()
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHour = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHour / 24)

  if (diffSec < 60) {
    return `${diffSec} sec ago`
  } else if (diffMin < 60) {
    return `${diffMin} min ago`
  } else if (diffHour < 24) {
    return `${diffHour} hr ago`
  } else {
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
  }
}
