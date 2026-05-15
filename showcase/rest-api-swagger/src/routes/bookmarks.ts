import { Router } from 'express'
import { z } from 'zod'

const bookmarkInput = z.object({
  title: z.string().min(2),
  url: z.string().url(),
  tags: z.array(z.string()).default([]),
})

const bookmarks = [
  {
    id: 'bm_1',
    title: 'OpenAPI Specification',
    url: 'https://spec.openapis.org/oas/latest.html',
    tags: ['api', 'docs'],
  },
]

export const bookmarksRouter = Router()

bookmarksRouter.get('/', (_req, res) => {
  res.json({ data: bookmarks })
})

bookmarksRouter.post('/', (req, res) => {
  const input = bookmarkInput.parse(req.body)
  const bookmark = { id: `bm_${Date.now()}`, ...input }
  bookmarks.push(bookmark)

  res.status(201).json({ data: bookmark })
})

