// 'use client'

// import { memo, useEffect, useState, useCallback } from 'react'
// import { motion } from 'framer-motion'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Skeleton } from '@/components/ui/skeleton'
// import { useQuery } from '@tanstack/react-query'
// import { getOptimizedImageUrl } from '@/lib/cloudinary'
// import { 
//   Trophy, 
//   Medal, 
//   Calendar, 
//   MapPin, 
//   Clock, 
//   DollarSign,
//   Award,
//   Star,
//   ArrowRight,
//   Users
// } from 'lucide-react'

// interface TournamentInfoProps {
//   onNext: () => void
// }

// const TournamentInfo = memo(function TournamentInfo({ onNext }: TournamentInfoProps) {
//   const { data: tournament, isLoading } = useQuery({
//     queryKey: ['active-tournament'],
//     queryFn: async () => {
//       const res = await fetch('/api/tournament/active')
//       return res.json()
//     },
//     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
//   })

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   }

//   if (isLoading) {
//     return <TournamentInfoSkeleton />
//   }

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       {/* Tournament Header */}
//       <motion.div variants={itemVariants} className="text-center space-y-4">
//         <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 px-6 py-2 text-lg">
//           <Trophy className="w-5 h-5 mr-2" />
//           Season 2026
//         </Badge>
//         <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
//           Volleyball Championship
//         </h2>
//         <p className="text-gray-400 text-lg">
//           Register your team and compete for glory
//         </p>
//       </motion.div>
//       {/* Prize Pool */}
//       <motion.div variants={itemVariants}>
//         <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
//           <CardContent className="p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <Trophy className="w-10 h-10 text-yellow-500" />
//               <div>
//                 <h3 className="text-2xl font-bold text-yellow-500">Prize Pool</h3>
//                 <p className="text-gray-400">Total prizes for winners</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-yellow-400">रू 5L</div>
//                 <div className="text-sm text-gray-400">Winner</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-300">रू 3L</div>
//                 <div className="text-sm text-gray-400">Runner Up</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-orange-400">रू 1L</div>
//                 <div className="text-sm text-gray-400">Third Place</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Tournament Details */}
//       <motion.div variants={itemVariants}>
//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardHeader>
//             <CardTitle className="text-white flex items-center gap-2">
//               <Award className="w-5 h-5 text-orange-400" />
//               Tournament Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
//                 <Calendar className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <div className="text-sm text-gray-400">Date</div>
//                   <div className="text-white font-semibold">June 15-20, 2026</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
//                 <MapPin className="w-5 h-5 text-red-400" />
//                 <div>
//                   <div className="text-sm text-gray-400">Venue</div>
//                   <div className="text-white font-semibold">National Stadium</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
//                 <DollarSign className="w-5 h-5 text-green-400" />
//                 <div>
//                   <div className="text-sm text-gray-400">Registration Fee</div>
//                   <div className="text-white font-semibold">NPR 8,000</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
//                 <Users className="w-5 h-5 text-purple-400" />
//                 <div>
//                   <div className="text-sm text-gray-400">Team Size</div>
//                   <div className="text-white font-semibold">10 Players</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
//               <div className="flex items-center gap-2 text-orange-400 mb-2">
//                 <Clock className="w-4 h-4" />
//                 <span className="text-sm font-semibold">Registration Deadline</span>
//               </div>
//               <p className="text-white font-bold">June 10, 2026</p>
//               <p className="text-gray-400 text-sm mt-1">
//                 Register before the deadline to secure your spot
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Additional Info */}
//       <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Medal className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
//             <h4 className="text-white font-semibold mb-1">Medals</h4>
//             <p className="text-sm text-gray-400">Gold, Silver & Bronze</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//             <h4 className="text-white font-semibold mb-1">Trophy</h4>
//             <p className="text-sm text-gray-400">Championship Trophy</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-800/50 border-gray-700">
//           <CardContent className="p-4 text-center">
//             <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
//             <h4 className="text-white font-semibold mb-1">Certificates</h4>
//             <p className="text-sm text-gray-400">Participation & Merit</p>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Start Button */}
//       <motion.div
//         variants={itemVariants}
//         className="flex justify-center pt-4"
//       >
//         <Button
//           onClick={onNext}
//           size="lg"
//           className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-12 py-7 text-xl rounded-full shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
//         >
//           Start Registration
//           <ArrowRight className="w-6 h-6 ml-2" />
//         </Button>
//       </motion.div>
//     </motion.div>
//   )
// })

// function TournamentInfoSkeleton() {
//   return (
//     <div className="space-y-6">
//       <div className="text-center space-y-4">
//         <Skeleton className="h-10 w-48 mx-auto" />
//         <Skeleton className="h-12 w-96 mx-auto" />
//         <Skeleton className="h-6 w-64 mx-auto" />
//       </div>
//       <Skeleton className="h-48 w-full" />
//       <Skeleton className="h-64 w-full" />
//       <div className="grid grid-cols-3 gap-4">
//         <Skeleton className="h-32" />
//         <Skeleton className="h-32" />
//         <Skeleton className="h-32" />
//       </div>
//     </div>
//   )
// }

// export default TournamentInfo



'use client'

import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Trophy, 
  Medal, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign,
  Award,
  Star,
  Users
} from 'lucide-react'

interface TournamentInfoProps {
  onNext: () => void
}

const TournamentInfo = memo(function TournamentInfo({ onNext }: TournamentInfoProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tournament/active')
      .then(res => res.json())
      .then(result => {
        if (result.success) setData(result.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-48 mx-auto" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5">
          <Trophy className="w-4 h-4 mr-1.5" />
          Season 2026
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          Volleyball Championship
        </h2>
        <p className="text-gray-400 text-sm">Register your team and compete for glory</p>
      </div>

      {/* Prize Pool */}
      <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-bold text-yellow-500">Prize Pool</h3>
              <p className="text-gray-400 text-xs">रू 9,00,000+</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-yellow-400">रू 5L</div>
              <div className="text-[10px] text-gray-400">Winner</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-300">रू 3L</div>
              <div className="text-[10px] text-gray-400">Runner Up</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-400">रू 1L</div>
              <div className="text-[10px] text-gray-400">Third Place</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card className="bg-gray-800/40 border-gray-700/50">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-400" />
            Tournament Details
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Date</div>
                <div className="text-white text-xs font-medium">June 15-20, 2026</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
              <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Venue</div>
                <div className="text-white text-xs font-medium">National Stadium</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Fee</div>
                <div className="text-white text-xs font-medium">NPR 8,000</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-gray-900/50 rounded-lg">
              <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500">Team Size</div>
                <div className="text-white text-xs font-medium">10 Players</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Registration Deadline</span>
            </div>
            <p className="text-white text-sm font-bold">June 10, 2026</p>
          </div>
        </CardContent>
      </Card>

      {/* Medals/Trophy Info */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Medal, label: 'Medals', desc: 'Gold, Silver, Bronze', color: 'text-yellow-500' },
          { icon: Trophy, label: 'Trophy', desc: 'Championship', color: 'text-orange-500' },
          { icon: Star, label: 'Certificates', desc: 'All Participants', color: 'text-purple-500' },
        ].map(item => (
          <Card key={item.label} className="bg-gray-800/40 border-gray-700/50">
            <CardContent className="p-3 text-center">
              <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-1.5`} />
              <h4 className="text-white text-xs font-semibold">{item.label}</h4>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NOTE: NO Start button here - it's in the parent wizard */}
    </motion.div>
  )
})

export default TournamentInfo