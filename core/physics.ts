import type { System } from './game'
import type { Vector } from './math'
import { add } from './math'

export function updateBallPosition(
  position: Vector,
  velocity: Vector,
  FPS: number
): System['ball']['position'] {
  const deltaTime = 1 / FPS
  return {
    x: add(position.x, deltaTime * velocity.x),
    y: add(position.y, deltaTime * velocity.y)
  }
}

export function nextSystemState(system: System, FPS: number): boolean {
  const ball = system.ball
  const playground = system.playground

  // Update ball position
  system.ball.position = updateBallPosition(system.ball.position, system.ball.velocity, FPS)

  let gotCollision = false

  // Check for collisions with playground boundaries
  if (ball.position.x - ball.radius < 0 || ball.position.x + ball.radius > playground.width) {
    ball.velocity.x *= -1 // Reverse X velocity
    gotCollision = true
  }
  if (ball.position.y - ball.radius < 0 || ball.position.y + ball.radius > playground.height) {
    ball.velocity.y *= -1 // Reverse Y velocity
    gotCollision = true
  }

  return gotCollision
}
