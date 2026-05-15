/**
 * auth.ts — JWT Authentication Middleware
 *
 * WHAT IS MIDDLEWARE?
 * In Express, middleware is a function that runs BETWEEN receiving a request
 * and sending a response. It has access to req, res, and next().
 *
 * Calling next() means "I'm done, pass the request to the next handler".
 * NOT calling next() means "I'm stopping this request here" (e.g. 401 Unauthorized).
 *
 * WHAT IS JWT?
 * JSON Web Token — a signed string that proves who you are.
 * When you log in, the server creates a JWT and sends it to you.
 * You store it and send it with every subsequent request in the Authorization header.
 * The server verifies the signature — no database lookup needed.
 *
 * FORMAT:  Authorization: Bearer eyJhbGci...
 *
 * A JWT has 3 parts separated by dots:
 *   header.payload.signature
 *
 * The payload contains your data (e.g. { username: "harvey", role: "admin" })
 * The signature is created using your JWT_SECRET — only your server can create/verify it.
 * Anyone can READ the payload (it's base64 encoded, not encrypted).
 * But no one can FAKE a valid signature without the secret.
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// ─── Extend Express's Request type ─────────────────────────────────────────
// By default, req doesn't have an `admin` field.
// We extend the Request interface so TypeScript knows about it.
// This is called "declaration merging" — a TypeScript superpower.

declare module 'express-serve-static-core' {
  interface Request {
    admin?: { username: string }
  }
}

// ─── The middleware function ────────────────────────────────────────────────
// This is a standard Express middleware signature:
// (req, res, next) => void

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  // 1. Get the Authorization header
  //    It should look like: "Bearer eyJhbGci..."
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token provided — reject the request
    res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided. Login first to get a token.',
    })
    return  // Stop here — don't call next()
  }

  // 2. Extract just the token part (remove "Bearer ")
  const token = authHeader.split(' ')[1]

  try {
    // 3. Verify the token using your JWT_SECRET
    //    If the token is expired, tampered with, or signed with a different secret,
    //    jwt.verify() throws an error and we jump to the catch block.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      username: string
    }

    // 4. Attach the decoded payload to req so route handlers can use it
    req.admin = { username: decoded.username }

    // 5. Token is valid — pass the request to the actual route handler
    next()
  } catch {
    // Token is invalid or expired
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token. Please log in again.',
    })
  }
}

/**
 * USAGE IN ROUTES:
 *
 * import { requireAdmin } from '../middleware/auth'
 *
 * // Public — anyone can read posts
 * router.get('/', getAllPosts)
 *
 * // Protected — only admin can create posts
 * router.post('/', requireAdmin, createPost)
 *                  ^^^^^^^^^^^
 *                  middleware runs BEFORE createPost
 *                  if it calls next(), createPost runs
 *                  if it sends a 401, createPost never runs
 */
