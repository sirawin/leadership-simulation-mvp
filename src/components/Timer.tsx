'use client'

import { useSession } from '@/contexts/SessionContext'
import { formatTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function Timer() {
  const { state } = useSession()
  
  const isWarning = state.timeLeft == 300  // 5 minutes
  const isCritical = state.timeLeft <= 60 // 1 minute or less
  
  if (state.status !== 'active') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={cn(
          "px-4 py-2 rounded-lg font-mono text-lg font-bold border-2 transition-all duration-300",
          {
            "bg-green-100 border-green-300 text-green-800": !isWarning && !isCritical,
            "bg-yellow-100 border-yellow-300 text-yellow-800": isWarning && !isCritical,
            "bg-red-100 border-red-500 text-red-800": isCritical
          }
        )}
      >
        {formatTime(state.timeLeft)}
      </div>
    </div>
  )
}