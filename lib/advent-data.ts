export interface DayContent {
  day: number
  title: string
  storyText: string
  illustrationUrl: string
  clueCardUrl: string
  doorImageUrl: string // Added doorImageUrl for custom SVG door images
  puzzle?: {
    type: "text-input" | "multiple-choice" | "reveal"
    question?: string
    answer?: string
    options?: string[]
    revealText?: string
  }
}

// Placeholder data structure for all 24 days
export const adventData: DayContent[] = Array.from({ length: 24 }, (_, i) => {
  const day = i + 1

  let illustrationUrl = `/placeholder.svg?height=400&width=600&query=vintage Christmas mystery illustration day ${day}`

  if (day === 1) {
    illustrationUrl = `/images/clues/day1letter.svg`
  } else if (day === 2) {
    illustrationUrl = `/images/clues/day2letter.svg`
  } else if (day === 3) {
    illustrationUrl = `/images/clues/day3letter.svg`
  } else if (day === 4) {
    illustrationUrl = `/images/clues/day4image.svg`
  } else if (day === 5) {
    illustrationUrl = `/images/clues/day5letter.svg`
  } else if (day === 6) {
    illustrationUrl = `/images/clues/day6image.svg`
  } else if (day === 7) {
    illustrationUrl = `/images/clues/day7letter.svg`
  } else if (day === 8) {
    illustrationUrl = `/images/clues/day8letter.svg`
  } else if (day === 9) {
    illustrationUrl = `/images/clues/day9letter.svg`
  } else if (day === 10) {
    illustrationUrl = `/images/clues/day10image.svg`
  } else if (day === 11) {
    illustrationUrl = `/images/clues/day11letter.svg`
  } else if (day === 12) {
    illustrationUrl = `/images/clues/day12letter.svg`
  } else if (day === 13) {
    illustrationUrl = `/images/clues/day13image.svg`
  } else if (day === 14) {
    illustrationUrl = `/images/clues/day14letter.svg`
  } else if (day === 15) {
    illustrationUrl = `/images/clues/day15image.svg`
  } else if (day === 16) {
    illustrationUrl = `/images/clues/day16letter.svg`
  } else if (day === 17) {
    illustrationUrl = `/images/clues/day17image.svg`
  } else if (day === 18) {
    illustrationUrl = `/images/clues/day18letter.svg`
  } else if (day === 19) {
    illustrationUrl = `/images/clues/day19letter.svg`
  } else if (day === 20) {
    illustrationUrl = `/images/clues/day20letter.svg`
  } else if (day === 21) {
    illustrationUrl = `/images/clues/day21image.svg`
  } else if (day === 22) {
    illustrationUrl = `/images/clues/day22letter.svg`
  } else if (day === 23) {
    illustrationUrl = `/images/clues/day23image.svg`
  } else if (day === 24) {
    illustrationUrl = `/images/clues/day24letter.svg`
  }

  return {
    day,
    title: `Day ${day}: Mystery Unfolds`,
    storyText: `This is placeholder text for Day ${day}. Replace this with your custom story content, clues, and narrative for the Murder at Mistletoe Manor mystery.`,
    illustrationUrl,
    clueCardUrl: `/placeholder.svg?height=300&width=400&query=vintage clue card with magnifying glass day ${day}`,
    doorImageUrl: `/images/doors/door-${day}.svg`,
    puzzle:
      day % 3 === 0
        ? {
            type: "reveal",
            revealText: "Tap to reveal the hidden clue...",
          }
        : undefined,
  }
})

export function getDayContent(day: number): DayContent | undefined {
  return adventData.find((d) => d.day === day)
}

export function isDayUnlocked(day: number, unlockAllOverride = false): boolean {
  // If unlock all is enabled, all doors are unlocked
  if (unlockAllOverride) {
    return true
  }

  // Get current time in UTC
  const now = new Date()

  // Create unlock date for this door: 2025-12-{day} 06:00:00 UTC
  const unlockDate = new Date(Date.UTC(2025, 11, day, 6, 0, 0)) // Month is 0-indexed, so 11 = December

  // Door is unlocked if current UTC time >= unlock time
  return now >= unlockDate
}

export function getTimeUntilUnlock(day: number): { days: number; hours: number; minutes: number } | null {
  // Get current time in UTC
  const now = new Date()

  // Create unlock date for this door: 2025-12-{day} 06:00:00 UTC
  const unlockDate = new Date(Date.UTC(2025, 11, day, 6, 0, 0))

  // If already unlocked, return null
  if (now >= unlockDate) {
    return null
  }

  // Calculate difference in milliseconds
  const diffMs = unlockDate.getTime() - now.getTime()

  // Convert to days, hours, minutes
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}
