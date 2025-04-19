"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsForm() {
  const [settings, setSettings] = useState({
    refreshInterval: "30",
    chain: "gnosis",
    darkMode: true,
    notifications: true,
  })

  const handleChange = (field: keyof typeof settings, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real implementation, this would save the settings
    console.log("Settings saved:", settings)
    // Show a success message
    alert("Settings saved successfully!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Settings</CardTitle>
          <CardDescription>Configure your dashboard preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="refreshInterval">Data Refresh Interval (seconds)</Label>
            <Input
              id="refreshInterval"
              type="number"
              value={settings.refreshInterval}
              onChange={(e) => handleChange("refreshInterval", e.target.value)}
              min="5"
              max="300"
            />
          </div>

          {/* Temporarily commented out due to Radix/React build issue */}
          {/*
          <div className="space-y-2">
            <Label htmlFor="network">Blockchain Network</Label>
            <Select value={settings.chain} onValueChange={(value) => handleChange("chain", value)}>
              <SelectTrigger id="network">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gnosis">Gnosis Chain</SelectItem>
                <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          */}

          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleChange("darkMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleChange("notifications", checked)}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
