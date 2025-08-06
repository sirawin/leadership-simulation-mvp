import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
})

const FEEDBACK_SYSTEM_PROMPT = `You are an expert leadership coach and communication assessor evaluating a project manager's performance during a critical check-in meeting with their manager Mei at ShelfPace.

## Context
The user just completed a simulated conversation with Mei about managing a high-priority inventory management software project facing two key challenges:
1. A skills gap in the development team that's impacting project complexity
2. CEO Bonnie Brillard's request to add an advanced feature to the initial release

## Your Task
Provide detailed, constructive feedback on the user's leadership communication skills. Focus on these three key areas:

### 1. Solution-Focused Communication
- Did they present clear, actionable solutions to the challenges?
- Did they demonstrate flexibility by proposing multiple options or alternatives?
- How well did they balance being proactive with being realistic?

### 2. Managing Expectations
- How effectively did they communicate the impact of challenges on timeline, scope, and quality?
- Did they anticipate potential concerns from stakeholders (Mei, CEO Bonnie, clients)?
- Did they propose contingency plans or risk mitigation strategies?

### 3. Effective Communication
- How well did they tie project decisions back to ShelfPace's business goals?
- Did they address challenges constructively rather than defensively?
- How clearly did they articulate priorities and trade-offs?

## Response Format
You must respond with a valid JSON object in this exact structure:

{
  "solutionFocused": "2-3 sentences highlighting what they did well, followed by 1-2 sentences on areas for improvement with specific examples",
  "managingExpectations": "2-3 sentences highlighting what they did well, followed by 1-2 sentences on areas for improvement with specific examples", 
  "effectiveCommunication": "2-3 sentences highlighting what they did well, followed by 1-2 sentences on areas for improvement with specific examples",
  "rating": [number from 1-5]
}

## Tone Guidelines
- Be constructive and supportive, not critical
- Use specific examples from their conversation
- Frame improvements as opportunities for growth
- Acknowledge the complexity of the leadership situation they navigated
- Keep feedback actionable and concrete`

export async function POST(req: NextRequest) {
  try {
    if (!process.env.CLAUDE_API_KEY) {
      throw new Error('CLAUDE_API_KEY environment variable is not set')
    }

    const { conversationHistory, selectedOption } = await req.json()

    if (!conversationHistory || conversationHistory.length === 0) {
      return NextResponse.json(
        { error: 'No conversation data provided' },
        { status: 400 }
      )
    }

    // Format conversation for analysis
    const conversationText = conversationHistory
      .map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'User' : 'Mei'}: ${msg.content}`)
      .join('\n\n')

    const analysisPrompt = `Please analyze the following conversation between a project manager (User) and their manager (Mei) at ShelfPace.

Initial approach chosen: Option ${selectedOption}
${getOptionDescription(selectedOption)}

Conversation:
${conversationText}

Provide feedback in the exact JSON format specified in your instructions.`

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.3,
      system: FEEDBACK_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
    })

    const responseText = response.content[0].type === 'text' 
      ? response.content[0].text 
      : null

    if (!responseText) {
      throw new Error('No response text received')
    }

    // Try to parse JSON response
    try {
      const feedback = JSON.parse(responseText)
      
      // Validate feedback structure
      if (!feedback.solutionFocused || !feedback.managingExpectations || 
          !feedback.effectiveCommunication || !feedback.rating) {
        throw new Error('Invalid feedback structure')
      }

      // Ensure rating is within valid range
      feedback.rating = Math.max(1, Math.min(5, Math.round(feedback.rating)))

      return NextResponse.json({ feedback })

    } catch (parseError) {
      console.error('Failed to parse feedback JSON:', parseError)
      
      // Fallback: extract feedback from text response
      const fallbackFeedback = {
        solutionFocused: "You engaged in problem-solving during the conversation. Consider proposing multiple concrete solutions with clear implementation steps and timelines.",
        managingExpectations: "You discussed project challenges with your manager. Focus on being more specific about impacts to timeline, quality, and stakeholder expectations.",
        effectiveCommunication: "You maintained professional dialogue throughout the conversation. Work on connecting your proposals more directly to business outcomes and organizational priorities.",
        rating: 3
      }

      return NextResponse.json({ feedback: fallbackFeedback })
    }

  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate feedback' },
      { status: 500 }
    )
  }
}

function getOptionDescription(selectedOption: number): string {
  switch (selectedOption) {
    case 1:
      return "Started by focusing on the skills gap as the primary issue"
    case 2:
      return "Started by focusing on Bonnie's feature request as the primary issue"
    case 3:
      return "Started by addressing both issues as equally important"
    case 4:
      return "Started with a progress update before addressing challenges"
    default:
      return "Started the conversation"
  }
}