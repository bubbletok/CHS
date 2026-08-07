'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTIONS } from '@/lib/nav'

/** 상단 고정 헤더 — 피그마 와이어프레임의 "Home . Project . Stack . About" 점 구분 내비 그대로 */
export default function Nav() {
  const pathname = usePathname()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        setStuck(window.scrollY > 12)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        stuck || open ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/home" className="font-mono text-[15px] font-bold tracking-tight text-ink">
          Do, Whatever
        </Link>

        <nav aria-label="화면 내비게이션" className="hidden items-center gap-2 font-mono text-sm tracking-wide md:flex">
          {SECTIONS.map((s, i) => (
            <span key={s.path} className="flex items-center gap-2">
              {i > 0 && <span className="text-faint">.</span>}
              <Link
                href={s.path}
                aria-current={s.path === pathname ? 'true' : undefined}
                className={s.path === pathname ? 'text-ink' : 'text-faint transition-colors hover:text-muted'}
              >
                {s.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg px-5 py-10 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <li key={s.path} className="border-b border-line">
                  <Link
                    href={s.path}
                    className="flex items-baseline gap-4 py-4 text-3xl font-bold tracking-tight text-ink"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
