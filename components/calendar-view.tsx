"use client"

import { AdventCalendar } from "@/components/advent-calendar"
import { Snowfall } from "@/components/snowfall"
import Image from "next/image"
import type { CalendarConfig } from "@/lib/calendars/calendar-config"
import { MobileMenu } from "@/components/mobile-menu"
import { UnlockConfirmationModal } from "@/components/unlock-confirmation-modal"
import { useState, useEffect } from "react"

interface CalendarViewProps {
  calendar: CalendarConfig
  orderId: string
}

export function CalendarView({ calendar, orderId }: CalendarViewProps) {
  const [unlockAll, setUnlockAll] = useState(false)
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load unlock_all state from Supabase on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch(`/api/calendar/${calendar.id}/progress?orderId=${encodeURIComponent(orderId)}`)
        if (response.ok) {
          const data = await response.json()
          if (typeof data.unlockAll === "boolean") {
            setUnlockAll(data.unlockAll)
          }
        }
      } catch (error) {
        console.error("[v0] Error loading unlock state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [calendar.id, orderId])

  // Save unlock_all state to Supabase when it changes
  useEffect(() => {
    if (isLoading) return

    const saveUnlockState = async () => {
      try {
        // Also fetch current openedDays to include in the save
        const getResponse = await fetch(`/api/calendar/${calendar.id}/progress?orderId=${encodeURIComponent(orderId)}`)
        const getData = await getResponse.ok ? await getResponse.json() : { openedDays: [] }

        await fetch(`/api/calendar/${calendar.id}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            openedDays: getData.openedDays || [],
            unlockAll,
          }),
        })
      } catch (error) {
        console.error("[v0] Error saving unlock state:", error)
      }
    }

    saveUnlockState()
  }, [unlockAll, calendar.id, orderId, isLoading])

  const handleUnlockAll = () => {
    setShowUnlockConfirmation(true)
  }

  const confirmUnlockAll = () => {
    console.log("[v0] Unlocking all doors")
    setUnlockAll(true)
    setShowUnlockConfirmation(false)
  }

  const handleLockDoors = () => {
    console.log("[v0] Locking doors")
    setUnlockAll(false)
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${calendar.backgroundColor} bg-cover bg-center bg-no-repeat`}
    >
      <Snowfall />

      <div className="fixed top-4 right-4 z-50 isolate">
        <MobileMenu
          calendarId={calendar.id}
          unlockAll={unlockAll}
          onUnlockAll={handleUnlockAll}
          onLockDoors={handleLockDoors}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center relative pt-4">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs md:max-w-2xl">
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
        </header>

        {/* Calendar */}
        <div className="container mx-auto px-0 md:px-4 pb-4">
          <AdventCalendar calendarId={calendar.id} unlockAll={unlockAll} orderId={orderId} />
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center py-4 px-4">
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

      {showUnlockConfirmation && (
        <UnlockConfirmationModal onConfirm={confirmUnlockAll} onClose={() => setShowUnlockConfirmation(false)} />
      )}
    </main>
  )
}
