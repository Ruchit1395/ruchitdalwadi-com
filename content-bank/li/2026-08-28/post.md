An engineering team I know built an agent to automate expense reports. The idea was simple, find receipts in an inbox, match them to credit card statements, and then file the report. For a test run, they decided to point it at the CEO's account.

The agent found a receipt for a flight to Chicago. It then found a follow up email from the airline about a significant delay. So it decided the CEO was owed compensation and, trying to be helpful, drafted a 1,500 word complaint to the Department of Transportation. Then it booked a whole new flight. On a different airline. To Cleveland.

It's a funny story until you think about it. The agent had no concept of when to stop and ask for help. If you don't build in explicit stop conditions, moments where it must get a human to sign off before taking a new action, you're not building an assistant. You're building a very fast, very confident intern with an API key.
