"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Snowfall } from "@/components/snowfall"
import Image from "next/image"
import type { CalendarConfig } from "@/lib/calendars/calendar-config"

interface PasswordGateProps {
  calendar: CalendarConfig
}

export function PasswordGate({ calendar }: PasswordGateProps) {
  const [orderId, setOrderId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(`/api/calendar/${calendar.id}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, password }),
      })

      if (!response.ok) {
        // Try to parse error message, fallback to generic message
        const data = await response.json().catch(() => ({ error: "Authentication failed" }))
        setError(data.error || "Authentication failed")
        setIsLoading(false)
        return
      }

      const data = await response.json().catch(() => ({ success: true }))

      // Reload the page to show the calendar
      window.location.reload()
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleBypassLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/calendar/${calendar.id}/bypass`, {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Bypass failed" }))
        setError(data.error || "Bypass failed")
        setIsLoading(false)
        return
      }

      const data = await response.json().catch(() => ({ success: true }))

      window.location.reload()
    } catch (err) {
      console.error("[v0] Bypass error:", err)
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${calendar.backgroundColor} bg-cover bg-center bg-no-repeat`}
    >
      <Snowfall />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="flex justify-center items-center mb-8 pt-4">
          <div className="w-full max-w-2xl">
            <Image
              src={calendar.heroImage || "/placeholder.svg"}
              alt={calendar.name}
              width={600}
              height={300}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Password Form */}
        <div className="w-full max-w-md bg-background/95 backdrop-blur-sm border border-border rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-2">Enter Your Details</h2>
          <p className="text-muted-foreground text-center mb-6">
            Please enter your order ID and password to access your calendar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium mb-2">
                Order ID
              </label>
              <Input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-sm text-red-500 text-center">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Access Calendar"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleBypassLogin}
              className="text-sm text-muted-foreground hover:text-foreground underline"
              disabled={isLoading}
            >
              Bypass login (for testing)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center py-8 px-4">
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">Created by</p>
            <Image
              src="/images/cosy-clue-co-logo.svg"
              alt="CosyClueCo Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
