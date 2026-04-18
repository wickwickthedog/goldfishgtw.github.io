import { projects } from '../data/content'
import { SectionLabel } from './About'

export default function Projects() {
  return (
    <section id="projects" className="py-28 max-w-5xl mx-auto px-6">
      <SectionLabel label="03 / Projects" />

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <div
            key={i}
            className="relative flex flex-col border border-border rounded-xl p-6 bg-surface hover:border-accent/40 transition-all group hover:-translate-y-1"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-xl group-hover:border-accent/40 transition-colors">
                🚀
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-text transition-colors px-2 py-1 border border-border rounded hover:border-muted"
                  >
                    gh ↗
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-accent transition-colors px-2 py-1 border border-border rounded hover:border-accent/40"
                  >
                    live ↗
                  </a>
                )}
              </div>
            </div>

            {/* Name + desc */}
            <h3 className="font-display font-semibold text-lg text-text mb-2 group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <p className="font-body text-sm text-subtle leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted border border-border/60 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
