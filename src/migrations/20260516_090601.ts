import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`team\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`team_image_idx\` ON \`team\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`team_updated_at_idx\` ON \`team\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`team_created_at_idx\` ON \`team\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`team_locales\` (
  	\`role\` text NOT NULL,
  	\`bio\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`team_locales_locale_parent_id_unique\` ON \`team_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`blog_slug_idx\` ON \`blog\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_featured_image_idx\` ON \`blog\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_updated_at_idx\` ON \`blog\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_created_at_idx\` ON \`blog\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_locales\` (
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_locales_locale_parent_id_unique\` ON \`blog_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_order_idx\` ON \`site_settings_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_parent_id_idx\` ON \`site_settings_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_navigation_locales_locale_parent_id_unique\` ON \`site_settings_navigation_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`contact_info_address\` text,
  	\`contact_info_opening_hours\` text,
  	\`footer_description\` text,
  	\`footer_mission_statement\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_page_impact_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_page_impact_tiers_order_idx\` ON \`donation_page_impact_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donation_page_impact_tiers_parent_id_idx\` ON \`donation_page_impact_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_page_impact_tiers_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_page_impact_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`donation_page_impact_tiers_locales_locale_parent_id_unique\` ON \`donation_page_impact_tiers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_page_faq_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`donation_page_faq_questions_order_idx\` ON \`donation_page_faq_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`donation_page_faq_questions_parent_id_idx\` ON \`donation_page_faq_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_page_faq_questions_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_page_faq_questions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`donation_page_faq_questions_locales_locale_parent_id_unique\` ON \`donation_page_faq_questions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`donation_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`donation_page_locales\` (
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_cta\` text,
  	\`impact_title\` text,
  	\`faq_title\` text,
  	\`help_title\` text,
  	\`help_description\` text,
  	\`help_cta\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`donation_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`donation_page_locales_locale_parent_id_unique\` ON \`donation_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dictionary\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`dictionary_locales\` (
  	\`common_learn_more\` text,
  	\`common_register\` text,
  	\`common_contact_us\` text,
  	\`common_search\` text,
  	\`common_submit\` text,
  	\`common_loading\` text,
  	\`trainings_duration\` text,
  	\`trainings_location\` text,
  	\`trainings_price\` text,
  	\`trainings_upcoming\` text,
  	\`forms_full_name\` text,
  	\`forms_email\` text,
  	\`forms_phone\` text,
  	\`forms_subject\` text,
  	\`forms_message\` text,
  	\`forms_gender\` text,
  	\`forms_send\` text,
  	\`forms_sending\` text,
  	\`forms_success_title\` text,
  	\`forms_success_message\` text,
  	\`forms_error_message\` text,
  	\`newsletter_success\` text,
  	\`newsletter_error\` text,
  	\`newsletter_placeholder\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dictionary\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dictionary_locales_locale_parent_id_unique\` ON \`dictionary_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`team_id\` integer REFERENCES team(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`blog_id\` integer REFERENCES blog(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_id_idx\` ON \`payload_locked_documents_rels\` (\`team_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_id\`);`)
  await db.run(sql`ALTER TABLE \`about_page_locales\` ADD \`join_mission_title\` text;`)
  await db.run(sql`ALTER TABLE \`about_page_locales\` ADD \`join_mission_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_info_phone\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_info_email\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`seo_og_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_seo_seo_og_image_idx\` ON \`site_settings\` (\`seo_og_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`team\`;`)
  await db.run(sql`DROP TABLE \`team_locales\`;`)
  await db.run(sql`DROP TABLE \`blog\`;`)
  await db.run(sql`DROP TABLE \`blog_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`donation_page_impact_tiers\`;`)
  await db.run(sql`DROP TABLE \`donation_page_impact_tiers_locales\`;`)
  await db.run(sql`DROP TABLE \`donation_page_faq_questions\`;`)
  await db.run(sql`DROP TABLE \`donation_page_faq_questions_locales\`;`)
  await db.run(sql`DROP TABLE \`donation_page\`;`)
  await db.run(sql`DROP TABLE \`donation_page_locales\`;`)
  await db.run(sql`DROP TABLE \`dictionary\`;`)
  await db.run(sql`DROP TABLE \`dictionary_locales\`;`)
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`training_domains_id\`) REFERENCES \`training_domains\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_id\`) REFERENCES \`faq\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programs_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "training_domains_id", "partners_id", "faq_id", "programs_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "training_domains_id", "partners_id", "faq_id", "programs_id" FROM \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "donation_external_url", "social_links_facebook", "social_links_instagram", "social_links_linkedin", "social_links_youtube", "updated_at", "created_at") SELECT "id", "donation_external_url", "social_links_facebook", "social_links_instagram", "social_links_linkedin", "social_links_youtube", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`about_page_locales\` DROP COLUMN \`join_mission_title\`;`)
  await db.run(sql`ALTER TABLE \`about_page_locales\` DROP COLUMN \`join_mission_description\`;`)
}
