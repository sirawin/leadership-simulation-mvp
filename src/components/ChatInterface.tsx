'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from '@/contexts/SessionContext'
import { Send, Loader2 } from 'lucide-react'

export function ChatInterface() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { state, addMessage } = useSession()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.conversationHistory])

  useEffect(() => {
    if (state.conversationHistory.length === 0) {
      // Send initial message from Mei when conversation starts
      handleInitialMessage()
    }
  }, [])

  const handleInitialMessage = async () => {
    const initialMessage = getInitialMeiMessage(state.selectedOption || 1)
    addMessage('assistant', initialMessage)
  }

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading || state.status !== 'active') return

    const userMessage = message.trim()
    setMessage('')
    setIsLoading(true)

    // Add user message
    addMessage('user', userMessage)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...state.conversationHistory,
            { role: 'user', content: userMessage }
          ],
          selectedOption: state.selectedOption
        })
      })

      const data = await response.json()
      
      if (data.message) {
        addMessage('assistant', data.message)
      } else {
        addMessage('assistant', 'Sorry, I had trouble responding. Could you try again?')
      }
    } catch (error) {
      console.error('Chat error:', error)
      addMessage('assistant', 'Sorry, there was a connection issue. Could you try again?')
    } finally {
      setIsLoading(false)
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Conversation with Mei</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
          {state.conversationHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {msg.role === 'user' ? 'You' : 'Mei'}
                </div>
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Mei is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {state.status === 'active' ? (
          <div className="flex space-x-2">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 min-h-[80px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="icon"
              className="h-[80px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            Conversation has ended
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getInitialMeiMessage(selectedOption: number): string {
  switch (selectedOption) {
    case 1:
      return "Hi there! I'm glad we could connect today. I understand you wanted to talk about some challenges with the team's skill set. What's the situation you're seeing?"
    case 2:
      return "Good to see you! I know Bonnie's been excited about adding that advanced feature to the initial release. What are your thoughts on how we can make that work?"
    case 3:
      return "Thanks for making time today. I know you're juggling both the skills gap issue and Bonnie's feature request. Where should we start?"
    case 4:
      return "Hey! Good timing for our check-in. I'd love to hear how things have been progressing on the project. What updates do you have for me?"
    default:
      return "Hi! Great to catch up with you today. What's on your mind regarding the project?"
  }
}