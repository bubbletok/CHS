// 최신순으로 둔다 — 렌더는 정렬하지 않고 이 순서를 그대로 쓴다.
// 같은 회사 · 겹치는 기간의 포지션은 하나의 회사 블록 안에 roles로 묶는다 (예: 정규직 근무와 동시 진행한 사내 인프라 구축).

export const experience = [
  {
    company: 'MetaMotionX Inc.',
    period: '2025.09 – 현재',
    roles: [
      {
        role: '정규직 · 클라이언트 프로그래머',
        period: '2025.10 – 현재',
        summary: '카메라 렌더링 최적화 · 무기 시스템 아키텍처 · 멀티스레드 처리 등을 담당하며 클라이언트 개발 전 영역을 주도',
        stack: ['Unity', 'Unreal 5', 'C++', 'Job System', 'Netcode for GameObjects'],
        points: [
          '카메라 8대 개별 렌더링을 화각 104도 4대 + 쉐이더 블렌딩 재배치, 비동기 렌더링·센서별 스케줄링으로 전환해 FPS 20~30 개선, 라이다 PCD Burst 병렬화로 추가 10 개선',
          '발사기 · 발사체 · 무기 책임을 분리한 인터페이스 기반 무기 시스템 아키텍처로 재설계, 오브젝트 풀링 적용',
          'IJob / IJobParallelFor 기반 물리 연산 병렬화 및 비동기 스레드 분리',
        ],
      },
      {
        role: '사내 개발 인프라 구축 · DevOps 1인 단독',
        period: '2025.09 – 2026.06',
        summary: '형상 관리부터 CI/CD까지 개발 인프라를 단독으로 설계 · 구축',
        stack: ['Jenkins', 'Docker', 'GitLab', 'Git-SVN'],
        points: [
          'Jenkins CI/CD 파이프라인 구축 — 빌드~배포~알림 전체 소요 13~15분 → 7~8분',
          'VisualSVN → Gitea → GitLab 순으로 전환, Docker Compose로 직접 호스팅하며 Git Flow 브랜치 전략 도입',
          'Git-SVN 하이브리드 구조로 3D 리소스 협업 체계 구축, 협업 소요 시간 약 90% 절감',
        ],
      },
    ],
  },
  {
    company: 'MetaMotionX Inc.',
    period: '2024.09 – 2025.09',
    roles: [
      {
        role: '계약직 · 클라이언트 프로그래머',
        period: '2024.09 – 2025.09',
        summary: '실시간 멀티 에이전트 시뮬레이터의 경로 계획 · UI 아키텍처 · 센서 시뮬레이션 개발',
        stack: ['Unity', 'Unreal 5', 'C++', 'DOTween'],
        points: [
          'Reeds-Shepp Curve 기반 A* 알고리즘으로 차량 경로 계획 구현',
          'MVP 패턴과 이벤트 기반 상태 관리로 UI 아키텍처 설계, DOTween으로 트랜지션 구현',
          'Unreal 5 AsyncTask 기반 비동기 LiDAR 시뮬레이션 및 포인트클라우드 처리 구현',
        ],
      },
    ],
  },
  {
    company: 'FunctionBay Inc.',
    period: '2024.07 – 2024.08',
    roles: [
      {
        role: '인턴 · Unity 클라이언트',
        period: '2024.07 – 2024.08',
        summary: 'Netcode for GameObjects 기반 실시간 시뮬레이터의 클라이언트 · UI 개발',
        stack: ['Unity', 'Netcode for GameObjects', 'Doxygen'],
        points: [
          '동적 드롭다운 메뉴 등 커스텀 UI 컴포넌트 설계 및 구현',
          '소프트웨어 설계서(SDD) 작성',
          'Doxygen XML 출력을 Draw.io 다이어그램으로 변환하는 문서화 자동화 툴 개발',
        ],
      },
    ],
  },
]
