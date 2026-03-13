# winivBlog

React와 Vite로 만든 블로그 프론트엔드 프로젝트다. 회원가입, 로그인, 게시글 목록/상세/작성/수정/삭제 흐름을 기준으로 화면 구조를 익히는 것이 기본 목적이며, 별도로 운동 분석 데이터를 블로그 글 초안으로 변환하는 스크립트도 함께 포함되어 있다.

## 프로젝트 개요

- 프론트엔드: `app/`
- 라우팅: `react-router-dom`
- 상태 관리: React Context 기반 인증/알림 상태
- API 대상: Weniv CRUD API
- 부가 기능: 스쿼트 분석 JSON을 블로그 포스트 초안으로 생성하는 스크립트

## 주요 기능

- 회원가입 / 로그인
- 토큰 기반 인증 상태 유지
- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 작성 / 수정 / 삭제
- 마이페이지 및 공통 레이아웃 구성
- mock 게시글 업로드 스크립트
- 운동 분석 summary JSON -> 블로그 포스트 초안 생성

## 폴더 구조

```text
.
├─ app/                     # Vite + React 앱
│  ├─ src/
│  │  ├─ api/               # API 요청 래퍼 및 auth/blog API
│  │  ├─ assets/            # 아이콘, 이미지, 전역 스타일
│  │  ├─ components/        # 재사용 UI 컴포넌트
│  │  ├─ contexts/          # Auth, Alert 컨텍스트
│  │  ├─ layouts/           # 메인 레이아웃
│  │  ├─ pages/             # 페이지 단위 컴포넌트
│  │  ├─ routes/            # 라우터 및 경로 상수
│  │  └─ utils/             # 검색, 포스트 ID, 글 생성 유틸
│  └─ scripts/              # mock 게시글 업로드 스크립트
├─ docs/                    # 요구사항, API, 레이아웃, 분석 자료
└─ scripts/                 # 운동 분석/포스트 생성 스크립트
```

## 시작하기

### 요구 사항

- Node.js 20 이상 권장
- npm

### 설치

```bash
cd app
npm install
```

### 개발 서버 실행

```bash
cd app
npm run dev
```

기본 Vite 개발 서버가 실행된다.

### 빌드

```bash
cd app
npm run build
```

### 미리보기

```bash
cd app
npm run preview
```

## 환경 변수

프론트엔드는 기본적으로 아래 API를 사용한다.

- 기본값: `https://dev.wenivops.co.kr/services/fastapi-crud/1`

다른 API를 사용하려면 `app/.env`에 아래 값을 지정하면 된다.

```bash
VITE_API_BASE_URL=https://example.com/services/fastapi-crud/1
```

## API 메모

- API 클라이언트: `app/src/api/client.js`
- 인증 토큰 저장 키: `winivBlog.authTokens`
- 인증이 필요한 요청은 `Authorization: Bearer <token>` 헤더를 자동으로 붙인다.

상세 엔드포인트와 응답 예시는 [docs/API.md](/C:/Users/neighbor/Documents/Code/Github/winivBlog/docs/API.md)에서 확인할 수 있다.

## 개발용 데이터 업로드

샘플 계정과 게시글을 API 서버에 업로드하려면 아래 스크립트를 사용할 수 있다.

```bash
cd app
node scripts/seedMockPosts.mjs
```

옵션 환경 변수:

- `API_BASE_URL`
- `SEED_USERNAME`
- `SEED_PASSWORD`

지정하지 않으면 계정명은 현재 시각 기반 `mockwriter...` 형식으로 생성되고, 비밀번호는 `mock1234`를 사용한다.

## 운동 분석 포스트 생성

저장소에는 백스쿼트 포즈 추정 데이터를 요약하고, 그 결과를 블로그 포스트 초안으로 바꾸는 흐름이 포함되어 있다.

### 1. 요약 JSON 생성

```bash
python scripts/summarize_backsquat.py
```

입력:

- `docs/backSquat/backSquat-20260311013416.json`

출력:

- `docs/backSquat/backSquat-summary.json`

### 2. ChatGPT 요청 payload 생성

```bash
python scripts/build_backsquat_payload.py
```

출력:

- `docs/backSquat/chatgpt-request-final.json`

### 3. 블로그 포스트 초안 생성

```bash
node scripts/generate_exercise_post.mjs docs/backSquat/backSquat-summary.json
```

기본 출력 파일:

- `docs/backSquat/backSquat-post.json`

이 기능의 핵심 로직은 [app/src/utils/exercisePostGenerator.js](/C:/Users/neighbor/Documents/Code/Github/winivBlog/app/src/utils/exercisePostGenerator.js)에 있다.

## 문서

- 요구사항: [docs/Requirements.md](/C:/Users/neighbor/Documents/Code/Github/winivBlog/docs/Requirements.md)
- API 명세: [docs/API.md](/C:/Users/neighbor/Documents/Code/Github/winivBlog/docs/API.md)
- 레이아웃 노트: [docs/Layout.md](/C:/Users/neighbor/Documents/Code/Github/winivBlog/docs/Layout.md)
- 작업 가이드: [docs/commands/frontend.md](/C:/Users/neighbor/Documents/Code/Github/winivBlog/docs/commands/frontend.md)

## 현재 상태 메모

`docs/Requirements.md`에는 요구사항 대비 미완료 또는 수정이 필요한 항목들이 함께 기록되어 있다. README는 저장소 구조와 실행 방법 중심으로 정리했으며, 요구사항 충족 여부는 해당 문서를 기준으로 확인하는 편이 정확하다.
