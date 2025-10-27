"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { DayContent } from "@/lib/advent-data"

interface DayModalProps {
  content: DayContent
  onClose: () => void
}

export function DayModal({ content, onClose }: DayModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-2xl border-2 border-border transform-none">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pt-12 md:p-8 space-y-6 transform-none">
          <div className="relative w-full flex justify-center">
            <img
              src={content.illustrationUrl || "/placeholder.svg"}
              alt={`Day ${content.day} illustration`}
              className="w-full max-w-2xl h-auto object-contain"
            />
          </div>

          <div className="pt-4 flex justify-center transform-none">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="w-full md:w-auto md:min-w-[300px] !rotate-0 !skew-x-0 bg-transparent hover:bg-secondary/80 hover:text-secondary-foreground"
            >
              Return to Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
