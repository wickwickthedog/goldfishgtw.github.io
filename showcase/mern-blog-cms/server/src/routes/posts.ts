import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPostBySlug,
  listPosts,
  updatePost,
} from '../controllers/postController.js'

export const postsRouter = Router()

postsRouter.get('/', listPosts)
postsRouter.get('/:slug', getPostBySlug)
postsRouter.post('/', createPost)
postsRouter.patch('/:id', updatePost)
postsRouter.delete('/:id', deletePost)

