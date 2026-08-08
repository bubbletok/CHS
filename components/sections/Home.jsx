'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SAMPLE } from './ProjectsSection'

/** 홈에서 먼저 보여줄 프로젝트 — Projects 화면의 샘플 목록을 그대로 쓴다 */
const featured = SAMPLE.personal

/** "기본 홈 화면" — 좌측 정렬 타이틀 + 우측 "See all projects" + 프로젝트 카드 3장.
 * 화면(뷰포트)을 최대한 꽉 채우는 하나의 큰 테두리 박스로 구성한다. hover한 카드는 grid-template을 조정해 최대로 확장된다.
 * (섹션 링크는 상단 Nav가 이미 전부 갖고 있어 홈에서는 반복하지 않는다) */
export default function Home() {
  const [hovered, setHovered] = useState(null)
  const leaveTimer = useRef(null)

  // 다른 카드로 곧장 넘어갈 때 잠깐 기본 상태로 되돌아갔다가 다시 커지는 끊김을 막기 위해,
  // 벗어나자마자 null로 되돌리지 않고 짧게 지연시켜 다음 카드의 enter가 먼저 오면 취소한다.
  const handleEnter = (i) => {
    clearTimeout(leaveTimer.current)
    setHovered(i)
  }
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), 80)
  }

  const gridColumns = featured.map((_, i) => (i === hovered ? '2fr' : '1fr')).join(' ')

  return (
    <section
      id="home"
      className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
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

        <div
          className="mt-6 grid flex-1 grid-cols-1 gap-3 transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4 sm:[grid-template-columns:var(--cols)]"
          style={{ '--cols': gridColumns }}
        >
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href="/projects"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className="card shadow-soft flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-subtle hover:shadow-lift sm:p-10"
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="block text-2xl font-bold text-ink sm:text-4xl">{p.title}</span>
                <span className="mt-2 block text-xs text-faint sm:text-sm">Tech Stack / Duration</span>
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
