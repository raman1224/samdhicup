// import { Redis } from '@upstash/redis'

// // Use Upstash Redis for edge caching
// export const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL || '',
//   token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
// })

// // Cache wrapper with error handling
// export async function cacheData<T>(
//   key: string,
//   fetchFn: () => Promise<T>,
//   ttl: number = 3600
// ): Promise<T> {
//   try {
//     // Try to get from cache
//     const cached = await redis.get<T>(key)
//     if (cached) {
//       return cached
//     }

//     // Fetch fresh data
//     const data = await fetchFn()
    
//     // Store in cache
//     await redis.set(key, JSON.stringify(data), { ex: ttl })
    
//     return data
//   } catch (error) {
//     // If Redis fails, fallback to direct fetch
//     console.warn('Redis cache failed, falling back to direct fetch:', error)
//     return fetchFn()
//   }
// }

// // Invalidate cache
// export async function invalidateCache(pattern: string): Promise<void> {
//   try {
//     const keys = await redis.keys(pattern)
//     if (keys.length > 0) {
//       await redis.del(...keys)
//     }
//   } catch (error) {
//     console.warn('Failed to invalidate cache:', error)
//   }
// }




// Simple cache that works without Redis
const memoryCache = new Map<string, { data: any; expiry: number }>()

export async function cacheData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const now = Date.now()
  const cached = memoryCache.get(key)

  if (cached && cached.expiry > now) {
    return cached.data as T
  }

  const data = await fetchFn()
  memoryCache.set(key, { data, expiry: now + ttl * 1000 })
  return data
}

export async function invalidateCache(pattern: string): Promise<void> {
  // Delete all keys that match the pattern
  for (const key of memoryCache.keys()) {
    if (key.includes(pattern.replace('*', ''))) {
      memoryCache.delete(key)
    }
  }
}

// Clean expired cache every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of memoryCache.entries()) {
    if (value.expiry < now) {
      memoryCache.delete(key)
    }
  }
}, 5 * 60 * 1000)