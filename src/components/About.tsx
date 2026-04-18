import { about, personal } from '../data/content'

export default function About() {
  return (
    <section id="about" className="py-28 max-w-5xl mx-auto px-6">
      <SectionLabel label="01 / About" />

      <div className="grid md:grid-cols-2 gap-16 mt-10">
        {/* Bio */}
        <div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-8 leading-tight">
            Ctrl+C Ctrl+V Engineer, but somehow it works, <span className="text-accent">Underthinking My Retirement Plan</span>📈.
          </h2>
          <div className="space-y-4">
            {about.bio.map((para, i) => (
              <p key={i} className="font-body text-subtle leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {about.funFacts.map((fact, i) => (
              <span
                key={i}
                className="font-mono text-xs border border-border text-subtle px-3 py-1.5 rounded-full"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>

        {/* Details card */}
        <div className="space-y-4">
          <div className="border border-border rounded-xl p-6 bg-surface">
            <p className="font-mono text-xs text-muted mb-4 uppercase tracking-widest">
              Quick facts
            </p>
            <ul className="space-y-3">
              <DetailRow label="Location" value={personal.location} />
              <DetailRow label="Role" value="Software Engineer" />
              <DetailRow label="Status" value={personal.available ? "🟢 Open to work" : "🔴 Not available"} />
              <DetailRow label="Email" value={personal.email} isLink={`mailto:${personal.email}`} />
              <DetailRow label="GitHub" value="@wickwickthedog" isLink={personal.github} />
            </ul>
          </div>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full border border-border rounded-xl p-5 bg-surface hover:border-accent group transition-all"
          >
            <div>
              <p className="font-display font-semibold text-text">Download Resume</p>
              <p className="font-mono text-xs text-muted mt-0.5">PDF · Updated Apr 2025</p>
            </div>
            <span className="text-subtle group-hover:text-accent transition-colors text-xl">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function DetailRow({
  label,
  value,
  isLink,
}: {
  label: string
  value: string
  isLink?: string
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0">
      <span className="font-mono text-xs text-muted">{label}</span>
      {isLink ? (
        <a
          href={isLink}
          className="font-body text-sm text-subtle hover:text-accent transition-colors truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : (
        <span className="font-body text-sm text-text">{value}</span>
      )}
    </li>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-accent tracking-widest uppercase">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}
