import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyCalendarPassword } from "@/lib/calendars/password-auth"

export async function POST(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params
    const body = await request.json()
    const { orderId, password } = body

    if (!orderId || !password) {
      return NextResponse.json({ error: "Order ID and password are required" }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Verify the password
    const isValid = await verifyCalendarPassword(calendarId, orderId, password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid order ID or password" }, { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set(
      `calendar_auth_${calendarId}`,
      JSON.stringify({
        orderId,
        authenticated: true,
        timestamp: Date.now(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    )

    return NextResponse.json({ success: true }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
