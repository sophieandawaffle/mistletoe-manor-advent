import { notFound } from "next/navigation"
import { getCalendarBySlug } from "@/lib/calendars/calendar-config"
import { CalendarView } from "@/components/calendar-view"
import { PasswordGate } from "@/components/password-gate"
import { cookies } from "next/headers"
import type { Metadata } from "next"

interface CalendarPageProps {
  params: Promise<{
    calendarSlug: string
  }>
}

export async function generateMetadata({ params }: CalendarPageProps): Promise<Metadata> {
  const { calendarSlug } = await params
  const calendar = getCalendarBySlug(calendarSlug)

  if (!calendar) {
    return {
      title: "Calendar Not Found | CosyClueCo",
    }
  }

  return {
    title: `${calendar.name} | CosyClueCo Advent Calendar`,
    description: calendar.description,
    icons: {
      icon: "/images/cosy-clue-co-logo.svg",
    },
  }
}

export default async function CalendarPage({ params }: CalendarPageProps) {
  const { calendarSlug } = await params
  const calendar = getCalendarBySlug(calendarSlug)

  if (!calendar) {
    notFound()
  }

  // Check if user is authenticated
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(`calendar_auth_${calendar.id}`)

  let orderId = "public"
  let isAuthenticated = false

  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value)
      if (authData.authenticated) {
        isAuthenticated = true
        orderId = authData.orderId
      }
    } catch (error) {
      console.error("[v0] Failed to parse auth cookie:", error)
    }
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate calendar={calendar} />
  }

  return <CalendarView calendar={calendar} orderId={orderId} />
}
