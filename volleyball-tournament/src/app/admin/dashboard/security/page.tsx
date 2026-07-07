'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Key, Shield, Loader2, Eye, EyeOff, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'change' | 'forgot'>('change')

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast.error(data.error || 'Failed to change password')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('OTP sent to your email. Check your inbox.')
      } else {
        toast.error(data.error || 'Failed')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-400" />
          Security
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your admin account security</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
        {[
          { id: 'change', label: 'Change Password', icon: Key },
          { id: 'forgot', label: 'Forgot Password', icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id as typeof mode)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
              mode === tab.id
                ? 'bg-orange-500/20 text-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            {mode === 'change' ? 'Change Password' : 'Reset Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={mode === 'change' ? handleChangePassword : handleForgotPassword} className="space-y-4">
            {mode === 'change' && (
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-gray-900 border-gray-700 text-white pl-10 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showCurrent ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400 mb-1 block">New Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="bg-gray-900 border-gray-700 text-white pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showNew ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-gray-900 border-gray-700 text-white"
                required
              />
              {newPassword && confirmPassword && (
                <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                  {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || (mode === 'change' && !currentPassword) || newPassword !== confirmPassword}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
              {mode === 'change' ? 'Update Password' : 'Send Reset OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}