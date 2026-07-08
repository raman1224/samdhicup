
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