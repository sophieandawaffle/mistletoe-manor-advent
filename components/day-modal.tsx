"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DayContent } from "@/lib/advent-data"

interface DayModalProps {
  content: DayContent
  onClose: () => void
  calendarId?: string
}

export function DayModal({ content, onClose, calendarId }: DayModalProps) {
  const isMistletoeManor = calendarId === "murder-mistletoe-manor"
  
  // Mistletoe Manor: Original simple modal with image and return button
  if (isMistletoeManor) {
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
  
  // Default modal style (for christmas conspiracy and crossword)
  const modalStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    maxHeight: 'calc(100vh - 2rem)',
    height: 'calc(100vh - 2rem)'
  }
  
  const modalMaxWidth = 'max-w-5xl'
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-1 sm:p-2 md:p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className={`relative w-full ${modalMaxWidth} rounded-lg sm:rounded-xl shadow-2xl border-2 border-border transform-none flex flex-col mt-14 sm:mt-0`}
        style={modalStyle}
      >
        <button
          onClick={onClose}
          className="absolute top-16 right-2 sm:top-4 sm:right-4 z-[70] text-slate-300 hover:text-white transition-colors bg-slate-900/80 rounded-full p-1.5 sm:p-2 hover:bg-slate-800/90 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex-1 flex flex-col overflow-hidden p-1 sm:p-4 md:p-6 pt-12 sm:pt-10 md:pt-12">
          {content.interactiveUrl ? (
            // Show interactive content in iframe (responsive height)
            <div className="relative w-full flex-1 min-h-0">
              <iframe
                src={content.interactiveUrl}
                className="w-full h-full border-0 rounded-lg"
                title={`Day ${content.day} interactive content`}
                allowFullScreen
                scrolling="yes"
              />
            </div>
          ) : (
            // Show regular image
            <div className="relative w-full flex justify-center flex-1 min-h-0 overflow-auto">
              <img
                src={content.illustrationUrl || "/placeholder.svg"}
                alt={`Day ${content.day} illustration`}
                className="w-full max-w-2xl h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
