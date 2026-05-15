import { useEffect, useMemo, useState } from 'react'
import { SectionLabel } from './About'

/**
 * BlogPage.tsx
 *
 * This is a learning-friendly skeleton for your public blog index.
 * The backend already has GET /api/posts, so this component focuses on:
 * 1. Defining the frontend type that matches the API response.
 * 2. Fetching posts when the component loads.
 * 3. Showing clear UI states: loading, error, empty, and success.
 * 4. Leaving TODO markers for the next features you can build yourself.
 */

type BlogListPost = {
  _id: string
  title: string
  slug: string
  excerpt: string
  tags: string[]
  coverImage?: string
  createdAt: string
  updatedAt: string
}

type PostsResponse = {
  data: BlogListPost[]
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogListPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let ignoreResult = false

    async function loadPosts() {
      try {
        setIsLoading(true)
        setErrorMessage(null)

        const response = await fetch(`${API_BASE_URL}/api/posts`)

        if (!response.ok) {
          throw new Error(`Posts request failed with status ${response.status}`)
        }

        const result = (await response.json()) as PostsResponse

        if (!ignoreResult) {
          setPosts(result.data)
        }
      } catch (error) {
        if (!ignoreResult) {
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load posts')
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false)
        }
      }
    }

    void loadPosts()

    // This prevents React from setting state after the component unmounts.
    // It matters when someone navigates away before the request finishes.
    return () => {
      ignoreResult = true
    }
  }, [])

  const featuredPost = posts[0]
  const remainingPosts = useMemo(() => posts.slice(1), [posts])

  return (
    <section id="blog" className="py-28 max-w-5xl mx-auto px-6">
      <SectionLabel label="05 / Blog" />

      <div className="mt-10 mb-8 max-w-2xl">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
          API-powered writing
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text leading-tight">
          Recent writing from the blog CMS
        </h2>
        <p className="font-body text-subtle leading-relaxed mt-4">
          Posts are loaded from your Express and MongoDB API, so the portfolio can grow without hardcoding every article.
        </p>
      </div>

      {isLoading && <BlogStatusCard title="Loading posts" message="Fetching published posts from the API." />}

      {!isLoading && errorMessage && (
        <BlogStatusCard
          title="Posts could not load"
          message={errorMessage}
        />
      )}

      {!isLoading && !errorMessage && posts.length === 0 && (
        <BlogStatusCard
          title="No posts yet"
          message="Create and publish a post in the API, then this section will render it here."
        />
      )}

      {!isLoading && !errorMessage && featuredPost && (
        <div className="space-y-4">
          <FeaturedPostCard post={featuredPost} />

          {remainingPosts.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {remainingPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function FeaturedPostCard({ post }: { post: BlogListPost }) {
  return (
    <article className="grid overflow-hidden border border-border rounded-xl bg-surface md:grid-cols-[1.1fr_1.4fr]">
      <PostCover post={post} isFeatured />

      <div className="p-6 sm:p-8">
        <PostMeta post={post} />

        <h3 className="font-display font-bold text-2xl text-text mt-5 leading-tight">
          {post.title}
        </h3>
        <p className="font-body text-subtle leading-relaxed mt-3">
          {post.excerpt}
        </p>

        <a
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-accent/70 transition-colors mt-6"
        >
          Read post
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </article>
  )
}

function PostCard({ post }: { post: BlogListPost }) {
  return (
    <article className="border border-border rounded-xl bg-surface p-5 hover:border-accent/40 hover:-translate-y-0.5 transition-all">
      <PostMeta post={post} />

      <h3 className="font-display font-semibold text-lg text-text mt-4 leading-snug">
        {post.title}
      </h3>
      <p className="font-body text-sm text-muted leading-relaxed mt-2">
        {post.excerpt}
      </p>

      <a
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-accent/70 transition-colors mt-5"
      >
        Read post
        <span aria-hidden="true">-&gt;</span>
      </a>
    </article>
  )
}

function PostCover({
  post,
  isFeatured = false,
}: {
  post: BlogListPost
  isFeatured?: boolean
}) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt=""
        className="h-56 w-full object-cover md:h-full"
      />
    )
  }

  return (
    <div className={`bg-bg border-b border-border md:border-b-0 md:border-r ${isFeatured ? 'min-h-56' : 'min-h-40'}`}>
      <div className={`h-full p-6 flex flex-col justify-between ${isFeatured ? 'min-h-56' : 'min-h-40'}`}>
        <span className="font-mono text-xs text-muted">blog/post</span>
        <span className="font-display text-5xl font-bold text-accent/20">
          {post.title.slice(0, 1)}
        </span>
      </div>
    </div>
  )
}

function PostMeta({ post }: { post: BlogListPost }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <time className="font-mono text-xs text-muted" dateTime={post.createdAt}>
        {formatPostDate(post.createdAt)}
      </time>

      {/* TODO: When you add a tag filter, lift selectedTag into BlogPage state. */}
      {post.tags.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="font-mono text-xs text-accent2 border border-accent2/20 bg-accent2/5 px-2 py-0.5 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function BlogStatusCard({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="border border-border rounded-xl bg-surface p-6">
      <p className="font-display font-semibold text-text">{title}</p>
      <p className="font-body text-sm text-muted leading-relaxed mt-2">{message}</p>
    </div>
  )
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * TODO: Build the single-post page next.
 *
 * The API already supports GET /api/posts/:slug.
 * A good next step is:
 * 1. Add React Router.
 * 2. Create /blog/:slug.
 * 3. Fetch the full post by slug.
 * 4. Render post.body as Markdown.
 */
