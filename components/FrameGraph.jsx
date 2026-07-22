'use client'

import { useEffect, useRef } from 'react'

// 프로그래머 포트폴리오의 시그니처 요소.
// 엔진 프로파일러의 프레임타임 그래프를 흉내낸, 계속 움직이는 얇은 스트립.
// "지금도 뭔가를 만들고 있다"는 걸 은유적으로 보여줌. 장식이 아니라 헤더에 고정된 상태 표시줄.
export default function FrameGraph({ height = 44 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = canvas.clientWidth
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const setSize = () => {
      width = canvas.clientWidth
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    setSize()

    const points = Math.floor(width / 4)
    const data = new Array(points).fill(16.6)
    let frame = 0
    let raf

    function tick() {
      // 16.6ms 근처를 오가는 자연스러운 프레임타임처럼 값 생성
      const last = data[data.length - 1]
      const drift = (Math.random() - 0.5) * 3
      let next = last + drift
      next = Math.max(8, Math.min(30, next))
      data.shift()
      data.push(next)

      ctx.clearRect(0, 0, width, height)

      // 60fps 기준선
      ctx.strokeStyle = 'rgba(134, 141, 151, 0.25)'
      ctx.lineWidth = 1
      ctx.beginPath()
      const baseline = height - (16.6 / 30) * height
      ctx.moveTo(0, baseline)
      ctx.lineTo(width, baseline)
      ctx.stroke()

      // 프레임타임 라인
      ctx.beginPath()
      ctx.strokeStyle = '#9FD356'
      ctx.lineWidth = 1.5
      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - (v / 30) * height
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      frame++
      if (!reduceMotion) {
        raf = requestAnimationFrame(() => setTimeout(tick, 90))
      }
    }

    tick()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [height])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height }}
      aria-hidden="true"
      role="presentation"
    />
  )
}
