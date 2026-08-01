import Section from './Section'
import Reveal from './Reveal'
import { work } from '@/data/work'
import { ACCENT } from '@/lib/accents'

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="What I have done"
      title="주요 성과"
      accent="green"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {work.map((item, i) => {
          const a = ACCENT[item.accent]
          return (
            <Reveal key={item.tag} delay={i * 90} className="h-full">
              <article className="card flex h-full flex-col p-7">
                <span className={`eyebrow ${a.tint} ${a.text}`}>{item.tag}</span>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{item.label}</h3>

                {/* 지표: 이전 → 이후 */}
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="text-base font-medium text-faint line-through decoration-1">
                    {item.metric}
                  </span>
                  <span className={`text-sm font-bold ${a.text}`}>→</span>
                  <span className="text-[32px] font-extrabold leading-none tracking-tight text-ink">
                    {item.metricAfter}
                  </span>
                </div>
                <p className="mt-2 text-[13px] text-faint">{item.metricNote}</p>

                {/* 핵심 키워드만 — 상세 서술은 프로젝트·경력기술서에서 */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
                  {item.keywords.map((k) => (
                    <span
                      key={k}
                      className={`rounded-full ${a.tint} ${a.text} px-3 py-1.5 text-[13px] font-semibold`}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
