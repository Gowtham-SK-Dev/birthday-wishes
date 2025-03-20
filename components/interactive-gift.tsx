"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Gift, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function InteractiveGift() {
  const [isOpened, setIsOpened] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const handleGiftClick = () => {
    if (isOpened) return

    setIsShaking(true)
    setTimeout(() => {
      setIsShaking(false)
      setIsOpened(true)

      // Trigger confetti
      if (typeof window !== "undefined") {
        const canvasConfetti = confetti.create()
        canvasConfetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.6 },
        })
      }
    }, 1000)
  }

  const resetGift = () => {
    setIsOpened(false)
  }

  return (
    <div ref={containerRef} className="relative py-20 min-h-screen flex items-center">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          A Special Gift For Nandhu
        </motion.h2>

        <motion.p
          className="text-xl text-white/80 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Click on the gift to see what's inside, Ammu...
        </motion.p>

        <motion.div
          style={{ scale }}
          className="relative mx-auto w-64 h-64 cursor-pointer perspective-1000"
          onClick={handleGiftClick}
        >
          {!isOpened ? (
            <motion.div
              animate={
                isShaking
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                      y: [0, -5, 5, -5, 5, 0],
                      rotate: [0, -5, 5, -5, 5, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              {/* Gift box */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-2xl transform-style-3d">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="w-24 h-24 text-white" />
                </div>

                {/* Ribbon */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-pink-300 z-10"></div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-8 bg-pink-300 z-10"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-8 bg-pink-300 rounded-full z-20"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotateX: 0, y: 0 }}
              animate={{ rotateX: 110, y: -20 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-t-2xl origin-bottom z-20"
            ></motion.div>
          )}

          {/* Gift content */}
          {isOpened && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white font-bold text-xl mt-4"
              >
                I Love You, Nandhu!
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <div className="mb-8 max-w-md mx-auto">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20pic-e0nXvpXcUqX1XScBbuKxob3RPBYE8K.jpeg"
                alt="Our special moment"
                className="rounded-lg shadow-lg mx-auto max-h-48 object-contain"
              />
            </div>

            <p className="text-white text-xl mb-8">
              My love for you grows stronger with each passing day, Ammu. <br />
              Happy 25th Birthday, my love!
            </p>
            <Button
              onClick={resetGift}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            >
              Close Gift
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
