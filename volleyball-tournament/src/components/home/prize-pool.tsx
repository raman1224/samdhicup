'use client'

import { memo, useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView, useSpring, useTransform, animate } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Medal, 
  Star, 
  Award,
  Crown,
} from 'lucide-react'

const PrizePool = memo(function PrizePool() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isClient, setIsClient] = useState(false)

  const particles = useMemo(() => {
    if (!isClient) return []
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  }, [isClient])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const winnerSpring = useSpring(0, { stiffness: 50, damping: 20 })
  const runnerSpring = useSpring(0, { stiffness: 50, damping: 20 })
  const thirdSpring = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) {
      animate(0, 80000, { duration: 2, onUpdate: (v) => winnerSpring.set(v) })
      animate(0, 40000, { duration: 2, onUpdate: (v) => runnerSpring.set(v) })
      animate(0, 20000, { duration: 2, onUpdate: (v) => thirdSpring.set(v) })
    }
  }, [isInView, winnerSpring, runnerSpring, thirdSpring])

  const prizes = [
    {
      icon: Crown,
      title: 'Winner',
      amount: 'रू 80,000',
      color: 'from-yellow-400 to-amber-600',
      bgColor: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/50',
      iconColor: 'text-yellow-400',
      extras: ['Gold Trophy', 'Gold Medals (10)', 'Championship Certificate'],
      spring: winnerSpring,
    },
    {
      icon: Medal,
      title: 'Runner Up',
      amount: 'रू 40,000',
      color: 'from-gray-300 to-gray-500',
      bgColor: 'from-gray-500/20 to-slate-500/20',
      borderColor: 'border-gray-500/50',
      iconColor: 'text-gray-300',
      extras: ['Silver Trophy', 'Silver Medals (10)', 'Runner-up Certificate'],
      spring: runnerSpring,
    },
    {
      icon: Award,
      title: 'Third Place',
      amount: 'रू 20,000',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/50',
      iconColor: 'text-orange-400',
      extras: ['Bronze Trophy', 'Bronze Medals (10)', 'Third Place Certificate'],
      spring: thirdSpring,
    },
  ]

  const individualPrizes = [
    { icon: Star, title: 'Best Player', prize: 'Trophy + Certificate' },
    { icon: Trophy, title: 'Best Spiker', prize: 'Trophy + Certificate' },
    { icon: Trophy, title: 'Best Setter', prize: 'Trophy + Certificate' },
    { icon: Medal, title: 'Best Libero', prize: 'Trophy + Certificate' },
  ]

  return (
    <section ref={ref} id="prize-pool" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
            <Trophy className="w-4 h-4 mr-2" />
            Prize Pool
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Win Big with{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              रू 1,40,000
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cash prizes for top 3 teams + Individual trophies for best performers
          </p>
        </motion.div>

        {/* Main Cash Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            >
              <Card className={`bg-gradient-to-br ${prize.bgColor} ${prize.borderColor} border backdrop-blur-sm h-full`}>
                <CardContent className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="mb-6"
                  >
                    <prize.icon className={`w-20 h-20 ${prize.iconColor} mx-auto`} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{prize.title}</h3>
                  
                  <motion.div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-4`}>
                    <motion.span>
                      {useTransform(prize.spring, (value) => `रू ${Math.round(value).toLocaleString()}`)}
                    </motion.span>
                  </motion.div>
                  
                  <div className="space-y-2 mt-6">
                    {prize.extras.map((extra, i) => (
                      <motion.div
                        key={extra}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.2 + i * 0.1 }}
                        className="flex items-center justify-center gap-2 text-gray-300"
                      >
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{extra}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Individual Awards - Trophy Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Individual Awards <span className="text-gray-400 text-lg">(Trophy + Certificate)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {individualPrizes.map((prize, index) => (
              <motion.div
                key={prize.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-sm text-center group hover:border-purple-500/50 transition-colors"
              >
                <prize.icon className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-semibold text-sm">{prize.title}</h4>
                <p className="text-purple-400 text-xs mt-1">{prize.prize}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default PrizePool