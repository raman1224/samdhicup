'use client'

import { memo } from 'react'
import { Menu, Bell } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = memo(function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle - only visible on mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
          
          {/* Page title could go here */}
          <span className="text-sm text-gray-400 hidden sm:block">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button className="p-2 hover:bg-gray-800 rounded-lg relative transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
          {/* Admin avatar/icon */}
          <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <span className="text-xs text-orange-400 font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header