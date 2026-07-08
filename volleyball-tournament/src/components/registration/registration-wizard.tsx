'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, type RegistrationFormInput } from '@/schemas/registration'  //new
import { useDeviceType } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Users, 
  CreditCard, 
  UserPlus, 
  FileCheck,
  Send,
  Loader2,
  Save,
  Clock,
  Check
} from 'lucide-react'

import StepTournamentInfo from './step-tournament-info'
import StepTeamInfo from './step-team-info'
import StepPayment from './step-payment'
import StepPlayers from './step-players'
import StepReview from './step-review'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'vb-reg-data'
const STORAGE_STEP = 'vb-reg-step'
const STORAGE_COMPLETED = 'vb-reg-completed'

// const defaultValues: RegistrationFormData = {
const defaultValues: RegistrationFormInput = {  //new
  team: {
    teamName: '',
    teamLogo: '',
    captainName: '',
    captainPhone: '',
    captainEmail: '',
    district: '',
    municipality: '',
    address: '',
    motto: '',
    description: '',
  },
  players: Array.from({ length: 10 }, () => ({
    fullName: '',
    dateOfBirth: '',
    age: 18,
    phoneNumber: '',
    address: '',
    position: 'setter' as const,
    jerseyName: '',
    jerseyNumber: null,
    jerseySize: 'M' as const,
    passportPhoto: '',
    citizenshipFront: '',
    citizenshipBack: '',
  })),
  payment: {
    transactionId: '',
    paymentMethod: 'esewa' as const,
    amount: 7000,
    screenshot: '',
  },
}

export default function RegistrationWizard() {
  const { isMobile } = useDeviceType()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [lastSaved, setLastSaved] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
const router = useRouter()
  // Form setup
  // const methods = useForm<RegistrationFormData>({
  const methods = useForm<RegistrationFormInput>({  //new
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { watch, trigger, getValues, reset, formState } = methods
  const { errors, isValid } = formState
  const formData = watch()

  // Check if current step can proceed
  useEffect(() => {
    if (currentStep === 1) {
      setCanProceed(true)
      return
    }

    const team = getValues('team')
    const payment = getValues('payment')
    const players = getValues('players')

    if (currentStep === 2) {
      const teamValid = 
        team.teamName?.length >= 3 &&
        team.captainName?.length >= 3 &&
        team.captainPhone?.length === 10 &&
        team.captainEmail?.includes('@') &&
        team.district?.length > 0 &&
        team.municipality?.length > 0 &&
        team.address?.length >= 5
      setCanProceed(teamValid)
    } else if (currentStep === 3) {
      setCanProceed(
        payment.transactionId?.length >= 5 &&
        payment.screenshot?.length > 0
      )
    } else if (currentStep === 4) {
      const completePlayers = players.filter(p => 
        p.fullName?.length >= 3 && 
        p.position && 
        p.phoneNumber?.length === 10 &&
        p.passportPhoto
      )
      setCanProceed(completePlayers.length >= 10)
    } else {
      setCanProceed(true)
    }
  }, [formData, currentStep, getValues])

  // Load saved data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const savedStep = localStorage.getItem(STORAGE_STEP)
      const savedCompleted = localStorage.getItem(STORAGE_COMPLETED)
      
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed?.team) {
          reset(parsed)
          if (savedStep) setCurrentStep(Number(savedStep) || 1)
          if (savedCompleted) setCompletedSteps(JSON.parse(savedCompleted))
        }
      }
    } catch {}
  }, [reset])

  // Auto-save every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      try {
        const data = getValues()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        localStorage.setItem(STORAGE_STEP, String(currentStep))
        localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedSteps))
        setLastSaved(new Date().toLocaleTimeString())
      } catch {}
    }, 3000)
    return () => clearInterval(timer)
  }, [getValues, currentStep, completedSteps])

  // Save on page leave
  useEffect(() => {
    const saveNow = () => {
      try {
        const data = getValues()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        localStorage.setItem(STORAGE_STEP, String(currentStep))
        localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedSteps))
      } catch {}
    }
    window.addEventListener('beforeunload', saveNow)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveNow()
    })
    return () => {
      window.removeEventListener('beforeunload', saveNow)
    }
  }, [getValues, currentStep, completedSteps])

  // Progress
  const progress = useMemo(() => {
    const team = getValues('team')
    const payment = getValues('payment')
    const players = getValues('players')
    
    let score = 0
    if (team.teamName) score += 10
    if (team.captainName) score += 5
    if (team.captainPhone?.length === 10) score += 5
    if (team.captainEmail?.includes('@')) score += 5
    if (team.district) score += 5
    if (payment.transactionId) score += 10
    if (payment.screenshot) score += 10
    const completePlayers = players.filter(p => p.fullName && p.position && p.phoneNumber?.length === 10)
    score += (completePlayers.length / 10) * 50
    
    return Math.min(Math.round(score), 100)
  }, [formData, getValues])

  // Scroll to top
  const scrollTop = () => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  // Handle Continue
  const handleContinue = useCallback(async () => {
    if (!canProceed) {
      // Show specific error based on step
      if (currentStep === 2) {
        toast.error('Please fill all required team fields (Name, Captain, Phone, Email, District, Address)')
      } else if (currentStep === 3) {
        toast.error('Please upload payment screenshot and enter transaction ID')
      } else if (currentStep === 4) {
        const players = getValues('players')
        const complete = players.filter(p => 
          p.fullName?.length >= 3 && 
          p.position && 
          p.phoneNumber?.length === 10 &&
          p.passportPhoto
        )
        toast.error(`${10 - complete.length} player(s) still need to be completed with photo`)
      }
      return
    }

    setIsValidating(true)
    setCompletedSteps(prev => [...new Set([...prev, currentStep])])
    
    // Small delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 200))
    
    setCurrentStep(prev => Math.min(prev + 1, 5))
    setIsValidating(false)
    scrollTop()
  }, [canProceed, currentStep, getValues])

  // Handle Back
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      scrollTop()
    }
  }, [currentStep])
// Replace the handleSubmit function:
const handleSubmit = useCallback(async () => {
  setIsSubmitting(true)
  
  try {
    const data = getValues()
    
    // Validate all data before sending
    const validated = registrationSchema.safeParse(data)
    if (!validated.success) {
      const firstError = validated.error.issues[0]
      toast.error(firstError?.message || 'Please complete all required fields')
      setIsSubmitting(false)
      return
    }

    // Check if this email already registered
    const emailCheck = await fetch('/api/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: validated.data.team.captainEmail }),
    })
    const emailResult = await emailCheck.json()
    
    if (emailResult.exists) {
      toast.error('This email has already registered a team. Please use a different email.')
      setIsSubmitting(false)
      return
    }

    // Send to API
    const formDataObj = new FormData()
    formDataObj.append('data', JSON.stringify(validated.data))

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formDataObj,
    })

    const result = await res.json()

    if (result.success) {
      // COMPLETELY clear saved data
      localStorage.removeItem('vb-reg-data')
      localStorage.removeItem('vb-reg-step')
      localStorage.removeItem('vb-reg-completed')
      localStorage.removeItem('vb-reg-data_timestamp')
      
      // Reset form to defaults
      reset(defaultValues)
      setCompletedSteps([])
      
      toast.success('Registration submitted! 🎉')
      
      // Redirect to success page
      setTimeout(() => {
        router.push(`/register/success?id=${result.registrationId}`)
      }, 1500)
    } else {
      toast.error(result.error || 'Registration failed. Please try again.')
    }
  } catch (err) {
    console.error('Submit error:', err)
    toast.error('Network error. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}, [getValues, reset, router])



  return (
    <FormProvider {...methods}>
      <div ref={topRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Sticky Header */}
        <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                <div>
                  <h1 className="text-sm font-bold text-white">Register Team</h1>
                  <p className="text-[10px] text-gray-500">Step {currentStep}/5</p>
                </div>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400 text-xs border-orange-500/30">
                {progress}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-1.5 bg-gray-800" />
            
            {/* Step dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    if (s < currentStep || completedSteps.includes(s)) {
                      setCurrentStep(s)
                      scrollTop()
                    }
                  }}
                  className={`w-8 h-1.5 rounded-full transition-all ${
                    currentStep === s ? 'bg-orange-500 w-12' :
                    completedSteps.includes(s) ? 'bg-green-500 cursor-pointer' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {currentStep === 1 && <StepTournamentInfo onNext={() => { setCurrentStep(2); scrollTop() }} />}
              {currentStep === 2 && <StepTeamInfo />}
              {currentStep === 3 && <StepPayment />}
              {currentStep === 4 && <StepPlayers />}
              {currentStep === 5 && <StepReview onEdit={(s) => { setCurrentStep(s); scrollTop() }} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - ONLY ONE SET */}
          <div className="flex gap-3 mt-8 pb-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting || isValidating}
                className="border-gray-700 hover:bg-gray-800 text-white"
                size={isMobile ? 'lg' : 'default'}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            
            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleContinue}
                disabled={!canProceed || isValidating}
                className={`flex-1 font-semibold text-white ${
                  canProceed 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/20' 
                    : 'bg-gray-700 cursor-not-allowed'
                }`}
                size={isMobile ? 'lg' : 'default'}
              >
                {isValidating ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <>
                    {currentStep === 1 ? 'Start Registration' : 'Continue'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-green-500/20"
                size={isMobile ? 'lg' : 'default'}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Submit Registration
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

// date 