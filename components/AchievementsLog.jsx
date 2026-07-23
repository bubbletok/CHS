import { activities, awards, credentials, exhibitions } from '@/data/achievements'

const GROUPS = [
  { key: 'activities', label: 'ACTIVITIES', data: activities },
  { key: 'awards', label: 'AWARDS', data: awards },
  { key: 'credentials', label: 'CERT & PAPERS', data: credentials },
  { key: 'exhibitions', label: 'EXHIBITIONS', data: exhibitions },
]

export default function AchievementsLog() {
  return (
    <section id="achievements" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-line pb-3">
        <h2 className="font-mono text-sm text-muted tracking-widest">ACHIEVEMENTS</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {GROUPS.map((group) => (
          <div key={group.key} className="border border-line rounded-md bg-panel/60 p-5">
            <p className="font-mono text-xs text-muted mb-3 tracking-widest">{group.label}</p>
            <ul className="space-y-3">
              {group.data.map((item) => (
                <li key={item.title}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    {item.period && (
                      <span className="font-mono text-xs text-muted shrink-0">{item.period}</span>
                    )}
                    <span className="text-sm text-ink/85">{item.title}</span>
                  </div>
                  {item.detail && <p className="text-xs text-muted mt-0.5">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
