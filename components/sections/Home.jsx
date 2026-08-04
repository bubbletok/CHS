'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SECTIONS } from '@/lib/nav'

const quickNav = SECTIONS.filter((s) => s.path !== '/home')

/** "기본 홈 화면" — 피그마 그대로: 가운데 정렬 타이틀 + 우측 "See all projects" + 안쪽 경계선만 공유하는 2x2 그리드.
 * 화면(뷰포트)을 최대한 꽉 채우는 하나의 큰 테두리 박스로 구성한다. */
export default function Home() {
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

        <div className="mt-4 grid flex-1 grid-cols-2 border border-line">
          {quickNav.map((s, i) => (
            <Link
              key={s.path}
              href={s.path}
              className={`flex flex-col p-6 transition-colors hover:bg-subtle sm:p-10 ${
                i % 2 === 1 ? 'border-l border-line' : ''
              } ${i >= 2 ? 'border-t border-line' : ''}`}
            >
              <span className="text-lg font-semibold text-ink sm:text-2xl">{s.gridLabel}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
