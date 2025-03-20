"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import confetti from "canvas-confetti"

// Sample wishes - you can add your own
const initialWishes = [
  {
    id: 1,
    message: "Happy birthday to the most amazing Nandhu! You light up my world every day.",
    sender: "Me",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    message: "Wishing you all the joy, love, and happiness on your special day and always, my dear Ammu.",
    sender: "Me",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
]

export default function BirthdayWishes() {
  const [wishes, setWishes] = useState(initialWishes)
  const [newWish, setNewWish] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

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

    // Trigger confetti
    if (typeof window !== "undefined") {
      const canvasConfetti = confetti.create()
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  return (
    <div ref={containerRef} className="relative py-20">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Birthday Wishes for Nandhu
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            <Textarea
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              placeholder="Write your birthday wish for Ammu here..."
              className="mb-4 min-h-[100px] bg-white/20 border-pink-500/30 focus:border-pink-500 text-white placeholder:text-white/50"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Wish
              </Button>
            </div>
          </form>
        </motion.div>

        <div className="space-y-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <Heart className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-200 mb-2">{wish.message}</p>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{wish.sender}</span>
                    <span>{new Date(wish.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating hearts animation when submitting a wish */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: 0,
                x: Math.random() * 200 - 100,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -500,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: Math.random() * 2 + 1 }}
              className="absolute left-1/2 bottom-0"
            >
              <Heart className="text-pink-500 fill-pink-500" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
              x: Math.random() * 10 - 5,
              y: Math.random() * 10 - 5,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
            }}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="text-yellow-300 w-4 h-4" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
