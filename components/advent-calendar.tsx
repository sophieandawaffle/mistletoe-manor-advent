"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdventDoor } from "./advent-door"
import { DayModal } from "./day-modal"
import { CountdownModal } from "./countdown-modal"
import { getDayContent, isDayUnlocked } from "@/lib/advent-data"
import type { DayContent } from "@/lib/advent-data"

interface AdventCalendarProps {
  calendarId: string
  unlockAll: boolean // Now using this prop instead of local state
  orderId: string // Add orderId to identify the user
}

const doorPositions = [
  // Row 1 (4 doors) - Doors 1-4 - Mobile: 4 doors across
  { top: "1%", left: "4%", rotate: "-3deg", scale: 1.45, mobileTop: "5%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "2%", left: "20%", rotate: "2deg", scale: 1.4, mobileTop: "5%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "0%", left: "37%", rotate: "-1deg", scale: 1.5, mobileTop: "5%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "1%", left: "54%", rotate: "3deg", scale: 1.35, mobileTop: "5%", mobileLeft: "85%", mobileScale: 0.4 },

  // Row 2 (4 doors) - Doors 5-8 - Mobile: 4 doors across
  { top: "2%", left: "71%", rotate: "-2deg", scale: 1.45, mobileTop: "20%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "1%", left: "88%", rotate: "1deg", scale: 1.4, mobileTop: "20%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "25%", left: "6%", rotate: "2deg", scale: 1.5, mobileTop: "20%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "24%", left: "22%", rotate: "-3deg", scale: 1.35, mobileTop: "20%", mobileLeft: "85%", mobileScale: 0.4 },

  // Row 3 (4 doors) - Doors 9-12 - Mobile: 4 doors across
  { top: "26%", left: "39%", rotate: "1deg", scale: 1.45, mobileTop: "35%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "25%", left: "56%", rotate: "-2deg", scale: 1.4, mobileTop: "35%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "24%", left: "73%", rotate: "3deg", scale: 1.5, mobileTop: "35%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "26%", left: "90%", rotate: "-1deg", scale: 1.35, mobileTop: "35%", mobileLeft: "85%", mobileScale: 0.4 },

  // Row 4 (4 doors) - Doors 13-16 - Mobile: 4 doors across
  { top: "48%", left: "5%", rotate: "-2deg", scale: 1.4, mobileTop: "50%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "49%", left: "21%", rotate: "3deg", scale: 1.45, mobileTop: "50%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "47%", left: "38%", rotate: "-1deg", scale: 1.35, mobileTop: "50%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "48%", left: "55%", rotate: "2deg", scale: 1.5, mobileTop: "50%", mobileLeft: "85%", mobileScale: 0.4 },

  // Row 5 (4 doors) - Doors 17-20 - Mobile: 4 doors across
  { top: "49%", left: "72%", rotate: "-3deg", scale: 1.4, mobileTop: "65%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "48%", left: "89%", rotate: "1deg", scale: 1.45, mobileTop: "65%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "68%", left: "7%", rotate: "1deg", scale: 1.5, mobileTop: "65%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "67%", left: "23%", rotate: "-2deg", scale: 1.4, mobileTop: "65%", mobileLeft: "85%", mobileScale: 0.4 },

  // Row 6 (4 doors) - Doors 21-24 - Mobile: 4 doors across
  { top: "69%", left: "40%", rotate: "3deg", scale: 1.35, mobileTop: "80%", mobileLeft: "10%", mobileScale: 0.4 },
  { top: "68%", left: "57%", rotate: "-1deg", scale: 1.45, mobileTop: "80%", mobileLeft: "35%", mobileScale: 0.4 },
  { top: "67%", left: "74%", rotate: "2deg", scale: 1.5, mobileTop: "80%", mobileLeft: "60%", mobileScale: 0.4 },
  { top: "68%", left: "91%", rotate: "-3deg", scale: 1.4, mobileTop: "80%", mobileLeft: "85%", mobileScale: 0.4 },
]

export function AdventCalendar({ calendarId, unlockAll, orderId }: AdventCalendarProps) {
  const router = useRouter()
  const [openedDays, setOpenedDays] = useState<Set<number>>(new Set())
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null)
  const [countdownDay, setCountdownDay] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Get calendar slug for navigation
  const calendarSlug = calendarId === "a-very-sudoku-christmas" ? "a-very-sudoku-christmas" : null

  // Load progress from Supabase on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch(`/api/calendar/${calendarId}/progress?orderId=${encodeURIComponent(orderId)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.openedDays && Array.isArray(data.openedDays)) {
            setOpenedDays(new Set(data.openedDays))
          }
        }
      } catch (error) {
        console.error("[v0] Error loading progress:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [calendarId, orderId])

  // Save progress to Supabase when openedDays changes
  useEffect(() => {
    if (isLoading) return

    const saveProgress = async () => {
      try {
        const openedDaysArray = Array.from(openedDays).sort((a, b) => a - b)
        await fetch(`/api/calendar/${calendarId}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            openedDays: openedDaysArray,
            unlockAll: unlockAll, // Include unlockAll state in saves
          }),
        })
      } catch (error) {
        console.error("[v0] Error saving progress:", error)
      }
    }

    // Debounce saves to avoid too many requests
    const timeoutId = setTimeout(saveProgress, 500)
    return () => clearTimeout(timeoutId)
  }, [openedDays, unlockAll, calendarId, orderId, isLoading])

  const handleDoorClick = (day: number) => {
    const isUnlocked = isDayUnlocked(day, unlockAll)
    console.log(`[v0] Door ${day} clicked. Unlocked: ${isUnlocked}, UnlockAll: ${unlockAll}`)

    if (!isUnlocked) {
      setCountdownDay(day)
      return
    }

    // For sudoku calendar, navigate to day page instead of opening modal
    if (calendarId === "a-very-sudoku-christmas" && calendarSlug) {
      setOpenedDays((prev) => new Set(prev).add(day))
      router.push(`/${calendarSlug}/${day}`)
      return
    }

    const content = getDayContent(day, calendarId)
    if (content) {
      setSelectedDay(content)
      setOpenedDays((prev) => new Set(prev).add(day))
    }
  }

  return (
    <>
      {/* Mobile: Grid layout - shown only on mobile via CSS */}
      <div className="w-full md:hidden">
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto p-4">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((day) => {
            const content = getDayContent(day, calendarId)
            return (
              <AdventDoor
                key={day}
                day={day}
                isUnlocked={isDayUnlocked(day, unlockAll)}
                isOpened={openedDays.has(day)}
                position={null} // No position needed for mobile grid
                doorImageUrl={content?.doorImageUrl || ""}
                onClick={() => handleDoorClick(day)}
                isMobile={true}
                calendarId={calendarId}
              />
            )
          })}
        </div>
      </div>

      {/* Desktop: Absolute positioning - shown only on desktop via CSS */}
      <div className="hidden md:block relative w-full h-[100vh] sm:h-[100vh] md:min-h-[70vh]">
        {Array.from({ length: 24 }, (_, i) => i + 1).map((day) => {
          const content = getDayContent(day, calendarId)
          return (
            <AdventDoor
              key={day}
              day={day}
              isUnlocked={isDayUnlocked(day, unlockAll)}
              isOpened={openedDays.has(day)}
              position={doorPositions[day - 1]}
              doorImageUrl={content?.doorImageUrl || ""}
              onClick={() => handleDoorClick(day)}
              isMobile={false}
              calendarId={calendarId}
            />
          )
        })}
      </div>

      {selectedDay && <DayModal content={selectedDay} onClose={() => setSelectedDay(null)} calendarId={calendarId} />}
      {countdownDay && <CountdownModal day={countdownDay} onClose={() => setCountdownDay(null)} />}
    </>
  )
}
