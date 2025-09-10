"use client"

import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import { Search, Filter, Users } from "lucide-react"
import { LeadDetailSheet } from "./lead-detail-sheet"
import { LeadsSkeleton } from "./leads-skeleton"
import { useUIStore } from "@/lib/stores/ui-store"
import { useLeads } from "@/lib/queries/use-leads"
import { useInView } from "react-intersection-observer"

// Mock data for leads
const mockLeads = [
  {
    id: "1",
    name: "Om Satyarthi",
    email: "om@dynamedia.com",
    company: "Dynamedia",
    campaign: "Dynamedia",
    status: "Pending Approval",
    lastContact: "Sent 7 mins ago",
    avatar: "/professional-headshot.png",
    activity: "high",
  },
  {
    id: "2",
    name: "Dr Bhuvaneshwari",
    email: "dr.bhuvan@hospital.com",
    company: "City Hospital",
    campaign: "Dynamedia",
    status: "Sent 7 mins ago",
    lastContact: "Sent 7 mins ago",
    avatar: "/professional-doctor.png",
    activity: "medium",
  },
  {
    id: "3",
    name: "Sudeep Singh",
    email: "sudeep@seogroup.com",
    company: "SEO Group",
    campaign: "Dynamedia",
    status: "Sent 7 mins ago",
    lastContact: "Sent 7 mins ago",
    avatar: "/diverse-business-professionals.png",
    activity: "low",
  },
  {
    id: "4",
    name: "Dilbag Singh",
    email: "dilbag@marketing.com",
    company: "Marketing & Communication",
    campaign: "Dynamedia",
    status: "Sent 7 mins ago",
    lastContact: "Sent 7 mins ago",
    avatar: "/marketing-professional.png",
    activity: "high",
  },
  {
    id: "5",
    name: "Vishnu Jee",
    email: "vishnu@company.com",
    company: "Tech Solutions",
    campaign: "Dynamedia",
    status: "Sent 7 mins ago",
    lastContact: "Sent 7 mins ago",
    avatar: "/tech-professional.png",
    activity: "medium",
  },
]

const getStatusVariant = (status: string) => {
  if (status === "Pending Approval") return "secondary"
  if (status.includes("Sent")) return "outline"
  return "default"
}

const getActivityColor = (activity: string) => {
  switch (activity) {
    case "high":
      return "bg-green-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function LeadsTable() {
  const { leadsFilter, setLeadsFilter, leadDetailSheetOpen, selectedLeadId, setLeadDetailSheet } = useUIStore()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useLeads(leadsFilter)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const leads = data?.pages.flat() ?? []

  const handleLeadClick = (leadId: string) => {
    setLeadDetailSheet(true, leadId)
  }

  if (isLoading) {
    return <LeadsSkeleton />
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading leads"
        description="There was an error loading your leads. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
        icon={<Users className="w-12 h-12" />}
      />
    )
  }

  if (leads.length === 0 && !leadsFilter.search) {
    return (
      <EmptyState
        title="No leads yet"
        description="Start by creating a campaign and adding leads to track your LinkedIn outreach."
        actionLabel="Create Campaign"
        onAction={() => console.log("Create campaign")}
        icon={<Users className="w-12 h-12" />}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={leadsFilter.search}
            onChange={(e) => setLeadsFilter({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Show empty state for search results */}
      {leads.length === 0 && leadsFilter.search && (
        <EmptyState
          title="No leads found"
          description={`No leads match your search for "${leadsFilter.search}". Try adjusting your search terms.`}
          icon={<Search className="w-12 h-12" />}
        />
      )}

      {/* Leads Table */}
      {leads.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleLeadClick(lead.id)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{lead.campaign}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getActivityColor(lead.activity)}`} />
                      <span className="text-sm capitalize">{lead.activity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)} className="text-xs">
                      {lead.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {hasNextPage && (
                <TableRow ref={ref}>
                  <TableCell colSpan={4} className="text-center py-4">
                    {isFetchingNextPage ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-muted-foreground">Loading more leads...</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Scroll to load more</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <LeadDetailSheet leadId={selectedLeadId} open={leadDetailSheetOpen} onClose={() => setLeadDetailSheet(false)} />
    </div>
  )
}
