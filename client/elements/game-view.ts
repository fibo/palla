import './game-view.css'

const nsURI = 'http://www.w3.org/2000/svg'

export class HTMLGameViewElement extends HTMLElement {
  svg = document.createElementNS(nsURI, 'svg')

  connectedCallback() {
    this.setDimensions(600, 400)
    const ball = document.createElementNS(nsURI, 'circle')
    ball.setAttribute('cx', '50')
    ball.setAttribute('cy', '50')
    ball.setAttribute('r', '10')
    ball.setAttribute('fill', 'blue')
    this.svg.append(ball)
    this.append(this.svg)
  }

  setDimensions(width: number, height: number) {
    this.style.width = `${width}px`
    this.style.height = `${height}px`
    const svg = this.svg
    svg.setAttribute('width', `${width}`)
    svg.setAttribute('height', `${height}`)
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }
}

customElements.define('game-view', HTMLGameViewElement)
