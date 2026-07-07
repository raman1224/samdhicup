'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function useCountdown(targetDate: Date | string): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })
  
  // Use refs to store values that shouldn't trigger re-renders
  const targetTimeRef = useRef(new Date(targetDate).getTime())
  const rafRef = useRef<number | null>(null)

  const calculateTimeLeft = useCallback((): CountdownTime => {
    const now = Date.now()
    const target = targetTimeRef.current
    const difference = target - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isExpired: false,
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const updateTimer = () => {
      if (!isMounted) return
      
      const newTime = calculateTimeLeft()
      
      setTimeLeft(prev => {
        // Only update if something actually changed
        if (
          prev.days !== newTime.days ||
          prev.hours !== newTime.hours ||
          prev.minutes !== newTime.minutes ||
          prev.seconds !== newTime.seconds ||
          prev.isExpired !== newTime.isExpired
        ) {
          return newTime
        }
        return prev
      })

      // Stop if expired
      if (!newTime.isExpired) {
        rafRef.current = requestAnimationFrame(() => {
          // Update every second
          setTimeout(updateTimer, 1000)
        })
      }
    }

    // Start the timer
    updateTimer()

    return () => {
      isMounted = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [calculateTimeLeft])

  return timeLeft
}