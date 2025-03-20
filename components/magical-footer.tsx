"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Heart, Music, MicOffIcon as MusicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MagicalFooterProps {
  hasInteracted: boolean
}

export default function MagicalFooter({ hasInteracted }: MagicalFooterProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentYear = new Date().getFullYear()
  const [isMounted, setIsMounted] = useState(false)

  // Female voice birthday humming with bell music
  // Replace this URL with your actual audio file
  const birthdaySongUrl = "https://example.com/female-birthday-humming-with-bells.mp3"

  useEffect(() => {
    setIsMounted(true)

    // Create audio element
    if (typeof window !== "undefined") {
      const audioElement = new Audio(birthdaySongUrl)
      audioElement.loop = true
      audioElement.volume = volume
      audioRef.current = audioElement

      return () => {
        audioElement.pause()
        audioElement.src = ""
      }
    }
  }, [])

  // Auto-play music when user has interacted with the page
  useEffect(() => {
    if (!isMounted || !audioRef.current) return

    if (hasInteracted) {
      playAudio()
    }
  }, [hasInteracted, isMounted])

  // Update volume when it changes
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const playAudio = () => {
    if (!audioRef.current) return

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.log("Audio playback failed:", e))
  }

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      playAudio()
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    setIsMuted(!isMuted)
    audioRef.current.volume = isMuted ? volume : 0
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }
  }

  return (
    <footer className="py-10 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-pink-400 hover:bg-pink-500/20 transition-colors duration-300"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <MusicOff className="h-5 w-5 text-pink-300" /> : <Music className="h-5 w-5 text-pink-300" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-pink-400 hover:bg-pink-500/20 transition-colors duration-300"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-pink-300" /> : <Volume2 className="h-5 w-5 text-pink-300" />}
            </Button>
          </div>

          {/* Volume slider */}
          <div className="w-48 flex items-center gap-2">
            <span className="text-xs text-white/60">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-pink-200/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400"
            />
          </div>
        </div>

        <p className="text-white/80 mb-2">
          Made with
          <Heart className="inline-block h-4 w-4 text-pink-500 mx-1 animate-pulse" />
          for Nandhu's special day
        </p>

        <p className="text-sm text-white/60">&copy; {currentYear} - Nandhu's 25th Birthday Celebration</p>
      </div>
    </footer>
  )
}
