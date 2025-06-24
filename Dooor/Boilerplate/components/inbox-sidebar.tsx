"use client"

import * as React from "react"
import { Search, Plus, Filter, Archive, Trash2, Star, Mail, Send } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample inbox data
const inboxItems = [
  {
    id: 1,
    sender: "William Smith",
    subject: "Meeting Tomorrow",
    preview: "Hi team, just a reminder about our meeting tomorrow at 10 AM...",
    time: "09:34 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Alice Smith",
    subject: "Re: Project Update",
    preview: "Thanks for the update. The progress looks great so far...",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    sender: "Bob Johnson",
    subject: "Weekend Plans",
    preview: "Hey everyone! I'm thinking of organizing a team outing this weekend...",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 4,
    sender: "Emily Davis",
    subject: "Re: Question about Budget",
    preview: "I've reviewed the budget numbers you sent over...",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    sender: "Michael Wilson",
    subject: "Important Announcement",
    preview: "Please join us for an all-hands meeting this Friday at 3 PM...",
    time: "1 week ago",
    unread: false,
  },
  {
    id: 6,
    sender: "Sarah Brown",
    subject: "Re: Feedback on Proposal",
    preview: "Thank you for sending over the proposal. I've reviewed it and have some thoughts...",
    time: "1 week ago",
    unread: false,
  },
  {
    id: 7,
    sender: "David Lee",
    subject: "New Project Idea",
    preview: "I've been brainstorming and came up with an interesting project concept...",
    time: "1 week ago",
    unread: false,
  },
]

const folders = [
  { name: "Inbox", icon: Mail, count: 12 },
  { name: "Starred", icon: Star, count: 3 },
  { name: "Sent", icon: Send, count: null },
  { name: "Archive", icon: Archive, count: null },
  { name: "Trash", icon: Trash2, count: null },
]

export function InboxSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
        <Sidebar
      collapsible="offcanvas"
      className="border-r left-[calc(var(--sidebar-width-icon)_+_1px)]"
      {...props}
    >
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inbox</h2>
          <Button size="sm" className="h-8 w-8" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Type to search..." className="pl-8" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.name}>
                  <SidebarMenuButton className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <folder.icon className="h-4 w-4" />
                      <span>{folder.name}</span>
                    </div>
                    {folder.count && (
                      <span className="text-xs text-muted-foreground">
                        {folder.count}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel>Messages</SidebarGroupLabel>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Filter className="h-3 w-3" />
            </Button>
          </div>
          <SidebarGroupContent className="flex-1">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-2">
                {inboxItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent ${
                      item.unread ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${item.unread ? 'font-semibold' : 'font-medium'}`}>
                            {item.sender}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2">
                            {item.time}
                          </span>
                        </div>
                        <p className={`text-sm truncate mt-1 ${item.unread ? 'font-medium' : ''}`}>
                          {item.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {item.preview}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
