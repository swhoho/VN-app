CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" text DEFAULT '0' NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "points_packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"price" text NOT NULL,
	"points" integer NOT NULL,
	"title" text NOT NULL,
	"is_popular" boolean DEFAULT false,
	"discount_percent" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "points_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"package_id" integer NOT NULL,
	"amount" text NOT NULL,
	"points" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"payment_intent_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"rank" integer NOT NULL,
	"previous_rank" integer,
	"weekly_views" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"password" text,
	"email" text,
	"provider" text,
	"provider_id" text,
	"profile_image_url" text,
	"points" integer DEFAULT 0 NOT NULL,
	"membership_type" text DEFAULT 'free' NOT NULL,
	"stories_read" integer DEFAULT 0 NOT NULL,
	"chapters_read" integer DEFAULT 0 NOT NULL,
	"reading_time_hours" text DEFAULT '0' NOT NULL,
	"favorites_count" integer DEFAULT 0 NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
