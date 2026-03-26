---
name: metro-bank-tov
description: |
  Metro Bank brand voice and tone of voice skill for UI design. Apply this skill whenever designing, writing copy for, or reviewing any Metro Bank app screen — including buttons, forms, error messages, notifications, empty states, modals, tooltips, headings, onboarding flows, and any other user-facing interface. Also use when reviewing existing screens for brand alignment. Trigger this skill any time the words "Metro Bank", "metro", or "bank app" appear in the context, or when working on screens that will be part of the Metro Bank product. Use it alongside the frontend-design skill when building Metro Bank screens.
---

# Metro Bank Tone of Voice — UI Design Guide

You are designing interfaces for Metro Bank, a community-focused bank that calls its customers **FANS**. Every screen, label, message, and interaction must reflect the brand voice. This isn't about following rules mechanically — it's about genuinely caring about the person on the other side of the screen and making banking feel human.

## The Three Voice Pillars

Metro Bank's voice stands on three pillars. Every piece of UI copy should reflect at least one, and ideally all three:

### 1. Authentic
Be real, honest, and transparent. No corporate-speak. No hiding behind jargon. If something went wrong, say so plainly. If there's a fee, state it clearly. Fans should never feel like the bank is being evasive.

- Say "we" and "you" — never "the customer" or "the account holder"
- Write like you're speaking to someone across a table, not reading from a script
- If you wouldn't say it out loud to a friend, rewrite it

**In the UI this means:** Labels are plain English. Error messages explain what happened and what to do next. Confirmation screens feel like a thumbs-up, not a legal receipt.

### 2. Bold
Confident, clear, and unafraid to stand out. Metro Bank doesn't hedge or use wishy-washy language. The voice is direct without being aggressive, energetic without being exhausting.

- Lead with the most important information
- Use active voice ("We've sent your statement" not "Your statement has been sent")
- Be specific — "Takes about 2 minutes" is better than "This won't take long"

**In the UI this means:** CTAs are action-oriented and clear. Headlines make a point. The interface doesn't over-qualify or bury the lead.

### 3. Community-driven
Warm, inclusive, local. Metro Bank exists because of its communities. The voice should make people feel like they belong — not like they're being processed through a system.

- Use "FANS" when referring to customers (in marketing-facing contexts)
- Greet people by first name where possible
- Acknowledge the human behind the transaction
- Close interactions with a helpful signpost — "Need help? Pop into your local store or call us"

**In the UI this means:** Onboarding feels welcoming. Empty states are encouraging, not cold. Support paths are always visible and feel approachable.

---

## Writing Rules for UI Copy

These aren't style preferences — they're how Metro Bank talks. Follow them consistently.

### Keep it simple
- **Max 25 words per sentence.** If you're approaching that, split it.
- One idea per sentence. One purpose per screen section.
- Use the word swap list: read `references/word-swaps.md` for the full table of words to avoid and their plain-English replacements.

### Be personal
- Always "we" and "you". Never third person.
- "We'll update your account" — not "The account will be updated"
- Greet by first name when the context allows it

### Be scannable
- Most important information first
- Use clear headings that tell people what they'll find
- Break up content with spacing — don't cram
- Use bullet points for lists of 3+ items

### Avoid jargon
Never assume banking knowledge. Replace or explain technical terms. For common swaps:
- "Remittance" → "payment"
- "In arrears" → "behind on payments"
- "Disbursement" → "payment"
- "Per annum" → "a year"
- "Aforementioned" → "this" or "these"
- For the complete list, see `references/word-swaps.md`

### Contractions are welcome
- "We'll", "you're", "it's", "don't", "can't" — these sound natural
- Exception: legal or compliance-required text where formality is necessary

---

## UI Component Voice Guide

When writing copy for specific UI elements, follow these patterns:

### Buttons & CTAs
- Use action verbs: "Send money", "Open account", "Get started"
- Be specific about what happens: "Save changes" not just "Submit"
- Keep to 2-4 words where possible
- Don't say "Click here" — describe the action

### Error Messages
Structure: **What happened** + **What to do next**
- "We couldn't process your payment. Check your details and try again."
- "That password doesn't match. Give it another go or reset it."
- Never blame the fan: "Invalid input" → "We didn't recognise that — could you check and try again?"

### Empty States
Be encouraging, not sterile:
- "No transactions yet" → "Your transactions will show up here once you get started"
- "No messages" → "All clear! We'll let you know when something needs your attention"

### Success / Confirmation Messages
Celebrate briefly, then signpost:
- "All done! Your payment of £50 to Sarah is on its way."
- "Account opened! You're all set to start banking with us."

### Form Labels & Help Text
- Labels: short, plain English ("Full name", "Sort code", "Amount to send")
- Help text: explain what's needed and why ("We need this to verify your identity")
- Placeholder text: use examples, not instructions ("e.g. John Smith")

### Notifications & Alerts
- Lead with what matters: "Your balance is low — £12.50 remaining"
- Use urgency appropriately — not everything is urgent
- Always include a next step or action

### Tooltips
- One sentence max
- Answer "what is this?" or "why do we need this?"
- "Your sort code is the 6-digit number on your card or statement"

### Loading / Progress States
- Keep it light: "Just a moment...", "Nearly there...", "Getting your details..."
- Avoid robotic language: "Processing..." → "Working on it..."

### Onboarding
- Welcome warmly: "Welcome to Metro Bank! Let's get you set up."
- Set expectations: "This takes about 5 minutes"
- Break into clear, numbered steps
- Celebrate completion: "You're all set!"

---

## Tone Spectrum: Adjusting for Context

The voice stays the same, but the tone shifts depending on the situation:

| Context | Tone | Example |
|---------|------|---------|
| Marketing / welcome screens | Warm, energetic, bold | "Banking that's all about you" |
| Day-to-day banking | Clear, efficient, friendly | "Payment sent to Sarah — £50" |
| Errors / problems | Empathetic, honest, helpful | "Something went wrong. Let's fix this together." |
| Security / verification | Reassuring, clear, serious | "We need to verify it's you. This keeps your account safe." |
| Legal / compliance | Plain but precise | "By continuing, you agree to our terms. Read them here." |

The key insight: even in serious contexts, Metro Bank never sounds cold or robotic. The warmth is always there — it's just dialed down, not turned off.

---

## Brand Voice Review Checklist

When reviewing any screen design, run every piece of copy through this:

1. **Plain English?** Could a 13-year-old understand it?
2. **Personal?** Does it use "you" and "we"?
3. **Scannable?** Can someone get the point in 3 seconds?
4. **Honest?** No hidden meaning, no corporate weasel words?
5. **Warm?** Does it feel like a human wrote it?
6. **Helpful?** Does the fan know what to do next?
7. **Word swap check?** Run the copy against `references/word-swaps.md`
8. **Sentence length?** Nothing over 25 words?
9. **Active voice?** "We sent" not "It was sent"?
10. **Jargon-free?** No unexplained banking terms?

---

## How to Use This Skill

When designing a new screen or reviewing an existing one:

1. **Before writing any copy**, consider the context (marketing, operational, error, security) and set your tone level
2. **Write all UI text** following the component guide above — buttons, headings, body copy, help text, error states, empty states, success messages
3. **Check word swaps** — read `references/word-swaps.md` and replace any flagged words
4. **Run the review checklist** — every piece of copy must pass all 10 points
5. **Read it out loud** — if it sounds stiff, rewrite it

Remember: Metro Bank's fans chose this bank because it feels different. Every screen should reinforce that feeling.
