// // // 'use client'

// // // import { useState } from 'react'
// // // import { motion } from 'framer-motion'
// // // import { useRouter } from 'next/navigation'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Input } from '@/components/ui/input'
// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import { 
// // //   Shield, 
// // //   Mail, 
// // //   Lock, 
// // //   Loader2,
// // //   Eye,
// // //   EyeOff,
// // //   Trophy
// // // } from 'lucide-react'
// // // import { toast } from 'sonner'

// // // export default function AdminLoginPage() {
// // //   const router = useRouter()
// // //   const [email, setEmail] = useState('')
// // //   const [password, setPassword] = useState('')
// // //   const [showPassword, setShowPassword] = useState(false)
// // //   const [loading, setLoading] = useState(false)
// // //   const [otpSent, setOtpSent] = useState(false)
// // //   const [otp, setOtp] = useState('')

// // //   const handleSendOTP = async (e: React.FormEvent) => {
// // //     e.preventDefault()
    
// // //     if (!email || !password) {
// // //       toast.error('Please enter email and password')
// // //       return
// // //     }

// // //     setLoading(true)
// // //     try {
// // //       const res = await fetch('/api/admin/send-otp', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email, password }),
// // //       })

// // //       const data = await res.json()

// // //       if (data.success) {
// // //         setOtpSent(true)
// // //         toast.success('OTP sent to your email')
// // //       } else {
// // //         toast.error(data.error || 'Invalid credentials')
// // //       }
// // //     } catch {
// // //       toast.error('Failed to send OTP')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleVerifyOTP = async (e: React.FormEvent) => {
// // //     e.preventDefault()
    
// // //     if (!otp) {
// // //       toast.error('Please enter OTP')
// // //       return
// // //     }

// // //     setLoading(true)
// // //     try {
// // //       const res = await fetch('/api/admin/verify-otp', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email, otp }),
// // //       })

// // //       const data = await res.json()

// // //       if (data.success) {
// // //         // Store admin token in cookie/session
// // //         document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Strict`
// // //         toast.success('Login successful!')
// // //         router.push('/admin/dashboard')
// // //       } else {
// // //         toast.error(data.error || 'Invalid OTP')
// // //       }
// // //     } catch {
// // //       toast.error('Verification failed')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 pt-20">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         className="w-full max-w-md"
// // //       >
// // //         {/* Logo */}
// // //         <div className="text-center mb-8">
// // //           <motion.div
// // //             whileHover={{ rotate: 360 }}
// // //             transition={{ duration: 0.6 }}
// // //             className="inline-block mb-4"
// // //           >
// // //             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
// // //               <Shield className="w-8 h-8 text-white" />
// // //             </div>
// // //           </motion.div>
// // //           <h1 className="text-2xl font-bold text-white">Admin Login</h1>
// // //           <p className="text-gray-400 text-sm mt-1">Volleyball Tournament Management</p>
// // //         </div>

// // //         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
// // //           <CardHeader>
// // //             <CardTitle className="text-white text-center">
// // //               {otpSent ? 'Enter OTP' : 'Sign In'}
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             {!otpSent ? (
// // //               <form onSubmit={handleSendOTP} className="space-y-4">
// // //                 <div>
// // //                   <label className="text-sm text-gray-400 mb-1 block">Email</label>
// // //                   <div className="relative">
// // //                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
// // //                     <Input
// // //                       type="email"
// // //                       value={email}
// // //                       onChange={(e) => setEmail(e.target.value)}
// // //                       placeholder="admin@example.com"
// // //                       className="bg-gray-900 border-gray-700 text-white pl-10"
// // //                       required
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="text-sm text-gray-400 mb-1 block">Password</label>
// // //                   <div className="relative">
// // //                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
// // //                     <Input
// // //                       type={showPassword ? 'text' : 'password'}
// // //                       value={password}
// // //                       onChange={(e) => setPassword(e.target.value)}
// // //                       placeholder="Enter password"
// // //                       className="bg-gray-900 border-gray-700 text-white pl-10 pr-10"
// // //                       required
// // //                     />
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => setShowPassword(!showPassword)}
// // //                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
// // //                     >
// // //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // //                     </button>
// // //                   </div>
// // //                 </div>

// // //                 <Button
// // //                   type="submit"
// // //                   disabled={loading}
// // //                   className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6"
// // //                 >
// // //                   {loading ? (
// // //                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // //                   ) : (
// // //                     'Send OTP'
// // //                   )}
// // //                 </Button>
// // //               </form>
// // //             ) : (
// // //               <form onSubmit={handleVerifyOTP} className="space-y-4">
// // //                 <div>
// // //                   <label className="text-sm text-gray-400 mb-1 block">
// // //                     Enter OTP sent to {email}
// // //                   </label>
// // //                   <Input
// // //                     type="text"
// // //                     value={otp}
// // //                     onChange={(e) => setOtp(e.target.value)}
// // //                     placeholder="Enter 6-digit OTP"
// // //                     className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-widest"
// // //                     maxLength={6}
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <Button
// // //                   type="submit"
// // //                   disabled={loading || otp.length !== 6}
// // //                   className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6"
// // //                 >
// // //                   {loading ? (
// // //                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // //                   ) : (
// // //                     'Verify & Login'
// // //                   )}
// // //                 </Button>

// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setOtpSent(false)}
// // //                   className="w-full text-sm text-gray-400 hover:text-orange-400 transition-colors"
// // //                 >
// // //                   Back to login
// // //                 </button>
// // //               </form>
// // //             )}
// // //           </CardContent>
// // //         </Card>

// // //         <p className="text-center text-gray-500 text-xs mt-4">
// // //           🔒 Secure admin access only
// // //         </p>
// // //       </motion.div>
// // //     </div>
// // //   )
// // // }


// // 'use client'

// // import { useState } from 'react'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { useRouter } from 'next/navigation'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Input } from '@/components/ui/input'
// // import { Button } from '@/components/ui/button'
// // import { Badge } from '@/components/ui/badge'
// // import { 
// //   Shield, Mail, Lock, Loader2, Eye, EyeOff, 
// //   Trophy, ArrowLeft, Check, Key
// // } from 'lucide-react'
// // import { toast } from 'sonner'
// // import Link from 'next/link'

// // type Step = 'login' | 'otp' | 'forgot-email' | 'forgot-otp' | 'reset-password'

// // export default function AdminLoginPage() {
// //   const router = useRouter()
// //   const [step, setStep] = useState<Step>('login')
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [loading, setLoading] = useState(false)
// //   const [otp, setOtp] = useState('')
// //   const [newPassword, setNewPassword] = useState('')
// //   const [confirmPassword, setConfirmPassword] = useState('')

// //   // Step 1: Login - Send OTP
// //   const handleSendOTP = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!email || !password) {
// //       toast.error('Please enter email and password')
// //       return
// //     }
// //     setLoading(true)
// //     try {
// //       const res = await fetch('/api/admin/send-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       })
// //       const data = await res.json()
// //       if (data.success) {
// //         setStep('otp')
// //         toast.success('OTP sent to your email')
// //       } else {
// //         toast.error(data.error || 'Invalid credentials')
// //       }
// //     } catch {
// //       toast.error('Failed to send OTP')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Step 2: Verify OTP
// //   const handleVerifyOTP = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!otp || otp.length !== 6) {
// //       toast.error('Please enter valid 6-digit OTP')
// //       return
// //     }
// //     setLoading(true)
// //     try {
// //       const res = await fetch('/api/admin/verify-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, otp }),
// //       })
// //       const data = await res.json()
// //       if (data.success) {
// //         document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Strict`
// //         toast.success('Login successful!')
// //         router.push('/admin/dashboard')
// //       } else {
// //         toast.error(data.error || 'Invalid OTP')
// //       }
// //     } catch {
// //       toast.error('Verification failed')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Step 3: Forgot Password - Send email
// //   const handleForgotEmail = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!email) {
// //       toast.error('Please enter your email')
// //       return
// //     }
// //     setLoading(true)
// //     try {
// //       const res = await fetch('/api/admin/forgot-password', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email }),
// //       })
// //       const data = await res.json()
// //       if (data.success) {
// //         setStep('forgot-otp')
// //         toast.success('OTP sent to your email')
// //       } else {
// //         toast.error(data.error || 'Email not found')
// //       }
// //     } catch {
// //       toast.error('Failed to send OTP')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Step 4: Forgot Password - Verify OTP
// //   const handleForgotVerifyOTP = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!otp || otp.length !== 6) {
// //       toast.error('Please enter valid OTP')
// //       return
// //     }
// //     setLoading(true)
// //     try {
// //       const res = await fetch('/api/admin/verify-forgot-otp', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, otp }),
// //       })
// //       const data = await res.json()
// //       if (data.success) {
// //         setStep('reset-password')
// //         toast.success('OTP verified! Set new password')
// //       } else {
// //         toast.error(data.error || 'Invalid OTP')
// //       }
// //     } catch {
// //       toast.error('Verification failed')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Step 5: Reset Password
// //   const handleResetPassword = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (newPassword !== confirmPassword) {
// //       toast.error('Passwords do not match')
// //       return
// //     }
// //     if (newPassword.length < 6) {
// //       toast.error('Password must be at least 6 characters')
// //       return
// //     }
// //     setLoading(true)
// //     try {
// //       const res = await fetch('/api/admin/reset-password', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, newPassword, otp }),
// //       })
// //       const data = await res.json()
// //       if (data.success) {
// //         toast.success('Password reset successfully! Please login.')
// //         setStep('login')
// //         setPassword('')
// //         setNewPassword('')
// //         setConfirmPassword('')
// //         setOtp('')
// //       } else {
// //         toast.error(data.error || 'Failed to reset password')
// //       }
// //     } catch {
// //       toast.error('Failed to reset password')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
    
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="w-full max-w-md"
// //       >
// //         {/* Logo */}
// //         <div className="text-center mb-8">
// //           <motion.div
// //             whileHover={{ rotate: 360 }}
// //             transition={{ duration: 0.6 }}
// //             className="inline-block mb-4"
// //           >
// //             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
// //               <Shield className="w-8 h-8 text-white" />
// //             </div>
// //           </motion.div>
// //           <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
// //           <p className="text-gray-400 text-sm mt-1">Volleyball Tournament 2026</p>
// //         </div>

// //         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
// //           <CardContent className="p-6">
// //             <AnimatePresence mode="wait">
// //               {/* Login Form */}
// //               {step === 'login' && (
// //                 <motion.form
// //                   key="login"
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   onSubmit={handleSendOTP}
// //                   className="space-y-4"
// //                 >
// //                   <div className="text-center mb-2">
// //                     <h2 className="text-white font-semibold text-lg">Sign In</h2>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm text-gray-400 mb-1 block">Email</label>
// //                     <div className="relative">
// //                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
// //                       <Input
// //                         type="email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         placeholder="admin@email.com"
// //                         className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm text-gray-400 mb-1 block">Password</label>
// //                     <div className="relative">
// //                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
// //                       <Input
// //                         type={showPassword ? 'text' : 'password'}
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         placeholder="Enter password"
// //                         className="bg-gray-900 border-gray-700 text-white pl-10 pr-10 h-11"
// //                         required
// //                       />
// //                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
// //                         {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
// //                       </button>
// //                     </div>
// //                     <button
// //                       type="button"
// //                       onClick={() => setStep('forgot-email')}
// //                       className="text-orange-400 hover:text-orange-300 text-xs mt-1"
// //                     >
// //                       Forgot password?
// //                     </button>
// //                   </div>
// //                   <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
// //                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
// //                     Send OTP
// //                   </Button>
// //                 </motion.form>
// //               )}

// //               {/* OTP Verification */}
// //               {step === 'otp' && (
// //                 <motion.form
// //                   key="otp"
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   onSubmit={handleVerifyOTP}
// //                   className="space-y-4"
// //                 >
// //                   <div className="text-center mb-2">
// //                     <h2 className="text-white font-semibold text-lg">Verify OTP</h2>
// //                     <p className="text-gray-400 text-xs">Sent to {email}</p>
// //                   </div>
// //                   <Input
// //                     type="text"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                     placeholder="000000"
// //                     className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14"
// //                     maxLength={6}
// //                     autoFocus
// //                   />
// //                   <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
// //                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
// //                     Verify & Login
// //                   </Button>
// //                   <button type="button" onClick={() => setStep('login')} className="w-full text-sm text-gray-400 hover:text-orange-400">
// //                     ← Back to login
// //                   </button>
// //                 </motion.form>
// //               )}

// //               {/* Forgot Password - Email */}
// //               {step === 'forgot-email' && (
// //                 <motion.form
// //                   key="forgot-email"
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   onSubmit={handleForgotEmail}
// //                   className="space-y-4"
// //                 >
// //                   <div className="text-center mb-2">
// //                     <h2 className="text-white font-semibold text-lg">Forgot Password</h2>
// //                     <p className="text-gray-400 text-xs">Enter your admin email</p>
// //                   </div>
// //                   <div className="relative">
// //                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
// //                     <Input
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       placeholder="admin@email.com"
// //                       className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
// //                       required
// //                     />
// //                   </div>
// //                   <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
// //                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
// //                     Send Reset OTP
// //                   </Button>
// //                   <button type="button" onClick={() => setStep('login')} className="w-full text-sm text-gray-400 hover:text-orange-400">
// //                     ← Back to login
// //                   </button>
// //                 </motion.form>
// //               )}

// //               {/* Forgot Password - OTP */}
// //               {step === 'forgot-otp' && (
// //                 <motion.form
// //                   key="forgot-otp"
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   onSubmit={handleForgotVerifyOTP}
// //                   className="space-y-4"
// //                 >
// //                   <div className="text-center mb-2">
// //                     <h2 className="text-white font-semibold text-lg">Verify OTP</h2>
// //                     <p className="text-gray-400 text-xs">OTP sent to {email}</p>
// //                   </div>
// //                   <Input
// //                     type="text"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                     placeholder="000000"
// //                     className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14"
// //                     maxLength={6}
// //                     autoFocus
// //                   />
// //                   <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
// //                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
// //                     Verify OTP
// //                   </Button>
// //                 </motion.form>
// //               )}

// //               {/* Reset Password */}
// //               {step === 'reset-password' && (
// //                 <motion.form
// //                   key="reset"
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   onSubmit={handleResetPassword}
// //                   className="space-y-4"
// //                 >
// //                   <div className="text-center mb-2">
// //                     <h2 className="text-white font-semibold text-lg">Set New Password</h2>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm text-gray-400 mb-1 block">New Password</label>
// //                     <div className="relative">
// //                       <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
// //                       <Input
// //                         type="password"
// //                         value={newPassword}
// //                         onChange={(e) => setNewPassword(e.target.value)}
// //                         placeholder="Min 6 characters"
// //                         className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
// //                         required
// //                         minLength={6}
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
// //                     <Input
// //                       type="password"
// //                       value={confirmPassword}
// //                       onChange={(e) => setConfirmPassword(e.target.value)}
// //                       placeholder="Confirm new password"
// //                       className="bg-gray-900 border-gray-700 text-white h-11"
// //                       required
// //                     />
// //                     {newPassword && confirmPassword && (
// //                       <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
// //                         {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Do not match'}
// //                       </p>
// //                     )}
// //                   </div>
// //                   <Button
// //                     type="submit"
// //                     disabled={loading || newPassword !== confirmPassword || newPassword.length < 6}
// //                     className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11"
// //                   >
// //                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
// //                     Reset Password
// //                   </Button>
// //                 </motion.form>
// //               )}
// //             </AnimatePresence>
// //           </CardContent>
// //         </Card>

// //         <p className="text-center text-gray-500 text-xs mt-4">🔒 Secure admin access only</p>
// //       </motion.div>
// //     </div>
// //   )
// // }




// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { 
//   Shield, Mail, Lock, Loader2, Eye, EyeOff, 
//   Trophy, Check, Key, RefreshCw
// } from 'lucide-react'
// import { toast } from 'sonner'

// type Step = 'login' | 'otp' | 'forgot-email' | 'forgot-otp' | 'reset-password'

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const [step, setStep] = useState<Step>('login')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [otp, setOtp] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')

//   // Persist state to localStorage (survives page reload when switching apps)
//   useEffect(() => {
//     const state = { email, step }
//     localStorage.setItem('admin_login_state', JSON.stringify(state))
//   }, [email, step])

//   // Restore state on mount
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem('admin_login_state')
//       if (saved) {
//         const state = JSON.parse(saved)
//         if (state.email) setEmail(state.email)
//         if (state.step && state.step !== 'login') setStep(state.step)
//       }
//     } catch {}
//   }, [])

//   const clearLoginState = () => {
//     localStorage.removeItem('admin_login_state')
//   }

//   // Resend OTP
//   const handleResendOTP = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         toast.success('New OTP sent to your email')
//       } else {
//         toast.error(data.error || 'Failed to resend OTP')
//       }
//     } catch {
//       toast.error('Failed to resend OTP')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Step 1: Login - Send OTP
//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email || !password) {
//       toast.error('Please enter email and password')
//       return
//     }
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         setStep('otp')
//         toast.success('OTP sent to your email')
//       } else {
//         toast.error(data.error || 'Invalid credentials')
//       }
//     } catch {
//       toast.error('Failed to send OTP')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Step 2: Verify OTP
//   // const handleVerifyOTP = async (e: React.FormEvent) => {
//   //   e.preventDefault()
//   //   if (!otp || otp.length !== 6) {
//   //     toast.error('Please enter valid 6-digit OTP')
//   //     return
//   //   }
//   //   setLoading(true)
//   //   try {
//   //     const res = await fetch('/api/admin/verify-otp', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email, otp }),
//   //     })
//   //     const data = await res.json()
//   //     if (data.success) {
//   //       clearLoginState()
//   //       document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Strict; Secure`
//   //       toast.success('Login successful!')
//   //       router.push('/admin/dashboard')
//   //     } else {
//   //       toast.error(data.error || 'Invalid OTP')
//   //     }
//   //   } catch {
//   //     toast.error('Verification failed')
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }
// //new
// // In handleVerifyOTP function, replace:
// const handleVerifyOTP = async (e: React.FormEvent) => {
//   e.preventDefault()
//   if (!otp || otp.length !== 6) {
//     toast.error('Please enter valid 6-digit OTP')
//     return
//   }
//   setLoading(true)
//   try {
//     const res = await fetch('/api/admin/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     })
//     const data = await res.json()
//     if (data.success) {
//       // Store in BOTH sessionStorage and cookie for maximum compatibility
//       sessionStorage.setItem('admin_token', data.token)
//       document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax`
      
//       clearLoginState()
//       toast.success('Login successful!')
      
//       // Small delay to ensure storage is set
//       setTimeout(() => {
//         router.push('/admin/dashboard')
//       }, 300)
//     } else {
//       toast.error(data.error || 'Invalid OTP')
//     }
//   } catch {
//     toast.error('Verification failed')
//   } finally {
//     setLoading(false)
//   }
// }
//   // Step 3: Forgot Password - Send email
//   const handleForgotEmail = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email) {
//       toast.error('Please enter your email')
//       return
//     }
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         setStep('forgot-otp')
//         toast.success('OTP sent to your email')
//       } else {
//         toast.error(data.error || 'Email not found')
//       }
//     } catch {
//       toast.error('Failed to send OTP')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Step 4: Forgot Password - Verify OTP
//   const handleForgotVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter valid OTP')
//       return
//     }
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/verify-forgot-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         setStep('reset-password')
//         toast.success('OTP verified! Set new password')
//       } else {
//         toast.error(data.error || 'Invalid OTP')
//       }
//     } catch {
//       toast.error('Verification failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Step 5: Reset Password
//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (newPassword !== confirmPassword) {
//       toast.error('Passwords do not match')
//       return
//     }
//     if (newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters')
//       return
//     }
//     setLoading(true)
//     try {
//       const res = await fetch('/api/admin/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, newPassword, otp }),
//       })
//       const data = await res.json()
//       if (data.success) {
//         toast.success('Password reset successfully! Please login.')
//         clearLoginState()
//         setStep('login')
//         setPassword('')
//         setNewPassword('')
//         setConfirmPassword('')
//         setOtp('')
//       } else {
//         toast.error(data.error || 'Failed to reset password')
//       }
//     } catch {
//       toast.error('Failed to reset password')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md"
//       >
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <motion.div
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.6 }}
//             className="inline-block mb-4"
//           >
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//           </motion.div>
//           <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
//           <p className="text-gray-400 text-sm mt-1">Volleyball Tournament 2026</p>
//         </div>

//         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
//           <CardContent className="p-6">
//             <AnimatePresence mode="wait">
              
//               {/* Login Form */}
//               {step === 'login' && (
//                 <motion.form
//                   key="login"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   onSubmit={handleSendOTP}
//                   className="space-y-4"
//                 >
//                   <div className="text-center mb-2">
//                     <h2 className="text-white font-semibold text-lg">Sign In</h2>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-400 mb-1 block">Email</label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="admin@email.com"
//                         className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
//                         required
//                         autoComplete="email"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-400 mb-1 block">Password</label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       <Input
//                         type={showPassword ? 'text' : 'password'}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter password"
//                         className="bg-gray-900 border-gray-700 text-white pl-10 pr-10 h-11"
//                         required
//                         autoComplete="current-password"
//                       />
//                       <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
//                         {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
//                       </button>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => { setStep('forgot-email'); setOtp('') }}
//                       className="text-orange-400 hover:text-orange-300 text-xs mt-1"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                   <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
//                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
//                     Send OTP
//                   </Button>
//                 </motion.form>
//               )}

//               {/* OTP Verification */}
//               {step === 'otp' && (
//                 <motion.div
//                   key="otp"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   className="space-y-4"
//                 >
//                   <div className="text-center mb-2">
//                     <h2 className="text-white font-semibold text-lg">Verify OTP</h2>
//                     <p className="text-gray-400 text-xs">
//                       A 6-digit code was sent to <span className="text-orange-400">{email}</span>
//                     </p>
//                     <p className="text-gray-500 text-[10px] mt-1">
//                       Check your Gmail app (including spam folder)
//                     </p>
//                   </div>
                  
//                   <form onSubmit={handleVerifyOTP} className="space-y-4">
//                     <Input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       placeholder="000000"
//                       className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14"
//                       maxLength={6}
//                       autoFocus
//                       inputMode="numeric"
//                       autoComplete="one-time-code"
//                     />
//                     <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
//                       {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
//                       Verify & Login
//                     </Button>
//                   </form>

//                   <div className="flex flex-col gap-2">
//                     <button
//                       type="button"
//                       onClick={handleResendOTP}
//                       disabled={loading}
//                       className="w-full text-sm text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1"
//                     >
//                       <RefreshCw className="w-3 h-3" />
//                       Resend OTP
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => { setStep('login'); setOtp(''); setPassword('') }}
//                       className="w-full text-sm text-gray-400 hover:text-white"
//                     >
//                       ← Back to login
//                     </button>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Forgot Password - Email */}
//               {step === 'forgot-email' && (
//                 <motion.form
//                   key="forgot-email"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   onSubmit={handleForgotEmail}
//                   className="space-y-4"
//                 >
//                   <div className="text-center mb-2">
//                     <h2 className="text-white font-semibold text-lg">Forgot Password</h2>
//                     <p className="text-gray-400 text-xs">Enter your admin email to receive a reset code</p>
//                   </div>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="admin@email.com"
//                       className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
//                       required
//                     />
//                   </div>
//                   <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
//                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
//                     Send Reset OTP
//                   </Button>
//                   <button type="button" onClick={() => setStep('login')} className="w-full text-sm text-gray-400 hover:text-white">
//                     ← Back to login
//                   </button>
//                 </motion.form>
//               )}

//               {/* Forgot Password - OTP */}
//               {step === 'forgot-otp' && (
//                 <motion.div
//                   key="forgot-otp"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   className="space-y-4"
//                 >
//                   <div className="text-center mb-2">
//                     <h2 className="text-white font-semibold text-lg">Verify OTP</h2>
//                     <p className="text-gray-400 text-xs">Code sent to {email}</p>
//                   </div>
                  
//                   <form onSubmit={handleForgotVerifyOTP} className="space-y-4">
//                     <Input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       placeholder="000000"
//                       className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14"
//                       maxLength={6}
//                       autoFocus
//                       inputMode="numeric"
//                       autoComplete="one-time-code"
//                     />
//                     <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
//                       {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
//                       Verify OTP
//                     </Button>
//                   </form>

//                   <button
//                     type="button"
//                     onClick={handleResendOTP}
//                     disabled={loading}
//                     className="w-full text-sm text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1"
//                   >
//                     <RefreshCw className="w-3 h-3" />
//                     Resend OTP
//                   </button>
//                 </motion.div>
//               )}

//               {/* Reset Password */}
//               {step === 'reset-password' && (
//                 <motion.form
//                   key="reset"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   onSubmit={handleResetPassword}
//                   className="space-y-4"
//                 >
//                   <div className="text-center mb-2">
//                     <h2 className="text-white font-semibold text-lg">Set New Password</h2>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-400 mb-1 block">New Password</label>
//                     <div className="relative">
//                       <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       <Input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="Min 6 characters"
//                         className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
//                         required
//                         minLength={6}
//                         autoComplete="new-password"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
//                     <Input
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="Confirm new password"
//                       className="bg-gray-900 border-gray-700 text-white h-11"
//                       required
//                       autoComplete="new-password"
//                     />
//                     {newPassword && confirmPassword && (
//                       <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
//                         {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Do not match'}
//                       </p>
//                     )}
//                   </div>
//                   <Button
//                     type="submit"
//                     disabled={loading || newPassword !== confirmPassword || newPassword.length < 6}
//                     className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11"
//                   >
//                     {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
//                     Reset Password
//                   </Button>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </CardContent>
//         </Card>

//         <p className="text-center text-gray-500 text-xs mt-4">🔒 Secure admin access only</p>
//       </motion.div>
//     </div>
//   )
// }



'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Shield, Mail, Lock, Loader2, Eye, EyeOff, 
  Check, Key, RefreshCw, ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner'

type Step = 'login' | 'otp' | 'forgot-email' | 'forgot-otp' | 'reset-password'

// Keys for sessionStorage
const STATE_KEY = 'admin_login_state'
const OTP_KEY = 'admin_otp_data'

export default function AdminLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(() => {
    // Restore step from sessionStorage on initial load
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STATE_KEY)
      if (saved) {
        try {
          const state = JSON.parse(saved)
          return state.step || 'login'
        } catch {}
      }
    }
    return 'login'
  })
  
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STATE_KEY)
      if (saved) {
        try {
          const state = JSON.parse(saved)
          return state.email || ''
        } catch {}
      }
    }
    return ''
  })
  
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpExpiry, setOtpExpiry] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(OTP_KEY)
      if (saved) {
        try {
          const data = JSON.parse(saved)
          return data.expiresAt || null
        } catch {}
      }
    }
    return null
  })
  const [countdown, setCountdown] = useState(0)

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    const state = { email, step }
    sessionStorage.setItem(STATE_KEY, JSON.stringify(state))
  }, [email, step])

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (!otpExpiry) return
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))
      setCountdown(remaining)
      if (remaining <= 0) {
        sessionStorage.removeItem(OTP_KEY)
        setOtpExpiry(null)
      }
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [otpExpiry])

  const saveOTPState = useCallback((expiresInSeconds: number = 600) => {
    const expiresAt = Date.now() + expiresInSeconds * 1000
    const otpData = { email, step, expiresAt }
    sessionStorage.setItem(OTP_KEY, JSON.stringify(otpData))
    setOtpExpiry(expiresAt)
  }, [email, step])

  const clearAllState = useCallback(() => {
    sessionStorage.removeItem(STATE_KEY)
    sessionStorage.removeItem(OTP_KEY)
    setOtpExpiry(null)
  }, [])

  // Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('otp')
        saveOTPState(600) // 10 minutes
        toast.success('OTP sent! Check your Gmail', {
          description: 'Switch to Gmail app, copy the code, come back here',
          duration: 5000,
        })
      } else {
        toast.error(data.error || 'Invalid credentials')
      }
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        saveOTPState(600)
        toast.success('New OTP sent!')
      } else {
        toast.error(data.error || 'Failed to resend')
      }
    } catch {
      toast.error('Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit code')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (data.success) {
        clearAllState()
        // Store token for auth check
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('admin_token', data.token)
        }
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax`
        toast.success('Login successful!')
        router.push('/admin/dashboard')
      } else {
        toast.error(data.error || 'Invalid OTP')
      }
    } catch {
      toast.error('Verification failed')
    } finally {
      setLoading(false)
    }
  }

  // Forgot Password - Send email
  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('forgot-otp')
        saveOTPState(600)
        toast.success('Reset code sent to your email')
      } else {
        toast.error(data.error || 'Email not found')
      }
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  // Forgot Password - Verify OTP
  const handleForgotVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast.error('Please enter valid OTP')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/verify-forgot-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('reset-password')
        toast.success('Set your new password')
      } else {
        toast.error(data.error || 'Invalid OTP')
      }
    } catch {
      toast.error('Verification failed')
    } finally {
      setLoading(false)
    }
  }

  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, otp }),
      })
      const data = await res.json()
      if (data.success) {
        clearAllState()
        toast.success('Password reset! Please login.')
        setStep('login')
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setOtp('')
      } else {
        toast.error(data.error || 'Failed to reset password')
      }
    } catch {
      toast.error('Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  // Format countdown
  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Volleyball Tournament 2026</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              
              {/* Login Form */}
              {step === 'login' && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSendOTP}
                  className="space-y-4"
                >
                  <div className="text-center mb-2">
                    <h2 className="text-white font-semibold text-lg">Sign In</h2>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@email.com"
                        className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="bg-gray-900 border-gray-700 text-white pl-10 pr-10 h-11"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setStep('forgot-email'); setOtp('') }}
                      className="text-orange-400 hover:text-orange-300 text-xs mt-1"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Send OTP
                  </Button>
                </motion.form>
              )}

              {/* OTP Verification */}
              {step === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <h2 className="text-white font-semibold text-lg">Enter OTP</h2>
                    <p className="text-gray-400 text-xs mt-1">
                      Code sent to <span className="text-orange-400">{email}</span>
                    </p>
                    <p className="text-gray-500 text-[11px] mt-1">
                      📧 Open Gmail → Copy 6-digit code → Paste here
                    </p>
                    {countdown > 0 && (
                      <p className="text-yellow-400 text-xs mt-1">
                        Code expires in {formatCountdown(countdown)}
                      </p>
                    )}
                  </div>
                  
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14 font-mono"
                      maxLength={6}
                      autoFocus
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                    <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                      Verify & Login
                    </Button>
                  </form>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="w-full text-sm text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Resend OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => { setStep('login'); setOtp(''); setPassword('') }}
                      className="w-full text-sm text-gray-400 hover:text-white"
                    >
                      ← Back to login
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Forgot Password - Email */}
              {step === 'forgot-email' && (
                <motion.form
                  key="forgot-email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleForgotEmail}
                  className="space-y-4"
                >
                  <div className="text-center mb-2">
                    <h2 className="text-white font-semibold text-lg">Forgot Password</h2>
                    <p className="text-gray-400 text-xs">Enter your admin email</p>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@email.com"
                      className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11">
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Send Reset OTP
                  </Button>
                  <button type="button" onClick={() => setStep('login')} className="w-full text-sm text-gray-400 hover:text-white">
                    ← Back to login
                  </button>
                </motion.form>
              )}

              {/* Forgot Password - OTP */}
              {step === 'forgot-otp' && (
                <motion.div
                  key="forgot-otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-2">
                    <h2 className="text-white font-semibold text-lg">Verify OTP</h2>
                    <p className="text-gray-400 text-xs">Code sent to {email}</p>
                  </div>
                  
                  <form onSubmit={handleForgotVerifyOTP} className="space-y-4">
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="bg-gray-900 border-gray-700 text-white text-center text-2xl tracking-[0.5em] h-14 font-mono"
                      maxLength={6}
                      autoFocus
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                    <Button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold h-11">
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                      Verify OTP
                    </Button>
                  </form>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="w-full text-sm text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Resend OTP
                  </button>
                </motion.div>
              )}

              {/* Reset Password */}
              {step === 'reset-password' && (
                <motion.form
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleResetPassword}
                  className="space-y-4"
                >
                  <div className="text-center mb-2">
                    <h2 className="text-white font-semibold text-lg">New Password</h2>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="bg-gray-900 border-gray-700 text-white pl-10 h-11"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="bg-gray-900 border-gray-700 text-white h-11"
                      required
                    />
                    {newPassword && confirmPassword && (
                      <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                        {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Do not match'}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || newPassword !== confirmPassword || newPassword.length < 6}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold h-11"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Reset Password
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-xs mt-4">🔒 Secure admin access only</p>
      </motion.div>
    </div>
  )
}