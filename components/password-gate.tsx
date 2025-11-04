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
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateOrderId = (orderId: string): string | null => {
    // Must be only numbers
    if (!/^\d+$/.test(orderId)) {
      return "Order confirmation number must contain only numbers"
    }
    // Must be between 8 and 12 characters
    if (orderId.length < 8 || orderId.length > 12) {
      return "Order confirmation number must be between 8 and 12 digits"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate order ID format
    const validationError = validateOrderId(orderId)
    if (validationError) {
      setError(validationError)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/calendar/${calendar.id}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
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


  return (
    <main
      className={`relative min-h-screen overflow-hidden ${calendar.backgroundColor} bg-cover bg-center bg-no-repeat`}
    >
      <Snowfall />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className={`flex justify-center items-center mb-8 ${
          calendar.id === "christmas-conspiracy"
            ? "pt-16 sm:pt-12 md:pt-8"
            : "pt-4"
        }`}>
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

        {/* Login Form */}
        <div className={`w-full max-w-md backdrop-blur-sm border rounded-lg p-8 shadow-xl ${
          calendar.id === "christmas-conspiracy"
            ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/50"
            : "bg-background/95 border-border"
        }`}>
          <h2 className={`text-2xl font-bold text-center mb-2 ${
            calendar.id === "christmas-conspiracy" ? "text-slate-200" : ""
          }`}>
            Enter Your Details
          </h2>
          <p className={`text-center mb-6 ${
            calendar.id === "christmas-conspiracy" ? "text-slate-400" : "text-muted-foreground"
          }`}>
            Please enter your Etsy Order Confirmation Number to access your calendar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderId" className={`block text-sm font-medium mb-2 ${
                calendar.id === "christmas-conspiracy" ? "text-slate-300" : ""
              }`}>
                Etsy Order Confirmation Number
              </label>
              <Input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/\D/g, "")
                  setOrderId(value)
                }}
                placeholder="Enter your Etsy Order Confirmation Number (8-12 digits)"
                required
                disabled={isLoading}
                minLength={8}
                maxLength={12}
                pattern="[0-9]{8,12}"
                className={calendar.id === "christmas-conspiracy" 
                  ? "bg-slate-800/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20" 
                  : ""}
              />
              <p className={`text-xs mt-1 ${
                calendar.id === "christmas-conspiracy" ? "text-slate-500" : "text-muted-foreground"
              }`}>
                Must be 8-12 digits (numbers only)
              </p>
            </div>

            {error && (
              <div className={`text-sm text-center ${
                calendar.id === "christmas-conspiracy" ? "text-red-400" : "text-red-500"
              }`}>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full ${
                calendar.id === "christmas-conspiracy"
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
                  : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Accessing Calendar..." : "Access Calendar"}
            </Button>
          </form>

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
