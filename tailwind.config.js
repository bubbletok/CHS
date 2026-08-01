/** @type {import('tailwindcss').Config} */
//
// 색은 전부 CSS 변수를 통해 정의한다. :root 와 [data-theme="dark"] 에서
// 변수만 갈아끼우면 라이트/다크가 동시에 대응된다. (app/globals.css 참고)
//
// lib/accents.js가 완성된 클래스 문자열(bg-brand, text-violet 등)을 들고 있으므로
// content 글로브에서 lib을 빼면 액센트 클래스가 전부 purge된다. 반드시 포함할 것.
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
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
        // 액센트 — 파랑 · 주황 · 초록 · 빨강
        blue: v('--c-blue'),
        orange: v('--c-orange'),
        green: v('--c-green'),
        red: v('--c-red'),
        brand: v('--c-blue'),
        // 파스텔 블록 (히어로·칩 배경)
        'tint-blue': v('--t-blue'),
        'tint-orange': v('--t-orange'),
        'tint-green': v('--t-green'),
        'tint-red': v('--t-red'),
        // 대비용 다크 블록 (CTA)
        contrast: v('--c-contrast'),
        'contrast-ink': v('--c-contrast-ink'),
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Noto Serif KR', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '10px',
        '2xl': '15px',
        '3xl': '20px',
        '4xl': '28px',
      },
      boxShadow: {
        // Weekrise 특유의 넓고 부드러운 확산 그림자
        soft: '0 0 25px 0 rgb(var(--c-shadow) / 0.12)',
        lift: '0 8px 30px 0 rgb(var(--c-shadow) / 0.14)',
        deep: '0 0 35px 0 rgb(var(--c-shadow) / 0.22)',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
