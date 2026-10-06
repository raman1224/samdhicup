'use client'

import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Trophy, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Schedule = memo(function Schedule() {
  const t = useTranslations('schedule')
  const [matches, setMatches] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/matches')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setMatches(d.matches || [])
          setResults(d.results || [])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Group by date
  const groupedByDate = matches.reduce((acc: any, match: any) => {
    const dateKey = new Date(match.date).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    })
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(match)
    return acc
  }, {})

  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            <Calendar className="w-4 h-4 mr-2" />
            Match Schedule
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tournament Timeline
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : matches.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700 max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">
                Schedule Coming Soon
              </h3>
              <p className="text-gray-400">
                Detailed match schedule will be published after registration closes
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {Object.entries(groupedByDate).map(([date, dayMatches]: [string, any]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full">
                    <span className="text-orange-400 font-bold text-sm">{date}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
                </div>

                <div className="space-y-2">
                  {dayMatches.map((match: any) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700 hover:border-orange-500/30 transition-colors">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="flex-shrink-0 text-center min-w-[50px]">
                              <div className="text-[10px] text-gray-500">MATCH</div>
                              <div className="text-lg font-bold text-orange-400">#{match.matchNumber}</div>
                            </div>
                            
                            <div className="flex-1 flex items-center gap-2 min-w-0">
                              <div className={`flex-1 text-right ${match.winner === 'team_a' ? 'text-green-400 font-bold' : 'text-white'}`}>
                                <span className="text-sm truncate block">{match.teamAName}</span>
                              </div>
                              <div className="text-xs text-gray-500 px-1">vs</div>
                              <div className={`flex-1 ${match.winner === 'team_b' ? 'text-green-400 font-bold' : 'text-white'}`}>
                                <span className="text-sm truncate block">{match.teamBName}</span>
                              </div>
                            </div>

                            {(match.teamAScore !== null && match.teamBScore !== null) && (
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-xl font-bold text-white">{match.teamAScore}</span>
                                <span className="text-gray-500">-</span>
                                <span className="text-xl font-bold text-white">{match.teamBScore}</span>
                              </div>
                            )}

                            <div className="hidden sm:flex flex-col items-end text-xs text-gray-400 flex-shrink-0">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {match.time}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {match.venue?.split(',')[0]}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Winner Section */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-center text-white mb-8">
              🏆 Tournament Champions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.map((result: any, i: number) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={i === 0 ? 'md:order-2 md:scale-110' : i === 1 ? 'md:order-1' : 'md:order-3'}
                >
                  <Card className={`text-center p-6 ${
                    result.medalType === 'gold' ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/10 border-yellow-500/40' :
                    result.medalType === 'silver' ? 'bg-gradient-to-b from-gray-400/20 to-gray-500/10 border-gray-400/40' :
                    'bg-gradient-to-b from-orange-600/20 to-red-500/10 border-orange-600/40'
                  } border`}>
                    <div className="text-5xl mb-3">
                      {result.medalType === 'gold' ? '🥇' : result.medalType === 'silver' ? '🥈' : '🥉'}
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${
                      result.medalType === 'gold' ? 'text-yellow-400' :
                      result.medalType === 'silver' ? 'text-gray-300' : 'text-orange-400'
                    }`}>
                      {result.positionLabel}
                    </div>
                    <div className="text-xl font-bold text-white mb-1">{result.teamName}</div>
                    {result.prizeAmount && (
                      <div className="text-green-400 font-semibold">रू {result.prizeAmount.toLocaleString()}</div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
})

export default Schedule