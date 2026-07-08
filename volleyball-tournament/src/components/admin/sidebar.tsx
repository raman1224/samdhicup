// 'use client'

// import { memo } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { 
//   LayoutDashboard, Users, CreditCard, Mail, 
//   Settings, LogOut, Trophy, X, Lock, Home
// } from 'lucide-react'

// const menuItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
//   { icon: Trophy, label: 'Tournament', href: '/admin/dashboard/tournament' },
//   { icon: Users, label: 'Teams', href: '/admin/dashboard/teams' },
//   { icon: CreditCard, label: 'Payments', href: '/admin/dashboard/payments' },
//   { icon: Mail, label: 'Emails', href: '/admin/dashboard/emails' },
//   { icon: Lock, label: 'Security', href: '/admin/dashboard/security' },
//   { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings' },
// ]

// interface SidebarProps {
//   onClose?: () => void
// }

// const Sidebar = memo(function Sidebar({ onClose }: SidebarProps) {
//   const pathname = usePathname()

//   const handleLogout = () => {
//     document.cookie = 'admin_token=; path=/; max-age=0'
//     window.location.href = '/admin/login'
//   }

//   return (
//     <div className="w-64 bg-gray-900 border-r border-gray-800 h-full flex flex-col">
//       {/* Header with logo */}
//       <div className="p-4 flex items-center justify-between border-b border-gray-800">
//         {/* VB Admin logo - links to public homepage */}
//         <a href="/" className="flex items-center gap-3 group">
//           <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
//             <Trophy className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
//               VB Admin
//             </h1>
//             <p className="text-[10px] text-gray-500">Tournament 2026</p>
//           </div>
//         </a>
        
//         {/* Close button - mobile only */}
//         <button 
//           onClick={onClose} 
//           className="lg:hidden p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
//         >
//           <X className="w-4 h-4 text-gray-400" />
//         </button>
//       </div>

//       {/* Navigation items */}
//       <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//         {/* Home link - goes to public website */}
//         <a
//           href="/"
//           className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all mb-2"
//         >
//           <Home className="w-4 h-4" />
//           <span>Visit Website</span>
//         </a>

//         <div className="border-t border-gray-800 my-2" />

//         {menuItems.map((item) => {
//           const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={onClose}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
//                 isActive
//                   ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
//                   : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
//               }`}
//             >
//               <item.icon className="w-4 h-4" />
//               <span>{item.label}</span>
//             </Link>
//           )
//         })}
//       </nav>

//       {/* Logout button */}
//       <div className="p-3 border-t border-gray-800">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
//         >
//           <LogOut className="w-4 h-4" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   )
// })

// export default Sidebar


'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  LayoutDashboard, Users, CreditCard, Mail, 
  Settings, LogOut, Trophy, X, Lock, Home
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Trophy, label: 'Tournament', href: '/admin/dashboard/tournament' },
  { icon: Users, label: 'Teams', href: '/admin/dashboard/teams' },
  { icon: CreditCard, label: 'Payments', href: '/admin/dashboard/payments' },
  { icon: Mail, label: 'Emails', href: '/admin/dashboard/emails' },
  { icon: Lock, label: 'Security', href: '/admin/dashboard/security' },
  { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings' },
]

interface SidebarProps {
  onClose?: () => void
}

const Sidebar = memo(function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  // const handleLogout = () => {
  //   document.cookie = 'admin_token=; path=/; max-age=0'
  //   window.location.href = '/admin/login'
  // }

  const handleLogout = () => {
  sessionStorage.removeItem('admin_token')
  document.cookie = 'admin_token=; path=/; max-age=0'
  window.location.href = '/admin/login'
}

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full flex flex-col">
      {/* Header with logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <a href="/admin/dashboard" className="flex items-center gap-3 group">
          {/* REPLACE TROPHY WITH IMAGE - Just this part changed */}
          <div className="w-9 h-9 relative rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0">
            <Image
              src="/logo.png"  // Put your logo in public folder
              alt="Logo"
              width={36}
              height={36}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          
          <div>
<h1 className="text-sm font-bold text-white">नयाँ बस्ती VB</h1>
<p className="text-[10px] text-gray-500">प्रतियोगिता-२०८३</p>
          </div>
        </a>
        
        {/* Close button - mobile only */}
        <button 
          onClick={onClose} 
          className="lg:hidden p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Home link */}
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all mb-2"
        >
          <Home className="w-4 h-4" />
          <span>Visit Website</span>
        </a>

        <div className="border-t border-gray-800 my-2" />

        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout button */}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
})

export default Sidebar