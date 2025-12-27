import type { System } from '@core/game'

export type Action =
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECTED' }
  | { type: 'SET_SESSION_ID'; sessionId: string }
  | { type: 'SET_SYSTEM_SNAPSHOT'; system: System }

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
  for (const callback of subscribers.get(type) || [])
    invoke(callback)
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
  if (action.type === 'CONNECTED')
    state.connected = true

  if (action.type === 'DISCONNECTED')
    state.connected = false

  if (action.type === 'SET_SESSION_ID')
    state.sessionId = action.sessionId

  if (action.type === 'SET_SYSTEM_SNAPSHOT')
    state.system = action.system

  notify(action.type)
}

globalThis.publish = publish
