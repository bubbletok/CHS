import Reveal from '@/components/ui/Reveal'
import { engines, familiar } from '@/data/skills'

/** 엔진 스택과 그 외 스택을 한 규격으로 합친다 — 렌더는 { id, label, items } 하나만 알면 된다 */
const groups = [
  ...engines.map((e) => ({ id: e.key, label: e.label, items: e.items })),
  {
    id: 'familiar',
    label: 'FAMILIAR',
    items: familiar.map((f) => ({ name: f.label, detail: f.detail })),
  },
]

/** "Stacks" — 좌측 헤딩 고정 + 우측 목록만 스크롤.
 * body에 overflow-x:hidden이 걸려 있어 position:sticky가 어긋나므로,
 * 뷰포트 높이 카드 안에서 오른쪽 칼럼에만 overflow-y-auto를 준다. */
export default function StacksSection() {
  return (
    <section className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden p-4 sm:p-6">
      <Reveal className="card flex w-full flex-1 flex-col overflow-hidden p-6 sm:p-10 lg:p-12">
        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          {/* 좌측 — 스크롤에 딸려가지 않는 고정 헤딩 */}
          <div className="flex shrink-0 flex-col gap-4">
            <span className="eyebrow self-start">STACKS</span>
            <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[52px]">Stacks</h2>
          </div>

          {/* 우측 — 여기만 스크롤한다. 항목이 늘어나도 레이아웃이 안 깨진다 */}
          <div className="min-h-0 overflow-y-auto lg:pr-4">
            {groups.map((g) => (
              <section key={g.id} className="pb-10">
                {/* 그룹 헤더는 스크롤 컨테이너 상단에 붙어 따라온다 — 목록이 길어져도 지금 어느 스택을 보는지 유지된다.
                    (컨테이너 자체가 스크롤 박스라 body의 overflow-x:hidden과 무관하게 sticky가 정상 동작한다) */}
                <div className="sticky top-0 z-10 flex items-baseline justify-between gap-4 border-b-2 border-ink bg-card pb-2 pt-3">
                  <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{g.label}</h3>
                  <span className="index-num">{String(g.items.length).padStart(2, '0')} ITEMS</span>
                </div>

                {/* key 항목은 좌측 괘선과 글자 크기·굵기로만 구분한다 — 틴트 박스까지 쓰면 과했다 */}
                <ul className="mt-2">
                  {g.items.map((item) => (
                    <li
                      key={item.name}
                      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line/40 pl-4 transition-colors sm:pl-5 ${
                        item.key ? 'border-l border-ink py-3' : 'py-2.5'
                      }`}
                    >
                      <span
                        className={
                          item.key
                            ? 'text-lg font-semibold leading-tight tracking-tight text-ink sm:text-xl'
                            : 'text-sm text-muted sm:text-base'
                        }
                      >
                        {item.name}
                      </span>
                      {item.detail && <span className="font-mono text-xs text-faint sm:text-sm">{item.detail}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
