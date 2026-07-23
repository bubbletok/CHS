import { experience } from '@/data/experience'

export default function ExperienceLog() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-line pb-3">
        <h2 className="font-mono text-sm text-muted tracking-widest">EXPERIENCE</h2>
        <span className="font-mono text-xs text-muted">{experience.length} commits</span>
      </div>

      <div className="space-y-3">
        {experience.map((job) => (
          <div key={job.id} className="border border-line rounded-md bg-panel/60 p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <span className="font-mono text-xs text-unreal">{job.period}</span>
              <span className="font-body font-semibold text-ink">{job.company}</span>
              <span className="font-mono text-xs text-muted">{job.role}</span>
            </div>

            <p className="text-sm text-ink/80 mb-3">{job.summary}</p>

            <ul className="space-y-1.5 mb-3">
              {job.bullets.map((b) => (
                <li key={b} className="text-sm text-ink/75 leading-relaxed flex gap-2">
                  <span className="text-muted font-mono shrink-0">+</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {job.result && <p className="font-mono text-xs text-unity mb-3">→ {job.result}</p>}

            <div className="flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs px-2 py-1 rounded border border-line text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
