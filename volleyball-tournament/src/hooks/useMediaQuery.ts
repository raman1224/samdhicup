'use client'

import { useState, useEffect, useCallback } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }, [])

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Older browsers (Safari < 14)
    else {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query, handleChange])

  return matches
}

// Predefined breakpoints
export function useDeviceType() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const isLargeScreen = useMediaQuery('(min-width: 1440px)')

  return { 
    isMobile, 
    isTablet, 
    isDesktop, 
    isLargeScreen,
    isTouchDevice: isMobile || isTablet 
  }
}

// Orientation
export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')

  return { isPortrait, isLandscape }
}

// Color scheme preference
export function useColorScheme() {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const isLightMode = useMediaQuery('(prefers-color-scheme: light)')

  return { isDarkMode, isLightMode }
}

// Reduced motion preference
export function useReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return prefersReducedMotion
}