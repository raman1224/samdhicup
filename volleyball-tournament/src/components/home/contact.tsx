'use client'

import { memo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Send,
  Clock,
  User,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

const Contact = memo(function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Message sent successfully! We will get back to you soon.')
    setLoading(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '9803977546',
      description: 'Call us for quick inquiries',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'www.bishaltolami049@gmail.com',
      description: 'Send us detailed queries',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'चउरी देउराली -०६, नयाँ बस्ती, काभ्रे',
      description: 'Visit us in person',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: '9 AM - 6 PM',
      description: 'Monday to Saturday',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-6 py-2 text-lg bg-green-500/10 text-green-400 border-green-500/30">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get in Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Your name"
                        className="bg-gray-900 border-gray-700 text-white pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        type="email"
                        placeholder="Your email"
                        className="bg-gray-900 border-gray-700 text-white pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Message</label>
                    <Textarea
                      placeholder="Your message"
                      className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`${info.bgColor} ${info.borderColor} border hover:shadow-lg transition-all duration-300 group`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${info.bgColor} border ${info.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold">{info.label}</h3>
                      <p className={`${info.color} font-medium`}>{info.value}</p>
                      <p className="text-gray-400 text-xs">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-center"
            >
              <p className="text-gray-300 text-sm">
                📞 For urgent queries, call us at{' '}
                <span className="text-orange-400 font-bold">9803977546</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default Contact


