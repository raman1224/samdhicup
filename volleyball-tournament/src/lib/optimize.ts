import { cache } from 'react'

// React cache wrapper for expensive computations
export const getCachedTournamentData = cache(async (year: number) => {
  const mod = await import('./prisma')
  const prisma = (mod as any).prisma ?? (mod as any).default
  return prisma.tournament.findUnique({
    where: { year },
    include: {
      _count: {
        select: {
          teams: true,
        },
      },
    },
  })
})

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Memoize expensive calculations
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Lazy load images with Intersection Observer
export function createImageLoader() {
  if (typeof window === 'undefined') return

  const images = document.querySelectorAll('[data-src]')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        img.classList.remove('opacity-0')
        observer.unobserve(img)
      }
    })
  })

  images.forEach(img => observer.observe(img))
}