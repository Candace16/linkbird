import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getLeads, updateLeadStatus, type Lead } from "./leads"

export function useLeads(filters: {
  search?: string
  status?: string
  campaign?: string
}) {
  return useInfiniteQuery({
    queryKey: ["leads", filters],
    queryFn: ({ pageParam = 0 }) =>
      getLeads({
        ...filters,
        offset: pageParam * 20,
        limit: 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined
      return allPages.length
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ leadId, status }: { leadId: string; status: string }) => updateLeadStatus(leadId, status),
    onMutate: async ({ leadId, status }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["leads"] })

      // Snapshot previous value
      const previousLeads = queryClient.getQueriesData({ queryKey: ["leads"] })

      // Optimistically update
      queryClient.setQueriesData({ queryKey: ["leads"] }, (old: any) => {
        if (!old) return old

        return {
          ...old,
          pages: old.pages.map((page: Lead[]) => page.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))),
        }
      })

      return { previousLeads }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousLeads) {
        context.previousLeads.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["leads"] })
    },
  })
}
