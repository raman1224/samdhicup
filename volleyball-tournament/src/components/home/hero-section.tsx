
'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useDeviceType } from '@/hooks/useMediaQuery'
import { useCountdown } from '@/hooks/useCountdown'
import { Sparkles, Trophy, Users, Calendar, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const { isMobile } = useDeviceType()
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const tournamentDate = new Date('2026-06-15T00:00:00')
  const { days, hours, minutes, seconds } = useCountdown(tournamentDate)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    setIsLoaded(true)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const spotlightX = useTransform(mouseX, (x) => `${x}px`)
  const spotlightY = useTransform(mouseY, (y) => `${y}px`)

  const stats = [
    { icon: Trophy, label: 'Prize Pool', value: 'रू 9,00,000+', color: 'text-yellow-400' },
    { icon: Users, label: 'Expected Teams', value: '32+', color: 'text-blue-400' },
    { icon: Calendar, label: 'Registration Closes In', value: `${days}d ${hours}h ${minutes}m`, color: 'text-green-400' },
  ]

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity, scale, y: heroY }}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Image
    src="/hero-poster.png"
    alt="Volleyball Tournament"
    fill
    className="object-cover "
    priority
    sizes="100vw"
  />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Mouse Spotlight */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(249,115,22,0.15), transparent 40%)`,
        }}
      />

      {/* Floating Volleyball */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className={`${isMobile ? 'w-40 h-40' : 'w-80 h-80'} opacity-10`}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M5 50 Q 50 5 95 50 Q 50 95 5 50" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M5 20 Q 50 80 95 20" stroke="white" strokeWidth="0.3" fill="none" />
            <path d="M5 80 Q 50 20 95 80" stroke="white" strokeWidth="0.3" fill="none" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 text-center">
        {/* Tournament Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-6 py-2 text-base border-orange-500/50 bg-orange-500/10 text-orange-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Season 2026
            <Sparkles className="w-4 h-4 ml-2" />
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
            VOLLEYBALL
          </span>
          <br />
          <motion.span
            className="text-white"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            TOURNAMENT
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join the ultimate volleyball battle.{' '}
          <span className="text-orange-400 font-semibold">32 Teams.</span>{' '}
          <span className="text-red-400 font-semibold">One Champion.</span>{' '}
          <span className="text-purple-400 font-semibold">Glory Awaits!</span>
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, y: 20 }}
              animate={isLoaded ? { scale: 1, y: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.8 + index * 0.1,
              }}
              className="text-center px-4 py-4 md:px-6 md:py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
            >
              <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-8 md:px-12 py-6 md:py-7 text-base md:text-lg rounded-full shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Register Your Team Now
            </Button>
          </Link>
          <Link href="#tournament-details">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-sm text-white font-bold px-8 md:px-12 py-6 md:py-7 text-base md:text-lg rounded-full"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}