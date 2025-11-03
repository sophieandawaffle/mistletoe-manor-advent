"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  calendarId: string
}

export function LogoutButton({ calendarId }: LogoutButtonProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/calendar/${calendarId}/logout`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        console.error("[v0] Logout failed:", response.status)
        return
      }

      // Try to parse JSON response, but don't fail if it's empty
      try {
        await response.json()
      } catch (jsonError) {
        // Response might be empty, which is fine for logout
        console.log("[v0] Logout response was empty, continuing...")
      }

      window.location.reload()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout} 
      className="gap-2 !rotate-0 !skew-x-0 w-40 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border-slate-600/50"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  )
}
