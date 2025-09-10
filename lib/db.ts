// Database configuration with Drizzle ORM
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { pgTable, text, timestamp, integer, boolean, uuid, varchar, decimal } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { z } from "zod"

const connectionString = process.env.DATABASE_URL as string

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Users table is handled by Better Auth, but we can reference it
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("draft"), // draft, active, paused, completed
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalLeads: integer("total_leads").default(0),
  successfulLeads: integer("successful_leads").default(0),
  responseRate: decimal("response_rate", { precision: 5, scale: 2 }).default("0.00"),
  progress: integer("progress").default(0), // 0-100
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default("0.00"),
  startDate: timestamp("start_date", { mode: "date" }),
  endDate: timestamp("end_date", { mode: "date" }),
  autoPilotEnabled: boolean("auto_pilot_enabled").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// Leads table
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  jobTitle: varchar("job_title", { length: 255 }),
  linkedinUrl: text("linkedin_url"),
  avatar: text("avatar"),
  campaignId: uuid("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, contacted, responded, converted, rejected
  activity: varchar("activity", { length: 20 }).default("low"), // low, medium, high
  lastContactDate: timestamp("last_contact_date", { mode: "date" }),
  responseDate: timestamp("response_date", { mode: "date" }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// Lead interactions/messages table
export const leadInteractions = pgTable("lead_interactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // invitation, message, connection, follow_up
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("sent"), // sent, delivered, read, responded
  sentAt: timestamp("sent_at", { mode: "date" }).defaultNow(),
  respondedAt: timestamp("responded_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// LinkedIn accounts table
export const linkedinAccounts = pgTable("linkedin_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  profileUrl: text("profile_url"),
  avatar: text("avatar"),
  isActive: boolean("is_active").default(true),
  dailyLimit: integer("daily_limit").default(50),
  currentUsage: integer("current_usage").default(0),
  lastUsed: timestamp("last_used", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// Zod schemas for validation
export const insertCampaignSchema = createInsertSchema(campaigns)
export const selectCampaignSchema = createSelectSchema(campaigns)
export const insertLeadSchema = createInsertSchema(leads)
export const selectLeadSchema = createSelectSchema(leads)
export const insertInteractionSchema = createInsertSchema(leadInteractions)
export const selectInteractionSchema = createSelectSchema(leadInteractions)

export type Campaign = z.infer<typeof selectCampaignSchema>
export type NewCampaign = z.infer<typeof insertCampaignSchema>
export type Lead = z.infer<typeof selectLeadSchema>
export type NewLead = z.infer<typeof insertLeadSchema>
export type LeadInteraction = z.infer<typeof selectInteractionSchema>
export type NewLeadInteraction = z.infer<typeof insertInteractionSchema>

// Database schema object
const schema = {
  users,
  campaigns,
  leads,
  leadInteractions,
  linkedinAccounts,
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema })
