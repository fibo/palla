import type { System } from './game'
import type { Vector } from './math'

export type ClientMessage =
  |
  {
    type: 'GET_SYSTEM_SNAPSHOT'
  }

export type ServerMessage =
  |
  {
    type: 'UPDATE_BALL'
    position: Vector
    velocity: Vector
  }
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
