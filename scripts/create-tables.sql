-- Create database tables for LinkBird application
-- This script should be run to set up the initial database schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (handled by Better Auth)
CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "emailVerified" TIMESTAMP,
  "image" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS "campaigns" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
  "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "total_leads" INTEGER DEFAULT 0,
  "successful_leads" INTEGER DEFAULT 0,
  "response_rate" DECIMAL(5,2) DEFAULT 0.00,
  "progress" INTEGER DEFAULT 0,
  "conversion_rate" DECIMAL(5,2) DEFAULT 0.00,
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "auto_pilot_enabled" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS "leads" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "company" VARCHAR(255),
  "job_title" VARCHAR(255),
  "linkedin_url" TEXT,
  "avatar" TEXT,
  "campaign_id" UUID NOT NULL REFERENCES "campaigns"("id") ON DELETE CASCADE,
  "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
  "activity" VARCHAR(20) DEFAULT 'low',
  "last_contact_date" TIMESTAMP,
  "response_date" TIMESTAMP,
  "notes" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Lead interactions table
CREATE TABLE IF NOT EXISTS "lead_interactions" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "lead_id" UUID NOT NULL REFERENCES "leads"("id") ON DELETE CASCADE,
  "type" VARCHAR(50) NOT NULL,
  "message" TEXT,
  "status" VARCHAR(50) NOT NULL DEFAULT 'sent',
  "sent_at" TIMESTAMP DEFAULT NOW(),
  "responded_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- LinkedIn accounts table
CREATE TABLE IF NOT EXISTS "linkedin_accounts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "profile_url" TEXT,
  "avatar" TEXT,
  "is_active" BOOLEAN DEFAULT TRUE,
  "daily_limit" INTEGER DEFAULT 50,
  "current_usage" INTEGER DEFAULT 0,
  "last_used" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_campaigns_user_id" ON "campaigns"("user_id");
CREATE INDEX IF NOT EXISTS "idx_campaigns_status" ON "campaigns"("status");
CREATE INDEX IF NOT EXISTS "idx_leads_user_id" ON "leads"("user_id");
CREATE INDEX IF NOT EXISTS "idx_leads_campaign_id" ON "leads"("campaign_id");
CREATE INDEX IF NOT EXISTS "idx_leads_status" ON "leads"("status");
CREATE INDEX IF NOT EXISTS "idx_lead_interactions_lead_id" ON "lead_interactions"("lead_id");
CREATE INDEX IF NOT EXISTS "idx_linkedin_accounts_user_id" ON "linkedin_accounts"("user_id");
