"use client"

import { useEffect, useState } from "react"

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<
    Array<{
      id: number
      left: number
      animationDuration: number
      opacity: number
      size: number
    }>
  >([])

  useEffect(() => {
    // Generate 50 snowflakes with random properties
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.5,
      size: 2 + Math.random() * 4,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute text-white"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}
