'use client'

import { memo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, useInView, type Variants } from 'framer-motion'

import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign,
  Star,
  Target,
  Award
} from 'lucide-react'

const TournamentDetails = memo(function TournamentDetails() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

 const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

  const details = [
    {
      icon: Calendar,
      title: 'Tournament Date',
      value: 'Ashoj 29 - Kartik 02, 2083',
      description: '5 days of intense competition',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      icon: MapPin,
      title: 'Venue',
      value: 'Chari Deurali Sports Stadium',
      description: 'World-class facilities',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400',
    },
    {
      icon: Users,
      title: 'Teams',
      value: '32 Teams Maximum',
      description: 'From across the nation',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: DollarSign,
      title: 'Registration Fee',
      value: 'NPR 7,000',
      description: 'Per team registration',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      icon: Clock,
      title: 'Registration Deadline',
      value: 'Ashoj 25, 2083',
      description: 'Register before deadline',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
    },
    {
      icon: Trophy,
      title: 'Format',
      value: 'Knockout + League',
      description: 'Double elimination format',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
  ]

  return (
    <section ref={ref} id="tournament-details" className="py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(249,115,22,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 px-6 py-2 text-lg bg-orange-500/10 text-orange-400 border-orange-500/30">
              <Trophy className="w-4 h-4 mr-2" />
              Tournament Details
            </Badge>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Know
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive information about the biggest volleyball tournament of the year
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <Card className={`${detail.bgColor} ${detail.borderColor} border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full`}>
                <CardContent className="p-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${detail.bgColor} border ${detail.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <detail.icon className={`w-8 h-8 ${detail.iconColor}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">{detail.title}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2">
                    <span className={detail.iconColor}>{detail.value}</span>
                  </p>
                  <p className="text-gray-400 text-sm">{detail.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <Target className="w-8 h-8 text-orange-400 mx-auto" />
              <h4 className="text-white font-semibold">Elite Competition</h4>
              <p className="text-gray-400 text-sm">Face the best teams from across the country</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <Award className="w-8 h-8 text-yellow-400 mx-auto" />
              <h4 className="text-white font-semibold">Professional Referees</h4>
              <p className="text-gray-400 text-sm">FIVB certified officials for fair play</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <Star className="w-8 h-8 text-purple-400 mx-auto" />
              <h4 className="text-white font-semibold">Live Coverage</h4>
              <p className="text-gray-400 text-sm">All matches streamed live on social media</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default TournamentDetails