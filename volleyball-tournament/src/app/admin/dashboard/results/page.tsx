'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Medal, Save, Loader2, Trophy, Plus, Trash2, 
  Edit2, X, Crown, Award, CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface Result {
  id?: string
  position: number
  positionLabel: string
  teamName: string
  medalType: string
  prizeAmount: string | number
  notes: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Result>({
    position: 1,
    positionLabel: 'Champion',
    teamName: '',
    medalType: 'gold',
    prizeAmount: '',
    notes: '',
  })

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch('/api/admin/results', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) setResults(data.results || [])
    } catch {
      toast.error('Failed to load results')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    const nextPos = results.length + 1
    if (nextPos > 3) {
      toast.error('Maximum 3 positions allowed')
      return
    }

    const config = {
      1: { label: 'Champion', medal: 'gold' },
      2: { label: 'Runner Up', medal: 'silver' },
      3: { label: 'Third Place', medal: 'bronze' },
    }[nextPos] || { label: 'Champion', medal: 'gold' }

    setFormData({
      position: nextPos,
      positionLabel: config.label,
      teamName: '',
      medalType: config.medal,
      prizeAmount: '',
      notes: '',
    })
    setEditingIndex(null)
    setShowModal(true)
  }

  const openEditModal = (index: number) => {
    setFormData({
      ...results[index],
      prizeAmount: results[index].prizeAmount?.toString() || '',
    })
    setEditingIndex(index)
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!formData.teamName.trim()) {
      toast.error('Team name is required')
      return
    }

    // Update local state
    let newResults = [...results]
    const formattedResult: Result = {
      ...formData,
      prizeAmount: formData.prizeAmount ? parseInt(formData.prizeAmount.toString()) : 0,
    }

    if (editingIndex !== null) {
      newResults[editingIndex] = formattedResult
    } else {
      newResults.push(formattedResult)
    }

    newResults.sort((a, b) => a.position - b.position)

    setSaving(true)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ results: newResults }),
      })
      const data = await res.json()

      if (data.success) {
        setResults(newResults)
        setShowModal(false)
        toast.success(editingIndex !== null ? 'Result updated!' : 'Result added!')
      } else {
        toast.error(data.error || 'Failed to save')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('Delete this result?')) return

    const newResults = results.filter((_, i) => i !== index)
    // Re-number positions
    const renumbered = newResults.map((r, i) => ({
      ...r,
      position: i + 1,
      positionLabel: ['Champion', 'Runner Up', 'Third Place'][i] || r.positionLabel,
      medalType: ['gold', 'silver', 'bronze'][i] || r.medalType,
    }))

    setSaving(true)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ results: renumbered }),
      })
      const data = await res.json()
      if (data.success) {
        setResults(renumbered)
        toast.success('Result deleted')
      }
    } catch {
      toast.error('Failed to delete')
    } finally {
      setSaving(false)
    }
  }

  const medalConfig: Record<string, any> = {
    gold: {
      emoji: '🥇',
      icon: Crown,
      color: 'text-yellow-400',
      bg: 'from-yellow-500/10 to-orange-500/10',
      border: 'border-yellow-500/40',
    },
    silver: {
      emoji: '🥈',
      icon: Medal,
      color: 'text-gray-300',
      bg: 'from-gray-400/10 to-slate-500/10',
      border: 'border-gray-400/40',
    },
    bronze: {
      emoji: '🥉',
      icon: Award,
      color: 'text-orange-400',
      bg: 'from-orange-500/10 to-red-500/10',
      border: 'border-orange-500/40',
    },
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Medal className="w-6 h-6 text-yellow-400" />
            Tournament Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Set the champion, runner-up, and third place
          </p>
        </div>
        <Button
          onClick={openAddModal}
          disabled={results.length >= 3}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Result
        </Button>
      </div>

      {/* Info Banner */}
      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <p className="text-blue-400 text-xs">
          💡 These results appear on the homepage "Winners" section. Add up to 3 positions.
        </p>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : results.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="py-16 text-center">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">
              No results yet
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Add the tournament winners to show on the homepage
            </p>
            <Button
              onClick={openAddModal}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Add First Winner
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((result, index) => {
            const config = medalConfig[result.medalType] || medalConfig.bronze
            const MedalIcon = config.icon

            return (
              <motion.div
                key={result.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${config.bg} ${config.border} border-2 h-full relative overflow-hidden`}>
                  <CardContent className="p-5 text-center">
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => openEditModal(index)}
                        className="p-1.5 rounded-lg hover:bg-black/30 text-gray-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Medal emoji */}
                    <div className="text-5xl mb-3">{config.emoji}</div>

                    {/* Position Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border ${config.border} mb-3`}>
                      <MedalIcon className={`w-3.5 h-3.5 ${config.color}`} />
                      <span className={`text-xs font-bold uppercase ${config.color}`}>
                        {result.positionLabel}
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5 mb-3">
                      <div className="text-[10px] text-gray-500 uppercase mb-1">Team</div>
                      <div className="text-white font-bold text-base break-words">
                        {result.teamName}
                      </div>
                    </div>

                    {/* Prize */}
                    {result.prizeAmount && Number(result.prizeAmount) > 0 && (
                      <div className="inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                        <span className="text-green-400 font-bold text-sm">
                          रू {Number(result.prizeAmount).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Notes */}
                    {result.notes && (
                      <p className="text-xs text-gray-400 italic mt-3">
                        "{result.notes}"
                      </p>
                    )}
                  </CardContent>

                  {/* Ribbon */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${
                    result.medalType === 'gold' ? 'from-yellow-400 via-amber-500 to-yellow-400' :
                    result.medalType === 'silver' ? 'from-gray-300 via-gray-400 to-gray-300' :
                    'from-orange-400 via-red-500 to-orange-400'
                  }`} />
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-white flex items-center gap-2">
                    {editingIndex !== null ? (
                      <><Edit2 className="w-5 h-5 text-orange-400" /> Edit Result</>
                    ) : (
                      <><Plus className="w-5 h-5 text-orange-400" /> Add Result</>
                    )}
                  </CardTitle>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Medal Type */}
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Position</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'gold', label: '🥇 Champion' },
                        { value: 'silver', label: '🥈 Runner Up' },
                        { value: 'bronze', label: '🥉 Third Place' },
                      ].map(m => (
                        <button
                          key={m.value}
                          onClick={() => setFormData({ 
                            ...formData, 
                            medalType: m.value,
                            positionLabel: m.value === 'gold' ? 'Champion' : m.value === 'silver' ? 'Runner Up' : 'Third Place',
                            position: m.value === 'gold' ? 1 : m.value === 'silver' ? 2 : 3,
                          })}
                          className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                            formData.medalType === m.value
                              ? 'bg-orange-500/20 border-2 border-orange-500 text-orange-400'
                              : 'bg-gray-800 border-2 border-gray-700 text-gray-400'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Name */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Team Name *</label>
                    <Input
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="Winning team name"
                      className="bg-gray-800 border-gray-700 text-white"
                      autoFocus
                    />
                  </div>

                  {/* Prize Amount */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Prize Amount (NPR)</label>
                    <Input
                      type="number"
                      value={formData.prizeAmount}
                      onChange={(e) => setFormData({ ...formData, prizeAmount: e.target.value })}
                      placeholder="80000"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Notes (optional)</label>
                    <Input
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Special mentions..."
                      className="bg-gray-800 border-gray-700 text-white"
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
                      {saving ? 'Saving...' : editingIndex !== null ? 'Update' : 'Add'}
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