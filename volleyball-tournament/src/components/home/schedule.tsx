'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Trophy, Circle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Schedule = memo(function Schedule() {
  const t = useTranslations('schedule')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timeline = [
    { phase: t('phase1'), title: t('registrationOpens'), date: 'Bhadra 02, 2083', time: '9:00 AM', description: t('regOpensDesc'), status: t('status'), color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', icon: Calendar },
    { phase: t('phase2'), title: t('registrationCloses'), date: 'Ashoj 26, 2083', time: '11:59 PM', description: t('regClosesDesc'), status: t('status'), color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30', icon: Clock },
    { phase: t('phase3'), title: t('fixtureAnnouncement'), date: 'Ashoj 29, 2083', time: '12:00 PM', description: t('fixtureDesc'), status: t('status'), color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30', icon: Trophy },
    { phase: t('phase4'), title: t('openingCeremony'), date: 'Ashoj 29, 2083', time: '9:00 AM', description: t('openingDesc'), status: t('status'), color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30', icon: MapPin },
    { phase: t('phase5'), title: t('groupStage'), date: 'Ashoj 29-30, 2083', time: '9:00 AM - 6:00 PM', description: t('groupDesc'), status: t('status'), color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', icon: Circle },
    { phase: t('phase6'), title: t('knockoutStage'), date: 'Kartik 31, 2083', time: '9:00 AM - 6:00 PM', description: t('knockoutDesc'), status: t('status'), color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30', icon: Circle },
    { phase: t('phase7'), title: t('finals'), date: 'Kartik 01, 2083', time: '10:00 AM - 5:00 PM', description: t('finalsDesc'), status: t('status'), color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30', icon: Trophy },
  ]

  return (
    <section ref={ref} id="schedule" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <Badge className="mb-4 px-6 py-2 text-lg bg-cyan-500/10 text-cyan-400 border-cyan-500/30"><Calendar className="w-4 h-4 mr-2" />{t('badge')}</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{t('title')} <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{t('highlight')}</span></h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('description')}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-purple-500/50 to-blue-500/50 transform md:-translate-x-px" />
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <motion.div key={event.phase} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className={`flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <motion.div className={`w-8 h-8 rounded-full ${event.bgColor} border-2 ${event.borderColor} flex items-center justify-center z-10`} whileHover={{ scale: 1.3 }} animate={{ boxShadow: ['0 0 0 0 rgba(249,115,22,0.4)', '0 0 0 10px rgba(249,115,22,0)', '0 0 0 0 rgba(249,115,22,0.4)'] }} transition={{ duration: 2, repeat: Infinity }}><event.icon className={`w-4 h-4 ${event.color}`} /></motion.div>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card className={`${event.bgColor} ${event.borderColor} border`}><CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3"><Badge className={event.bgColor}>{event.phase}</Badge><span className="text-xs text-gray-400">● {event.status}</span></div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3"><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.time}</span></div>
                      <p className="text-gray-300">{event.description}</p>
                    </CardContent></Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30"><CardContent className="p-6"><Calendar className="w-10 h-10 text-cyan-400 mx-auto mb-3" /><h3 className="text-xl font-bold text-white mb-2">{t('comingSoon')}</h3><p className="text-gray-400">{t('comingSoonDesc')}</p></CardContent></Card>
        </motion.div>
      </div>
    </section>
  )
})
export default Schedule