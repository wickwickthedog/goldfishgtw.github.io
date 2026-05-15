/**
 * Post.ts — The Post model (your database schema)
 *
 * WHAT IS A MODEL?
 * A model is the blueprint for a type of document in your database.
 * Think of it like a TypeScript class that also knows how to talk to MongoDB.
 *
 * WHAT IS A SCHEMA?
 * The schema defines the shape of your documents — what fields they have,
 * what types they are, which ones are required, etc.
 *
 * MongoDB itself is schemaless (you could store anything), but Mongoose
 * schemas add validation and TypeScript types on top.
 */

import mongoose, { Schema, Document } from 'mongoose'
import slugify from 'slugify'

// ─── TypeScript Interface ───────────────────────────────────────────────────
// This describes the shape of a Post document IN TypeScript.
// We extend Document so TypeScript knows it also has MongoDB fields like _id.
//
// WHY DEFINE THIS SEPARATELY FROM THE SCHEMA?
// The Schema is a runtime construct (Mongoose uses it at runtime to validate).
// The interface is a compile-time construct (TypeScript uses it for type checking).
// You need both.

export interface IPost extends Document {
  title: string        // e.g. "Why I'm learning TypeScript"
  slug: string         // e.g. "why-im-learning-typescript" (URL-safe version of title)
  excerpt: string      // Short summary shown in the blog list
  body: string         // Full post content (Markdown)
  tags: string[]       // e.g. ["TypeScript", "React"]
  published: boolean   // false = draft, true = visible on your site
  coverImage?: string  // Optional URL to a cover image
  createdAt: Date      // Auto-set by Mongoose (timestamps: true)
  updatedAt: Date      // Auto-updated by Mongoose on every save
}

// ─── Mongoose Schema ────────────────────────────────────────────────────────
// The schema maps to the interface above.
// Each field has a Mongoose type + validation rules.

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],  // Custom error message
      trim: true,                                    // Strips leading/trailing whitespace
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },

    slug: {
      type: String,
      // unique: true means MongoDB creates an index — fast lookups by slug
      // This is important because you'll query by slug in every single-post view
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },

    body: {
      type: String,
      required: [true, 'Post body is required'],
    },

    tags: {
      // An array of strings — MongoDB stores this natively
      // e.g. ["TypeScript", "React", "MongoDB"]
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: false,  // Posts start as drafts — you explicitly publish them
    },

    coverImage: {
      type: String,
      // No `required` — this field is optional (the ? in the interface)
    },
  },
  {
    // timestamps: true tells Mongoose to automatically manage
    // createdAt and updatedAt fields on every document.
    // You never set these manually — Mongoose handles them.
    timestamps: true,
  }
)

// ─── Pre-save Middleware ────────────────────────────────────────────────────
// Mongoose "hooks" let you run code before/after certain operations.
// This hook auto-generates the slug from the title before saving.
//
// WHY AUTO-GENERATE THE SLUG?
// You don't want to type the slug manually every time.
// If title = "Why I'm Learning TypeScript in 2025"
// Then slug = "why-im-learning-typescript-in-2025" (auto-generated)

PostSchema.pre('save', function () {
  // `this` refers to the document being saved
  // Only regenerate the slug if the title changed (or it's a new document)
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,      // lowercase everything
      strict: true,     // remove special characters
      trim: true,
    })
  }
})

// ─── Export the Model ───────────────────────────────────────────────────────
// mongoose.model<IPost>('Post', PostSchema) does two things:
// 1. Registers the model with Mongoose under the name 'Post'
// 2. Tells TypeScript that documents from this model match IPost
//
// Mongoose will store documents in a collection called 'posts' (lowercase plural of 'Post')
// You never create the collection manually — Mongoose does it on first insert.

export default mongoose.model<IPost>('Post', PostSchema)
