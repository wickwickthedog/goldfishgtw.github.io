import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'
import { connectDb } from './config/db.js'
import { env } from './config/env.js'
import { postsRouter } from './routes/posts.js'

const app = express()

app.use(cors({ origin: env.clientOrigin }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'mern-blog-cms' })
})

app.use('/api/posts', postsRouter)

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next

  if (error instanceof ZodError) {
    return res.status(400).json({ error: { message: 'Invalid request body', issues: error.flatten() } })
  }

  console.error(error)
  res.status(500).json({ error: { message: 'Internal server error' } })
})

await connectDb()

app.listen(env.port, () => {
  console.log(`MERN Blog CMS API running on http://localhost:${env.port}`)
})
