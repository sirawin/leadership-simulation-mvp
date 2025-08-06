# Detailed Implementation Plan: Leadership Simulation MVP

## Project Overview
A web-based leadership simulation where users practice crucial conversations with their manager "Mei" through a timed chat interface, followed by AI-powered feedback analysis.

## Technical Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Shadcn Chatbot Kit for chat interface
- **Backend**: Vercel Edge Functions (API routes)
- **LLM Integration**: claude api for both Mei and feedback system
- **State Management**: React Context + useReducer for complex state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Vercel

## API Design Specification

### Core Endpoints

#### `/api/chat`
- **POST**: Send user message, receive Mei's response
- **Payload**: `{ sessionId: string, message: string, conversationHistory: Message[] }`
- **Response**: `{ response: string, sessionId: string }`

#### `/api/feedback`
- **POST**: Generate feedback from conversation history
- **Payload**: `{ sessionId: string, conversationHistory: Message[], selectedOption: number }`
- **Response**: `{ feedback: string, rating: number }`

#### `/api/session`
- **POST**: Initialize new session with timer
- **GET**: Get session state (timer remaining, status)
- **DELETE**: Reset/clear session

### Data Models

```typescript
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Session {
  id: string
  startTime: number
  duration: number // 600000ms (10 minutes)
  status: 'waiting' | 'active' | 'expired'
  selectedOption: number
  conversationHistory: Message[]
}

interface FeedbackResult {
  solutionFocused: string
  managingExpectations: string
  effectiveCommunication: string
  rating: number
}
```

## Component Architecture

### Layout Structure
```
App Layout
├── Header (Timer display)
├── Main Container (flex layout)
│   ├── Left Panel (60% width)
│   │   ├── CaseBrief (initial state)
│   │   └── FeedbackPanel (post-conversation state)
│   └── Right Panel (40% width)
│       ├── OptionSelector (initial state)
│       ├── ChatInterface (active conversation)
│       └── ResetInterface (post-expiry state)
```

### Core Components

#### `CaseBrief.tsx`
- Display the ShelfPace scenario text
- Responsive typography and layout
- Transition to FeedbackPanel on completion

#### `OptionSelector.tsx`
- Four radio button options for conversation starters
- "Start Conversation" button
- Form validation and submission

#### `ChatInterface.tsx`
- Integration with Shadcn Chatbot Kit
- Message history display
- Input field with send functionality
- Loading states for LLM responses
- Auto-scroll to latest message

#### `Timer.tsx`
- Countdown from 10:00 to 0:00
- Visual states: normal, warning (5min), critical (1min)
- Blinking animation implementation
- Server sync for accuracy

#### `FeedbackPanel.tsx`
- Star rating display (1-5 stars)
- Three feedback sections with structured text
- Responsive layout for feedback content

#### `ResetInterface.tsx`
- End-of-session message display
- Red "Reset Interaction" button
- Session cleanup handling

## State Management Strategy

### Session Context
```typescript
interface SessionState {
  session: Session | null
  timeRemaining: number
  status: 'idle' | 'selecting' | 'chatting' | 'completed' | 'expired'
  feedback: FeedbackResult | null
  error: string | null
}

type SessionAction = 
  | { type: 'START_SESSION'; payload: Session }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_FEEDBACK'; payload: FeedbackResult }
  | { type: 'EXPIRE_SESSION' }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_ERROR'; payload: string }
```

### Chat Context
```typescript
interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}
```

## Implementation Phases

### Phase 1: Foundation Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure shadcn/ui, Tailwind CSS
- [ ] Set up project structure and routing
- [ ] Create basic layout and responsive design
- [ ] Implement session context and state management

### Phase 2: Core UI Components
- [ ] Build CaseBrief component with static content
- [ ] Create OptionSelector with form handling
- [ ] Implement Timer component with countdown logic
- [ ] Build basic ChatInterface shell
- [ ] Create ResetInterface and FeedbackPanel layouts

### Phase 3: LLM Integration
- [ ] Set up OpenAI API integration
- [ ] Create chat API endpoint with Mei prompt
- [ ] Implement streaming chat responses
- [ ] Add error handling and retry logic
- [ ] Test conversation flow with rate limiting

### Phase 4: Timer System
- [ ] Implement server-side timer validation
- [ ] Create timer synchronization system
- [ ] Add timer visual states and animations
- [ ] Handle timer expiry and session transitions
- [ ] Test timer accuracy and edge cases

### Phase 5: Feedback System
- [ ] Create feedback generation API endpoint
- [ ] Implement feedback parsing and display
- [ ] Add star rating component
- [ ] Test feedback quality and consistency
- [ ] Implement feedback caching if needed

### Phase 6: Polish & Testing
- [ ] Add loading states and error boundaries
- [ ] Implement responsive design refinements
- [ ] Add accessibility features (WCAG compliance)
- [ ] Performance optimization and bundle analysis
- [ ] End-to-end testing of complete user flow

### Phase 7: Deployment & Monitoring
- [ ] Configure Vercel deployment settings
- [ ] Set up environment variables and secrets
- [ ] Implement basic analytics tracking
- [ ] Add error monitoring (Vercel Analytics)
- [ ] Load testing and performance validation

## Risk Mitigation
- **LLM API failures**: Implement fallback responses and graceful error handling
- **Timer desync**: Server-side validation with client-side backup
- **Performance issues**: Progressive loading and optimization strategies
- **User abandonment**: Clear progress indicators and intuitive UI