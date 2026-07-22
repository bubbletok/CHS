const ENGINE_STYLE = {
  unity: { label: 'UNITY', color: 'text-unity', border: 'border-unity/40', dot: 'bg-unity' },
  unreal: { label: 'UNREAL', color: 'text-unreal', border: 'border-unreal/40', dot: 'bg-unreal' },
}

const STATUS_STYLE = {
  playable: { label: '▶ PLAYABLE DEMO', color: 'text-unity' },
  video: { label: '▸ VIDEO DEMO', color: 'text-unreal' },
  wip: { label: '● WIP', color: 'text-amber' },
}

export default function ProjectCard({ project }) {
  const engine = ENGINE_STYLE[project.engine]
  const status = STATUS_STYLE[project.status]
  const hasLinks = project.links && Object.values(project.links).some(Boolean)

  return (
    <details className="group border border-line rounded-md bg-panel/60 open:bg-panel transition-colors">
      <summary
        className={`list-none cursor-pointer select-none px-4 sm:px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-l-2 ${engine.border}`}
      >
        <span className="font-mono text-xs text-muted">{project.id.toUpperCase()}</span>
        <span className={`font-mono text-xs font-medium ${engine.color}`}>{engine.label}</span>
        <span className={`font-mono text-xs ${status.color}`}>{status.label}</span>

        <span className="w-full sm:w-auto sm:flex-1 font-body font-semibold text-ink text-base mt-1 sm:mt-0">
          {project.title}
        </span>

        <span className="font-mono text-xs text-muted group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="px-4 sm:px-6 pb-6 pt-1 border-t border-line/60 space-y-4">
        <p className="text-sm text-muted font-mono">{project.role}</p>
        <p className="text-ink/90 leading-relaxed">{project.summary}</p>

        <div>
          <p className="font-mono text-xs text-muted mb-1">// problem &amp; approach</p>
          <p className="text-ink/80 leading-relaxed">{project.problem}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-xs px-2 py-1 rounded border border-line text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {hasLinks && (
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-sm">
            {project.links.play && (
              <a
                href={project.links.play}
                target="_blank"
                rel="noreferrer"
                className="text-unity hover:underline underline-offset-4"
              >
                play demo →
              </a>
            )}
            {project.links.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noreferrer"
                className="text-unreal hover:underline underline-offset-4"
              >
                watch video →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:underline underline-offset-4"
              >
                source →
              </a>
            )}
          </div>
        )}
      </div>
    </details>
  )
}
