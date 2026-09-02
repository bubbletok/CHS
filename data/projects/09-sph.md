---
id: sph
engine: unity
status: video
title: Smoothed Particle Hydrodynamics
tab: SPH 유체
subtitle: GPU 유체 시뮬레이션
meta:
  역할: 1인 개발
  기술 스택: Unity / Compute Shader
stack:
  - Unity
  - Compute Shader
  - GPU Instancing
  - Spatial Hash Grid
poster: /Projects/SPH/SPH.png
links:
  video: https://youtu.be/JFy1vMpi5I0
  github: https://github.com/bubbletok/SPH_Unity
---

## 요약
전공 수업 학기 프로젝트로 시작한 개인 프로젝트. Python 프로토타입에서 성능 한계를 확인하고 Unity로 옮겨 CPU 기반 구현의 `O(n²)` 연산 병목을 `Compute Shader` 기반 GPU 연산으로 해결했다. 지금은 `Spatial Hash Grid`와 GPU 기반 `Radix Sort`로 이웃 탐색을 최적화하고 있다.

## 역할 — 1인 개발
Unity `Compute Shader`로 파티클 간 밀도·압력·힘 계산을 병렬화하고 `GPU Instancing`으로 수천 개 파티클을 렌더링했다. 이웃 탐색 속도를 더 끌어올리려고 `Spatial Hash Grid` 기반 최적화를 진행 중이다(WIP).

## 문제점: Python 프로토타입의 성능 한계
전공 수업 학기 프로젝트 주제로 SPH(Smoothed Particle Hydrodynamics)를 선택해 Python `Pygame`으로 논문 기반 밀도·압력·힘·점성·외력 계산을 구현했다. 그러나 결과물은 점성이 지나치게 강한 슬라임에 가까웠다. Python의 성능 한계로 파티클 수도 늘리기 어려워 Unity로 다시 구현하기로 했다.

## 문제점: CPU 기반 구현의 O(n²) 연산 병목
Unity에서 파티클을 오브젝트로 인스턴스화해 밀도·압력·힘을 계산했는데 파티클 수가 **1만~5만 개**로 늘자 오브젝트 인스턴스화 비용과 파티클 전수 비교(`O(n²)`) 연산으로 성능이 급격히 떨어졌다. 힘·압력·위치 계산을 GPU로 옮기고 `GPU Instancing`으로 렌더링을 분리해 해결했다.

## 문제점: 파티클이 늘어날수록 느려지는 이웃 탐색
GPU로 연산을 옮긴 뒤에도 파티클 하나마다 주변 파티클을 전부 훑는 이웃 탐색 자체가 규모가 커질수록 병목이 됐다. `Spatial Hash Grid`로 탐색 범위를 주변 셀로 좁히고 GPU 기반 `Radix Sort`로 정렬해 그리드 조회를 가속하는 작업을 진행 중이다.
