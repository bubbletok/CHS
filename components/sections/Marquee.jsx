/** trionn.com의 "INSPIRE · INNOVATE · IMPACT" 무한 티커 참고 */
const words = ['UNITY', 'UNREAL', 'C#', 'C++', 'GAS', 'COMPUTE SHADER', 'NETCODE']

export default function Marquee() {
  return (
    <div
      className="marquee-fade overflow-hidden border-y border-line bg-subtle py-5"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 will-change-transform">
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-mono text-2xl font-semibold uppercase tracking-tight text-faint sm:text-4xl"
          >
            {w}
            <span className="text-red">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
