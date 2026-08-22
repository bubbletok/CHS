---
id: company-a
engine: unity
status: company
title: Project A
tab: Project A
subtitle: 지상 시뮬레이터 개발
meta:
  기간: 11개월
  멤버: 5명
  역할: 무기 발사 로직 및 상태 UI
  기술 스택: Unity / C#
stack:
  - Unity
  - C#
  - Netcode for GameObjects
  - GC 할당 최적화
  - Unity Profiler
  - LINQ 제거
  - A* Pathfinding
  - Reeds-Shepp Curve
links: {}
---

## 요약
지상 무기체계 시뮬레이터. 실제 무기체계와 유사한 조작감을 재현해야 하는 프로젝트로, 5명 규모 팀에서 클라이언트 개발을 맡아 진행했다.

*보안 이슈로 스크린샷은 첨부하지 못했습니다.*

## 역할 — 무기 발사 로직 및 상태 UI
Unity Netcode 기반 서버-클라이언트 구조 위에서, 전투 모듈의 총기·미사일 발사 로직을 구현했고 `MVP` 패턴으로 객체 상태를 표시하는 UI도 함께 만들었다. 차량 이동에는 A* 기반 경로 탐색을 적용했다.

## 문제점: 전투 모듈의 LINQ 형변환으로 인한 GC 할당 스파이크
실시간으로 매끄러운 프레임이 중요한 시뮬레이터인데, 플레이 중 프레임마다 GC 할당량이 수십 KB~수 MB 단위로 불규칙하게 튀면서 프레임이 끊기는 증상이 있었다. Unity Profiler로 뜯어보니 전투 모듈은 매 프레임 `LINQ`로 형변환을 처리하고, 적 탐지 모듈은 탐지된 적 객체를 매 프레임 `LINQ`로 순회하면서 GC 할당이 크게 튀는 게 원인이었다.

`LINQ` 사용을 걷어내고 직접 순회·캐스팅하는 방식으로 바꿔, 전투 모듈은 프레임당 GC 할당을 **5,000~10,000바이트에서 288~2,256바이트**로 줄였다. 적 탐지 모듈도 처음엔 같은 방식으로 직접 순회하도록 바꿨는데, 이후 `HashSet` 자료구조를 쓰면 `O(1)` 시간에 탐색할 수 있다는 걸 파악해 이를 적용해 GC 할당을 **2,208바이트에서 0**으로 줄였다.

## 문제점: 차량 동역학 모델과 맞지 않던 A* 경로
객체 경로 생성에 [A* Pro 애셋](https://assetstore.unity.com/packages/tools/behavior-ai/a-pathfinding-project-pro-87744?srsltid=AfmBOoqAPoqOLefIf6GoueJYXq5c_u451pr7OZYWfZ2nz3T1h-lzos1U)을 쓰려 했는데, 이미 구현돼 있던 차량 동역학 모델 기반 이동 방식에 바로 적용하기 어려웠다. 일반 A* 경로는 차량의 회전반경을 고려하지 않아, 실제로는 나올 수 없는 급격한 방향 전환이 경로에 섞여 있었다.

차량용 경로 생성 방식을 리서치하다 `Reeds-Shepp`와 `Hybrid A*` 알고리즘을 함께 쓴 차량 경로 생성 [오픈소스 코드](https://github.com/Habrador/Self-driving-vehicle)를 발견했고, 여기서 `Reeds-Shepp` 부분만 가져와 후진 경로에 적용해 차량의 회전반경을 고려한 경로가 나오도록 만들었다.

## 문제점: MVP 패턴을 정석대로 적용했다가 겪은 과설계
객체 상태 표시 UI에 `MVP` 패턴을 "정석대로" 적용했다. 그런데 `Model`/`View`/`Presenter` 클래스만 과도하게 늘어났고, 정작 기대했던 재사용성 이득은 없었다.

패턴을 그대로 가져다 쓰는 게 능사가 아니라는 걸 깨달았다. "상황에 맞게 기존 스크립트를 부분적으로 `Model`로 분리하는 정도로도 충분하다"는 판단 기준을 세우고, 이후 `Reactive Property` 기반으로 상태 패널을 다시 리팩토링해 개선했다.
