import type { Item as BaseItem } from "@shared/schema";

/**
 * 클라이언트 사이드에서 사용되는 아이템 타입
 * API에서 반환될 때 tags가 JSON 파싱되어 배열로 변환됨
 */
export interface Item extends Omit<BaseItem, 'tags'> {
  tags: string[];
}

/**
 * 사용자 프로필 타입 (임시)
 */
export interface User {
  id: string;
  username?: string;
  profileImageUrl?: string;
  points: number;
  membershipType: string;
  storiesRead: number;
  chaptersRead: number;
  readingTimeHours: string;
  favoritesCount: number;
  currentStreak: number;
  updatedAt?: string;
}