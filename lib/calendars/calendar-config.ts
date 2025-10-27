// Calendar configuration - add new calendars here
export interface CalendarConfig {
  id: string
  name: string
  slug: string
  description: string
  heroImage: string
  backgroundColor: string
  theme: {
    primary: string
    secondary: string
    accent: string
  }
}

export const calendars: Record<string, CalendarConfig> = {
  "murder-mistletoe-manor": {
    id: "murder-mistletoe-manor",
    name: "Murder at Mistletoe Manor",
    slug: "murder-at-mistletoe-manor",
    description: "A Victorian Christmas mystery advent calendar",
    heroImage: "/images/new-hero.svg",
    backgroundColor: "bg-[url('/images/background.svg')]",
    theme: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
    },
  },
  // Add future calendars here:
  // "another-calendar": { ... }
}

export function getCalendarBySlug(slug: string): CalendarConfig | null {
  const calendar = Object.values(calendars).find((cal) => cal.slug === slug)
  return calendar || null
}

export function getAllCalendarSlugs(): string[] {
  return Object.keys(calendars)
}
