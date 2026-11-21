import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // NOTE: existing blog posts are migrated as "published" so they stay visible
  // after drafts were enabled on the blog collection.
  await db.run(sql`CREATE TABLE \`_blog_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_featured_image_id\` integer,
  	\`version_slug\` text,
  	\`version_author\` text DEFAULT 'Young Leaders',
  	\`version_published_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_v_parent_idx\` ON \`_blog_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_featured_image_idx\` ON \`_blog_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_slug_idx\` ON \`_blog_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_updated_at_idx\` ON \`_blog_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version_created_at_idx\` ON \`_blog_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_version_version__status_idx\` ON \`_blog_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_created_at_idx\` ON \`_blog_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_updated_at_idx\` ON \`_blog_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_snapshot_idx\` ON \`_blog_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_published_locale_idx\` ON \`_blog_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_latest_idx\` ON \`_blog_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_autosave_idx\` ON \`_blog_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_blog_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_v_locales_locale_parent_id_unique\` ON \`_blog_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_v_locales_parent_id_idx\` ON \`_blog_v_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`programs_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`programs_gallery_order_idx\` ON \`programs_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`programs_gallery_parent_id_idx\` ON \`programs_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_gallery_image_idx\` ON \`programs_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`training_domains_trainings_learning_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_domains_trainings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_learning_points_order_idx\` ON \`training_domains_trainings_learning_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_learning_points_parent_id_idx\` ON \`training_domains_trainings_learning_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`training_domains_trainings_learning_points_locales\` (
  	\`point\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`training_domains_trainings_learning_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`training_domains_trainings_learning_points_locales_locale_pa\` ON \`training_domains_trainings_learning_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_learning_points_locales_paren_idx\` ON \`training_domains_trainings_learning_points_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`show_in_footer\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text NOT NULL,
  	\`intro\` text,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_parent_id_idx\` ON \`pages_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_about_us_section_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT 'target',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_highlights_order_idx\` ON \`home_page_about_us_section_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_highlights_parent_id_idx\` ON \`home_page_about_us_section_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_about_us_section_highlights_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_about_us_section_highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_about_us_section_highlights_locales_locale_parent_\` ON \`home_page_about_us_section_highlights_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_us_section_highlights_locales_parent_id_idx\` ON \`home_page_about_us_section_highlights_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_page_hero_image_idx\` ON \`blog_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_page_locales\` (
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_page_locales_locale_parent_id_unique\` ON \`blog_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_page_locales_parent_id_idx\` ON \`blog_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_blog\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`featured_image_id\` integer,
  	\`slug\` text,
  	\`author\` text DEFAULT 'Young Leaders',
  	\`published_date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog\`("id", "featured_image_id", "slug", "author", "published_date", "updated_at", "created_at", "_status") SELECT "id", "featured_image_id", "slug", "author", "published_date", "updated_at", "created_at", 'published' FROM \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog\` RENAME TO \`blog\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`blog_featured_image_idx\` ON \`blog\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_slug_idx\` ON \`blog\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_updated_at_idx\` ON \`blog\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_created_at_idx\` ON \`blog\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`blog__status_idx\` ON \`blog\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_blog_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog_locales\`("title", "excerpt", "content", "id", "_locale", "_parent_id") SELECT "title", "excerpt", "content", "id", "_locale", "_parent_id" FROM \`blog_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog_locales\` RENAME TO \`blog_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_locales_locale_parent_id_unique\` ON \`blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_locales_parent_id_idx\` ON \`blog_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'admin' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` ADD \`duration\` text;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` ADD \`participants\` text;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` ADD \`next_session\` text;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` ADD \`format\` text;`)
  await db.run(sql`CREATE INDEX \`training_domains_trainings_locales_parent_id_idx\` ON \`training_domains_trainings_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`training_domains\` ADD \`order\` numeric;`)
  await db.run(sql`ALTER TABLE \`training_domains_locales\` ADD \`description\` text;`)
  await db.run(sql`CREATE INDEX \`training_domains_locales_parent_id_idx\` ON \`training_domains_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`partners\` ADD \`order\` numeric;`)
  await db.run(sql`ALTER TABLE \`faq\` ADD \`order\` numeric;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`mission_vision_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`trainings_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`programs_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`about_us_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`team_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`partners_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`blog_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`faq_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`contact_section_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`programs_section_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`programs_section_description\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`team_section_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`team_section_description\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`blog_section_title\` text;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` ADD \`blog_section_description\` text;`)
  await db.run(sql`CREATE INDEX \`home_page_locales_parent_id_idx\` ON \`home_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`show_values\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`show_team\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`trainings_page_locales\` ADD \`cta_title\` text;`)
  await db.run(sql`ALTER TABLE \`trainings_page_locales\` ADD \`cta_description\` text;`)
  await db.run(sql`CREATE INDEX \`trainings_page_locales_parent_id_idx\` ON \`trainings_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`announcement_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`announcement_link_url\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_info_map_url\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` ADD \`announcement_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` ADD \`announcement_link_label\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_locales_parent_id_idx\` ON \`site_settings_locales\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`donation_page\` ADD \`hero_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`donation_page_hero_hero_image_idx\` ON \`donation_page\` (\`hero_image_id\`);`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` ADD \`donate_card_title\` text;`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` ADD \`donate_card_description\` text;`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` ADD \`donate_card_notice\` text;`)
  await db.run(sql`CREATE INDEX \`donation_page_locales_parent_id_idx\` ON \`donation_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_locales_parent_id_idx\` ON \`media_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_locales_parent_id_idx\` ON \`partners_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`faq_locales_parent_id_idx\` ON \`faq_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_locales_parent_id_idx\` ON \`programs_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_locales_parent_id_idx\` ON \`team_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_section_hero_stats_locales_parent_id_idx\` ON \`home_page_hero_section_hero_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_mission_vision_section_values_locales_parent_i_idx\` ON \`home_page_mission_vision_section_values_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_stats_section_stats_locales_parent_id_idx\` ON \`home_page_stats_section_stats_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_testimonials_section_testimonials_locales_pare_idx\` ON \`home_page_testimonials_section_testimonials_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_locales_parent_id_idx\` ON \`about_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_page_locales_parent_id_idx\` ON \`contact_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`faq_page_locales_parent_id_idx\` ON \`faq_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`programs_page_locales_parent_id_idx\` ON \`programs_page_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_locales_parent_id_idx\` ON \`site_settings_navigation_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`donation_page_impact_tiers_locales_parent_id_idx\` ON \`donation_page_impact_tiers_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`donation_page_faq_questions_locales_parent_id_idx\` ON \`donation_page_faq_questions_locales\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dictionary_locales_parent_id_idx\` ON \`dictionary_locales\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_blog_v\`;`)
  await db.run(sql`DROP TABLE \`_blog_v_locales\`;`)
  await db.run(sql`DROP TABLE \`programs_gallery\`;`)
  await db.run(sql`DROP TABLE \`training_domains_trainings_learning_points\`;`)
  await db.run(sql`DROP TABLE \`training_domains_trainings_learning_points_locales\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_about_us_section_highlights\`;`)
  await db.run(sql`DROP TABLE \`home_page_about_us_section_highlights_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_page\`;`)
  await db.run(sql`DROP TABLE \`blog_page_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
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
  	\`team_id\` integer,
  	\`blog_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_domains_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programs_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "training_domains_id", "partners_id", "faq_id", "programs_id", "team_id", "blog_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "training_domains_id", "partners_id", "faq_id", "programs_id", "team_id", "blog_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_training_domains_id_idx\` ON \`payload_locked_documents_rels\` (\`training_domains_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programs_id_idx\` ON \`payload_locked_documents_rels\` (\`programs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_id_idx\` ON \`payload_locked_documents_rels\` (\`team_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_donation_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_donation_page\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`donation_page\`;`)
  await db.run(sql`DROP TABLE \`donation_page\`;`)
  await db.run(sql`ALTER TABLE \`__new_donation_page\` RENAME TO \`donation_page\`;`)
  await db.run(sql`CREATE TABLE \`__new_blog\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`featured_image_id\` integer NOT NULL,
  	\`author\` text DEFAULT 'Young Leaders',
  	\`published_date\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog\`("id", "slug", "featured_image_id", "author", "published_date", "updated_at", "created_at") SELECT "id", "slug", "featured_image_id", "author", "published_date", "updated_at", "created_at" FROM \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog\` RENAME TO \`blog\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_slug_idx\` ON \`blog\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_featured_image_idx\` ON \`blog\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_updated_at_idx\` ON \`blog\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_created_at_idx\` ON \`blog\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_blog_locales\` (
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_blog_locales\`("title", "excerpt", "content", "id", "_locale", "_parent_id") SELECT "title", "excerpt", "content", "id", "_locale", "_parent_id" FROM \`blog_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_blog_locales\` RENAME TO \`blog_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_locales_locale_parent_id_unique\` ON \`blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`programs_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`training_domains_trainings_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` DROP COLUMN \`duration\`;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` DROP COLUMN \`participants\`;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` DROP COLUMN \`next_session\`;`)
  await db.run(sql`ALTER TABLE \`training_domains_trainings_locales\` DROP COLUMN \`format\`;`)
  await db.run(sql`DROP INDEX \`training_domains_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`training_domains_locales\` DROP COLUMN \`description\`;`)
  await db.run(sql`DROP INDEX \`faq_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`team_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`partners_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`media_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`home_page_hero_section_hero_stats_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`home_page_mission_vision_section_values_locales_parent_i_idx\`;`)
  await db.run(sql`DROP INDEX \`home_page_stats_section_stats_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`home_page_testimonials_section_testimonials_locales_pare_idx\`;`)
  await db.run(sql`DROP INDEX \`home_page_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`programs_section_title\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`programs_section_description\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`team_section_title\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`team_section_description\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`blog_section_title\`;`)
  await db.run(sql`ALTER TABLE \`home_page_locales\` DROP COLUMN \`blog_section_description\`;`)
  await db.run(sql`DROP INDEX \`about_page_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`trainings_page_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`trainings_page_locales\` DROP COLUMN \`cta_title\`;`)
  await db.run(sql`ALTER TABLE \`trainings_page_locales\` DROP COLUMN \`cta_description\`;`)
  await db.run(sql`DROP INDEX \`programs_page_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`contact_page_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`faq_page_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`donation_page_impact_tiers_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`donation_page_faq_questions_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`donation_page_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` DROP COLUMN \`donate_card_title\`;`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` DROP COLUMN \`donate_card_description\`;`)
  await db.run(sql`ALTER TABLE \`donation_page_locales\` DROP COLUMN \`donate_card_notice\`;`)
  await db.run(sql`DROP INDEX \`site_settings_navigation_locales_parent_id_idx\`;`)
  await db.run(sql`DROP INDEX \`site_settings_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` DROP COLUMN \`announcement_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` DROP COLUMN \`announcement_link_label\`;`)
  await db.run(sql`DROP INDEX \`dictionary_locales_parent_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`training_domains\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`faq\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`partners\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`reset_password_requested_at\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`mission_vision_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`trainings_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`programs_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`about_us_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`team_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`partners_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`blog_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`faq_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home_page\` DROP COLUMN \`contact_section_enabled\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`show_values\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`show_team\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`announcement_enabled\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`announcement_link_url\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`contact_info_map_url\`;`)
}
