'use client'

import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const easeOut = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[92vh] w-full max-w-wide flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* 뒤에 흐르는 3D 배경 위에서도 텍스트 대비가 유지되도록 은은한 스크림 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-[1] w-full max-w-2xl bg-gradient-to-r from-bg via-bg/80 to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="index-num mb-6"
      >
        {profile.name} · {profile.role}
      </motion.p>

      <h1 className="max-w-5xl text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[0.94] tracking-tight text-ink">
        <motion.span
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="block"
        >
          Do<span className="text-red">,</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          className="block text-muted"
        >
          Whatever<span className="text-red">.</span>
        </motion.span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="mt-6 max-w-xl text-lg font-medium text-muted sm:text-xl">
          {profile.tagline}
        </p>
        <p className="mt-3 font-mono text-sm tracking-wide text-faint">{profile.engines}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-primary">
            프로젝트 보기
          </a>
          <a href="#contact" className="btn-ghost">
            연락하기
          </a>
        </div>
      </motion.div>
    </section>
  )
}
