'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Trophy, 
  Mail, 
  Phone, 
  ArrowLeft,
  PartyPopper,
  Share2
} from 'lucide-react'
import { useEffect } from 'react'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get('id') || 'VOL2026-XXXX'
  useEffect(() => {
    localStorage.removeItem('vb-reg-data')
    localStorage.removeItem('vb-reg-step')
    localStorage.removeItem('vb-reg-completed')
    localStorage.removeItem('vb-reg-data_timestamp')
  }, [])

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border-2 border-green-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-green-500/20"
            />
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Registration{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Successful!
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <PartyPopper className="w-6 h-6 text-yellow-400" />
            <p className="text-xl text-gray-300">Your team has been registered</p>
            <PartyPopper className="w-6 h-6 text-yellow-400" />
          </div>
        </motion.div>

        {/* Registration ID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/50 border-gray-700 inline-block">
            <CardContent className="p-6">
              <p className="text-sm text-gray-400 mb-2">Your Registration ID</p>
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-orange-400" />
                <span className="text-3xl md:text-4xl font-mono font-bold text-orange-400 tracking-wider">
                  {registrationId}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Save this ID for future reference</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                {[
                  'We will verify your payment within 24 hours',
                  'You will receive a confirmation email',
                  'Match schedule will be published after registration closes',
                  'Team captains will be added to a WhatsApp group',
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-green-400">{index + 1}</span>
                    </div>
                    <span className="text-sm">{step}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-8 space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <span>www.bishaltolami049@gmail.com</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span>9803977546</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Team Registered!',
                  text: `Our team has been registered for the Volleyball Tournament 2026! Registration ID: ${registrationId}`,
                })
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}