"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Calendar, MapPin, Gift, Music, Star } from "lucide-react"

// Updated memories with direct URLs to ensure visibility
const memories = [
  {
    id: 1,
    date: "First Date",
    title: "When We First Met",
    description:
      "I still remember how nervous I was when I first saw you, Nandhu. Your smile instantly made me feel at ease.",
    icon: Heart,
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20date-TPhSbVmIVhikaaTc0V4OrBfo704mZn.jpeg",
  },
  {
    id: 2,
    date: "Our Anniversary",
    title: "One Year Together",
    description: "A whole year of laughter, adventures, and creating beautiful memories together with you, Ammu.",
    icon: Calendar,
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/our%20first%20pic-e0nXvpXcUqX1XScBbuKxob3RPBYE8K.jpeg",
  },
  {
    id: 3,
    date: "Summer Vacation",
    title: "Our Journey Together",
    description: "Those long journeys together and watching the scenery pass by - pure magic with my Nandhu!",
    icon: MapPin,
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/summer%20meet%20up-QRDTsJkWVfA0HiWo77ZONFlIY4IGUn.jpeg",
  },
  {
    id: 4,
    date: "Recent Meetup",
    title: "Our Special Day",
    description: "Every moment spent with you is precious, Ammu. I cherish each one of them.",
    icon: Gift,
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/last%20meetup-daK9NPvsAAlgpLpdtlqp7ctWJwOVnP.jpeg",
  },
  {
    id: 5,
    date: "Study Days",
    title: "Supporting Each Other",
    description: "Even when you're studying, you look so beautiful, Nandhu. I love watching you focus on your dreams.",
    icon: Music,
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/just%20bcz%20ammu%20is%20beautifull-V4fhBVBBg4JL7cfJ1hvZqEvAufE204.jpeg",
  },
  {
    id: 6,
    date: "Looking Forward",
    title: "Many More Memories",
    description:
      "I can't wait to create countless more beautiful memories with you in the years to come, my dear Ammu.",
    icon: Star,
  },
]

export default function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

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
          Our Journey Together
        </motion.h2>

        <div className="relative border-l-4 border-pink-400 ml-6 md:ml-12 pl-8 space-y-12">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="absolute -left-14 md:-left-20 top-0 bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-full shadow-lg">
                <memory.icon className="h-6 w-6 text-white" />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
                <span className="text-pink-300 font-medium">{memory.date}</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">{memory.title}</h3>
                <p className="text-gray-200 mb-4">{memory.description}</p>

                {memory.photoUrl && (
                  <div className="mt-4 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={memory.photoUrl || "/placeholder.svg"}
                      alt={memory.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
