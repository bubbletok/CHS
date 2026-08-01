'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ACCENT } from '@/lib/accents'

const STATUS = {
  playable: { label: 'PLAYABLE', accent: 'green' },
  video: { label: 'VIDEO', accent: 'blue' },
  wip: { label: 'IN PROGRESS', accent: 'orange' },
}

const LINK_LABEL = { play: 'Google Play', github: 'GitHub', video: '영상 보기' }

/** 이미지 확대용 오버레이 */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 확대"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-contrast/90 p-6 backdrop-blur-sm"
    >
      <div className="relative h-full w-full max-w-6xl">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-6 top-6 rounded-xl bg-card px-4 py-2 text-sm font-semibold text-ink"
      >
        ESC ✕
      </button>
    </div>
  )
}

export default function ProjectDetail({ project, accent }) {
  const [zoom, setZoom] = useState(null)
  const a = ACCENT[accent]
  const status = STATUS[project.status]
  const sa = ACCENT[status.accent]
  const shots = project.shots ?? []
  const links = Object.entries(project.links ?? {}).filter(([, v]) => v)

  return (
    <div className="grid animate-fade-up gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
      {/* ── 왼쪽: 영상 · 포스터 · 인게임 스크린샷 ─────────────── */}
      <div className="space-y-4">
        <div className="card overflow-hidden p-0">
          {project.video ? (
            <div className="aspect-video">
              <iframe
                src={project.video}
                title={`${project.title} 영상`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : project.poster ? (
            <button
              type="button"
              onClick={() => setZoom({ src: project.poster, alt: `${project.title} 포스터` })}
              className="group relative block aspect-[4/5] w-full cursor-zoom-in"
            >
              <Image
                src={project.poster}
                alt={`${project.title} 포스터`}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </button>
          ) : (
            <div className="grid aspect-[4/3] place-items-center bg-subtle">
              <span className="text-sm font-medium text-faint">NO PREVIEW</span>
            </div>
          )}
        </div>

        {shots.length > 0 && (
          <div>
            <p className="mb-3 text-[13px] font-bold text-faint">IN-GAME</p>
            <div className="grid grid-cols-2 gap-3">
              {shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setZoom({ src, alt: `${project.title} 인게임 스크린샷 ${i + 1}` })}
                  className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line"
                >
                  <Image
                    src={src}
                    alt={`${project.title} 인게임 스크린샷 ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map(([key, href]) => (
              <a key={key} href={href} target="_blank" rel="noreferrer noopener" className="btn-ghost">
                {LINK_LABEL[key] ?? key} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── 오른쪽: 상세 내용 ────────────────────────────────── */}
      <div className="card min-w-0 space-y-8 p-7 sm:p-9">
        <header>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`eyebrow ${sa.tint} ${sa.text}`}>{status.label}</span>
            {project.badge && (
              <span className="eyebrow bg-subtle text-muted">{project.badge}</span>
            )}
          </div>

          <h3 className="text-[30px] font-extrabold leading-tight tracking-tight text-ink sm:text-[38px]">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className={`mt-2 text-lg font-semibold ${a.text}`}>{project.subtitle}</p>
          )}
        </header>

        {project.pitch && (
          <div className={`rounded-2xl ${a.tint} px-5 py-4`}>
            <p className="text-sm font-medium leading-relaxed text-ink/85">{project.pitch}</p>
          </div>
        )}

        {project.meta?.length > 0 && (
          <dl className="grid gap-x-8 rounded-2xl border border-line px-5 sm:grid-cols-2">
            {project.meta.map((m) => (
              <div key={m.k} className="flex gap-4 border-b border-line py-3.5 last:border-b-0">
                <dt className="w-[76px] shrink-0 text-sm font-semibold text-faint">{m.k}</dt>
                <dd className="min-w-0 text-[15px] font-medium text-ink">{m.v}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* 프로젝트 한 줄 요약 — 큰 따옴표를 세운 인용구로 */}
        <blockquote className="relative pl-9 sm:pl-12">
          <span
            aria-hidden="true"
            className={`accent-serif absolute left-0 top-[-0.35em] select-none text-[64px] leading-none ${a.text} opacity-35 sm:text-[76px]`}
          >
            &ldquo;
          </span>
          <p className="text-[17px] font-medium leading-[1.9] text-ink/90">{project.summary}</p>
        </blockquote>

        {project.role && (
          <section>
            <h4 className="text-lg font-bold tracking-tight text-ink">{project.role.title}</h4>
            <blockquote
              className={`mt-3 border-l-[3px] ${a.border} pl-5 text-[15px] leading-[1.85] text-muted`}
            >
              {project.role.body}
            </blockquote>
          </section>
        )}

        {project.problem?.length > 0 && (
          <section>
            <h4 className="text-lg font-bold tracking-tight text-ink">생겼던 문제점들</h4>
            <div className="mt-4 space-y-3">
              {project.problem.map((p, i) => (
                <details
                  key={p.title}
                  open={i === 0}
                  className="group rounded-2xl border border-line bg-subtle px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 text-[15px] font-semibold text-ink">
                    <span
                      className={`text-[10px] ${a.text} transition-transform duration-300 group-open:rotate-90`}
                    >
                      ▶
                    </span>
                    <span>{p.title}</span>
                  </summary>

                  <div className="mt-3 pl-6">
                    <p className="text-[15px] leading-[1.85] text-muted">{p.body}</p>

                    {/* images 필드가 있는 항목에만 자리를 만든다.
                        경로가 채워지면 그리드로, 빈 배열이면 자리표시자로. */}
                    {Array.isArray(p.images) &&
                      (p.images.length ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {p.images.map((src, k) => (
                            <button
                              key={src}
                              type="button"
                              onClick={() => setZoom({ src, alt: `${p.title} ${k + 1}` })}
                              className="group/shot relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-card"
                            >
                              <Image
                                src={src}
                                alt={`${p.title} ${k + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, 300px"
                                className="object-cover transition-transform duration-500 group-hover/shot:scale-[1.06]"
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-4 grid aspect-video w-full place-items-center rounded-2xl border border-dashed border-line bg-card">
                          <span className="text-[13px] font-medium text-faint">이미지 자리</span>
                        </div>
                      ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {project.awards?.length > 0 && (
          <section>
            <h4 className="text-lg font-bold tracking-tight text-ink">수상</h4>
            <ul className="mt-3 space-y-2">
              {project.awards.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="border-t border-line pt-6">
          <p className="mb-3 text-[13px] font-bold text-faint">STACK</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </div>
  )
}
