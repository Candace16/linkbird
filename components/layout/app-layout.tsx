import type React from "react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: new Headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar user={session.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
