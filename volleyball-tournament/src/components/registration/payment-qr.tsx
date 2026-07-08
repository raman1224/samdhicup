'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Smartphone, Building2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface PaymentQRProps {
  onMethodSelect: (method: 'esewa' | 'bank') => void
  selectedMethod: string
}

export function PaymentQR({ onMethodSelect, selectedMethod }: PaymentQRProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        toast.success('Copied to clipboard!')
      } catch {
        toast.error('Failed to copy')
      }
      document.body.removeChild(textArea)
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Method Selection */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onMethodSelect('esewa')}
          className={`p-4 rounded-xl border-2 transition-all text-center ${
            selectedMethod === 'esewa'
              ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/10'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
          }`}
        >
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-sm font-semibold text-white">eSewa</div>
          <div className="text-[10px] text-gray-400">Mobile Wallet</div>
          {selectedMethod === 'esewa' && (
            <Badge className="mt-2 bg-green-500/20 text-green-400 text-[10px] border-0">
              Selected
            </Badge>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onMethodSelect('bank')}
          className={`p-4 rounded-xl border-2 transition-all text-center ${
            selectedMethod === 'bank'
              ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
          }`}
        >
          <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-sm font-semibold text-white">Bank Transfer</div>
          <div className="text-[10px] text-gray-400">Direct Deposit</div>
          {selectedMethod === 'bank' && (
            <Badge className="mt-2 bg-blue-500/20 text-blue-400 text-[10px] border-0">
              Selected
            </Badge>
          )}
        </motion.button>
      </div>

      {/* Payment Details */}
      <motion.div
        key={selectedMethod}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {selectedMethod === 'esewa' ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-4">
              {/* QR Code */}
              <div className="flex justify-center">
                <motion.div
                  className="bg-white p-3 rounded-2xl inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Image
                    src="/images/esewa-qr.jpeg"
                    alt="eSewa QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg"
                    priority
                  />
                </motion.div>
              </div>

              {/* Number */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">eSewa Number</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-white font-mono text-lg font-bold">9803977546</p>
                    <p className="text-gray-400 text-xs">Bishal Tolami</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard('9803977546', 'esewa-number')}
                    className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedField === 'esewa-number' ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* ⚠️ IMPORTANT REMINDER */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-400">
                  <p className="font-semibold mb-1">⚠️ Important Reminder:</p>
                  <p>After payment, <strong>copy the Transaction ID</strong> from your eSewa app and <strong>take a screenshot</strong> of the payment confirmation. You will need both in the next step!</p>
                </div>
              </div>

              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 w-full justify-center py-2 text-sm">
                Amount: NPR 7,000
              </Badge>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 space-y-3">
              {[
                { label: 'Bank Name', value: 'Global IME Bank' },
                { label: 'Account Name', value: 'Bishal Tolami' },
                { label: 'Account Number', value: 'XXXXXXXXX', field: 'bank-account' },
                { label: 'Branch', value: 'Kathmandu Branch' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-[10px] text-gray-500">{item.label}</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 bg-gray-900 rounded-lg border border-gray-700">
                      <p className={`text-white ${item.field ? 'font-mono' : ''} text-sm`}>
                        {item.value}
                      </p>
                    </div>
                    {item.field && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(item.value, item.field!)}
                        className="p-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        {copiedField === item.field ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}

              {/* ⚠️ IMPORTANT REMINDER */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-400">
                  <p className="font-semibold mb-1">⚠️ Important Reminder:</p>
                  <p>After transferring, <strong>copy the Transaction Reference Number</strong> from your bank app and <strong>take a screenshot</strong> of the confirmation. You will need both in the next step!</p>
                </div>
              </div>

              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 w-full justify-center py-2 text-sm mt-2">
                Amount: NPR 7,000
              </Badge>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}