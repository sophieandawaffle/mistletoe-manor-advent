"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { getTimeUntilUnlock } from "@/lib/advent-data"
import Image from "next/image"

interface CountdownModalProps {
  day: number
  onClose: () => void
}

export function CountdownModal({ day, onClose }: CountdownModalProps) {
  const [countdown, setCountdown] = useState(getTimeUntilUnlock(day))

  useEffect(() => {
    // Update countdown every minute
    const interval = setInterval(() => {
      const newCountdown = getTimeUntilUnlock(day)
      setCountdown(newCountdown)

      // If door is now unlocked, close modal
      if (!newCountdown) {
        onClose()
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [day, onClose])

  if (!countdown) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-xl max-w-sm w-full p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <Image src="/lock-icon.svg" alt="Locked" width={48} height={48} className="opacity-90" />
          </div>

          <h2 className="text-2xl font-bold text-center">Door {day} is Locked</h2>

          <div className="space-y-2">
            <p className="text-muted-foreground text-center">Unlocks in</p>
            <div className="font-bold text-foreground text-center">
              {countdown.days > 0 && `${countdown.days} day${countdown.days !== 1 ? "s" : ""}, `}
              {countdown.hours} hour{countdown.hours !== 1 ? "s" : ""}, {countdown.minutes} minute
              {countdown.minutes !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
