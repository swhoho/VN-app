-- 정산 시스템 설정을 위한 데이터베이스 업데이트
-- 1. Items 테이블에 owner_id 컬럼 추가 (profiles.id가 TEXT 타입이므로 TEXT로 설정)
ALTER TABLE items ADD COLUMN IF NOT EXISTS owner_id TEXT REFERENCES profiles(id) ON DELETE CASCADE;

-- 2. 모든 기존 작품에 소유주 설정 (id = 4563945b-92c3-44b8-9fdd-4f7981d0f482)
UPDATE items 
SET owner_id = '4563945b-92c3-44b8-9fdd-4f7981d0f482'
WHERE owner_id IS NULL;

-- 3. Playlogs 테이블 생성 (시청 로그 수집용)
CREATE TABLE IF NOT EXISTS playlogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  duration_seconds INTEGER DEFAULT 0,
  current_position INTEGER DEFAULT 0,
  device_type TEXT,
  ip_address TEXT,
  user_agent TEXT,
  revenue_type TEXT NOT NULL DEFAULT 'subscription', -- 'subscription' | 'pay_per_view'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Playlogs 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_playlogs_item_id ON playlogs(item_id);
CREATE INDEX IF NOT EXISTS idx_playlogs_user_id ON playlogs(user_id);
CREATE INDEX IF NOT EXISTS idx_playlogs_session_id ON playlogs(session_id);
CREATE INDEX IF NOT EXISTS idx_playlogs_created_at ON playlogs(created_at);
CREATE INDEX IF NOT EXISTS idx_playlogs_revenue_type ON playlogs(revenue_type);

-- 5. 정산 집계 테이블 생성 (월별 정산용)
CREATE TABLE IF NOT EXISTS revenue_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  settlement_year INTEGER NOT NULL,
  settlement_month INTEGER NOT NULL,
  total_watch_time_seconds INTEGER NOT NULL DEFAULT 0,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_users INTEGER NOT NULL DEFAULT 0,
  subscription_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  pay_per_view_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  settlement_rate DECIMAL(5,2) NOT NULL DEFAULT 70.00, -- 70% 정산율
  settlement_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'paid'
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(owner_id, settlement_year, settlement_month)
);

-- 6. Revenue settlements 인덱스
CREATE INDEX IF NOT EXISTS idx_revenue_settlements_owner_id ON revenue_settlements(owner_id);
CREATE INDEX IF NOT EXISTS idx_revenue_settlements_status ON revenue_settlements(status);
CREATE INDEX IF NOT EXISTS idx_revenue_settlements_period ON revenue_settlements(settlement_year, settlement_month);

-- 7. 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. 업데이트 트리거 적용
CREATE TRIGGER update_playlogs_updated_at 
  BEFORE UPDATE ON playlogs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_revenue_settlements_updated_at 
  BEFORE UPDATE ON revenue_settlements 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. 월별 정산 집계 함수 (배치 작업용)
CREATE OR REPLACE FUNCTION calculate_monthly_settlement(
  target_year INTEGER,
  target_month INTEGER
) RETURNS VOID AS $$
DECLARE
  owner_record RECORD;
BEGIN
  -- 각 소유주별로 월별 정산 계산
  FOR owner_record IN 
    SELECT DISTINCT i.owner_id
    FROM items i
    JOIN playlogs pl ON i.id = pl.item_id
    WHERE EXTRACT(YEAR FROM pl.created_at) = target_year
      AND EXTRACT(MONTH FROM pl.created_at) = target_month
      AND i.owner_id IS NOT NULL
  LOOP
    -- 기존 정산 데이터 삭제 후 재계산
    DELETE FROM revenue_settlements 
    WHERE owner_id = owner_record.owner_id 
      AND settlement_year = target_year 
      AND settlement_month = target_month;
    
    -- 새 정산 데이터 삽입
    INSERT INTO revenue_settlements (
      owner_id,
      settlement_year,
      settlement_month,
      total_watch_time_seconds,
      total_sessions,
      total_users,
      subscription_revenue,
      pay_per_view_revenue,
      total_revenue,
      settlement_amount
    )
    SELECT 
      owner_record.owner_id,
      target_year,
      target_month,
      COALESCE(SUM(pl.duration_seconds), 0) as total_watch_time_seconds,
      COUNT(DISTINCT pl.session_id) as total_sessions,
      COUNT(DISTINCT pl.user_id) as total_users,
      0 as subscription_revenue, -- 구독 수익은 별도 계산 필요
      0 as pay_per_view_revenue, -- 개별 구매 수익은 별도 계산 필요
      0 as total_revenue,
      0 as settlement_amount
    FROM items i
    JOIN playlogs pl ON i.id = pl.item_id
    WHERE i.owner_id = owner_record.owner_id
      AND EXTRACT(YEAR FROM pl.created_at) = target_year
      AND EXTRACT(MONTH FROM pl.created_at) = target_month;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 10. RLS (Row Level Security) 정책 설정
ALTER TABLE playlogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_settlements ENABLE ROW LEVEL SECURITY;

-- 유저는 자신의 플레이로그만 조회 가능
CREATE POLICY "Users can view their own playlogs" ON playlogs
  FOR SELECT USING (auth.uid()::text = user_id);

-- 소유주는 자신의 작품 플레이로그 조회 가능
CREATE POLICY "Owners can view their content playlogs" ON playlogs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM items 
      WHERE items.id = playlogs.item_id 
        AND items.owner_id = auth.uid()::text
    )
  );

-- 소유주는 자신의 정산 내역만 조회 가능
CREATE POLICY "Owners can view their own settlements" ON revenue_settlements
  FOR SELECT USING (auth.uid()::text = owner_id);