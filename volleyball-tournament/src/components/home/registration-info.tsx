'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ClipboardList, 
  ArrowRight, 
  CreditCard,
  Users,
  FileCheck,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

const RegistrationInfo = memo(function RegistrationInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: ClipboardList,
      title: 'Step 1: Team Details',
      description: 'Fill in your team name, captain details, and team address',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: CreditCard,
      title: 'Step 2: Payment',
      description: 'Pay registration fee via eSewa or bank transfer and upload receipt',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      icon: Users,
      title: 'Step 3: Players',
      description: 'Register all 10 players with their details and documents',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: FileCheck,
      title: 'Step 4: Review',
      description: 'Review all information and make corrections if needed',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      icon: Send,
      title: 'Step 5: Submit',
      description: 'Submit registration and receive confirmation via email',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
  ]

  const requirements = [
    'Valid team name and details',
    'Captain contact information',
    'Payment of NPR 7,000',
    '10 registered players',
    'Player photos and documents',
    'Valid ID proof for all players',
  ]

  return (
    <section ref={ref} id="registration-info" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-green-500/10 text-green-400 border-green-500/30">
            <ClipboardList className="w-4 h-4 mr-2" />
            How to Register
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Registration{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Simple 5-step process to register your team for the tournament
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`${step.bgColor} ${step.borderColor} border h-full`}>
                <CardContent className="p-6">
                  <motion.div
                    className="flex items-center gap-3 mb-4"
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </motion.div>
                    <span className="text-sm font-bold text-gray-400">STEP {index + 1}</span>
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Requirements Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <motion.li
                      key={req}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <p className="text-yellow-400 text-sm">
                    Registration fee is non-refundable once submitted.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="text-blue-400 text-sm">
                    Make sure all player information is accurate before submission.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-sm">
                    False or incorrect information may lead to team disqualification.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-12 py-7 text-lg rounded-full shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              Register Your Team Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
})

export default RegistrationInfo