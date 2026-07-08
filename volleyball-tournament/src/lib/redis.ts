

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