'use client'

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MapPin } from 'lucide-react'

const DistrictChart = memo(function DistrictChart({ data }: { data: { district: string; _count: number }[] }) {
  const chartData = data?.slice(0, 10).map((item) => ({
    name: item.district?.length > 12 ? item.district.substring(0, 12) + '...' : item.district,
    teams: item._count,
  })) || []

  if (!chartData.length) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No district data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
          Teams by District
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9CA3AF" fontSize={10} />
            <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="teams" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
})

export default DistrictChart