'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Save, DollarSign, Phone, Mail } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [fee, setFee] = useState('8000')
  const [phone, setPhone] = useState('9803977546')
  const [email, setEmail] = useState('www.bishaltolami049@gmail.com')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Settings saved!')
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-400" />
          Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage tournament configuration</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Registration Fee (NPR)
              </label>
              <Input value={fee} onChange={(e) => setFee(e.target.value)} className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <Phone className="w-4 h-4" /> Contact Phone
              </label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <Mail className="w-4 h-4" /> Contact Email
              </label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}