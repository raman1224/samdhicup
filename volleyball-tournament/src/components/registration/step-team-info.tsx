
'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import type { RegistrationFormData } from '@/schemas/registration'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from './image-upload'
import { districts } from '@/lib/districts'
import { Users, User, Phone, Mail, MapPin, Building2, Flag, FileText, AlertCircle } from 'lucide-react'

const StepTeamInfo = memo(function StepTeamInfo() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<RegistrationFormData>()
  const teamLogo = watch('team.teamLogo')
  const teamErrors = errors.team as Partial<Record<keyof RegistrationFormData['team'], any>> || {}

  const inputClass = (fieldName: keyof RegistrationFormData['team']) => 
    `bg-gray-900/80 border text-white h-11 pl-10 ${teamErrors[fieldName] ? 'border-red-500' : 'border-gray-700'}`

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 space-y-4">
          
          {/* Team Logo */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Team Logo</label>
            <ImageUpload
              label="Upload Logo"
              onUpload={(url) => setValue('team.teamLogo', url, { shouldValidate: true })}
              preview={teamLogo}
            />
          </div>

          {/* Team Name */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Team Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
              <Input
                {...register('team.teamName')}
                placeholder="Enter your team name"
                className={inputClass('teamName')}
              />
            </div>
            {teamErrors.teamName && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {teamErrors.teamName.message}
              </p>
            )}
          </div>

          {/* Captain Details */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Captain Details
            </h4>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input
                {...register('team.captainName')}
                placeholder="Captain's full name"
                className={`bg-gray-900/80 border text-white h-11 ${teamErrors.captainName ? 'border-red-500' : 'border-gray-700'}`}
              />
              {teamErrors.captainName && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {teamErrors.captainName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Phone <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input
                    {...register('team.captainPhone')}
                    placeholder="98XXXXXXXX"
                    className={inputClass('captainPhone')}
                  />
                </div>
                {teamErrors.captainPhone && (
                  <p className="text-red-400 text-xs mt-1">{teamErrors.captainPhone.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input
                    {...register('team.captainEmail')}
                    type="email"
                    placeholder="captain@email.com"
                    className={inputClass('captainEmail')}
                  />
                </div>
                {teamErrors.captainEmail && (
                  <p className="text-red-400 text-xs mt-1">{teamErrors.captainEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  District <span className="text-red-400">*</span>
                </label>
                <select
                  {...register('team.district')}
                  className={`w-full h-11 bg-gray-900/80 border text-white rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    teamErrors.district ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {teamErrors.district && (
                  <p className="text-red-400 text-xs mt-1">{teamErrors.district.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Municipality <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input
                    {...register('team.municipality')}
                    placeholder="Municipality"
                    className={inputClass('municipality')}
                  />
                </div>
                {teamErrors.municipality && (
                  <p className="text-red-400 text-xs mt-1">{teamErrors.municipality.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Full Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500 z-10" />
                <Textarea
                  {...register('team.address')}
                  placeholder="Complete address (min 5 characters)"
                  className={`bg-gray-900/80 border text-white pl-10 min-h-[70px] ${
                    teamErrors.address ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
              </div>
              {teamErrors.address && (
                <p className="text-red-400 text-xs mt-1">{teamErrors.address.message}</p>
              )}
            </div>
          </div>

          {/* Optional */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Optional
            </h4>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Team Motto</label>
              <Input
                {...register('team.motto')}
                placeholder="Your team's motto"
                className="bg-gray-900/80 border-gray-700 text-white h-11"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Team Description</label>
              <Textarea
                {...register('team.description')}
                placeholder="Brief description"
                className="bg-gray-900/80 border-gray-700 text-white min-h-[60px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default StepTeamInfo