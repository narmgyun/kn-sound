# KN Sound — 홈페이지 (정적 사이트)

김남균 님이 이끄는 음악 레이블 **KN Sound**의 원페이지 사이트입니다.
서버·빌드 도구 없이 `index.html` 하나로 동작하는 정적 사이트라, 아래 정적 호스팅에
그대로 올리면 됩니다.

- 확정 도메인: **knsoundmusic.com** (canonical·OG·푸터·문의 섹션에 반영됨)
- 레이블명: **KN Sound** (도메인과 별개로 유지)
- 대표 문의: narmgyun@gmail.com · 010-8966-1820

## 구성

```
kn-sound-web/
  index.html        페이지 본문(전부 여기 있음)
  styles.css        디자인·반응형
  script.js         헤더 상태, 모바일 메뉴, 스크롤 등장 효과
  CNAME             GitHub Pages 커스텀 도메인 (knsoundmusic.com)
  robots.txt
  assets/
    hero-stage.jpg  히어로 배경 (AI 생성 이미지, 편집 자유)
    brass-detail.jpg 소개 섹션 이미지
    favicon.svg
```

## 로컬에서 보기

```bash
python3 -m http.server 8000 --directory kn-sound-web
# 브라우저에서 http://localhost:8000
```

`index.html`을 더블클릭해도 되지만, 그 경우 폰트 CDN만 온라인에서 불러옵니다.

## 배포 — GitHub Pages (무료)

1. 새 저장소를 만들고 이 폴더의 파일을 그대로 올립니다(저장소 루트에 `index.html`).
2. Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)`.
3. Custom domain에 `knsoundmusic.com` 입력 → `CNAME` 파일이 이미 있으므로 그대로 유지.
4. 도메인 DNS에서 아래를 설정합니다.
   - `A` 레코드 `@` → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - `CNAME` 레코드 `www` → `<계정>.github.io`
5. Enforce HTTPS를 켭니다(인증서 발급까지 수십 분 걸릴 수 있음).

## 배포 — Cloudflare Pages (무료, 대안)

1. Cloudflare → Workers & Pages → Create → Pages → 저장소 연결.
2. Framework preset: `None`, Build command: 비움, Output directory: `/`.
3. Custom domains에서 `knsoundmusic.com`과 `www.knsoundmusic.com`을 연결.
4. 도메인을 Cloudflare로 이전하거나, 등록업체에서 Cloudflare 네임서버로 변경.

두 방법 모두 서버 비용은 0원이고, HTTPS 인증서는 무료로 자동 발급됩니다.

## 도메인 등록 메모 (2026-11-25 조사)

- `knsound.com`은 **이미 등록됨** — 2026-10-21 등록, 2027-10-21 만료,
  등록기관 Squarespace Domains, 등록자 기관명 "KN Sound"(브라질). 김남균 님과 무관한 보유자.
- `knsoundmusic.com`은 조회 시점 **등록 가능** 상태였습니다(연 $11.8~12.5 수준, 국내 등록대행사 기준 연 2.4만~2.8만 원).
  실제 등록은 사용자 확인 후 진행하며, 등록 후 네임서버를 위 호스팅에 연결합니다.

## 손볼 곳(도메인·내용이 바뀔 때)

- `index.html`: `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD의 `url`/`logo`,
  Contact 섹션의 Website 값, 푸터의 `knsoundmusic.com`.
- 새 팀이나 음반을 추가할 때: `#artists`의 `article.artist` 한 블록과 `#works`의 `article.work`를 복사해 수정.
- Coming Soon 카드 3개(`#projects`)는 실제 프로젝트가 열리면 소개 카드로 교체.

## 이미지 교체

`assets/hero-stage.jpg`, `assets/brass-detail.jpg`는 생성 이미지입니다.
실제 공연 사진으로 바꿀 경우 같은 파일명으로 덮어쓰면 코드 수정 없이 반영됩니다.
(가로 1600px 이상, 파일 300KB 이하 권장)
