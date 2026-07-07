'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ScrollText, 
  Shield, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  Ban,
  Timer
} from 'lucide-react'

const Rules = memo(function Rules() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const ruleCategories = [
    {
      icon: Users,
      title: 'Team Composition',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      rules: [
        'Each team must have exactly 10 registered players',
        '6 players on court, 4 substitutes',
        'Teams can substitute players between sets',
        'Libero player must wear contrasting jersey',
      ],
    },
    {
      icon: Shield,
      title: 'Match Rules',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      rules: [
        'Best of 5 sets format',
        'First 4 sets: 25 points (win by 2)',
        'Fifth set: 15 points (win by 2)',
        'Rally point scoring system',
      ],
    },
    {
      icon: Timer,
      title: 'Time Regulations',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      rules: [
        'Teams must arrive 30 minutes before match',
        '2 timeouts per set (30 seconds each)',
        '3 minute warm-up before each match',
        'Technical timeout at 8 and 16 points',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Disqualification Rules',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      rules: [
        'Unsportsmanlike conduct leads to yellow card',
        'Two yellow cards = red card (disqualification)',
        'Fighting leads to immediate team disqualification',
        'False player information = team disqualification',
      ],
    },
    {
      icon: UserCheck,
      title: 'Player Eligibility',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      rules: [
        'Players must be 16-50 years old',
        'Valid ID proof required for verification',
        'One player can only represent one team',
        'Injured players can be replaced with approval',
      ],
    },
    {
      icon: Ban,
      title: 'Prohibited Actions',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      rules: [
        'No jewelry or accessories during play',
        'No outside coaching during live play',
        'No recording opponent strategies',
        'No consumption of alcohol/drugs',
      ],
    },
  ]

  return (
    <section ref={ref} id="rules" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-orange-500/10 text-orange-400 border-orange-500/30">
            <ScrollText className="w-4 h-4 mr-2" />
            Rules & Regulations
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Play by the{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Rules
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Understanding the rules ensures fair play and exciting matches
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ruleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`${category.bgColor} ${category.borderColor} border h-full`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </motion.div>
                    <span className="text-white">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <motion.li
                        key={ruleIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + ruleIndex * 0.05 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${category.color}`} />
                        <span className="text-sm">{rule}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Important Notice</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                All teams must adhere to these rules. The tournament committee reserves the right 
                to modify rules in the interest of fair play. Any disputes will be resolved by 
                the committee, and their decision is final.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})

export default Rules