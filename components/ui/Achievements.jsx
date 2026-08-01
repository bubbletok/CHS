import Section from './Section'
import Reveal from './Reveal'
import { achievementGroups } from '@/data/achievements'
import { ACCENT } from '@/lib/accents'

export default function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Record"
      title="활동 이력"
      accent="red"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {achievementGroups.map((group, i) => {
          const a = ACCENT[group.accent]
          return (
            <Reveal key={group.key} delay={(i % 2) * 90} className="h-full">
              <div className="card h-full p-7">
                <div className="flex items-center justify-between">
                  <span className={`eyebrow ${a.tint} ${a.text}`}>{group.label}</span>
                  <span className="text-sm font-bold text-faint">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="w-[100px] shrink-0 pt-0.5 text-[13px] font-semibold text-faint">
                        {item.period || '—'}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-medium leading-snug text-ink">
                          {item.title}
                        </p>
                        {item.detail && (
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
