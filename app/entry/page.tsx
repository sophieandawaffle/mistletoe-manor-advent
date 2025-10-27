import { Snowfall } from "@/components/snowfall"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function EntryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat">
      {/* Snowfall background effect */}
      <Snowfall />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Image */}
        <div className="w-full max-w-2xl mb-8 overflow-hidden">
          <Image
            src="/images/Hero-3.svg"
            alt="Mistletoe Manor"
            width={600}
            height={300}
            className="w-full h-auto"
            priority
            unoptimized
          />
        </div>

        {/* Entry Modal/Card */}
        <div className="w-full max-w-md bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-8">
          

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" className="w-full" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" className="w-full" required />
            </div>

            <Button type="submit" className="w-full mt-6">
              Enter
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
