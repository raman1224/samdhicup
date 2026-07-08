

// Simple in-memory rate limiter (no database needed)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function rateLimit(
  key: string,
  limit: number,
  duration: number // in seconds
): Promise<{ success: boolean; remaining: number }> {
  const now = Date.now()
  const resetTime = now + duration * 1000

  const existing = rateLimitMap.get(key)

  if (!existing || now > existing.resetTime) {
    // First request or window expired
    rateLimitMap.set(key, { count: 1, resetTime })
    return { success: true, remaining: limit - 1 }
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 }
  }

  existing.count++
  return { success: true, remaining: limit - existing.count }
}

// More lenient limits for registration
export async function checkRegistrationRateLimit(ip: string): Promise<boolean> {
  // Allow 10 registrations per hour per IP
  const result = await rateLimit(`register:${ip}`, 10, 3600)
  return result.success
}

// Upload rate limit - very lenient
export async function checkUploadRateLimit(ip: string): Promise<boolean> {
  // Allow 50 uploads per 10 minutes
  const result = await rateLimit(`upload:${ip}`, 50, 600)
  return result.success
}