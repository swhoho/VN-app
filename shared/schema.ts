import { sqliteTable, integer, text, blob } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  username: text("username"),
  profileImageUrl: text("profile_image_url"),
  points: integer("points").notNull().default(0),
  membershipType: text("membership_type").notNull().default("free"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: text("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").notNull().default("[]"), // JSON string으로 저장
  rating: text("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const rankings = sqliteTable("rankings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: integer("item_id").notNull().references(() => items.id, { onDelete: 'cascade' }),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

export const pointsPackages = sqliteTable("points_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  price: text("price").notNull(),
  points: integer("points").notNull(),
  title: text("title").notNull(),
  isPopular: integer("is_popular", { mode: "boolean" }).default(false),
  discountPercent: integer("discount_percent").default(0),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const pointsPurchases = sqliteTable("points_purchases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  packageId: integer("package_id").notNull().references(() => pointsPackages.id),
  amount: text("amount").notNull(),
  points: integer("points").notNull(),
  status: text("status").notNull().default("pending"),
  paymentIntentId: text("payment_intent_id"),
  createdAt: text("created_at").default(new Date().toISOString()),
});

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles);
export const insertItemSchema = createInsertSchema(items);
export const insertRankingSchema = createInsertSchema(rankings);
export const insertPointsPackageSchema = createInsertSchema(pointsPackages);
export const insertPointsPurchaseSchema = createInsertSchema(pointsPurchases);

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type Ranking = typeof rankings.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;
export type PointsPackage = typeof pointsPackages.$inferSelect;
export type InsertPointsPackage = z.infer<typeof insertPointsPackageSchema>;
export type PointsPurchase = typeof pointsPurchases.$inferSelect;
export type InsertPointsPurchase = z.infer<typeof insertPointsPurchaseSchema>;
