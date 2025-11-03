import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

export async function verifyCalendarPassword(calendarId: string, orderId: string, password: string): Promise<boolean> {
  const supabase = await createClient()

  // Hash the password
  const passwordHash = createHash("sha256").update(password).digest("hex")

  // Query the database
  const { data, error } = await supabase
    .from("calendars")
    .select("*")
    .eq("calendar_id", calendarId)
    .eq("order_id", orderId)
    .eq("password_hash", passwordHash)
    .single()

  if (error || !data) {
    return false
  }

  return true
}

/**
 * Checks if an order exists for a calendar (with or without password)
 */
export async function orderExists(calendarId: string, orderId: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("calendars")
      .select("order_id")
      .eq("calendar_id", calendarId)
      .eq("order_id", orderId)
      .maybeSingle() // Use maybeSingle instead of single to avoid errors when no row found

    // maybeSingle returns null (not an error) when no row is found
    if (error) {
      console.error("[v0] Error checking order existence:", error)
      return false
    }

    return !!data
  } catch (error) {
    console.error("[v0] Exception checking order existence:", error)
    return false
  }
}

/**
 * Creates a passwordless account for a user (for new passwordless authentication)
 * Returns { success: boolean, error?: string } to provide detailed error messages
 */
export async function createPasswordlessAccount(
  calendarId: string,
  orderId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[v0] Supabase environment variables not configured")
      return { success: false, error: "Server configuration error" }
    }

    const supabase = createAdminClient()

    // Check if order already exists for this calendar
    const exists = await orderExists(calendarId, orderId)
    if (exists) {
      return { success: true } // Account already exists for this calendar, consider it successful
    }

    // Check if order exists in a different calendar
    const existingCalendarId = await findOrderCalendar(orderId)
    if (existingCalendarId && existingCalendarId !== calendarId) {
      return {
        success: false,
        error: `This order confirmation number is already registered for a different calendar`,
      }
    }

    // Insert new account without password
    const { error } = await supabase.from("calendars").insert({
      order_id: orderId,
      calendar_id: calendarId,
      password_hash: null, // No password for passwordless accounts
    })

    if (error) {
      // Check if it's a duplicate key error (order already exists)
      if (error.code === "23505") {
        // PostgreSQL unique constraint violation
        const conflictingCalendar = await findOrderCalendar(orderId)
        if (conflictingCalendar && conflictingCalendar !== calendarId) {
          return {
            success: false,
            error: `This order confirmation number is already registered for a different calendar`,
          }
        }
      }
      console.error("[v0] Failed to create passwordless account:", error)
      console.error("[v0] Error details:", JSON.stringify(error, null, 2))
      return { success: false, error: "Failed to create account" }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Exception creating passwordless account:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getCalendarByOrderId(orderId: string): Promise<string | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("calendars").select("calendar_id").eq("order_id", orderId).maybeSingle()

  if (error || !data) {
    return null
  }

  return data.calendar_id
}

/**
 * Checks if an order ID exists in any calendar
 * Returns the calendar_id if found, null if not found
 */
export async function findOrderCalendar(orderId: string): Promise<string | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("calendars")
      .select("calendar_id")
      .eq("order_id", orderId)
      .maybeSingle()

    if (error || !data) {
      return null
    }

    return data.calendar_id
  } catch (error) {
    console.error("[v0] Exception finding order calendar:", error)
    return null
  }
}
