import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params

    // Set auth cookie for bypass
    const cookieStore = await cookies()
    cookieStore.set(
      `calendar_auth_${calendarId}`,
      JSON.stringify({
        orderId: "test-bypass",
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
    console.error("[v0] Bypass error:", error)
    return NextResponse.json({ error: "Bypass failed" }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
