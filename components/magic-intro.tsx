"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MagicIntroProps {
  onComplete: () => void
  onSkip: () => void
}

export default function MagicIntro({ onComplete, onSkip }: MagicIntroProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Define the animation sequence
  const steps = [
    { id: 1, content: "Today(The Special Day)" },
    { id: 2, content: "Nandhu's" },
    { id: 3, content: "25th" },
    { id: 4, content: "Birthday" },
    { id: 5, content: "Celebration" },
  ]

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-advance through steps
  useEffect(() => {
    if (!isMounted) return

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 1800)
      return () => clearTimeout(timer)
    } else {
      // Final step - wait a moment then complete
      const timer = setTimeout(() => {
        onComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length, onComplete, isMounted])

  return (
    <div ref={containerRef} className="fixed inset-0 flex items-center justify-center overflow-hidden z-50">
      {/* Subtle gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700"
        animate={{
          background: [
            "linear-gradient(to bottom right, #312e81, #7e22ce, #be185d)",
            "linear-gradient(to bottom right, #4f46e5, #a855f7, #ec4899)",
            "linear-gradient(to bottom right, #312e81, #7e22ce, #be185d)",
          ],
        }}
        transition={{
          duration: 20, // Much slower transition
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Subtle floating hearts - fewer and slower */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.3, 0],
                scale: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 15, // Much slower
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <Heart
                className="text-pink-400/30"
                size={Math.random() * 20 + 10} // Smaller hearts
              />
            </motion.div>
          ))}
      </div>

      {/* Skip button - more elegant */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 z-50"
        onClick={onSkip}
      >
        Skip
      </Button>

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep < steps.length ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                {steps[currentStep]?.content}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center px-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="mb-8"
              >
                <Heart className="h-24 w-24 text-pink-500 fill-pink-500 mx-auto" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Happy Birthday Nandhu!
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Let's celebrate your special day together
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
