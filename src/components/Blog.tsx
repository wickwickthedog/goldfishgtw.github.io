import { blogPosts, personal } from '../data/content'
import { SectionLabel } from './About'

export default function Blog() {
  return (
    <section id="blog" className="py-28 max-w-5xl mx-auto px-6">
      <SectionLabel label="05 / Blog" />

      <div className="flex items-end justify-between mt-10 mb-8">
        <h2 className="font-display font-bold text-3xl text-text">
          Recent writing
        </h2>
        <a
          href={personal.blog}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-accent hover:text-accent/70 transition-colors"
        >
          All posts ↗
        </a>
      </div>

      <div className="space-y-3">
        {blogPosts.map((post, i) => (
          <a
            key={i}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border border-border rounded-xl p-5 bg-surface hover:border-accent/40 hover:-translate-y-0.5 transition-all group"
          >
            {/* Date */}
            <span className="font-mono text-xs text-muted w-20 shrink-0">{post.date}</span>

            {/* Title + excerpt */}
            <div className="flex-1">
              <p className="font-display font-semibold text-text group-hover:text-accent transition-colors mb-1">
                {post.title}
              </p>
              <p className="font-body text-sm text-muted leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Tag + arrow */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-accent2 border border-accent2/20 bg-accent2/5 px-2 py-0.5 rounded">
                {post.tag}
              </span>
              <span className="text-muted group-hover:text-accent transition-colors">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
