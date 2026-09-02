// key: true 인 항목은 강조해서 보여준다 (틴트 배경 + 굵은 글씨)

export const engines = [
  {
    key: 'unreal',
    label: 'UNREAL 5',
    accent: 'red',
    items: [
      { name: 'Blueprint + C++', key: true },
      { name: 'AI — Behavior Tree · Black Board · AI Perception', key: true },
      { name: 'Gameplay Ability System (GAS)', key: true },
      { name: '네트워킹 — Replication · RPC · OnRep' },
      { name: '애니메이션 — Motion Warping · Animation Notify · IK Retargeter' },
      { name: '플레이어 시스템 설계' },
      { name: 'UMG' },
    ],
  },
  {
    key: 'unity',
    label: 'UNITY',
    accent: 'blue',
    items: [
      { name: '게임플레이 / UI 프로그래밍', key: true },
      { name: 'Job System / Compute Shader', key: true },
      { name: 'Netcode for GameObjects 멀티플레이', key: true },
      { name: '에디터 툴 커스터마이징' },
      { name: 'Unity Test Framework' },
      { name: 'Addressables' },
    ],
  },
]

export const familiar = [
  {
    label: 'DevOps & Version Control',
    detail: 'Git Flow, Gitea/GitLab, Jenkins CI/CD, Sentry',
  },
  {
    label: 'Python',
    detail: 'Object Detection, Deep Reinforcement Learning, 3D Reconstruction',
  },
  {
    label: 'AI',
    detail: 'DQN, LLM 멀티 에이전트 (LangChain / FastAPI), Claude Code planner/implementer/validator 역할 분리로 AI 구현 속도와 코드 검증 병행',
  },
]
