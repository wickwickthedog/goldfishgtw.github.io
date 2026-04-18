import { skills } from '../data/content'
import { SectionLabel } from './About'

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel label="02 / Skills" />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="border border-border rounded-xl p-5 bg-bg hover:border-muted transition-all group"
            >
              <p className="font-mono text-xs text-accent mb-4 uppercase tracking-widest">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-subtle border border-border px-2.5 py-1 rounded group-hover:border-muted transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
