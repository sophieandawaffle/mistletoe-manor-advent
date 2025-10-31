import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { orderExists, createPasswordlessAccount } from "@/lib/calendars/password-auth"

export async function POST(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params
    const body = await request.json()
    const { orderId } = body

    console.log("[v0] Auth request:", { calendarId, orderId })

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Check if order exists in database (with or without password - both are valid)
    console.log("[v0] Checking if order exists...")
    const exists = await orderExists(calendarId, orderId)
    console.log("[v0] Order exists:", exists)
    
    if (!exists) {
      // Order doesn't exist - create passwordless account automatically
      console.log("[v0] Order doesn't exist, creating account...")
      const accountCreated = await createPasswordlessAccount(calendarId, orderId)
      console.log("[v0] Account created:", accountCreated)
      
      if (!accountCreated) {
        console.error("[v0] Failed to create account for:", { calendarId, orderId })
        return NextResponse.json({ error: "Failed to create account" }, { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        })
      }
    }
    
    // Order exists or was just created - authenticate the user

    // Set auth cookie (works for both password and passwordless authentication)
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ 
      error: "Authentication failed",
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
