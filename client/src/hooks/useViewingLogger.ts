import { useCallback, useEffect, useRef, useState } from 'react';
import { SupabaseService } from '../services/supabaseService';

interface ViewingLoggerOptions {
  itemId: number;
  userId?: string;
  revenueType?: 'subscription' | 'pay_per_view';
}

/**
 * Custom hook for viewing log collection
 * 시청 로그 수집을 위한 커스텀 훅
 */
export const useViewingLogger = (options: ViewingLoggerOptions) => {
  const { itemId, userId, revenueType = 'subscription' } = options;
  
  const [sessionId] = useState(() => 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [isLogging, setIsLogging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(true);

  /**
   * 디바이스 타입 감지
   */
  const getDeviceType = useCallback(() => {
    const userAgent = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'mobile';
    } else if (/iPad/i.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  }, []);

  /**
   * Start viewing log
   * 시청 시작 로그
   */
  const startViewing = useCallback(async () => {
    if (isLogging) return;

    try {
      const now = new Date();
      setStartTime(now);
      setIsLogging(true);
      
      await SupabaseService.startPlaylog({
        userId,
        itemId,
        sessionId,
        deviceType: getDeviceType(),
        userAgent: navigator.userAgent,
        revenueType,
      });

      // 1분마다 하트비트 전송
      heartbeatIntervalRef.current = setInterval(async () => {
        if (isActiveRef.current && startTime) {
          const durationSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
          try {
            await SupabaseService.updatePlaylogHeartbeat(sessionId, {
              durationSeconds,
              currentPosition,
            });
          } catch (error) {
            console.error('Heartbeat failed:', error);
          }
        }
      }, 60000); // 60초마다

      console.log('Viewing started:', sessionId);
    } catch (error) {
      console.error('Viewing log start failed:', error);
      setIsLogging(false);
    }
  }, [itemId, userId, sessionId, revenueType, getDeviceType, isLogging, startTime, currentPosition]);

  /**
   * End viewing log
   * 시청 종료 로그
   */
  const endViewing = useCallback(async () => {
    if (!isLogging || !startTime) return;

    try {
      const durationSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      
      await SupabaseService.endPlaylog(sessionId, {
        durationSeconds,
        currentPosition,
      });

      // 하트비트 중지
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
        heartbeatIntervalRef.current = null;
      }

      setIsLogging(false);
      console.log('Viewing ended:', sessionId, `${durationSeconds}s`);
    } catch (error) {
      console.error('Viewing log end failed:', error);
    }
  }, [sessionId, currentPosition, startTime, isLogging]);

  /**
   * Update current position
   * 현재 위치 업데이트
   */
  const updatePosition = useCallback((position: number) => {
    setCurrentPosition(position);
  }, []);

  /**
   * Handle focus/active state changes
   * 포커스/활성 상태 변경 처리
   */
  const handleVisibilityChange = useCallback(() => {
    isActiveRef.current = !document.hidden;
  }, []);

  /**
   * End log on page unload
   * 페이지 언로드 시 로그 종료
   */
  const handleBeforeUnload = useCallback(() => {
    if (isLogging) {
      // 동기적으로 처리해야 함 (비동기는 페이지 종료 시 실행되지 않을 수 있음)
      navigator.sendBeacon('/api/logs/end', JSON.stringify({
        sessionId,
        timestamp: new Date().toISOString(),
        durationSeconds: startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0,
        currentPosition,
      }));
    }
  }, [sessionId, startTime, currentPosition, isLogging]);

  // 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleVisibilityChange, handleBeforeUnload]);

  // 컴포넌트 언마운트 시 로깅 종료
  useEffect(() => {
    return () => {
      if (isLogging) {
        endViewing();
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [isLogging, endViewing]);

  return {
    sessionId,
    isLogging,
    startViewing,
    endViewing,
    updatePosition,
    currentPosition,
  };
};