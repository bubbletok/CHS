// "What I have done" — 세부 서술은 프로젝트 상세와 경력기술서에서 다룬다.
// 여기서는 지표와 핵심 키워드만 남긴다.

export const work = [
  {
    tag: 'PERF',
    accent: 'blue',
    label: '성능 최적화',
    metric: '수십 KB ~ 수 MB',
    metricAfter: '0',
    metricNote: '프로파일링 기반 최적화',
    keywords: [
      'GC 할당 최적화',
      'Unity Profiler',
      '다중 카메라 렌더링',
      'SubmitRenderRequest',
      'IJob / IJobParallelFor',
      '배치 처리',
    ],
  },
  {
    tag: 'ARCH',
    accent: 'green',
    label: '아키텍처 설계',
    metric: '상속',
    metricAfter: '합성',
    metricNote: 'SOLID 기반 리팩토링',
    keywords: [
      'SOLID',
      '인터페이스 분리',
      '오브젝트 풀링',
      'MVP / MVVM',
      '이벤트 기반 상태 관리',
      '재사용 가능한 구조',
    ],
  },
  {
    tag: 'INFRA',
    accent: 'orange',
    label: '인프라 구축',
    metric: '반복 작업',
    metricAfter: '90% 단축',
    metricNote: '빌드·배포 / 협업 소요 절감',
    keywords: [
      'Docker',
      'Git Flow',
      'Jenkins CI/CD',
      'GitLab CI/CD',
      'Git-SVN 하이브리드',
      '빌드·배포 자동화',
    ],
  },
]
