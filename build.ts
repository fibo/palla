import { rm } from 'node:fs/promises'

export const outdir = 'public'

async function clean() {
  try {
    await rm(outdir, { recursive: true })
  } catch (error) {
    if ((error as { code: string }).code === 'ENOENT') return
    console.error(error)
  }
}

export async function build(WEBSOCKET_URL: string) {
  await clean()
  await Bun.build({
    entrypoints: ['./index.html'],
    define: {
      'process.env.WEBSOCKET_URL': `"${WEBSOCKET_URL}"`,
    },
    env: 'disable',
    minify: {
      whitespace: true,
    },
    naming: {
      // default values
      entry: '[dir]/[name].[ext]',
      chunk: 'assets/[hash].[ext]',
      asset: 'assets/[name].[ext]'
    },
    outdir,
  })
}

if (import.meta.main) {
  const WEBSOCKET_URL = process.env.WEBSOCKET_URL
  if (!WEBSOCKET_URL)
    throw new Error('Missing WEBSOCKET_URL environment variable')

  build(WEBSOCKET_URL)
}
