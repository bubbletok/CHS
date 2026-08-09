'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

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
]

/** 탭 바 — 알약 버튼 대신 하단 hairline 위를 미끄러지는 밑줄. 오른쪽 끝에 엔진 세부 탭을 같은 baseline으로 붙인다 */
function TabBar({ tab, onTab, engine, onEngine, tabItems }) {
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
              {on && (
                <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-[2px] bg-ink" />
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
          const count = e.key === 'all' ? tabItems.length : tabItems.filter((p) => p.engine === e.key).length
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
      <span className="flex items-start justify-between gap-4">
        <span className="text-2xl font-bold tracking-tight text-ink sm:text-4xl">{item.title}</span>
        {item.badge && (
          <span className="shrink-0 border border-[#ef4444] px-2.5 py-1 font-mono text-xs font-bold tracking-[0.2em] text-[#ef4444]">
            {item.badge}
          </span>
        )}
      </span>

      {/* 포스터가 있으면 카드 가운데를 채우고, 없으면 빈 flex-1로 같은 자리를 비워둔다.
          홈 화면 카드와 같은 크롭(object-cover)이라 레터박스 없이 큼직하게 찬다 */}
      {item.poster ? (
        <div className="my-6 flex flex-1 items-center justify-center overflow-hidden rounded">
          <img src={item.poster} alt="" className="h-full w-3/5 object-cover object-top" />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div>
        <p className="text-sm text-muted sm:text-base">{item.subtitle}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-sm">
          {item.stack.slice(0, 3).join(' · ')}
        </p>
      </div>
    </>
  )
}

/** 긴 본문을 빈 줄 기준으로 문단 나눠 렌더 — 한 덩어리 텍스트보다 시인성이 낫다. 줄 길이도 가독 폭으로 제한한다 */
function Paragraphs({ text, className = '' }) {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  return (
    <div className="max-w-[68ch] space-y-3">
      {paras.map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </div>
  )
}

/** youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID 형태 모두에서 영상 ID를 뽑아 임베드 URL로 바꾼다 */
function youtubeEmbedUrl(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

/** 링크 중 유튜브 URL은 키 이름과 상관없이 버튼 대신 바로 재생 가능한 임베드로 보여주고, 나머지는 그대로 버튼으로 깐다 */
function MediaLinks({ links }) {
  if (!links || Object.keys(links).length === 0) return null
  const entries = Object.entries(links).map(([k, href]) => [k, href, youtubeEmbedUrl(href)])
  const embeds = entries.filter(([, , embed]) => embed)
  const rest = entries.filter(([, , embed]) => !embed)

  return (
    <>
      {embeds.map(([k, , embed]) => (
        <div key={k} className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={embed}
            title={k}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
      {rest.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {rest.map(([k, href]) => (
            <a key={k} href={href} target="_blank" rel="noreferrer" className="btn-ghost">
              {k} ↗
            </a>
          ))}
        </div>
      )}
    </>
  )
}

/** 스크린샷 가로 갤러리 — overflow-x-auto는 기본적으로 마우스 휠(세로 스크롤)에 반응하지 않아 직접 변환해준다 */
function ShotsGallery({ shots }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = (e) => {
      if (e.deltaY === 0) return
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div ref={trackRef} className="flex gap-3 overflow-x-auto pb-2">
      {shots.map((src) => (
        <img key={src} src={src} alt="" className="h-72 w-auto shrink-0 rounded object-contain sm:h-96" />
      ))}
    </div>
  )
}

/** 문제점 한 항목 — 접혀 있다가 클릭하면 본문(+스크린샷)이 펼쳐진다 */
function ProblemItem({ problem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line/40 pb-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-1 text-left"
      >
        <h4 className="text-sm font-bold text-ink sm:text-base">{problem.title}</h4>
        <span
          aria-hidden="true"
          className={`shrink-0 text-lg leading-none text-faint transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {problem.images?.length > 0 && (
              <div className={`mt-3 grid gap-3 ${problem.images.length > 1 ? 'grid-cols-2' : ''}`}>
                {problem.images.map((src) => (
                  <img key={src} src={src} alt="" className="w-full rounded-lg object-cover" />
                ))}
              </div>
            )}
            <div className="mt-3">
              <Paragraphs text={problem.body} className="text-sm leading-relaxed text-muted sm:text-base" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** 상세 모달의 텍스트 블록 — 이미지가 있으면 오른쪽 컬럼에, 없으면 모달 전체 폭에 그대로 쓴다 */
function ProjectDetails({ active }) {
  return (
    <div>
      {Object.keys(active.meta ?? {}).length > 0 && (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line pb-6 sm:grid-cols-4">
          {Object.entries(active.meta).map(([k, v]) => (
            <div key={k}>
              <dt className="index-num">{k}</dt>
              <dd className="mt-1 break-keep text-sm text-ink sm:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {active.summary && (
        <blockquote className="mt-6 border-l-2 border-line pl-4 text-base italic leading-relaxed text-ink/90 sm:pl-5 sm:text-lg">
          {active.summary}
        </blockquote>
      )}

      {active.role && (
        <div className="mt-8">
          <h4 className="text-sm font-bold text-ink sm:text-base">역할 — {active.role.label}</h4>
          <div className="mt-2">
            <Paragraphs text={active.role.body} className="text-sm leading-relaxed text-muted sm:text-base" />
          </div>
        </div>
      )}

      {active.problems.length > 0 && (
        <div className="mt-8 space-y-3">
          {active.problems.map((p) => (
            <ProblemItem key={p.title} problem={p} />
          ))}
        </div>
      )}

      {active.awards.length > 0 && (
        <ul className="mt-8 space-y-1.5">
          {active.awards.map((a) => (
            <li key={a} className="text-sm text-muted sm:text-base">
              {a}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-2.5">
        {active.stack.map((s) => (
          <span key={s} className="border border-line px-3 py-1.5 text-sm font-medium text-ink">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/** "Projects Section" — Company/Personal 탭 + 엔진 세부 탭(전환 시 페이드) + 스크롤 연동 카드 캐스케이드. 섹션 자체도 가로를 최대한 넓게 쓴다 */
export default function ProjectsSection({ projects }) {
  const [tab, setTab] = useState('company')
  const [engine, setEngine] = useState('all')
  const [active, setActive] = useState(null)
  const tabItems = projects.filter((p) => p.bucket === tab)
  const items = tabItems.filter((p) => engine === 'all' || p.engine === engine)

  // 홈 카드 등 외부에서 ?id=프로젝트id로 들어오면 해당 탭으로 맞추고 상세 모달을 바로 연다
  const searchParams = useSearchParams()
  useEffect(() => {
    const id = searchParams.get('id')
    const target = id && projects.find((p) => p.id === id)
    if (!target) return
    setTab(target.bucket)
    setEngine('all')
    setActive(target)
  }, [searchParams, projects])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  // 큰 탭을 바꾸면 세부 탭은 전체로 되돌린다 — 이전 엔진 필터가 남아 빈 화면이 뜨는 걸 막는다
  const changeTab = (key) => {
    setTab(key)
    setEngine('all')
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full break-keep flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-14">
      <div className="mb-8 flex flex-col gap-4">
        <span className="eyebrow self-start">PROJECTS</span>
        <h2 className="display text-[44px] sm:text-[56px]">Projects</h2>
      </div>

      <TabBar tab={tab} onTab={changeTab} engine={engine} onEngine={setEngine} tabItems={tabItems} />

      {/* 홈 화면 카드 그리드와 동일한 구조·크기 — 3열, 카드가 남은 세로 공간을 꽉 채운다.
          탭에 카드가 3개 넘게 있으면 다음 줄로 자연스럽게 넘어가고 페이지가 그만큼 스크롤된다 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${tab}-${engine}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-1 flex-col"
        >
          {items.length === 0 ? (
            <p className="mt-14 text-center text-sm text-faint">준비 중입니다. 곧 채워질 예정이에요.</p>
          ) : (
            <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item)}
                  className="card shadow-soft flex flex-col justify-between overflow-hidden p-6 text-left transition-shadow duration-300 hover:shadow-lift sm:p-10"
                >
                  <CardBody item={item} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} 세부내용`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[55] flex items-center justify-center bg-bg/45 p-4 sm:p-8"
        >
          <div
            className="card shadow-lift h-[85vh] w-full max-w-[100rem] bg-card/40 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
          {/* 모서리 크롭마크(.card::after)는 이 바깥 박스에 고정하고, 스크롤은 안쪽 래퍼가 전담한다 —
              같은 요소에서 overflow-y-auto와 함께 쓰면 마크 위치 계산이 스크롤에 끌려간다 */}
          <div className="flex h-full flex-col overflow-y-auto p-8 sm:p-16">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {active.pitch && <p className="index-num">{active.pitch}</p>}
                <p className="mt-2 text-3xl font-bold text-ink sm:text-5xl">{active.title}</p>
                <p className="mt-2 text-sm text-muted sm:text-base">{active.subtitle}</p>
              </div>
              {active.badge && (
                <span className="shrink-0 border border-[#ef4444] px-3 py-1.5 font-mono text-xs font-bold tracking-[0.2em] text-[#ef4444]">
                  {active.badge}
                </span>
              )}
            </div>

            {/* 링크(플레이스토어·영상 등)는 미디어와 같이 묶어 왼쪽에 둔다 */}
            {(active.poster || active.shots?.length > 0) ? (
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                {/* 왼쪽 — 이미지 / 영상 */}
                <div className="flex flex-col gap-4">
                  {active.poster && (
                    <img
                      src={active.poster}
                      alt=""
                      className="max-h-[32rem] w-full rounded-lg object-contain"
                    />
                  )}
                  {active.shots?.length > 0 && <ShotsGallery shots={active.shots} />}
                  <MediaLinks links={active.links} />
                </div>

                {/* 오른쪽 — 설명 */}
                <ProjectDetails active={active} />
              </div>
            ) : (
              <div className="mt-8">
                <ProjectDetails active={active} />
                <div className="mt-8 flex flex-col gap-4">
                  <MediaLinks links={active.links} />
                </div>
              </div>
            )}

            <button type="button" onClick={() => setActive(null)} className="btn-ghost mt-8 self-start">
              닫기 ESC ✕
            </button>
          </div>
          </div>
        </div>
      )}
    </section>
  )
}
