'use client'

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CreditCard } from 'lucide-react'

const COLORS: Record<string, string> = {
  approved: '#22C55E',
  pending: '#EAB308',
  rejected: '#EF4444',
}

const PaymentChart = memo(function PaymentChart({ data }: { data: { status: string; _count: number }[] }) {
  const chartData = data?.map((item) => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item._count,
  })) || []

  if (!chartData.length) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No payment data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          Payment Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()] || '#6B7280'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[entry.name.toLowerCase()] || '#6B7280' }}
              />
              <span className="text-gray-400">{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

export default PaymentChart