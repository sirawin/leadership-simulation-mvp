# Leadership Simulation MVP

A web-based leadership simulation where users practice crucial conversations with their manager "Mei" through a timed chat interface, followed by AI-powered feedback analysis.

## 🚀 Features

- **Interactive Case Scenario**: Users review a realistic workplace challenge at ShelfPace involving project management decisions
- **Multiple Conversation Starters**: 4 different approaches to begin the conversation with Mei
- **Real-time Chat Interface**: Powered by Claude AI for natural, contextual responses
- **10-minute Timer**: Visual countdown with warning states at 5 minutes and critical alerts at 1 minute
- **AI-Powered Feedback**: Detailed analysis of communication skills with star ratings
- **Responsive Design**: Works across desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Backend**: Vercel Edge Functions (API routes)
- **LLM Integration**: Claude API for both Mei conversations and feedback
- **State Management**: React Context + useReducer
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Claude API key from Anthropic

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file:
   ```bash
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 🎯 User Flow

1. **Case Brief Review**: Users read the ShelfPace project management scenario
2. **Option Selection**: Choose from 4 conversation starter approaches
3. **Timed Conversation**: 10-minute chat with AI-powered Mei
4. **Feedback Analysis**: Detailed evaluation of communication skills
5. **Reset & Retry**: Option to practice the scenario again

## 🔧 Configuration

### Timer Settings
- Duration: 10 minutes (600 seconds)
- Warning state: 5 minutes remaining (yellow/blinking)
- Critical state: 1 minute remaining (red/fast blink)

### Feedback Categories
- **Solution-Focused Communication**: Evaluates problem-solving approach
- **Managing Expectations**: Assesses stakeholder communication
- **Effective Communication**: Reviews business alignment and clarity

## 📦 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add `CLAUDE_API_KEY` to environment variables
3. Deploy automatically on push to main

---

**Note**: This is an MVP (Minimum Viable Product) focused on demonstrating core functionality. Your Claude API key has been securely stored in `.env.local`.
