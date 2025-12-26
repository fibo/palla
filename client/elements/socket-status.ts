export class SocketStatus extends HTMLElement {
  #text = h('span')

  connectedCallback() {
    this.append(this.#text)

    subscribe(['CONNECTED', 'DISCONNECTED'], ({ connected }) => {
      if (connected === undefined) return
      this.#setText(connected)
    })
  }

  #setText(connected: boolean) {
    this.#text.textContent = connected ? '🟢 Connected' : '🔴 Disconnected'
  }
}

customElements.define('socket-status', SocketStatus)
