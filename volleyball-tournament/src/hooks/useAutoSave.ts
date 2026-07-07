'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'

export function useAutoSave(key: string) {
  const saveData = useCallback((data: any): boolean => {
    try {
      const serialized = JSON.stringify(data)
      localStorage.setItem(key, serialized)
      localStorage.setItem(`${key}_timestamp`, Date.now().toString())
      return true
    } catch (error) {
      console.error('Auto-save failed:', error)
      
      // Check if storage is full
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        toast.error('Storage full. Please clear some space to save progress.')
      }
      
      return false
    }
  }, [key])

  const loadData = useCallback((): any | null => {
    try {
      const saved = localStorage.getItem(key)
      const timestamp = localStorage.getItem(`${key}_timestamp`)
      
      if (!saved || !timestamp) return null
      
      // Check if data is too old (more than 7 days)
      const age = Date.now() - parseInt(timestamp)
      if (age > 7 * 24 * 60 * 60 * 1000) {
        clearData()
        return null
      }
      
      return JSON.parse(saved)
    } catch (error) {
      console.error('Failed to load saved data:', error)
      return null
    }
  }, [key])

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(key)
      localStorage.removeItem(`${key}_timestamp`)
    } catch (error) {
      console.error('Failed to clear data:', error)
    }
  }, [key])

  return {
    saveData,
    loadData,
    clearData,
  }
}