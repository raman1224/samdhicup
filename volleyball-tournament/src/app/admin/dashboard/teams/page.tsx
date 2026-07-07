import { Suspense } from 'react'
import  prisma  from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Users, Eye, Search, Download, Filter } from 'lucide-react'
import Image from 'next/image'
import { getOptimizedImageUrl } from '@/lib/cloudinary-client'

export const dynamic = 'force-dynamic'

async function getTeams() {
  return prisma.team.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      payment: true,
      _count: { select: { players: true } },
    },
  })
}

export default async function TeamsPage() {
  const teams = await getTeams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Teams</h1>
          <p className="text-gray-400 text-sm">{teams.length} registered teams</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-white">
            <Filter className="w-4 h-4 mr-1" /> Filter
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <Download className="w-4 h-4 mr-1" /> Export All
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: teams.length, color: 'text-blue-400' },
          { label: 'Approved', value: teams.filter(t => t.status === 'approved').length, color: 'text-green-400' },
          { label: 'Pending', value: teams.filter(t => t.status === 'pending').length, color: 'text-yellow-400' },
          { label: 'Rejected', value: teams.filter(t => t.status === 'rejected').length, color: 'text-red-400' },
        ].map(stat => (
          <Card key={stat.label} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  {team.teamLogo ? (
                    <Image
                      src={getOptimizedImageUrl(team.teamLogo, { width: 50, height: 50 })}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-sm truncate">{team.teamName}</h3>
                    <p className="text-gray-500 text-xs">{team.registrationId}</p>
                  </div>
                </div>
                <Badge className={`flex-shrink-0 ${
                  team.status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  team.status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {team.status}
                </Badge>
              </div>

              <div className="space-y-1 text-xs text-gray-400 mb-3">
                <p>👤 {team.captainName}</p>
                <p>📞 {team.captainPhone}</p>
                <p>📍 {team.district}, {team.municipality}</p>
                <div className="flex items-center gap-2">
                  <span>👥 {team._count.players} players</span>
                  {team.payment && (
                    <Badge className={
                      team.payment.status === 'approved' ? 'bg-green-500/10 text-green-400 text-[10px]' :
                      'bg-yellow-500/10 text-yellow-400 text-[10px]'
                    }>
                      💰 {team.payment.status}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/dashboard/teams/${team.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-gray-600 text-white text-xs hover:bg-gray-700">
                    <Eye className="w-3 h-3 mr-1" /> View Details
                  </Button>
                </Link>
                <a href={`mailto:${team.captainEmail}`}>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs">
                    ✉️
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="text-center py-20">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No teams registered yet</p>
          <p className="text-gray-600 text-sm">Teams will appear here after registration</p>
        </div>
      )}
    </div>
  )
}