import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCampaigns, updateCampaignStatus, type Campaign } from "./campaigns"

export function useCampaigns(filters: {
  search?: string
  status?: string
}) {
  return useQuery({
    queryKey: ["campaigns", filters],
    queryFn: () => getCampaigns(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useUpdateCampaignStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ campaignId, status }: { campaignId: string; status: string }) =>
      updateCampaignStatus(campaignId, status),
    onMutate: async ({ campaignId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["campaigns"] })

      const previousCampaigns = queryClient.getQueryData(["campaigns"])

      queryClient.setQueryData(["campaigns"], (old: Campaign[] | undefined) => {
        if (!old) return old
        return old.map((campaign) => (campaign.id === campaignId ? { ...campaign, status } : campaign))
      })

      return { previousCampaigns }
    },
    onError: (err, variables, context) => {
      if (context?.previousCampaigns) {
        queryClient.setQueryData(["campaigns"], context.previousCampaigns)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] })
    },
  })
}
