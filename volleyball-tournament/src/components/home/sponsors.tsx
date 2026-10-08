'use client'

import { memo, useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, Shield, Sparkles, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Sponsors = memo(function Sponsors() {
  const t = useTranslations('sponsors')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const partners = [
    {
      name: 'Chaurideurali Rural Municipality',
      role: 'Title Sponsor',
      logo: '/partners/chaurideurali.jpg',
      link: null, // no link for this one
    },
    {
      name: 'Yuwa Daily',
      role: 'Media Partner',
      logo: '/partners/media.jpg',
      link: 'https://www.yuwadaily.com', 
    },
    // { name: 'Volleyball Association', role: 'Organizing Partner', logo: '/partners/va.png', link: null },
    // { name: 'Sports Authority', role: 'Government Partner', logo: '/partners/sports.png', link: 'https://example.com' },
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-purple-500 to-indigo-500'
      case 'gold': return 'from-yellow-500 to-amber-500'
      case 'silver': return 'from-gray-300 to-gray-500'
      case 'bronze': return 'from-orange-500 to-red-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const trackRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const positionRef = useRef(0)
  const speedRef = useRef(0.6)
  const targetSpeedRef = useRef(0.6)
  const rafRef = useRef<number | null>(null)

  useEffect(() => { targetSpeedRef.current = isHovering ? 0.12 : 0.6 }, [isHovering])

  useEffect(() => {
    const step = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.06
      const track = trackRef.current
      if (track) {
        positionRef.current -= speedRef.current
        const halfWidth = track.scrollWidth / 2
        if (halfWidth > 0 && Math.abs(positionRef.current) >= halfWidth) positionRef.current += halfWidth
        track.style.transform = `translateX(${positionRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const handlePointerEnter = useCallback(() => setIsHovering(true), [])
  const handlePointerLeave = useCallback(() => setIsHovering(false), [])

  return (
    <section ref={ref} id="sponsors" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-purple-500/10 text-purple-400 border-purple-500/30">
            <Star className="w-4 h-4 mr-2" />
            {t('badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t('highlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('description')}</p>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-400" />
            {t('ourPartners')}
          </h3>

          {/* Fixed uniform grid - all cards same height */}
          <div className={`grid gap-6 ${
            partners.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            partners.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
            partners.length === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto' :
            'grid-cols-2 md:grid-cols-4'
          }`}>
            {partners.map((partner, index) => {
              const CardWrapper = partner.link ? 'a' : 'div'
              const linkProps = partner.link
                ? {
                    href: partner.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}

              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, type: 'spring', stiffness: 300 } }}
                  className="group h-full"
                >
                  {/* @ts-ignore */}
                  <CardWrapper
                    {...linkProps}
                    className="block h-full cursor-pointer"
                  >
                    <Card className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 hover:border-orange-500/40 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full flex flex-col">
                      {/* Fixed height card */}
                      <CardContent className="p-6 sm:p-8 text-center relative flex flex-col items-center justify-between flex-1 min-h-[380px] sm:min-h-[420px]">
                        {/* Shine sweep on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                        {/* Big Logo - uniform container */}
                        <div className="relative w-full flex-1 flex items-center justify-center min-h-[180px] sm:min-h-[220px]">
                          {partner.logo ? (
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                              <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 192px, 224px"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Shield className="w-24 h-24 text-orange-400" />
                            </div>
                          )}

                          {/* External link icon on hover (only if has link) */}
                          {partner.link && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="absolute top-2 right-2 p-2 rounded-full bg-orange-500/20 border border-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <ExternalLink className="w-4 h-4 text-orange-400" />
                            </motion.div>
                          )}
                        </div>

                        {/* Bottom content - fixed position */}
                        <div className="w-full space-y-3 mt-4">
                          {/* Partner Name - fixed 2-line height */}
                          <h4 className="text-white font-bold text-base sm:text-lg group-hover:text-orange-400 transition-colors flex items-center justify-center min-h-[48px] sm:min-h-[56px] leading-tight px-2">
                            {partner.name}
                          </h4>

                          {/* Role Badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                            <p className="text-orange-400 text-xs font-medium">{partner.role}</p>
                          </div>

                          {/* Visit website hint (only if has link) */}
                          {partner.link && (
                            <p className="text-gray-500 text-[10px] flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ExternalLink className="w-3 h-3" />
                              Click to visit
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Become a Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 backdrop-blur-sm relative overflow-hidden group">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">{t('becomeSponsor')}</h3>
              <p className="text-gray-400 mb-4">{t('becomeSponsorDesc')}</p>
              <a
                href="tel:9803977546"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                {t('contact')} 9803977546
              </a>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default Sponsors