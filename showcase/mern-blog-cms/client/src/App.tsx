import { useState } from 'react'
import { createRoot } from 'react-dom/client'

type DraftPost = {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  status: 'draft' | 'published'
}

const initialPost: DraftPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: [],
  status: 'draft',
}

export default function App() {
  const [post, setPost] = useState(initialPost)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Saving...')

    const response = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })

    setMessage(response.ok ? 'Post saved' : 'Could not save post')
  }

  return (
    <main style={{ maxWidth: 760, margin: '48px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>MERN Blog CMS</h1>
      <p>Create posts here first, then protect this route with admin auth.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Title" value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} />
        <input placeholder="slug-like-this" value={post.slug} onChange={(event) => setPost({ ...post, slug: event.target.value })} />
        <textarea placeholder="Excerpt" value={post.excerpt} onChange={(event) => setPost({ ...post, excerpt: event.target.value })} />
        <textarea rows={10} placeholder="Markdown content" value={post.content} onChange={(event) => setPost({ ...post, content: event.target.value })} />
        <select value={post.status} onChange={(event) => setPost({ ...post, status: event.target.value as DraftPost['status'] })}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit">Save post</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
