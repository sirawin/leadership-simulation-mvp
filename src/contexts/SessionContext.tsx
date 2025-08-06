'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { SessionState, SessionAction } from '@/lib/types'

const initialState: SessionState = {
  phase: 'initial',
  startTime: 0,
  duration: 600, // 10 minutes in seconds
  status: 'waiting',
  selectedOption: null,
  conversationHistory: [],
  timeLeft: 600
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'START_CONVERSATION':
      return {
        ...state,
        phase: 'conversation',
        status: 'active',
        selectedOption: action.selectedOption,
        startTime: Date.now(),
        timeLeft: 600
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversationHistory: [...state.conversationHistory, action.message]
      }
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeLeft: action.timeLeft
      }
    case 'EXPIRE_TIMER':
      return {
        ...state,
        status: 'expired',
        phase: 'feedback'
      }
    case 'RESET_SESSION':
      return initialState
    case 'SET_FEEDBACK':
      return {
        ...state,
        phase: 'feedback'
      }
    default:
      return state
  }
}

interface SessionContextType {
  state: SessionState
  dispatch: React.Dispatch<SessionAction>
  startConversation: (option: number) => void
  addMessage: (role: 'user' | 'assistant', content: string) => void
  resetSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (state.status === 'active') {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000)
        const timeLeft = Math.max(0, state.duration - elapsed)
        
        if (timeLeft === 0) {
          dispatch({ type: 'EXPIRE_TIMER' })
        } else {
          dispatch({ type: 'UPDATE_TIMER', timeLeft })
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.status, state.startTime, state.duration])

  const startConversation = (option: number) => {
    dispatch({ type: 'START_CONVERSATION', selectedOption: option })
  }

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_MESSAGE', message })
  }

  const resetSession = () => {
    dispatch({ type: 'RESET_SESSION' })
  }

  return (
    <SessionContext.Provider value={{
      state,
      dispatch,
      startConversation,
      addMessage,
      resetSession
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}