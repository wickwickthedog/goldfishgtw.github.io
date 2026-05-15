import type { Request, Response } from 'express'
import { z } from 'zod'
import { Post } from '../models/Post.js'

const postInput = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
})

export async function listPosts(_req: Request, res: Response) {
  const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).limit(20)
  res.json({ data: posts })
}

export async function getPostBySlug(req: Request, res: Response) {
  const post = await Post.findOne({ slug: req.params.slug })

  if (!post) {
    return res.status(404).json({ error: { message: 'Post not found' } })
  }

  res.json({ data: post })
}

export async function createPost(req: Request, res: Response) {
  const input = postInput.parse(req.body)
  const post = await Post.create({
    ...input,
    publishedAt: input.status === 'published' ? new Date() : undefined,
  })

  res.status(201).json({ data: post })
}

export async function updatePost(req: Request, res: Response) {
  const input = postInput.partial().parse(req.body)
  const post = await Post.findByIdAndUpdate(req.params.id, input, { new: true })

  if (!post) {
    return res.status(404).json({ error: { message: 'Post not found' } })
  }

  res.json({ data: post })
}

export async function deletePost(req: Request, res: Response) {
  const post = await Post.findByIdAndDelete(req.params.id)

  if (!post) {
    return res.status(404).json({ error: { message: 'Post not found' } })
  }

  res.status(204).send()
}

