import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-start justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-14">
      <span className="index-num">404</span>
      <h1 className="display mt-4 text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
        요청하신 페이지를 찾을 수 없습니다. 주소가 바뀌었거나 더 이상 존재하지 않는 페이지일 수 있습니다.
      </p>
      <Link
        href="/home"
        className="mt-8 font-mono text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:text-muted"
      >
        ← 홈으로 돌아가기
      </Link>
    </section>
  )
}
