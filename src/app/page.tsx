'use client'

import { useSession } from '@/contexts/SessionContext'
import { Timer } from '@/components/Timer'
import { CaseBrief } from '@/components/CaseBrief'
import { OptionSelector } from '@/components/OptionSelector'
import { ChatInterface } from '@/components/ChatInterface'
import { FeedbackPanel } from '@/components/FeedbackPanel'
import { ResetInterface } from '@/components/ResetInterface'

export default function Home() {
  const { state } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Timer />
      
      <div className="container mx-auto max-w-7xl h-[calc(100vh-2rem)] flex gap-6">
        {/* Left Panel - 60% width */}
        <div className="flex-[3] h-full">
          {state.phase === 'feedback' ? (
            <FeedbackPanel />
          ) : (
            <CaseBrief />
          )}
        </div>

        {/* Right Panel - 40% width */}
        <div className="flex-[2] h-full">
          {state.phase === 'initial' && (
            <OptionSelector />
          )}
          
          {state.phase === 'conversation' && state.status === 'active' && (
            <ChatInterface />
          )}
          
          {state.phase === 'conversation' && state.status === 'expired' && (
            <div className="h-full flex flex-col gap-4">
              <div className="flex-1">
                <ChatInterface />
              </div>
              <div className="flex-shrink-0">
                <ResetInterface />
              </div>
            </div>
          )}
          
          {state.phase === 'feedback' && (
            <ResetInterface />
          )}
        </div>
      </div>
    </div>
  )
}
