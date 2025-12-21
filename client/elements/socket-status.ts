class SocketStatus extends HTMLElement {
  connectedCallback() {
    subscribe(['CONNECTED', 'DISCONNECTED', 'SOCKET_ID'], ({ connected, socketId }) => {
      console.log(connected, socketId)
    })
  }
}

customElements.define('socket-status', SocketStatus)
