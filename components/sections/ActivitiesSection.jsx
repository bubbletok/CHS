'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { achievementGroups } from '@/data/achievements'
import { experience } from '@/data/experience'

/** period 표기가 제각각이라('2025.10' / '2024' / '2025.03 – 2025.12' / '1년 8개월' / '')
 * 연·월만 느슨하게 뽑아 쓴다. 못 뽑으면 정렬은 맨 뒤, 표기는 원문 그대로. */
const yearOf = (period) => period.match(/\d{4}/)?.[0] ?? ''
const monthOf = (period) => period.match(/^\d{4}\.(\d{2})/)?.[1] ?? ''
/** 'YYYY.MM' 딱 떨어지는 것만 월 두 자리로 줄이고, 기간·비정형 표기는 원문을 보여준다 */
const labelOf = (period) => (/^\d{4}\.\d{2}$/.test(period) ? `${monthOf(period)}월` : period || '기록')

/** 개인 활동 — 분류별로 나뉜 데이터를 한 줄기로 편다 */
const records = achievementGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, tag: g.label, group: g.key, accent: g.accent, year: yearOf(item.period) || 'ETC' }))
)

/** 가로 축은 왼쪽이 과거 — 오래된 순으로 세운다. 연도 라벨은 그 해 첫 항목(=그 해 가장 이른 것)에만 찍는다 */
const dated = records
  .filter((r) => r.year !== 'ETC')
  .sort((a, b) => (a.year + monthOf(a.period)).localeCompare(b.year + monthOf(b.period)))
  .map((item, i, all) => ({ ...item, firstOfYear: item.year !== all[i - 1]?.year }))

/** '1년 8개월'처럼 시점이 안 잡히는 건 축에 올릴 수 없으니 아래 ETC로 뺀다 */
const etc = records.filter((r) => r.year === 'ETC')
const yearSpan = [...new Set(dated.map((r) => r.year))]

/** 회사 블록 안에 role이 여러 개 묶여 있으니, 포지션 수는 role 합계로 센다 */
const positionsCount = experience.reduce((n, c) => n + c.roles.length, 0)

const TABS = [
  { key: 'experience', label: '실무 경력', meta: 'EXPERIENCE', count: positionsCount },
  { key: 'personal', label: '개인 활동', meta: 'AWARDS & ACTIVITIES', count: records.length },
]

/** 분류별 스탬프 — 피그잼 스탬프 도구를 참고해 카테고리를 글자 없이 도장 하나로 표시한다.
 * 클래스 문자열은 전부 리터럴로 써둔다 (Tailwind가 동적 `text-${accent}`는 못 읽는다) */
const ACCENT_CLASSES = {
  orange: 'border-orange/60 text-orange bg-tint-orange',
  blue: 'border-blue/60 text-blue bg-tint-blue',
  green: 'border-green/60 text-green bg-tint-green',
  red: 'border-red/60 text-red bg-tint-red',
}

const STAMP_ICONS = {
  awards: (
    <path d="M12 2.7l2.6 5.5 6 .6-4.5 4 1.3 5.9-5.4-3.2-5.4 3.2 1.3-5.9-4.5-4 6-.6z" />
  ),
  activities: (
    <>
      <circle cx="8" cy="8" r="2.6" />
      <path d="M2.6 19c0-3 2.4-5.4 5.4-5.4s5.4 2.4 5.4 5.4" />
      <circle cx="16.6" cy="9.2" r="2" />
      <path d="M14.9 13.9c2.3.3 4.1 2.2 4.1 5.1" />
    </>
  ),
  credentials: (
    <>
      <path d="M12 3.6l8.2 3.9-8.2 3.9-8.2-3.9L12 3.6z" />
      <path d="M6.6 9.4v4.5c0 1.4 2.4 2.7 5.4 2.7s5.4-1.3 5.4-2.7V9.4" />
    </>
  ),
  exhibitions: (
    <>
      <path d="M5.2 3v18" />
      <path d="M5.2 4.6h11.6l-2.9 3.9 2.9 3.9H5.2" />
    </>
  ),
}

/** 매번 같은 각도면 도장 느낌이 안 나서, 제목 글자수로 -8~8도 사이를 고정 배정한다 */
const stampTilt = (title) => ((title.length * 7) % 17) - 8

function Stamp({ group, accent, title, size = 'sm' }) {
  const icon = STAMP_ICONS[group]
  if (!icon) return null
  const dim = size === 'lg' ? 'h-14 w-14 border-[1.5px]' : 'h-6 w-6 border'
  const svgSize = size === 'lg' ? 22 : 13
  return (
    <span
      aria-hidden="true"
      style={{ transform: `rotate(${stampTilt(title)}deg)` }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${dim} ${ACCENT_CLASSES[accent]}`}
    >
      <svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </span>
  )
}

/** 실무 경력 — 세로 스파인. 같은 회사 · 겹치는 기간의 포지션은 회사 블록 하나에 role 여러 개로 묶어 보여준다 */
function ExperienceTrack() {
  return (
    <div>
      {experience.map((c, i) => (
        <Reveal
          key={`${c.company}-${c.period}`}
          delay={Math.min(i, 4) * 60}
          className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[13rem_minmax(0,1fr)]"
        >
          <div className="pt-1 text-right">
            <span className="index-num block leading-relaxed">{c.period}</span>
          </div>

          <div className="relative border-l border-line pb-16 pl-6 sm:pl-10">
            <span className="absolute -left-[5.5px] top-[9px] h-3 w-3 bg-ink" />

            <p className="text-2xl font-bold leading-snug tracking-tight text-ink sm:text-4xl">{c.company}</p>

            <div className="mt-6 space-y-8">
              {c.roles.map((r, ri) => (
                <div key={r.role} className={ri > 0 ? 'border-t border-line pt-8' : ''}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-sm font-semibold text-ink sm:text-base">{r.role}</p>
                    {c.roles.length > 1 && <span className="index-num">{r.period}</span>}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{r.summary}</p>

                  <ul className="mt-5 max-w-3xl space-y-2.5">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-faint sm:text-base">
                        <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-line" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {r.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/** 개인 활동 — 2023~2025를 가로 선 하나에 한 번에 올린다.
 * 11개가 한 화면에 들어가야 하므로 항목을 축 위·아래로 번갈아 배치해 라벨이 겹치지 않게 한다.
 * 그 아래 ETC는 시점이 없어 축에 못 올리는 활동들. */
function PersonalTrack() {
  // 클릭하면 세부 내용을 모달로 띄운다 — ProjectsSection의 상세 모달과 같은 패턴
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div>
      {/* lg 미만은 폭이 모자라 한 번에 못 담으므로 가로 스크롤로 넘긴다 */}
      <div className="overflow-x-auto pb-2">
        <ol className="flex min-w-[64rem] lg:min-w-0">
          {dated.map((r, i) => {
            const above = i % 2 === 0
            const open = active?.title === r.title
            const card = (
              <button
                type="button"
                onClick={() => setActive(r)}
                aria-haspopup="dialog"
                className="group w-full pr-4 text-left"
              >
                <span className="flex items-center gap-2">
                  <Stamp group={r.group} accent={r.accent} title={r.title} />
                  <span className="index-num truncate">{labelOf(r.period)}</span>
                </span>
                <p className="mt-1.5 flex items-baseline gap-1.5 text-sm font-semibold leading-snug text-ink">
                  {r.title}
                  {/* 클릭 가능 표시 — 상세가 있는 항목에만, 과하지 않게 옅은 + 기호로 */}
                  {r.detail && (
                    <span className="text-xs font-normal text-faint transition-colors group-hover:text-muted">+</span>
                  )}
                </p>
              </button>
            )

            return (
              <li key={r.title} className="flex flex-1 flex-col">
                {/* 연도 스트립 — 그 해 첫 항목에만 */}
                <div className="flex h-14 items-end pb-2">
                  {r.firstOfYear && (
                    <span className="text-3xl font-bold leading-none tracking-tight text-faint sm:text-4xl">
                      {r.year}
                    </span>
                  )}
                </div>

                <div className="flex h-32 flex-col justify-end pb-3">{above && card}</div>

                {/* 축 — 연도가 바뀌는 칸만 굵은 선으로 끊는다 */}
                <div className="relative">
                  <div className={r.firstOfYear ? 'border-t-2 border-ink' : 'border-t border-line'} />
                  <span
                    className={`absolute -top-[3.5px] left-0 h-1.5 w-1.5 transition-colors duration-200 ${open ? 'bg-ink' : 'bg-faint'}`}
                  />
                </div>

                <div className="h-32 pt-3">{!above && card}</div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* 상세 모달 — 반투명 배경 + 페이드/스케일로 자연스럽게 등장 */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} 세부내용`}
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] flex items-center justify-center bg-bg/35 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="card flex w-full max-w-2xl flex-col bg-card/20 p-8 backdrop-blur-md sm:p-14"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <Stamp group={active.group} accent={active.accent} title={active.title} size="lg" />
                <span className="index-num">{labelOf(active.period)}</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-ink sm:text-5xl">{active.title}</p>
              {active.detail && (
                <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">{active.detail}</p>
              )}
              <button type="button" onClick={() => setActive(null)} className="btn-ghost mt-10 self-start">
                닫기 ESC ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ETC — 축에 올릴 시점이 없는 활동 */}
      <div className="mt-10 border-t border-line pt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">ETC</h4>
          <span className="index-num">{String(etc.length).padStart(2, '0')}</span>
        </div>

        <ul className="mt-6 grid gap-x-12 sm:grid-cols-2">
          {etc.map((r) => (
            <li key={r.title} className="border-b border-line/40 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="flex items-center gap-2">
                  <Stamp group={r.group} accent={r.accent} title={r.title} />
                  <span className="text-base font-semibold text-ink sm:text-lg">{r.title}</span>
                </span>
                {r.period && <span className="index-num">{r.period}</span>}
              </div>
              {r.detail && <p className="mt-2 text-sm leading-relaxed text-faint">{r.detail}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** "Activities" — 실무 경력 / 개인 활동을 탭으로 가른다.
 * Stacks(뷰포트 고정 카드 + 내부 스크롤)와 달리 카드 없이 페이지 전체가 흐른다. */
export default function ActivitiesSection() {
  const [tab, setTab] = useState('experience')

  return (
    <section className="w-full px-5 pb-28 pt-14 sm:px-8 sm:pt-20 lg:px-14">
      <header className="border-b border-line pb-10">
        <span className="eyebrow">ACTIVITIES</span>
        <h2 className="mt-5 text-[44px] font-bold leading-[0.95] tracking-tight text-ink sm:text-[72px] lg:text-[96px]">
          Activities
        </h2>
        <p className="mt-6 font-mono text-xs tracking-[0.2em] text-faint sm:text-sm">
          {String(positionsCount).padStart(2, '0')} POSITIONS · {String(records.length).padStart(2, '0')} RECORDS ·{' '}
          {yearSpan[0]} — {yearSpan.at(-1)}
        </p>
      </header>

      <div role="tablist" aria-label="경력 · 활동 구분" className="mt-12 flex items-end gap-8 border-b border-line">
        {TABS.map((t) => {
          const on = t.key === tab
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.key)}
              className={`relative flex items-baseline gap-3 pb-3 transition-colors duration-200 ${
                on ? 'text-ink' : 'text-faint hover:text-muted'
              }`}
            >
              <span className="text-2xl font-bold tracking-tight sm:text-3xl">{t.label}</span>
              <span className="index-num">{String(t.count).padStart(2, '0')}</span>
              {on && <motion.span layoutId="activities-tab" className="absolute inset-x-0 -bottom-px h-[2px] bg-ink" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          {tab === 'experience' ? <ExperienceTrack /> : <PersonalTrack />}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
