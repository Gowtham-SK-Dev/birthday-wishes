"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Updated photos with direct URLs to ensure visibility
const photos = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20date-TPhSbVmIVhikaaTc0V4OrBfo704mZn.jpeg",
    alt: "Our first date",
    caption: "Our first date",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20pic-e0nXvpXcUqX1XScBbuKxob3RPBYE8K.jpeg",
    alt: "Our first picture together",
    caption: "Our creative first picture",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/summer%20meet%20up-QRDTsJkWVfA0HiWo77ZONFlIY4IGUn.jpeg",
    alt: "Summer meet up",
    caption: "That summer journey together",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/last%20meetup-daK9NPvsAAlgpLpdtlqp7ctWJwOVnP.jpeg",
    alt: "Our last meetup",
    caption: "Our recent adventure",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/just%20bcz%20ammu%20is%20beautifull-V4fhBVBBg4JL7cfJ1hvZqEvAufE204.jpeg",
    alt: "Ammu studying",
    caption: "Just because Ammu is beautiful",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20pic-e0nXvpXcUqX1XScBbuKxob3RPBYE8K.jpeg",
    alt: "Our special moment",
    caption: "A special moment to remember",
  },
]

export default function ParallaxGallery() {
  const [currentPhoto, setCurrentPhoto] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if mobile on mount and window resize
  useEffect(() => {
    if (!isMounted) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isMounted])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Reduced parallax effect values for smoother scrolling
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120])

  const openLightbox = (index: number) => {
    setCurrentPhoto(index)
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"
    }
  }

  const closeLightbox = () => {
    setCurrentPhoto(null)
    if (typeof document !== "undefined") {
      document.body.style.overflow = ""
    }
  }

  const goToPrevious = () => {
    if (currentPhoto === null) return
    setCurrentPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (currentPhoto === null) return
    setCurrentPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentPhoto === null) return

      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPhoto, isMounted])

  return (
    <div ref={containerRef} className="relative py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Our Beautiful Memories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.slice(0, 2).map((photo, index) => (
            <motion.div
              key={photo.id}
              style={{ y: isMounted && isMobile ? 0 : y1 }} // Disable parallax on mobile
              whileHover={{ scale: 1.03 }} // Subtler hover effect
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" // Subtler scale
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-sm md:text-base font-medium">{photo.caption}</h3>
              </div>
            </motion.div>
          ))}

          {photos.slice(2, 4).map((photo, index) => (
            <motion.div
              key={photo.id}
              style={{ y: isMounted && isMobile ? 0 : y2 }} // Disable parallax on mobile
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(index + 2)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-sm md:text-base font-medium">{photo.caption}</h3>
              </div>
            </motion.div>
          ))}

          {photos.slice(4, 6).map((photo, index) => (
            <motion.div
              key={photo.id}
              style={{ y: isMounted && isMobile ? 0 : y3 }} // Disable parallax on mobile
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(index + 4)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-sm md:text-base font-medium">{photo.caption}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox - optimized for mobile */}
      {currentPhoto !== null && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <motion.div
            key={currentPhoto}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-sm md:max-w-2xl max-h-[80vh] flex flex-col items-center px-4"
          >
            <img
              src={photos[currentPhoto].src || "/placeholder.svg"}
              alt={photos[currentPhoto].alt}
              className="max-h-[65vh] max-w-full object-contain rounded-lg"
            />
            <div className="mt-3 text-center">
              <h3 className="text-white text-base md:text-lg font-medium">{photos[currentPhoto].caption}</h3>
            </div>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
