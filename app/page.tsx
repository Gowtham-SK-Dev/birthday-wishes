"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dynamically import components that use browser APIs
const MagicIntro = dynamic(() => import("@/components/magic-intro"), { ssr: false })
const CountdownTimer = dynamic(() => import("@/components/countdown-timer"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })
const ParallaxGallery = dynamic(() => import("@/components/parallax-gallery"), { ssr: false })
const MemoryTimeline = dynamic(() => import("@/components/memory-timeline"), { ssr: false })
const BirthdayWishes = dynamic(() => import("@/components/birthday-wishes"), { ssr: false })
const InteractiveGift = dynamic(() => import("@/components/interactive-gift"), { ssr: false })
const MagicalFooter = dynamic(() => import("@/components/magical-footer"), { ssr: false })
const FloatingHearts = dynamic(() => import("@/components/floating-hearts"), { ssr: false })

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Sections for navigation
  const sections = [
    { id: "intro", label: "Intro" },
    { id: "countdown", label: "Countdown" },
    { id: "gallery", label: "Gallery" },
    { id: "timeline", label: "Memories" },
    { id: "wishes", label: "Wishes" },
    { id: "gift", label: "Gift" },
  ]

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)

    // Auto-set hasInteracted after a short delay to enable music
    const timer = setTimeout(() => {
      setHasInteracted(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Start background music when user interacts
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        // Remove event listeners after first interaction
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
      }
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [hasInteracted, isMounted])

  // Handle section navigation
  const navigateToSection = (index: number) => {
    setCurrentSection(index)
    const element = document.getElementById(sections[index].id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Skip intro animation
  const skipIntro = () => {
    setShowIntro(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      {/* Only render client components after mounting */}
      {isMounted && (
        <>
          {/* Particle background */}
          <ParticleBackground />

          {/* Floating hearts */}
          <FloatingHearts />
        </>
      )}

      {/* Sparkles overlay */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {isMounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 5,
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

      {/* Navigation dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: currentSection === index ? 1.2 : 1,
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full w-3 h-3 p-0 ${
                currentSection === index ? "bg-white shadow-lg shadow-white/30" : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => navigateToSection(index)}
              aria-label={`Navigate to ${section.label}`}
            />

            {/* Label that appears on hover */}
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-black/50 text-white text-xs py-1 px-2 rounded pointer-events-none">
              {section.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {showIntro && isMounted ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <MagicIntro onComplete={skipIntro} onSkip={skipIntro} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <section id="intro" className="min-h-screen flex items-center justify-center relative">
              <div className="max-w-4xl mx-auto text-center px-4 py-20">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Happy Birthday!
                </motion.h1>

                <motion.div
                  className="text-2xl md:text-4xl font-light mb-12"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="mb-4">To my amazing Nandhu</p>
                  <p className="text-pink-300">March 25th</p>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    onClick={() => navigateToSection(1)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-full text-xl shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] transition-all duration-300"
                  >
                    Begin Your Magical Journey
                  </Button>
                </motion.div>
              </div>
            </section>

            {isMounted && (
              <>
                <section id="countdown" className="min-h-screen flex items-center justify-center relative py-20">
                  <CountdownTimer targetDate="2025-03-25T00:00:00" />
                </section>

                <section id="gallery" className="min-h-screen relative">
                  <ParallaxGallery />
                </section>

                <section id="timeline" className="min-h-screen relative py-20">
                  <MemoryTimeline />
                </section>

                <section id="wishes" className="min-h-screen relative py-20">
                  <BirthdayWishes />
                </section>

                <section id="gift" className="min-h-screen relative py-20">
                  <InteractiveGift />
                </section>

                <MagicalFooter hasInteracted={hasInteracted} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
