// Campaign-related database queries
import { db, campaigns, leads, type NewCampaign } from "@/lib/db"
import { eq, desc, and, count, sql, like } from "drizzle-orm"

export type Campaign = {
  id: string
  name: string
  status: string
  totalLeads: number | null
  successfulLeads: number | null
  responseRate: string | null
  progress: number | null
  conversionRate: string | null
  startDate: Date | null
  createdAt: Date | null
  autoPilotEnabled: boolean | null
  leadsCount: number
}

export async function getCampaigns(filters: {
  search?: string
  status?: string
  userId: string
}) {
  const { search, status, userId } = filters

  let query = db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      status: campaigns.status,
      totalLeads: campaigns.totalLeads,
      successfulLeads: campaigns.successfulLeads,
      responseRate: campaigns.responseRate,
      progress: campaigns.progress,
      conversionRate: campaigns.conversionRate,
      startDate: campaigns.startDate,
      createdAt: campaigns.createdAt,
      updatedAt: campaigns.updatedAt,
      autoPilotEnabled: campaigns.autoPilotEnabled,
      leadsCount: count(leads.id),
    })
    .from(campaigns)
    .leftJoin(leads, eq(campaigns.id, leads.campaignId))
    .where(eq(campaigns.userId, userId))

  // Apply filters
  const conditions = [eq(campaigns.userId, userId)]

  if (search) {
    conditions.push(like(campaigns.name, `%${search}%`))
  }

  if (status) {
    conditions.push(eq(campaigns.status, status))
  }

  if (conditions.length > 1) {
    query = query.where(and(...conditions))
  }

  const result = await query.groupBy(campaigns.id).orderBy(desc(campaigns.createdAt))

  return result
}

export async function updateCampaignStatus(campaignId: string, status: string, userId: string) {
  const result = await db
    .update(campaigns)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.userId, userId)))
    .returning()

  return result[0] || null
}

export async function getCampaignsByUserId(userId: string) {
  const campaignsWithStats = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      status: campaigns.status,
      totalLeads: campaigns.totalLeads,
      successfulLeads: campaigns.successfulLeads,
      responseRate: campaigns.responseRate,
      progress: campaigns.progress,
      conversionRate: campaigns.conversionRate,
      startDate: campaigns.startDate,
      createdAt: campaigns.createdAt,
      updatedAt: campaigns.updatedAt,
      autoPilotEnabled: campaigns.autoPilotEnabled,
      leadsCount: count(leads.id),
    })
    .from(campaigns)
    .leftJoin(leads, eq(campaigns.id, leads.campaignId))
    .where(eq(campaigns.userId, userId))
    .groupBy(campaigns.id)
    .orderBy(desc(campaigns.createdAt))

  return campaignsWithStats
}

export async function getCampaignById(campaignId: string, userId: string) {
  const campaign = await db
    .select()
    .from(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.userId, userId)))
    .limit(1)

  return campaign[0] || null
}

export async function createCampaign(data: NewCampaign) {
  const result = await db.insert(campaigns).values(data).returning()
  return result[0]
}

export async function updateCampaign(campaignId: string, userId: string, data: Partial<NewCampaign>) {
  const result = await db
    .update(campaigns)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.userId, userId)))
    .returning()

  return result[0] || null
}

export async function deleteCampaign(campaignId: string, userId: string) {
  const result = await db
    .delete(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.userId, userId)))
    .returning()

  return result[0] || null
}

export async function updateCampaignStats(campaignId: string) {
  // Update campaign statistics based on leads data
  const stats = await db
    .select({
      totalLeads: count(leads.id),
      successfulLeads: count(sql`CASE WHEN ${leads.status} = 'converted' THEN 1 END`),
      respondedLeads: count(sql`CASE WHEN ${leads.status} = 'responded' THEN 1 END`),
    })
    .from(leads)
    .where(eq(leads.campaignId, campaignId))

  const { totalLeads, successfulLeads, respondedLeads } = stats[0]
  const responseRate = totalLeads > 0 ? (respondedLeads / totalLeads) * 100 : 0
  const conversionRate = totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0

  await db
    .update(campaigns)
    .set({
      totalLeads,
      successfulLeads,
      responseRate: responseRate.toFixed(2),
      conversionRate: conversionRate.toFixed(2),
      updatedAt: new Date(),
    })
    .where(eq(campaigns.id, campaignId))
}
