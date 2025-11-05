"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface AdventDoorProps {
  day: number
  isUnlocked: boolean
  isOpened: boolean
  position: {
    top: string
    left: string
    rotate: string
    scale: number
    mobileTop?: string
    mobileLeft?: string
    mobileScale?: number
  } | null
  doorImageUrl: string
  onClick: () => void
  isMobile: boolean
  calendarId?: string
}

export function AdventDoor({ day, isUnlocked, isOpened, position, doorImageUrl, onClick, isMobile, calendarId }: AdventDoorProps) {
  // Check if this is the sudoku calendar - use complete SVG files from "Untitled design (1)" directory
  const isSudokuCalendar = calendarId === "a-very-sudoku-christmas"
  // URL encode the directory name to handle spaces and parentheses
  const directoryName = encodeURIComponent("Untitled design (1)")
  const sudokuDoorImage = isSudokuCalendar ? `/${directoryName}/${day}.svg` : null

  if (isMobile) {
    // Mobile grid layout - same visual style as desktop
    return (
      <button
        onClick={onClick}
        className={cn(
          "relative transition-all duration-300",
          "cursor-pointer hover:scale-105 active:scale-95",
          "aspect-[3/4] w-full",
          "flex items-center justify-center",
          isOpened && "opacity-60",
          !isUnlocked && "opacity-50 grayscale",
        )}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={sudokuDoorImage || doorImageUrl || "/placeholder.svg"}
            alt={`Door ${day}`}
            width={80}
            height={100}
            className="w-full h-full object-contain"
            sizes="80px"
          />
        </div>
      </button>
    )
  }

  // Desktop absolute positioning
  const mobileStyle =
    position?.mobileTop && position?.mobileLeft && position?.mobileScale
      ? {
          top: position.mobileTop,
          left: position.mobileLeft,
          transform: `rotate(${position.rotate}) scale(${position.mobileScale})`,
        }
      : undefined

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute transition-all duration-300",
        "cursor-pointer hover:scale-105",
        isOpened && "opacity-60",
        !isUnlocked && "opacity-50 grayscale",
      )}
      style={{
        top: position?.top,
        left: position?.left,
        transform: `rotate(${position?.rotate}) scale(${position?.scale})`,
      }}
    >
      {mobileStyle && (
        <style jsx>{`
          @media (max-width: 768px) {
            button:nth-of-type(${day}) {
              top: ${mobileStyle.top} !important;
              left: ${mobileStyle.left} !important;
              transform: ${mobileStyle.transform} !important;
            }
          }
        `}</style>
      )}

      <div className="relative w-12 h-16 sm:w-16 sm:h-20 md:w-28 md:h-36">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={sudokuDoorImage || doorImageUrl || "/placeholder.svg"}
            alt={`Door ${day}`}
            width={112}
            height={144}
            className="w-full h-full object-contain -my-[15%]"
            sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 112px"
          />
        </div>
      </div>
    </button>
  )
}
