import { AppLayout } from "@/components/layout/app-layout"
import { CampaignsTable } from "@/components/campaigns/campaigns-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CampaignsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="text-muted-foreground">Manage your campaigns and track their performance</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        <CampaignsTable />
      </div>
    </AppLayout>
  )
}
