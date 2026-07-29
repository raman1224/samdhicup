'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Send, Users, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function EmailsPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState<any[]>([])
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [loadingTeams, setLoadingTeams] = useState(true)

  // Fetch teams for selection
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = sessionStorage.getItem('admin_token') || ''
        const res = await fetch('/api/admin/teams-list', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success) setTeams(data.teams || [])
      } catch (err) {
        console.error('Failed to fetch teams:', err)
      } finally {
        setLoadingTeams(false)
      }
    }
    fetchTeams()
  }, [])

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  const selectAll = () => {
    if (selectedTeams.length === teams.length) {
      setSelectedTeams([])
    } else {
      setSelectedTeams(teams.map((t: any) => t.id))
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!subject || !message) {
      toast.error('Please fill subject and message')
      return
    }

    setLoading(true)
    try {
      const token = sessionStorage.getItem('admin_token') || ''
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          message,
          teamIds: selectedTeams.length > 0 ? selectedTeams : undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send')
      }

      toast.success(`Email sent to ${data.sentTo} team(s)!`)
      setSubject('')
      setMessage('')
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-400" />
          Email Teams
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Send announcements to registered teams
        </p>
      </div>

      {/* Team Selection */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Recipients {selectedTeams.length > 0 && `(${selectedTeams.length} selected)`}
            </CardTitle>
            <button
              onClick={selectAll}
              className="text-xs text-orange-400 hover:text-orange-300"
            >
              {selectedTeams.length === teams.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingTeams ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
            </div>
          ) : teams.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No teams registered yet</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {teams.map((team: any) => (
                <button
                  key={team.id}
                  onClick={() => toggleTeam(team.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedTeams.includes(team.id)
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {selectedTeams.includes(team.id) && <Check className="w-3 h-3" />}
                  {team.teamName}
                </button>
              ))}
            </div>
          )}
          <p className="text-gray-500 text-xs mt-2">
            {selectedTeams.length === 0 ? 'All teams will receive the email' : `${selectedTeams.length} team(s) selected`}
          </p>
        </CardContent>
      </Card>

      {/* Compose Email */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-orange-400" />
            Compose Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="bg-gray-900 border-gray-700 text-white h-11"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="bg-gray-900 border-gray-700 text-white min-h-[200px]"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Sending...' : `Send to ${selectedTeams.length > 0 ? selectedTeams.length : 'All'} Team(s)`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}