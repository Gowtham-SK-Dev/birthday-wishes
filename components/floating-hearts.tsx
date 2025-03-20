"use client"

import { useEffect, useRef } from "react"

interface Heart {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export default function FloatingHearts() {
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

    // Create hearts
    const hearts: Heart[] = []
    const heartCount = 15

    const createHeart = (): Heart => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 20 + 10,
      speedY: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
    })

    for (let i = 0; i < heartCount; i++) {
      hearts.push(createHeart())
    }

    // Draw heart shape
    const drawHeart = (x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.scale(size / 30, size / 30)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-10, -10, -15, 0, 0, 10)
      ctx.bezierCurveTo(15, 0, 10, -10, 0, 0)
      ctx.fillStyle = "#ff6b95"
      ctx.fill()

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hearts.forEach((heart, index) => {
        // Update position
        heart.y -= heart.speedY
        heart.rotation += heart.rotationSpeed

        // Draw heart
        ctx.globalAlpha = heart.opacity
        drawHeart(heart.x, heart.y, heart.size, heart.rotation)

        // Reset heart if it goes off screen
        if (heart.y < -heart.size) {
          hearts[index] = createHeart()
        }
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}
