'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Star,
  Building2,
  Shield,
  Zap
} from 'lucide-react'

const Sponsors = memo(function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sponsors = [
    { name: 'TechCorp Nepal', type: 'Title Sponsor', logo: '/sponsors/sponsor1.png', tier: 'platinum' },
    { name: 'SportsGear Pro', type: 'Gold Sponsor', logo: '/sponsors/sponsor2.png', tier: 'gold' },
    { name: 'EnergyMax', type: 'Silver Sponsor', logo: '/sponsors/sponsor3.png', tier: 'silver' },
    { name: 'FitLife Nepal', type: 'Bronze Sponsor', logo: '/sponsors/sponsor4.png', tier: 'bronze' },
    { name: 'MediaHub', type: 'Media Partner', logo: '/sponsors/sponsor5.png', tier: 'partner' },
    { name: 'TravelNepal', type: 'Travel Partner', logo: '/sponsors/sponsor6.png', tier: 'partner' },
  ]

  const partners = [
    { name: 'Volleyball Association', role: 'Organizing Partner' },
    { name: 'Sports Authority', role: 'Government Partner' },
    { name: 'Local Municipality', role: 'Venue Partner' },
    { name: 'Red Cross Nepal', role: 'Medical Partner' },
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

  return (
    <section ref={ref} id="sponsors" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-purple-500/10 text-purple-400 border-purple-500/30">
            <Star className="w-4 h-4 mr-2" />
            Our Partners
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Supported by the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Best
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Proud to be associated with leading organizations
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-orange-500/50 transition-colors group">
                <CardContent className="p-4 text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getTierColor(sponsor.tier)} p-0.5 mx-auto mb-3`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">
                    {sponsor.name}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">{sponsor.type}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gray-800/30 border border-gray-700 text-center group hover:border-orange-500/30 transition-colors"
              >
                <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-orange-400 transition-colors" />
                <h4 className="text-white font-semibold text-sm">{partner.name}</h4>
                <p className="text-gray-400 text-xs mt-1">{partner.role}</p>
              </motion.div>
            ))}
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
            className="inline-block"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 backdrop-blur-sm">
              <Heart className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Become a Sponsor</h3>
              <p className="text-gray-400 mb-4">
                Join us in making this tournament unforgettable
              </p>
              <p className="text-orange-400 font-semibold">
                Contact: {process.env.NEXT_PUBLIC_ADMIN_PHONE || '9803977546'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default Sponsors