'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

/** 큰 갈래 — 회사 작업 / 개인 작업 */
const TABS = [
  { key: 'company', label: 'Company' },
  { key: 'personal', label: 'Personal' },
]

/** 세부 갈래 — 엔진 */
const ENGINES = [
  { key: 'all', label: 'ALL' },
  { key: 'unity', label: 'UNITY' },
  { key: 'unreal', label: 'UNREAL' },
  { key: 'etc', label: 'ETC' },
]

/** 샘플 콘텐츠 — 실제 프로젝트 데이터 대신 와이어프레임의 플레이스홀더 문구를 그대로 사용. 홈 화면도 이걸 그대로 쓴다 */
export const SAMPLE = {
  company: [
    { id: 'company-a', title: 'Company A', engine: 'unreal' },
    { id: 'company-b', title: 'Company B', engine: 'unity' },
  ],
  personal: [
    { id: 'personal-a', title: 'Project A', engine: 'unity' },
    { id: 'personal-b', title: 'Project B', engine: 'unreal' },
    { id: 'personal-c', title: 'Project C', engine: 'etc' },
  ],
}

/** 탭 바 — 알약 버튼 대신 하단 hairline 위를 미끄러지는 밑줄. 오른쪽 끝에 엔진 세부 탭을 같은 baseline으로 붙인다 */
function TabBar({ tab, onTab, engine, onEngine, id }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-line">
      <div role="tablist" aria-label="작업 구분 선택" className="flex items-end gap-8">
        {TABS.map((t) => {
          const on = t.key === tab
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => onTab(t.key)}
              className={`relative pb-3 text-xl font-bold tracking-tight transition-colors duration-200 sm:text-2xl ${
                on ? 'text-ink' : 'text-faint hover:text-muted'
              }`}
            >
              {t.label}
              {/* 모바일/데스크톱 두 벌이 동시에 마운트돼 있으므로 layoutId를 분리한다 */}
              {on && (
                <motion.span layoutId={`tab-underline-${id}`} className="absolute inset-x-0 -bottom-px h-[2px] bg-ink" />
              )}
            </button>
          )
        })}
      </div>

      <div
        role="tablist"
        aria-label="엔진 선택"
        className="flex items-center gap-6 pb-3.5 font-mono text-sm uppercase tracking-[0.15em]"
      >
        {ENGINES.map((e) => {
          const on = e.key === engine
          const count = e.key === 'all' ? SAMPLE[tab].length : SAMPLE[tab].filter((p) => p.engine === e.key).length
          const empty = count === 0
          return (
            <button
              key={e.key}
              role="tab"
              aria-selected={on}
              disabled={empty}
              onClick={() => onEngine(e.key)}
              className={`relative pb-1.5 transition-colors duration-200 disabled:cursor-default ${
                on ? 'font-bold text-ink' : empty ? 'font-medium text-faint/50' : 'font-medium text-muted hover:text-ink'
              }`}
            >
              {e.label}
              <span className={`ml-1.5 text-xs tracking-normal ${on ? 'text-muted' : 'text-faint'}`}>{count}</span>
              {on && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-ink" />}
            </button>
          )
        })}
      </div>
    </div>
  )
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

/** "Projects Section" — Company/Personal 탭 + 엔진 세부 탭(전환 시 페이드) + 스크롤 연동 카드 캐스케이드. 섹션 자체도 가로를 최대한 넓게 쓴다 */
export default function ProjectsSection() {
  const [tab, setTab] = useState('company')
  const [engine, setEngine] = useState('all')
  const [active, setActive] = useState(null)
  const items = SAMPLE[tab].filter((p) => engine === 'all' || p.engine === engine)

  // 큰 탭을 바꾸면 세부 탭은 전체로 되돌린다 — 이전 엔진 필터가 남아 빈 화면이 뜨는 걸 막는다
  const changeTab = (key) => {
    setTab(key)
    setEngine('all')
  }

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const cardCount = Math.max(items.length, 1)
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', `${-((cardCount - 1) * 100) / cardCount}%`])

  return (
    <section className="w-full">
      {/* 모바일 — 겹치는 캐스케이드는 좁은 화면에서 깨지므로 그냥 세로로 쌓아 일반 스크롤로 본다 */}
      <div className="px-5 py-20 sm:hidden">
        <div className="mb-8 flex flex-col gap-4">
          <span className="eyebrow self-start">PROJECTS</span>
          <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink">Projects</h2>
        </div>

        <TabBar id="mobile" tab={tab} onTab={changeTab} engine={engine} onEngine={setEngine} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${engine}`}
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
      <div ref={containerRef} style={{ height: `${cardCount * 70}vh` }} className="relative hidden sm:block">
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col gap-6 px-8 py-8">
          <div className="flex flex-col gap-4">
            <span className="eyebrow self-start">PROJECTS</span>
            <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[52px]">Projects</h2>
          </div>

          <TabBar id="desktop" tab={tab} onTab={changeTab} engine={engine} onEngine={setEngine} />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${engine}`}
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
