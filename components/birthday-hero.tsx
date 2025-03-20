"use client"

import { useEffect, useState } from "react"
import { Heart, Stars } from "lucide-react"
import Confetti from "@/components/confetti"
import { Button } from "@/components/ui/button"

export default function BirthdayHero() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [name, setName] = useState("Sweetheart")
  const birthdayDate = "April 25th" // You can change this to the actual date

  useEffect(() => {
    // Start confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {showConfetti && <Confetti />}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <Stars
              key={i}
              className="absolute text-yellow-300 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: `scale(${Math.random() * 1.5 + 0.5})`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="z-10 text-center max-w-3xl mx-auto backdrop-blur-sm bg-white/30 dark:bg-black/30 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-pink-600 dark:text-pink-400 mb-6">Happy Birthday!</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-purple-700 dark:text-purple-300 mb-8">
          My Dearest {name}
        </h2>
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-8">
          On this special day, {birthdayDate}, I want to celebrate the amazing person you are and all the joy you bring
          to my life.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition hover:scale-105"
           onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
              });
            }
          }}
        >
          Explore Your Surprise
        </Button>
      </div>
    </section>
  )
}
