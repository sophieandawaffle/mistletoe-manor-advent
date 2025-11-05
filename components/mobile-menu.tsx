"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LogoutButton } from "@/components/logout-button"
import { useState } from "react"

interface MobileMenuProps {
  calendarId: string
  unlockAll: boolean
  onUnlockAll: () => void
  onLockDoors: () => void
}

export function MobileMenu({ calendarId, unlockAll, onUnlockAll, onLockDoors }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleUnlockClick = () => {
    setOpen(false)
    onUnlockAll()
  }

  const handleLockClick = () => {
    setOpen(false)
    onLockDoors()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="secondary" 
          size="icon" 
          className="!rotate-0 !skew-x-0 bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white border-slate-700/50 backdrop-blur-sm"
        >
          <Menu className="h-5 w-5 !rotate-0 !skew-x-0" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 backdrop-blur-sm"
      >
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex flex-col items-center gap-4 mt-8">
          {!unlockAll && (
            <Button 
              onClick={handleUnlockClick} 
              variant="outline" 
              className="w-40 !rotate-0 !skew-x-0 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border-slate-600/50"
            >
              Unlock All Doors
            </Button>
          )}
          {unlockAll && (
            <Button 
              onClick={handleLockClick} 
              variant="outline" 
              className="w-40 !rotate-0 !skew-x-0 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border-slate-600/50"
            >
              Lock Doors
            </Button>
          )}
          <LogoutButton calendarId={calendarId} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
