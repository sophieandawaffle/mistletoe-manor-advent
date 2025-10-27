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

  useEffect(() => {
    const stored = localStorage.getItem(`unlockAll-${calendar.id}`)
    if (stored === "true") {
      setUnlockAll(true)
    }
  }, [calendar.id])

  const handleUnlockAll = () => {
    setShowUnlockConfirmation(true)
  }

  const confirmUnlockAll = () => {
    console.log("[v0] Unlocking all doors")
    setUnlockAll(true)
    localStorage.setItem(`unlockAll-${calendar.id}`, "true")
    setShowUnlockConfirmation(false)
  }

  const handleLockDoors = () => {
    console.log("[v0] Locking doors")
    setUnlockAll(false)
    localStorage.removeItem(`unlockAll-${calendar.id}`)
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
        <div className="container mx-auto px-0 md:px-4 pb-8">
          <AdventCalendar calendarId={calendar.id} unlockAll={unlockAll} />
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

      {showUnlockConfirmation && (
        <UnlockConfirmationModal onConfirm={confirmUnlockAll} onClose={() => setShowUnlockConfirmation(false)} />
      )}
    </main>
  )
}
