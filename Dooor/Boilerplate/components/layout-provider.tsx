"use client"

import * as React from "react"
import { PanelRight } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { InboxSidebar } from "@/components/inbox-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarRight } from "@/components/sidebar-right"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [inboxOpen, setInboxOpen] = React.useState(true)
  const [rightOpen, setRightOpen] = React.useState(true)

  return (
    <div className="relative h-full">
      <div className="flex h-full">
        <SidebarProvider open={inboxOpen} onOpenChange={setInboxOpen}>
          <AppSidebar />
          <InboxSidebar />
          <SidebarInset>
            <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Inbox</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setRightOpen(!rightOpen)}
                >
                  <PanelRight />
                </Button>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
        <div className="flex-1">
          <SidebarProvider open={rightOpen} onOpenChange={setRightOpen}>
            <SidebarRight />
          </SidebarProvider>
        </div>
      </div>
    </div>
  )
}
