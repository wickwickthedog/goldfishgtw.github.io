import { nowPage } from '../data/content'
import { SectionLabel } from './About'

export default function Now() {
  return (
    <section id="now" className="py-28 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="06 / Now" />

        <div className="mt-10 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-bold text-3xl text-text mb-4">
              What I'm up to <span className="text-accent">right now</span>
            </h2>
            <p className="font-body text-subtle leading-relaxed">
              Inspired by{' '}
              <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-accent2 hover:underline">
                Derek Sivers' /now movement
              </a>
              . A snapshot of what's on my mind and workbench.
            </p>
            <p className="font-mono text-xs text-muted mt-4">
              Last updated: {nowPage.updated}
            </p>
          </div>

          <div className="border border-border rounded-xl p-6 bg-bg space-y-3">
            {nowPage.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 items-start py-3 border-b border-border/50 last:border-0"
              >
                <span className="font-mono text-xs text-accent mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-sm text-subtle leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
