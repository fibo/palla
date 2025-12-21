export type Action =
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECTED' }
  | { type: 'SOCKET_ID'; data: { socketId: string } }

export type Callback = (arg: State) => void

type State = Partial<{
  connected: boolean
  socketId: string
}>

const state: State = {
}

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

function subscribe(types: Array<Action['type']>, callback: (arg: State) => void) {
  for (const type of types) {
    const callbacks = subscribers.get(type)
    if (callbacks)
      callbacks.add(callback)
    else
      subscribers.set(type, new Set([callback]))
  }
  invoke(callback)
  return function unsubscribe() {
    for (const type of types)
      subscribers.get(type)?.delete(callback)
  }
}

globalThis.subscribe = subscribe

function publish(action: Action) {
  if (action.type === 'CONNECTED')
    state.connected = true

  if (action.type === 'DISCONNECTED')
    state.connected = false

  if (action.type === 'SOCKET_ID')
    state.socketId = action.data.socketId

  notify(action.type)
}

globalThis.publish = publish
