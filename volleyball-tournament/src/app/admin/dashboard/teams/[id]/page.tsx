
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
import { 
  Users, Phone, Mail, MapPin, CreditCard, User, Shirt,
  Download, Check, X, ArrowLeft, Loader2, Eye, Trash2,
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function TeamDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [expandedPlayers, setExpandedPlayers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (id) fetchTeam()
  }, [id])

  // const fetchTeam = async () => {
  //   try {
  //     const res = await fetch(`/api/admin/teams/${id}`)
  //     const data = await res.json()
  //     if (data.success) setTeam(data.team)
  //   } catch (err) {
  //     console.error('Failed to fetch team:', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const handleAction = async (action: string, body?: any) => {
  //   setActionLoading(action)
  //   try {
  //     const res = await fetch(`/api/admin/teams/${id}/${action}`, {
  //       method: action === 'delete' ? 'DELETE' : 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: body ? JSON.stringify(body) : undefined,
  //     })
  //     const data = await res.json()
  //     if (data.success) {
  //       toast.success(data.message)
  //       if (action === 'delete') {
  //         router.push('/admin/dashboard/teams')
  //       } else {
  //         fetchTeam()
  //         setShowRejectModal(false)
  //       }
  //     } else {
  //       toast.error(data.error || 'Action failed')
  //     }
  //   } catch {
  //     toast.error('Network error')
  //   } finally {
  //     setActionLoading(null)
  //   }
  // }

  const fetchTeam = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      
      const res = await fetch(`/api/admin/teams/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })
      
      if (!res.ok) {
        if (res.status === 401) {
          toast.error('Session expired. Please login again.')
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch team')
      }
      
      const data = await res.json()
      if (data.success) {
        setTeam(data.team)
      } else {
        toast.error(data.error || 'Failed to load team')
      }
    } catch (err) {
      console.error('Failed to fetch team:', err)
      toast.error('Failed to load team details')
    } finally {
      setLoading(false)
    }
  }
  
  const handleAction = async (action: string, body?: any) => {
    setActionLoading(action)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      
      const res = await fetch(`/api/admin/teams/${id}/${action}`, {
        method: action === 'delete' ? 'DELETE' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
      })
      
      const data = await res.json()
      
      if (data.success) {
        toast.success(data.message)
        
        if (action === 'delete') {
          // Small delay before redirect
          setTimeout(() => {
            router.push('/admin/dashboard/teams')
          }, 500)
        } else {
          // Close modals first
          setShowRejectModal(false)
          setRejectReason('')
          // Refresh team data with small delay to ensure DB updated
          setTimeout(() => {
            fetchTeam()
          }, 300)
        }
      } else {
        toast.error(data.error || 'Action failed')
      }
    } catch (err) {
      console.error('Action error:', err)
      toast.error('Network error. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }
  const togglePlayerExpand = (playerId: string) => {
    setExpandedPlayers(prev => {
      const next = new Set(prev)
      if (next.has(playerId)) next.delete(playerId)
      else next.add(playerId)
      return next
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    )
  }

  if (!team) {
    return (
      <div className="text-center py-20">
        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Team not found</p>
        <Link href="/admin/dashboard/teams" className="text-orange-400 hover:underline mt-2 inline-block">
          Back to Teams
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Back */}
      <Link href="/admin/dashboard/teams" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Back to Teams
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {team.teamLogo ? (
            <Image src={getOptimizedImageUrl(team.teamLogo, { width: 80, height: 80 })} alt="" width={56} height={56} className="rounded-xl object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gray-700 flex items-center justify-center"><Users className="w-7 h-7 text-gray-500" /></div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{team.teamName}</h1>
            <p className="text-gray-400 text-sm">{team.registrationId} • {team.district}</p>
          </div>
        </div>
        <Badge className={`text-base px-4 py-1.5 ${
          team.status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
          team.status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        }`}>
          {team.status.toUpperCase()}
        </Badge>
      </div>

      {/* Captain + Payment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2"><CardTitle className="text-white text-base flex items-center gap-2"><User className="w-4 h-4 text-orange-400" /> Captain</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Name" value={team.captainName} />
            <Row label="Phone" value={team.captainPhone} isPhone />
            <Row label="Email" value={team.captainEmail} isEmail />
            <Row label="Address" value={`${team.address}, ${team.municipality}`} />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2"><CardTitle className="text-white text-base flex items-center gap-2"><CreditCard className="w-4 h-4 text-green-400" /> Payment</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {team.payment ? (
              <>
                <Row label="Txn ID" value={team.payment.transactionId} mono />
                <Row label="Method" value={team.payment.paymentMethod} />
                <Row label="Amount" value={`NPR ${team.payment.amount?.toLocaleString()}`} />
                <div className="flex items-center gap-2"><span className="text-gray-400">Status:</span><Badge className={team.payment.status === 'approved' ? 'bg-green-500/20 text-green-400' : team.payment.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>{team.payment.status}</Badge></div>
                {team.payment.screenshot && (
                  <a href={team.payment.screenshot} target="_blank" rel="noopener noreferrer">
                    <Image src={getOptimizedImageUrl(team.payment.screenshot, { width: 300 })} alt="Screenshot" width={200} height={120} className="rounded-lg border border-gray-700 hover:border-orange-500 mt-2 object-cover" />
                  </a>
                )}
              </>
            ) : <p className="text-gray-500">No payment</p>}
          </CardContent>
        </Card>
      </div>

      {/* Players List */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2"><Users className="w-4 h-4 text-purple-400" /> Players ({team.players?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {team.players?.map((player: any) => {
              const isExpanded = expandedPlayers.has(player.id)
              return (
                <div key={player.id} className="bg-gray-900/50 rounded-lg overflow-hidden">
                  {/* Player Header - Click to expand */}
                  <button
                    onClick={() => togglePlayerExpand(player.id)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-gray-800/30 transition-colors text-left"
                  >
                    {player.passportPhoto ? (
                      <Image src={getOptimizedImageUrl(player.passportPhoto, { width: 40, height: 40 })} alt="" width={36} height={36} className="rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-gray-500" /></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{player.fullName}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <Badge className="bg-orange-500/20 text-orange-400 text-[10px] border-0">{player.position?.replace(/_/g, ' ')}</Badge>
                        {player.jerseyNumber && <Badge className="bg-purple-500/20 text-purple-400 text-[10px] border-0">#{player.jerseyNumber}</Badge>}
                        <span className="text-gray-400 text-[10px]">Age: {player.age}</span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">{isExpanded ? '▲' : '▼'}</span>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm border-t border-gray-800 pt-3">
                      <Detail label="Full Name" value={player.fullName} />
                      <Detail label="Phone" value={player.phoneNumber} />
                      <Detail label="Age" value={player.age?.toString()} />
                      <Detail label="Position" value={player.position?.replace(/_/g, ' ')} />
                      <Detail label="Jersey #" value={player.jerseyNumber?.toString() || '-'} />
                      <Detail label="Jersey Name" value={player.jerseyName || '-'} />
                      <Detail label="Jersey Size" value={player.jerseySize || '-'} />
                      <Detail label="Address" value={player.address || '-'} full />
                      <Detail label="Photo" value={player.passportPhoto ? '✓ Uploaded' : '✗ Missing'} />
                      {player.passportPhoto && (
                        <div className="col-span-2 sm:col-span-3">
                          <Image src={getOptimizedImageUrl(player.passportPhoto, { width: 200 })} alt="Photo" width={100} height={100} className="rounded-lg" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {team.status === 'pending' && (
          <>
            <Button onClick={() => handleAction('approve')} disabled={!!actionLoading} className="bg-green-600 hover:bg-green-700 text-white">
              {actionLoading === 'approve' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
              Approve
            </Button>
            <Button onClick={() => setShowRejectModal(true)} disabled={!!actionLoading} variant="destructive">
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>
          </>
        )}
        <a href={`/api/admin/teams/${id}/pdf`} download>
          <Button variant="outline" className="border-gray-700 text-black font-bold">
            <Download className="w-4 h-4 mr-1" /> Download PDF
          </Button>
        </a>
        <a href={`mailto:${team.captainEmail}`}>
          <Button variant="outline" className="border-gray-700 text-black font-bold">
            <Mail className="w-4 h-4 mr-1" /> Email
          </Button>
        </a>
        <a href={`tel:${team.captainPhone}`}>
          <Button variant="outline" className="border-gray-700 text-black font-bold">
            <Phone className="w-4 h-4 mr-1" /> Call
          </Button>
        </a>
        <Button onClick={() => setShowDeleteConfirm(true)} variant="outline" className="border-red-800 text-red-400 font-bold hover:bg-red-500/10">
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-gray-700">
            <CardHeader><CardTitle className="text-white">Reject Team</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Reason for rejection..." className="bg-gray-800 border-gray-700 text-white" />
              <div className="flex gap-2">
                <Button onClick={() => handleAction('reject', { reason: rejectReason })} disabled={!!actionLoading} variant="destructive" className="flex-1">
                  {actionLoading === 'reject' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null} Confirm Reject
                </Button>
                <Button onClick={() => setShowRejectModal(false)} variant="outline" className="border-gray-700 text-white">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-gray-900 border-gray-700">
            <CardHeader><CardTitle className="text-white flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-400" /> Delete Team?</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-400 text-sm">This will permanently delete this team and all its players. This cannot be undone.</p>
              <div className="flex gap-2">
                <Button onClick={() => handleAction('delete')} disabled={!!actionLoading} variant="destructive" className="flex-1">
                  {actionLoading === 'delete' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Trash2 className="w-4 h-4 mr-1" />} Delete
                </Button>
                <Button onClick={() => setShowDeleteConfirm(false)} variant="outline" className="border-gray-700 text-black font-bold">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Helper components
function Row({ label, value, mono, isPhone, isEmail }: { label: string; value: string; mono?: boolean; isPhone?: boolean; isEmail?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 flex-shrink-0">{label}:</span>
      {isPhone ? (
        <a href={`tel:${value}`} className="text-blue-400 hover:underline truncate">{value}</a>
      ) : isEmail ? (
        <a href={`mailto:${value}`} className="text-blue-400 hover:underline truncate">{value}</a>
      ) : (
        <span className={`text-white truncate ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
      )}
    </div>
  )
}

function Detail({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'col-span-2 sm:col-span-3' : ''}>
      <span className="text-gray-500 text-xs">{label}</span>
      <p className="text-white text-sm">{value}</p>
    </div>
  )
}