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
}
