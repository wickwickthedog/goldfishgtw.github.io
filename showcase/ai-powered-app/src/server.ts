import 'dotenv/config'
import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { z, ZodError } from 'zod'

const app = express()
const port = Number(process.env.PORT ?? 4200)

const draftInput = z.object({
  notes: z.string().min(20),
  audience: z.string().min(3),
  tone: z.enum(['practical', 'friendly', 'technical']).default('practical'),
})

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'ai-powered-blog-assistant' })
})

app.post('/api/drafts', async (req, res) => {
  const input = draftInput.parse(req.body)

  // Replace this stub with an AI SDK call after choosing your provider.
  // Keep the call here on the server so your API key never reaches the browser.
  const draft = {
    titles: [
      `How ${input.audience} Can Approach This Problem`,
      `A ${input.tone} Guide Based on Your Notes`,
      'From Rough Notes to a Useful Blog Post',
    ],
    outline: [
      'Problem and context',
      'Key lessons from the notes',
      'Practical implementation steps',
      'Tradeoffs and next actions',
    ],
    tags: ['writing', 'software-engineering', input.tone],
    intro: `This draft turns your notes into a ${input.tone} article for ${input.audience}.`,
  }

  res.json({ data: draft })
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next

  if (error instanceof ZodError) {
    return res.status(400).json({ error: { message: 'Invalid request body', issues: error.flatten() } })
  }

  console.error(error)
  res.status(500).json({ error: { message: 'Internal server error' } })
})

app.listen(port, () => {
  console.log(`AI assistant API running on http://localhost:${port}`)
})
