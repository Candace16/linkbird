import { AppLayout } from "@/components/layout/app-layout"
import { LeadsTable } from "@/components/leads/leads-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function LeadsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="text-muted-foreground">Manage your leads and track interactions</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>

        <LeadsTable />
      </div>
    </AppLayout>
  )
}
