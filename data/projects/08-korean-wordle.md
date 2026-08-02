---
id: korean-wordle
engine: unity
status: playable
title: 한글 워들
tab: 한글 워들
subtitle: 한국어 Wordle · Google Play 출시
pitch: 1인 개발 | 6개월 | 누적 다운로드 100+
badge: Google Play
meta:
  역할: 1인 개발 (지속 개발 중)
  기간: 6개월
  기술 스택: Unity / C#, Android, Unity Test Framework
stack:
  - Unity
  - C#
  - Android
  - Unity Test Framework
  - Assembly Definition
links:
  play: https://play.google.com/store/apps/details?id=com.CHS.Korean_Wordle
---

## 요약
해외 인기 게임 Wordle의 한국어 버전. 영어와 구조적으로 다른 한글의 자모 분리 특성에 맞춰 입력 · 판정 시스템을 처음부터 설계했다.

## 문제점: 5,800개 단어의 런타임 조회 비용
단어를 품사 기준으로 필터링해 런타임에서 즉시 조회 가능한 구조로 전처리하는 파이프라인을 구축해 조회 비용을 최소화했다.

## 문제점: 한글 입력 · 판정 로직의 결함
Unity Test Framework로 한글 입력 · 판정 로직의 테스트 케이스를 자동화해 결함을 줄였고, Assembly Definition으로 코드를 모듈화해 컴파일 시간을 단축했다.

## 문제점: 씬 흐름과 폴더 구조 정리
메인 화면 → 스테이지 선택 → 게임플레이로 이어지는 씬 흐름과 폴더 구조를 전체적으로 정리했다.
