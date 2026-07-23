// 여기에 본인 프로젝트를 채워 넣으세요.
// engine: "unity" | "unreal"
// status: "playable" | "video" | "wip"
// links: 있는 것만 채우면 됩니다 (없으면 빈 문자열로 두거나 키를 지우세요)

export const projects = [
  {
    id: 'build-001',
    engine: 'unreal',
    status: 'video',
    title: 'Fallen Knight',
    role: '몬스터 AI 프로그래밍 (BT · BB · AI Perception)',
    summary:
      '한국IT직업전문학교 X 경희대학교 연합 3인칭 소울라이크 액션 게임, 2023 G-STAR 전시작. 검증된 전투 프레임워크(Tempest 플러그인) 위에서 Behavior Tree · Black Board · AI Perception 기반으로 해골 기사·궁수 몬스터의 State/Ability 구조를 설계·구현했다.',
    problem:
      '몬스터 메시와 구매 애니메이션의 스켈레톤 구조가 달라 그대로 적용하면 관절이 뒤틀리는 문제를, IK Rig로 본 체인을 정의하고 IK Retargeter로 소스-타겟 매핑을 구성해 해결했다. 궁수의 몸/활 애니메이션이 별도 파일이라 시위를 당기는 타이밍이 어긋나던 문제는 Animation Notify로 두 애니메이션의 트리거 시점을 맞춰 해결했다. 뒷걸음질 모션은 루트 모션이 없어 Set Actor Location으로 직접 이동시켰는데 콜리전을 무시하고 벽을 통과하는 문제가 생겨, 매 Tick마다 이동 목표에 Overlap 감지를 선행하는 조건을 추가했다(이후 Sweep 옵션이나 AddMovementInput이 더 구조적인 대안이었다는 걸 회고했다). 외부 플러그인의 상태 구조에 의존하다 보니 예상 밖의 동작을 디버깅하기 어려운 경우도 있었고, 다음 프로젝트에서는 핵심 전투 상태를 직접 설계해 구조를 완전히 파악하는 방향을 취하고 싶다는 결론을 얻었다.',
    stack: ['Unreal 5', 'Blueprint', 'Behavior Tree / Black Board', 'AI Perception', 'IK Retargeter', 'Animation Notify'],
    images: [
      '/Projects/FallenKnight/Fallen_Knight_Poster_.png',
      '/Projects/FallenKnight/FallenKnight_Ingame1.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame2.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame3.jpg',
      '/Projects/FallenKnight/FallenKnight_Ingame4.jpg',
    ],
    links: {
      video: '',
    },
  },
  {
    id: 'build-002',
    engine: 'unreal',
    status: 'video',
    title: 'Dead Line',
    role: '클라이언트 / 플레이어',
    summary:
      '한국IT직업전문학교 X 경희대학교 연합 프로젝트로 2024 G-STAR에 출품했다. 겨울심화 프로젝트 발표회 1등, 여름 프로젝트 발표회 2등, SW중심대학 연합 SW 페스티벌 창의상을 수상하며 완성도를 대외적으로 검증받았다.',
    problem:
      '팀 프로젝트를 끝까지 완성해 외부 전시·경진대회까지 이어간 사례다. 플레이어 시스템의 구체적인 기술 문제·해결 과정은 별도로 정리할 예정이다.',
    stack: ['Unreal 5', 'C++', 'Animation'],
    links: {
      video: '',
    },
  },
  {
    id: 'build-003',
    engine: 'unity',
    status: 'playable',
    title: '한글 워들',
    role: '1인 개발 (6개월, 지속 개발 중)',
    summary:
      '해외 인기 게임 Wordle의 한국어 버전. 영어와 구조적으로 다른 한글의 자모 분리 특성에 맞춘 입력·판정 시스템을 처음부터 설계했다. Google Play 출시, 누적 다운로드 100+.',
    problem:
      '5,800개 이상의 단어를 품사 기준으로 필터링해 런타임에서 즉시 조회 가능한 구조로 전처리하는 파이프라인을 구축해 조회 비용을 최소화했다. Unity Test Framework로 한글 입력·판정 로직의 테스트 케이스를 자동화해 결함을 줄였고, Assembly Definition으로 코드를 모듈화해 컴파일 시간을 단축했다. 메인 화면 → 스테이지 선택 → 게임플레이로 이어지는 씬 흐름과 폴더 구조를 전체적으로 정리했다.',
    stack: ['Unity', 'C#', 'Android', 'Unity Test Framework'],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.CHS.Korean_Wordle',
    },
  },
  {
    id: 'build-004',
    engine: 'unreal',
    status: 'wip',
    title: 'Project ZT',
    role: '기획 / 프로그래밍',
    summary: '진행 중인 프로젝트도 넣을 수 있습니다. 상태를 WIP으로 표시하세요.',
    problem: '지금까지 만든 부분과 남은 과제를 간단히 적으세요.',
    stack: ['Unreal 5', 'C++', 'GAS'],
    links: {
      play: '',
      github: '',
      video: '',
    },
  },
  {
    id: 'build-05',
    engine: 'unity',
    status: 'video',
    title: 'Smoothed Particle Hydrodynamics in Unity',
    role: '1인 개발',
    summary: 'SPH 유체 시뮬레이션',
    problem: '지금까지 만든 부분과 남은 과제를 간단히 적으세요.',
    stack: ['Unity', 'ComputeShader'],
    links: {
      play: '',
      github: '',
      video: '',
    }
  },
  {
    id: 'build-06',
    engine: 'unity',
    status: 'video',
    title: '3D GPU A*',
    role: '1인 개발',
    summary: 'A* in 3D Environment with GPU Computation',
    problem: '지금까지 만든 부분과 남은 과제를 간단히 적으세요.',
    stack: ['Unity', 'ComputeShader'],
    links: {
      play: '',
      github: '',
      video: '',
    }
  }
]
