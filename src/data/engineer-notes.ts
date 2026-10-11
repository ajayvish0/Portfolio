export const NOTES = [
  {
    index: "01",
    cat: "Voice AI",
    date: "2026",
    title: "Barge-In Is the Feature",
    summary:
      "A voice agent that keeps talking over you doesn't feel like a conversation. In Property Voice AI, user speech cancels the active GPT-4o stream and the audio queue instantly, so the user is always the one in control.",
    expanded:
      "GPT-4o tokens stream over Socket.IO and are cut into sentences for TTS playback, so the seller starts speaking before the full reply exists. Voice-activity detection on the client triggers an AbortController that cancels both the model stream and any queued audio the moment the user starts talking.",
    meta: "Voice AI · Streaming · Socket.IO",
  },
  {
    index: "02",
    cat: "Backend",
    date: "2026",
    title: "Move Slow Work Off the Request Path",
    summary:
      "Call dispositions, campaign sync and lead updates don't need to block the agent's next call. Moving them to asynchronous background jobs raised throughput by 45% in a property-tech CRM.",
    expanded:
      "The request path does only what the caller needs right now; everything else is queued. Optimized indexing and transactional patterns keep the queued work consistent, which cut data inconsistencies by 60%.",
    meta: "Backend · Async Jobs · Data Integrity",
  },
];
