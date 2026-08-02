---
id: company-a
engine: unity
status: company
title: Project A
tab: Project A
subtitle: 비공개 프로젝트
meta:
  기간: 1년 6개월
  멤버: 5명
  역할: 클라이언트 개발
  기술 스택: Unity / C#
stack:
  - Unity
  - C#
  - GC 할당 최적화
  - Unity Profiler
  - 다중 카메라 렌더링
  - SubmitRenderRequest
  - IJob / IJobParallelFor
  - 배치 처리
links: {}
---

## 요약
상세 소개는 추후 업데이트 예정입니다.

## 문제점: 수십 KB~수 MB 단위로 튀던 프레임 부하
Unity Profiler로 프로파일링해 GC 할당을 최적화하고, 다중 카메라 렌더링을 SubmitRenderRequest 및 모든 카메라의 프레임당 렌더링을 라운드 로빈 스케쥴링으로 분할처리했다. IJob / IJobParallelFor로 무거운 연산을 병렬화해 프레임당 부하를 0에 가깝게 줄였다.
