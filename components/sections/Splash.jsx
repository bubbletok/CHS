'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const AUTO_DELAY = 1250

/** 첫 화면 — 스크롤 없이, 잠시 보여준 뒤 자동으로 /home 으로 넘어간다. 기다리기 싫으면 클릭/키로 바로 스킵 가능 */
export default function Splash() {
  const router = useRouter()
  const navigated = useRef(false)

  useEffect(() => {
    // 전환 시점엔 이미 컴파일/로드가 끝나 있도록, 화면 진입 즉시 다음 라우트를 미리 준비해둔다
    router.prefetch('/home')

    const goHome = () => {
      if (navigated.current) return
      navigated.current = true
      router.push('/home')
    }

    const timer = setTimeout(goHome, AUTO_DELAY)
    const onKey = (e) => ['Enter', ' ', 'ArrowDown'].includes(e.key) && goHome()
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [router])

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden px-5">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-ink"
      >
        Do, Whatever.
      </motion.p>

      <motion.button
        type="button"
        onClick={() => {
          if (navigated.current) return
          navigated.current = true
          router.push('/home')
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-faint"
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  )
}
