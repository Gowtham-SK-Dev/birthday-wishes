"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Sample wishes - you can add your own
const initialWishes = [
  {
    id: 1,
    message: "Happy birthday to the most amazing person in my life! You light up my world every day.",
    sender: "Me",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    message: "Wishing you all the joy, love, and happiness on your special day and always.",
    sender: "Me",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
]

export default function WishesSection() {
  const [wishes, setWishes] = useState(initialWishes)
  const [newWish, setNewWish] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWish.trim()) return

    const wish = {
      id: Date.now(),
      message: newWish,
      sender: "Me",
      timestamp: new Date().toISOString(),
    }

    setWishes([wish, ...wishes])
    setNewWish("")

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1500)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-600 dark:text-pink-400">Birthday Wishes</h2>

        <Card className="mb-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <Textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Write your birthday wish here..."
                className="mb-4 min-h-[100px] border-pink-200 dark:border-pink-800 focus:border-pink-500"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Wish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {wishes.map((wish) => (
            <Card
              key={wish.id}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 mb-2">{wish.message}</p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{wish.sender}</span>
                      <span>{new Date(wish.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating hearts animation when submitting a wish */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-500 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: `scale(${Math.random() * 1.5 + 0.5})`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              transform: `scale(${Math.random() * 1 + 0.5})`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
