"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UnlockConfirmationModalProps {
  onConfirm: () => void
  onClose: () => void
}

export function UnlockConfirmationModal({ onConfirm, onClose }: UnlockConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-background/95 backdrop-blur-sm border border-border rounded-lg p-8 max-w-sm w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">Are you sure?</h2>
        <p className="text-muted-foreground text-center mb-6">Warning: spoilers ahead!</p>
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Back
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            Unlock
          </Button>
        </div>
      </div>
    </div>
  )
}
