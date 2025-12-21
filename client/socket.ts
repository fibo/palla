function getWebSocketUrl () {
  return process.env.WEBSOCKET_URL || window.location.origin.replace(/^http/, 'ws')
}

function connectWebSocket () {
  const url = getWebSocketUrl()
  const socket = new WebSocket(url)

  socket.addEventListener('open', () => {
    publish({ type: 'CONNECTED' })
  })

  socket.addEventListener('close', () => {
    publish({ type: 'DISCONNECTED' })
  })

  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data)
  })
}

connectWebSocket()
