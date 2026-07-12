import prisma  from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
import { CreditCard, Check, X, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { team: true },
  })
}

export default async function PaymentsPage() {
  const payments = await getPayments()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-green-400" />
          Payments
        </h1>
        <p className="text-gray-400 text-sm mt-1">{payments.length} transactions</p>
      </div>

      <div className="grid gap-4">
        {payments.map((payment) => (
          <Card key={payment.id} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/dashboard/teams/${payment.teamId}`} className="text-white font-semibold hover:text-orange-400">
                      {payment.team?.teamName || 'Unknown Team'}
                    </Link>
                    <Badge className={
                      payment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      payment.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }>
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">Txn: <span className="text-white font-mono">{payment.transactionId}</span></p>
                  <p className="text-gray-400 text-sm">Amount: <span className="text-white">NPR {payment.amount?.toLocaleString()}</span></p>
                  <p className="text-gray-400 text-sm">Method: <span className="text-white capitalize">{payment.paymentMethod}</span></p>
                  <p className="text-gray-500 text-xs">{new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
                
                {payment.screenshot && (
                  <a href={payment.screenshot} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={getOptimizedImageUrl(payment.screenshot, { width: 200 })}
                      alt="Screenshot"
                      width={120}
                      height={80}
                      className="rounded-lg border border-gray-700 hover:border-orange-500 cursor-pointer"
                    />
                  </a>
                )}

                <div className="flex gap-2">
                  {payment.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="w-3 h-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="w-3 h-3 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                  <Link href={`/admin/dashboard/teams/${payment.teamId}`}>
                    <Button size="sm" variant="outline" className="border-gray-700 text-black font-bold">
                      <Eye className="w-3 h-3 mr-1" /> View Team
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {payments.length === 0 && (
          <div className="text-center py-20">
            <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No payments yet</p>
          </div>
        )}
      </div>
    </div>
  )
}