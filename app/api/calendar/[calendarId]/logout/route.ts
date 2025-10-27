import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params

    // Clear auth cookie
    const cookieStore = await cookies()
    cookieStore.delete(`calendar_auth_${calendarId}`)

    return NextResponse.json({ success: true }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
