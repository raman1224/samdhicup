// 'use client'

// import { memo, useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Skeleton } from '@/components/ui/skeleton'
// import { 
//   Trophy, 
//   Medal, 
//   Calendar, 
//   MapPin, 
//   Clock, 
//   DollarSign,
//   Award,
//   Star,
//   Users
// } from 'lucide-react'

// interface TournamentInfoProps {
//   onNext: () => void
// }

// const TournamentInfo = memo(function TournamentInfo({ onNext }: TournamentInfoProps) {
//   const [data, setData] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch('/api/tournament/active')
//       .then(res => res.json())
//       .then(result => {
//         if (result.success) setData(result.data)
//       })
//       .catch(() => {})
//       .finally(() => setLoading(false))
//   }, [])

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-12 w-48 mx-auto" />
//         <Skeleton className="h-48 w-full" />
//         <Skeleton className="h-64 w-full" />
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-4"
//     >
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5">
//           <Trophy className="w-4 h-4 mr-1.5" />
//           Season 2026
//         </Badge>
//         <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
//           Volleyball Championship
//         </h2>
//         <p className="text-gray-400 text-sm">Register your team and compete for glory</p>
//       </div>

//       {/* Prize Pool */}
//       <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
//         <CardContent className="p-4">
//           <div className="flex items-center gap-3 mb-3">
//             <Trophy className="w-8 h-8 text-yellow-500" />
//             <div>
//               <h3 className="text-lg font-bold text-yellow-500">Prize Pool</h3>
//               <p className="text-gray-400 text-xs">रू 1,40,000+</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-3 text-center">
//             <div>
//               <div className="text-xl font-bold text-yellow-400">रू 80k</div>
//               <div className="text-[10px] text-gray-400">Winner</div>
//             </div>
//             <div>
//               <div className="text-xl font-bold text-gray-300">रू 40k</div>
//               <div className="text-[10px] text-gray-400">Runner Up</div>
//             </div>
//             <div>
//               <div className="text-xl font-bold text-orange-400">रू 20k</div>
//               <div className="text-[10px] text-gray-400">Third Place</div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Details */}
//       <Card className="bg-gray-800/40 border-gray-700/50">
//         <CardContent className="p-4 space-y-3">
//           <h3 className="text-white font-semibold flex items-center gap-2">
//             <Award className="w-4 h-4 text-orange-400" />
//             Tournament Details
//           </h3>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
//               <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
//               <div>
//                 <div className="text-[10px] text-gray-500">Date</div>
//                 <div className="text-white text-xs font-medium">Ashoj 28 - Ashoj 31, 2083</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
//               <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
//               <div>
//                 <div className="text-[10px] text-gray-500">Venue</div>
//                 <div className="text-white text-xs font-medium">चाैरी देउराली, नयाँ बस्ती, काभ्रेपलाञ्‍चोक</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
//               <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
//               <div>
//                 <div className="text-[10px] text-gray-500">Fee</div>
//                 <div className="text-white text-xs font-medium">NPR 8,000</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
//               <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
//               <div>
//                 <div className="text-[10px] text-gray-500">Team Size</div>
//                 <div className="text-white text-xs font-medium">10 Players</div>
//               </div>
//             </div>
//           </div>

//           <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
//             <div className="flex items-center gap-2 text-orange-400 mb-1">
//               <Clock className="w-3.5 h-3.5" />
//               <span className="text-xs font-semibold">Registration Deadline</span>
//             </div>
//             <p className="text-white text-sm font-bold">Ashoj 25, 2083</p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Medals/Trophy Info */}
//       <div className="grid grid-cols-3 gap-3">
//         {[
//           { icon: Medal, label: 'Medals', desc: 'Gold, Silver, Bronze', color: 'text-yellow-500' },
//           { icon: Trophy, label: 'Trophy', desc: 'Championship', color: 'text-orange-500' },
//           { icon: Star, label: 'Certificates', desc: 'All Participants', color: 'text-purple-500' },
//         ].map(item => (
//           <Card key={item.label} className="bg-gray-800/40 border-gray-700/50">
//             <CardContent className="p-3 text-center">
//               <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-1.5`} />
//               <h4 className="text-white text-xs font-semibold">{item.label}</h4>
//               <p className="text-[10px] text-gray-500">{item.desc}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//     </motion.div>
//   )
// })

// export default TournamentInfo



'use client'

import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy, Medal, Calendar, MapPin, Clock, DollarSign, Award, Star, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface TournamentInfoProps { onNext: () => void }

const TournamentInfo = memo(function TournamentInfo({ onNext }: TournamentInfoProps) {
  const t = useTranslations('register')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tournament/active').then(res => res.json()).then(result => { if (result.success) setData(result.data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="space-y-4"><Skeleton className="h-12 w-48 mx-auto" /><Skeleton className="h-48 w-full" /><Skeleton className="h-64 w-full" /></div>

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="text-center space-y-2">
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5"><Trophy className="w-4 h-4 mr-1.5" />{t('season')}</Badge>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">{t('championship')}</h2>
        <p className="text-gray-400 text-sm">{t('tagline')}</p>
      </div>
      <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3"><Trophy className="w-8 h-8 text-yellow-500" /><div><h3 className="text-lg font-bold text-yellow-500">{t('prizePool')}</h3><p className="text-gray-400 text-xs">रू 1,40,000+</p></div></div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><div className="text-xl font-bold text-yellow-400">रू 80k</div><div className="text-[10px] text-gray-400">{t('winner')}</div></div>
            <div><div className="text-xl font-bold text-gray-300">रू 40k</div><div className="text-[10px] text-gray-400">{t('runnerUp')}</div></div>
            <div><div className="text-xl font-bold text-orange-400">रू 20k</div><div className="text-[10px] text-gray-400">{t('thirdPlace')}</div></div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-white font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-orange-400" />{t('tournamentDetails')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg"><Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" /><div><div className="text-[10px] text-gray-500">{t('date')}</div><div className="text-white text-xs font-medium">{t('dateValue')}</div></div></div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg"><MapPin className="w-4 h-4 text-red-400 flex-shrink-0" /><div><div className="text-[10px] text-gray-500">{t('venue')}</div><div className="text-white text-xs font-medium">{t('venueValue')}</div></div></div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg"><DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" /><div><div className="text-[10px] text-gray-500">{t('fee')}</div><div className="text-white text-xs font-medium">{t('feeValue')}</div></div></div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg"><Users className="w-4 h-4 text-purple-400 flex-shrink-0" /><div><div className="text-[10px] text-gray-500">{t('teamSize')}</div><div className="text-white text-xs font-medium">{t('teamSizeValue')}</div></div></div>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20"><div className="flex items-center gap-2 text-orange-400 mb-1"><Clock className="w-3.5 h-3.5" /><span className="text-xs font-semibold">{t('deadline')}</span></div><p className="text-white text-sm font-bold">{t('deadlineValue')}</p></div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        {[{ icon: Medal, label: t('medals'), desc: t('medalsDesc'), color: 'text-yellow-500' }, { icon: Trophy, label: t('trophy'), desc: t('trophyDesc'), color: 'text-orange-500' }, { icon: Star, label: t('certificates'), desc: t('certificatesDesc'), color: 'text-purple-500' }].map(item => (
          <Card key={item.label} className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-3 text-center"><item.icon className={`w-6 h-6 ${item.color} mx-auto mb-1.5`} /><h4 className="text-white text-xs font-semibold">{item.label}</h4><p className="text-[10px] text-gray-500">{item.desc}</p></CardContent></Card>
        ))}
      </div>
    </motion.div>
  )
})
export default TournamentInfo