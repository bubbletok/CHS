'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

/** 피그마 배지 순서(Unity · Unreal · ETC) 그대로 */
const TABS = [
  { key: 'unity', label: 'UNITY' },
  { key: 'unreal', label: 'UNREAL' },
  { key: 'etc', label: 'ETC' },
]

/** 샘플 콘텐츠 — 실제 프로젝트 데이터 대신 와이어프레임의 플레이스홀더 문구를 그대로 사용 */
const SAMPLE = {
  unity: [
    { id: 'unity-a', title: 'Project A' },
    { id: 'unity-b', title: 'Project B' },
    { id: 'unity-c', title: 'Project C' },
  ],
  unreal: [
    { id: 'unreal-a', title: 'Project A' },
    { id: 'unreal-b', title: 'Project B' },
  ],
  etc: [],
}

function CardBody({ item }) {
  return (
    <>
      <span className="text-2xl font-bold tracking-tight text-ink sm:text-4xl">{item.title}</span>
      <div>
        <p className="text-sm text-faint sm:text-base">Tech Stack / Duration / etc.</p>
        <p className="mt-8 text-3xl font-bold text-faint sm:text-5xl">Thumbnail</p>
        <p className="mt-4 text-xs text-faint sm:text-sm">클릭하면 프로젝트 세부 내용 창 뜨기</p>
      </div>
    </>
  )
}

/** "Projects Section" — Unity/Unreal/ETC 토글(전환 시 페이드) + 스크롤 연동 카드 캐스케이드. 섹션 자체도 가로를 최대한 넓게 쓴다 */
export default function ProjectsSection() {
  const [tab, setTab] = useState('unity')
  const [active, setActive] = useState(null)
  const items = SAMPLE[tab]

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const cardCount = Math.max(items.length, 1)
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', `${-((cardCount - 1) * 100) / cardCount}%`])

  return (
    <section className="w-full">
      {/* 모바일 — 겹치는 캐스케이드는 좁은 화면에서 깨지므로 그냥 세로로 쌓아 일반 스크롤로 본다 */}
      <div className="px-5 py-20 sm:hidden">
        <div className="mb-12 flex flex-col gap-4">
          <span className="eyebrow self-start">PROJECTS</span>
          <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink">Projects</h2>
          <div className="h-px w-full bg-line" />
        </div>

        <div role="tablist" aria-label="엔진 선택" className="inline-flex gap-1 rounded-full border border-line p-1.5">
          {TABS.map((t) => {
            const on = t.key === tab
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                  on ? 'bg-ink text-contrast-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
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
            transition={{ duration: 0.35 }}
          >
            {items.length === 0 ? (
              <p className="mt-14 text-center text-sm text-faint">준비 중입니다. 곧 채워질 예정이에요.</p>
            ) : (
              <div className="mt-14 grid gap-6">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item)}
                    className="card flex aspect-[3/2] w-full flex-col justify-between p-7 text-left"
                  >
                    <CardBody item={item} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 데스크톱 — 진입하자마자 화면 전체(헤딩·탭·첫 카드)가 스크롤 없이 바로 보이고, 카드 이동만 스크롤에 반응한다 */}
      <div ref={containerRef} style={{ height: `${items.length * 70}vh` }} className="relative hidden sm:block">
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col gap-6 px-8 py-8">
          <div className="flex flex-col gap-4">
            <span className="eyebrow self-start">PROJECTS</span>
            <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[52px]">Projects</h2>
            <div className="h-px w-full bg-line" />
          </div>

          <div role="tablist" aria-label="엔진 선택" className="inline-flex gap-1 self-start rounded-full border border-line p-1.5">
            {TABS.map((t) => {
              const on = t.key === tab
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.key)}
                  className={`rounded-full px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200 sm:px-9 ${
                    on ? 'bg-ink text-contrast-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.label}
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
              transition={{ duration: 0.35 }}
              className="relative flex-1 overflow-hidden"
            >
              {items.length === 0 ? (
                <p className="flex h-full items-center justify-center text-sm text-faint">
                  준비 중입니다. 곧 채워질 예정이에요.
                </p>
              ) : (
                <div
                  className="h-full overflow-hidden"
                  style={{
                    paddingLeft: 'calc((100% - min(860px, 88vw)) / 2)',
                    paddingRight: 'calc((100% - min(860px, 88vw)) / 2)',
                  }}
                >
                  <motion.div style={{ x: trackX }} className="inline-flex h-full">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(item)}
                        className="card flex h-full w-[min(860px,88vw)] shrink-0 flex-col justify-between p-10 text-left sm:p-14"
                      >
                        <CardBody item={item} />
                      </button>
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} 세부내용`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[55] flex items-center justify-center bg-bg/95 p-4 sm:p-8"
        >
          <div
            className="card flex h-[85vh] w-full max-w-4xl flex-col p-8 sm:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-3xl font-bold text-ink sm:text-5xl">{active.title}</p>
            <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
              클릭하면 프로젝트 세부 내용 창 뜨기 — 샘플 콘텐츠입니다.
            </p>
            <button type="button" onClick={() => setActive(null)} className="btn-ghost mt-auto self-start">
              닫기 ESC ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
