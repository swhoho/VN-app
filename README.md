# 비주얼 노벨 플랫폼 (VN-app)

## 📖 프로젝트 개요

비주얼 노벨 플랫폼은 사용자가 다양한 시각적 소설과 인터랙티브 스토리를 탐색하고 즐길 수 있는 크로스 플랫폼 웹 애플리케이션입니다. 15개 언어를 지원하며, 현대적이고 반응형 UI를 제공합니다.

### 🎯 주요 목표
- 시각적으로 매력적인 비주얼 노벨 경험 제공
- 다국어 지원을 통한 글로벌 사용자 접근성 확보
- 사용자 친화적인 인터페이스와 직관적인 네비게이션
- 크로스 플랫폼 확장성 (향후 React Native 지원)

## ✨ 주요 기능

### 🌏 다국어 지원
- **15개 언어 지원**: 한국어, 영어, 일본어, 중국어(간체/번체), 스페인어, 프랑스어, 독일어, 이탈리아어, 포르투갈어, 러시아어, 아랍어, 힌디어, 태국어, 베트남어
- 실시간 언어 전환
- 로컬 스토리지를 통한 언어 설정 지속성

### 📚 콘텐츠 관리
- **비주얼 노벨 카탈로그**: 다양한 장르의 소설 브라우징
- **장르별 필터링**: Romance, Horror, Sci-Fi, Fantasy 등
- **랭킹 시스템**: 인기도 기반 추천
- **별점 및 리뷰**: 사용자 평가 시스템

### 🔐 사용자 인증
- **Google OAuth 2.0**: 안전한 소셜 로그인
- **프로필 관리**: 포인트, 멤버십, 독서 통계
- **개인화된 경험**: 사용자별 맞춤 콘텐츠

### 📱 모바일 최적화
- **반응형 디자인**: 모든 기기에서 최적화된 UI
- **터치 제스처**: 드래그 스크롤 및 터치 인터랙션
- **하단 네비게이션**: 모바일 친화적 네비게이션

## 🛠 기술 스택

### Frontend
- **React 18**: 현대적 React 훅 및 Suspense
- **TypeScript**: 타입 안전성과 개발 생산성
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **React Query (@tanstack/react-query)**: 서버 상태 관리 및 캐싱
- **Framer Motion**: 애니메이션 및 제스처
- **Wouter**: 경량 라우터

### Backend
- **Node.js**: 서버 사이드 JavaScript 런타임
- **Express**: 웹 서버 프레임워크
- **Passport.js**: 인증 미들웨어 (Google OAuth 2.0)
- **Better SQLite3**: 고성능 SQLite 데이터베이스
- **Drizzle ORM**: 타입 안전한 데이터베이스 ORM
- **Zod**: 스키마 검증 라이브러리

### UI 컴포넌트
- **Radix UI**: 접근성 중심 프리미티브 컴포넌트 (40개 이상)
- **Shadcn/ui**: 사전 구축된 UI 컴포넌트 시스템
- **Lucide React**: 아이콘 라이브러리
- **Class Variance Authority**: 컴포넌트 스타일 변형 관리

### 특별한 기능
- **이미지 프록시**: CORS 문제 해결 및 보안 강화
- **드래그 스크롤**: 모바일 친화적 제스처 지원
- **다크 모드**: 시스템 설정 연동 테마 지원
- **SEO 최적화**: 동적 메타 태그 및 사이트맵 생성

## 🚀 빠른 시작

### 필수 요구사항
- **Node.js** 18.0.0 이상
- **npm** 또는 **yarn**
- **Google OAuth 2.0** 클라이언트 ID (선택사항)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/VN-app.git
cd VN-app
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
# .env 파일 생성
cp .env.example .env

# 필요한 환경 변수 설정
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_PATH=./database.db
```

4. **데이터베이스 설정**
```bash
# 데이터베이스 마이그레이션
npm run db:generate
npm run db:push

# 샘플 데이터 시드 (선택사항)
npm run db:seed
```

5. **개발 서버 실행**
```bash
npm run dev
```

6. **브라우저에서 확인**
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
VN-app/
├── client/                    # React 프론트엔드
│   ├── src/
│   │   ├── components/        # 재사용 가능한 UI 컴포넌트
│   │   │   ├── ui/           # Shadcn/ui 컴포넌트
│   │   │   ├── header.tsx    # 헤더 컴포넌트
│   │   │   ├── novel-card.tsx # 소설 카드 컴포넌트
│   │   │   └── ...
│   │   ├── pages/            # 페이지 컴포넌트
│   │   │   ├── home.tsx      # 홈 페이지
│   │   │   ├── ranking.tsx   # 랭킹 페이지
│   │   │   └── ...
│   │   ├── hooks/            # 커스텀 React 훅
│   │   │   ├── use-language.tsx # 다국어 훅
│   │   │   └── ...
│   │   ├── lib/              # 유틸리티 및 설정
│   │   │   ├── i18n.ts      # 다국어 데이터
│   │   │   └── ...
│   │   └── main.tsx          # 애플리케이션 진입점
│   └── index.html            # HTML 템플릿
├── server/                   # Node.js 백엔드
│   ├── auth.ts              # 인증 로직
│   ├── db.ts                # 데이터베이스 연결
│   ├── routes.ts            # API 라우트
│   └── index.ts             # 서버 진입점
├── shared/                   # 공유 코드
│   └── schema.ts            # 데이터베이스 스키마
├── drizzle/                 # 데이터베이스 마이그레이션
└── package.json             # 프로젝트 의존성
```

## 🎨 사용자 인터페이스

### 테마 지원
- **라이트 모드**: 밝은 색상 테마
- **다크 모드**: 어두운 색상 테마 
- **시스템 테마**: 운영체제 설정 따라가기

### 반응형 디자인
- **모바일**: 최소 320px 너비 지원
- **태블릿**: 768px 이상에서 최적화
- **데스크톱**: 1024px 이상에서 최적화

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run check

# 데이터베이스 스키마 생성
npm run db:generate

# 데이터베이스 마이그레이션 적용
npm run db:push

# 데이터베이스 시드 실행
npm run db:seed
```

## 🌐 API 엔드포인트

### 인증 API
- `GET /api/auth/google` - Google OAuth 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

### 콘텐츠 API
- `GET /api/items` - 모든 비주얼 노벨 목록
- `GET /api/rankings` - 랭킹 정보

### 유틸리티 API
- `GET /proxy/*` - 이미지 프록시 (CORS 해결)
- `GET /sitemap.xml` - 사이트맵
- `GET /robots.txt` - 검색 엔진 크롤링 설정

## 🗄 데이터베이스 스키마

### 주요 테이블
- **profiles**: 사용자 프로필 정보
- **items**: 비주얼 노벨 콘텐츠 정보
- **rankings**: 랭킹 데이터
- **points_packages**: 포인트 패키지 정보
- **points_purchases**: 포인트 구매 내역

자세한 스키마 정보는 `shared/schema.ts` 파일을 참조하세요.

## 🔒 보안 기능

- **CORS 설정**: 크로스 오리진 요청 제한
- **헬멧 미들웨어**: 보안 헤더 설정
- **세션 관리**: 안전한 사용자 세션 처리
- **OAuth 2.0**: 안전한 소셜 로그인

## 🚀 배포 가이드

### 개발 환경
```bash
npm run dev
```

### 프로덕션 환경
```bash
npm run build
npm run start
```

### 환경 변수
```env
NODE_ENV=production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_PATH=./database.db
SESSION_SECRET=your_session_secret
```

## 📈 성능 최적화

- **코드 분할**: 페이지별 지연 로딩
- **이미지 최적화**: 프록시를 통한 이미지 캐싱
- **React Query**: 서버 상태 캐싱 및 동기화
- **Vite**: 빠른 개발 서버 및 HMR

## 🤝 기여 가이드

1. **이슈 등록**: 버그 리포트 또는 기능 요청
2. **포크 및 클론**: 프로젝트 포크 후 로컬 클론
3. **브랜치 생성**: 기능별 브랜치 생성
4. **코드 작성**: 코딩 스타일 가이드 준수
5. **테스트**: 변경사항 테스트
6. **풀 리퀘스트**: 상세한 설명과 함께 PR 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🆘 문제 해결

### 일반적인 문제
1. **포트 충돌**: 다른 포트 사용 (PORT 환경 변수)
2. **Google OAuth 오류**: 클라이언트 ID 및 시크릿 확인
3. **데이터베이스 오류**: 마이그레이션 재실행
4. **빌드 오류**: 의존성 재설치

### 디버깅 팁
- **개발자 도구**: 브라우저 콘솔에서 오류 확인
- **네트워크 탭**: API 요청/응답 확인
- **React DevTools**: 컴포넌트 상태 확인

## 📞 지원 및 연락처

- **이슈 트래커**: GitHub Issues
- **문서**: 프로젝트 Wiki
- **커뮤니티**: Discussions

---

**비주얼 노벨 플랫폼**으로 다양한 이야기를 탐험해보세요! 🚀