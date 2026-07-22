// 여기에 본인 프로젝트를 채워 넣으세요.
// engine: "unity" | "unreal"
// status: "playable" | "video" | "wip"
// links: 있는 것만 채우면 됩니다 (없으면 빈 문자열로 두거나 키를 지우세요)

export const projects = [
  {
    id: 'build-004',
    engine: 'unity',
    status: 'playable',
    title: '프로젝트 이름을 적어주세요',
    role: '게임플레이 프로그래머',
    summary:
      '한 줄 소개: 어떤 게임이고, 무엇을 담당했는지 핵심만 적으세요.',
    problem:
      '겪었던 기술적 문제와 그걸 어떻게 풀었는지 2~4문장으로 설명하세요. 채용 담당자가 가장 유심히 보는 부분입니다.',
    stack: ['C#', 'Unity DOTS', 'Netcode'],
    links: {
      play: 'https://yourname.itch.io/project',
      github: 'https://github.com/yourname/project',
      video: '',
    },
  },
  {
    id: 'build-003',
    engine: 'unreal',
    status: 'video',
    title: '프로젝트 이름을 적어주세요',
    role: 'AI / 게임플레이 프로그래머',
    summary: '한 줄 소개를 적으세요.',
    problem:
      '언리얼은 WebGL 데모가 어려우니, 영상과 함께 어떤 시스템을 만들었는지 구체적으로 서술하세요.',
    stack: ['C++', 'Blueprint', 'Behavior Tree'],
    links: {
      play: '',
      github: 'https://github.com/yourname/project-2',
      video: 'https://youtube.com/watch?v=xxxx',
    },
  },
  {
    id: 'build-002',
    engine: 'unity',
    status: 'wip',
    title: '작업 중인 프로젝트',
    role: '툴 / 엔진 프로그래머',
    summary: '진행 중인 프로젝트도 넣을 수 있습니다. 상태를 WIP으로 표시하세요.',
    problem: '지금까지 만든 부분과 남은 과제를 간단히 적으세요.',
    stack: ['C#', 'Editor Tooling'],
    links: {
      play: '',
      github: 'https://github.com/yourname/project-3',
      video: '',
    },
  },
]
