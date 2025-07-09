import { pgTable, serial, text, integer, boolean, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Supabase Auth's users table is in the `auth` schema. We don't define it here.
// Instead, we create a `profiles` table in the `public` schema to store app-specific user data.

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // This will be linked to auth.users.id via a foreign key constraint in the migration
  username: text("username"),
  profileImageUrl: text("profile_image_url"),
  points: integer("points").notNull().default(0),
  membershipType: text("membership_type").notNull().default("free"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: text("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  rating: text("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").notNull().references(() => items.id, { onDelete: 'cascade' }),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

export const pointsPackages = pgTable("points_packages", {
  id: serial("id").primaryKey(),
  price: text("price").notNull(),
  points: integer("points").notNull(),
  title: text("title").notNull(),
  isPopular: boolean("is_popular").default(false),
  discountPercent: integer("discount_percent").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pointsPurchases = pgTable("points_purchases", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  packageId: integer("package_id").notNull().references(() => pointsPackages.id),
  amount: text("amount").notNull(),
  points: integer("points").notNull(),
  status: text("status").notNull().default("pending"),
  paymentIntentId: text("payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
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
