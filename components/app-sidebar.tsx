"use client"

import { type LucideIcon, Map, MapPin, SunIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MenuItem = {
  title: string
  link: string
  icon: LucideIcon
}

export default function AppSidebar() {
  const pathname = usePathname()

  const links: MenuItem[] = [
    {
      title: "Weather app",
      link: "/",
      icon: SunIcon,
    },
    {
      title: "GeoCoding",
      link: "/geo",
      icon: MapPin,
    },
    {
      title: "Map",
      link: "/map",
      icon: Map,
    },
  ]

  return (
    <Sidebar className="bg-slate-900 md:bg-slate-900/80 md:backdrop-blur-sm border-r border-slate-800">
      <SidebarHeader className="bg-slate-950 md:bg-slate-950/90 h-16 flex items-center justify-center">
        <h1 className="text-white font-bold text-4xl text-center font-playfair">Celestia</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link: MenuItem) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full h-12 flex items-center gap-3 px-4 transition-colors ${
                      pathname === link.link
                        ? "bg-slate-800 md:bg-slate-800/60 text-white"
                        : "hover:bg-slate-800 md:hover:bg-slate-800/40 text-slate-300 hover:text-white"
                    }`}
                  >
                    <Link href={link.link}>
                      <link.icon className="w-5 h-5" />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

