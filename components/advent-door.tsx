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
  }
  doorImageUrl: string
  onClick: () => void
}

export function AdventDoor({ day, isUnlocked, isOpened, position, doorImageUrl, onClick }: AdventDoorProps) {
  const mobileStyle =
    position.mobileTop && position.mobileLeft && position.mobileScale
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
        top: position.top,
        left: position.left,
        transform: `rotate(${position.rotate}) scale(${position.scale})`,
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

      <div className="relative w-28 h-36 md:w-28 md:h-36">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={doorImageUrl || "/placeholder.svg"}
            alt={`Door ${day}`}
            width={112}
            height={144}
            className="w-full h-full object-contain -my-[15%]"
          />
        </div>
      </div>
    </button>
  )
}
