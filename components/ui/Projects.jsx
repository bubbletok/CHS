'use client'

import { useMemo, useRef, useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import ProjectDetail from './ProjectDetail'
import { projects, engineTabs } from '@/data/projects'
import { ACCENT } from '@/lib/accents'

/** 탭 목록에서 좌우 방향키로 이동시킨다. */
function useArrowKeys(refs, ids, current, onChange) {
  return (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const i = ids.indexOf(current)
    const next = ids[(i + dir + ids.length) % ids.length]
    onChange(next)
    refs.current[next]?.focus()
  }
}

export default function Projects() {
  const [engine, setEngine] = useState(engineTabs[0].key)
  // 엔진별로 마지막에 보던 프로젝트를 기억해 탭을 오갈 때 선택이 유지된다
  const [picked, setPicked] = useState({})

  const engineRefs = useRef({})
  const projectRefs = useRef({})

  const list = useMemo(() => projects.filter((p) => p.engine === engine), [engine])
  const activeId = picked[engine] ?? list[0]?.id
  const project = list.find((p) => p.id === activeId) ?? list[0]

  const accent = engineTabs.find((t) => t.key === engine).accent
  const a = ACCENT[accent]

  const selectProject = (id) => setPicked((prev) => ({ ...prev, [engine]: id }))

  const onEngineKeys = useArrowKeys(
    engineRefs,
    engineTabs.map((t) => t.key),
    engine,
    setEngine
  )
  const onProjectKeys = useArrowKeys(
    projectRefs,
    list.map((p) => p.id),
    activeId,
    selectProject
  )

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="프로젝트"
      accent="green"
      wide
    >
      {/* ── 1차 분류: 엔진 — 세그먼트 컨트롤 ─────────────── */}
      <Reveal>
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="엔진 선택"
            onKeyDown={onEngineKeys}
            className="inline-flex gap-1 rounded-2xl border border-line bg-subtle p-1.5"
          >
            {engineTabs.map((t) => {
              const on = t.key === engine
              const ta = ACCENT[t.accent]
              return (
                <button
                  key={t.key}
                  ref={(el) => (engineRefs.current[t.key] = el)}
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setEngine(t.key)}
                  className={`rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 sm:px-9 ${
                    on ? `${ta.bg} text-white shadow-soft` : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.label}
                  <span
                    className={`ml-2 text-xs font-semibold ${on ? 'text-white/70' : 'text-faint'}`}
                  >
                    {projects.filter((p) => p.engine === t.key).length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* ── 2차 분류: 프로젝트 — 알약 탭 ──────────────────── */}
      <Reveal delay={80}>
        <div
          role="tablist"
          aria-label="프로젝트 선택"
          onKeyDown={onProjectKeys}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {list.map((p) => {
            const on = p.id === activeId
            return (
              <button
                key={p.id}
                ref={(el) => (projectRefs.current[p.id] = el)}
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${p.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => selectProject(p.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  on
                    ? `${a.tint} ${a.text} ${a.border}`
                    : 'border-line bg-card text-muted hover:text-ink'
                }`}
              >
                {p.tab ?? p.title}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* ── 상세 패널 ──────────────────────────────────────── */}
      <div
        id={`panel-${project.id}`}
        role="tabpanel"
        aria-label={project.title}
        tabIndex={0}
        className="mt-10 focus-visible:outline-none"
      >
        {/* key를 바꿔 프로젝트 전환 시 등장 애니메이션을 다시 태운다 */}
        <ProjectDetail key={project.id} project={project} accent={accent} />
      </div>
    </Section>
  )
}
