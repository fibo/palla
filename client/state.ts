import type { System } from '@core/game'
import type { Vector } from '@core/math'

export type Action =
  |
  { type: 'CONNECTED' }
  |
  { type: 'DISCONNECTED' }
  |
  {
    type: 'MOVE_BALL'
    position: Vector
  }
  |
  {
    type: 'SET_SESSION_ID'
    sessionId: string
  }
  |
  {
    type: 'SET_SYSTEM_SNAPSHOT'
    system: System
  }
  |
  {
    type: 'UPDATE_BALL'
    position: Vector
    velocity: Vector
  }

export type Callback = (arg: State) => void

type State = Partial<{
  connected: boolean
  sessionId: string
  system: System
}>

const state: State = {}

const subscribers = new Map<Action['type'], Set<Callback>>()

function invoke(callback: Callback) {
  try {
    callback(state)
  } catch (error) {
    console.error(error)
  }
}

function notify(type: Action['type']) {
  for (const callback of subscribers.get(type) || []) {
    invoke(callback)
  }
}

export type SubscriptionKey = Action['type'] | Array<Action['type']>

function subscribe(key: SubscriptionKey, callback: Callback) {
  const actionTypes = Array.isArray(key) ? key : [key]
  for (const type of actionTypes) {
    const callbacks = subscribers.get(type)
    if (callbacks)
      callbacks.add(callback)
    else
      subscribers.set(type, new Set([callback]))
  }
  invoke(callback)
  return function unsubscribe() {
    for (const type of actionTypes)
      subscribers.get(type)?.delete(callback)
  }
}

globalThis.subscribe = subscribe

function publish(action: Action) {
  if (action.type === 'CONNECTED') {
    state.connected = true
  }

  if (action.type === 'DISCONNECTED') {
    state.connected = false
  }

  if (action.type === 'MOVE_BALL') {
    if (!state.system) return
    state.system.ball.position = action.position
  }

  if (action.type === 'SET_SESSION_ID') {
    state.sessionId = action.sessionId
  }

  if (action.type === 'SET_SYSTEM_SNAPSHOT') {
    state.system = action.system
  }

  if (action.type === 'UPDATE_BALL' && state.system) {
    if (!state.system) return
    state.system.ball.position = action.position
    state.system.ball.velocity = action.velocity
  }

  notify(action.type)
}

globalThis.publish = publish
