"use client"

import { useState } from "react"
import { AdventDoor } from "./advent-door"
import { DayModal } from "./day-modal"
import { CountdownModal } from "./countdown-modal"
import { getDayContent, isDayUnlocked } from "@/lib/advent-data"
import type { DayContent } from "@/lib/advent-data"

interface AdventCalendarProps {
  calendarId: string
  unlockAll: boolean // Now using this prop instead of local state
}

const doorPositions = [
  // Row 1 (6 doors) - Desktop: 4 doors across, Mobile: 4 doors across
  { top: "1%", left: "4%", rotate: "-3deg", scale: 1.45, mobileTop: "1%", mobileLeft: "6%", mobileScale: 0.85 },
  { top: "2%", left: "20%", rotate: "2deg", scale: 1.4, mobileTop: "0%", mobileLeft: "28%", mobileScale: 0.95 },
  { top: "0%", left: "37%", rotate: "-1deg", scale: 1.5, mobileTop: "2%", mobileLeft: "51%", mobileScale: 0.9 },
  { top: "1%", left: "54%", rotate: "3deg", scale: 1.35, mobileTop: "1%", mobileLeft: "74%", mobileScale: 0.88 },

  // Row 2 - Desktop continues row 1, Mobile starts new row
  { top: "2%", left: "71%", rotate: "-2deg", scale: 1.45, mobileTop: "16%", mobileLeft: "6%", mobileScale: 0.92 },
  { top: "1%", left: "88%", rotate: "1deg", scale: 1.4, mobileTop: "15%", mobileLeft: "31%", mobileScale: 0.87 },
  { top: "25%", left: "6%", rotate: "2deg", scale: 1.5, mobileTop: "14%", mobileLeft: "57%", mobileScale: 0.93 },
  { top: "24%", left: "22%", rotate: "-3deg", scale: 1.35, mobileTop: "16%", mobileLeft: "77%", mobileScale: 0.89 },

  // Row 3
  { top: "26%", left: "39%", rotate: "1deg", scale: 1.45, mobileTop: "31%", mobileLeft: "6%", mobileScale: 0.91 },
  { top: "25%", left: "56%", rotate: "-2deg", scale: 1.4, mobileTop: "30%", mobileLeft: "24%", mobileScale: 0.86 },
  { top: "24%", left: "73%", rotate: "3deg", scale: 1.5, mobileTop: "32%", mobileLeft: "47%", mobileScale: 0.94 },
  { top: "26%", left: "90%", rotate: "-1deg", scale: 1.35, mobileTop: "31%", mobileLeft: "71%", mobileScale: 0.88 },

  // Row 4
  { top: "48%", left: "5%", rotate: "-2deg", scale: 1.4, mobileTop: "46%", mobileLeft: "6%", mobileScale: 0.9 },
  { top: "49%", left: "21%", rotate: "3deg", scale: 1.45, mobileTop: "45%", mobileLeft: "29%", mobileScale: 0.93 },
  { top: "47%", left: "38%", rotate: "-1deg", scale: 1.35, mobileTop: "47%", mobileLeft: "54%", mobileScale: 0.87 },
  { top: "48%", left: "55%", rotate: "2deg", scale: 1.5, mobileTop: "46%", mobileLeft: "75%", mobileScale: 0.91 },

  // Row 5
  { top: "49%", left: "72%", rotate: "-3deg", scale: 1.4, mobileTop: "61%", mobileLeft: "8%", mobileScale: 0.89 },
  { top: "48%", left: "89%", rotate: "1deg", scale: 1.45, mobileTop: "60%", mobileLeft: "32%", mobileScale: 0.92 },
  { top: "68%", left: "7%", rotate: "1deg", scale: 1.5, mobileTop: "59%", mobileLeft: "59%", mobileScale: 0.86 },
  { top: "67%", left: "23%", rotate: "-2deg", scale: 1.4, mobileTop: "61%", mobileLeft: "79%", mobileScale: 0.94 },

  // Row 6
  { top: "69%", left: "40%", rotate: "3deg", scale: 1.35, mobileTop: "74%", mobileLeft: "6%", mobileScale: 0.88 },
  { top: "68%", left: "57%", rotate: "-1deg", scale: 1.45, mobileTop: "73%", mobileLeft: "26%", mobileScale: 0.91 },
  { top: "67%", left: "74%", rotate: "2deg", scale: 1.5, mobileTop: "75%", mobileLeft: "52%", mobileScale: 0.93 },
  { top: "68%", left: "91%", rotate: "-3deg", scale: 1.4, mobileTop: "74%", mobileLeft: "76%", mobileScale: 0.87 },
]

export function AdventCalendar({ calendarId, unlockAll }: AdventCalendarProps) {
  const [openedDays, setOpenedDays] = useState<Set<number>>(new Set())
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null)
  const [countdownDay, setCountdownDay] = useState<number | null>(null)

  const handleDoorClick = (day: number) => {
    const isUnlocked = isDayUnlocked(day, unlockAll)
    console.log(`[v0] Door ${day} clicked. Unlocked: ${isUnlocked}, UnlockAll: ${unlockAll}`)

    if (!isUnlocked) {
      setCountdownDay(day)
      return
    }

    const content = getDayContent(day)
    if (content) {
      setSelectedDay(content)
      setOpenedDays((prev) => new Set(prev).add(day))
    }
  }

  return (
    <>
      <div className="relative w-full min-h-[85vh] md:min-h-[70vh]">
        {Array.from({ length: 24 }, (_, i) => i + 1).map((day) => {
          const content = getDayContent(day)
          return (
            <AdventDoor
              key={day}
              day={day}
              isUnlocked={isDayUnlocked(day, unlockAll)}
              isOpened={openedDays.has(day)}
              position={doorPositions[day - 1]}
              doorImageUrl={content?.doorImageUrl || ""}
              onClick={() => handleDoorClick(day)}
            />
          )
        })}
      </div>

      {selectedDay && <DayModal content={selectedDay} onClose={() => setSelectedDay(null)} />}
      {countdownDay && <CountdownModal day={countdownDay} onClose={() => setCountdownDay(null)} />}
    </>
  )
}
