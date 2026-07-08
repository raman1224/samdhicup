'use client'

import { memo, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { 
  Menu, X, Home, Users, 
  Info, Phone, Calendar, Shield 
} from 'lucide-react'

const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash navigation
  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false)
    
    // If it's a hash link (starts with #)
    if (href.startsWith('#')) {
      // If on homepage, scroll to section
      if (pathname === '/') {
        const element = document.getElementById(href.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to homepage with hash
        router.push(`/${href}`)
      }
    }
  }, [pathname, router])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/register', label: 'Register', icon: Users },
    { href: '#tournament-details', label: 'Details', icon: Info, isHash: true },
    { href: '#schedule', label: 'Schedule', icon: Calendar, isHash: true },
    { href: '#contact', label: 'Contact', icon: Phone, isHash: true },
  ]

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with Image */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="relative w-14 h-14 md:w-16 md:h-16"
              >
                <Image
                  src="/logo.png"
                  alt="Volleyball Tournament Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 56px, 64px"
                  priority
                />
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-sm md:text-base font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Volleyball
                </motion.h1>
                <h2 className="text-[10px] md:text-xs text-gray-400 -mt-0.5">Tournament 2083</h2>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.isHash 
                  ? false 
                  : pathname === link.href
                
                if (link.isHash) {
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </motion.button>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                  >
                    <motion.div
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        isActive
                          ? 'text-orange-400 bg-orange-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-orange-500 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Register CTA */}
              <Link href="/register" className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-500/25">
                    <Shield className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                </motion.div>
              </Link>

              {/* Admin Link */}
              <Link href="/admin/login" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center transition-colors border border-gray-700/50"
                >
                  <Shield className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                </motion.button>
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-400" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-gray-900 border-l border-gray-800 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20 space-y-2">
                {/* Mobile Logo */}
                <motion.div 
                  className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative w-12 h-12 overflow-hidden rounded-xl">
                    <Image
                      src="/logo.png"
                      alt="Volleyball Tournament Logo"
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                      Volleyball
                    </h2>
                    <p className="text-xs text-gray-400">Tournament 2026</p>
                  </div>
                </motion.div>

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.isHash ? (
                      <motion.button
                        onClick={() => handleNavClick(link.href)}
                        className="flex items-center gap-3 p-4 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 w-full text-left"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </motion.button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                            pathname === link.href
                              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <link.icon className="w-5 h-5" />
                          <span className="font-medium">{link.label}</span>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 space-y-2"
                >
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-6 text-lg">
                        <Shield className="w-5 h-5 mr-2" /> Register Now
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:text-white">
                        <Shield className="w-4 h-4 mr-2" /> Admin
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default Navbar