"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Clock, Gift, Cake } from "lucide-react"

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isInitialized, setIsInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      } else {
        // Birthday has arrived!
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }
    }

    // Initial calculation
    const initialTimeLeft = calculateTimeLeft()
    setTimeLeft(initialTimeLeft)
    setPrevTimeLeft(initialTimeLeft)
    setIsInitialized(true)

    // Update every second without creating a dependency loop
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setPrevTimeLeft((prev) => ({ ...prev })) // Create a new object reference
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate]) // Only depend on targetDate, not timeLeft

  const timeUnits = [
    { label: "Days", value: timeLeft.days, icon: <Clock className="h-5 w-5" /> },
    { label: "Hours", value: timeLeft.hours, icon: <Clock className="h-5 w-5" /> },
    { label: "Minutes", value: timeLeft.minutes, icon: <Clock className="h-5 w-5" /> },
    { label: "Seconds", value: timeLeft.seconds, icon: <Clock className="h-5 w-5" /> },
  ]

  const isBirthdayArrived =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  // Generate floating elements for background - fewer and slower
  const floatingElements = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.random() * 15 + 8 // Smaller size
    const initialX = Math.random() * 100
    const initialY = Math.random() * 100
    const duration = Math.random() * 30 + 20 // Much slower
    const delay = Math.random() * 5

    return (
      <motion.div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${initialX}%`,
          top: `${initialY}%`,
          width: size,
          height: size,
        }}
        animate={{
          x: [
            Math.random() * 50 - 25, // Reduced movement range
            Math.random() * 50 - 25,
            Math.random() * 50 - 25,
          ],
          y: [Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 0.9, 1], // Subtler scale changes
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay,
          ease: "easeInOut",
        }}
      >
        {i % 3 === 0 ? (
          <Sparkles className="w-full h-full text-yellow-300/20" />
        ) : i % 3 === 1 ? (
          <Gift className="w-full h-full text-pink-400/20" />
        ) : (
          <Cake className="w-full h-full text-purple-400/20" />
        )}
      </motion.div>
    )
  })

  // Function to render a digit with flip animation
  const renderDigit = (value: number, prevValue: number, index: number) => {
    const hasChanged = isInitialized && value !== prevValue
    const valueStr = value.toString().padStart(2, "0")

    return (
      <div className="relative h-16 md:h-20 overflow-hidden">
        {/* Current value */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${index}-${value}`}
            initial={hasChanged ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-3xl md:text-4xl font-bold tabular-nums">{valueStr}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-4 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">{floatingElements}</div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-4">
          {isBirthdayArrived ? "Happy Birthday Nandhu!" : "Countdown to Nandhu's 25th Birthday"}
        </h2>
        <p className="text-lg md:text-xl text-white/80">
          {isBirthdayArrived ? "Today is your special day! Enjoy every moment!" : "March 25, 2025"}
        </p>
      </motion.div>

      <div className="relative z-10">
        {isBirthdayArrived ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4, // Slower animation
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Cake className="h-28 w-28 text-pink-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mt-8 mb-6"
            >
              🎉 Today! 🎉
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-white/90"
            >
              Happy 25th Birthday, Ammu!
            </motion.p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03 }} // Subtler hover effect
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 overflow-hidden">
                  {/* Animated gradient background - slower */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 z-0"
                    animate={{
                      background: [
                        "linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(129, 140, 248, 0.1))",
                        "linear-gradient(to bottom right, rgba(129, 140, 248, 0.1), rgba(236, 72, 153, 0.1))",
                        "linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(129, 140, 248, 0.1))",
                      ],
                    }}
                    transition={{
                      duration: 10, // Much slower
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Pulsing effect for seconds - subtler */}
                  {unit.label === "Seconds" && (
                    <motion.div
                      className="absolute inset-0 bg-pink-500/5 z-0"
                      animate={{ opacity: [0.05, 0.15, 0.05] }} // Reduced opacity range
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex justify-center mb-1">{unit.icon}</div>

                    {renderDigit(unit.value, prevTimeLeft[unit.label.toLowerCase() as keyof TimeLeft], index)}

                    <div className="text-sm md:text-base text-white/70 font-medium mt-1">{unit.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isBirthdayArrived && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center mt-8 text-base md:text-lg text-white/80"
          >
            <p className="mb-4">Counting down every second until your special day, Ammu!</p>

            {/* Animated heart beat line - slower and subtler */}
            <div className="w-full max-w-md mx-auto h-8 relative">
              <svg className="w-full h-full" viewBox="0 0 400 50">
                <motion.path
                  d="M0,25 L50,25 L70,15 L90,35 L110,15 L130,35 L150,15 L170,35 L190,25 L400,25"
                  fill="none"
                  stroke="rgba(236, 72, 153, 0.3)" // Reduced opacity
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 2 }} // Slower
                />
              </svg>

              <motion.div
                className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-pink-500"
                animate={{
                  x: ["0%", "100%"],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3, // Slower
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
