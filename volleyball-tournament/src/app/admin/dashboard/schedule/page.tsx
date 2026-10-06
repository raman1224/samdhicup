'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calendar, Plus, Edit2, Trash2, Loader2, X, 
  Clock, MapPin, Trophy, Check, Save
} from 'lucide-react'
import { toast } from 'sonner'

interface Match {
  id: string
  matchNumber: number
  round: string
  date: string
  time: string
  teamAName: string
  teamBName: string
  teamAScore: number | null
  teamBScore: number | null
  winner: string | null
  venue: string
  status: string
  notes: string | null
}

const ROUNDS = [
  'Group Stage',
  'Round of 16',
  'Quarter Final',
  'Semi Final',
  '3rd Place',
  'Final',
]

const STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'live', label: 'Live Now', color: 'bg-red-500/20 text-red-400 animate-pulse' },
  { value: 'completed', label: 'Completed', color: 'bg-green-500/20 text-green-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-500/20 text-gray-400' },
]

export default function SchedulePage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMatch, setEditingMatch] = useState<Match | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    matchNumber: 1,
    round: 'Group Stage',
    date: '',
    time: '9:00 AM',
    teamAName: '',
    teamBName: '',
    teamAScore: '',
    teamBScore: '',
    winner: '',
    venue: 'चउरी देउराली, नयाँ बस्ती',
    status: 'upcoming',
    notes: '',
  })

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch('/api/admin/matches', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) setMatches(data.matches || [])
    } catch (err) {
      console.error(err)
      toast.error('Failed to load matches')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    const nextNumber = matches.length > 0 ? Math.max(...matches.map(m => m.matchNumber)) + 1 : 1
    setFormData({
      matchNumber: nextNumber,
      round: 'Group Stage',
      date: '',
      time: '9:00 AM',
      teamAName: '',
      teamBName: '',
      teamAScore: '',
      teamBScore: '',
      winner: '',
      venue: 'चउरी देउराली, नयाँ बस्ती',
      status: 'upcoming',
      notes: '',
    })
    setEditingMatch(null)
    setShowModal(true)
  }

  const openEditModal = (match: Match) => {
    setFormData({
      matchNumber: match.matchNumber,
      round: match.round,
      date: match.date.split('T')[0],
      time: match.time,
      teamAName: match.teamAName,
      teamBName: match.teamBName,
      teamAScore: match.teamAScore?.toString() || '',
      teamBScore: match.teamBScore?.toString() || '',
      winner: match.winner || '',
      venue: match.venue,
      status: match.status,
      notes: match.notes || '',
    })
    setEditingMatch(match)
    setShowModal(true)
  }

  const handleSave = async () => {
    // Validation
    if (!formData.teamAName || !formData.teamBName || !formData.date) {
      toast.error('Team A, Team B, and Date are required')
      return
    }

    if (formData.teamAName.trim() === formData.teamBName.trim()) {
      toast.error('Team A and Team B cannot be the same')
      return
    }

    setSaving(true)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const url = editingMatch 
        ? `/api/admin/matches/${editingMatch.id}` 
        : '/api/admin/matches'
      
      const res = await fetch(url, {
        method: editingMatch ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          teamAScore: formData.teamAScore ? parseInt(formData.teamAScore) : null,
          teamBScore: formData.teamBScore ? parseInt(formData.teamBScore) : null,
          winner: formData.winner || null,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(editingMatch ? 'Match updated!' : 'Match added!')
        setShowModal(false)
        fetchMatches()
      } else {
        toast.error(data.error || 'Failed to save')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, matchNumber: number) => {
    if (!confirm(`Delete Match #${matchNumber}? This cannot be undone.`)) return

    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch(`/api/admin/matches/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Match deleted')
        fetchMatches()
      } else {
        toast.error(data.error || 'Failed to delete')
      }
    } catch {
      toast.error('Network error')
    }
  }

  // Group matches by round
  const groupedMatches = ROUNDS.map(round => ({
    round,
    matches: matches.filter(m => m.round === round),
  })).filter(g => g.matches.length > 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            Match Schedule
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all tournament matches ({matches.length} total)
          </p>
        </div>
        <Button 
          onClick={openAddModal}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Match
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: matches.length, color: 'text-cyan-400' },
          { label: 'Upcoming', value: matches.filter(m => m.status === 'upcoming').length, color: 'text-blue-400' },
          { label: 'Live', value: matches.filter(m => m.status === 'live').length, color: 'text-red-400' },
          { label: 'Completed', value: matches.filter(m => m.status === 'completed').length, color: 'text-green-400' },
        ].map(stat => (
          <Card key={stat.label} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Matches List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : matches.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-16 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">No matches yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              Start by adding your first match
            </p>
            <Button onClick={openAddModal} className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add First Match
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {groupedMatches.map((group) => (
            <div key={group.round}>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-500/30" />
                <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider">
                  {group.round}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-500/30" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {group.matches
                  .sort((a, b) => a.matchNumber - b.matchNumber)
                  .map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onEdit={() => openEditModal(match)}
                      onDelete={() => handleDelete(match.id, match.matchNumber)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl my-8"
            >
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    {editingMatch ? <Edit2 className="w-5 h-5 text-orange-400" /> : <Plus className="w-5 h-5 text-orange-400" />}
                    {editingMatch ? `Edit Match #${formData.matchNumber}` : 'Add New Match'}
                  </CardTitle>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {/* Match Number & Round */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Match Number</label>
                      <Input
                        type="number"
                        value={formData.matchNumber}
                        onChange={(e) => setFormData({ ...formData, matchNumber: parseInt(e.target.value) || 1 })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Round</label>
                      <select
                        value={formData.round}
                        onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                        className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3 text-sm"
                      >
                        {ROUNDS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Team A</label>
                      <Input
                        value={formData.teamAName}
                        onChange={(e) => setFormData({ ...formData, teamAName: e.target.value })}
                        placeholder="Team name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Team B</label>
                      <Input
                        value={formData.teamBName}
                        onChange={(e) => setFormData({ ...formData, teamBName: e.target.value })}
                        placeholder="Team name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Date</label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Time</label>
                      <Input
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="9:00 AM"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Venue</label>
                    <Input
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3 text-sm"
                    >
                      {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>

                  {/* Scores (only if completed) */}
                  {formData.status === 'completed' && (
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">{formData.teamAName || 'Team A'} Sets</label>
                          <Input
                            type="number"
                            value={formData.teamAScore}
                            onChange={(e) => setFormData({ ...formData, teamAScore: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">{formData.teamBName || 'Team B'} Sets</label>
                          <Input
                            type="number"
                            value={formData.teamBScore}
                            onChange={(e) => setFormData({ ...formData, teamBScore: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Winner</label>
                          <select
                            value={formData.winner}
                            onChange={(e) => setFormData({ ...formData, winner: e.target.value })}
                            className="w-full h-10 bg-gray-800 border border-gray-700 text-white rounded-md px-3 text-sm"
                          >
                            <option value="">Select</option>
                            <option value="team_a">{formData.teamAName || 'Team A'}</option>
                            <option value="team_b">{formData.teamBName || 'Team B'}</option>
                            <option value="draw">Draw</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Notes (optional)</label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special notes..."
                      className="bg-gray-800 border-gray-700 text-white min-h-[60px]"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {saving ? 'Saving...' : editingMatch ? 'Update Match' : 'Add Match'}
                    </Button>
                    <Button
                      onClick={() => setShowModal(false)}
                      variant="outline"
                      className="border-gray-700 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Match Card Component
function MatchCard({ match, onEdit, onDelete }: { match: Match; onEdit: () => void; onDelete: () => void }) {
  const statusConfig = STATUS_OPTIONS.find(s => s.value === match.status) || STATUS_OPTIONS[0]
  const dateObj = new Date(match.date)
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all">
        <CardContent className="p-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                #{match.matchNumber}
              </Badge>
              <Badge className={statusConfig.color + ' text-xs border-0'}>
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onEdit}
                className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-orange-400 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Teams */}
          <div className="space-y-2">
            <div className={`flex items-center justify-between p-2 rounded-lg ${
              match.winner === 'team_a' ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-900/50'
            }`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {match.winner === 'team_a' && <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />}
                <span className={`text-sm truncate ${match.winner === 'team_a' ? 'text-green-400 font-bold' : 'text-white'}`}>
                  {match.teamAName}
                </span>
              </div>
              {match.teamAScore !== null && (
                <span className={`text-lg font-bold ml-2 ${match.winner === 'team_a' ? 'text-green-400' : 'text-gray-300'}`}>
                  {match.teamAScore}
                </span>
              )}
            </div>

            <div className={`flex items-center justify-between p-2 rounded-lg ${
              match.winner === 'team_b' ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-900/50'
            }`}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {match.winner === 'team_b' && <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />}
                <span className={`text-sm truncate ${match.winner === 'team_b' ? 'text-green-400 font-bold' : 'text-white'}`}>
                  {match.teamBName}
                </span>
              </div>
              {match.teamBScore !== null && (
                <span className={`text-lg font-bold ml-2 ${match.winner === 'team_b' ? 'text-green-400' : 'text-gray-300'}`}>
                  {match.teamBScore}
                </span>
              )}
            </div>
          </div>

          {/* Footer info */}
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {match.time}
            </span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{match.venue}</span>
            </span>
          </div>

          {match.notes && (
            <p className="text-xs text-gray-500 italic mt-2 pl-2 border-l-2 border-orange-500/30">
              {match.notes}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}