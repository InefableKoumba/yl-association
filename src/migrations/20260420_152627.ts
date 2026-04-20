import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_domains_trainings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_order_idx\` ON \`training_domains_trainings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_parent_id_idx\` ON \`training_domains_trainings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_domains_trainings_locales\` (
  	\`name\` text,
  	\`short_description\` text,
  	\`long_description\` text,
  	\`price\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_domains_trainings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`training_domains_trainings_locales_locale_parent_id_unique\` ON \`training_domains_trainings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_domains\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`training_domains_image_idx\` ON \`training_domains\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`training_domains_updated_at_idx\` ON \`training_domains\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`training_domains_created_at_idx\` ON \`training_domains\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`training_domains_locales\` (
  	\`name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`training_domains_locales_locale_parent_id_unique\` ON \`training_domains_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`website_url\` text,
  	\`logo_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`partners_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`partners_locales_locale_parent_id_unique\` ON \`partners_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`faq\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_updated_at_idx\` ON \`faq\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_created_at_idx\` ON \`faq\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faq_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faq_locales_locale_parent_id_unique\` ON \`faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`status\` text DEFAULT 'upcoming' NOT NULL,
  	\`date\` text NOT NULL,
  	\`time\` text NOT NULL,
  	\`image_id\` integer,
  	\`registration_link\` text DEFAULT '#',
  	\`is_registration_available\` integer DEFAULT true,
  	\`maximum_participants\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_image_idx\` ON \`programs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_updated_at_idx\` ON \`programs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`programs_created_at_idx\` ON \`programs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`programs_locales\` (
  	\`title\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`long_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`programs_locales_locale_parent_id_unique\` ON \`programs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`training_domains_id\` integer,
  	\`partners_id\` integer,
  	\`faq_id\` integer,
  	\`programs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_domains_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programs_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_domains_id_idx\` ON \`payload_locked_documents_rels\` (\`training_domains_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programs_id_idx\` ON \`payload_locked_documents_rels\` (\`programs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_hero_section_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_images_order_idx\` ON \`home_page_hero_section_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_images_parent_id_idx\` ON \`home_page_hero_section_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_images_hero_image_idx\` ON \`home_page_hero_section_hero_images\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_hero_section_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`icon\` text DEFAULT 'users' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_stats_order_idx\` ON \`home_page_hero_section_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_stats_parent_id_idx\` ON \`home_page_hero_section_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_hero_section_hero_stats_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_hero_section_hero_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_hero_section_hero_stats_locales_locale_parent_id_u\` ON \`home_page_hero_section_hero_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_mission_vision_section_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_mission_vision_section_values_order_idx\` ON \`home_page_mission_vision_section_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_mission_vision_section_values_parent_id_idx\` ON \`home_page_mission_vision_section_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_mission_vision_section_values_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_mission_vision_section_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_mission_vision_section_values_locales_locale_paren\` ON \`home_page_mission_vision_section_values_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_about_us_section_about_us_section_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`alt\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_about_us_section_images_order_idx\` ON \`home_page_about_us_section_about_us_section_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_about_us_section_images_parent_id_idx\` ON \`home_page_about_us_section_about_us_section_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_about_us_section_images_image_idx\` ON \`home_page_about_us_section_about_us_section_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_stats_section_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_stats_section_stats_order_idx\` ON \`home_page_stats_section_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_stats_section_stats_parent_id_idx\` ON \`home_page_stats_section_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_stats_section_stats_icon_idx\` ON \`home_page_stats_section_stats\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_stats_section_stats_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_stats_section_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_stats_section_stats_locales_locale_parent_id_uniqu\` ON \`home_page_stats_section_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_testimonials_section_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_id\` integer,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_section_testimonials_order_idx\` ON \`home_page_testimonials_section_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_section_testimonials_parent_id_idx\` ON \`home_page_testimonials_section_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_section_testimonials_photo_idx\` ON \`home_page_testimonials_section_testimonials\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_testimonials_section_testimonials_locales\` (
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_testimonials_section_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_testimonials_section_testimonials_locales_locale_p\` ON \`home_page_testimonials_section_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_section_hero_primary_button_link\` text DEFAULT '/contact',
  	\`hero_section_hero_secondary_button_link\` text DEFAULT '/about',
  	\`about_us_section_about_us_section_button_link\` text DEFAULT '/about',
  	\`stats_section_stats_section_enabled\` integer DEFAULT true,
  	\`partners_section_show_all_partners_link\` integer DEFAULT true,
  	\`trainings_section_trainings_section_button_link\` text DEFAULT '/formations',
  	\`testimonials_section_testimonials_section_enabled\` integer DEFAULT true,
  	\`faq_section_faq_section_button_link\` text DEFAULT '/faq',
  	\`contact_section_contact_us_section_image_id\` integer,
  	\`contact_section_contact_us_section_button_link\` text DEFAULT '/contact',
  	\`seo_og_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`contact_section_contact_us_section_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_contact_section_contact_section_contact_us_sec_idx\` ON \`home_page\` (\`contact_section_contact_us_section_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_seo_seo_og_image_idx\` ON \`home_page\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_locales\` (
  	\`hero_section_hero_title\` text,
  	\`hero_section_hero_subtitle\` text,
  	\`hero_section_hero_description\` text,
  	\`hero_section_hero_primary_button_text\` text DEFAULT 'S''inscrire',
  	\`hero_section_hero_secondary_button_text\` text DEFAULT 'En savoir plus',
  	\`mission_vision_section_mission_title\` text DEFAULT 'Notre Mission',
  	\`mission_vision_section_mission_heading\` text DEFAULT 'Former la prochaine génération de leaders',
  	\`mission_vision_section_mission_description\` text DEFAULT 'Notre mission est de développer le potentiel de leadership des jeunes talents à travers des formations innovantes, du mentorat personnalisé et des opportunités de mise en pratique concrètes.',
  	\`mission_vision_section_mission_description2\` text DEFAULT 'Nous nous engageons à créer un environnement favorable à l''apprentissage, l''échange et la croissance personnelle, où chacun peut développer les compétences nécessaires pour avoir un impact positif dans sa communauté et sa carrière.',
  	\`mission_vision_section_vision_title\` text DEFAULT 'Notre Vision',
  	\`mission_vision_section_vision_heading\` text DEFAULT 'Un monde où chaque jeune peut réaliser son plein potentiel',
  	\`mission_vision_section_vision_description\` text DEFAULT 'Nous aspirons à créer une société où chaque jeune, indépendamment de son origine ou de son parcours, a accès aux ressources, aux formations et au soutien nécessaires pour développer ses compétences en leadership et contribuer positivement à un avenir durable et équitable.',
  	\`mission_vision_section_values_title\` text DEFAULT 'Nos Valeurs Fondamentales',
  	\`about_us_section_about_us_section_title\` text DEFAULT 'À propos de nous',
  	\`about_us_section_about_us_section_subtitle\` text,
  	\`about_us_section_about_us_section_description\` text,
  	\`about_us_section_about_us_section_button_text\` text DEFAULT 'En savoir plus',
  	\`stats_section_stats_section_title\` text DEFAULT 'Nos chiffres',
  	\`stats_section_stats_section_description\` text,
  	\`partners_section_our_partners_section_title\` text DEFAULT 'Nos partenaires',
  	\`partners_section_our_partners_section_description\` text,
  	\`partners_section_all_partners_link_text\` text DEFAULT 'Voir tous nos partenaires',
  	\`trainings_section_our_trainings_section_title\` text DEFAULT 'Nos formations',
  	\`trainings_section_our_trainings_section_description\` text,
  	\`trainings_section_trainings_section_button_text\` text DEFAULT 'Voir toutes nos formations',
  	\`testimonials_section_testimonials_section_title\` text DEFAULT 'Ce que disent nos étudiants',
  	\`testimonials_section_testimonials_section_description\` text,
  	\`faq_section_faq_section_title\` text DEFAULT 'FAQ',
  	\`faq_section_faq_section_description\` text,
  	\`faq_section_faq_section_button_text\` text DEFAULT 'Voir toutes les questions',
  	\`contact_section_contact_us_section_title\` text DEFAULT 'Nous contacter',
  	\`contact_section_contact_us_section_description\` text,
  	\`contact_section_contact_us_section_button_text\` text DEFAULT 'Nous contacter',
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_locales_locale_parent_id_unique\` ON \`home_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`partners_id\` integer,
  	\`training_domains_id\` integer,
  	\`faq_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_domains_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_partners_id_idx\` ON \`home_page_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_training_domains_id_idx\` ON \`home_page_rels\` (\`training_domains_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_faq_id_idx\` ON \`home_page_rels\` (\`faq_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_about_us_gallery_section_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_about_us_gallery_section_images_order_idx\` ON \`about_page_about_us_gallery_section_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_about_us_gallery_section_images_parent_id_idx\` ON \`about_page_about_us_gallery_section_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_about_us_gallery_section_images_image_idx\` ON \`about_page_about_us_gallery_section_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_hero_image_idx\` ON \`about_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_locales\` (
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_button_text\` text DEFAULT 'Je veux m''inscrire',
  	\`about_us_section_title\` text DEFAULT 'A propos de ',
  	\`about_us_section_description\` text,
  	\`about_us_gallery_section_title\` text DEFAULT 'Gallérie photos',
  	\`about_us_gallery_section_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_page_locales_locale_parent_id_unique\` ON \`about_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`trainings_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`trainings_page_hero_image_idx\` ON \`trainings_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`trainings_page_locales\` (
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_button_text\` text DEFAULT 'Je veux m''inscrire',
  	\`trainings_section_title\` text DEFAULT 'Nos formations',
  	\`trainings_section_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`trainings_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`trainings_page_locales_locale_parent_id_unique\` ON \`trainings_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page_hero_image_idx\` ON \`contact_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page_locales\` (
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contact_page_locales_locale_parent_id_unique\` ON \`contact_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`faq_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_page_hero_image_idx\` ON \`faq_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`faq_page_locales\` (
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_button_text\` text DEFAULT 'Je veux m''inscrire',
  	\`faq_section_title\` text DEFAULT 'Foire aux questions',
  	\`faq_section_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`faq_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faq_page_locales_locale_parent_id_unique\` ON \`faq_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_page_hero_image_idx\` ON \`programs_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_page_locales\` (
  	\`hero_title\` text DEFAULT 'Nos Programmes',
  	\`hero_description\` text DEFAULT 'Découvrez nos programmes et rejoignez notre communauté de jeunes leaders',
  	\`upcoming_programs_section_title\` text DEFAULT 'Programmes à venir',
  	\`past_programs_section_title\` text DEFAULT 'Programmes passés',
  	\`cta_section_title\` text DEFAULT 'Vous souhaitez proposer un programme ou devenir intervenant?',
  	\`cta_section_description\` text DEFAULT 'Nous sommes toujours à la recherche de nouvelles idées et de nouveaux talents pour enrichir notre communauté. Si vous avez une idée de programme ou si vous souhaitez partager votre expertise, n''hésitez pas à nous contacter.',
  	\`propose_program_button_text\` text DEFAULT 'Proposer un programme',
  	\`become_speaker_button_text\` text DEFAULT 'Devenir intervenant',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`programs_page_locales_locale_parent_id_unique\` ON \`programs_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`donation_external_url\` text DEFAULT 'https://partner-donation-site.com' NOT NULL,
  	\`social_links_facebook\` text,
  	\`social_links_instagram\` text,
  	\`social_links_linkedin\` text,
  	\`social_links_youtube\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`training_domains_trainings\`;`)
  await db.run(sql`DROP TABLE \`training_domains_trainings_locales\`;`)
  await db.run(sql`DROP TABLE \`training_domains\`;`)
  await db.run(sql`DROP TABLE \`training_domains_locales\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`partners_locales\`;`)
  await db.run(sql`DROP TABLE \`faq\`;`)
  await db.run(sql`DROP TABLE \`faq_locales\`;`)
  await db.run(sql`DROP TABLE \`programs\`;`)
  await db.run(sql`DROP TABLE \`programs_locales\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_section_hero_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_section_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_section_hero_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_mission_vision_section_values\`;`)
  await db.run(sql`DROP TABLE \`home_page_mission_vision_section_values_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_about_us_section_about_us_section_images\`;`)
  await db.run(sql`DROP TABLE \`home_page_stats_section_stats\`;`)
  await db.run(sql`DROP TABLE \`home_page_stats_section_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_testimonials_section_testimonials\`;`)
  await db.run(sql`DROP TABLE \`home_page_testimonials_section_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`about_page_about_us_gallery_section_images\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`about_page_locales\`;`)
  await db.run(sql`DROP TABLE \`trainings_page\`;`)
  await db.run(sql`DROP TABLE \`trainings_page_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`contact_page_locales\`;`)
  await db.run(sql`DROP TABLE \`faq_page\`;`)
  await db.run(sql`DROP TABLE \`faq_page_locales\`;`)
  await db.run(sql`DROP TABLE \`programs_page\`;`)
  await db.run(sql`DROP TABLE \`programs_page_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
