/**
 * auth routes — POST /api/auth/login
 */

import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = Router()

const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

router.post('/login', (req: Request, res: Response) => {
  const result = LoginSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).json({
      error: 'Validation failed',
      issues: result.error.issues,
    })
    return
  }

  const { username, password } = result.data

  const validUsername = username === process.env.ADMIN_USERNAME
  const validPassword = password === process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    console.warn(`Failed login attempt with username: ${username}`)
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured')
    res.status(500).json({ error: 'JWT_SECRET is not configured' })
    return
  }

  const token = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: '24h' }
  )

  res.json({
    message: 'Login successful',
    token,
    expiresIn: '24h',
  })
})

export default router
