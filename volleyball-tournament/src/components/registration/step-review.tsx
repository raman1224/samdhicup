'use client'

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import type { RegistrationFormData } from '@/schemas/registration'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
import Image from 'next/image'
import { CheckCircle, Users, CreditCard, Pencil } from 'lucide-react'

interface StepReviewProps {
  onEdit: (step: number) => void
}

const StepReview = memo(function StepReview({ onEdit }: StepReviewProps) {
  const { watch } = useFormContext<RegistrationFormData>()
  const formData = watch()

  const completedPlayers = useMemo(
    () => formData.players.filter(p => p.fullName?.length >= 3),
    [formData.players]
  )

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="text-center py-2">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1.5">
          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
          Review & Confirm
        </Badge>
      </div>

      {/* Team Info */}
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-400" /> Team
            </h3>
            <button onClick={() => onEdit(2)} className="text-orange-400 hover:text-orange-300">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-400 text-xs">Name</span><p className="text-white">{formData.team.teamName || '-'}</p></div>
            <div><span className="text-gray-400 text-xs">Captain</span><p className="text-white">{formData.team.captainName || '-'}</p></div>
            <div><span className="text-gray-400 text-xs">Phone</span><p className="text-white">{formData.team.captainPhone || '-'}</p></div>
            <div><span className="text-gray-400 text-xs">Email</span><p className="text-white truncate">{formData.team.captainEmail || '-'}</p></div>
            <div className="col-span-2"><span className="text-gray-400 text-xs">Address</span><p className="text-white">{formData.team.address || '-'}</p></div>
          </div>
          {formData.team.teamLogo && (
            <Image
              src={getOptimizedImageUrl(formData.team.teamLogo, { width: 80, height: 80 })}
              alt="Logo"
              width={60}
              height={60}
              className="rounded-lg"
            />
          )}
        </CardContent>
      </Card>

      {/* Payment */}
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-400" /> Payment
            </h3>
            <button onClick={() => onEdit(3)} className="text-orange-400 hover:text-orange-300">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-400 text-xs">Method</span><p className="text-white capitalize">{formData.payment.paymentMethod}</p></div>
            <div><span className="text-gray-400 text-xs">Txn ID</span><p className="text-white font-mono">{formData.payment.transactionId || '-'}</p></div>
          </div>
          {formData.payment.screenshot && (
            <Image
              src={getOptimizedImageUrl(formData.payment.screenshot, { width: 400 })}
              alt="Payment"
              width={200}
              height={100}
              className="rounded-lg object-cover"
            />
          )}
        </CardContent>
      </Card>

      {/* Players */}
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" /> Players ({completedPlayers.length}/10)
            </h3>
            <button onClick={() => onEdit(4)} className="text-orange-400 hover:text-orange-300">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {completedPlayers.map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-900/50">
                {p.passportPhoto ? (
                  <Image src={getOptimizedImageUrl(p.passportPhoto, { width: 40, height: 40 })} alt="" width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-500">{i + 1}</div>
                )}
                <div className="min-w-0">
                  <p className="text-white text-xs font-medium truncate">{p.fullName}</p>
                  <p className="text-gray-400 text-[10px]">{p.position?.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default StepReview