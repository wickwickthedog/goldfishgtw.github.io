/**
 * db.ts — MongoDB connection
 *
 * WHAT THIS DOES:
 * Connects to MongoDB Atlas using the connection string in your .env file.
 * We export a single function `connectDB()` that the main server calls once on startup.
 *
 * WHY A SEPARATE FILE?
 * Separation of concerns — the server file (index.ts) shouldn't care HOW
 * the database connects, just that it does. This also makes it easy to
 * swap databases later without touching the rest of your code.
 */

import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
  // Read the connection string from environment variables
  // process.env reads from your .env file (loaded by dotenv in index.ts)
  const uri = process.env.MONGODB_URI

  // If the env var is missing, fail loudly early — better than a cryptic error later
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in your .env file')
  }

  try {
    // mongoose.connect() returns a Promise — we await it so we know
    // the connection is established before the server starts accepting requests
    console.log('Connecting to MongoDB...')
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    // Exit the process — no point running the server without a database
    process.exit(1)
  }
}

/**
 * WHY mongoose.connect() and not the raw MongoDB driver?
 * Mongoose wraps the official driver and adds:
 * - Schema validation (your Post model enforces data shape)
 * - TypeScript generics (Post.find() returns typed documents)
 * - Middleware hooks (e.g. run code before/after saving a document)
 * - Auto-reconnect handling
 */
