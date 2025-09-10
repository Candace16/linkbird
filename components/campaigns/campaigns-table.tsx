"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Play, Pause, Edit, Trash2, Megaphone } from "lucide-react"
import { CampaignDetailSheet } from "./campaign-detail-sheet"
import { CampaignsSkeleton } from "./campaigns-skeleton"
import { toast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/ui/empty-state" // Import EmptyState component
import { useUIStore } from "@/lib/stores/ui-store"
import { useCampaigns, useUpdateCampaignStatus } from "@/lib/queries/use-campaigns"

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "default"
    case "paused":
      return "secondary"
    case "draft":
      return "outline"
    case "completed":
      return "destructive"
    default:
      return "default"
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-600"
    case "paused":
      return "text-yellow-600"
    case "draft":
      return "text-gray-600"
    case "completed":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

export function CampaignsTable() {
  const { campaignsFilter, setCampaignsFilter, campaignDetailSheetOpen, selectedCampaignId, setCampaignDetailSheet } =
    useUIStore()

  const { data: campaigns = [], isLoading, error } = useCampaigns(campaignsFilter)
  const updateCampaignStatus = useUpdateCampaignStatus()

  const handleCampaignClick = (campaignId: string) => {
    setCampaignDetailSheet(true, campaignId)
  }

  const handleStatusToggle = async (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Paused" : "Active"

    try {
      await updateCampaignStatus.mutateAsync({ campaignId, status: newStatus })
      toast({
        title: "Campaign Updated",
        description: `Campaign has been ${newStatus.toLowerCase()}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign status.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCampaign = (campaignId: string, campaignName: string) => {
    toast({
      title: "Campaign Deleted",
      description: `"${campaignName}" has been permanently deleted.`,
      variant: "destructive",
    })
  }

  if (isLoading) {
    return <CampaignsSkeleton />
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading campaigns"
        description="There was an error loading your campaigns. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
        icon={<Megaphone className="w-12 h-12" />}
      />
    )
  }

  if (campaigns.length === 0 && !campaignsFilter.search) {
    return (
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search campaigns..."
                value={campaignsFilter.search}
                onChange={(e) => setCampaignsFilter({ search: e.target.value })}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              All Campaigns
            </Button>
            <Button variant="outline" size="sm">
              Active
            </Button>
            <Button variant="outline" size="sm">
              Inactive
            </Button>
          </div>
          <Button>Create Campaign</Button>
        </div>

        {/* Empty State */}
        <EmptyState
          title="No campaigns yet"
          description="Create your first campaign to start automating your LinkedIn outreach and generating leads."
          actionLabel="Create Campaign"
          onAction={() => console.log("Create campaign")}
          icon={<Megaphone className="w-12 h-12" />}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
              value={campaignsFilter.search}
              onChange={(e) => setCampaignsFilter({ search: e.target.value })}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            All Campaigns
          </Button>
          <Button variant="outline" size="sm">
            Active
          </Button>
          <Button variant="outline" size="sm">
            Inactive
          </Button>
        </div>
        <Button>Create Campaign</Button>
      </div>

      {/* Show empty state for search results */}
      {campaigns.length === 0 && campaignsFilter.search && (
        <EmptyState
          title="No campaigns found"
          description={`No campaigns match your search for "${campaignsFilter.search}". Try adjusting your search terms.`}
          icon={<Search className="w-12 h-12" />}
        />
      )}

      {/* Campaigns Table */}
      {campaigns.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Leads</TableHead>
                <TableHead>Successful Leads</TableHead>
                <TableHead>Response Rate</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <TableCell>
                    <div className="font-medium">{campaign.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(campaign.status)} className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{campaign.totalLeads}</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{campaign.successfulLeads}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{campaign.responseRate}%</span>
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={campaign.progress} className="w-16 h-2" />
                      <span className="text-xs text-muted-foreground">{campaign.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusToggle(campaign.id, campaign.status)}>
                          {campaign.status === "Active" ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Resume
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteCampaign(campaign.id, campaign.name)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CampaignDetailSheet
        campaignId={selectedCampaignId}
        open={campaignDetailSheetOpen}
        onClose={() => setCampaignDetailSheet(false)}
      />
    </div>
  )
}
