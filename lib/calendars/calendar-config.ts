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
  "christmas-conspiracy": {
    id: "christmas-conspiracy",
    name: "Christmas Conspiracy",
    slug: "christmas-conspiracy",
    description: "A festive conspiracy advent calendar",
    heroImage: "/images/achristmasconspiracy.svg",
    backgroundColor: "bg-[url('/images/xmasconspiracybckg.svg')]",
    theme: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
    },
  },
  "a-very-sudoku-christmas": {
    id: "a-very-sudoku-christmas",
    name: "A Very Sudoku Christmas",
    slug: "a-very-sudoku-christmas",
    description: "A festive sudoku advent calendar",
    heroImage: "/board.svg",
    backgroundColor: "bg-[url('/sudoku_background.svg')]",
    theme: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
    },
  },
}

export function getCalendarBySlug(slug: string): CalendarConfig | null {
  const calendar = Object.values(calendars).find((cal) => cal.slug === slug)
  return calendar || null
}

export function getAllCalendarSlugs(): string[] {
  return Object.keys(calendars)
}
