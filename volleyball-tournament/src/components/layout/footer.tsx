'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Heart,
  ArrowUp
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import Image from 'next/image'

const Footer = memo(function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'Register Team', href: '/register' },
      { label: 'Tournament Details', href: '#tournament-details' },
      { label: 'Prize Pool', href: '#prize-pool' },
      { label: 'Schedule', href: '#schedule' },
      { label: 'Rules', href: '#rules' },
    ],
    support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Venue', href: '#venue' },
      { label: 'Gallery', href: '#gallery' },
    ],
    social: [
      { icon: FaFacebook, href: '#', label: 'Facebook' },
      { icon: FaInstagram, href: '#', label: 'Instagram' },
      { icon: FaYoutube, href: '#', label: 'YouTube' },
      { icon: FaTwitter, href: '#', label: 'Twitter' },
    ],
  }

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
              Volleyball Tournament
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The biggest volleyball tournament bringing together teams from across the nation. 
              Experience the thrill of competitive volleyball.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>9803977546</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>www.bishaltolami049@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates about the tournament
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500/20 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

{/* Bottom Bar */}
<div className="border-t border-gray-800 pt-8">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-gray-400 text-sm text-center md:text-left">
      © {new Date().getFullYear()} Volleyball Tournament. All rights reserved.
    </p>
    
    {/* DANGOL AI Credit */}
    <div className="flex items-center gap-3">
       <Image
          src="/dangolai.png"
          alt="DANGOL AI"
          width={24}
          height={24}
          className="rounded"
        />
      <span className="text-gray-500 text-xs">Developed by</span>
      <a 
        href="https://dangolai.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center group hover:opacity-80 transition-opacity"
      >
  
        <span className="text-gray-400 group-hover:text-orange-400 transition-colors font-semibold text-sm">
          DANGOL AI
        </span>
      </a>
    </div>

    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <span>Made with</span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Heart className="w-4 h-4 text-red-500" />
      </motion.div>
      <span>in Nepal</span>
    </div>
  </div>
</div>
      </div>
    </footer>
  )
})

export default Footer