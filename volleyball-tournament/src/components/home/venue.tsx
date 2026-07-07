'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Navigation, 
  Bus, 
  Car, 
  Coffee,
  Wifi,
  ParkingCircle,
  Accessibility,
  Shield
} from 'lucide-react'

const Venue = memo(function Venue() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const facilities = [
    { icon: ParkingCircle, label: 'Free Parking', description: 'Ample parking space' },
    { icon: Coffee, label: 'Cafeteria', description: 'Food & beverages' },
    { icon: Wifi, label: 'Free WiFi', description: 'High-speed internet' },
    { icon: Accessibility, label: 'Accessible', description: 'Wheelchair accessible' },
    { icon: Shield, label: 'Security', description: '24/7 security' },
    { icon: Bus, label: 'Transport', description: 'Public transport nearby' },
  ]

  const transportOptions = [
    { icon: Bus, label: 'Public Bus', description: 'Route 15, 22, 35' },
    { icon: Car, label: 'Taxi/Ride Share', description: 'Pathao, InDrive available' },
    { icon: Navigation, label: 'Walking', description: '10 min from city center' },
  ]

  return (
    <section ref={ref} id="venue" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
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
          <Badge className="mb-4 px-6 py-2 text-lg bg-blue-500/10 text-blue-400 border-blue-500/30">
            <MapPin className="w-4 h-4 mr-2" />
            Venue
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            World-Class{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience volleyball at its finest in our state-of-the-art venue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venue Image/Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-cyan-900/50 flex items-center justify-center relative">
                  <MapPin className="w-20 h-20 text-orange-400" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 bg-orange-500 rounded-full opacity-50" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    National Sports Stadium
                  </h3>
                  <p className="text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Kathmandu, Nepal
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Facilities */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Facilities</h3>
              <div className="grid grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <motion.div
                    key={facility.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/30 transition-colors group"
                  >
                    <facility.icon className="w-5 h-5 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-semibold text-sm">{facility.label}</h4>
                    <p className="text-gray-400 text-xs">{facility.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to Reach */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  How to Reach
                </h3>
                <div className="space-y-3">
                  {transportOptions.map((option, index) => (
                    <motion.div
                      key={option.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors"
                    >
                      <option.icon className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-semibold text-sm">{option.label}</h4>
                        <p className="text-gray-400 text-xs">{option.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default Venue