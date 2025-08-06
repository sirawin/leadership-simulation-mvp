export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface SessionState {
  phase: 'initial' | 'conversation' | 'feedback'
  startTime: number
  duration: number // 600000ms (10 minutes)
  status: 'waiting' | 'active' | 'expired'
  selectedOption: number | null
  conversationHistory: Message[]
  timeLeft: number
}

export interface FeedbackResult {
  solutionFocused: string
  managingExpectations: string
  effectiveCommunication: string
  rating: number
}

export type SessionAction = 
  | { type: 'START_CONVERSATION'; selectedOption: number }
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_TIMER'; timeLeft: number }
  | { type: 'EXPIRE_TIMER' }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_FEEDBACK'; feedback: FeedbackResult }