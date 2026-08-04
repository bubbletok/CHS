'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

/** 첫 화면 — 스크롤(휠/터치/키보드)하면 다른 화면들처럼 라우터로 /home 으로 넘어간다 */
export default function Splash() {
  const router = useRouter()
  const navigated = useRef(false)

  useEffect(() => {
    const goHome = () => {
      if (navigated.current) return
      navigated.current = true
      router.push('/home')
    }

    const onWheel = (e) => e.deltaY > 24 && goHome()
    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e) => touchStartY - e.touches[0].clientY > 24 && goHome()
    const onKey = (e) => ['ArrowDown', 'PageDown', ' '].includes(e.key) && goHome()

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
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
        onClick={() => router.push('/home')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="index-num">SCROLL</span>
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
