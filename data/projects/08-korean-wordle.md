---
id: korean-wordle
engine: unity
status: playable
title: 한글 워들
tab: 한글 워들
subtitle: 한국어 Wordle · Google Play 출시
pitch: 1인 개발 | 8개월 | 누적 다운로드 200+
badge: Google Play
meta:
  역할: 1인 개발 (지속 개발 중)
  기간: 8개월
  기술 스택: Unity / C#, Android, Unity Test Framework
stack:
  - Unity
  - C#
  - Android
  - Unity Test Framework
  - Assembly Definition
poster: /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_1.jpg
shots:
  - /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_2.jpg
  - /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_3.jpg
  - /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_4.jpg
  - /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_5.jpg
  - /Projects/KoreanWordle/KW_v1.0.5_InGameScreenshot_6.jpg
links:
  play: https://play.google.com/store/apps/details?id=com.CHS.Korean_Wordle
---

## 요약
해외 인기 게임 Wordle의 한국어 버전. 영어와 구조적으로 다른 한글의 자모 분리 특성에 맞춰 입력 · 판정 시스템을 처음부터 설계했다.

## 역할 — 1인 개발
기획부터 한글 자모 분리 입력 · 판정 로직, 단어 데이터셋 구축, 출시·배포까지 전 과정을 혼자 맡았다. Python 전처리 파이프라인으로 단어 데이터를 가공하고, Unity Test Framework로 회귀 테스트 체계를 갖췄으며, Google Play 정식 출시 이후에도 지속 개발 중이다.

## 문제점: 게임에 맞는 단어 데이터셋 설계
단어 판정을 국립국어원 표준국어대사전 API로 실시간 조회하는 방식으로 시작했지만, 입력 즉시 피드백이 나와야 하는 게임 루프에 네트워크 응답 지연이 끼어들며 흐름이 끊겼다.

이를 없애려 사전 전체(약 35만 단어)를 Python으로 추출해 오프라인 데이터로 번들링했지만, 이번엔 앱 용량·로딩 비용이 커졌고 고어·전문어가 섞여 정답을 맞혀도 납득이 안 되는 단어가 자주 나왔다.

문제는 데이터의 양이 아니라 "게임에 적합한 단어"의 기준이 없었다는 점이었다. Wordle류 게임의 핵심 재미는 "알 것 같은데 헷갈리는" 긴장감이라, 데이터 품질 기준을 용량이 아닌 친숙도로 재정의하고 Wiktionary의 한국어 고빈도 단어 **5,800개**(지속 확장 중)로 데이터셋을 재구축했다. 품사 필터링·글자 수 분류·초성-중성-종성 분리까지 처리하는 Python 전처리 파이프라인을 구축해, 런타임에서는 재계산 없이 즉시 조회 가능한 구조로 직렬화했다.

## 문제점: 한글 입력 · 판정 로직의 결함
한글은 자모가 분리되는 특성 때문에, 입력·판정 로직에서 손으로 다 챙기기 힘든 예외 케이스가 많았다. Unity Test Framework로 예외 케이스들을 테스트로 고정해두고, 코드를 고칠 때마다 회귀 여부를 바로 확인하며 놓쳤던 결함을 하나씩 찾아 수정했다.

## 문제점: 프로젝트가 커지며 늘어난 컴파일 시간
![](/Projects/KoreanWordle/KW_Architecture.png)
기능이 늘면서 스크립트 하나만 고쳐도 프로젝트 전체가 재컴파일돼 개발 루프가 느려졌다.

실제 게임플레이 코드는 KW.Core·KW.Managers·KW.Input·KW.UI·KW.Utility로 나눠 KW.Runtime 어셈블리로 묶고, 테스트·툴용 코드는 KW.Editor로, Unity Test Framework 기반 테스트(EditMode/PlayMode)는 Tests로 각각 별도 Assembly Definition으로 분리했다. Assembly Definition Reference로 참조 관계를 명시해, 코드를 고칠 때 재컴파일 범위를 해당 어셈블리로 좁혔다.

더 이상 쓰지 않는 코드는 .Deprecated 폴더로 격리하고, 네이밍 규칙과 스크립팅 가이드라인을 문서화해 유지보수성을 높였다.

## 문제점: 씬 흐름과 폴더 구조 정리
기능을 하나씩 추가하다 보니 씬 흐름과 폴더 구조가 점점 뒤섞였다. 메인 화면 → 스테이지 선택 → 게임플레이로 이어지는 흐름과 폴더 구조를 전체적으로 다시 정리했다.

## 수상
- Google Play Store 정식 출시 및 서비스 운영
- 누적 다운로드 200회 이상 달성
