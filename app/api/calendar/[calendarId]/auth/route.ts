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

    // Validate order ID format: only numbers, 8-12 characters
    if (!/^\d+$/.test(orderId)) {
      return NextResponse.json({ error: "Order confirmation number must contain only numbers" }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    if (orderId.length < 8 || orderId.length > 12) {
      return NextResponse.json({ error: "Order confirmation number must be between 8 and 12 digits" }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Check if order exists in database for this specific calendar
    console.log("[v0] Checking if order exists for this calendar...")
    const exists = await orderExists(calendarId, orderId)
    console.log("[v0] Order exists for this calendar:", exists)
    
    if (!exists) {
      // Order doesn't exist for this calendar - check if it exists in another calendar first
      console.log("[v0] Order doesn't exist for this calendar, checking other calendars...")
      const result = await createPasswordlessAccount(calendarId, orderId)
      console.log("[v0] Account creation result:", result)
      
      if (!result.success) {
        // Return specific error message if order belongs to different calendar
        return NextResponse.json(
          { error: result.error || "Failed to create account" },
          {
            status: result.error?.includes("different calendar") ? 403 : 500,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
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
