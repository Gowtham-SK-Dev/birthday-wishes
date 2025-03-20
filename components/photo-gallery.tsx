"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample photos - you can replace these with actual photos later
const photos = [
  { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 1" },
  { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 2" },
  { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 3" },
  { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 4" },
  { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 5" },
  { id: 6, src: "/placeholder.svg?height=400&width=600", alt: "Happy memory 6" },
]

export default function PhotoGallery() {
  const [currentPhoto, setCurrentPhoto] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setCurrentPhoto(index)
  }

  const closeLightbox = () => {
    setCurrentPhoto(null)
  }

  const goToPrevious = () => {
    if (currentPhoto === null) return
    setCurrentPhoto((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (currentPhoto === null) return
    setCurrentPhoto((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 px-4 bg-white/50 dark:bg-black/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-700 dark:text-purple-300">
          Our Beautiful Memories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <Card
              key={photo.id}
              className="overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => openLightbox(index)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 font-medium">{photo.alt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {currentPhoto !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white" onClick={closeLightbox}>
            <X className="h-8 w-8" />
          </Button>

          <Button variant="ghost" size="icon" className="absolute left-4 text-white" onClick={goToPrevious}>
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <img
            src={photos[currentPhoto].src || "/placeholder.svg"}
            alt={photos[currentPhoto].alt}
            className="max-h-[80vh] max-w-[80vw] object-contain"
          />

          <Button variant="ghost" size="icon" className="absolute right-4 text-white" onClick={goToNext}>
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      )}
    </section>
  )
}
