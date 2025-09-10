"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Target, TrendingUp, Trash2 } from "lucide-react"
import { useUIStore } from "@/lib/stores/ui-store"

interface Campaign {
  id: string
  name: string
  status: string
  totalLeads: number
  successfulLeads: number
  responseRate: number
  progress: number
  createdDate: string
  startDate: string
  conversionRate: number
}

interface CampaignDetailSheetProps {
  campaignId: string | null
  open: boolean
  onClose: () => void
}

export function CampaignDetailSheet({ campaignId, open, onClose }: CampaignDetailSheetProps) {
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(false)

  const { campaignDetailSheetOpen, setCampaignDetailSheet } = useUIStore()

  const campaign = campaignId
    ? {
        id: campaignId,
        name: "Just Herbs",
        status: "Active",
        totalLeads: 20,
        successfulLeads: 0,
        responseRate: 0,
        progress: 85,
        createdDate: "2024-01-15",
        startDate: "03/09/2025",
        conversionRate: 0.0,
      }
    : null

  if (!campaign) return null

  const mockLeads = [
    {
      id: "1",
      name: "Suneet Mathuria",
      description: "Don't Stop When You Feel Stop when You...",
      status: "Pending",
    },
    {
      id: "2",
      name: "Megha Laddha",
      description: "Co-Founder Just Herbs | Inspired by Maa...",
      status: "Pending",
    },
    {
      id: "3",
      name: "Arshna K",
      description: "Content and Marketing Specialist at Just...",
      status: "Pending",
    },
    {
      id: "4",
      name: "Himalayan Herbs",
      description: "Co-Founder of Himalayan Herbs",
      status: "Pending",
    },
  ]

  const handleClose = () => {
    setCampaignDetailSheet(false)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[600px] sm:w-[800px] max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Campaign Details</SheetTitle>
          <p className="text-sm text-muted-foreground">Manage and track your campaign performance</p>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="sequence">Sequence</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Campaign Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaign.totalLeads}</div>
                  <p className="text-xs text-muted-foreground">Total contacted</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Limit</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">General Accounts</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Connected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Sources</p>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Leads Contacted</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Acceptance Rate</span>
                    <span>{campaign.responseRate}%</span>
                  </div>
                  <Progress value={campaign.responseRate} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reply Rate</span>
                    <span>{campaign.successfulLeads}%</span>
                  </div>
                  <Progress value={campaign.successfulLeads} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Start Date</span>
                  </div>
                  <span className="text-sm font-medium">{campaign.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Status</span>
                  </div>
                  <Badge variant="default">{campaign.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Conversion Rate</span>
                  </div>
                  <span className="text-sm font-medium">{campaign.conversionRate}%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4 mt-6">
            <div className="space-y-4">
              {mockLeads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.description}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{lead.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sequence" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Sequence</CardTitle>
                <p className="text-sm text-muted-foreground">Configure your outreach message sequence</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Request Message</h4>
                    <p className="text-sm text-muted-foreground">
                      Edit your request message here. Available fields: Full Name, First Name, Last Name, Job Title
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Connection Message</h4>
                    <p className="text-sm text-muted-foreground">Message sent after connection is accepted</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">First Follow-up Message</h4>
                    <p className="text-sm text-muted-foreground">First follow-up message if no response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            {/* Campaign Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Campaign Name</h4>
                    <p className="text-sm text-muted-foreground">{campaign.name}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Campaign Status</h4>
                    <p className="text-sm text-muted-foreground">Require verified personalization</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>

            {/* AutoPilot Mode */}
            <Card>
              <CardHeader>
                <CardTitle>AutoPilot Mode</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Let the system automatically manage LinkedIn account assignments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">1 account selected</span>
                  <Switch checked={autoPilotEnabled} onCheckedChange={setAutoPilotEnabled} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Selected Accounts</h4>
                  <div className="flex items-center space-x-2 p-2 border rounded">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">AL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Anush Laddha</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Irreversibly delete this campaign and all associated data
                </p>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Campaign
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Permanently delete this campaign and all associated data
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
