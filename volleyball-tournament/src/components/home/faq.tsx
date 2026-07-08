'use client'

import { memo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle,
  Shield,
  CreditCard,
  Users,
  Calendar,
  Trophy
} from 'lucide-react'

const FAQ = memo(function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      icon: CreditCard,
      question: 'What is the registration fee?',
      answer: 'The registration fee is NPR 7,000 per team. This includes participation in all matches, player IDs, and access to venue facilities. Payment can be made via eSewa or bank transfer.',
    },
    {
      icon: Users,
      question: 'How many players can be registered?',
      answer: 'Each team must register exactly 10 players. This includes 6 starting players and 4 substitutes. All players must be registered before the deadline.',
    },
    {
      icon: Calendar,
      question: 'What are the important dates?',
      answer: 'Registration opens on Bhadra 25, 2083, and closes on Ashoj 25, 2083. The tournament will be held from Ashoj 29 - Kartik 02, 2083. The match schedule will be published on Ashoj 27, 2083.',
    },
    {
      icon: Trophy,
      question: 'What is the tournament format?',
      answer: 'The tournament follows a double elimination format. Teams are divided into groups for the initial rounds, followed by knockout stages. The top 3 teams receive prizes.',
    },
    {
      icon: Shield,
      question: 'Are there any age restrictions?',
      answer: 'Yes, all players must be between 16 and 50 years old. Valid identification documents (citizenship or passport) must be provided during registration.',
    },
    {
      icon: MessageCircle,
      question: 'How can I contact the organizers?',
      answer: 'You can reach us via phone at 9803977546, email at www.bishaltolami049@gmail.com, or visit our office in Kathmandu. Working hours are 9 AM to 6 PM, Monday to Saturday.',
    },
  ]

  return (
    <section ref={ref} id="faq" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-purple-500/10 text-purple-400 border-purple-500/30">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about the tournament
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`border transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-gray-800/80 border-orange-500/50 shadow-lg shadow-orange-500/10' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        openIndex === index 
                          ? 'bg-orange-500/20 border border-orange-500/30' 
                          : 'bg-gray-700/50 border border-gray-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <faq.icon className={`w-5 h-5 ${
                        openIndex === index ? 'text-orange-400' : 'text-gray-400'
                      }`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        openIndex === index ? 'text-orange-400' : 'text-white'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${
                        openIndex === index ? 'text-orange-400' : 'text-gray-400'
                      }`} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pl-18">
                          <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
            <CardContent className="p-6">
              <HelpCircle className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
              <p className="text-gray-400 mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:9803977546" className="text-purple-400 hover:text-purple-300 font-semibold">
                  📞 Call Us
                </a>
                <a href="mailto:www.bishaltolami049@gmail.com" className="text-purple-400 hover:text-purple-300 font-semibold">
                  ✉️ Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})

export default FAQ