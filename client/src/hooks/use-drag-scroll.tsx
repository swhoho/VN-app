import { useState, useCallback, useRef } from 'react';

/**
 * 드래그 스크롤 기능을 제공하는 커스텀 훅
 * 마우스와 터치 이벤트를 통한 수평 스크롤 기능을 구현
 */
export function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // 드래그 감도 상수
  const MOUSE_SENSITIVITY = 0.8;
  const TOUCH_SENSITIVITY = 0.6;
  const MOVEMENT_THRESHOLD = 2;
  const RESET_DELAY = 100;

  /**
   * 드래그 시작 처리 (마우스/터치 공통 로직)
   */
  const startDrag = useCallback((clientX: number) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  /**
   * 드래그 이동 처리 (마우스/터치 공통 로직)
   */
  const handleDrag = useCallback((clientX: number, sensitivity: number) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * sensitivity;
    
    if (Math.abs(walk) > MOVEMENT_THRESHOLD) {
      setHasMoved(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft, MOVEMENT_THRESHOLD]);

  /**
   * 드래그 종료 처리
   */
  const endDrag = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      setHasMoved(false);
    }, RESET_DELAY);
  }, [RESET_DELAY]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    startDrag(e.pageX);
  }, [startDrag]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleDrag(e.pageX, MOUSE_SENSITIVITY);
  }, [isDragging, handleDrag, MOUSE_SENSITIVITY]);

  const handleMouseUp = useCallback(() => {
    endDrag();
  }, [endDrag]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startDrag(e.touches[0].pageX);
  }, [startDrag]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleDrag(e.touches[0].pageX, TOUCH_SENSITIVITY);
  }, [isDragging, handleDrag, TOUCH_SENSITIVITY]);

  const handleTouchEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  return {
    // Ref와 상태
    scrollRef,
    isDragging,
    hasMoved,
    
    // 이벤트 핸들러
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}