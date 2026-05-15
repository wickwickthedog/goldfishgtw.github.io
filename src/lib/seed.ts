/**
 * seed.ts — Database seeding script
 *
 * WHAT IS SEEDING?
 * Populating your database with initial/sample data.
 * Run this once after setting up your database to have something to look at.
 *
 * HOW TO RUN:
 *   npx ts-node src/lib/seed.ts
 *
 * This is NOT part of the server — it's a one-off script.
 * You run it manually from your terminal when you need to reset/populate data.
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Post from '../models/Post'

const samplePosts = [
  {
    title: "Why I'm Learning TypeScript in 2025",
    excerpt: "Static types aren't just for Java devs. Here's why TypeScript changed how I think about code quality and how it caught 3 bugs in my first day of using it.",
    body: `# Why I'm Learning TypeScript in 2025

I used to think TypeScript was unnecessary. JavaScript worked fine, right?

Then I spent 2 hours debugging a production issue that turned out to be \`undefined.map\` — a bug TypeScript would have caught at compile time.

## The Moment It Clicked

When you write:

\`\`\`typescript
function getUser(id: string): Promise<User> {
  // TypeScript now knows this returns a User, not any
}
\`\`\`

Your editor knows the shape of the data everywhere you use \`getUser()\`. Autocomplete works. Mistakes are highlighted immediately.

## What I've Learned So Far

- **Interfaces vs Types**: Use interfaces for objects you'll extend, types for unions and intersections
- **Generics**: Write code that works for any type but is still type-safe
- **Utility Types**: \`Partial<T>\`, \`Pick<T, K>\`, \`Omit<T, K>\` are incredibly useful

More posts coming as I go deeper into the rabbit hole.`,
    tags: ['TypeScript', 'JavaScript', 'Learning'],
    published: true,
  },
  {
    title: "Building My Portfolio from Scratch with React + Vite",
    excerpt: "Ditching Jekyll for a modern React stack. What I learned setting up Vite, Tailwind, and deploying to Netlify for the first time.",
    body: `# Building My Portfolio from Scratch

After years of a basic Jekyll blog, I decided to rebuild everything with a proper modern stack.

## Why React over Jekyll?

Jekyll is great for static blogs, but I wanted to:
1. Learn React properly (not just use it)
2. Have a dynamic frontend I can extend
3. Eventually connect a real backend API

## The Stack I Chose

- **React 18** + **TypeScript** — the industry standard
- **Vite** — blazing fast dev server (replaces CRA)
- **Tailwind CSS** — utility-first, no CSS files
- **Netlify** — free hosting, auto-deploys on push

## What Surprised Me

Vite is genuinely fast. Hot module replacement means changes appear in the browser before I even switch windows.

TypeScript caught 4 type errors in my first component. Worth it.`,
    tags: ['React', 'Vite', 'Portfolio', 'Netlify'],
    published: true,
  },
  {
    title: "Understanding the MERN Stack (Draft)",
    excerpt: "MongoDB, Express, React, Node — how the pieces fit together and why this stack is still relevant in 2025.",
    body: `# Understanding the MERN Stack

This is a draft post. I'm still writing this one!

Coming soon: a deep dive into how MongoDB, Express, React, and Node.js
work together to form a complete fullstack application.`,
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN'],
    published: false,  // This one stays as a draft
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ Connected to MongoDB')

    // Clear existing posts first
    await Post.deleteMany({})
    console.log('🗑️  Cleared existing posts')

    // Insert sample posts. Use create() so the pre-save slug hook runs.
    const created = []
    for (const post of samplePosts) {
      created.push(await Post.create(post))
    }
    console.log(`✅ Created ${created.length} posts:`)
    created.forEach(p => console.log(`   - "${p.title}" (slug: ${p.slug})`))

  } catch (error) {
    console.error('❌ Seed failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('👋 Disconnected from MongoDB')
    process.exit(0)
  }
}

seed()
