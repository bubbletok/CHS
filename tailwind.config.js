/** @type {import('tailwindcss').Config} */
//
// 색은 전부 CSS 변수를 통해 정의한다. :root 하나만 존재하는
// 흑백 미니멀 팔레트다 (app/globals.css 참고, 피그마 와이어프레임 그대로 — 색 액센트 없음).
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 표면
        bg: v('--c-bg'),
        subtle: v('--c-subtle'),
        card: v('--c-card'),
        line: v('--c-line'),
        // 텍스트
        ink: v('--c-ink'),
        muted: v('--c-muted'),
        faint: v('--c-faint'),
        // 액센트 — 파랑 · 주황 · 초록 · 빨강(러스트) — 전부 채도를 낮춘 에디토리얼 톤
        blue: v('--c-blue'),
        orange: v('--c-orange'),
        green: v('--c-green'),
        red: v('--c-red'),
        brand: v('--c-red'),
        // 저채도 틴트 블록 (히어로·칩 배경)
        'tint-blue': v('--t-blue'),
        'tint-orange': v('--t-orange'),
        'tint-green': v('--t-green'),
        'tint-red': v('--t-red'),
        // 대비용 다크 블록 (CTA/오버레이)
        contrast: v('--c-contrast'),
        'contrast-ink': v('--c-contrast-ink'),
      },
      fontFamily: {
        // 헤드라인은 개성 있는 지오메트릭 디스플레이, 라벨/UI는 IBM Plex Mono
        sans: ['Space Grotesk', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        // trionn.com 참고 — 하드라인 대신 모더레이트 라운드 + 글래스 카드
        xl: '14px',
        '2xl': '18px',
        '3xl': '22px',
        '4xl': '28px',
      },
      boxShadow: {
        // 네온 글로우 대신 얕고 절제된 확산 그림자 — 입체감은 주로 hairline 보더가 담당한다
        soft: '0 1px 0 0 rgb(var(--c-line)), 0 12px 24px -12px rgb(var(--c-shadow) / 0.5)',
        lift: '0 1px 0 0 rgb(var(--c-line)), 0 20px 36px -16px rgb(var(--c-shadow) / 0.6)',
        deep: '0 24px 48px -20px rgb(var(--c-shadow) / 0.7)',
      },
      maxWidth: {
        content: '1100px',
        wide: '1200px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
