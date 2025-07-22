import { supabase } from '../lib/supabase';

/**
 * Supabase를 통한 PostgreSQL 데이터 연동 서비스
 */
export class SupabaseService {
  
  /**
   * 프로필 데이터 조회
   */
  static async getProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(10);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('프로필 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 아이템 데이터 조회
   */
  static async getItems(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('아이템 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 캔버스 아이템 데이터 조회 (canvas = true인 아이템만)
   */
  static async getCanvasItems(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('canvas', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('캔버스 아이템 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 특정 아이템 상세 조회
   */
  static async getItemById(id: number) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('아이템 상세 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 랭킹 데이터 조회
   */
  static async getRankings(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('rankings')
        .select(`
          *,
          items:item_id (
            id,
            title,
            image,
            rating,
            view_count
          )
        `)
        .order('rank', { ascending: true })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('랭킹 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 아이템 좋아요 증가
   */
  static async incrementLike(itemId: number) {
    try {
      const { data, error } = await supabase.rpc('increment_like_count', {
        item_id: itemId
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('좋아요 증가 오류:', error);
      throw error;
    }
  }

  /**
   * 아이템 조회수 증가
   */
  static async incrementView(itemId: number) {
    try {
      const { data, error } = await supabase.rpc('increment_view_count', {
        item_id: itemId
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('조회수 증가 오류:', error);
      throw error;
    }
  }

  /**
   * 포인트 패키지 조회
   */
  static async getPointsPackages() {
    try {
      const { data, error } = await supabase
        .from('points_packages')
        .select('*')
        .order('points', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('포인트 패키지 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 실시간 데이터 구독 설정
   */
  static subscribeToItems(callback: (payload: any) => void) {
    return supabase
      .channel('items_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' }, 
        callback
      )
      .subscribe();
  }

  /**
   * 구독 해제
   */
  static unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription);
  }

  /**
   * 시청 로그 시작 기록
   */
  static async startPlaylog(data: {
    userId?: string;
    itemId: number;
    sessionId: string;
    deviceType?: string;
    userAgent?: string;
    revenueType?: string;
  }) {
    try {
      const { data: playlogData, error } = await supabase
        .from('playlogs')
        .insert({
          user_id: data.userId || null,
          item_id: data.itemId,
          session_id: data.sessionId,
          start_time: new Date().toISOString(),
          device_type: data.deviceType || 'web',
          user_agent: data.userAgent || navigator.userAgent,
          revenue_type: data.revenueType || 'subscription',
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      return playlogData;
    } catch (error) {
      console.error('Start playlog error:', error);
      throw error;
    }
  }

  /**
   * 시청 로그 종료 기록
   */
  static async endPlaylog(sessionId: string, data: {
    durationSeconds: number;
    currentPosition: number;
  }) {
    try {
      const { data: playlogData, error } = await supabase
        .from('playlogs')
        .update({
          end_time: new Date().toISOString(),
          duration_seconds: data.durationSeconds,
          current_position: data.currentPosition,
          is_active: false
        })
        .eq('session_id', sessionId)
        .eq('is_active', true)
        .select()
        .single();

      if (error) throw error;
      return playlogData;
    } catch (error) {
      console.error('End playlog error:', error);
      throw error;
    }
  }

  /**
   * 시청 로그 하트비트 (주기적 업데이트)
   */
  static async updatePlaylogHeartbeat(sessionId: string, data: {
    durationSeconds: number;
    currentPosition: number;
  }) {
    try {
      const { data: playlogData, error } = await supabase
        .from('playlogs')
        .update({
          duration_seconds: data.durationSeconds,
          current_position: data.currentPosition,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId)
        .eq('is_active', true)
        .select()
        .single();

      if (error) throw error;
      return playlogData;
    } catch (error) {
      console.error('Playlog heartbeat error:', error);
      throw error;
    }
  }

  /**
   * 사용자의 시청 통계 조회
   */
  static async getUserWatchStats(userId: string) {
    try {
      const { data, error } = await supabase
        .from('playlogs')
        .select(`
          *,
          items:item_id (
            id,
            title,
            image
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('User watch stats error:', error);
      throw error;
    }
  }

  /**
   * 작품별 시청 통계 조회 (소유주용)
   */
  static async getItemWatchStats(itemId: number) {
    try {
      const { data, error } = await supabase
        .from('playlogs')
        .select('*')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Item watch stats error:', error);
      throw error;
    }
  }

  /**
   * 월별 정산 데이터 조회
   */
  static async getMonthlySettlement(ownerId: string, year: number, month: number) {
    try {
      const { data, error } = await supabase
        .from('revenue_settlements')
        .select('*')
        .eq('owner_id', ownerId)
        .eq('settlement_year', year)
        .eq('settlement_month', month)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116은 데이터 없음
      return data;
    } catch (error) {
      console.error('Monthly settlement data error:', error);
      throw error;
    }
  }
}
