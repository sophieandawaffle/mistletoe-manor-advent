"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Users } from "lucide-react"
import Image from "next/image"

export function CharactersButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 !rotate-0 !skew-x-0 w-40 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border-slate-600/50"
        >
          <Users className="h-4 w-4" />
          Characters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 backdrop-blur-sm">
        <DialogTitle className="sr-only">Character Guide</DialogTitle>
        <div className="flex justify-center items-center">
          <Image
            src="/images/characters-guide.svg"
            alt="Character Guide"
            width={800}
            height={1000}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
