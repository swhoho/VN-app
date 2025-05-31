import { users, items, rankings, type User, type InsertUser, type Item, type InsertItem, type Ranking, type InsertRanking } from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
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
    return await db.select().from(items).where(eq(items.featured, true));
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
    if (!query.trim()) {
      return [];
    }

    const searchTerm = `%${query.toLowerCase()}%`;
    
    return await db
      .select()
      .from(items)
      .where(
        or(
          ilike(items.title, searchTerm),
          ilike(items.description, searchTerm)
        )
      )
      .orderBy(desc(items.viewCount))
      .limit(20);
  }
}

export const storage = new DatabaseStorage();
