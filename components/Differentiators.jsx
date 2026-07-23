const ITEMS = [
  {
    tag: 'PERF',
    color: 'text-unity',
    border: 'border-unity/40',
    label: '성능 최적화',
    value: '8~10MB → 수십 KB',
    detail:
      'LiDAR 포인트클라우드를 메시지로 변환하며 발생하던 GC Alloc을 ToArray() 대신 NativeArray.Reinterpret + CopyTo로 줄여 GC 스파이크로 인한 프레임 드랍을 제거했다. 다중 카메라 렌더링 병목은 DX12의 카메라별 RenderGraph · 리소스 배리어 비용까지 벤치마크로 규명해 DX11 전환을 결정했다.',
  },
  {
    tag: 'ARCH',
    color: 'text-unreal',
    border: 'border-unreal/40',
    label: '구조 설계',
    value: '상속 → 합성',
    detail:
      'SOLID 원칙을 기반으로 리팩토링해 각 클래스가 단일 책임만 갖도록 정리했다. IImpactable · IExplosive · IExpirable · IManeuver 인터페이스로 충돌 · 폭발 · 수명 · 기동 책임을 분리하고 오브젝트 풀로 관리해, 기능 개발과 UI 개발이 충돌 없이 병렬로 진행되도록 했다.',
  },
  {
    tag: 'DEVOPS',
    color: 'text-amber',
    border: 'border-amber/40',
    label: 'DevOps 단독 구축',
    value: '80% / 90%',
    detail:
      'Docker 기반 Gitea 로컬 호스팅, Git Flow 브랜치 전략, Jenkins CI/CD 파이프라인, Git-SVN 하이브리드 협업 구조를 1인으로 설계 · 구축했다. 빌드 · 배포 반복 작업 약 80%, 개발-디자인 협업 소요 시간 약 90%를 절감했다.',
  },
]

export default function Differentiators() {
  return (
    <section id="differentiators" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-line pb-3">
        <h2 className="font-mono text-sm text-muted tracking-widest">DIFFERENTIATORS</h2>
        <span className="font-mono text-xs text-muted">3 markers</span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {ITEMS.map((item) => (
          <div
            key={item.tag}
            className={`border ${item.border} rounded-md bg-panel/60 p-5 flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-mono text-xs font-medium ${item.color}`}>{item.tag}</span>
              <span className="font-mono text-xs text-muted">{item.label}</span>
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-ink leading-tight">
              {item.value}
            </p>
            <p className="text-sm text-ink/80 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
