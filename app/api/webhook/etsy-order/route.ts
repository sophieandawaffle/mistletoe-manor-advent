import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const webhookSecret = process.env.WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error("[v0] WEBHOOK_SECRET not configured")
      return NextResponse.json({ error: "Webhook not configured" }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Verify bearer token
    if (authHeader !== `Bearer ${webhookSecret}`) {
      console.error("[v0] Invalid authorization token")
      return NextResponse.json({ error: "Unauthorized" }, { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Parse the webhook payload
    const payload = await request.json()
    const { orderId, calendarId, password } = payload

    if (!orderId || !calendarId || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    // Hash the password
    const passwordHash = createHash("sha256").update(password).digest("hex")

    const supabase = createAdminClient()

    // Insert new order - each order gets its own unique record
    const { error } = await supabase.from("calendars").insert({
      order_id: orderId,
      calendar_id: calendarId,
      password_hash: passwordHash,
    })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to store calendar data" }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    return NextResponse.json({ success: true }, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
