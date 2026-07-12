'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trophy, Calendar, MapPin, DollarSign, Users, Edit, Save } from 'lucide-react'

export default function TournamentPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-orange-400" />
          Tournament Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage tournament details for 2083</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Current Tournament</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Name" value="Volleyball Championship 2083" />
          <InfoRow label="Year" value="2083" />
          <InfoRow label="Status" value="Active" badge="bg-green-500/20 text-green-400" />
          <InfoRow label="Registration Fee" value="NPR 7,000" />
          <InfoRow label="Prize Pool" value="NPR 1,40,000" />
          <InfoRow label="Start Date" value="Ashoj 29, 2083" />
          <InfoRow label="End Date" value="Kartik 02, 2083" />
          <InfoRow label="Venue" value="Chauri Deurali, Kavrapalanchok" />
          <InfoRow label="Max Teams" value="32" />
          <InfoRow label="Players per Team" value="10" />
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({ label, value, badge }: { label: string; value: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700/50">
      <span className="text-gray-400 text-sm">{label}</span>
      {badge ? (
        <Badge className={badge}>{value}</Badge>
      ) : (
        <span className="text-white text-sm font-medium">{value}</span>
      )}
    </div>
  )
}