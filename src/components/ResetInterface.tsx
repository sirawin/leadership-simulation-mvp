'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSession } from '@/contexts/SessionContext'

export function ResetInterface() {
  const { resetSession } = useSession()

  return (
    <Card className="h-full flex flex-col justify-center">
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Ready to take another swing?
          </h3>
          <p className="text-gray-600">
            Reset to practice this interaction again.
          </p>
        </div>
        
        <Button 
          onClick={resetSession}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
        >
          Reset Interaction
        </Button>
      </CardContent>
    </Card>
  )
}