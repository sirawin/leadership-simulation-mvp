# Leadership Simulation MVP

i'm building leadership simulation mvp.

user will receive case brief in the start page:
(Today's check-in with Mei, your manager, couldn't come at a better time. As the Project
Manager for a new software application to help retail stores with their inventory
management, your work has been touted by your CEO Bonnie Brillard as a major priority for
your company, ShelfPace. Your sales team is already having conversations about the tool's
power, and clients and prospects are excited. But, warning signals have begun to appear.
First, your tech lead recently reached out to let you know that the project has become more
complex than originally anticipated. It seems as though the development team doesn't have
the skills to move forward efficiently. And to top it off, you also have a direct ask from your
CEO to include an advanced feature in the initial release!
Mei has a lot of balls in the air, and your time with her is limited. Will you get her to focus on
your challenges and provide the support and guidance you need?)

there will be vertical, rectangle area in the right part of the web with this multiple choice question and a "start conversation" below:

(Before you begin make sure you review case brief.
To start the conversation, you'll pick one of the following options:
1. The skills gap is the larger issue; | should begin there
2. Bonnie's request is the larger issue; | should begin there
3. Both issues are of equal importance; | should present as such
4. I'll start with an update on the progress we've made so far)

the vertical, rectangle area will then change into chat-like interface with the manager Mei, who actually in the backend is an llm
system prompt for Mei is in mei-prompt-v0.md.

Conversation with Mei have a 10 minute time limit. show time countdown on the top right corner. make sure it blink in red-black at five minute and start blinking every 0.5 seconds when the count down is at one minute left.

after time limit is up, the type box will be replace with these text:
"Ready to take another swing?
Reset to practice this interaction again." and a red "Reset Interaction" button.

the left area that used to be case brief will now be turn into "reflect" page with star rating out of five and detailed feedback given by another llm model.
system prompt for feedback llm is in feedback-prompt.md.

preferred tech stack: vercel, Shadcn Chatbot Kit, shadcn