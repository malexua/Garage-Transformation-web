import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  tagline: varchar("tagline", { length: 220 }).notNull(),
  description: text("description").notNull(),
  details: text("details").notNull(),
  priceFrom: varchar("price_from", { length: 80 }).notNull(),
  duration: varchar("duration", { length: 80 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  features: text("features").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  summary: varchar("summary", { length: 320 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  squareFeet: integer("square_feet").notNull(),
  durationDays: integer("duration_days").notNull(),
  completedOn: varchar("completed_on", { length: 40 }).notNull(),
  coverImage: varchar("cover_image", { length: 255 }).notNull(),
  beforeImage: varchar("before_image", { length: 255 }),
  afterImage: varchar("after_image", { length: 255 }),
  featured: boolean("featured").notNull().default(false),
});

export const projectImages = pgTable("project_images", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  src: varchar("src", { length: 255 }).notNull(),
  alt: varchar("alt", { length: 200 }).notNull(),
  caption: varchar("caption", { length: 220 }),
  kind: varchar("kind", { length: 40 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  neighborhood: varchar("neighborhood", { length: 120 }).notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  projectSlug: varchar("project_slug", { length: 80 }),
  featured: boolean("featured").notNull().default(true),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 240 }).notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: varchar("address", { length: 200 }),
  city: varchar("city", { length: 80 }),
  zip: varchar("zip", { length: 20 }),
  garageType: varchar("garage_type", { length: 40 }).notNull(),
  squareFeet: integer("square_feet"),
  services: text("services").notNull(),
  timeline: varchar("timeline", { length: 80 }).notNull(),
  budgetRange: varchar("budget_range", { length: 80 }),
  message: text("message"),
  status: varchar("status", { length: 40 }).notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectImage = typeof projectImages.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
