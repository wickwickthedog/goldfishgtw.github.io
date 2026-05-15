import { Router, Request, Response } from 'express'
import { z } from 'zod'

import { requireAdmin } from '../middleware/auth'
import Post from '../models/Post'

const router = Router()

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  body: z.string().min(1, 'Body is required'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  coverImage: z.string().url().optional().or(z.literal('')),
})

const UpdatePostSchema = PostSchema.partial()

router.get('/', async (_req: Request, res: Response) => {
  const posts = await Post.find({ published: true })
    .sort({ createdAt: -1 })
    .select('-body')

  res.json({ data: posts })
})

router.get('/:slug', async (req: Request, res: Response) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    published: true,
  })

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  res.json({ data: post })
})

router.post('/', requireAdmin, async (req: Request, res: Response) => {
  const result = PostSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      issues: result.error.issues,
    })
    return
  }

  const post = await Post.create(result.data)

  res.status(201).json({ data: post })
})

router.patch('/:id', requireAdmin, async (req: Request, res: Response) => {
  const result = UpdatePostSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      issues: result.error.issues,
    })
    return
  }

  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  Object.assign(post, result.data)
  await post.save()

  res.json({ data: post })
})

router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  const post = await Post.findByIdAndDelete(req.params.id)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
    return
  }

  res.json({ data: post })
})

export default router
