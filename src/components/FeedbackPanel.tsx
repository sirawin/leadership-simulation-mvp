'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { useSession } from '@/contexts/SessionContext'
import { FeedbackResult } from '@/lib/types'

export function FeedbackPanel() {
  const { state } = useSession()
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (state.phase === 'feedback') {
      generateFeedback()
    }
  }, [state.phase])

  const generateFeedback = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: state.conversationHistory,
          selectedOption: state.selectedOption
        })
      })

      const data = await response.json()
      
      if (data.feedback) {
        setFeedback(data.feedback)
      } else {
        // Fallback feedback
        setFeedback({
          solutionFocused: "You presented some ideas during the conversation. Consider developing multiple solution options to demonstrate flexibility and thorough thinking.",
          managingExpectations: "You communicated about project challenges. Work on being more specific about timelines and potential impacts to stakeholders.",
          effectiveCommunication: "You engaged in the conversation constructively. Focus on tying decisions more explicitly back to business goals and priorities.",
          rating: 3
        })
      }
    } catch (error) {
      console.error('Feedback generation error:', error)
      // Fallback feedback on error
      setFeedback({
        solutionFocused: "You engaged in problem-solving during the conversation. Consider proposing multiple concrete solutions with clear implementation steps.",
        managingExpectations: "You discussed project challenges with your manager. Focus on being more specific about timelines, resources, and potential risks.",
        effectiveCommunication: "You maintained a professional conversation flow. Work on connecting your proposals more directly to business outcomes and organizational priorities.",
        rating: 3
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Generating Feedback...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    )
  }

  if (!feedback) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Feedback Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Unable to generate feedback at this time. Please try again.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Reflection & Feedback</CardTitle>
        <div className="flex justify-center items-center space-x-2 mt-4">
          {renderStars(feedback.rating)}
          <span className="text-lg font-semibold">{feedback.rating}/5</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Solution-Focused Communication</h3>
          <p className="text-gray-700 leading-relaxed">{feedback.solutionFocused}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Managing Expectations</h3>
          <p className="text-gray-700 leading-relaxed">{feedback.managingExpectations}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Effective Communication</h3>
          <p className="text-gray-700 leading-relaxed">{feedback.effectiveCommunication}</p>
        </div>
      </CardContent>
    </Card>
  )
}