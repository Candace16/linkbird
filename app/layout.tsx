import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { QueryProvider } from "@/lib/providers/query-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "LinkBird - LinkedIn Automation Platform",
  description: "Professional LinkedIn automation and lead generation platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
