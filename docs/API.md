# API 참조 문서

## 📋 개요

비주얼 노벨 플랫폼 API는 RESTful 아키텍처를 따르며, JSON 형식의 데이터를 주고받습니다. 이 문서는 React 컴포넌트, 커스텀 훅, 백엔드 API 엔드포인트 및 타입 정의를 포함한 전체 API 참조를 제공합니다.

## 목차
- [React 컴포넌트](#react-컴포넌트)
- [커스텀 훅](#커스텀-훅)
- [백엔드 API 엔드포인트](#백엔드-api-엔드포인트)
- [타입 정의](#타입-정의)
- [유틸리티 함수](#유틸리티-함수)

## React 컴포넌트

### 주요 기능 컴포넌트

#### NovelCard
비주얼 노벨 카드 컴포넌트로, 홈페이지와 검색 결과에서 사용됩니다.

```tsx
interface NovelCardProps {
  novel: Item;
}

// 사용 예제
<NovelCard novel={novel} />
```

**특징:**
- 이미지 프록시 URL 자동 처리
- 다국어 지원 (제목, 설명, 태그)
- 평점 표시 (별점 시스템)
- 조회수 및 좋아요 수 표시
- 클릭 시 상세 페이지로 이동

#### Header
상단 헤더 컴포넌트로, 모든 페이지에서 공통으로 사용됩니다.

```tsx
// 사용 예제
<Header />
```

**특징:**
- 사용자 포인트 표시
- 언어 선택기 통합
- 인증 상태에 따른 동적 표시
- 검색 및 알림 버튼

#### BottomNavigation
하단 네비게이션 바로, 모바일 친화적 네비게이션을 제공합니다.

```tsx
// 사용 예제
<BottomNavigation />
```

**특징:**
- 홈, 랭킹, 마이페이지 네비게이션
- 현재 페이지 하이라이트
- 다국어 지원

#### LanguageSelector
언어 선택 컴포넌트로, 15개 언어를 지원합니다.

```tsx
interface LanguageSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// 사용 예제
<LanguageSelector 
  isOpen={isLanguageOpen}
  onToggle={toggleLanguage}
  onClose={closeLanguage}
/>
```

**지원 언어:**
- 한국어 (ko), 영어 (en), 일본어 (ja)
- 중국어 간체 (zh-CN), 중국어 번체 (zh-TW)
- 스페인어 (es), 프랑스어 (fr), 독일어 (de)
- 이탈리아어 (it), 포르투갈어 (pt), 러시아어 (ru)
- 아랍어 (ar), 힌디어 (hi), 태국어 (th), 베트남어 (vi)

### UI 컴포넌트 라이브러리

#### Button
다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// 사용 예제
<Button variant="default" size="lg">
  클릭하세요
</Button>
```

#### Card
콘텐츠를 감싸는 카드 컴포넌트입니다.

```tsx
// 사용 예제
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    <p>내용</p>
  </CardContent>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>
```

## 커스텀 훅

### useAuth
사용자 인증 상태를 관리하는 훅입니다.

```tsx
interface AuthHook {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

// 사용 예제
const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();

if (isAuthenticated) {
  return <div>안녕하세요, {user?.username}님!</div>;
}

return <Button onClick={loginWithGoogle}>로그인</Button>;
```

### useLanguage
언어 설정을 관리하는 훅입니다.

```tsx
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

// 사용 예제
const { language, setLanguage } = useLanguage();
```

### useDragScroll
드래그 스크롤 기능을 구현하는 훅입니다.

```tsx
interface DragScrollHook {
  scrollRef: RefObject<HTMLDivElement>;
  isDragging: boolean;
  hasMoved: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

// 사용 예제
const { scrollRef, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDragScroll();

return (
  <div
    ref={scrollRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    className="overflow-x-auto"
  >
    {/* 스크롤 가능한 콘텐츠 */}
  </div>
);
```

### useMobile
모바일 기기 감지를 위한 훅입니다.

```tsx
// 사용 예제
const isMobile = useMobile();

return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {/* 반응형 콘텐츠 */}
  </div>
);
```

## 백엔드 API 엔드포인트

## 🔐 인증

### 인증 방식
- **Google OAuth 2.0**: 소셜 로그인을 통한 사용자 인증
- **세션 기반**: 서버 사이드 세션 관리
- **쿠키**: 인증 상태 유지

### 인증 상태 확인
일부 API는 인증이 필요합니다. 인증되지 않은 요청은 `401 Unauthorized` 응답을 반환합니다.

## 🛡️ 보안 헤더

모든 API 응답에는 다음 보안 헤더가 포함됩니다:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📡 API 엔드포인트

### 🔐 인증 API

#### Supabase JWT 기반 인증
이 플랫폼은 **Supabase Auth**를 사용하여 JWT 토큰 기반 인증을 제공합니다.

**인증 헤더 형식**:
```http
Authorization: Bearer <jwt_token>
```

**토큰 획득 방법**: Supabase 클라이언트를 통한 로그인 후 자동 발급

**인증 플로우**:
1. 클라이언트에서 Supabase Auth로 로그인
2. JWT 토큰 자동 발급 및 저장
3. API 요청 시 Authorization 헤더에 토큰 포함
4. 서버에서 토큰 검증 후 사용자 정보 제공

---

#### 사용자 통계 정보
```http
GET /api/my-page/stats
```

**설명**: 현재 로그인한 사용자의 통계 정보를 반환합니다.

**인증**: 필요 ✅ (Supabase JWT 토큰)

**응답**:
```json
{
  "totalReadingTime": 15.5,
  "favoritesCount": 12,
  "completedCount": 8,
  "achievementsCount": 25
}
```

**응답 필드**:
- `totalReadingTime` (number): 총 독서 시간 (시간 단위)
- `favoritesCount` (number): 즐겨찾기 수
- `completedCount` (number): 완료한 작품 수
- `achievementsCount` (number): 획득한 업적 수

**오류 응답**:
```json
{
  "message": "Unauthorized"
}
```

**상태 코드**:
- `200 OK`: 성공
- `401 Unauthorized`: 인증 토큰 없음 또는 유효하지 않음
- `500 Internal Server Error`: 서버 오류

---

#### Google OAuth 로그인 (레거시)
```http
GET /api/auth/google
```

**설명**: Google OAuth 2.0 로그인 페이지로 리디렉션합니다. (Supabase 마이그레이션으로 인해 사용 중단 예정)

**응답**: 
- `302 Found`: Google OAuth 페이지로 리디렉션
- `Location: https://accounts.google.com/oauth/authorize?...`

**사용 예시**:
```javascript
// 브라우저에서 직접 접근
window.location.href = '/api/auth/google';
```

---

#### Google OAuth 콜백 (레거시)
```http
GET /api/auth/google/callback
```

**설명**: Google OAuth 인증 후 콜백을 처리합니다. (Supabase 마이그레이션으로 인해 사용 중단 예정)

**쿼리 매개변수**:
- `code`: Google에서 제공하는 인증 코드
- `state`: CSRF 방지를 위한 상태 값

**응답**:
- `302 Found`: 성공 시 홈페이지(`/`)로 리디렉션
- `302 Found`: 실패 시 로그인 페이지(`/login`)로 리디렉션

---

#### 현재 사용자 정보 (레거시)
```http
GET /api/auth/me
```

**설명**: 현재 로그인한 사용자 정보를 반환합니다. (세션 기반, 사용 중단 예정)

**인증**: 필요 ✅

**응답**:
```json
{
  "id": "google_user_id",
  "displayName": "사용자 이름",
  "email": "user@example.com",
  "photos": [
    {
      "value": "https://lh3.googleusercontent.com/..."
    }
  ]
}
```

**오류 응답**:
```json
{
  "error": "Not authenticated"
}
```

**상태 코드**:
- `200 OK`: 성공
- `401 Unauthorized`: 인증되지 않음

---

#### 로그아웃 (레거시)
```http
POST /api/auth/logout
```

**설명**: 현재 세션을 종료하고 로그아웃합니다. (세션 기반, 사용 중단 예정)

**응답**:
```json
{
  "success": true
}
```

**오류 응답**:
```json
{
  "error": "Logout failed"
}
```

**상태 코드**:
- `200 OK`: 성공
- `500 Internal Server Error`: 로그아웃 실패

---

### 📚 콘텐츠 API

#### 모든 비주얼 노벨 목록
```http
GET /api/items
```

**설명**: 일반 비주얼 노벨 아이템 목록을 반환합니다. (canvas=false 아이템만 포함)

**응답**:
```json
[
  {
    "id": 1,
    "title": "Autumn Reverie",
    "description": "A heartwarming story about love and friendship in autumn.",
    "image": "https://example.com/image.jpg",
    "tags": ["romance", "slice-of-life"],
    "rating": "4.5",
    "viewCount": 12500,
    "likeCount": 850,
    "featured": true,
    "canvas": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Mystery Manor",
    "description": "Uncover the secrets of the haunted mansion.",
    "image": "https://example.com/image2.jpg",
    "tags": ["mystery", "horror"],
    "rating": "4.2",
    "viewCount": 8900,
    "likeCount": 420,
    "featured": false,
    "canvas": false,
    "createdAt": "2024-01-02T00:00:00.000Z"
  }
]
```

**응답 필드**:
- `id` (integer): 아이템 고유 ID
- `title` (string): 제목
- `description` (string): 설명
- `image` (string): 이미지 URL
- `tags` (array): 태그 배열 (JSON에서 파싱됨)
- `rating` (string): 평점 (0-5)
- `viewCount` (integer): 조회수
- `likeCount` (integer): 좋아요 수
- `featured` (boolean): 추천 여부
- `canvas` (boolean): 캔버스 아이템 여부 (일반 아이템은 false)
- `createdAt` (string): 생성일시 (ISO 8601 형식)

**오류 응답**:
```json
{
  "message": "Error fetching items"
}
```

**상태 코드**:
- `200 OK`: 성공
- `500 Internal Server Error`: 서버 오류

---

#### 캔버스 아이템 목록
```http
GET /api/canvas-items
```

**설명**: 사용자 생성 콘텐츠(UGC) 캔버스 아이템 목록을 반환합니다. (canvas=true 아이템만 포함)

**응답**:
```json
[
  {
    "id": "uuid-1234",
    "title": "My Custom Story",
    "description": "A user-created interactive story.",
    "image": "https://example.com/user-image.jpg",
    "tags": ["user-generated", "interactive"],
    "rating": "4.0",
    "viewCount": 150,
    "likeCount": 25,
    "featured": false,
    "canvas": true,
    "created_at": "2024-12-01T10:30:00.000Z"
  }
]
```

**응답 필드**:
- `id` (string): 아이템 고유 ID (UUID 형식)
- `title` (string): 제목
- `description` (string): 설명
- `image` (string): 이미지 URL
- `tags` (array): 태그 배열 (JSON에서 파싱됨)
- `rating` (string): 평점 (0-5)
- `viewCount` (integer): 조회수
- `likeCount` (integer): 좋아요 수
- `featured` (boolean): 추천 여부
- `canvas` (boolean): 캔버스 아이템 여부 (항상 true)
- `created_at` (string): 생성일시 (ISO 8601 형식, Supabase 필드명)

**특징**:
- 캔버스 전용 아이템만 필터링
- 생성일 기준 내림차순 정렬
- 사용자 생성 콘텐츠(UGC) 전용

**오류 응답**:
```json
{
  "message": "Error fetching canvas items"
}
```

**상태 코드**:
- `200 OK`: 성공
- `500 Internal Server Error`: 서버 오류

---

#### 랭킹 정보
```http
GET /api/rankings
```

**설명**: 비주얼 노벨 랭킹 정보를 반환합니다.

**응답**:
```json
[
  {
    "id": 1,
    "itemId": 1,
    "rank": 1,
    "previousRank": 2,
    "weeklyViews": 2500,
    "item": {
      "id": 1,
      "title": "Autumn Reverie",
      "description": "A heartwarming story about love and friendship in autumn.",
      "image": "https://example.com/image.jpg",
      "tags": ["romance", "slice-of-life"],
      "rating": "4.5",
      "viewCount": 12500,
      "likeCount": 850,
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
]
```

**응답 필드**:
- `id` (integer): 랭킹 고유 ID
- `itemId` (integer): 아이템 ID
- `rank` (integer): 현재 순위
- `previousRank` (integer): 이전 순위
- `weeklyViews` (integer): 주간 조회수
- `item` (object): 연관된 아이템 정보 (위 items API와 동일)

**오류 응답**:
```json
{
  "message": "Error fetching rankings"
}
```

**상태 코드**:
- `200 OK`: 성공
- `500 Internal Server Error`: 서버 오류

---

### 🖼️ 유틸리티 API

#### 보안 강화 이미지 프록시
```http
GET /proxy/*
```

**설명**: 외부 이미지 URL을 안전하게 프록시하여 CORS 문제를 해결합니다. 강화된 보안 기능을 포함합니다.

**경로 매개변수**:
- `*`: 프록시할 외부 이미지 URL

**보안 기능**:
- **도메인 화이트리스트**: 허용된 도메인만 접근 가능
- **Rate Limiting**: IP당 시간당 100회 요청 제한
- **HTTPS 강제**: HTTP 요청 자동 차단
- **파일 크기 제한**: 최대 5MB
- **콘텐츠 타입 검증**: 이미지 파일만 허용
- **요청 타임아웃**: 10초 제한

**허용된 도메인**:
```javascript
[
  'images.unsplash.com',
  'cdn.pixabay.com', 
  'images.pexels.com',
  'source.unsplash.com',
  'picsum.photos',
  // 기타 승인된 이미지 도메인들
]
```

**사용 예시**:
```javascript
// 원본 이미지 URL (허용된 도메인)
const originalUrl = 'https://images.unsplash.com/photo-1234567890';

// 프록시된 URL
const proxyUrl = `/proxy/${encodeURIComponent(originalUrl)}`;

// 또는 이미 완전한 URL인 경우
const proxyUrl = `/proxy/https://images.unsplash.com/photo-1234567890`;
```

**응답**:
- 성공 시: 이미지 바이너리 데이터
- Content-Type: 원본 이미지의 MIME 타입

**헤더**:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET`
- `Cache-Control: public, max-age=3600`
- `X-Proxy-Cache: HIT|MISS`

**오류 응답**:
```json
{
  "error": "Domain not allowed"
}
```
```json
{
  "error": "Rate limit exceeded"
}
```
```json
{
  "error": "File too large (max 5MB)"
}
```
```json
{
  "error": "Invalid content type"
}
```

**상태 코드**:
- `200 OK`: 성공
- `400 Bad Request`: 잘못된 URL 또는 허용되지 않은 도메인
- `413 Payload Too Large`: 파일 크기 초과
- `429 Too Many Requests`: Rate limit 초과
- `500 Internal Server Error`: 프록시 오류
- `504 Gateway Timeout`: 원본 서버 응답 시간 초과

**Rate Limiting 정보**:
- **제한**: IP당 시간당 100회 요청
- **헤더**: `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **초과 시**: 1시간 후 재시도 가능

---

#### 사이트맵
```http
GET /sitemap.xml
```

**설명**: 검색 엔진 최적화를 위한 사이트맵을 반환합니다.

**응답**: XML 형식의 사이트맵
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

**헤더**:
- `Content-Type: text/xml`

**상태 코드**:
- `200 OK`: 성공
- `500 Internal Server Error`: 사이트맵 생성 오류

---

#### 로봇 텍스트
```http
GET /robots.txt
```

**설명**: 검색 엔진 크롤러를 위한 로봇 텍스트를 반환합니다.

**응답**: 텍스트 형식의 robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

**헤더**:
- `Content-Type: text/plain`

**상태 코드**:
- `200 OK`: 성공

---

## 🔧 정적 파일 API

#### 첨부 파일 서비스
```http
GET /attached_assets/*
```

**설명**: 업로드된 정적 파일들을 서비스합니다.

**사용 예시**:
```
/attached_assets/placeholder1.jpg
/attached_assets/Autumn_Reverie.png
```

**응답**: 파일 바이너리 데이터
**헤더**: 파일 타입에 따른 Content-Type

---

## 🔍 오류 코드 및 처리

### 일반적인 HTTP 상태 코드
- `200 OK`: 요청 성공
- `302 Found`: 리디렉션
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 필요
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 내부 오류

### 오류 응답 형식
```json
{
  "error": "오류 메시지",
  "message": "상세한 오류 설명"
}
```

### 일반적인 오류 시나리오
1. **인증 오류**: 로그인이 필요한 API에 인증 없이 접근
2. **데이터베이스 오류**: 서버 내부 데이터베이스 연결 문제
3. **프록시 오류**: 외부 이미지 URL이 유효하지 않음
4. **세션 오류**: 세션이 만료되었거나 유효하지 않음

---

## 🧪 API 테스트

### 개발 환경에서 테스트
```javascript
// 현재 사용자 정보 가져오기
fetch('/api/auth/me')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 모든 아이템 가져오기
fetch('/api/items')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 랭킹 정보 가져오기
fetch('/api/rankings')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### cURL을 이용한 테스트
```bash
# 현재 사용자 정보
curl -X GET http://localhost:3000/api/auth/me \
  -H "Content-Type: application/json" \
  -c cookies.txt -b cookies.txt

# 아이템 목록
curl -X GET http://localhost:3000/api/items \
  -H "Content-Type: application/json"

# 랭킹 정보
curl -X GET http://localhost:3000/api/rankings \
  -H "Content-Type: application/json"

# 로그아웃
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -c cookies.txt -b cookies.txt
```

---

## 🚀 API 사용 모범 사례

### 1. 오류 처리
```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
}
```

### 2. 인증 상태 확인
```javascript
async function checkAuth() {
  try {
    const response = await fetch('/api/auth/me');
    
    if (response.status === 401) {
      // 인증되지 않음 - 로그인 페이지로 리디렉션
      window.location.href = '/login';
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('인증 확인 실패:', error);
    return null;
  }
}
```

### 3. 이미지 프록시 사용
```javascript
function getProxyImageUrl(originalUrl) {
  if (!originalUrl) return '';
  
  // 이미 프록시된 URL인지 확인
  if (originalUrl.startsWith('/proxy/')) {
    return originalUrl;
  }
  
  // 외부 URL을 프록시를 통해 사용
  return `/proxy/${encodeURIComponent(originalUrl)}`;
}
```

---

## 📈 성능 최적화

### 캐싱 전략
- **이미지 프록시**: 1시간 브라우저 캐싱
- **정적 파일**: 무기한 캐싱
- **API 응답**: 클라이언트 사이드 캐싱 권장

### 요청 최적화
- **병렬 요청**: 관련 없는 API는 병렬로 호출
- **데이터 최소화**: 필요한 필드만 요청
- **재요청 방지**: 중복 요청 방지 로직 구현

---

## 🔄 업데이트 및 변경사항

### 버전 관리
- API 버전은 URL 경로에 포함되지 않음
- 하위 호환성 유지를 원칙으로 함
- 중요한 변경사항은 사전 공지

### 변경 로그
- `2024-01-01`: 초기 API 버전 릴리스
- `2024-01-15`: 이미지 프록시 기능 추가
- `2024-02-01`: 랭킹 API 성능 최적화
- `2024-11-15`: Supabase 통합 및 JWT 기반 인증 추가
- `2024-12-01`: 캔버스 아이템 API 추가 (/api/canvas-items)
- `2024-12-01`: 사용자 통계 API 추가 (/api/my-page/stats)
- `2024-12-01`: 이미지 프록시 보안 강화 (도메인 화이트리스트, Rate limiting)
- `2024-12-15`: UGC(사용자 생성 콘텐츠) 플랫폼 기능 완성

---

## 📋 API 요약

### 현재 사용 가능한 엔드포인트
| 엔드포인트 | 메소드 | 인증 | 설명 |
|-----------|--------|------|------|
| `/api/my-page/stats` | GET | JWT ✅ | 사용자 통계 정보 |
| `/api/items` | GET | ❌ | 일반 비주얼 노벨 목록 |
| `/api/canvas-items` | GET | ❌ | 캔버스(UGC) 아이템 목록 |
| `/api/rankings` | GET | ❌ | 랭킹 정보 |
| `/proxy/*` | GET | ❌ | 보안 강화 이미지 프록시 |
| `/attached_assets/*` | GET | ❌ | 정적 파일 서비스 |
| `/sitemap.xml` | GET | ❌ | 사이트맵 |
| `/robots.txt` | GET | ❌ | 로봇 텍스트 |

### 레거시 엔드포인트 (사용 중단 예정)
| 엔드포인트 | 메소드 | 인증 | 설명 |
|-----------|--------|------|------|
| `/api/auth/google` | GET | ❌ | Google OAuth 로그인 |
| `/api/auth/google/callback` | GET | ❌ | OAuth 콜백 |
| `/api/auth/me` | GET | 세션 | 현재 사용자 정보 |
| `/api/auth/logout` | POST | 세션 | 로그아웃 |

---

이 문서는 지속적으로 업데이트되며, 새로운 기능이나 변경사항이 있을 때마다 갱신됩니다.