'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import type { RegistrationFormData } from '@/schemas/registration'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ImageUpload } from './image-upload'
import { PaymentQR } from './payment-qr'
import { CreditCard, Receipt, AlertCircle } from 'lucide-react'

const StepPayment = memo(function StepPayment() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<RegistrationFormData>()
  const paymentMethod = watch('payment.paymentMethod')
  const screenshot = watch('payment.screenshot')
  const paymentErrors = errors.payment || {}

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 space-y-5">
          {/* Fee Display */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <p className="text-sm text-gray-400">Registration Fee</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              NPR 7,000
            </p>
            <p className="text-xs text-gray-500 mt-1">Per team • Non-refundable</p>
          </div>

          {/* QR Code Section */}
          <PaymentQR
            onMethodSelect={(method) => setValue('payment.paymentMethod', method)}
            selectedMethod={paymentMethod}
          />

          {/* Transaction Details */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-semibold text-green-400 flex items-center gap-2">
              <Receipt className="w-4 h-4" /> Transaction Details
            </h4>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Transaction ID <span className="text-red-400">*</span>
              </label>
              <Input
                {...register('payment.transactionId')}
                placeholder="Enter transaction reference number"
                className="bg-gray-900/80 border-gray-700 text-white h-11 font-mono"
              />
              {paymentErrors.transactionId && (
                <p className="text-red-400 text-xs mt-1">{paymentErrors.transactionId.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Payment Screenshot <span className="text-red-400">*</span>
              </label>
              <ImageUpload
                label="Upload Screenshot"
                onUpload={(url) => setValue('payment.screenshot', url, { shouldValidate: true })}
                preview={screenshot}
                required
              />
              {paymentErrors.screenshot && (
                <p className="text-red-400 text-xs mt-1">{paymentErrors.screenshot.message}</p>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-400">
              Your registration will be confirmed after payment verification (within 24 hours). 
              Keep your transaction ID safe.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default StepPayment