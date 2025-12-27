import './game-view.css'

const nsURI = 'http://www.w3.org/2000/svg'

export class HTMLGameViewElement extends HTMLElement {
  svg = document.createElementNS(nsURI, 'svg')
  ball = document.createElementNS(nsURI, 'circle')

  connectedCallback() {
    const ball = this.ball
    ball.setAttribute('fill', 'blue')
    this.svg.append(ball)
    this.append(this.svg)
    subscribe('SET_SYSTEM_SNAPSHOT', ({ system }) => {
      if (!system) return
      ball.setAttribute('cx', `${system.ball.position.x}`)
      ball.setAttribute('cy', `${system.ball.position.y}`)
      ball.setAttribute('r', `${system.ball.radius}`)
      this.setDimensions(system.playground.width, system.playground.height)
    })
  }

  setDimensions(width: number, height: number) {
    this.style.width = `${width}px`
    this.style.height = `${height}px`
    const svg = this.svg
    svg.setAttribute('width', `${width}`)
    svg.setAttribute('height', `${height}`)
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }

  moveBall(x: number, y: number) {
    const ball = this.ball
    ball.setAttribute('cx', `${x}`)
    ball.setAttribute('cy', `${y}`)
  }
}

customElements.define('game-view', HTMLGameViewElement)
