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

  // Only show sudoku puzzles on this page
  const isSudoku = calendar.id === "a-very-sudoku-christmas"
  
  if (!isSudoku || !content.interactiveUrl) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href={`/${calendarSlug}`}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Calendar</span>
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {content.title}
        </h1>

        {/* Story text if available */}
        {content.storyText && (
          <p className="text-slate-300 mb-8 max-w-3xl">
            {content.storyText}
          </p>
        )}

        {/* Sudoku puzzle */}
        <div className="w-full max-w-6xl mx-auto">
          <style dangerouslySetInnerHTML={{__html: `
            .sudoku-day-container {
              width: calc(100vw - 2rem);
              height: calc((100vw - 2rem) * 1.33);
              max-height: calc((100vw - 2rem) * 1.33);
            }
            @media (min-width: 768px) {
              .sudoku-day-container {
                width: min(calc(100vw - 4rem), calc(100vh - 4rem));
                height: calc(min(calc(100vw - 4rem), calc(100vh - 4rem)) * 0.67);
                max-width: min(calc(100vw - 4rem), calc(100vh - 4rem));
                max-height: calc(min(calc(100vw - 4rem), calc(100vh - 4rem)) * 0.67);
              }
            }
          `}} />
          <div className="sudoku-day-container relative mx-auto">
            <iframe
              src={content.interactiveUrl}
              className="w-full h-full border-0 rounded-lg"
              title={`Day ${dayNum} sudoku puzzle`}
              allowFullScreen
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

