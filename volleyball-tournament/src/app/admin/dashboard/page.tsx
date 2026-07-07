import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCards } from '@/components/admin/stats-cards'
import RegistrationChart from '@/components/admin/charts/registration-chart'
import PaymentChart from '@/components/admin/charts/payment-chart'
import DistrictChart from '@/components/admin/charts/district-chart'
import Link from 'next/link'
import { Eye, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  const [
    totalTeams,
    totalPlayers,
    pendingPayments,
    approvedTeams,
    rejectedTeams,
    totalRevenue,
    teamsByDistrict,
    recentRegistrations,
    paymentStats,
  ] = await Promise.all([
    prisma.team.count(),
    prisma.player.count(),
    prisma.team.count({ where: { status: 'pending' } }),
    prisma.team.count({ where: { status: 'approved' } }),
    prisma.team.count({ where: { status: 'rejected' } }),
    prisma.payment.aggregate({
      where: { status: 'approved' },
      _sum: { amount: true },
    }),
    prisma.team.groupBy({
      by: ['district'],
      _count: true,
      orderBy: { _count: { district: 'desc' } },
    }),
    prisma.team.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        payment: true,
        _count: { select: { players: true } },
      },
    }),
    prisma.payment.groupBy({
      by: ['status'],
      _count: true,
    }),
  ])

  return {
    totalTeams,
    totalPlayers,
    pendingPayments,
    approvedTeams,
    rejectedTeams,
    totalRevenue: totalRevenue._sum.amount || 0,
    teamsByDistrict,
    recentRegistrations,
    paymentStats,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-xs sm:text-sm">Tournament management overview</p>
        </div>
        <Link
          href="/admin/dashboard/teams"
          className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1"
        >
          View All Teams <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Stats Cards - Client Component */}
      <StatsCards stats={stats} />

      {/* Charts - Client Components wrapped in Suspense */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense fallback={<div className="h-64 bg-gray-800/50 rounded-lg animate-pulse" />}>
          <RegistrationChart data={stats.recentRegistrations} />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-gray-800/50 rounded-lg animate-pulse" />}>
          <PaymentChart data={stats.paymentStats} />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-80 bg-gray-800/50 rounded-lg animate-pulse" />}>
        <DistrictChart data={stats.teamsByDistrict} />
      </Suspense>

      {/* Recent Teams Table */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm sm:text-base">Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-700">
                  <th className="p-3">Team</th>
                  <th className="p-3 hidden sm:table-cell">Captain</th>
                  <th className="p-3">Players</th>
                  <th className="p-3 hidden md:table-cell">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentRegistrations.map((team) => (
                  <tr key={team.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="p-3 text-white font-medium">{team.teamName}</td>
                    <td className="p-3 text-gray-300 hidden sm:table-cell">{team.captainName}</td>
                    <td className="p-3 text-gray-300">{team._count.players}</td>
                    <td className="p-3 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        team.payment?.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        team.payment?.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {team.payment?.status || 'None'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        team.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        team.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link href={`/admin/dashboard/teams/${team.id}`}>
                        <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}