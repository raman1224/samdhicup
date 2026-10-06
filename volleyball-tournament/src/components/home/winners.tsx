'use client'

import { memo, useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Crown, Sparkles, Medal, Award } from 'lucide-react'

interface TournamentResult {
  id: string
  position: number
  positionLabel: string
  teamName: string
  medalType: string
  prizeAmount: number | null
  notes: string | null
}

const MEDAL_STYLES: Record<string, {
  emoji: string
  icon: any
  color: string
  bg: string
  border: string
  ribbon: string
}> = {
  gold: {
    emoji: '🥇',
    icon: Crown,
    color: 'text-yellow-400',
    bg: 'from-yellow-500/15 via-amber-500/5 to-orange-500/15',
    border: 'border-yellow-500/40',
    ribbon: 'from-yellow-400 via-amber-500 to-yellow-400',
  },
  silver: {
    emoji: '🥈',
    icon: Medal,
    color: 'text-gray-300',
    bg: 'from-gray-400/15 via-slate-500/5 to-gray-500/15',
    border: 'border-gray-400/40',
    ribbon: 'from-gray-300 via-gray-400 to-gray-300',
  },
  bronze: {
    emoji: '🥉',
    icon: Award,
    color: 'text-orange-400',
    bg: 'from-orange-600/15 via-red-500/5 to-orange-500/15',
    border: 'border-orange-500/40',
    ribbon: 'from-orange-400 via-red-500 to-orange-400',
  },
}

const Winners = memo(function Winners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [results, setResults] = useState<TournamentResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/matches')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.results?.length > 0) setResults(d.results)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Auto-hide section if no results
  if (loading || results.length === 0) return null

  const sorted = [...results].sort((a, b) => a.position - b.position)
  const champion = sorted[0]
  const runnerUp = sorted[1]
  const thirdPlace = sorted[2]

  // Podium order: 2nd | 1st | 3rd
  const podiumOrder = [runnerUp, champion, thirdPlace].filter(Boolean)

  return (
    <section
      ref={ref}
      id="winners"
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900"
      style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      {/* Spotlight glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(251,191,36,0.16) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Badge className="mb-3 px-5 py-1.5 bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
            <Trophy className="w-3.5 h-3.5 mr-1.5" />
            Tournament Champions
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Meet the{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Winners
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Celebrating the best teams who conquered the court
          </p>
        </motion.div>

        {/* Podium */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-end">
            {podiumOrder.map((result, index) => {
              const style = MEDAL_STYLES[result.medalType] || MEDAL_STYLES.bronze
              const isChampion = result.medalType === 'gold'
              const MedalIcon = style.icon

              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.12,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className={isChampion ? 'md:-mt-6 md:scale-[1.04]' : ''}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    {/* Crown float above champion */}
                    {isChampion && (
                      <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: [0, -6, 0] }
                            : {}
                        }
                        transition={{
                          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                          opacity: { delay: 0.6 },
                        }}
                      >
                        <Crown
                          className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                          fill="currentColor"
                        />
                      </motion.div>
                    )}

                    <Card
                      className={`relative overflow-hidden bg-gradient-to-br ${style.bg} ${style.border} border-2 backdrop-blur-sm shadow-xl`}
                    >
                      {/* Shine sweep */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={isInView ? { x: '200%' } : {}}
                        transition={{
                          duration: 1.8,
                          delay: 0.8 + index * 0.25,
                          repeat: Infinity,
                          repeatDelay: 4,
                          ease: 'easeInOut',
                        }}
                      />

                      <CardContent className="p-5 text-center relative">
                        {/* Medal emoji */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : {}}
                          transition={{
                            delay: 0.3 + index * 0.12,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="text-5xl md:text-6xl mb-3 leading-none"
                        >
                          {style.emoji}
                        </motion.div>

                        {/* Rank badge */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 border ${style.border} mb-2.5`}
                        >
                          <MedalIcon className={`w-3 h-3 ${style.color}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${style.color}`}>
                            {result.positionLabel}
                          </span>
                        </div>

                        {/* Team name */}
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 mb-2.5">
                          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">
                            Team
                          </div>
                          <div className="text-white font-bold text-sm md:text-base break-words leading-tight">
                            {result.teamName}
                          </div>
                        </div>

                        {/* Prize */}
                        {result.prizeAmount && (
                          <div className="inline-block px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                            <span className="text-green-400 font-bold text-xs md:text-sm">
                              रू {result.prizeAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Notes */}
                        {result.notes && (
                          <p className="text-[11px] text-gray-400 italic mt-2.5 leading-relaxed">
                            "{result.notes}"
                          </p>
                        )}

                        {/* Sparkles for champion */}
                        {isChampion &&
                          [...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                              style={{
                                left: `${18 + i * 16}%`,
                                top: `${12 + (i % 3) * 22}%`,
                              }}
                              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.35,
                              }}
                            />
                          ))}
                      </CardContent>

                      {/* Medal ribbon */}
                      <div
                        className={`h-1.5 w-full bg-gradient-to-r ${style.ribbon}`}
                      />
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom caption */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-gray-300 text-xs md:text-sm">
                Congratulations to all champions and participants!
              </span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default Winners