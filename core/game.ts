import type { Vector } from './math'

/** Returns true if loop should stop */
export type LoopCallback = () => boolean | void

export function loop(
  callback: LoopCallback,
  /** Frames per second */
  FPS: number
) {
  const now = performance.now()
  try {
    const shouldStop = callback()
    if (shouldStop) return
  } catch (error) {
    console.error(error)
    return
  }
  setTimeout(() => {
    loop(callback, FPS)
  }, Math.round(now + 1000 / FPS - performance.now()))
}

export type System = {
  ball: {
    radius: number
    position: Vector
    /** Pixels per second. */
    velocity: { x: number; y: number }
  }
  playground: {
    width: number
    height: number
  }
  FPS: number
}

export type Room = {
  id: string
  players: Set<string>
  system: System
}
