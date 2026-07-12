'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Send, Users, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function EmailsPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !message) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    // API call would go here
    setTimeout(() => {
      toast.success('Email sent to all teams!')
      setLoading(false)
      setSubject('')
      setMessage('')
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-400" />
          Email Teams
        </h1>
        <p className="text-gray-400 text-sm mt-1">Send announcements to registered teams</p>
      </div>

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
                className="bg-gray-900 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="bg-gray-900 border-gray-700 text-white min-h-[200px]"
                required
              />
            </div>
            <div className="flex gap-1">
              <Button type="submit" disabled={loading} className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Send to All Teams
              </Button>
              <Button type="button" variant="outline" className="border-gray-700 text-black font-bold">
                <Users className="w-4 h-4 " />
                Select Teams
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}