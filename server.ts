import { build, outdir } from './build'
import type { Message } from './core/messages'

type WebSocketData = {
  sessionId: string
}

const LOCAL = !!process.env.LOCAL

/** Serve static files from the build output directory */
async function serveBuildFiles(req: Request): Promise<Response> {
    const url = new URL(req.url)
    // Ignore URL from Chrome DevTools
    if (url.pathname === '/.well-known/appspecific/com.chrome.devtools.json')
      return new Response(null, { status: 204 })
    const filePath = url.pathname === '/' ? '/index.html' : url.pathname
    try {
      const file = await Bun.file(outdir + filePath)
      return new Response(file)
    } catch (error) {
      console.error(error)
      return new Response('Not Found', { status: 404 })
    }
}

const server = Bun.serve({
  port: 4774, // P(4774) // PALLA
  async fetch(req) {
    const success = server.upgrade(req, { data: { sessionId: crypto.randomUUID() } })
    if (success)
      return

    if (LOCAL) {
      const res = await serveBuildFiles(req)
      return res
    }

    return new Response('WebSocket connection failed', { status: 500 })
  },
  websocket: {
    data: {} as WebSocketData,
    open(ws) {
      const message: Message = {
        type: 'SET_SESSION_ID',
        sessionId: ws.data.sessionId,
      }
      ws.send(JSON.stringify(message))
    },
    message(ws, message) {
      ws.send(message); // echo back the message
    },
    drain(ws) {
      console.warn('backpressure' + ws.getBufferedAmount())
    }
  }
})

if (LOCAL) {
  const WEBSOCKET_URL = server.url.toString().replace('http', 'ws')
  build(WEBSOCKET_URL)
}

console.info(`○ palla server running on ${server.url}`)
