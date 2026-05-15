/**
 * index.ts — Express Server Entry Point
 *
 * THIS IS WHERE EVERYTHING STARTS.
 * When you run `npm run dev:api`, Node executes this file.
 * It:
 *   1. Loads environment variables from .env
 *   2. Connects to MongoDB
 *   3. Creates the Express app
 *   4. Registers middleware (cors, json parsing)
 *   5. Registers route handlers
 *   6. Starts listening for HTTP requests
 */

// dotenv MUST be imported first — it loads .env into process.env
// so every other file can access process.env.MONGODB_URI etc.
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import type { Server } from 'node:http'

import { connectDB } from './lib/db'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

// ─── Create Express App ───────────────────────────────────────────────────────
// express() creates the application — it's the object you attach
// middleware and routes to. Think of it as the "router of routers".

const app = express()
const PORT = process.env.PORT ?? 3001
let server: Server | undefined

// ─── Global Middleware ────────────────────────────────────────────────────────
// Middleware registered here runs for EVERY request before routes.

// CORS: tells browsers which frontend origins are allowed to call this API.
// Without this, requests from your React app would be blocked by the browser.
app.use(cors({
  origin: [
    'http://localhost:5173',                  // Vite dev server
    process.env.FRONTEND_URL ?? '',           // Your Netlify URL from .env
  ].filter(Boolean),                          // Remove empty strings
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// express.json() parses incoming request bodies from JSON string → JS object
// Without this, req.body would be undefined on POST/PUT requests.
// This is the modern built-in version (replaces the old body-parser package).
app.use(express.json())

// ─── Health Check ─────────────────────────────────────────────────────────────
// A simple endpoint to verify the server is running.
// Render.com pings this to check if your service is alive.
// Also useful when you're debugging — visit /health in your browser.

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'harvey-blog-api',
  })
})

// ─── Routes ───────────────────────────────────────────────────────────────────
// app.use(prefix, router) mounts a router at a URL prefix.
// All routes in authRoutes are prefixed with /api/auth
// All routes in postRoutes are prefixed with /api/posts
//
// So router.post('/login') in authRoutes becomes POST /api/auth/login
// And router.get('/') in postRoutes becomes GET /api/posts

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
// ─── 404 Handler ──────────────────────────────────────────────────────────────
// If no route matched, send a 404.
// This middleware runs AFTER all routes — Express processes middleware in order.

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'This endpoint does not exist',
  })
})

// ─── Start Server ─────────────────────────────────────────────────────────────
// We connect to the database FIRST, then start listening for requests.
// This ensures no request can hit a route before the DB is ready.

async function start() {
  try {
    await connectDB()

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
      console.log(`📋 Health check: http://localhost:${PORT}/health`)
      console.log(`📝 Posts API:    http://localhost:${PORT}/api/posts`)
    })

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the existing API server or set a different PORT.`)
        process.exit(1)
      }

      throw error
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()

async function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down API server...`)

  if (server) {
    await new Promise<void>((resolve, reject) => {
      server?.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    })
  }

  await mongoose.disconnect()
  process.exit(0)
}

process.on('SIGINT', () => {
  void shutdown('SIGINT')
})

process.on('SIGTERM', () => {
  void shutdown('SIGTERM')
})
