// 원본: docs/PORTFOLIO_CONTENT.md §3 경력(Experience). 최신순으로 둔다 — 렌더는 정렬하지 않고 이 순서를 그대로 쓴다.
// 같은 회사 · 겹치는 기간의 포지션은 하나의 회사 블록 안에 roles로 묶는다 (예: 정규직 근무와 동시 진행한 사내 인프라 구축).

export const experience = [
  {
    company: 'MetaMotionX Inc.',
    period: '2025.09 – 현재',
    roles: [
      {
        role: '정규직 · 클라이언트 프로그래머',
        period: '2025.10 – 현재',
        summary: '센서 시뮬레이션 · 전투 로직 · 성능 최적화를 담당하며 아키텍처 리팩토링을 주도',
        stack: ['Unity', 'Unreal 5', 'C++', 'Job System'],
        points: [
          'Render Texture 기반 스트리밍으로 센서 시뮬레이션 구현',
          '발사기 · 발사체 · 무장의 책임을 분리해 인터페이스 기반으로 전투/투사체 로직 리팩토링, 오브젝트 풀링 적용',
          '다중 카메라 렌더링 최적화 — LayerMask/LOD/컴포넌트 캐싱, 그래픽 API 벤치마크로 DX11 전환 결정',
          'Unity Profiler 병목 분석 및 GC 할당 최적화 (LiDAR 포인트클라우드 8~10MB → 수십 KB)',
          'IJob / IJobParallelFor와 SpherecastCommand 배치 처리로 물리 계산의 메인 스레드 부하 분산',
        ],
      },
      {
        role: '사내 개발 인프라 구축 · DevOps 1인 단독',
        period: '2025.09 – 2026.06',
        summary: '형상 관리부터 CI/CD까지 개발 인프라를 단독으로 설계 · 구축 — 빌드 · 배포 반복 작업 약 80%, 협업 소요 시간 약 90% 절감',
        stack: ['Jenkins', 'Docker', 'Gitea', 'Git-SVN'],
        points: [
          'Docker Compose 기반 Gitea 로컬 호스팅, 단일 브랜치 → Git Flow 10개+ 브랜치 구조로 전환',
          'Jenkins CI/CD 파이프라인 구축 — 커밋 → 빌드 → 배포 전 과정 자동화',
          'Git-SVN 하이브리드 구조로 3D 디자이너팀과의 리소스 협업 체계 구축',
          'Unity Test Framework 시나리오 테스트 자동화, Unity Accelerator 캐시 서버 구축',
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
          'MVP/MVVM 패턴과 이벤트 기반 상태 관리로 UI 아키텍처 설계, DOTween으로 트랜지션 구현',
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
