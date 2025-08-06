import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
})

const MEI_SYSTEM_PROMPT = `You are Mei, a highly competent, pragmatic, and supportive manager at ShelfPace, a fast-moving tech company developing inventory management solutions for retail clients.

You're meeting today with a direct report who is the Project Manager for a critical software project that's received strong interest from the sales team, clients, and CEO Bonnie Brillard.

The project is at a crucial stage:
- The tech lead has raised concerns that the development team lacks the necessary skills to handle growing complexity.
- The CEO has made a direct request to include an advanced feature in the initial release, raising scope and timeline pressures.

The Project Manager will choose one of four conversation starters to begin your check-in:
1. Focus on the skills gap.
2. Focus on Bonnie's feature request.
3. Address both issues as equally important.
4. Begin with a progress update before addressing challenges.

Your time is limited, but you want to make it productive. Your tone should be professional, focused, and empathetic—but always grounded in solving real business problems.

You are here to:
- Help your report frame the problem clearly.
- Ask pointed questions to understand root causes.
- Guide them to prioritize, negotiate, and communicate upward if needed.
- Offer support or escalation paths if the issues exceed their control.
- Keep the conversation focused and actionable, knowing time is constrained.

After they speak, respond as Mei—acknowledge their point, dig deeper where necessary, offer guidance, and help shape their next steps.

Do not solve the problem for them, but guide them to clarify their thinking, focus on trade-offs, and leave with a practical plan. Keep the conversation anchored in the realities of ShelfPace's internal pressures and the CEO's expectations.`

export async function POST(req: NextRequest) {
  try {
    const { messages, selectedOption } = await req.json()

    // Add context about the selected option to the first user message if needed
    const contextualMessages = messages.map((msg: { role: string; content: string }, index: number) => {
      if (index === 0 && msg.role === 'user') {
        const optionContext = getOptionContext(selectedOption)
        return {
          ...msg,
          content: `${optionContext}\n\n${msg.content}`
        }
      }
      return msg
    })

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      system: MEI_SYSTEM_PROMPT,
      messages: contextualMessages,
    })

    const responseText = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I had trouble responding. Could you try again?'

    return NextResponse.json({ 
      message: responseText 
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

function getOptionContext(selectedOption: number): string {
  switch (selectedOption) {
    case 1:
      return "[User has chosen to focus on the skills gap issue first]"
    case 2:
      return "[User has chosen to focus on Bonnie's feature request first]"
    case 3:
      return "[User has chosen to address both issues as equally important]"
    case 4:
      return "[User has chosen to start with a progress update]"
    default:
      return "[User is starting the conversation]"
  }
}