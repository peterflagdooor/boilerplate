"use client"

import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This is sample data
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/01.png",
  },
  nav: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Drafts",
      url: "#",
      icon: File,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="relative z-20 !w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu className="items-center">
          <SidebarMenuItem>
            <SidebarMenuButton size="icon" asChild>
              <a href="#">
                <Command />
                <span className="sr-only">Acme Inc</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="items-center">
          {data.nav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton size="icon" asChild>
                <a href={item.url}>
                  <item.icon />
                  <span className="sr-only">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="items-center">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
