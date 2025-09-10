"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Building, MessageSquare, Phone, Linkedin, ExternalLink } from "lucide-react"
import { useUIStore } from "@/lib/stores/ui-store"

interface LeadDetailSheetProps {
  leadId: string | null
  open: boolean
  onClose: () => void
}

export function LeadDetailSheet({ leadId, open, onClose }: LeadDetailSheetProps) {
  const { leadDetailSheetOpen, setLeadDetailSheet } = useUIStore()

  // Mock lead data - in real app this would come from a query using leadId
  const lead = leadId
    ? {
        id: leadId,
        name: "Dilbag Singh",
        email: "dilbag@marketing.com",
        company: "Marketing & Communication",
        campaign: "Dynamedia",
        status: "Pending Approval",
        lastContact: "Sent 7 mins ago",
        avatar: "/marketing-professional.png",
        activity: "high",
      }
    : null

  if (!lead) return null

  const mockInteractions = [
    {
      id: "1",
      type: "invitation",
      message: "Hi, I'm looking for LinkedIn account assignments. Let me know if you're interested.",
      timestamp: "Sent 7 mins ago",
      status: "sent",
    },
    {
      id: "2",
      type: "connection",
      message: "Connection request sent",
      timestamp: "2 hours ago",
      status: "pending",
    },
  ]

  const handleClose = () => {
    setLeadDetailSheet(false)
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Lead Profile</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Lead Info */}
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={lead.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{lead.name}</h3>
              <p className="text-muted-foreground">Manager Marketing & Communication</p>
              <p className="text-sm text-muted-foreground">at {lead.company}</p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {lead.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Additional Profile Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{lead.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">Check connection status</span>
                <Button variant="outline" size="sm">
                  See More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Interaction History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockInteractions.map((interaction) => (
                <div key={interaction.id} className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{interaction.type}</span>
                        <span className="text-xs text-muted-foreground">{interaction.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{interaction.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
