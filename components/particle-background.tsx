"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  hue: number
  hueSpeed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles - fewer for better performance
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 30))
    const particles: Particle[] = []

    const colors = [
      "rgba(236, 72, 153, 0.5)", // pink-500
      "rgba(192, 132, 252, 0.5)", // purple-400
      "rgba(129, 140, 248, 0.5)", // indigo-400
      "rgba(255, 255, 255, 0.5)", // white
      "rgba(253, 224, 71, 0.5)", // yellow-300
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1, // Smaller particles
        speedX: (Math.random() * 0.2 - 0.1) * 0.5, // Much slower
        speedY: (Math.random() * 0.2 - 0.1) * 0.5, // Much slower
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.2, // Lower opacity
        hue: Math.random() * 360,
        hueSpeed: (Math.random() * 0.2 - 0.1) * 0.5, // Slower color change
      })
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 80 // Smaller influence radius

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position - slower movement
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update color - slower transition
        particle.hue += particle.hueSpeed
        if (particle.hue > 360) particle.hue = 0
        if (particle.hue < 0) particle.hue = 360

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction - gentler effect
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRadius - distance) / mouseRadius

          particle.speedX -= Math.cos(angle) * force * 0.01 // Gentler push
          particle.speedY -= Math.sin(angle) * force * 0.01 // Gentler push
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
