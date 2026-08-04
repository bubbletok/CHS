'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SECTIONS } from '@/lib/nav'

const quickNav = SECTIONS.filter((s) => s.path !== '/home')

/** "기본 홈 화면" — 좌측 정렬 타이틀 + 우측 "See all projects" + 벤토 그리드(Projects는 크게, 나머지 3개는 작게).
 * 화면(뷰포트)을 최대한 꽉 채우는 하나의 큰 테두리 박스로 구성한다. hover한 칸은 grid-template을 조정해 최대로 확장된다. */
export default function Home() {
  const [hovered, setHovered] = useState(null)
  const leaveTimer = useRef(null)

  // 다른 칸으로 곧장 넘어갈 때 잠깐 기본 상태로 되돌아갔다가 다시 커지는 끊김을 막기 위해,
  // 벗어나자마자 null로 되돌리지 않고 짧게 지연시켜 다음 칸의 enter가 먼저 오면 취소한다.
  const handleEnter = (i) => {
    clearTimeout(leaveTimer.current)
    setHovered(i)
  }
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(null), 80)
  }

  const gridColumns = hovered === 0 ? '3fr 1fr' : hovered !== null ? '1fr 2fr' : '2fr 1fr'
  const gridRows = ['1fr', '1fr', '1fr']
  if (hovered !== null && hovered > 0) gridRows[hovered - 1] = '2fr'

  return (
    <section id="home" className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="card flex w-full flex-1 flex-col p-8 sm:p-12"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">Hongsong Choi</h1>
          <p className="mt-4 text-sm text-muted sm:text-base">Game Developer</p>
          <p className="mt-1 font-mono text-xs text-faint sm:text-sm">Unity/Unreal, Client/Server, Infra, CI/CD</p>
        </div>

        <Link
          href="/projects"
          className="mt-10 self-end text-sm text-muted transition-colors hover:text-ink sm:text-base"
        >
          See all projects
        </Link>

        <div
          className="mt-4 grid flex-1 gap-3 transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4"
          style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows.join(' ') }}
        >
          <Link
            href={quickNav[0].path}
            onMouseEnter={() => handleEnter(0)}
            onMouseLeave={handleLeave}
            className="card row-span-3 flex flex-col justify-between overflow-hidden p-8 transition-colors hover:bg-subtle sm:p-12"
          >
            <span className="index-num">01</span>
            <span className="text-3xl font-bold text-ink sm:text-6xl">{quickNav[0].gridLabel}</span>
          </Link>

          {quickNav.slice(1).map((s, i) => (
            <Link
              key={s.path}
              href={s.path}
              onMouseEnter={() => handleEnter(i + 1)}
              onMouseLeave={handleLeave}
              className="card flex flex-col justify-between overflow-hidden p-5 transition-colors hover:bg-subtle sm:p-8"
            >
              <span className="index-num">{String(i + 2).padStart(2, '0')}</span>
              <span className="text-lg font-semibold text-ink sm:text-2xl">{s.gridLabel}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
