
/** Client-server messages */
export type Message =
  | { type: 'SET_SESSION_ID'; sessionId: string }
