// 프로젝트는 엔진(unreal / unity)으로 1차 분류되고, 각 엔진 안에서 탭으로 선택된다.
//
// poster  : 상세 패널 왼쪽에 크게 걸리는 대표 이미지 (없으면 플레이스홀더)
// shots   : 오른쪽 컬럼에 세로로 쌓이는 인게임 스크린샷
// video   : 임베드 URL (YouTube 등). 있으면 poster 자리에 플레이어가 먼저 온다
// problem : [{ title, body, images }] — 없으면 해당 블록이 통째로 생략된다
//           images 필드는 사진을 넣을 항목에만 붙인다.
//             · 필드 없음      → 아무것도 표시하지 않음
//             · images: []     → "이미지 자리" 자리표시자 (나중에 채울 자리 예약)
//             · images: ['/…'] → 2열 그리드로 표시, 클릭 시 확대

export const projects = [
  // ── UNREAL ──────────────────────────────────────────────────────────
  {
    id: 'fallen-knight',
    engine: 'unreal',
    status: 'video',
    title: 'Fallen Knight',
    tab: 'Fallen Knight',
    subtitle: '3인칭 소울라이크 액션 게임',
    pitch: '소울라이크 | 한국IT직업전문학교 X 경희대학교 | 2023 G-STAR 전시작',
    badge: '2023 G-STAR',
    meta: [
      { k: '기간', v: '2023.09 ~ 2023.11' },
      { k: '멤버', v: '7명 (기획 3, 프로그래밍 3)' },
      { k: '역할', v: '몬스터 AI' },
      { k: '기술 스택', v: 'Unreal 5.0 / Blueprint, Git, Azure DevOps' },
    ],
    summary:
      '팀원 모두가 언리얼을 처음 다루는 3개월짜리 일정이었다. 전투 프레임워크를 직접 만드는 대신 검증된 Tempest 플러그인을 도입해 AI 행동 로직에 집중했고, Gameplay Tag 기반 State / Ability 구조 위에서 Behavior Tree · Black Board · AI Perception으로 해골 기사 · 해골 궁수의 행동을 구현했다.',
    role: {
      title: '역할 — 몬스터 AI',
      body: 'Tempest 외부 플러그인 + Behavior Tree(BT) & Black Board(BB) + AI Perception 기반으로 해골 기사, 해골 궁수 몬스터를 구현했다. 패트롤과 타겟 추적 두 상태를 Selector로 분기하고, 각 상태 내부는 Sequence로 순차 처리했다.',
    },
    problem: [
      {
        title: '스켈레톤 불일치로 관절이 뒤틀리던 문제',
        body: '몬스터 메시와 구매한 애니메이션의 스켈레톤 구조가 달라 그대로 적용하면 관절이 뒤틀렸다. IK Rig로 본 체인을 정의하고 IK Retargeter로 소스-타겟 매핑을 구성해 해결했다.',
      },
      {
        title: '분리된 애니메이션의 타이밍 동기화',
        body: '궁수의 몸 / 활 애니메이션이 별도 파일이라 시위를 당기는 타이밍이 어긋났다. Animation Notify로 두 애니메이션의 트리거 시점을 맞춰 해결했다.',
      },
      {
        title: '루트 모션 없는 이동의 콜리전 무시',
        body: '뒷걸음질 모션은 루트 모션이 없어 Set Actor Location으로 직접 이동시켰는데, 콜리전을 무시하고 벽을 통과했다. 매 Tick 이동 목표에 Overlap 감지를 선행하는 조건을 추가해 막았다. 이후 Sweep 옵션이나 AddMovementInput이 더 구조적인 대안이었다는 것을 회고했다.',
      },
      {
        title: '외부 플러그인 의존의 한계',
        body: '플러그인의 상태 구조에 의존하다 보니 예상 밖의 동작을 디버깅하기 어려운 경우가 있었다. 다음 프로젝트에서는 핵심 전투 상태를 직접 설계해 구조를 완전히 파악하는 방향을 택했다.',
      },
    ],
    stack: [
      'Unreal 5.0',
      'Blueprint',
      'Behavior Tree / Black Board',
      'AI Perception',
      'IK Retargeter',
      'Animation Notify',
      'Azure DevOps',
    ],
    poster: '/Projects/FallenKnight/Fallen_Knight_Poster_.png',
    shots: [
      '/Projects/FallenKnight/FallenKnight_Ingame1.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame2.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame3.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame4.jpg',
    ],
    links: {},
  },
  {
    id: 'dead-line',
    engine: 'unreal',
    status: 'video',
    title: 'Dead Line',
    tab: 'Dead Line',
    subtitle: '팀 프로젝트 · 클라이언트 / 플레이어',
    pitch: '한국IT직업전문학교 X 경희대학교 | 2024 G-STAR 출품작',
    badge: '2024 G-STAR',
    meta: [
      { k: '역할', v: '클라이언트 / 플레이어' },
      { k: '기술 스택', v: 'Unreal 5 / C++, Animation' },
    ],
    summary:
      '2024 G-STAR에 출품한 연합 팀 프로젝트. 겨울심화 프로젝트 발표회 1등, 여름 프로젝트 발표회 2등, SW중심대학 연합 SW 페스티벌 창의상을 수상하며 완성도를 대외적으로 검증받았다.',
    awards: [
      '2024.02 · 겨울심화 프로젝트 발표회 1등 (KOREA IT)',
      '2024.08 · 여름 프로젝트 발표회 2등 (KOREA IT)',
      '2024 · SW중심대학 연합 SW 페스티벌 창의상',
    ],
    stack: ['Unreal 5', 'C++', 'Animation'],
    links: {},
  },
  {
    id: 'project-zt',
    engine: 'unreal',
    status: 'wip',
    title: 'Project ZT',
    tab: 'Project ZT',
    subtitle: '개인 프로젝트 · 진행 중',
    meta: [
      { k: '역할', v: '기획 / 프로그래밍' },
      { k: '기술 스택', v: 'Unreal 5 / C++, GAS' },
    ],
    summary: 'Unreal 5 · Gameplay Ability System 기반으로 진행 중인 개인 프로젝트.',
    stack: ['Unreal 5', 'C++', 'GAS'],
    links: {},
  },

  // ── UNITY ───────────────────────────────────────────────────────────
  {
    id: 'korean-wordle',
    engine: 'unity',
    status: 'playable',
    title: '한글 워들',
    tab: '한글 워들',
    subtitle: '한국어 Wordle · Google Play 출시',
    pitch: '1인 개발 | 6개월 | 누적 다운로드 100+',
    badge: 'Google Play',
    meta: [
      { k: '역할', v: '1인 개발 (지속 개발 중)' },
      { k: '기간', v: '6개월' },
      { k: '기술 스택', v: 'Unity / C#, Android, Unity Test Framework' },
    ],
    summary:
      '해외 인기 게임 Wordle의 한국어 버전. 영어와 구조적으로 다른 한글의 자모 분리 특성에 맞춰 입력 · 판정 시스템을 처음부터 설계했다.',
    problem: [
      {
        title: '5,800개 단어의 런타임 조회 비용',
        body: '단어를 품사 기준으로 필터링해 런타임에서 즉시 조회 가능한 구조로 전처리하는 파이프라인을 구축해 조회 비용을 최소화했다.',
      },
      {
        title: '한글 입력 · 판정 로직의 결함',
        body: 'Unity Test Framework로 한글 입력 · 판정 로직의 테스트 케이스를 자동화해 결함을 줄였고, Assembly Definition으로 코드를 모듈화해 컴파일 시간을 단축했다.',
      },
      {
        title: '씬 흐름과 폴더 구조 정리',
        body: '메인 화면 → 스테이지 선택 → 게임플레이로 이어지는 씬 흐름과 폴더 구조를 전체적으로 정리했다.',
      },
    ],
    stack: ['Unity', 'C#', 'Android', 'Unity Test Framework', 'Assembly Definition'],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.CHS.Korean_Wordle',
    },
  },
  {
    id: 'sph',
    engine: 'unity',
    status: 'video',
    title: 'Smoothed Particle Hydrodynamics',
    tab: 'SPH 유체',
    subtitle: 'GPU 유체 시뮬레이션',
    meta: [
      { k: '역할', v: '1인 개발' },
      { k: '기술 스택', v: 'Unity / Compute Shader' },
    ],
    summary: 'Compute Shader 기반 SPH 유체 시뮬레이션을 Unity에서 구현했다.',
    stack: ['Unity', 'Compute Shader'],
    links: {},
  },
  {
    id: 'gpu-astar',
    engine: 'unity',
    status: 'video',
    title: '3D GPU A*',
    tab: '3D GPU A*',
    subtitle: 'GPU 병렬 경로 탐색',
    meta: [
      { k: '역할', v: '1인 개발' },
      { k: '기술 스택', v: 'Unity / Compute Shader' },
    ],
    summary: '3D 환경에서의 A* 경로 탐색을 GPU 연산으로 병렬화해 구현했다.',
    stack: ['Unity', 'Compute Shader'],
    links: {},
  },
]

/** 1차 분류 탭 */
export const engineTabs = [
  { key: 'unreal', label: 'UNREAL', accent: 'red' },
  { key: 'unity', label: 'UNITY', accent: 'blue' },
]
