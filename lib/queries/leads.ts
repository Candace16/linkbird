// Lead-related database queries
import { db, leads, campaigns, leadInteractions, type NewLead } from "@/lib/db"
import { eq, desc, and, like, or } from "drizzle-orm"

export type Lead = {
  id: string
  name: string
  email: string
  company: string | null
  jobTitle: string | null
  avatar: string | null
  status: string
  activity: string | null
  lastContactDate: Date | null
  campaignId: string
  campaignName: string | null
  createdAt: Date | null
}

export async function getLeads(filters: {
  search?: string
  status?: string
  campaign?: string
  offset?: number
  limit?: number
  userId: string
}) {
  const { search, status, campaign, offset = 0, limit = 20, userId } = filters

  let query = db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      jobTitle: leads.jobTitle,
      avatar: leads.avatar,
      status: leads.status,
      activity: leads.activity,
      lastContactDate: leads.lastContactDate,
      campaignId: leads.campaignId,
      campaignName: campaigns.name,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(eq(leads.userId, userId))

  // Apply filters
  const conditions = [eq(leads.userId, userId)]

  if (search) {
    conditions.push(
      or(like(leads.name, `%${search}%`), like(leads.email, `%${search}%`), like(leads.company, `%${search}%`))!,
    )
  }

  if (status) {
    conditions.push(eq(leads.status, status))
  }

  if (campaign) {
    conditions.push(eq(campaigns.name, campaign))
  }

  if (conditions.length > 1) {
    query = query.where(and(...conditions))
  }

  const result = await query.orderBy(desc(leads.createdAt)).limit(limit).offset(offset)

  return result
}

export async function updateLeadStatus(leadId: string, status: string, userId: string) {
  const result = await db
    .update(leads)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId)))
    .returning()

  return result[0] || null
}

export async function getLeadsByUserId(userId: string, searchQuery?: string, limit = 50, offset = 0) {
  let query = db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      jobTitle: leads.jobTitle,
      avatar: leads.avatar,
      status: leads.status,
      activity: leads.activity,
      lastContactDate: leads.lastContactDate,
      campaignId: leads.campaignId,
      campaignName: campaigns.name,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(eq(leads.userId, userId))

  if (searchQuery) {
    query = query.where(
      and(
        eq(leads.userId, userId),
        or(
          like(leads.name, `%${searchQuery}%`),
          like(leads.email, `%${searchQuery}%`),
          like(leads.company, `%${searchQuery}%`),
        ),
      ),
    )
  }

  const result = await query.orderBy(desc(leads.createdAt)).limit(limit).offset(offset)

  return result
}

export async function getLeadById(leadId: string, userId: string) {
  const lead = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      jobTitle: leads.jobTitle,
      linkedinUrl: leads.linkedinUrl,
      avatar: leads.avatar,
      status: leads.status,
      activity: leads.activity,
      lastContactDate: leads.lastContactDate,
      responseDate: leads.responseDate,
      notes: leads.notes,
      campaignId: leads.campaignId,
      campaignName: campaigns.name,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id))
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId)))
    .limit(1)

  return lead[0] || null
}

export async function getLeadsByCampaignId(campaignId: string, userId: string) {
  const campaignLeads = await db
    .select()
    .from(leads)
    .where(and(eq(leads.campaignId, campaignId), eq(leads.userId, userId)))
    .orderBy(desc(leads.createdAt))

  return campaignLeads
}

export async function createLead(data: NewLead) {
  const result = await db.insert(leads).values(data).returning()
  return result[0]
}

export async function updateLead(leadId: string, userId: string, data: Partial<NewLead>) {
  const result = await db
    .update(leads)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId)))
    .returning()

  return result[0] || null
}

export async function deleteLead(leadId: string, userId: string) {
  const result = await db
    .delete(leads)
    .where(and(eq(leads.id, leadId), eq(leads.userId, userId)))
    .returning()

  return result[0] || null
}

export async function getLeadInteractions(leadId: string) {
  const interactions = await db
    .select()
    .from(leadInteractions)
    .where(eq(leadInteractions.leadId, leadId))
    .orderBy(desc(leadInteractions.createdAt))

  return interactions
}

export async function createLeadInteraction(data: {
  leadId: string
  type: string
  message?: string
  status?: string
}) {
  const result = await db.insert(leadInteractions).values(data).returning()
  return result[0]
}
