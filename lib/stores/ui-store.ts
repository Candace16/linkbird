import { create } from "zustand"

interface UIStore {
  // Sidebar state
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void

  // Selected items
  selectedLeads: string[]
  selectedCampaigns: string[]
  setSelectedLeads: (leads: string[]) => void
  setSelectedCampaigns: (campaigns: string[]) => void

  // Filter and search states
  leadsFilter: {
    search: string
    status: string
    campaign: string
  }
  campaignsFilter: {
    search: string
    status: string
  }
  setLeadsFilter: (filter: Partial<UIStore["leadsFilter"]>) => void
  setCampaignsFilter: (filter: Partial<UIStore["campaignsFilter"]>) => void

  // Modal and sheet states
  leadDetailSheetOpen: boolean
  selectedLeadId: string | null
  campaignDetailSheetOpen: boolean
  selectedCampaignId: string | null
  setLeadDetailSheet: (open: boolean, leadId?: string) => void
  setCampaignDetailSheet: (open: boolean, campaignId?: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Sidebar state
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Selected items
  selectedLeads: [],
  selectedCampaigns: [],
  setSelectedLeads: (leads) => set({ selectedLeads: leads }),
  setSelectedCampaigns: (campaigns) => set({ selectedCampaigns: campaigns }),

  // Filter states
  leadsFilter: {
    search: "",
    status: "",
    campaign: "",
  },
  campaignsFilter: {
    search: "",
    status: "",
  },
  setLeadsFilter: (filter) =>
    set((state) => ({
      leadsFilter: { ...state.leadsFilter, ...filter },
    })),
  setCampaignsFilter: (filter) =>
    set((state) => ({
      campaignsFilter: { ...state.campaignsFilter, ...filter },
    })),

  // Modal states
  leadDetailSheetOpen: false,
  selectedLeadId: null,
  campaignDetailSheetOpen: false,
  selectedCampaignId: null,
  setLeadDetailSheet: (open, leadId) =>
    set({
      leadDetailSheetOpen: open,
      selectedLeadId: leadId || null,
    }),
  setCampaignDetailSheet: (open, campaignId) =>
    set({
      campaignDetailSheetOpen: open,
      selectedCampaignId: campaignId || null,
    }),
}))
