import { users, items, rankings, type User, type InsertUser, type Item, type InsertItem, type Ranking, type InsertRanking } from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or, sql, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByProviderId(provider: string, providerId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Item methods
  getAllItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  getItemsByTag(tag: string): Promise<Item[]>;
  getFeaturedItems(): Promise<Item[]>;
  createItem(item: InsertItem): Promise<Item>;

  // Ranking methods
  getRankings(): Promise<(Ranking & { item: Item })[]>;
  updateRanking(itemId: number, rank: number, weeklyViews: number): Promise<void>;
  
  // Search methods
  searchItems(query: string): Promise<Item[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByProviderId(provider: string, providerId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(
      and(eq(users.provider, provider), eq(users.providerId, providerId))
    );
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllItems(): Promise<Item[]> {
    return await db.select().from(items);
  }

  async getItem(id: number): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item || undefined;
  }

  async getItemsByTag(tag: string): Promise<Item[]> {
    return await db.select().from(items).where(eq(items.tags, [tag]));
  }

  async getFeaturedItems(): Promise<Item[]> {
    try {
      return await db.select().from(items).where(eq(items.featured, true));
    } catch (error) {
      console.error("Error fetching featured items:", error);
      throw error;
    }
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [item] = await db
      .insert(items)
      .values(insertItem)
      .returning();
    return item;
  }

  async getRankings(): Promise<(Ranking & { item: Item })[]> {
    // 조회수 기반으로 상위 10개 아이템을 가져와서 랭킹 생성
    const topItems = await db
      .select()
      .from(items)
      .orderBy(desc(items.viewCount))
      .limit(10);

    // 각 아이템에 대해 랭킹 정보 생성 (실제 랭킹 테이블이 없어도 동적 생성)
    return topItems.map((item, index) => ({
      id: index + 1,
      itemId: item.id,
      rank: index + 1,
      previousRank: index + 1, // 임시로 현재 랭킹과 동일하게 설정
      weeklyViews: item.viewCount,
      item: item
    }));
  }

  async updateRanking(itemId: number, rank: number, weeklyViews: number): Promise<void> {
    const [existingRanking] = await db
      .select()
      .from(rankings)
      .where(eq(rankings.itemId, itemId));

    if (existingRanking) {
      await db
        .update(rankings)
        .set({
          previousRank: existingRanking.rank,
          rank,
          weeklyViews
        })
        .where(eq(rankings.itemId, itemId));
    }
  }

  async searchItems(query: string): Promise<Item[]> {
    try {
      if (!query.trim()) {
        return [];
      }

      const searchTerm = `%${query.toLowerCase()}%`;
      
      // 한국어 번역 매핑
      const koTranslations: Record<string, string> = {
        "가을": "autumn",
        "몽상": "reverie", 
        "꿈": "dream",
        "붉은": "crimson",
        "크림슨": "crimson",
        "후광": "halo",
        "헤일로": "halo",
        "세라프": "seraph",
        "끝": "edge",
        "네온": "neon",
        "그림자": "shadow",
        "황실": "royal",
        "반역": "rebel",
        "죄수": "prisoner",
        "탐정": "detective",
        "악마": "demon",
        "군주": "lord",
        "마법": "magic",
        "아카데미": "academy",
        "클럽": "club",
        "연결": "connection",
        "황혼": "twilight",
        "고백": "confession",
        "새벽": "dawn",
        "저항": "stand",
        "석양": "dusk",
        "전투": "battle",
        "햇살": "sunlit",
        "페이지": "pages",
        "문학부": "literature",
        "연대기": "chronicles",
        "동아리방": "clubroom",
        "유대": "bonds"
      };

      // 검색어가 한국어인 경우 영어로도 검색
      const searchTerms = [searchTerm];
      const lowerQuery = query.toLowerCase();
      
      // 한국어 키워드가 포함된 경우 해당 영어 번역도 추가
      Object.entries(koTranslations).forEach(([ko, en]) => {
        if (lowerQuery.includes(ko)) {
          searchTerms.push(`%${en}%`);
        }
      });

      // 영어 키워드가 포함된 경우 해당 한국어 번역도 추가  
      Object.entries(koTranslations).forEach(([ko, en]) => {
        if (lowerQuery.includes(en)) {
          searchTerms.push(`%${ko}%`);
        }
      });

      // 향상된 검색 로직: 다국어 지원 및 부분 검색
      const allConditions = [];
      
      // 각 검색어에 대해 제목, 설명, 태그에서 검색
      for (const term of searchTerms) {
        allConditions.push(
          ilike(items.title, term),
          ilike(items.description, term)
        );
      }

      const result = await db
        .select()
        .from(items)
        .where(or(...allConditions))
        .orderBy(desc(items.viewCount))
        .limit(20);
      
      console.log(`Search for "${query}" returned ${result.length} items`);
      return result;
    } catch (error) {
      console.error("Database search error:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
