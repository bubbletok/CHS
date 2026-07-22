/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0D10',
        panel: '#14171B',
        line: '#23272D',
        ink: '#E8EAED',
        muted: '#868D97',
        unity: '#9FD356',
        unreal: '#4FA8E0',
        amber: '#E0A64F',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"Manrope"', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
