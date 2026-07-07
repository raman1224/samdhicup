'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Trophy, Users, CreditCard, CheckCircle, 
  XCircle, DollarSign 
} from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalTeams: number
    totalPlayers: number
    pendingPayments: number
    approvedTeams: number
    rejectedTeams: number
    totalRevenue: number
  }
}

const cardConfigs = [
  { icon: Trophy, label: 'Total Teams', key: 'totalTeams', color: 'bg-orange-500/20 text-orange-400' },
  { icon: Users, label: 'Total Players', key: 'totalPlayers', color: 'bg-blue-500/20 text-blue-400' },
  { icon: CreditCard, label: 'Pending', key: 'pendingPayments', color: 'bg-yellow-500/20 text-yellow-400' },
  { icon: CheckCircle, label: 'Approved', key: 'approvedTeams', color: 'bg-green-500/20 text-green-400' },
  { icon: XCircle, label: 'Rejected', key: 'rejectedTeams', color: 'bg-red-500/20 text-red-400' },
  { icon: DollarSign, label: 'Revenue', key: 'totalRevenue', color: 'bg-purple-500/20 text-purple-400', format: (v: number) => `रू ${v.toLocaleString()}` },
]

export const StatsCards = memo(function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cardConfigs.map((card, i) => {
        const value = stats[card.key as keyof typeof stats]
        const displayValue = card.format ? card.format(value as number) : value
        
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                  <card.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-white truncate">{displayValue}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
})