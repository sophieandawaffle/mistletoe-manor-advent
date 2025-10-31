import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

/**
 * GET - Load user progress for a calendar
 */
export async function GET(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("user_progress")
      .select("opened_days, unlock_all")
      .eq("order_id", orderId)
      .eq("calendar_id", calendarId)
      .single()

    if (error) {
      // If no progress found, return defaults (not an error)
      if (error.code === "PGRST116") {
        return NextResponse.json({ openedDays: [], unlockAll: false }, { status: 200 })
      }
      console.error("[v0] Error loading progress:", error)
      return NextResponse.json({ error: "Failed to load progress" }, { status: 500 })
    }

    return NextResponse.json({ 
      openedDays: data?.opened_days || [], 
      unlockAll: data?.unlock_all || false 
    }, { status: 200 })
  } catch (error) {
    console.error("[v0] Progress GET error:", error)
    return NextResponse.json({ error: "Failed to load progress" }, { status: 500 })
  }
}

/**
 * POST - Save user progress for a calendar
 */
export async function POST(request: Request, { params }: { params: Promise<{ calendarId: string }> }) {
  try {
    const { calendarId } = await params
    const body = await request.json()
    const { orderId, openedDays, unlockAll } = body

    if (!orderId || !Array.isArray(openedDays)) {
      return NextResponse.json({ error: "Order ID and openedDays array are required" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Upsert progress (insert or update if exists)
    const { error } = await supabase
      .from("user_progress")
      .upsert(
        {
          order_id: orderId,
          calendar_id: calendarId,
          opened_days: openedDays,
          unlock_all: unlockAll || false,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "order_id,calendar_id",
        }
      )

    if (error) {
      console.error("[v0] Error saving progress:", error)
      return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Progress POST error:", error)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}

