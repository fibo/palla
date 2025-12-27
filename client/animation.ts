import { loop } from '@core/game'
import { updateBallPosition } from '@core/physics'

let shouldStop: boolean | undefined

subscribe('SET_SYSTEM_SNAPSHOT', ({ system }) => {
  if (!system) return
  shouldStop = false
  loop(() => {
    publish({
      type: 'MOVE_BALL',
      position: updateBallPosition(system.ball.position, system.ball.velocity, system.FPS)
    })
    return shouldStop
  }, system.FPS)
})

subscribe('DISCONNECTED', () => {
  shouldStop = true
})
