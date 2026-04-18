import { experience } from '../data/content'
import { SectionLabel } from './About'

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="04 / Experience" />

        <div className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border md:left-[calc(50%-0.5px)] hidden sm:block" />

          <div className="space-y-8">
            {experience.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-5 w-3 h-3 rounded-full bg-surface border-2 border-accent z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block flex-1" />

                {/* Card */}
                <div className="flex-1 border border-border rounded-xl p-6 bg-bg hover:border-muted transition-all group sm:max-w-[calc(50%-2rem)]">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-text group-hover:text-accent transition-colors">
                        {item.role}
                      </h3>
                      <p className="font-mono text-xs text-accent mt-0.5">{item.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted whitespace-nowrap border border-border px-2 py-1 rounded">
                      {item.period}
                    </span>
                  </div>
                  <p className="font-body text-sm text-subtle leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-muted border border-border/50 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
