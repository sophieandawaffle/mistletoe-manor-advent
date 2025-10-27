import { AdventCalendar } from "@/components/advent-calendar"
import { Snowfall } from "@/components/snowfall"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/murder-at-mistletoe-manor")

  return (
    <main className="relative min-h-screen overflow-hidden bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat">
      {/* Snowfall background effect */}
      <Snowfall />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center pt-4">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl">
              <Image
                src="/images/new-hero.svg"
                alt="Mistletoe Manor"
                width={600}
                height={300}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </div>
        </header>

        {/* Calendar */}
        <div className="container mx-auto px-0 md:px-4 pb-8">
          <AdventCalendar />
        </div>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 px-4 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">Created by</p>
            <Image
              src="/images/cosy-clue-co-logo.svg"
              alt="CosyClueCo Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </footer>
      </div>
    </main>
  )
}
