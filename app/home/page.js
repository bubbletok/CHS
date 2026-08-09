import Home from '@/components/sections/Home'
import { loadProjects } from '@/lib/loadProjects'

export default function HomePage() {
  // 홈은 3장만 보여준다 — 완결된 프로젝트 위주로, 진행 중(wip)인 건 뺀다
  const featured = loadProjects()
    .filter((p) => p.bucket === 'personal' && p.status !== 'wip')
    .slice(0, 3)
  return <Home featured={featured} />
}
