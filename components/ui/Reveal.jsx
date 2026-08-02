'use client'

import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion'

/** 뷰포트에 들어오면 한 번만 등장 애니메이션을 실행한다. */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  )
}
