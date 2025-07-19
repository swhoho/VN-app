import { pgTable, uuid, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  username: text("username"),
  profileImageUrl: text("profile_image_url"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: text("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const items = pgTable("items", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: jsonb("tags").notNull().default("[]"), // JSON string으로 저장
  rating: text("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  canvas: boolean("canvas").notNull().default(false), // 캔버스 아이템 여부
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rankings = pgTable("rankings", {
  id: integer("id").primaryKey(),
  itemId: integer("item_id").notNull().references(() => items.id, { onDelete: 'cascade' }),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles);
export const insertItemSchema = createInsertSchema(items);
export const insertRankingSchema = createInsertSchema(rankings);

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type Ranking = typeof rankings.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;
