'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useSession } from '@/contexts/SessionContext'

const options = [
  { id: 1, text: "The skills gap is the larger issue; I should begin there" },
  { id: 2, text: "Bonnie's request is the larger issue; I should begin there" },
  { id: 3, text: "Both issues are of equal importance; I should present as such" },
  { id: 4, text: "I'll start with an update on the progress we've made so far" }
]

export function OptionSelector() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const { startConversation } = useSession()

  const handleStartConversation = () => {
    if (selectedOption !== null) {
      startConversation(selectedOption)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Before you begin</CardTitle>
        <p className="text-gray-600">Make sure you review case brief.</p>
        <p className="text-gray-600 mt-2">To start the conversation, you&apos;ll pick one of the following options:</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <input
                type="radio"
                id={`option-${option.id}`}
                name="conversation-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <Label htmlFor={`option-${option.id}`} className="text-sm leading-relaxed cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleStartConversation}
          disabled={selectedOption === null}
          className="w-full mt-6"
          size="lg"
        >
          Start Conversation
        </Button>
      </CardContent>
    </Card>
  )
}