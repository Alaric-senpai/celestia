import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"

const playfair = Playfair_Display({
  variable: "--font-playfair-500",
  style: "normal",
  weight: "500",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Celestia",
  description: "Optimal weather app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-transparent">
            <div className="h-16 w-full flex items-center px-6 bg-slate-900/40 backdrop-blur-sm border-b border-slate-700">
              <SidebarTrigger size="lg" className="h-10 w-10 rounded-full" />
            </div>
            <main className="flex-1 overflow-y-auto scrollbar-thin">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

