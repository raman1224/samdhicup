'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, ExternalLink, Car, IdCard, ParkingCircle, Shield, Navigation, Bus } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Venue = memo(function Venue() {
  const t = useTranslations('venue')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const facilities = [
    { icon: IdCard, label: t('playerCards'), description: t('playerCardsDesc') },
    { icon: ParkingCircle, label: t('freeParking'), description: t('freeParkingDesc') },
    { icon: Shield, label: t('security'), description: t('securityDesc') },
    { icon: Bus, label: t('transport'), description: t('transportDesc') },
  ]

  const transportOptions = [
    { icon: Bus, label: t('publicBus'), description: t('publicBusDesc') },
    { icon: Car, label: t('taxi'), description: t('taxiDesc') },
    { icon: Navigation, label: t('googleMaps'), description: t('googleMapsDesc'), link: true },
  ]

  const googleMapsUrl = 'https://maps.app.goo.gl/UQARUHtVgxwqh1r18?g_st=aw'

  return (
    <section ref={ref} id="venue" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"><div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} /></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <Badge className="mb-4 px-6 py-2 text-lg bg-blue-500/10 text-blue-400 border-blue-500/30"><MapPin className="w-4 h-4 mr-2" />{t('badge')}</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{t('title')} <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">{t('highlight')}</span></h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('description')}</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="bg-gray-800/50 border-gray-700 overflow-hidden"><CardContent className="p-0">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block relative group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-cyan-900/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/venue-map.jpg')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative z-10 text-center">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-3"><div className="w-16 h-16 bg-orange-500/30 rounded-full flex items-center justify-center"><MapPin className="w-8 h-8 text-orange-400" /></div></motion.div>
                    <p className="text-white font-semibold group-hover:text-orange-400 transition-colors">{t('clickMap')}</p>
                    <ExternalLink className="w-5 h-5 text-gray-400 mx-auto mt-2 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">चउरी देउराली गा.पा, देउराली -०६</h3>
                <p className="text-gray-400 mb-1">नयाँ बस्ती, काभ्रपलाञ्चोक</p>
                <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" /> नेपाल</p>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"><Navigation className="w-3.5 h-3.5" />{t('viewMaps')}<ExternalLink className="w-3 h-3" /></a>
              </div>
            </CardContent></Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-6">
            <div><h3 className="text-xl font-bold text-white mb-4">{t('facilities')}</h3>
              <div className="grid grid-cols-2 gap-4">{facilities.map((facility, index) => (
                <motion.div key={facility.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }} whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/30 transition-colors group">
                  <facility.icon className="w-5 h-5 text-orange-400 mb-2 group-hover:scale-110 transition-transform" /><h4 className="text-white font-semibold text-sm">{facility.label}</h4><p className="text-gray-400 text-xs">{facility.description}</p>
                </motion.div>
              ))}</div>
            </div>
            <Card className="bg-gray-800/50 border-gray-700"><CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Navigation className="w-5 h-5 text-blue-400" />{t('howToReach')}</h3>
              <div className="space-y-3">{transportOptions.map((option, index) => (
                <motion.div key={option.label} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors">
                  <option.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div><h4 className="text-white font-semibold text-sm">{option.link ? <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">{option.label} →</a> : option.label}</h4><p className="text-gray-400 text-xs">{option.description}</p></div>
                </motion.div>
              ))}</div>
            </CardContent></Card>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block"><Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-6 text-lg"><Navigation className="w-5 h-5 mr-2" />{t('openMaps')}<ExternalLink className="w-4 h-4 ml-2" /></Button></a>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
export default Venue