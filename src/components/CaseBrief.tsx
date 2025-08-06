'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CaseBrief() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Case Brief</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed">
          Today&apos;s check-in with Mei, your manager, couldn&apos;t come at a better time. As the Project 
          Manager for a new software application to help retail stores with their inventory 
          management, your work has been touted by your CEO Bonnie Brillard as a major priority for 
          your company, ShelfPace. Your sales team is already having conversations about the tool&apos;s 
          power, and clients and prospects are excited. But, warning signals have begun to appear.
        </p>
        
        <p className="text-gray-700 leading-relaxed mt-4">
          First, your tech lead recently reached out to let you know that the project has become more 
          complex than originally anticipated. It seems as though the development team doesn&apos;t have 
          the skills to move forward efficiently. And to top it off, you also have a direct ask from your 
          CEO to include an advanced feature in the initial release!
        </p>
        
        <p className="text-gray-700 leading-relaxed mt-4">
          Mei has a lot of balls in the air, and your time with her is limited. Will you get her to focus on 
          your challenges and provide the support and guidance you need?
        </p>
      </CardContent>
    </Card>
  )
}