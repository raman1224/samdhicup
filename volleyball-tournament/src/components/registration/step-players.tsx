// 'use client'

// import { memo, useState, useCallback, useMemo } from 'react'
// import { motion } from 'framer-motion'
// import { useFormContext } from 'react-hook-form'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Progress } from '@/components/ui/progress'
// import { Badge } from '@/components/ui/badge'
// import { PlayerCard } from './player-card'
// import { Users, CheckCircle } from 'lucide-react'

// const StepPlayers = memo(function StepPlayers() {
//   const { watch } = useFormContext()
//   const [expandedPlayer, setExpandedPlayer] = useState<number | null>(0)
//   const players = watch('players') || []

//   const handleToggle = useCallback((index: number) => {
//     setExpandedPlayer(prev => prev === index ? null : index)
//   }, [])

//   const playerStats = useMemo(() => {
//     const total = players.length
//     const completed = players.filter((p: any) => 
//       p.fullName && p.position && p.dateOfBirth && p.phoneNumber
//     ).length
//     const withJersey = players.filter((p: any) => p.jerseyNumber && p.jerseyName).length
    
//     return {
//       total,
//       completed,
//       withJersey,
//       progress: (completed / total) * 100
//     }
//   }, [players])

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-6"
//     >
//       <Card className="bg-gray-800/50 border-gray-700">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-white flex items-center gap-2">
//               <Users className="w-5 h-5 text-purple-400" />
//               Player Registration
//             </CardTitle>
//             <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
//               {playerStats.completed}/{playerStats.total} Complete
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Progress Overview */}
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-400">Progress</span>
//               <span className="text-purple-400">{Math.round(playerStats.progress)}%</span>
//             </div>
//             <Progress value={playerStats.progress} className="h-2 bg-gray-700" />
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div className="p-3 bg-gray-900/50 rounded-lg">
//               <div className="text-2xl font-bold text-white">{playerStats.total}</div>
//               <div className="text-xs text-gray-400">Total Players</div>
//             </div>
//             <div className="p-3 bg-gray-900/50 rounded-lg">
//               <div className="text-2xl font-bold text-green-400">{playerStats.completed}</div>
//               <div className="text-xs text-gray-400">Completed</div>
//             </div>
//             <div className="p-3 bg-gray-900/50 rounded-lg">
//               <div className="text-2xl font-bold text-orange-400">{playerStats.withJersey}</div>
//               <div className="text-xs text-gray-400">With Jersey</div>
//             </div>
//           </div>

//           {/* Player Cards */}
//           <div className="space-y-3">
//             {players.map((_: any, index: number) => (
//               <PlayerCard
//                 key={index}
//                 index={index}
//                 isExpanded={expandedPlayer === index}
//                 onToggle={() => handleToggle(index)}
//               />
//             ))}
//           </div>

//           {/* Minimum Players Warning */}
//           {playerStats.completed < 10 && (
//             <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
//               <p className="text-sm text-yellow-400">
//                 ⚠️ Minimum 10 players required. {10 - playerStats.completed} more players needed.
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// })

// export default StepPlayers



'use client'

import { memo, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import type { RegistrationFormData } from '@/schemas/registration'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { PlayerCard } from './player-card'
import { Users } from 'lucide-react'

const StepPlayers = memo(function StepPlayers() {
  const { watch } = useFormContext<RegistrationFormData>()
  const [expandedPlayer, setExpandedPlayer] = useState<number | null>(0)
  const players = watch('players')

  const handleToggle = useCallback((index: number) => {
    setExpandedPlayer(prev => prev === index ? null : index)
  }, [])

  const stats = useMemo(() => {
    const completed = players.filter(p => 
      p.fullName?.length >= 3 && p.position && p.phoneNumber?.length === 10
    ).length
    const withPhoto = players.filter(p => p.passportPhoto).length
    return {
      completed,
      remaining: 10 - completed,
      withPhoto,
      progress: (completed / 10) * 100,
    }
  }, [players])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Players</h3>
            </div>
            <Badge className={`${
              stats.completed === 10 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
              'bg-purple-500/20 text-purple-400 border-purple-500/30'
            }`}>
              {stats.completed}/10
            </Badge>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400">{Math.round(stats.progress)}%</span>
            </div>
            <Progress value={stats.progress} className="h-1.5 bg-gray-800" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-gray-900/50">
              <div className="text-white font-bold text-lg">10</div>
              <div className="text-gray-500">Required</div>
            </div>
            <div className="p-2 rounded-lg bg-gray-900/50">
              <div className="text-green-400 font-bold text-lg">{stats.completed}</div>
              <div className="text-gray-500">Complete</div>
            </div>
            <div className="p-2 rounded-lg bg-gray-900/50">
              <div className="text-blue-400 font-bold text-lg">{stats.withPhoto}</div>
              <div className="text-gray-500">Photos</div>
            </div>
          </div>

          {/* Player Cards */}
          <div className="space-y-2">
            {players.map((_, index) => (
              <PlayerCard
                key={index}
                index={index}
                isExpanded={expandedPlayer === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {stats.remaining > 0 && (
            <p className="text-yellow-400 text-xs text-center">
              ⚠️ {stats.remaining} more player{stats.remaining > 1 ? 's' : ''} needed
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default StepPlayers