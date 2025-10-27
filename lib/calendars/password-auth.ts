import { createClient } from "@/lib/supabase/server"
import { createHash } from "crypto"

export async function verifyCalendarPassword(calendarId: string, orderId: string, password: string): Promise<boolean> {
  const supabase = await createClient()

  // Hash the password
  const passwordHash = createHash("sha256").update(password).digest("hex")

  // Query the database
  const { data, error } = await supabase
    .from("calendars")
    .select("*")
    .eq("id", calendarId)
    .eq("order_id", orderId)
    .eq("password_hash", passwordHash)
    .single()

  if (error || !data) {
    return false
  }

  return true
}

export async function getCalendarByOrderId(orderId: string): Promise<string | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("calendars").select("id").eq("order_id", orderId).single()

  if (error || !data) {
    return null
  }

  return data.id
}
