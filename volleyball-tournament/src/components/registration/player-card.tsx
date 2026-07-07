

// 'use client'

// import { memo } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useFormContext } from 'react-hook-form'
// import type { RegistrationFormData } from '@/schemas/registration'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
// import { ImageUpload } from './image-upload'
// import { Check, ChevronDown, User, Phone, Calendar, MapPin, Shirt, Camera } from 'lucide-react'

// interface PlayerCardProps {
//   index: number
//   isExpanded: boolean
//   onToggle: () => void
// }

// const positions = [
//   { value: 'setter', label: 'Setter' },
//   { value: 'libero', label: 'Libero' },
//   { value: 'middle_blocker', label: 'Middle Blocker' },
//   { value: 'outside_hitter', label: 'Outside Hitter' },
//   { value: 'opposite_hitter', label: 'Opposite Hitter' },
// ] as const

// const jerseySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const

// export const PlayerCard = memo(function PlayerCard({ index, isExpanded, onToggle }: PlayerCardProps) {
//   const { register, watch, setValue } = useFormContext<RegistrationFormData>()
//   const player = watch(`players.${index}`)
  
//   const isComplete = !!(player?.fullName?.length >= 3 && player?.position && player?.phoneNumber?.length === 10)

//   return (
//     <Card className={`bg-gray-900/30 border transition-all ${
//       isExpanded ? 'border-orange-500/50' : isComplete ? 'border-green-500/30' : 'border-gray-700/50'
//     }`}>
//       {/* Header */}
//       <button
//         type="button"
//         onClick={onToggle}
//         className="w-full p-3 flex items-center justify-between hover:bg-gray-800/30 transition-colors rounded-t-lg text-left"
//       >
//         <div className="flex items-center gap-2 min-w-0">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//             isComplete ? 'bg-green-500/20' : 'bg-gray-700/50'
//           }`}>
//             {isComplete ? <Check className="w-4 h-4 text-green-400" /> : index + 1}
//           </div>
//           <div className="min-w-0">
//             <p className="text-white text-sm font-medium truncate">
//               {player?.fullName || `Player ${index + 1}`}
//             </p>
//             <div className="flex items-center gap-1.5 mt-0.5">
//               {player?.position && (
//                 <Badge className="bg-orange-500/20 text-orange-400 text-[10px] border-0 px-1.5 py-0">
//                   {player.position.replace('_', ' ')}
//                 </Badge>
//               )}
//               {player?.jerseyNumber && (
//                 <span className="text-[10px] text-gray-500">#{player.jerseyNumber}</span>
//               )}
//             </div>
//           </div>
//         </div>
//         <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         </motion.div>
//       </button>

//       {/* Content */}
//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="overflow-hidden"
//           >
//             <CardContent className="p-4 pt-0 space-y-4">
//               {/* Personal Info */}
//               <div className="space-y-3">
//                 <h4 className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
//                   <User className="w-3.5 h-3.5" /> Personal Info
//                 </h4>
                
//                 <div>
//                   <Input
//                     {...register(`players.${index}.fullName`)}
//                     placeholder="Full Name *"
//                     className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
//                     <Input
//                       type="date"
//                       {...register(`players.${index}.dateOfBirth`)}
//                       className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm pl-9"
//                     />
//                   </div>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
//                     <Input
//                       {...register(`players.${index}.phoneNumber`)}
//                       placeholder="98XXXXXXXX *"
//                       className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm pl-9"
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-500" />
//                   <Input
//                     {...register(`players.${index}.address`)}
//                     placeholder="Address *"
//                     className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm pl-9"
//                   />
//                 </div>

//                 <div>
//                   <select
//                     {...register(`players.${index}.position`)}
//                     className="w-full h-10 bg-gray-900/80 border border-gray-700 text-white rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="">Select Position *</option>
//                     {positions.map(p => (
//                       <option key={p.value} value={p.value}>{p.label}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Jersey Details */}
//               <div className="space-y-3">
//                 <h4 className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
//                   <Shirt className="w-3.5 h-3.5" /> Jersey (Optional)
//                 </h4>
//                 <div className="grid grid-cols-3 gap-2">
//                   <Input
//                     type="number"
//                     {...register(`players.${index}.jerseyNumber`, { valueAsNumber: true })}
//                     placeholder="#"
//                     className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm"
//                   />
//                   <Input
//                     {...register(`players.${index}.jerseyName`)}
//                     placeholder="Name"
//                     className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm"
//                   />
//                   <select
//                     {...register(`players.${index}.jerseySize`)}
//                     className="w-full h-10 bg-gray-900/80 border border-gray-700 text-white rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     {jerseySizes.map(s => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Photo Upload */}
//               <div className="space-y-2">
//                 <h4 className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
//                   <Camera className="w-3.5 h-3.5" /> Photo *
//                 </h4>
//                 <ImageUpload
//                   label="Passport Photo"
//                   onUpload={(url) => setValue(`players.${index}.passportPhoto`, url)}
//                   preview={player?.passportPhoto}
//                   required
//                 />
//               </div>
//             </CardContent>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Card>
//   )
// })


'use client'

import { memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import type { RegistrationFormData } from '@/schemas/registration'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from './image-upload'
import { Check, ChevronDown, User, Phone, Calendar, MapPin, Shirt, Camera, AlertCircle } from 'lucide-react'

interface PlayerCardProps {
  index: number
  isExpanded: boolean
  onToggle: () => void
}

const positions = [
  { value: 'setter', label: 'Setter' },
  { value: 'libero', label: 'Libero' },
  { value: 'middle_blocker', label: 'Middle Blocker' },
  { value: 'outside_hitter', label: 'Outside Hitter' },
  { value: 'opposite_hitter', label: 'Opposite Hitter' },
] as const

const jerseySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const

export const PlayerCard = memo(function PlayerCard({ index, isExpanded, onToggle }: PlayerCardProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<RegistrationFormData>()
  const player = watch(`players.${index}`)
  
  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    if (!dob) return 0
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // Auto-calculate age when DOB changes
  useEffect(() => {
    if (player?.dateOfBirth) {
      const age = calculateAge(player.dateOfBirth)
      setValue(`players.${index}.age`, age)
    }
  }, [player?.dateOfBirth, index, setValue])

  const isComplete = !!(
    player?.fullName?.length >= 3 && 
    player?.position && 
    player?.phoneNumber?.length === 10 &&
    player?.dateOfBirth &&
    player?.address?.length >= 5 &&
    player?.passportPhoto
  )

  // Get errors for this player
  const playerErrors = errors.players?.[index] || {}
  const age = player?.dateOfBirth ? calculateAge(player.dateOfBirth) : 0
  const isAgeValid = age >= 15 && age <= 50

  return (
    <Card className={`bg-gray-900/30 border transition-all ${
      isExpanded ? 'border-orange-500/50 shadow-lg shadow-orange-500/5' : 
      isComplete ? 'border-green-500/30' : 'border-gray-700/50'
    }`}>
      {/* Header - Click to expand */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-800/30 transition-colors rounded-t-lg text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isComplete ? 'bg-green-500/20' : 'bg-gray-700/50'
          }`}>
            {isComplete ? <Check className="w-4 h-4 text-green-400" /> : index + 1}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {player?.fullName || `Player ${index + 1}`}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {player?.position && (
                <Badge className="bg-orange-500/20 text-orange-400 text-[10px] border-0 px-1.5 py-0">
                  {player.position.replace('_', ' ')}
                </Badge>
              )}
              {player?.jerseyNumber && (
                <span className="text-[10px] text-gray-500">#{player.jerseyNumber}</span>
              )}
              {player?.dateOfBirth && (
                <span className="text-[10px] text-gray-500">
                  Age: {age} {!isAgeValid && <span className="text-red-400">(invalid)</span>}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      {/* Expanded Form */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="p-4 pt-0 space-y-4">
              {/* Personal Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Personal Info
                </h4>
                
                {/* Full Name */}
                <div>
                  <Input
                    {...register(`players.${index}.fullName`)}
                    placeholder="Full Name *"
                    className={`bg-gray-900/80 border text-white h-10 text-sm ${
                      playerErrors.fullName ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {playerErrors.fullName && (
                    <p className="text-red-400 text-[10px] mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {playerErrors.fullName.message}
                    </p>
                  )}
                  {/* Duplicate name check */}
                  {player?.fullName && watch('players').filter((p, i) => 
                    i !== index && p.fullName?.toLowerCase() === player.fullName?.toLowerCase()
                  ).length > 0 && (
                    <p className="text-yellow-400 text-[10px] mt-0.5">Name already used by another player</p>
                  )}
                </div>

                {/* DOB + Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 z-10" />
                      <Input
                        type="date"
                        {...register(`players.${index}.dateOfBirth`)}
                        className={`bg-gray-900/80 border text-white h-10 text-sm pl-9 ${
                          playerErrors.dateOfBirth || (player?.dateOfBirth && !isAgeValid) ? 'border-red-500' : 'border-gray-700'
                        }`}
                      />
                    </div>
                    {playerErrors.dateOfBirth && (
                      <p className="text-red-400 text-[10px] mt-0.5">{playerErrors.dateOfBirth.message}</p>
                    )}
                    {player?.dateOfBirth && !isAgeValid && (
                      <p className="text-red-400 text-[10px] mt-0.5">Must be 15-50 years old (current: {age})</p>
                    )}
                    {player?.dateOfBirth && isAgeValid && (
                      <p className="text-green-400 text-[10px] mt-0.5">Age: {age} years ✓</p>
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 z-10" />
                      <Input
                        {...register(`players.${index}.phoneNumber`)}
                        placeholder="98XXXXXXXX *"
                        className={`bg-gray-900/80 border text-white h-10 text-sm pl-9 ${
                          playerErrors.phoneNumber ? 'border-red-500' : 'border-gray-700'
                        }`}
                      />
                    </div>
                    {playerErrors.phoneNumber && (
                      <p className="text-red-400 text-[10px] mt-0.5">{playerErrors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-500 z-10" />
                    <Input
                      {...register(`players.${index}.address`)}
                      placeholder="Address *"
                      className={`bg-gray-900/80 border text-white h-10 text-sm pl-9 ${
                        playerErrors.address ? 'border-red-500' : 'border-gray-700'
                      }`}
                    />
                  </div>
                  {playerErrors.address && (
                    <p className="text-red-400 text-[10px] mt-0.5">{playerErrors.address.message}</p>
                  )}
                </div>

                {/* Position */}
                <div>
                  <select
                    {...register(`players.${index}.position`)}
                    className={`w-full h-10 bg-gray-900/80 border text-white rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      playerErrors.position ? 'border-red-500' : 'border-gray-700'
                    }`}
                  >
                    <option value="">Select Position *</option>
                    {positions.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  {playerErrors.position && (
                    <p className="text-red-400 text-[10px] mt-0.5">{playerErrors.position.message}</p>
                  )}
                </div>
              </div>

              {/* Jersey Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5" /> Jersey (Optional)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Input
                      type="number"
                      {...register(`players.${index}.jerseyNumber`, { valueAsNumber: true })}
                      placeholder="#"
                      className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm"
                    />
                    {/* Duplicate jersey number check */}
                    {player?.jerseyNumber && watch('players').filter((p, i) => 
                      i !== index && p.jerseyNumber === player.jerseyNumber && player.jerseyNumber !== null
                    ).length > 0 && (
                      <p className="text-yellow-400 text-[10px] mt-0.5">Number already taken</p>
                    )}
                  </div>
                  <Input
                    {...register(`players.${index}.jerseyName`)}
                    placeholder="Name"
                    className="bg-gray-900/80 border-gray-700 text-white h-10 text-sm"
                  />
                  <select
                    {...register(`players.${index}.jerseySize`)}
                    className="w-full h-10 bg-gray-900/80 border border-gray-700 text-white rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {jerseySizes.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Photo *
                </h4>
                <ImageUpload
                  label="Passport Photo"
                  onUpload={(url) => setValue(`players.${index}.passportPhoto`, url)}
                  preview={player?.passportPhoto}
                  required
                />
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
})