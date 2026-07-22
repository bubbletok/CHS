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
    role: '클라이언트 / 적',
    summary:
      '한 줄 소개: 어떤 게임이고, 무엇을 담당했는지 핵심만 적으세요.',
    problem:
      '겪었던 기술적 문제와 그걸 어떻게 풀었는지 2~4문장으로 설명하세요. 채용 담당자가 가장 유심히 보는 부분입니다.',
    stack: ['Unreal 5', 'Blueprint', 'Behaviour Tree'],
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
    summary: '한 줄 소개를 적으세요.',
    problem:
      '언리얼은 WebGL 데모가 어려우니, 영상과 함께 어떤 시스템을 만들었는지 구체적으로 서술하세요.',
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
    role: '1인 개발',
    summary: '한 줄 소개를 ',
    problem:
      '언리얼은 WebGL 데모가 어려우니, 영상과 함께 어떤 시스템을 만들었는지 구체적으로 서술하세요.',
    stack: ['Unity', 'C#', 'Android'],
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
