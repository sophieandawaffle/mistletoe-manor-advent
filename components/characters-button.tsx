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
          className="gap-2 !rotate-0 !skew-x-0 w-40 bg-background hover:bg-secondary/80 text-foreground hover:text-secondary-foreground border-border"
        >
          <Users className="h-4 w-4" />
          Characters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border backdrop-blur-sm">
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
