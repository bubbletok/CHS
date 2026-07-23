const COLUMNS = [
  {
    key: 'unreal',
    label: 'UNREAL 5',
    color: 'text-unreal',
    border: 'border-unreal/40',
    dot: 'bg-unreal',
    items: [
      'Blueprint + C++',
      'AI — Behavior Tree · Black Board · AI Perception',
      '플레이어 시스템 설계',
      '애니메이션 — Motion Warping · Animation Notify · IK Retargeter',
      '네트워킹 — Replication · RPC · OnRep',
      'Gameplay Ability System (GAS)',
      'UMG',
    ],
  },
  {
    key: 'unity',
    label: 'UNITY',
    color: 'text-unity',
    border: 'border-unity/40',
    dot: 'bg-unity',
    items: [
      '게임플레이 / UI 프로그래밍',
      'Netcode for GameObjects 멀티플레이',
      'Job System / Compute Shader',
      'Addressables',
      '에디터 툴 커스터마이징',
      'Unity Test Framework',
    ],
  },
]

const FAMILIAR = [
  'DevOps & Version Control — Git Flow, Gitea/GitLab, Jenkins CI/CD, Sentry',
  'Python — Object Detection, Deep Reinforcement Learning, 3D Reconstruction',
  'AI — DQN, LLM 멀티 에이전트 (LangChain / FastAPI)',
]

export default function EngineSkills() {
  return (
    <section id="engine-skills" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="flex items-baseline justify-between mb-6 border-b border-line pb-3">
        <h2 className="font-mono text-sm text-muted tracking-widest">ENGINE CAPABILITY</h2>
        <span className="font-mono text-xs text-muted">loaded modules</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {COLUMNS.map((col) => (
          <div key={col.key} className={`border ${col.border} rounded-md bg-panel/60 p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
              <span className={`font-mono text-xs font-medium ${col.color}`}>{col.label}</span>
            </div>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item} className="text-sm text-ink/85 leading-relaxed flex gap-2">
                  <span className="text-muted font-mono">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-3 border border-line rounded-md bg-panel/40 p-5">
        <p className="font-mono text-xs text-muted mb-3">// familiar</p>
        <ul className="space-y-1.5">
          {FAMILIAR.map((item) => (
            <li key={item} className="text-sm text-ink/70 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
