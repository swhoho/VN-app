-- Create all tables first
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text,
	"profile_image_url" text,
	"points" integer DEFAULT 0 NOT NULL,
	"membership_type" text DEFAULT 'free' NOT NULL,
	"stories_read" integer DEFAULT 0 NOT NULL,
	"chapters_read" integer DEFAULT 0 NOT NULL,
	"reading_time_hours" text DEFAULT '0' NOT NULL,
	"favorites_count" integer DEFAULT 0 NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now()
);

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

CREATE TABLE "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"rank" integer NOT NULL,
	"previous_rank" integer,
	"weekly_views" integer DEFAULT 0 NOT NULL
);

CREATE TABLE "points_packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"price" text NOT NULL,
	"points" integer NOT NULL,
	"title" text NOT NULL,
	"is_popular" boolean DEFAULT false,
	"discount_percent" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "points_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"package_id" integer NOT NULL,
	"amount" text NOT NULL,
	"points" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"payment_intent_id" text,
	"created_at" timestamp DEFAULT now()
);

-- Add foreign key constraints
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade;
--> statement-breakpoint
ALTER TABLE "points_purchases" ADD CONSTRAINT "points_purchases_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "points_purchases" ADD CONSTRAINT "points_purchases_package_id_points_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."points_packages"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;
