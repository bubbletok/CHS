'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { contacts } from '@/data/profile'

/** "기본 홈 화면" — 좌측 정렬 타이틀 + 우측 "See all projects" + 프로젝트 카드 3장.
 * 화면(뷰포트)을 최대한 꽉 채우는 하나의 큰 테두리 박스로 구성한다. 카드는 균등한 3분할 그리드, hover는 살짝 뜨는 정도로만 강조한다.
 * (섹션 링크는 상단 Nav가 이미 전부 갖고 있어 홈에서는 반복하지 않는다) */
export default function Home({ featured }) {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-4rem)] w-full flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex w-full flex-1 flex-col"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6 sm:pb-8">
          <div>
            <span className="eyebrow self-start text-sm sm:text-base">GAME DEVELOPER</span>
            <h1 className="display mt-4 text-[32px] sm:text-[44px] lg:text-[64px]">Hongsong Choi</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Unity와 Unreal을 오가며 성능 최적화와 아키텍처 설계에 집중하는 클라이언트 프로그래머입니다. 코드
              한 줄부터 배포 파이프라인까지, 게임이 더 안정적으로 완성되는 과정을 만드는 걸 지향합니다.
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.2em] text-faint sm:text-sm">
              UNITY / UNREAL · CLIENT / SERVER · INFRA · CI/CD
            </p>
          </div>

          <Link href="/projects" className="text-sm text-muted transition-colors hover:text-ink sm:text-base">
            See all projects →
          </Link>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href={`/projects?id=${p.id}`}
              className="card shadow-soft flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-subtle hover:shadow-lift sm:p-10"
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>

              {p.poster ? (
                <span className="my-6 flex flex-1 items-center justify-center overflow-hidden rounded">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 원본 비율 그대로 표시해야 해서 고정 크기가 필요한 next/image fill과 맞지 않는다 */}
                  <img src={p.poster} alt={p.title} className="h-full w-3/5 object-cover object-top" />
                </span>
              ) : (
                <span className="flex-1" />
              )}

              <span>
                <span className="block text-2xl font-bold text-ink sm:text-4xl">{p.title}</span>
                <span className="mt-2 block text-xs text-faint sm:text-sm">{p.subtitle}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.15em] text-faint sm:text-sm">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {c.label} <span className="normal-case tracking-normal text-muted">{c.value}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
