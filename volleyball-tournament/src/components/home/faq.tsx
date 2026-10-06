'use client'

import { memo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, ChevronDown, MessageCircle, Shield, CreditCard, Users, Calendar, Trophy } from 'lucide-react'
import { useTranslations } from 'next-intl'

const FAQ = memo(function FAQ() {
  const t = useTranslations('faq')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { icon: CreditCard, question: t('q1'), answer: t('a1') },
    { icon: Users, question: t('q2'), answer: t('a2') },
    { icon: Calendar, question: t('q3'), answer: t('a3') },
    { icon: Trophy, question: t('q4'), answer: t('a4') },
    { icon: Shield, question: t('q5'), answer: t('a5') },
    { icon: MessageCircle, question: t('q6'), answer: t('a6') },
    { icon: MessageCircle, question: t('q7'), answer: t('a7') },
  ]

  return (
    <section ref={ref} id="faq" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <Badge className="mb-4 px-6 py-2 text-lg bg-purple-500/10 text-purple-400 border-purple-500/30"><HelpCircle className="w-4 h-4 mr-2" />{t('badge')}</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{t('title')} <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{t('highlight')}</span></h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('description')}</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <Card className={`border transition-all duration-300 ${openIndex === index ? 'bg-gray-800/80 border-orange-500/50 shadow-lg shadow-orange-500/10' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}>
                <CardContent className="p-0">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-4 flex items-center gap-4 text-left">
                    <motion.div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${openIndex === index ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-gray-700/50 border border-gray-600'}`} whileHover={{ scale: 1.1 }}>
                      <faq.icon className={`w-5 h-5 ${openIndex === index ? 'text-orange-400' : 'text-gray-400'}`} />
                    </motion.div>
                    <div className="flex-1"><h3 className={`font-semibold ${openIndex === index ? 'text-orange-400' : 'text-white'}`}>{faq.question}</h3></div>
                    <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-orange-400' : 'text-gray-400'}`} /></motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-4 pb-4 pl-18"><div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700"><p className="text-gray-300 leading-relaxed">{faq.answer}</p></div></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"><CardContent className="p-6">
            <HelpCircle className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">{t('stillHave')}</h3>
            <p className="text-gray-400 mb-4">{t('stillHaveDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:9803977546" className="text-purple-400 hover:text-purple-300 font-semibold">{t('callUs')}</a>
              <a href="mailto:nayabastisports.official@gmail.com" className="text-purple-400 hover:text-purple-300 font-semibold">{t('emailUs')}</a>
            </div>
          </CardContent></Card>
        </motion.div>
      </div>
    </section>
  )
})
export default FAQ