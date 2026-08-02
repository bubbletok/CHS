'use client'

import { useEffect, useMemo, useState } from 'react'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectDetail from '@/components/ui/ProjectDetail'
import { ACCENT } from '@/lib/accents'

/** 카드에서 "세부내용 보기"를 누르면 뜨는 전체화면 모달 — ProjectDetail의 이미지 라이트박스(z-60)보다 낮게 둔다 */
/** 프로젝트 카드 그리드 — 라벨이 있으면 색이 있는 뱃지 + 구분선으로 소제목을 붙인다 */
function ProjectGrid({ label, sublabel, groupAccent, items, accent, onOpen, className = '' }) {
  if (items.length === 0) return null
  const ga = groupAccent ? ACCENT[groupAccent] : null
  return (
    <div className={className}>
      {label && (
        <div className={`mb-6 flex items-center gap-3 border-b-2 ${ga.border} pb-3`}>
          <span className={`eyebrow ${ga.tint} ${ga.text}`}>{label}</span>
          {sublabel && <span className="text-base font-bold text-ink">{sublabel}</span>}
        </div>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProjectCard
              project={p}
              accent={accent}
              as="button"
              type="button"
              onClick={() => onOpen(p)}
              ctaLabel="세부내용 보기"
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function ProjectModal({ project, accent, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 세부내용`}
      className="fixed inset-0 z-[55] overflow-y-auto bg-bg/97 backdrop-blur-md"
    >
      <div className="mx-auto max-w-wide px-5 py-8 sm:px-8">
        <div className="sticky top-4 z-10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-semibold text-ink"
          >
            닫기 ESC ✕
          </button>
        </div>

        <div className="mt-6">
          <ProjectDetail project={project} accent={accent} />
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects, engineTabs }) {
  const [engine, setEngine] = useState(engineTabs[0].key)
  const [active, setActive] = useState(null)

  const list = useMemo(() => projects.filter((p) => p.engine === engine), [projects, engine])
  const accent = engineTabs.find((t) => t.key === engine).accent

  const companyProjects = list.filter((p) => p.status === 'company')
  const personalProjects = list.filter((p) => p.status !== 'company')
  const isMixed = companyProjects.length > 0 && personalProjects.length > 0

  return (
    <Section id="projects" index={2} total={4} eyebrow="Projects" title="프로젝트" accent="green" wide>
      {/* 엔진 선택 — 세그먼트 컨트롤 */}
      <Reveal>
        <div className="flex justify-center sm:justify-start">
          <div
            role="tablist"
            aria-label="엔진 선택"
            className="inline-flex gap-1 rounded-full border border-line bg-subtle p-1.5"
          >
            {engineTabs.map((t) => {
              const on = t.key === engine
              const ta = ACCENT[t.accent]
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setEngine(t.key)}
                  className={`rounded-full px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200 sm:px-9 ${
                    on ? `${ta.bg} text-contrast-ink` : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.label}
                  <span
                    className={`ml-2 text-xs font-semibold ${on ? 'text-contrast-ink/70' : 'text-faint'}`}
                  >
                    {projects.filter((p) => p.engine === t.key).length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* 프로젝트 카드 그리드 — trionn.com의 Selected work 카드 참고. 회사/개인 프로젝트가 섞여 있으면 구분해 보여준다 */}
      {isMixed ? (
        <>
          <ProjectGrid
            label="COMPANY"
            sublabel="회사 프로젝트"
            groupAccent="orange"
            items={companyProjects}
            accent={accent}
            onOpen={setActive}
            className="mt-10"
          />
          <ProjectGrid
            label="PERSONAL"
            sublabel="개인 프로젝트"
            groupAccent="green"
            items={personalProjects}
            accent={accent}
            onOpen={setActive}
            className="mt-14"
          />
        </>
      ) : (
        <ProjectGrid items={list} accent={accent} onOpen={setActive} className="mt-10" />
      )}

      {active && <ProjectModal project={active} accent={accent} onClose={() => setActive(null)} />}
    </Section>
  )
}
