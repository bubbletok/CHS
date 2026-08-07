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
    <section id="home" className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="card flex w-full flex-1 flex-col p-8 sm:p-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">Hongsong Choi</h1>
            <p className="mt-4 text-sm text-muted sm:text-base">Game Developer</p>
            <p className="mt-1 font-mono text-xs text-faint sm:text-sm">Unity/Unreal, Client/Server, Infra, CI/CD</p>
          </div>

          <Link href="/projects" className="text-sm text-muted transition-colors hover:text-ink sm:text-base">
            See all projects
          </Link>
        </div>

        <div
          className="mt-10 grid flex-1 grid-cols-1 gap-3 transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4 sm:[grid-template-columns:var(--cols)]"
          style={{ '--cols': gridColumns }}
        >
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href="/projects"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className="card flex flex-col justify-between overflow-hidden p-6 transition-colors hover:bg-subtle sm:p-10"
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
