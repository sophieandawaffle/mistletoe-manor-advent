import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCalendarBySlug } from "@/lib/calendars/calendar-config"
import { getDayContent } from "@/lib/advent-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface DayPageProps {
  params: Promise<{
    calendarSlug: string
    day: string
  }>
}

export async function generateMetadata({ params }: DayPageProps): Promise<Metadata> {
  const { calendarSlug, day } = await params
  const calendar = getCalendarBySlug(calendarSlug)
  const dayNum = parseInt(day, 10)

  if (!calendar || isNaN(dayNum) || dayNum < 1 || dayNum > 24) {
    return {
      title: "Day Not Found | CosyClueCo",
    }
  }

  const content = getDayContent(dayNum, calendar.id)

  return {
    title: `${content?.title || `Day ${dayNum}`} | ${calendar.name}`,
    description: content?.storyText || `Day ${dayNum} of ${calendar.name}`,
  }
}

export default async function DayPage({ params }: DayPageProps) {
  const { calendarSlug, day } = await params
  const calendar = getCalendarBySlug(calendarSlug)
  const dayNum = parseInt(day, 10)

  if (!calendar || isNaN(dayNum) || dayNum < 1 || dayNum > 24) {
    notFound()
  }

  const content = getDayContent(dayNum, calendar.id)

  if (!content) {
    notFound()
  }

  // Only show sudoku puzzles on this page, or Christmas Conspiracy days
  const isSudoku = calendar.id === "a-very-sudoku-christmas"
  const isChristmasConspiracy = calendar.id === "christmas-conspiracy"
  
  if ((!isSudoku && !isChristmasConspiracy) || !content.interactiveUrl) {
    notFound()
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Back button - positioned as overlay */}
      <Link
        href={`/${calendarSlug}`}
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Calendar</span>
      </Link>

      {/* Interactive game/puzzle - full page with mobile padding */}
      <div className="w-full h-full pt-16 md:pt-0">
        <iframe
          src={content.interactiveUrl}
          className="w-full h-full border-0"
          title={`Day ${dayNum} ${isSudoku ? 'sudoku puzzle' : 'game'}`}
          allowFullScreen
        />
      </div>
    </div>
  )
}

