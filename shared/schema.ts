import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  points: integer("points").notNull().default(0),
  membershipType: text("membership_type").notNull().default("free"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: decimal("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
});

export const novels = pgTable("novels", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  genre: text("genre").notNull(),
  coverImage: text("cover_image").notNull(),
  rating: decimal("rating").notNull().default("0"),
  totalChapters: integer("total_chapters").notNull(),
  availableChapters: integer("available_chapters").notNull(),
  status: text("status").notNull().default("ongoing"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  isPremium: boolean("is_premium").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
});

export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  novelId: integer("novel_id").notNull(),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertNovelSchema = createInsertSchema(novels).omit({
  id: true,
});

export const insertRankingSchema = createInsertSchema(rankings).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNovel = z.infer<typeof insertNovelSchema>;
export type Novel = typeof novels.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;
export type Ranking = typeof rankings.$inferSelect;
