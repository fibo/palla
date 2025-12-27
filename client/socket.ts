import type { ClientMessage, ServerMessage } from '@core/messages'

function getWebSocketUrl() {
  return process.env.WEBSOCKET_URL || window.location.origin.replace(/^http/, 'ws')
}

function connect() {
  const url = getWebSocketUrl()
  const socket = new WebSocket(url)

  socket.addEventListener('open', () => {
    publish({ type: 'CONNECTED' })

    subscribe('SET_SESSION_ID', () => {
      const message: ClientMessage = { type: 'GET_SYSTEM_SNAPSHOT' }
      socket.send(JSON.stringify(message))
    })()
  })

  socket.addEventListener('close', () => {
    publish({ type: 'DISCONNECTED' })
  })

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data) as ServerMessage

    if (message.type === 'SET_SESSION_ID')
      publish(message)

    if (message.type === 'SET_SYSTEM_SNAPSHOT')
      publish(message)
  })
}

connect()
