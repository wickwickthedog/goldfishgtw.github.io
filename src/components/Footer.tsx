import { personal } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-0">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {personal.name} · Built with React + TypeScript + Tailwind
        </p>
        <div className="flex items-center gap-6">
          <a href={personal.github} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors">GitHub ↗</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors">LinkedIn ↗</a>
          <a href={`mailto:${personal.email}`}
            className="font-mono text-xs text-muted hover:text-accent transition-colors">Email ↗</a>
        </div>
      </div>
    </footer>
  )
}
