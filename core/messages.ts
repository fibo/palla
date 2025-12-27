import type { System } from './game'

export type ClientMessage =
  |
  {
    type: 'GET_SYSTEM_SNAPSHOT'
  }

export type ServerMessage =
  |
  {
    type: 'SET_SYSTEM_SNAPSHOT'
    system: System
  }
  |
  {
    type: 'SET_SESSION_ID'
    sessionId: string
  }
