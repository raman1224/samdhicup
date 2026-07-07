// 'use client'

// import { memo, useMemo } from 'react'
// import { motion } from 'framer-motion'
// import { useFormContext } from 'react-hook-form'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator'
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
// import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
// import Image from 'next/image'
// import { 
//   CheckCircle, 
//   Users, 
//   CreditCard, 
//   MapPin,
//   User,
//   Phone,
//   Mail,
//   Shirt,
//   Camera
// } from 'lucide-react'

// const StepReview = memo(function StepReview() {
//   const { watch } = useFormContext()
//   const formData = watch()

//   const teamInfo = useMemo(() => formData?.team || {}, [formData?.team])
//   const paymentInfo = useMemo(() => formData?.payment || {}, [formData?.payment])
//   const players = useMemo(() => formData?.players || [], [formData?.players])

//   const completedPlayers = useMemo(() => 
//     players.filter((p: any) => p?.fullName && p?.position),
//     [players]
//   )

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="space-y-6 max-w-3xl mx-auto"
//     >
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
//         >
//           <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-6 py-2 text-lg">
//             <CheckCircle className="w-4 h-4 mr-2" />
//             Review Your Registration
//           </Badge>
//         </motion.div>
//         <p className="text-gray-400 text-sm">
//           Please verify all information before submitting
//         </p>
//       </div>

//       {/* Team Information */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-white flex items-center gap-2 text-lg">
//               <Users className="w-5 h-5 text-orange-400" />
//               Team Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Team Logo */}
//             {teamInfo.teamLogo && (
//               <div className="flex justify-center mb-4">
//                 <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-700">
//                   <Image
//                     src={getOptimizedImageUrl(teamInfo.teamLogo, { width: 200, height: 200 })}
//                     alt={teamInfo.teamName || 'Team Logo'}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Team Name</span>
//                 <p className="text-white font-semibold">{teamInfo.teamName || '-'}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Captain</span>
//                 <p className="text-white font-semibold">{teamInfo.captainName || '-'}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Phone</span>
//                 <p className="text-white font-semibold">{teamInfo.captainPhone || '-'}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Email</span>
//                 <p className="text-white font-semibold">{teamInfo.captainEmail || '-'}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">District</span>
//                 <p className="text-white font-semibold">{teamInfo.district || '-'}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Municipality</span>
//                 <p className="text-white font-semibold">{teamInfo.municipality || '-'}</p>
//               </div>
//               <div className="sm:col-span-2 space-y-1">
//                 <span className="text-xs text-gray-400">Address</span>
//                 <p className="text-white font-semibold">{teamInfo.address || '-'}</p>
//               </div>
//             </div>

//             {teamInfo.motto && (
//               <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
//                 <span className="text-xs text-gray-400">Motto</span>
//                 <p className="text-orange-400 italic mt-1">{teamInfo.motto}</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Payment Information */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-white flex items-center gap-2 text-lg">
//               <CreditCard className="w-5 h-5 text-green-400" />
//               Payment Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Method</span>
//                 <p className="text-white font-semibold capitalize">
//                   {paymentInfo.paymentMethod === 'esewa' ? 'eSewa' : 'Bank Transfer'}
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Transaction ID</span>
//                 <p className="text-white font-mono font-semibold">
//                   {paymentInfo.transactionId || '-'}
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <span className="text-xs text-gray-400">Amount</span>
//                 <p className="text-white font-semibold">
//                   NPR {paymentInfo.amount?.toLocaleString() || '8,000'}
//                 </p>
//               </div>
//             </div>

//             {paymentInfo.screenshot && (
//               <div className="space-y-2">
//                 <span className="text-xs text-gray-400">Payment Screenshot</span>
//                 <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-700">
//                   <Image
//                     src={getOptimizedImageUrl(paymentInfo.screenshot, { width: 600 })}
//                     alt="Payment Screenshot"
//                     fill
//                     className="object-contain bg-gray-900"
//                   />
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Players */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-white flex items-center gap-2 text-lg">
//                 <Users className="w-5 h-5 text-purple-400" />
//                 Players
//               </CardTitle>
//               <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
//                 {completedPlayers.length}/10
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {players.map((player: any, index: number) => (
//                 player?.fullName && (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.5 + index * 0.03 }}
//                     className="p-3 bg-gray-900/50 rounded-lg border border-gray-700"
//                   >
//                     <div className="flex items-center gap-3">
//                       {/* Player Photo */}
//                       {player.passportPhoto ? (
//                         <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//                           <Image
//                             src={getOptimizedImageUrl(player.passportPhoto, { width: 80, height: 80 })}
//                             alt={player.fullName}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
//                           <User className="w-5 h-5 text-gray-500" />
//                         </div>
//                       )}
                      
//                       <div className="flex-1 min-w-0">
//                         <p className="text-white font-semibold text-sm truncate">
//                           {player.fullName}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <Badge className="bg-orange-500/20 text-orange-400 text-[10px] border-0">
//                             {player.position?.replace('_', ' ')}
//                           </Badge>
//                           {player.jerseyNumber && (
//                             <Badge className="bg-purple-500/20 text-purple-400 text-[10px] border-0">
//                               #{player.jerseyNumber}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )
//               ))}
//             </div>

//             {completedPlayers.length < 10 && (
//               <p className="text-yellow-400 text-sm mt-3 text-center">
//                 ⚠️ {10 - completedPlayers.length} player(s) still need to be completed
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </motion.div>
//   )
// })

// export default StepReview



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