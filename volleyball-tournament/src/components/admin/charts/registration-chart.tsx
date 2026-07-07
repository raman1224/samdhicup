'use client'

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const RegistrationChart = memo(function RegistrationChart({ data }: { data: any[] }) {
  const chartData = data?.slice(0, 7).map((team) => ({
    name: team.teamName?.substring(0, 12) || 'Unknown',
    players: team._count?.players || 0,
  })).reverse() || []

  if (!chartData.length) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          Recent Registrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tick={{ fontSize: 10 }} />
            <YAxis stroke="#9CA3AF" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="players" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

export default RegistrationChart