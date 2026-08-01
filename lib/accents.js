/**
 * 액센트 매핑 — 파랑 · 주황 · 초록 · 빨강 4색.
 * Tailwind는 런타임에 조립한 클래스명을 스캔하지 못하므로
 * 완성된 클래스 문자열을 정적으로 나열해 둔다.
 * (이 파일이 tailwind.config.js의 content 글로브에 포함되어야 한다)
 */
export const ACCENT = {
  blue: {
    text: 'text-blue',
    bg: 'bg-blue',
    tint: 'bg-tint-blue',
    border: 'border-blue',
    dot: 'bg-blue',
  },
  orange: {
    text: 'text-orange',
    bg: 'bg-orange',
    tint: 'bg-tint-orange',
    border: 'border-orange',
    dot: 'bg-orange',
  },
  green: {
    text: 'text-green',
    bg: 'bg-green',
    tint: 'bg-tint-green',
    border: 'border-green',
    dot: 'bg-green',
  },
  red: {
    text: 'text-red',
    bg: 'bg-red',
    tint: 'bg-tint-red',
    border: 'border-red',
    dot: 'bg-red',
  },
}

export const accentKeys = Object.keys(ACCENT)
