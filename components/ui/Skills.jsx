import Section from './Section'
import Reveal from './Reveal'
import { engines, familiar } from '@/data/skills'
import { ACCENT } from '@/lib/accents'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="기술 스택"
      accent="orange"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {engines.map((col, i) => {
          const a = ACCENT[col.accent]
          return (
            <Reveal key={col.key} delay={i * 90} className="h-full">
              <div className="card h-full p-7">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                  <h3 className="text-lg font-bold tracking-tight text-ink">{col.label}</h3>
                </div>

                <ul className="mt-6 space-y-2">
                  {col.items.map((item) =>
                    item.key ? (
                      // 주력 기술 — 틴트 배경으로 채워 한눈에 들어오게
                      <li
                        key={item.name}
                        className={`flex items-start gap-3 rounded-2xl ${a.tint} px-4 py-3`}
                      >
                        <span className={`mt-[7px] h-2 w-2 shrink-0 rounded-full ${a.dot}`} />
                        <span className={`text-[15px] font-bold leading-relaxed ${a.text}`}>
                          {item.name}
                        </span>
                      </li>
                    ) : (
                      <li key={item.name} className="flex items-start gap-3 px-4 py-1.5">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
                        <span className="text-[15px] leading-relaxed text-muted">{item.name}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={200} className="mt-5">
        <div className="card p-7">
          <p className="text-sm font-bold text-faint">ALSO FAMILIAR</p>
          <dl className="mt-5 grid gap-6 sm:grid-cols-3">
            {familiar.map((f) => (
              <div key={f.label}>
                <dt className="text-[15px] font-semibold text-ink">{f.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  )
}
