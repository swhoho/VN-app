# 데이터베이스 스키마 문서

## 📋 개요

비주얼 노벨 플랫폼은 SQLite 데이터베이스를 사용하여 사용자 프로필, 콘텐츠 정보, 랭킹 데이터 등을 관리합니다. 이 문서는 데이터베이스 스키마의 구조와 관계를 설명합니다.

## 🗄️ 데이터베이스 구성

### 기술 스택
- **데이터베이스**: SQLite 3
- **ORM**: Drizzle ORM
- **마이그레이션**: Drizzle Kit
- **유효성 검사**: Zod

### 파일 구조
```
├── database.db              # SQLite 데이터베이스 파일
├── shared/
│   └── schema.ts            # 데이터베이스 스키마 정의
├── drizzle/
│   ├── 0000_mute_hobgoblin.sql
│   ├── 0001_first_mordo.sql
│   ├── 0002_abandoned_namorita.sql
│   └── meta/
│       ├── _journal.json
│       └── *.json
└── server/
    └── db.ts               # 데이터베이스 연결 설정
```

---

## 📊 테이블 구조

### 1. profiles (사용자 프로필)

**설명**: 사용자 계정 정보 및 통계 데이터를 저장합니다.

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  username TEXT,
  profile_image_url TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  membership_type TEXT NOT NULL DEFAULT 'free',
  stories_read INTEGER NOT NULL DEFAULT 0,
  chapters_read INTEGER NOT NULL DEFAULT 0,
  reading_time_hours TEXT NOT NULL DEFAULT '0',
  favorites_count INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**필드 설명**:
- `id` (TEXT, PRIMARY KEY): 사용자 고유 ID (Google OAuth ID 사용)
- `username` (TEXT): 사용자 이름
- `profile_image_url` (TEXT): 프로필 이미지 URL
- `points` (INTEGER): 사용자 포인트 (기본값: 0)
- `membership_type` (TEXT): 멤버십 유형 (기본값: 'free')
- `stories_read` (INTEGER): 읽은 스토리 수 (기본값: 0)
- `chapters_read` (INTEGER): 읽은 챕터 수 (기본값: 0)
- `reading_time_hours` (TEXT): 총 독서 시간 (기본값: '0')
- `favorites_count` (INTEGER): 즐겨찾기 수 (기본값: 0)
- `current_streak` (INTEGER): 현재 연속 독서 일수 (기본값: 0)
- `updated_at` (TEXT): 마지막 업데이트 일시

**TypeScript 타입**:
```typescript
interface Profile {
  id: string
  username: string | null
  profileImageUrl: string | null
  points: number
  membershipType: string
  storiesRead: number
  chaptersRead: number
  readingTimeHours: string
  favoritesCount: number
  currentStreak: number
  updatedAt: string | null
}
```

**인덱스**: 
- PRIMARY KEY: `id`

---

### 2. items (비주얼 노벨 아이템)

**설명**: 비주얼 노벨 콘텐츠 정보를 저장합니다.

```sql
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  rating TEXT NOT NULL DEFAULT '0',
  view_count INTEGER NOT NULL DEFAULT 0,
  like_count INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**필드 설명**:
- `id` (INTEGER, PRIMARY KEY): 아이템 고유 ID (자동 증가)
- `title` (TEXT): 아이템 제목
- `description` (TEXT): 아이템 설명
- `image` (TEXT): 대표 이미지 URL
- `tags` (TEXT): 태그 배열 (JSON 문자열 형태)
- `rating` (TEXT): 평점 (0-5 범위)
- `view_count` (INTEGER): 조회수 (기본값: 0)
- `like_count` (INTEGER): 좋아요 수 (기본값: 0)
- `featured` (INTEGER): 추천 여부 (0: false, 1: true)
- `created_at` (TEXT): 생성 일시

**TypeScript 타입**:
```typescript
interface Item {
  id: number
  title: string
  description: string
  image: string
  tags: string // JSON 문자열 -> 파싱 후 string[] 배열로 사용
  rating: string
  viewCount: number
  likeCount: number
  featured: boolean
  createdAt: string
}
```

**인덱스**: 
- PRIMARY KEY: `id`
- INDEX: `featured` (추천 아이템 빠른 조회)
- INDEX: `created_at` (최신 아이템 정렬)

---

### 3. rankings (랭킹)

**설명**: 아이템별 랭킹 정보를 저장합니다.

```sql
CREATE TABLE rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  previous_rank INTEGER,
  weekly_views INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);
```

**필드 설명**:
- `id` (INTEGER, PRIMARY KEY): 랭킹 고유 ID (자동 증가)
- `item_id` (INTEGER): 아이템 ID (외래키)
- `rank` (INTEGER): 현재 순위
- `previous_rank` (INTEGER): 이전 순위 (순위 변동 표시용)
- `weekly_views` (INTEGER): 주간 조회수 (기본값: 0)

**TypeScript 타입**:
```typescript
interface Ranking {
  id: number
  itemId: number
  rank: number
  previousRank: number | null
  weeklyViews: number
}
```

**외래키 제약조건**:
- `item_id` → `items(id)` (CASCADE DELETE)

**인덱스**:
- PRIMARY KEY: `id`
- INDEX: `item_id` (아이템별 랭킹 조회)
- INDEX: `rank` (순위별 정렬)

---

### 4. points_packages (포인트 패키지)

**설명**: 구매 가능한 포인트 패키지 정보를 저장합니다.

```sql
CREATE TABLE points_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  price TEXT NOT NULL,
  points INTEGER NOT NULL,
  title TEXT NOT NULL,
  is_popular INTEGER DEFAULT 0,
  discount_percent INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**필드 설명**:
- `id` (INTEGER, PRIMARY KEY): 패키지 고유 ID (자동 증가)
- `price` (TEXT): 가격 (문자열로 저장)
- `points` (INTEGER): 제공 포인트 수
- `title` (TEXT): 패키지 제목
- `is_popular` (INTEGER): 인기 패키지 여부 (0: false, 1: true)
- `discount_percent` (INTEGER): 할인율 (기본값: 0)
- `created_at` (TEXT): 생성 일시

**TypeScript 타입**:
```typescript
interface PointsPackage {
  id: number
  price: string
  points: number
  title: string
  isPopular: boolean | null
  discountPercent: number | null
  createdAt: string | null
}
```

**인덱스**:
- PRIMARY KEY: `id`
- INDEX: `is_popular` (인기 패키지 조회)

---

### 5. points_purchases (포인트 구매 내역)

**설명**: 사용자의 포인트 구매 내역을 저장합니다.

```sql
CREATE TABLE points_purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  package_id INTEGER NOT NULL,
  amount TEXT NOT NULL,
  points INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_intent_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (package_id) REFERENCES points_packages(id)
);
```

**필드 설명**:
- `id` (INTEGER, PRIMARY KEY): 구매 고유 ID (자동 증가)
- `user_id` (TEXT): 사용자 ID (외래키)
- `package_id` (INTEGER): 패키지 ID (외래키)
- `amount` (TEXT): 결제 금액
- `points` (INTEGER): 구매한 포인트 수
- `status` (TEXT): 구매 상태 (pending, completed, failed)
- `payment_intent_id` (TEXT): Stripe 결제 의도 ID
- `created_at` (TEXT): 구매 일시

**TypeScript 타입**:
```typescript
interface PointsPurchase {
  id: number
  userId: string
  packageId: number
  amount: string
  points: number
  status: string
  paymentIntentId: string | null
  createdAt: string | null
}
```

**외래키 제약조건**:
- `user_id` → `profiles(id)` (CASCADE DELETE)
- `package_id` → `points_packages(id)`

**인덱스**:
- PRIMARY KEY: `id`
- INDEX: `user_id` (사용자별 구매 내역)
- INDEX: `status` (상태별 조회)

---

## 🔗 테이블 관계도

```
┌─────────────┐         ┌─────────────┐
│  profiles   │◄────────│points_purchases
│             │         │             │
│ id (PK)     │         │ user_id (FK)│
│ username    │         │ package_id  │
│ points      │         │ amount      │
│ ...         │         │ status      │
└─────────────┘         └─────────────┘
                                │
                                ▼
                        ┌─────────────┐
                        │points_packages
                        │             │
                        │ id (PK)     │
                        │ price       │
                        │ points      │
                        │ title       │
                        └─────────────┘

┌─────────────┐         ┌─────────────┐
│    items    │◄────────│  rankings   │
│             │         │             │
│ id (PK)     │         │ item_id (FK)│
│ title       │         │ rank        │
│ description │         │ previous_rank│
│ image       │         │ weekly_views│
│ tags        │         └─────────────┘
│ rating      │
│ view_count  │
│ like_count  │
│ featured    │
└─────────────┘
```

**관계 설명**:
1. **profiles ↔ points_purchases**: 일대다 관계 (한 사용자는 여러 구매 내역을 가질 수 있음)
2. **points_packages ↔ points_purchases**: 일대다 관계 (한 패키지는 여러 구매에 사용될 수 있음)
3. **items ↔ rankings**: 일대다 관계 (한 아이템은 여러 랭킹 기록을 가질 수 있음)

---

## 💾 Drizzle ORM 설정

### 스키마 정의
```typescript
// shared/schema.ts
import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  username: text("username"),
  profileImageUrl: text("profile_image_url"),
  points: integer("points").notNull().default(0),
  membershipType: text("membership_type").notNull().default("free"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: text("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").notNull().default("[]"),
  rating: text("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// 기타 테이블 정의...
```

### 데이터베이스 연결
```typescript
// server/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

const sqlite = new Database(process.env.DATABASE_PATH || "./database.db");

export const db = drizzle(sqlite, { schema });
```

---

## 🛠️ 마이그레이션 관리

### 마이그레이션 명령어
```bash
# 스키마 변경사항으로부터 마이그레이션 생성
npm run db:generate

# 마이그레이션 적용
npm run db:push

# 데이터베이스 시드 실행
npm run db:seed
```

### 마이그레이션 파일 구조
```
drizzle/
├── 0000_mute_hobgoblin.sql      # 초기 테이블 생성
├── 0001_first_mordo.sql         # 추가 테이블 생성
├── 0002_abandoned_namorita.sql  # 스키마 수정
└── meta/
    ├── _journal.json            # 마이그레이션 히스토리
    ├── 0000_snapshot.json       # 스냅샷
    ├── 0001_snapshot.json
    └── 0002_snapshot.json
```

### 마이그레이션 예시
```sql
-- 0000_mute_hobgoblin.sql
CREATE TABLE `profiles` (
  `id` text PRIMARY KEY NOT NULL,
  `username` text,
  `profile_image_url` text,
  `points` integer DEFAULT 0 NOT NULL,
  `membership_type` text DEFAULT 'free' NOT NULL,
  `stories_read` integer DEFAULT 0 NOT NULL,
  `chapters_read` integer DEFAULT 0 NOT NULL,
  `reading_time_hours` text DEFAULT '0' NOT NULL,
  `favorites_count` integer DEFAULT 0 NOT NULL,
  `current_streak` integer DEFAULT 0 NOT NULL,
  `updated_at` text
);

CREATE TABLE `items` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `tags` text DEFAULT '[]' NOT NULL,
  `rating` text DEFAULT '0' NOT NULL,
  `view_count` integer DEFAULT 0 NOT NULL,
  `like_count` integer DEFAULT 0 NOT NULL,
  `featured` integer DEFAULT false NOT NULL,
  `created_at` text NOT NULL
);
```

---

## 📝 데이터 조작 예시

### 기본 CRUD 작업

#### 데이터 조회
```typescript
// 모든 아이템 조회
const allItems = await db.select().from(items);

// 특정 사용자 조회
const user = await db.select().from(profiles).where(eq(profiles.id, userId));

// 랭킹 정보 조회 (JOIN)
const rankings = await db
  .select()
  .from(rankings)
  .leftJoin(items, eq(rankings.itemId, items.id));
```

#### 데이터 삽입
```typescript
// 새 아이템 생성
const newItem = await db.insert(items).values({
  title: "새로운 스토리",
  description: "흥미진진한 이야기",
  image: "https://example.com/image.jpg",
  tags: JSON.stringify(["romance", "fantasy"]),
  rating: "4.5",
  viewCount: 0,
  likeCount: 0,
  featured: true,
});

// 새 사용자 프로필 생성
const newProfile = await db.insert(profiles).values({
  id: "google_user_123",
  username: "새로운사용자",
  profileImageUrl: "https://example.com/profile.jpg",
  points: 100,
});
```

#### 데이터 수정
```typescript
// 사용자 포인트 업데이트
await db
  .update(profiles)
  .set({ points: 150 })
  .where(eq(profiles.id, userId));

// 아이템 조회수 증가
await db
  .update(items)
  .set({ viewCount: sql`${items.viewCount} + 1` })
  .where(eq(items.id, itemId));
```

#### 데이터 삭제
```typescript
// 아이템 삭제 (연관된 랭킹도 자동 삭제)
await db.delete(items).where(eq(items.id, itemId));

// 사용자 프로필 삭제
await db.delete(profiles).where(eq(profiles.id, userId));
```

---

## 🔍 고급 쿼리 예시

### 복합 조건 쿼리
```typescript
// 추천 아이템 중 특정 태그를 가진 아이템 조회
const featuredRomanceItems = await db
  .select()
  .from(items)
  .where(
    and(
      eq(items.featured, true),
      like(items.tags, '%romance%')
    )
  )
  .orderBy(desc(items.createdAt));
```

### 집계 쿼리
```typescript
// 사용자별 총 포인트 구매 금액
const userPurchaseStats = await db
  .select({
    userId: pointsPurchases.userId,
    totalAmount: sum(pointsPurchases.amount),
    totalPoints: sum(pointsPurchases.points),
    purchaseCount: count(pointsPurchases.id)
  })
  .from(pointsPurchases)
  .where(eq(pointsPurchases.status, 'completed'))
  .groupBy(pointsPurchases.userId);
```

### 복잡한 JOIN 쿼리
```typescript
// 랭킹 정보와 함께 아이템 조회
const topRankedItems = await db
  .select({
    itemId: items.id,
    title: items.title,
    rating: items.rating,
    rank: rankings.rank,
    previousRank: rankings.previousRank,
    weeklyViews: rankings.weeklyViews
  })
  .from(items)
  .innerJoin(rankings, eq(items.id, rankings.itemId))
  .orderBy(asc(rankings.rank))
  .limit(10);
```

---

## 🔧 성능 최적화

### 인덱스 전략
```sql
-- 자주 사용되는 쿼리에 대한 인덱스 생성
CREATE INDEX idx_items_featured ON items(featured);
CREATE INDEX idx_items_created_at ON items(created_at);
CREATE INDEX idx_rankings_rank ON rankings(rank);
CREATE INDEX idx_purchases_user_id ON points_purchases(user_id);
CREATE INDEX idx_purchases_status ON points_purchases(status);
```

### 쿼리 최적화 팁
1. **SELECT 최적화**: 필요한 컬럼만 선택
2. **WHERE 절 활용**: 적절한 조건으로 데이터 필터링
3. **LIMIT 사용**: 대량 데이터 조회 시 페이지네이션
4. **JOIN 최적화**: 불필요한 JOIN 제거
5. **집계 함수 사용**: 데이터베이스에서 집계 연산 수행

---

## 🔒 데이터 무결성 및 보안

### 제약조건
- **PRIMARY KEY**: 각 테이블의 고유 식별자
- **FOREIGN KEY**: 테이블 간 참조 무결성
- **NOT NULL**: 필수 필드 지정
- **DEFAULT**: 기본값 설정

### 데이터 유효성 검사
```typescript
// Zod 스키마를 사용한 유효성 검사
export const insertItemSchema = createInsertSchema(items);
export const insertProfileSchema = createInsertSchema(profiles);

// 사용 예시
const validateItem = (data: unknown) => {
  const result = insertItemSchema.safeParse(data);
  if (!result.success) {
    throw new Error('유효하지 않은 아이템 데이터');
  }
  return result.data;
};
```

### 보안 고려사항
1. **SQL 인젝션 방지**: Drizzle ORM의 prepared statements 사용
2. **데이터 검증**: 모든 입력 데이터 유효성 검사
3. **접근 제어**: 사용자별 데이터 접근 권한 관리
4. **암호화**: 민감한 데이터 암호화 저장

---

## 🔄 백업 및 복원

### 백업 전략
```bash
# SQLite 데이터베이스 백업
sqlite3 database.db ".backup backup_$(date +%Y%m%d_%H%M%S).db"

# 스키마만 백업
sqlite3 database.db ".schema" > schema_backup.sql

# 데이터만 백업
sqlite3 database.db ".dump" > full_backup.sql
```

### 복원 방법
```bash
# 전체 데이터베이스 복원
sqlite3 new_database.db < full_backup.sql

# 백업 파일에서 복원
sqlite3 database.db ".restore backup_20240101_120000.db"
```

---

## 📊 모니터링 및 성능 측정

### 쿼리 성능 분석
```sql
-- 쿼리 실행 계획 확인
EXPLAIN QUERY PLAN SELECT * FROM items WHERE featured = 1;

-- 인덱스 사용 확인
PRAGMA index_info('idx_items_featured');

-- 테이블 통계 확인
PRAGMA table_info('items');
```

### 데이터베이스 통계
```typescript
// 테이블별 레코드 수 확인
const itemCount = await db.select({ count: count() }).from(items);
const userCount = await db.select({ count: count() }).from(profiles);
const rankingCount = await db.select({ count: count() }).from(rankings);
```

---

## 🚀 향후 확장 계획

### 스키마 확장 예정
1. **chapters**: 스토리 챕터 정보
2. **user_favorites**: 사용자 즐겨찾기
3. **reviews**: 사용자 리뷰 및 평점
4. **notifications**: 알림 시스템
5. **reading_progress**: 독서 진행 상황

### 성능 개선 계획
1. **인덱스 최적화**: 쿼리 패턴 분석 후 인덱스 추가
2. **캐싱 레이어**: Redis 캐싱 도입
3. **읽기 전용 복제본**: 읽기 성능 향상
4. **파티셔닝**: 대용량 데이터 처리

---

이 문서는 데이터베이스 스키마 변경사항과 함께 지속적으로 업데이트됩니다. 새로운 테이블이나 필드가 추가될 때마다 관련 문서도 함께 갱신됩니다.