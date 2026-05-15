import express, { type NextFunction, type Request, type Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { ZodError } from 'zod'
import { bookmarksRouter } from './routes/bookmarks.js'
import { openApiDocument } from './swagger/openapi.js'

const app = express()
const port = Number(process.env.PORT ?? 4100)

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'rest-api-swagger' })
})

app.use('/api/bookmarks', bookmarksRouter)

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next

  if (error instanceof ZodError) {
    return res.status(400).json({ error: { message: 'Invalid request body', issues: error.flatten() } })
  }

  console.error(error)
  res.status(500).json({ error: { message: 'Internal server error' } })
})

app.listen(port, () => {
  console.log(`REST API running on http://localhost:${port}`)
  console.log(`Swagger docs running on http://localhost:${port}/docs`)
})
