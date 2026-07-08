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
  Info, Phone, Calendar, Shield, Trophy
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // Handle hash navigation
  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('#')) {
      if (pathname === '/') {
        const element = document.getElementById(href.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
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
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                  priority
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xs sm:text-sm md:text-base font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent whitespace-nowrap">
                  नयाँ बस्ती खुल्ला
                </h1>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 whitespace-nowrap">
                  भलिबल प्रतियोगिता-२०८३
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = !link.isHash && pathname === link.href
                
                if (link.isHash) {
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  )
                }

                return (
                  <Link key={link.href} href={link.href}>
                    <div className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-orange-400 bg-orange-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}>
                      <link.icon className="w-4 h-4" />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-orange-500 rounded-full"
                        />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Register CTA - Desktop */}
              <Link href="/register" className="hidden md:block">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-500/25 text-sm">
                  <Trophy className="w-4 h-4 mr-1.5" />
                  Register Now
                </Button>
              </Link>

              {/* Admin Link - Desktop */}
              <Link href="/admin/login" className="hidden md:block">
                <button className="w-9 h-9 rounded-lg bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center transition-colors border border-gray-700/50">
                  <Shield className="w-4 h-4 text-gray-500 hover:text-gray-300" />
                </button>
              </Link>


              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-lg bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-700/50 flex-shrink-0"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <h1 className="text-xs font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                      नयाँ बस्ती खुल्ला
                    </h1>
                    <p className="text-[9px] text-gray-500">भलिबल प्रतियोगिता-२०८३</p>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    {link.isHash ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors text-left"
                      >
                        <link.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{link.label}</span>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                          pathname === link.href
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <link.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{link.label}</span>
                        {pathname === link.href && (
                          <div className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="p-3 border-t border-gray-800 space-y-2">
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold h-12 text-base">
                    <Trophy className="w-5 h-5 mr-2" />
                    Register Now
                  </Button>
                </Link>
                <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:text-white h-11">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default Navbar