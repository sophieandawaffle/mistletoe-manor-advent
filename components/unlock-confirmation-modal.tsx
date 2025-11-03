"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UnlockConfirmationModalProps {
  onConfirm: () => void
  onClose: () => void
  calendarId?: string
}

export function UnlockConfirmationModal({ onConfirm, onClose, calendarId }: UnlockConfirmationModalProps) {
  const isChristmasConspiracy = calendarId === "christmas-conspiracy"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`relative backdrop-blur-sm border rounded-lg p-8 max-w-sm w-full shadow-xl ${
        isChristmasConspiracy
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/50"
          : "bg-background/95 border-border"
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition-colors rounded-full p-2 ${
            isChristmasConspiracy
              ? "text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className={`text-2xl font-bold text-center mb-2 ${
          isChristmasConspiracy ? "text-slate-200" : ""
        }`}>
          Are you sure?
        </h2>
        <p className={`text-center mb-6 ${
          isChristmasConspiracy ? "text-slate-400" : "text-muted-foreground"
        }`}>
          Warning: spoilers ahead!
        </p>
        <div className="flex gap-3">
          <Button 
            onClick={onClose} 
            variant="outline" 
            className={`flex-1 ${
              isChristmasConspiracy
                ? "bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border-slate-600/50"
                : "bg-transparent"
            }`}
          >
            Back
          </Button>
          <Button 
            onClick={onConfirm} 
            className={`flex-1 ${
              isChristmasConspiracy
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
                : ""
            }`}
          >
            Unlock
          </Button>
        </div>
      </div>
    </div>
  )
}
